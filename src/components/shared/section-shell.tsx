import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function SectionShell({ id, title, children }: SectionShellProps) {
  return (
    <section id={id} className="section-shell mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
      <div className="mb-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(82,130,255,0),rgba(82,130,255,0.65),rgba(82,130,255,0))]" />
        <h2 className="font-[family-name:var(--font-heading)] text-xl uppercase tracking-[0.24em] text-slate-100">
          {title}
        </h2>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(82,130,255,0),rgba(82,130,255,0.65),rgba(82,130,255,0))]" />
      </div>
      {children}
    </section>
  );
}
