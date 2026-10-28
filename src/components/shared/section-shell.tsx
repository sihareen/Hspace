import type { ReactNode } from "react";

import { cn } from "@/components/ui/cn";
import { Eyebrow } from "@/components/ui/eyebrow";

export type SectionTone = "bg" | "band";

type SectionShellProps = {
  id: string;
  /** Section title, rendered as authored (sentence case) in an h2. */
  title: ReactNode;
  /** Two-digit section number, e.g. "02". */
  number?: string;
  /** @deprecated Use `number`. Kept so phase-A call sites still compile. */
  sectionNumber?: string;
  /** Short eyebrow label after the number, e.g. "Work" → "02 / Work". Defaults to `title` when it is a string. */
  eyebrow?: string;
  /** Optional lede under the title. */
  intro?: ReactNode;
  /** Optional right-aligned slot on md+ (same baseline as the h2), e.g. "10 projects". */
  meta?: ReactNode;
  /** "bg" = page background (default); "band" = surface band with top/bottom border. */
  tone?: SectionTone;
  /** Extra classes on the inner container (e.g. "max-w-[880px]"). */
  containerClassName?: string;
  className?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  title,
  number,
  sectionNumber,
  eyebrow,
  intro,
  meta,
  tone = "bg",
  containerClassName,
  className,
  children,
}: SectionShellProps) {
  const num = number ?? sectionNumber;
  const eyebrowLabel = eyebrow ?? (typeof title === "string" ? title : undefined);
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-20 py-20 md:py-28",
        tone === "band" ? "border-y border-line bg-surface" : "bg-bg",
        className,
      )}
    >
      <div className={cn("container-page", containerClassName)}>
        <header className="mb-10 md:mb-14">
          <div className="md:flex md:items-end md:justify-between md:gap-8">
            <div className="min-w-0">
              {eyebrowLabel || num ? (
                <Eyebrow number={num} className="mb-4">
                  {eyebrowLabel}
                </Eyebrow>
              ) : null}
              <h2 id={headingId} className="t-h2 text-balance text-ink">
                {title}
              </h2>
            </div>
            {meta ? <div className="mt-3 shrink-0 t-chip text-ink-3 md:mt-0 md:pb-1.5">{meta}</div> : null}
          </div>
          {intro ? <div className="mt-4 max-w-[60ch] t-lede text-ink-2">{intro}</div> : null}
          <div aria-hidden="true" className="mt-6 flex items-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <div className="size-1.5 bg-accent" />
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
