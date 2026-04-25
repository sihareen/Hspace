import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function SectionShell({ id, title, children }: SectionShellProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1320px] px-6 py-16 sm:px-10 lg:px-12 lg:py-22">
      <div className="mb-10 flex items-end justify-between gap-4">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl text-white sm:text-4xl">{title}</h2>
        <span className="h-px w-20 bg-cyan-300/50 sm:w-28" />
      </div>
      {children}
    </section>
  );
}
