import { ProjectStatus } from "@prisma/client";
import { z } from "zod";

const urlError = "Must be a valid URL (e.g. https://github.com/username/repo)";

export const loginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export const projectFormSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(20).max(1400),
  techStack: z.string().trim().min(2).max(300),
  externalUrl: z.string().trim().url(urlError),
  coverImageFileNames: z.array(z.string().trim()).default([]),
  existingCoverImagesRaw: z.string().trim().optional().nullable(),
  status: z.enum(ProjectStatus),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
