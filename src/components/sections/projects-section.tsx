import type { Project } from "@prisma/client";

import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { SectionShell } from "@/components/shared/section-shell";
import { projects } from "@/data/site-content";
import { parseProjectCoverImages } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";

type DisplayProject = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
  coverImages: string[];
};

export async function ProjectsSection() {
  let publishedProjects: Project[] = [];
  try {
    publishedProjects = await getPrisma().project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
      take: 6,
    });
  } catch (error) {
    // During early deploy/setup, DB might be unavailable.
    // Fallback to static project data so build/runtime still works.
    console.error("Failed to load published projects from database.", error);
    publishedProjects = [];
  }

  const displayProjects: DisplayProject[] =
    publishedProjects.length > 0
      ? publishedProjects.map((project) => ({
          title: project.title,
          description: project.description,
          techStack: project.techStack.split(",").map((item) => item.trim()),
          externalUrl: project.externalUrl,
          coverImages: parseProjectCoverImages(project.coverImage),
        }))
      : projects.map((project) => ({ ...project, coverImages: [] }));

  return (
    <SectionShell id="projects" title="Projects">
      <ProjectsShowcase projects={displayProjects} />
    </SectionShell>
  );
}
