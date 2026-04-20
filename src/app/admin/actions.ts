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
const ALLOWED_IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "gif"]);

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

type UploadResult =
  | { ok: true; url: string | null }
  | { ok: false; reason: "invalid_type" | "too_large" | "missing_token" | "upload_failed" };

function hasAllowedImageExtension(fileName: string) {
  const ext = fileName.toLowerCase().split(".").pop() ?? "";
  return ALLOWED_IMAGE_EXTENSIONS.has(ext);
}

async function uploadCoverIfProvided(
  formData: FormData,
  fallbackCoverImage: string | null,
): Promise<UploadResult> {
  const rawFile = formData.get("coverImageFile");

  if (!(rawFile instanceof File) || rawFile.size === 0) {
    return { ok: true, url: fallbackCoverImage };
  }

  const byMime = ALLOWED_IMAGE_TYPES.has(rawFile.type);
  const byExtension = hasAllowedImageExtension(rawFile.name);
  if (!byMime && !byExtension) {
    return { ok: false, reason: "invalid_type" };
  }

  if (rawFile.size > MAX_FILE_SIZE) {
    return { ok: false, reason: "too_large" };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV !== "development") {
    return { ok: false, reason: "missing_token" };
  }

  try {
    const url = await uploadProjectCover(rawFile);
    return { ok: true, url };
  } catch {
    return { ok: false, reason: "upload_failed" };
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
  if (!uploadedCoverImage.ok) {
    redirect(`/admin/projects/new?error=${uploadedCoverImage.reason}`);
  }

  await getPrisma().project.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      techStack: parsed.data.techStack,
      externalUrl: parsed.data.externalUrl,
      status: parsed.data.status,
      coverImage: uploadedCoverImage.url,
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
  if (!uploadedCoverImage.ok) {
    redirect(`/admin/projects/${projectId}/edit?error=${uploadedCoverImage.reason}`);
  }

  await getPrisma().project.update({
    where: { id: projectId },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      techStack: parsed.data.techStack,
      externalUrl: parsed.data.externalUrl,
      status: parsed.data.status,
      coverImage: uploadedCoverImage.url,
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
