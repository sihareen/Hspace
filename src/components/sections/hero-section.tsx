import { FiArrowDown, FiDownload } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { SignalDot } from "@/components/ui/signal-dot";
import { availability, contactContent } from "@/data/site-content";

const techStack = [
  "Raspberry Pi",
  "ESP32",
  "Arduino",
  "Docker",
  "Python",
  "C/C++",
  "KiCad",
  "Laravel",
  "MQTT",
  "YOLOv8",
];

const systemInfo = [
  { key: "name", value: "Rizkan Harin Faza" },
  { key: "role", value: "Electrical Engineer" },
  { key: "at", value: "Bhinneka Nusantara Mandiri" },
  { key: "focus", value: "Embedded · IoT · Edge AI" },
  { key: "base", value: "Jakarta, Indonesia" },
];

const stats = [
  { value: "3+", label: "Years" },
  { value: "10+", label: "Projects" },
  { value: "15+", label: "Stack" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative scroll-mt-20 overflow-hidden border-b border-line bg-bg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ghost-grid opacity-[0.03]"
      />

      <div className="relative container-page grid gap-10 py-16 sm:py-20 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        {/* Left: identity + CTAs */}
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 t-eyebrow">
            {availability.open ? (
              <span className="inline-flex items-center gap-2 text-signal">
                <SignalDot />
                {availability.label}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-ink-3">
                <span className="inline-block size-2 rounded-full bg-ink-3" aria-hidden="true" />
                {availability.label}
              </span>
            )}
            <span className="text-ink-3">
              <span aria-hidden="true" className="hidden sm:inline">· </span>
              3+ Year in Embedded &amp; IoT
            </span>
          </p>

          <h1 id="hero-title" className="mt-6 t-display text-balance text-ink">
            Engineering the <br className="hidden sm:block" />
            <span className="text-primary">physical</span> world.
          </h1>

          <p className="mt-6 max-w-[52ch] t-hero-sub">
            Electrical Engineering graduate building field-deployed monitoring systems,
            edge computing solutions, and applied AI — from PCB design and firmware
            to production backend.
          </p>

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

        {/* Right: terminal identity card */}
        <div className="crop-marks mx-auto w-full max-w-[440px] lg:mr-0">
          <div className="overflow-hidden rounded-md bg-inverse text-on-inverse shadow-(--shadow-pop) dark:bg-surface-2 dark:text-ink dark:border dark:border-line">
            {/* Terminal title bar */}
            <div className="flex items-center gap-3 border-b border-on-inverse/10 px-4 py-2.5 dark:border-line">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="font-mono text-[0.6875rem] text-on-inverse/50 dark:text-ink-3 tracking-wide">
                rizkan@workstation
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-5 font-mono text-sm leading-relaxed space-y-5">
              {/* whoami */}
              <div>
                <p className="text-on-inverse/40 dark:text-ink-3 text-xs">
                  <span className="text-accent">$</span> whoami
                </p>
                <dl className="mt-2.5 space-y-1">
                  {systemInfo.map((row) => (
                    <div key={row.key} className="flex gap-3">
                      <dt className="w-12 shrink-0 text-on-inverse/40 dark:text-ink-3 text-xs">{row.key}</dt>
                      <dd className="text-on-inverse dark:text-ink text-xs font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* skills */}
              <div>
                <p className="text-on-inverse/40 dark:text-ink-3 text-xs">
                  <span className="text-accent">$</span> skills --list
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex h-5.5 items-center rounded-xs border border-on-inverse/15 bg-on-inverse/5 px-2 text-[0.625rem] text-on-inverse/70 dark:border-line dark:bg-surface dark:text-ink-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* stats */}
              <div className="border-t border-on-inverse/10 pt-4 dark:border-line">
                <p className="text-on-inverse/40 dark:text-ink-3 text-xs mb-3">
                  <span className="text-accent">$</span> stats
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-lg font-bold text-on-inverse dark:text-ink">{stat.value}</p>
                      <p className="text-[0.625rem] text-on-inverse/40 dark:text-ink-3 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* status */}
              <div className="flex items-center justify-between border-t border-on-inverse/10 pt-4 dark:border-line">
                <div className="flex items-center gap-2 text-xs">
                  <span className="size-1.5 rounded-full bg-on-inverse/40 dark:bg-ink-3" aria-hidden="true" />
                  <span className="text-on-inverse/50 dark:text-ink-3">Employed at BNM</span>
                </div>
                <a
                  href={contactContent.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-on-inverse/40 dark:text-ink-3 hover:text-on-inverse dark:hover:text-ink transition-colors duration-(--dur-fast)"
                >
                  @sihareen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
