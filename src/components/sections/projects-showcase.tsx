"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from "react-icons/fi";

type DisplayProject = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
  coverImages: string[];
};

type ProjectsShowcaseProps = {
  projects: DisplayProject[];
};

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeProject = useMemo(() => {
    if (activeProjectIndex === null) {
      return null;
    }

    return projects[activeProjectIndex] ?? null;
  }, [activeProjectIndex, projects]);

  const activeImages = activeProject?.coverImages ?? [];
  const hasImages = activeImages.length > 0;

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProjectIndex(null);
        return;
      }

      if (!hasImages) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) => (current + 1) % activeImages.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) => (current - 1 + activeImages.length) % activeImages.length);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeImages.length, activeProject, hasImages]);

  function openProject(index: number) {
    setActiveProjectIndex(index);
    setActiveImageIndex(0);
  }

  function closeProject() {
    setActiveProjectIndex(null);
  }

  function prevImage() {
    if (!hasImages) {
      return;
    }
    setActiveImageIndex((current) => (current - 1 + activeImages.length) % activeImages.length);
  }

  function nextImage() {
    if (!hasImages) {
      return;
    }
    setActiveImageIndex((current) => (current + 1) % activeImages.length);
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-2xl border border-indigo-300/15 bg-slate-900/70 shadow-[0_0_0_1px_rgba(59,130,246,0.08),0_14px_34px_rgba(8,15,35,0.5)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
          >
            <button type="button" onClick={() => openProject(index)} className="block w-full text-left">
              <div className="relative h-40 border-b border-cyan-300/10 bg-[linear-gradient(120deg,rgba(56,189,248,0.16),rgba(99,102,241,0.16),rgba(14,116,144,0.08))]">
                {project.coverImages[0] ? (
                  <Image
                    src={project.coverImages[0]}
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
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-300">{project.description}</p>

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

                <p className="mt-5 text-xs uppercase tracking-[0.16em] text-cyan-200/90">
                  Click card to view details
                </p>
              </div>
            </button>
          </article>
        ))}
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6">
          <div
            className="absolute inset-0"
            role="button"
            tabIndex={0}
            onClick={closeProject}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                closeProject();
              }
            }}
            aria-label="Close modal backdrop"
          />

          <article className="relative z-10 grid w-full max-w-5xl gap-4 overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-900/95 shadow-[0_30px_90px_rgba(2,8,23,0.85)] md:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-72 border-b border-cyan-300/10 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,255,0.2),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.24),transparent_40%),rgba(15,23,42,0.92)] md:min-h-[440px] md:border-b-0 md:border-r">
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-200/30 bg-slate-950/75 text-cyan-100 transition hover:border-cyan-200/60"
                aria-label="Close project detail"
              >
                <FiX />
              </button>

              {hasImages ? (
                <>
                  <Image
                    src={activeImages[activeImageIndex]}
                    alt={`${activeProject.title} image ${activeImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                  />
                  {activeImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200/30 bg-slate-950/65 text-cyan-100 transition hover:border-cyan-200/60"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200/30 bg-slate-950/65 text-cyan-100 transition hover:border-cyan-200/60"
                        aria-label="Next image"
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  ) : null}

                  <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-200/30 bg-slate-950/75 px-3 py-1.5">
                    {activeImages.map((_, imageIndex) => (
                      <button
                        type="button"
                        key={`${activeProject.title}-dot-${imageIndex}`}
                        onClick={() => setActiveImageIndex(imageIndex)}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          activeImageIndex === imageIndex ? "bg-cyan-200" : "bg-cyan-200/35"
                        }`}
                        aria-label={`Show image ${imageIndex + 1}`}
                      />
                    ))}
                    <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100/85">
                      {activeImageIndex + 1}/{activeImages.length}
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="rounded-xl border border-cyan-200/20 bg-slate-950/50 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">No Preview Image</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl text-slate-50">{activeProject.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{activeProject.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2.5">
                {activeProject.techStack.map((stack) => (
                  <li
                    key={`${activeProject.title}-modal-${stack}`}
                    className="rounded-full border border-indigo-300/25 px-3 py-1 text-xs uppercase tracking-[0.14em] text-indigo-100"
                  >
                    {stack}
                  </li>
                ))}
              </ul>

              <a
                href={activeProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-md border border-cyan-300/55 bg-cyan-300/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-300/20"
              >
                Open Project
                <FiExternalLink aria-hidden />
              </a>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
