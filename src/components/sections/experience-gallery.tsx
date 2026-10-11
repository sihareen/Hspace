"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

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

function TimelineEntry({ item }: { item: ExperienceCardItem }) {
  const [expanded, setExpanded] = useState(false);
  const descriptionId = useId();
  const isLong = item.description.length > CLAMP_THRESHOLD;

  return (
    <li className="grid gap-1 md:grid-cols-[132px_minmax(0,1fr)] md:gap-x-8">
      <p className="t-small tabular-nums text-ink-3 md:pt-0.5">{item.period}</p>
      <div className="min-w-0">
        <h3 className="t-h3 text-pretty wrap-break-word text-ink">{item.title}</h3>
        {item.company ? <p className="text-[0.9375rem] text-ink-2">{item.company}</p> : null}

        {item.description ? (
          <p
            id={descriptionId}
            className={cn(
              "mt-3 max-w-[62ch] whitespace-pre-line text-ink-2",
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

        {item.tags.length > 0 ? <p className="mt-3 t-small text-ink-3">{item.tags.join(", ")}</p> : null}
      </div>
    </li>
  );
}

export function ExperienceGallery({ items }: ExperienceGalleryProps) {
  if (items.length === 0) return null;

  return (
    <ol className="space-y-12">
      {items.map((item, index) => (
        <TimelineEntry key={`${item.title}-${item.period}-${index}`} item={item} />
      ))}
    </ol>
  );
}
