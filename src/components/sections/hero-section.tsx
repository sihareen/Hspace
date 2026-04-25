import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { contactContent } from "@/data/site-content";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.08),transparent_36%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-[1320px] gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:px-12 lg:py-16">
        <div className="z-10 flex max-w-[660px] flex-col items-start gap-6 lg:gap-7">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">IoT Portfolio</p>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl xl:text-[6.25rem]">
            <span className="block">Muhammad Rizkan</span>
            <span className="block">Harin Faza</span>
          </h1>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            IoT & Embedded Systems Engineer
          </p>
          <p className="max-w-[560px] text-base leading-8 text-white/70 lg:text-lg">
            Electrical Engineering graduate focused on intelligent connected systems, embedded technology, AI, and
            data-driven solutions.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="inline-flex items-center rounded-md border border-cyan-300/40 bg-cyan-400/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-300"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="text-sm uppercase tracking-[0.16em] text-white/85 underline underline-offset-4 transition hover:text-cyan-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[620px] flex-col items-center justify-center gap-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300">Contact</p>
          <div className="flex items-center justify-center gap-5">
            <a
              href={`mailto:${contactContent.email}`}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:text-cyan-300"
              aria-label="Email"
            >
              <FiMail className="h-5 w-5" />
            </a>
            <a
              href={contactContent.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:text-cyan-300"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a
              href={contactContent.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:text-cyan-300"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
