"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiExternalLink,
  FiEye,
  FiGithub,
  FiImage,
  FiX,
} from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Chip } from "@/components/ui/chip";
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
/** md+: number of cards shown before "Show all" (featured card counts as one). */
const INITIAL_VISIBLE = 6;

const categoryIcons: Record<ProjectCategory, IconType> = {
  IoT: FiCpu,
  AI: FiEye,
  Data: FiBarChart2,
};

function isGitHubUrl(url: string) {
  return /github\.com/i.test(url);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ------------------------------------------------------------------ */
/* Card (module level: stable component identity across renders)      */
/* ------------------------------------------------------------------ */

function ProjectPlaceholder({ category }: { category: ProjectCategory }) {
  const Icon = categoryIcons[category];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-2 text-ink-3">
      <Icon aria-hidden="true" className="size-8" />
      <span className="font-mono text-lg tracking-[0.08em] uppercase">{category}</span>
    </div>
  );
}

type ProjectCardProps = {
  project: ProjectCardItem;
  /** "P-01" style index within the current filter. */
  code: string;
  featured: boolean;
  onOpen: (trigger: HTMLButtonElement) => void;
};

function ProjectCard({ project, code, featured, onOpen }: ProjectCardProps) {
  const cover = project.coverImages[0];
  const imageCount = project.coverImages.length;
  const chips = project.techStack.slice(0, 3);
  const extraChips = project.techStack.length - chips.length;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface",
        "transition-[translate,border-color,box-shadow] duration-(--dur-base) ease-out",
        "hover:border-line-strong hover:shadow-(--shadow-card) motion-safe:hover:-translate-y-0.5 active:translate-y-0",
        "has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-2 has-[button:focus-visible]:outline-focus",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden border-b border-line bg-surface-2",
          featured ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]",
        )}
      >
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes={featured ? "(min-width:1024px) 780px, (min-width:768px) 50vw, 85vw" : "(min-width:1024px) 380px, (min-width:768px) 50vw, 85vw"}
            className="object-cover motion-safe:transition-transform motion-safe:duration-(--dur-slow) motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <ProjectPlaceholder category={project.labels[0] ?? "IoT"} />
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.labels.slice(0, 2).map((label) => (
            <CategoryBadge key={label} category={label} />
          ))}
        </div>
        <span className="absolute top-3 right-3 rounded-xs bg-surface/90 px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-2">
          {code}
        </span>
        {imageCount > 1 ? (
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-xs bg-surface/90 px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-2">
            <FiImage aria-hidden="true" className="size-3" />
            {imageCount}
            <span className="sr-only"> images</span>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="t-h3 text-ink">
          {/* Stretched button: the whole card is the hit area, the accessible name is the title. */}
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(event) => onOpen(event.currentTarget)}
            className="block w-full cursor-pointer text-left outline-none after:absolute after:inset-0 after:content-['']"
          >
            <span className="line-clamp-2">{project.title}</span>
          </button>
        </h3>
        <p className="line-clamp-3 t-small text-ink-2">{project.description}</p>
        {chips.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {chips.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
            {extraChips > 0 ? (
              <Chip>
                +{extraChips}
                <span className="sr-only"> more</span>
              </Chip>
            ) : null}
          </div>
        ) : null}
        <div
          aria-hidden="true"
          className={cn("flex items-center justify-between border-t border-line pt-3", chips.length === 0 && "mt-auto")}
        >
          <span className="font-mono text-xs text-ink-3">Details</span>
          <FiArrowUpRight className="size-4 text-accent transition-transform duration-(--dur-base) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Detail dialog (native <dialog> + showModal: top layer, focus trap,  */
/* Escape, inert background; scroll lock comes from globals.css)        */
/* ------------------------------------------------------------------ */

type ProjectDialogProps = {
  project: ProjectCardItem;
  code: string;
  onClosed: () => void;
};

function ProjectDialog({ project, code, onClosed }: ProjectDialogProps) {
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
          <span className="font-mono text-xs text-ink-3">{code}</span>
          <span aria-hidden="true" className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
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
                        className="absolute top-1/2 left-3 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-line-strong bg-surface text-ink transition-colors duration-(--dur-fast) hover:bg-surface-2 md:inline-flex"
                      >
                        <FiChevronLeft aria-hidden="true" className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo(activeIndex + 1)}
                        aria-label="Next image"
                        className="absolute top-1/2 right-3 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-line-strong bg-surface text-ink transition-colors duration-(--dur-fast) hover:bg-surface-2 md:inline-flex"
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
                            index === activeIndex ? "outline-2 outline-offset-1 outline-accent" : "opacity-70 hover:opacity-100",
                          )}
                        >
                          <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                        </button>
                      ))}
                    </div>
                    <span className="shrink-0 font-mono text-xs text-ink-3" aria-live="polite">
                      {activeIndex + 1} / {total}
                    </span>
                  </div>
                ) : null}
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6 lg:overflow-y-auto lg:p-8">
            {project.labels.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {project.labels.map((label) => (
                  <CategoryBadge key={label} category={label} withIcon />
                ))}
              </div>
            ) : null}
            <h2 id={titleId} className="mt-4 t-h2 text-[1.75rem] text-ink">
              {project.title}
            </h2>
            <p className="mt-4 whitespace-pre-line text-ink-2">{project.description}</p>

            {project.techStack.length > 0 ? (
              <>
                <p className="mt-6 t-eyebrow text-ink-3">Stack</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
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

type ActiveProject = { project: ProjectCardItem; code: string };

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [active, setActive] = useState<ActiveProject | null>(null);
  const [railIndex, setRailIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const counts = CATEGORIES.map((category) => ({
    category,
    count: projects.filter((project) => project.labels.includes(category)).length,
  })).filter(({ count }) => count > 0);

  const filtered = filter === "All" ? projects : projects.filter((project) => project.labels.includes(filter));
  const hasFeatured = filter === "All" && filtered.length > 1;
  // md+: show the first INITIAL_VISIBLE; on lg the featured card spans 2 columns, so show one less
  // to keep two full rows. The mobile rail always shows everything.
  const lgLimit = hasFeatured ? INITIAL_VISIBLE - 1 : INITIAL_VISIBLE;
  const moreMd = filtered.length > INITIAL_VISIBLE;
  const moreLg = filtered.length > lgLimit;

  const selectFilter = (next: Filter) => {
    if (next === filter) return;
    const count = next === "All" ? projects.length : projects.filter((project) => project.labels.includes(next)).length;
    setFilter(next);
    setShowAll(false);
    setRailIndex(0);
    railRef.current?.scrollTo({ left: 0 });
    setAnnouncement(
      next === "All"
        ? `Showing all ${count} projects`
        : `Showing ${count} ${next} project${count === 1 ? "" : "s"}`,
    );
  };

  // Mobile rail counter: the card that is ≥60% visible inside the rail.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof IntersectionObserver === "undefined") return;
    const items = Array.from(rail.querySelectorAll<HTMLElement>("[data-rail-item]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.railItem);
            if (!Number.isNaN(index)) setRailIndex(index);
          }
        }
      },
      { root: rail, threshold: 0.6 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [filter, projects]);

  const openProject = useCallback((project: ProjectCardItem, code: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive({ project, code });
  }, []);

  const handleClosed = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  if (projects.length === 0) {
    return <p className="text-ink-2">Projects are being documented. Check back soon.</p>;
  }

  const chipClass = (selected: boolean) =>
    cn(
      "inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-sm border px-3 font-mono text-xs tracking-[0.08em] uppercase",
      "transition-colors duration-(--dur-fast)",
      selected
        ? "border-ink bg-ink text-bg dark:border-primary dark:bg-primary dark:text-on-primary"
        : "border-line-strong text-ink-2 hover:border-ink hover:text-ink",
    );

  const filters: { value: Filter; count: number }[] = [
    { value: "All", count: projects.length },
    ...counts.map(({ category, count }) => ({ value: category as Filter, count })),
  ];

  return (
    <div>
      {filters.length > 2 ? (
        <div
          role="group"
          aria-label="Filter projects"
          className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 py-1 sm:-mx-6 sm:px-6 md:mx-0 md:mb-8 md:flex-wrap md:px-0"
        >
          {filters.map(({ value, count }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              aria-controls={listId}
              onClick={() => selectFilter(value)}
              className={chipClass(filter === value)}
            >
              {value}
              <span>({count})</span>
            </button>
          ))}
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {/* One list: swipe rail below md, grid from md. */}
      <ul
        id={listId}
        ref={railRef}
        className={cn(
          "no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pt-1 pb-4",
          "sm:-mx-6 sm:scroll-px-6 sm:px-6",
          "md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:p-0 lg:grid-cols-3",
        )}
      >
        {filtered.map((project, index) => {
          const featured = hasFeatured && index === 0;
          const code = `P-${pad(index + 1)}`;
          const hiddenMd = !showAll && index >= INITIAL_VISIBLE;
          const hiddenLg = !showAll && index >= lgLimit;
          return (
            <li
              key={`${project.title}-${index}`}
              data-rail-item={index}
              className={cn(
                "w-[85%] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none",
                featured && "lg:col-span-2",
                hiddenMd && "md:hidden",
                hiddenLg && "lg:hidden",
              )}
            >
              <ProjectCard
                project={project}
                code={code}
                featured={featured}
                onOpen={(trigger) => openProject(project, code, trigger)}
              />
            </li>
          );
        })}
      </ul>

      {filtered.length > 1 ? (
        <p aria-hidden="true" className="mt-2 font-mono text-xs text-ink-3 md:hidden">
          {pad(Math.min(railIndex + 1, filtered.length))} / {pad(filtered.length)}
        </p>
      ) : null}

      {moreLg ? (
        <div className={cn("mt-10 hidden justify-center", moreMd && "md:flex", "lg:flex")}>
          <Button
            variant="secondary"
            aria-expanded={showAll}
            aria-controls={listId}
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? "Show fewer projects" : `Show all ${filtered.length} projects`}
          </Button>
        </div>
      ) : null}

      {active ? <ProjectDialog key={active.code} project={active.project} code={active.code} onClosed={handleClosed} /> : null}
    </div>
  );
}
