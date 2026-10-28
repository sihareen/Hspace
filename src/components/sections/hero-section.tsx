import Image from "next/image";
import { FiArrowDown, FiDownload } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SignalDot } from "@/components/ui/signal-dot";
import { availability } from "@/data/site-content";

const techStack = ["Embedded C", "LoRa", "MQTT", "RTOS", "ESP32", "STM32", "Python", "Laravel"];

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative scroll-mt-20 overflow-hidden border-b border-line bg-bg"
    >
      <div className="relative container-page grid gap-12 py-12 sm:py-16 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* Left: identity + CTAs */}
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
            Instrumentation for the <br className="hidden sm:block" />
            <span className="text-primary">physical</span> world.
          </h1>

          <p className="mt-6 max-w-[45ch] t-hero-sub">
            I design field-ready IoT, embedded and telemetry systems, from circuit and firmware to the
            dashboard and edge AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
            {techStack.map((tech) => (
              <span key={tech} className="t-chip font-medium text-ink-3 border border-line px-2 py-0.5 rounded-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary" className="grow basis-40 sm:grow-0 sm:basis-auto">
              <FiArrowDown aria-hidden="true" />
              View projects
            </Button>
            <Button href="/cv.pdf" download variant="secondary" className="grow basis-40 sm:grow-0 sm:basis-auto">
              <FiDownload aria-hidden="true" />
              Download CV
            </Button>
          </div>
        </div>

        {/* Right: feature image */}
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
                Fig. 01: Feature Profile
              </span>
            </div>
            <figcaption>
              <div className="p-5 border-t border-line bg-surface">
                <p className="t-small text-ink-2 italic">
                  Focus: Embedded systems, networked telemetry, and precise instrumentation.
                </p>
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}