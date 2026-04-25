import Image from "next/image";

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

        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_90px_rgba(0,0,0,0.82)]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 z-10 bg-cyan-500/5" />
            <div className="absolute inset-0 grayscale">
              <Image
                src="/profile/me.jpg"
                alt="Muhammad Rizkan Harin Faza"
                fill
                priority
                className="object-cover object-[center_22%]"
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </div>
            <div className="absolute bottom-5 left-5 z-20 rounded-full border border-cyan-300/35 bg-black/70 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan-200">
              Engineer Profile
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
