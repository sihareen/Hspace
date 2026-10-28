import Image from "next/image";
import type { Project } from "@prisma/client";

import { SectionShell } from "@/components/shared/section-shell";
import { projects } from "@/data/site-content";
import { parseProjectCoverImages } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";

type ProjectTableItem = {
  number: string;
  title: string;
  stack: string[];
  description: string;
  externalUrl: string;
  coverImages: string[];
};

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

  const displayProjects: ProjectTableItem[] =
    publishedProjects.length > 0
      ? publishedProjects.map((project, index) => {
          const techStack = project.techStack
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

          const coverImages = parseProjectCoverImages(project.coverImage);

          return {
            number: String(index + 1).padStart(2, "0"),
            title: project.title,
            description: project.description,
            stack: techStack,
            externalUrl: project.externalUrl,
            coverImages,
          };
        })
      : [
          {
            number: "01",
            title: "PUMMA U-TEWS",
            description: "Early warning telemetry system for disaster monitoring. Embedded firmware, LoRa mesh networking, and cloud ingestion pipeline.",
            stack: ["Embedded C", "Sensors", "Telemetry", "LoRa", "MQTT"],
            externalUrl: "#",
            coverImages: [],
          },
          {
            number: "02",
            title: "Dashboard Climate",
            description: "Environmental monitoring dashboard with real-time sensor data visualization, historical analysis, and alerting.",
            stack: ["Laravel", "MySQL", "Chart.js", "MQTT", "REST API"],
            externalUrl: "#",
            coverImages: [],
          },
          {
            number: "03",
            title: "Rubus IOC",
            description: "IoT power monitoring and control system for distributed infrastructure. LoRaWAN edge nodes with centralized management.",
            stack: ["LoRa", "IoT", "Power Systems", "ESP32", "Python"],
            externalUrl: "#",
            coverImages: [],
          },
        ];

  return (
    <SectionShell
      id="projects"
      number="02"
      eyebrow="Work"
      title="Selected projects"
      intro="Field deployments, embedded devices and telemetry systems: hardware to dashboard."
      meta={`${displayProjects.length} project${displayProjects.length === 1 ? "" : "s"}`}
    >
      <div className="overflow-x-auto">
        <table className="table-project w-full" aria-label="Projects list">
          <thead>
            <tr className="table-project-tr">
              <th className="table-project-th w-[60px]">NO.</th>
              <th className="table-project-th">PROJECT</th>
              <th className="table-project-th w-[280px] md:w-[320px]">STACK</th>
              <th className="table-project-th w-[100px]">REF</th>
              <th className="table-project-th w-[100px]">LINK</th>
            </tr>
          </thead>
          <tbody>
            {displayProjects.map((project, index) => (
              <tr key={project.title} className="table-project-tr proj-row">
                <td className="table-project-td t-table-mono text-ink-3 w-[60px] font-mono">
                  {project.number}
                </td>
                <td className="table-project-td">
                  <div>
                    <h3 className="t-h3 text-ink">{project.title}</h3>
                    <p className="mt-1 t-small text-ink-2 max-w-md">{project.description}</p>
                    {project.coverImages.length > 0 && (
                      <div className="mt-3 hidden lg:block">
                        <Image
                          src={project.coverImages[0]}
                          alt={`${project.title} preview`}
                          width={80}
                          height={60}
                          className="rounded-xs border border-line object-cover opacity-70 hover:opacity-100 transition-opacity duration-(--dur-fast)"
                        />
                      </div>
                    )}
                  </div>
                </td>
                <td className="table-project-td w-[280px] md:w-[320px]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="t-chip font-medium text-ink-3 border border-line px-2 py-0.5 rounded-xs whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="t-chip text-ink-3 border border-line px-2 py-0.5 rounded-xs">
                        +{project.stack.length - 5} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="table-project-td t-table-mono text-ink-3 font-mono w-[100px]">
                  Fig. {project.number}
                </td>
                <td className="table-project-td w-[100px]">
                  {project.externalUrl && project.externalUrl !== "#" ? (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 t-small text-primary hover:text-primary-hover font-medium"
                    >
                      View
                      <svg
                        aria-hidden="true"
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    <span className="t-small text-ink-3">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}