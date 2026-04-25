"use server";

import { ExperienceCategory, ProjectStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authenticateAdmin, requireAdminSession } from "@/lib/auth";
import { normalizeProjectCoverFileNames, serializeProjectCoverImagesFromFileNames } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";
import { createUniqueProjectSlug } from "@/lib/slug";
import { ADMIN_SESSION_COOKIE, signAdminSession } from "@/lib/session";
import { experienceFormSchema, loginSchema, projectFormSchema } from "@/lib/validation";

function readFormData(formData: FormData) {
  const coverImageFileNames = formData
    .getAll("coverImageFileNames")
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);

  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    techStack: String(formData.get("techStack") ?? ""),
    externalUrl: String(formData.get("externalUrl") ?? ""),
    coverImageFileNames,
    existingCoverImagesRaw: String(formData.get("existingCoverImagesRaw") ?? ""),
    status: String(formData.get("status") ?? ProjectStatus.DRAFT),
  };
}

function readExperienceFormData(formData: FormData) {
  return {
    period: String(formData.get("period") ?? ""),
    title: String(formData.get("title") ?? ""),
    company: String(formData.get("company") ?? ""),
    description: String(formData.get("description") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    category: String(formData.get("category") ?? ExperienceCategory.EXPERIENCE),
    displayOrder: String(formData.get("displayOrder") ?? "0"),
  };
}

function resolveCoverImagesValue(
  selectedCoverImageFileNames: string[],
  existingCoverImagesRaw?: string | null,
) {
  const normalizedFileNames = normalizeProjectCoverFileNames(selectedCoverImageFileNames);
  const hasInvalidSelection = selectedCoverImageFileNames.length > 0 && normalizedFileNames.length === 0;

  if (hasInvalidSelection) {
    return { ok: false as const, value: null };
  }

  const serialized = serializeProjectCoverImagesFromFileNames(normalizedFileNames);
  if (serialized) {
    return { ok: true as const, value: serialized };
  }

  return { ok: true as const, value: existingCoverImagesRaw?.trim() || null };
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
  const coverImages = resolveCoverImagesValue(parsed.data.coverImageFileNames);
  if (!coverImages.ok) {
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
        coverImage: coverImages.value,
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
  const coverImages = resolveCoverImagesValue(
    parsed.data.coverImageFileNames,
    parsed.data.existingCoverImagesRaw,
  );
  if (!coverImages.ok) {
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
        coverImage: coverImages.value,
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

export async function createExperienceAction(formData: FormData) {
  await requireAdminSession();
  const parsed = experienceFormSchema.safeParse(readExperienceFormData(formData));

  if (!parsed.success) {
    redirect("/admin/experiences/new?error=invalid_input");
  }

  try {
    await getPrisma().experienceEntry.create({
      data: {
        period: parsed.data.period,
        title: parsed.data.title,
        company: parsed.data.company || null,
        description: parsed.data.description,
        tags: parsed.data.tags,
        category: parsed.data.category,
        displayOrder: parsed.data.displayOrder,
      },
    });
  } catch (error) {
    console.error("Failed to create experience entry.", error);
    redirect("/admin/experiences/new?error=db_error");
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function updateExperienceAction(experienceId: string, formData: FormData) {
  await requireAdminSession();
  const parsed = experienceFormSchema.safeParse(readExperienceFormData(formData));

  if (!parsed.success) {
    redirect(`/admin/experiences/${experienceId}/edit?error=invalid_input`);
  }

  try {
    await getPrisma().experienceEntry.update({
      where: { id: experienceId },
      data: {
        period: parsed.data.period,
        title: parsed.data.title,
        company: parsed.data.company || null,
        description: parsed.data.description,
        tags: parsed.data.tags,
        category: parsed.data.category,
        displayOrder: parsed.data.displayOrder,
      },
    });
  } catch (error) {
    console.error(`Failed to update experience entry: ${experienceId}`, error);
    redirect(`/admin/experiences/${experienceId}/edit?error=db_error`);
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperienceAction(experienceId: string) {
  await requireAdminSession();

  try {
    await getPrisma().experienceEntry.delete({
      where: { id: experienceId },
    });
  } catch (error) {
    console.error(`Failed to delete experience entry: ${experienceId}`, error);
    redirect(`/admin/experiences/${experienceId}/edit?error=db_error`);
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}
