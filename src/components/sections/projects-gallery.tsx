"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export type ProjectCategory = "IoT" | "Embedded" | "AI" | "Data";

export type ProjectCardItem = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
  coverImage: string | null;
  category: ProjectCategory;
};

type ProjectsGalleryProps = {
  projects: ProjectCardItem[];
};

const filters: Array<"All" | ProjectCategory> = ["All", "IoT", "Embedded", "AI", "Data"];

function isGitHubUrl(url: string) {
  return /github\.com/i.test(url);
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition ${
              activeFilter === filter
                ? "border-cyan-300/60 bg-cyan-500/10 text-cyan-300"
                : "border-white/15 text-white/65 hover:border-cyan-300/35 hover:text-cyan-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={`${project.title}-${project.category}`}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-black transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
          >
            <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.18em] text-white/55">
                  {project.category} Project
                </div>
              )}
              <span className="absolute left-3 top-3 rounded-full border border-cyan-300/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300">
                {project.category}
              </span>
            </div>

            <div className="space-y-5 p-6">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="min-h-24 text-sm leading-7 text-white/70">{project.description}</p>

              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((stack) => (
                  <li
                    key={`${project.title}-${stack}`}
                    className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/65"
                  >
                    {stack}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 pt-1">
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-cyan-300/45 bg-cyan-500/10 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-cyan-300 transition hover:border-cyan-300"
                >
                  {isGitHubUrl(project.externalUrl) ? <FiGithub aria-hidden /> : <FiExternalLink aria-hidden />}
                  {isGitHubUrl(project.externalUrl) ? "GitHub" : "Demo"}
                </a>
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.14em] text-white/60 underline underline-offset-4 transition hover:text-cyan-300"
                >
                  View Link
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
