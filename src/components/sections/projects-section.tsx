import type { Project } from "@prisma/client";

import { ProjectsGallery, type ProjectCategory, type ProjectCardItem } from "@/components/sections/projects-gallery";
import { SectionShell } from "@/components/shared/section-shell";
import { projects } from "@/data/site-content";
import { parseProjectCoverImages } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";

function inferProjectCategory(title: string, techStack: string[]): ProjectCategory {
  const source = `${title} ${techStack.join(" ")}`.toLowerCase();

  if (/ai|ml|machine|yolo|tensorflow|vision/.test(source)) {
    return "AI";
  }

  if (/data|analytics|dashboard|postgres|mysql|statistics|forecast/.test(source)) {
    return "Data";
  }

  if (/embedded|firmware|microcontroller|rtos|raspberry|sbc/.test(source)) {
    return "Embedded";
  }

  return "IoT";
}

export async function ProjectsSection() {
  let publishedProjects: Project[] = [];

  try {
    publishedProjects = await getPrisma().project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
      take: 8,
    });
  } catch (error) {
    console.error("Failed to load published projects from database.", error);
    publishedProjects = [];
  }

  const displayProjects: ProjectCardItem[] =
    publishedProjects.length > 0
      ? publishedProjects.map((project) => {
          const techStack = project.techStack
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

          const coverImages = parseProjectCoverImages(project.coverImage);

          return {
            title: project.title,
            description: project.description,
            techStack,
            externalUrl: project.externalUrl,
            coverImages,
            category: inferProjectCategory(project.title, techStack),
          };
        })
      : projects.map((project) => ({
          ...project,
          coverImages: [],
          category: inferProjectCategory(project.title, project.techStack),
        }));

  return (
    <SectionShell id="projects" title="Featured Projects">
      <ProjectsGallery projects={displayProjects} />
    </SectionShell>
  );
}
