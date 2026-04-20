"use server";

import { ProjectStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authenticateAdmin, requireAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { createUniqueProjectSlug } from "@/lib/slug";
import { ADMIN_SESSION_COOKIE, signAdminSession } from "@/lib/session";
import { uploadProjectCover } from "@/lib/storage";
import { loginSchema, projectFormSchema } from "@/lib/validation";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

function readFormData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    techStack: String(formData.get("techStack") ?? ""),
    externalUrl: String(formData.get("externalUrl") ?? ""),
    existingCoverImage: String(formData.get("existingCoverImage") ?? ""),
    status: String(formData.get("status") ?? ProjectStatus.DRAFT),
  };
}

async function uploadCoverIfProvided(formData: FormData, fallbackCoverImage: string | null) {
  const rawFile = formData.get("coverImageFile");

  if (!(rawFile instanceof File) || rawFile.size === 0) {
    return fallbackCoverImage;
  }

  if (!ALLOWED_IMAGE_TYPES.has(rawFile.type)) {
    return null;
  }

  if (rawFile.size > MAX_FILE_SIZE) {
    return null;
  }

  try {
    return await uploadProjectCover(rawFile);
  } catch {
    return null;
  }
}

export async function loginAdminAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    redirect("/admin/login?error=invalid_input");
  }

  const admin = await authenticateAdmin(parsed.data.email, parsed.data.password);
  if (!admin) {
    redirect("/admin/login?error=invalid_credentials");
  }

  const token = await signAdminSession({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect("/admin/projects");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function createProjectAction(formData: FormData) {
  await requireAdminSession();
  const parsed = projectFormSchema.safeParse(readFormData(formData));

  if (!parsed.success) {
    redirect("/admin/projects/new?error=invalid_input");
  }

  const slug = await createUniqueProjectSlug(parsed.data.title);

  const uploadedCoverImage = await uploadCoverIfProvided(formData, null);
  if (formData.get("coverImageFile") instanceof File && !uploadedCoverImage) {
    redirect("/admin/projects/new?error=invalid_cover");
  }

  await getPrisma().project.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      techStack: parsed.data.techStack,
      externalUrl: parsed.data.externalUrl,
      status: parsed.data.status,
      coverImage: uploadedCoverImage,
      slug,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProjectAction(projectId: string, formData: FormData) {
  await requireAdminSession();
  const parsed = projectFormSchema.safeParse(readFormData(formData));

  if (!parsed.success) {
    redirect(`/admin/projects/${projectId}/edit?error=invalid_input`);
  }

  const slug = await createUniqueProjectSlug(parsed.data.title, projectId);

  const fallbackCoverImage = parsed.data.existingCoverImage || null;
  const uploadedCoverImage = await uploadCoverIfProvided(formData, fallbackCoverImage);
  if (formData.get("coverImageFile") instanceof File && !uploadedCoverImage) {
    redirect(`/admin/projects/${projectId}/edit?error=invalid_cover`);
  }

  await getPrisma().project.update({
    where: { id: projectId },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      techStack: parsed.data.techStack,
      externalUrl: parsed.data.externalUrl,
      status: parsed.data.status,
      coverImage: uploadedCoverImage,
      slug,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(projectId: string) {
  await requireAdminSession();

  await getPrisma().project.delete({
    where: { id: projectId },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
