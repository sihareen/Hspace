import Image from "next/image";
import { FiArrowDown, FiDownload } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SignalDot } from "@/components/ui/signal-dot";
import { availability } from "@/data/site-content";

const disciplines = ["IoT Architecture", "Embedded Firmware", "Telemetry & Comms", "Edge AI"];

const specRows: { key: string; value: string }[] = [
  { key: "Role", value: "Electrical Engineer" },
  { key: "Focus", value: "IoT · Embedded · Telemetry" },
  { key: "Edu", value: "B.Eng, Universitas Lampung" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative scroll-mt-20 overflow-hidden border-b border-line bg-bg"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint mask-fade-hero" />

      <div className="relative container-page grid gap-12 py-12 sm:py-16 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* Left: identity + CTAs (not wrapped in Reveal: above the fold / LCP) */}
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 t-eyebrow">
            {availability.open ? (
              <span className="inline-flex items-center gap-2 text-signal">
                <SignalDot />
                {availability.label}
              </span>
            ) : null}
            <span className="text-ink-3">
              {availability.open ? <span aria-hidden="true" className="hidden sm:inline">· </span> : null}
              Electrical Engineer
            </span>
          </p>

          <h1 id="hero-title" className="mt-5 t-display text-balance text-ink">
            Muhammad Rizkan <br className="hidden sm:block" />
            Harin Faza
          </h1>

          <p className="mt-5 max-w-[38ch] t-lede text-ink-2">
            I design field-ready IoT, embedded and telemetry systems, from circuit and firmware to the
            dashboard and edge AI.
          </p>

          <ul aria-label="Disciplines" className="mt-6 flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <li key={d}>
                <Chip>{d}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary" className="grow basis-40 sm:grow-0 sm:basis-auto">
              <FiArrowDown aria-hidden="true" />
              View projects
            </Button>
            <Button href="/cv.pdf" download variant="secondary" className="grow basis-40 sm:grow-0 sm:basis-auto">
              <FiDownload aria-hidden="true" />
              Download CV <span className="sr-only">(PDF)</span>
            </Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </div>

        {/* Right: spec plate. crop-marks wrapper must not clip; clipping is on the inner frame. */}
        <figure className="crop-marks mx-auto w-full max-w-[420px] lg:mr-0 lg:max-w-[440px]">
          <div className="overflow-hidden rounded-md border border-line bg-surface shadow-(--shadow-card)">
            <div className="relative aspect-[4/3] bg-surface-2 lg:aspect-[4/5]">
              <Image
                src="/profile/me.jpg"
                alt="Portrait of Muhammad Rizkan Harin Faza"
                fill
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 452px) 420px, calc(100vw - 32px)"
                className="object-cover object-[50%_25%] lg:object-[50%_20%]"
              />
              <span className="absolute left-3 top-3 rounded-xs bg-surface/90 px-2 py-1 t-eyebrow text-ink-2">
                Fig. 01: M. R. Harin Faza
              </span>
            </div>
            <figcaption>
              <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 p-5 text-sm">
                {specRows.map((row) => (
                  <div key={row.key} className="contents">
                    <dt className="t-eyebrow text-ink-3">{row.key}</dt>
                    <dd className="text-ink">{row.value}</dd>
                  </div>
                ))}
                {availability.open ? (
                  <div className="contents">
                    <dt className="t-eyebrow text-ink-3">Status</dt>
                    <dd className="flex items-center gap-2 text-signal">
                      <SignalDot />
                      {availability.label}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
