"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiX } from "react-icons/fi";

export type ProjectCategory = "IoT" | "Embedded" | "AI" | "Data";

export type ProjectCardItem = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
  coverImages: string[];
  labels: ProjectCategory[];
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
  const [activeProject, setActiveProject] = useState<ProjectCardItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.labels.includes(activeFilter));
  }, [activeFilter, projects]);

  const activeProjectImages = activeProject?.coverImages ?? [];
  const activeImage = activeProjectImages[activeImageIndex] ?? null;

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProject(null);
      }

      if (activeProjectImages.length <= 1) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % activeProjectImages.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev - 1 + activeProjectImages.length) % activeProjectImages.length);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeProject, activeProjectImages.length]);

  function openProject(project: ProjectCardItem) {
    setActiveProject(project);
    setActiveImageIndex(0);
  }

  function closeProject() {
    setActiveProject(null);
    setActiveImageIndex(0);
  }

  function nextImage() {
    if (activeProjectImages.length <= 1) {
      return;
    }

    setActiveImageIndex((prev) => (prev + 1) % activeProjectImages.length);
  }

  function prevImage() {
    if (activeProjectImages.length <= 1) {
      return;
    }

    setActiveImageIndex((prev) => (prev - 1 + activeProjectImages.length) % activeProjectImages.length);
  }

  return (
    <>
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
          {filteredProjects.map((project) => {
            const coverImage = project.coverImages[0] ?? null;

            return (
              <article
                key={`${project.title}-${project.labels.join("-")}`}
                role="button"
                tabIndex={0}
                onClick={() => openProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProject(project);
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-black transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
              >
                <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={project.title}
                      fill
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.18em] text-white/55">
                      {project.labels[0] ?? "Project"} Project
                    </div>
                  )}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {project.labels.map((label) => (
                      <span
                        key={`${project.title}-label-${label}`}
                        className="rounded-full border border-cyan-300/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-300"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="truncate-3 min-h-24 text-sm leading-7 text-white/70">{project.description}</p>

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

                  <p className="pt-1 text-[11px] uppercase tracking-[0.16em] text-cyan-300/85">Click card to view</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm sm:px-6">
          <button type="button" className="absolute inset-0" aria-label="Close popup" onClick={closeProject} />

          <article className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#090b0f] shadow-[0_35px_90px_rgba(0,0,0,0.8)] lg:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-[320px] border-b border-white/10 bg-black lg:min-h-[520px] lg:border-b-0 lg:border-r">
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 transition hover:border-cyan-300/50 hover:text-cyan-300"
                aria-label="Close project popup"
              >
                <FiX />
              </button>

              {activeImage ? (
                <>
                  <Image
                    src={activeImage}
                    alt={`${activeProject.title} preview ${activeImageIndex + 1}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />

                  {activeProjectImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white/85 transition hover:border-cyan-300/50 hover:text-cyan-300"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white/85 transition hover:border-cyan-300/50 hover:text-cyan-300"
                        aria-label="Next image"
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  ) : null}

                  {activeProjectImages.length > 1 ? (
                    <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3 py-1.5">
                      {activeProjectImages.map((_, index) => (
                        <button
                          type="button"
                          key={`${activeProject.title}-dot-${index}`}
                          onClick={() => setActiveImageIndex(index)}
                          className={`h-2.5 w-2.5 rounded-full ${
                            activeImageIndex === index ? "bg-cyan-300" : "bg-white/35"
                          }`}
                          aria-label={`Show image ${index + 1}`}
                        />
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.18em] text-white/60">
                  No Image Preview
                </div>
              )}
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {activeProject.labels.map((label) => (
                  <p key={`${activeProject.title}-popup-label-${label}`} className="text-[11px] uppercase tracking-[0.18em] text-cyan-300">
                    {label}
                  </p>
                ))}
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white">{activeProject.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/75">{activeProject.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {activeProject.techStack.map((stack) => (
                  <li
                    key={`${activeProject.title}-popup-${stack}`}
                    className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.13em] text-white/65"
                  >
                    {stack}
                  </li>
                ))}
              </ul>

              <a
                href={activeProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-md border border-cyan-300/45 bg-cyan-500/10 px-4 py-2.5 text-xs uppercase tracking-[0.15em] text-cyan-300 transition hover:border-cyan-300"
              >
                {isGitHubUrl(activeProject.externalUrl) ? <FiGithub aria-hidden /> : <FiExternalLink aria-hidden />}
                View
              </a>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
