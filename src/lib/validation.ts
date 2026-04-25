import { ExperienceCategory, ProjectStatus } from "@prisma/client";
import { z } from "zod";

const urlError = "Must be a valid URL (e.g. https://github.com/username/repo)";

export const loginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export const projectFormSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(20).max(1400),
  projectLabels: z.array(z.string().trim()).default([]),
  techStack: z.string().trim().min(2).max(300),
  externalUrl: z.string().trim().url(urlError),
  coverImageFileName: z.string().trim().optional().nullable(),
  galleryImageFileNames: z.array(z.string().trim()).default([]),
  existingCoverImagesRaw: z.string().trim().optional().nullable(),
  displayOrder: z.coerce.number().int().min(0).max(9999),
  status: z.enum(ProjectStatus),
});

export const experienceFormSchema = z.object({
  period: z.string().trim().min(3).max(80),
  title: z.string().trim().min(3).max(120),
  company: z.string().trim().max(120).optional().nullable(),
  description: z.string().trim().min(20).max(1000),
  tags: z.string().trim().min(2).max(220),
  category: z.enum(ExperienceCategory),
  displayOrder: z.coerce.number().int().min(0).max(9999),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
