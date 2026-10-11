import type { ReactNode } from "react";

import { cn } from "@/components/ui/cn";

type SectionShellProps = {
  id: string;
  /** Section title, rendered as authored (sentence case) in an h2. */
  title: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Hairline-topped section: title in a 180px left column on lg, content on the right. */
export function SectionShell({ id, title, className, children }: SectionShellProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("pb-16 md:pb-24", className)}>
      <div className="container-page">
        <div className="border-t border-line pt-10 md:pt-14 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-x-12">
          <h2 id={headingId} className="mb-8 t-h2 text-ink lg:mb-0">
            {title}
          </h2>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
