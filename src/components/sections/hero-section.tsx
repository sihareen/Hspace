import Image from "next/image";

import { heroContent } from "@/data/site-content";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-cyan-400/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,255,0.22),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.2),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.7),transparent)]" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:py-28">
        <div className="flex flex-col gap-8">
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

        <div className="mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-slate-950/60 p-2 shadow-[0_0_0_1px_rgba(34,211,238,0.22),0_25px_45px_rgba(2,6,23,0.6)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,212,255,0.22),transparent_48%)]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/profile/me.jpg"
                alt="Muhammad Rizkan Harin Faza"
                fill
                priority
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1024px) 70vw, 360px"
              />
            </div>
            <div className="relative mt-4 flex items-center justify-between rounded-xl border border-cyan-300/20 bg-slate-950/65 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-100">Rizkan Harin</p>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
