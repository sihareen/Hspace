"use client";

import { useId, useState } from "react";
import { FiBookOpen, FiBriefcase } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/components/ui/cn";
import { Reveal } from "@/components/ui/reveal";

type ExperienceCardItem = {
  period: string;
  title: string;
  company: string | null;
  description: string;
  tags: string[];
  category: string;
};

type ExperienceGalleryProps = {
  items: ExperienceCardItem[];
};

/** Descriptions longer than this are clamped to 4 lines with an inline "Read more". */
const CLAMP_THRESHOLD = 280;
const CURRENT_PATTERN = /\b(present|now|current|sekarang)\b/i;

type TimelineEntryProps = {
  item: ExperienceCardItem;
  index: number;
};

function TimelineEntry({ item, index }: TimelineEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const descriptionId = useId();
  const isEducation = item.category === "EDUCATION";
  const isCurrent = CURRENT_PATTERN.test(item.period);
  const isLong = item.description.length > CLAMP_THRESHOLD;
  const CategoryIcon = isEducation ? FiBookOpen : FiBriefcase;

  return (
    <Reveal
      as="li"
      delay={Math.min(index, 5) * 60}
      className="relative grid gap-2 pb-10 pl-8 last:pb-0 md:grid-cols-[160px_1fr] md:gap-x-12 md:gap-y-0 md:pl-0"
    >
      {/* Node on the rail: diamond = work, circle = education, filled + pulse = current */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 left-0 size-[15px] border-2 md:left-[176px]",
          isEducation ? "rounded-full" : "rotate-45",
          isCurrent ? "border-signal-dot bg-signal-dot" : "border-accent bg-surface",
        )}
      >
        {isCurrent ? (
          <span
            className={cn(
              "absolute inset-0 bg-signal-dot opacity-60 motion-safe:animate-ping",
              isEducation && "rounded-full",
            )}
          />
        ) : null}
      </span>

      <p
        className={cn(
          "font-mono text-sm md:pt-0.5 md:text-right",
          isCurrent ? "font-medium text-signal" : "text-ink-3",
        )}
      >
        {item.period}
        {isCurrent ? <span className="ml-2 t-eyebrow">· Now</span> : null}
      </p>

      <div className="min-w-0 rounded-sm border border-line bg-bg p-5 transition-colors duration-(--dur-fast) hover:border-line-strong md:p-6">
        <p className="flex items-center gap-3 font-mono text-xs text-ink-3">
          <span>X-{String(index + 1).padStart(2, "0")}</span>
          <span className="inline-flex items-center gap-1.5 tracking-[0.08em] uppercase">
            <CategoryIcon aria-hidden="true" className="size-3.5" />
            {isEducation ? "Education" : "Work"}
          </span>
        </p>
        <h3 className="mt-2 t-h3 text-pretty wrap-break-word text-ink">{item.title}</h3>
        {item.company ? <p className="mt-1 text-[0.9375rem] font-medium text-accent">{item.company}</p> : null}

        {item.description ? (
          <p
            id={descriptionId}
            className={cn(
              "mt-3 max-w-[62ch] leading-[1.65] whitespace-pre-line text-ink-2",
              isLong && !expanded && "line-clamp-4",
            )}
          >
            {item.description}
          </p>
        ) : null}
        {isLong ? (
          <Button
            variant="ghost"
            className="mt-1 -ml-1"
            aria-expanded={expanded}
            aria-controls={descriptionId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        ) : null}

        {item.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

export function ExperienceGallery({ items }: ExperienceGalleryProps) {
  if (items.length === 0) return null;

  return (
    <ol className="relative mx-auto max-w-[880px] before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-line-strong md:before:left-[183px]">
      {items.map((item, index) => (
        <TimelineEntry key={`${item.title}-${item.period}-${index}`} item={item} index={index} />
      ))}
    </ol>
  );
}
