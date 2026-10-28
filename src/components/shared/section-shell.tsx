import type { ReactNode } from "react";

import { cn } from "@/components/ui/cn";
import { Eyebrow } from "@/components/ui/eyebrow";

export type SectionTone = "bg" | "band";

type SectionShellProps = {
  id: string;
  title: ReactNode;
  number?: string;
  /** @deprecated Use `number`. */
  sectionNumber?: string;
  eyebrow?: string;
  intro?: ReactNode;
  meta?: ReactNode;
  tone?: SectionTone;
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
