import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { projects } from "@/data/site-content";
import { prisma } from "@/lib/prisma";

type DisplayProject = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
  coverImage: string | null;
};

export async function ProjectsSection() {
  let publishedProjects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    publishedProjects = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
      take: 6,
    });
  } catch {
    // During early deploy/setup, DB might be unavailable.
    // Fallback to static project data so build/runtime still works.
    publishedProjects = [];
  }

  const displayProjects: DisplayProject[] =
    publishedProjects.length > 0
      ? publishedProjects.map((project) => ({
          title: project.title,
          description: project.description,
          techStack: project.techStack.split(",").map((item) => item.trim()),
          externalUrl: project.externalUrl,
          coverImage: project.coverImage,
        }))
      : projects.map((project) => ({ ...project, coverImage: null }));

  return (
    <SectionShell id="projects" title="Projects">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {displayProjects.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-2xl border border-indigo-300/15 bg-slate-900/70 shadow-[0_0_0_1px_rgba(59,130,246,0.08),0_14px_34px_rgba(8,15,35,0.5)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
          >
            <div className="relative h-36 border-b border-cyan-300/10 bg-[linear-gradient(120deg,rgba(56,189,248,0.16),rgba(99,102,241,0.16),rgba(14,116,144,0.08))]">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover opacity-85 transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.22em] text-cyan-100/90">
                  Engineering Work
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-xl text-slate-100">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((stack) => (
                  <li
                    key={`${project.title}-${stack}`}
                    className="rounded-full border border-indigo-300/20 px-3 py-1 text-xs uppercase tracking-[0.15em] text-indigo-200"
                  >
                    {stack}
                  </li>
                ))}
              </ul>

              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200 transition group-hover:text-cyan-100"
              >
                Open Project
                <FiExternalLink aria-hidden />
              </a>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
