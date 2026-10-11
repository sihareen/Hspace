"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiX } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { prefersReducedMotion } from "@/components/ui/scroll-to";

export type ProjectCategory = "IoT" | "AI" | "Data";

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

type Filter = "All" | ProjectCategory;

const CATEGORIES: ProjectCategory[] = ["IoT", "AI", "Data"];
/** Number of cards shown before "Show all" (all breakpoints). */
const INITIAL_VISIBLE = 6;

function isGitHubUrl(url: string) {
  return /github\.com/i.test(url);
}

/* ------------------------------------------------------------------ */
/* Card (module level: stable component identity across renders)      */
/* ------------------------------------------------------------------ */

function ProjectPlaceholder({ category }: { category: ProjectCategory }) {
  return <div className="absolute inset-0 flex items-end bg-surface-2 p-4 t-small text-ink-3">{category}</div>;
}

type ProjectCardProps = {
  project: ProjectCardItem;
  onOpen: (trigger: HTMLButtonElement) => void;
};

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cover = project.coverImages[0];

  return (
    <article className="group relative rounded-sm has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-4 has-[button:focus-visible]:outline-focus">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-2">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width:1024px) 390px, (min-width:640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ProjectPlaceholder category={project.labels[0] ?? "IoT"} />
        )}
      </div>
      <h3 className="mt-4 t-h3 text-ink">
        {/* Stretched button: the whole card is the hit area, the accessible name is the title. */}
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={(event) => onOpen(event.currentTarget)}
          className="w-full cursor-pointer text-left decoration-1 underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </button>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[0.9375rem] text-ink-2">{project.description}</p>
      {project.techStack.length > 0 ? (
        <p className="mt-2 t-small text-ink-3">{project.techStack.slice(0, 3).join(", ")}</p>
      ) : null}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Detail dialog (native <dialog> + showModal: top layer, focus trap,  */
/* Escape, inert background; scroll lock comes from globals.css)        */
/* ------------------------------------------------------------------ */

type ProjectDialogProps = {
  project: ProjectCardItem;
  onClosed: () => void;
};

function ProjectDialog({ project, onClosed }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const titleId = useId();
  const images = project.coverImages;
  const total = images.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  const close = () => dialogRef.current?.close();

  const goTo = useCallback(
    (index: number) => {
      const strip = stripRef.current;
      if (!strip || total === 0) return;
      const next = (index + total) % total;
      strip.scrollTo({ left: next * strip.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      setActiveIndex(next);
    },
    [total],
  );

  const handleScroll = () => {
    const strip = stripRef.current;
    if (!strip || strip.clientWidth === 0) return;
    const index = Math.round(strip.scrollLeft / strip.clientWidth);
    if (index !== activeIndex && index >= 0 && index < total) setActiveIndex(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (total < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  // Backdrop click: the dialog box has no padding, so a click whose target is the
  // <dialog> itself landed on ::backdrop.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const isGitHub = isGitHubUrl(project.externalUrl);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => {
        // Ignore a stale close event (e.g. dev StrictMode close→reopen).
        if (!dialogRef.current?.open) onClosed();
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-surface p-0 text-ink",
        "md:m-auto md:h-auto md:max-h-[88dvh] md:w-[calc(100%-4rem)] md:max-w-[760px] md:rounded-md md:border md:border-line md:shadow-(--shadow-pop)",
        "lg:max-w-[1080px]",
        "motion-safe:transition-[translate,opacity] motion-safe:duration-(--dur-slow) motion-safe:ease-out",
        "motion-safe:starting:translate-y-6 motion-safe:starting:opacity-0",
      )}
    >
      <div className="flex h-dvh flex-col md:h-auto md:max-h-[88dvh]">
        {/* Sticky top bar: always-visible close button */}
        <div className="flex shrink-0 items-center gap-3 border-b border-line bg-surface py-1.5 pr-1.5 pl-4 md:pl-6">
          <span aria-hidden="true" className="min-w-0 flex-1 truncate text-sm font-semibold text-ink lg:invisible">
            {project.title}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close project details"
            className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-sm text-ink-2 transition-colors duration-(--dur-fast) hover:bg-surface-2 hover:text-ink"
          >
            <FiX aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-[1.35fr_1fr] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden">
          {/* Gallery */}
          <div className="p-4 md:p-6 lg:overflow-y-auto lg:border-r lg:border-line">
            {total === 0 ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <ProjectPlaceholder category={project.labels[0] ?? "IoT"} />
              </div>
            ) : (
              <>
                <div className="relative">
                  <div
                    ref={stripRef}
                    onScroll={handleScroll}
                    className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-sm bg-surface-2"
                    aria-label={total > 1 ? `${project.title} images, swipe or use arrow keys` : undefined}
                    role={total > 1 ? "group" : undefined}
                  >
                    {images.map((src, index) => (
                      <div key={`${src}-${index}`} className="relative aspect-[4/3] w-full shrink-0 snap-center">
                        <Image
                          src={src}
                          alt={total > 1 ? `${project.title}, image ${index + 1} of ${total}` : project.title}
                          fill
                          sizes="(min-width:1024px) 600px, (min-width:768px) 712px, 100vw"
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  {total > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => goTo(activeIndex - 1)}
                        aria-label="Previous image"
                        className="absolute top-1/2 left-3 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-line bg-surface text-ink shadow-none transition-colors duration-(--dur-fast) hover:bg-surface-2 md:inline-flex"
                      >
                        <FiChevronLeft aria-hidden="true" className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo(activeIndex + 1)}
                        aria-label="Next image"
                        className="absolute top-1/2 right-3 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-line bg-surface text-ink shadow-none transition-colors duration-(--dur-fast) hover:bg-surface-2 md:inline-flex"
                      >
                        <FiChevronRight aria-hidden="true" className="size-5" />
                      </button>
                    </>
                  ) : null}
                </div>

                {total > 1 ? (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="no-scrollbar -m-1 flex min-w-0 flex-1 gap-2 overflow-x-auto p-1">
                      {images.map((src, index) => (
                        <button
                          key={`thumb-${src}-${index}`}
                          type="button"
                          onClick={() => goTo(index)}
                          aria-label={`Show image ${index + 1} of ${total}`}
                          aria-current={index === activeIndex ? "true" : undefined}
                          className={cn(
                            "relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xs border border-line bg-surface-2",
                            index === activeIndex ? "outline-2 outline-offset-1 outline-ink" : "opacity-70 hover:opacity-100",
                          )}
                        >
                          <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                        </button>
                      ))}
                    </div>
                    <span className="shrink-0 t-small tabular-nums text-ink-3" aria-live="polite">
                      {activeIndex + 1} / {total}
                    </span>
                  </div>
                ) : null}
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6 lg:overflow-y-auto lg:p-8">
            {project.labels.length > 0 ? <p className="t-small text-ink-3">{project.labels.join(" · ")}</p> : null}
            <h2 id={titleId} className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.01em] text-ink">
              {project.title}
            </h2>
            <p className="mt-4 max-w-[62ch] whitespace-pre-line text-ink-2">{project.description}</p>

            {project.techStack.length > 0 ? (
              <>
                <h3 className="mt-8 text-sm font-semibold text-ink">Built with</h3>
                <p className="mt-1 text-[0.9375rem] text-ink-2">{project.techStack.join(", ")}</p>
              </>
            ) : null}

            {project.externalUrl ? (
              <div className="mt-8">
                <Button href={project.externalUrl} external variant="primary">
                  {isGitHub ? <FiGithub aria-hidden="true" /> : <FiExternalLink aria-hidden="true" />}
                  {isGitHub ? "View on GitHub" : "View project"}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                              */
/* ------------------------------------------------------------------ */

type ActiveProject = { project: ProjectCardItem; key: string };

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [active, setActive] = useState<ActiveProject | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listId = useId();

  const counts = CATEGORIES.map((category) => ({
    category,
    count: projects.filter((project) => project.labels.includes(category)).length,
  })).filter(({ count }) => count > 0);

  const filtered = filter === "All" ? projects : projects.filter((project) => project.labels.includes(filter));
  const hasMore = filtered.length > INITIAL_VISIBLE;

  const selectFilter = (next: Filter) => {
    if (next === filter) return;
    const count = next === "All" ? projects.length : projects.filter((project) => project.labels.includes(next)).length;
    setFilter(next);
    setShowAll(false);
    setAnnouncement(
      next === "All"
        ? `Showing all ${count} projects`
        : `Showing ${count} ${next} project${count === 1 ? "" : "s"}`,
    );
  };

  const openProject = useCallback((project: ProjectCardItem, key: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive({ project, key });
  }, []);

  const handleClosed = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  if (projects.length === 0) {
    return <p className="text-ink-2">No projects published yet.</p>;
  }

  const filters: { value: Filter; count: number }[] = [
    { value: "All", count: projects.length },
    ...counts.map(({ category, count }) => ({ value: category as Filter, count })),
  ];

  return (
    <div>
      {filters.length > 2 ? (
        <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-x-6">
          {filters.map(({ value, count }) => {
            const selected = filter === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                aria-controls={listId}
                onClick={() => selectFilter(value)}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center text-[0.9375rem] transition-colors duration-(--dur-fast)",
                  selected ? "text-ink" : "text-ink-3 hover:text-ink",
                )}
              >
                {/* One inline box so the underline runs unbroken under label + count. */}
                <span className={cn(selected && "underline decoration-accent decoration-2 underline-offset-[10px]")}>
                  {value} <span className="text-ink-3 tabular-nums">{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <ul id={listId} className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {filtered.map((project, index) => {
          const key = `${index}-${project.title}`;
          const hidden = !showAll && index >= INITIAL_VISIBLE;
          return (
            <li key={key} className={hidden ? "hidden" : undefined}>
              <ProjectCard project={project} onOpen={(trigger) => openProject(project, key, trigger)} />
            </li>
          );
        })}
      </ul>

      {hasMore ? (
        <button
          type="button"
          aria-expanded={showAll}
          aria-controls={listId}
          onClick={() => setShowAll((value) => !value)}
          className="mt-10 inline-flex min-h-11 cursor-pointer items-center text-[0.9375rem] text-accent underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          {showAll ? "Show fewer projects" : `Show all ${filtered.length} projects`}
        </button>
      ) : null}

      {active ? <ProjectDialog key={active.key} project={active.project} onClosed={handleClosed} /> : null}
    </div>
  );
}
