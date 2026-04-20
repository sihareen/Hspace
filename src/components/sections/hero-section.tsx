import { heroContent } from "@/data/site-content";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-cyan-400/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,255,0.22),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.2),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.7),transparent)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-24 sm:px-10 lg:py-32">
        <p className="max-w-fit rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200">
          Portfolio 2026
        </p>

        <h1 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl leading-[1.1] text-slate-50 sm:text-6xl lg:text-7xl">
          {heroContent.headline}
        </h1>

        <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{heroContent.subtitle}</p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={heroContent.ctaTarget}
            className="inline-flex items-center rounded-md border border-cyan-300/50 bg-cyan-300/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
          >
            {heroContent.ctaLabel}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-indigo-300/45 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-100 transition hover:border-indigo-200"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
