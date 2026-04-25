"use server";

import { ProjectStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authenticateAdmin, requireAdminSession } from "@/lib/auth";
import { isValidProjectCoverFileName, toPublicCoverPath } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";
import { createUniqueProjectSlug } from "@/lib/slug";
import { ADMIN_SESSION_COOKIE, signAdminSession } from "@/lib/session";
import { loginSchema, projectFormSchema } from "@/lib/validation";

function readFormData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    techStack: String(formData.get("techStack") ?? ""),
    externalUrl: String(formData.get("externalUrl") ?? ""),
    coverImageFileName: String(formData.get("coverImageFileName") ?? ""),
    status: String(formData.get("status") ?? ProjectStatus.DRAFT),
  };
}

function resolveCoverImagePath(fileName: string | null | undefined): string | null {
  const normalizedFileName = fileName?.trim() || null;
  if (!normalizedFileName) {
    return null;
  }

  if (!isValidProjectCoverFileName(normalizedFileName)) {
    return null;
  }

  return toPublicCoverPath(normalizedFileName);
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
  const coverImage = resolveCoverImagePath(parsed.data.coverImageFileName);
  if (parsed.data.coverImageFileName && !coverImage) {
    redirect("/admin/projects/new?error=invalid_cover");
  }

  try {
    await getPrisma().project.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        techStack: parsed.data.techStack,
        externalUrl: parsed.data.externalUrl,
        status: parsed.data.status,
        coverImage,
        slug,
      },
    });
  } catch (error) {
    console.error("Failed to create project.", error);
    redirect("/admin/projects/new?error=db_error");
  }

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
  const coverImage = resolveCoverImagePath(parsed.data.coverImageFileName);
  if (parsed.data.coverImageFileName && !coverImage) {
    redirect(`/admin/projects/${projectId}/edit?error=invalid_cover`);
  }

  try {
    await getPrisma().project.update({
      where: { id: projectId },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        techStack: parsed.data.techStack,
        externalUrl: parsed.data.externalUrl,
        status: parsed.data.status,
        coverImage,
        slug,
      },
    });
  } catch (error) {
    console.error(`Failed to update project: ${projectId}`, error);
    redirect(`/admin/projects/${projectId}/edit?error=db_error`);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(projectId: string) {
  await requireAdminSession();

  try {
    await getPrisma().project.delete({
      where: { id: projectId },
    });
  } catch (error) {
    console.error(`Failed to delete project: ${projectId}`, error);
    redirect(`/admin/projects/${projectId}/edit?error=db_error`);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
