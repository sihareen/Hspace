import type { Project } from "@prisma/client";

import { ProjectsGallery, type ProjectCardItem, type ProjectCategory } from "@/components/sections/projects-gallery";
import { SectionShell } from "@/components/shared/section-shell";
import { parseProjectCoverImages } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";

function parseLabels(raw: string | null): ProjectCategory[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is ProjectCategory => s === "IoT" || s === "AI" || s === "Data");
}

export async function ProjectsSection() {
  let publishedProjects: Project[] = [];

  try {
    publishedProjects = await getPrisma().project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    });
  } catch (error) {
    console.error("Failed to load published projects from database.", error);
    publishedProjects = [];
  }

  const displayProjects: ProjectCardItem[] =
    publishedProjects.length > 0
      ? publishedProjects.map((project) => ({
          title: project.title,
          description: project.description,
          techStack: project.techStack
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          externalUrl: project.externalUrl,
          coverImages: parseProjectCoverImages(project.coverImage),
          labels: parseLabels(project.labels),
        }))
      : [
          {
            title: "PUMMA U-TEWS",
            description:
              "Real-time sea level monitoring unit for tsunami early warning integration. Embedded firmware, LoRa mesh networking, and cloud ingestion pipeline for high-risk coastal zones.",
            techStack: ["Embedded C", "Sensors", "Telemetry", "LoRa", "MQTT"],
            externalUrl: "#",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
          {
            title: "Dashboard Climate",
            description:
              "Environmental monitoring dashboard with real-time sensor data visualization, historical analysis, alerting and environmental decision support.",
            techStack: ["Laravel", "MySQL", "Chart.js", "MQTT", "REST API"],
            externalUrl: "#",
            coverImages: [],
            labels: ["Data"] as ProjectCategory[],
          },
          {
            title: "Rubus IOC",
            description:
              "LoRa-based soil moisture monitoring with solar-powered field deployment. IoT power monitoring and control system for distributed infrastructure with centralized management.",
            techStack: ["LoRa", "IoT", "Power Systems", "ESP32", "Python"],
            externalUrl: "#",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
        ];

  return (
    <SectionShell
      id="projects"
      number="02"
      eyebrow="Work"
      title="Selected projects"
      intro="Field deployments, embedded devices and telemetry systems — hardware to dashboard."
      meta={`${displayProjects.length} project${displayProjects.length === 1 ? "" : "s"}`}
    >
      <ProjectsGallery projects={displayProjects} />
    </SectionShell>
  );
}
