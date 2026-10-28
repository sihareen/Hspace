import { FiArrowRight } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const datasheet: { key: string; value: string }[] = [
  { key: "Discipline", value: "Electrical Engineering" },
  { key: "Degree", value: "B.Eng, Universitas Lampung" },
  { key: "Thesis", value: "Python-based telemetry for remote ocean monitoring" },
  { key: "Focus", value: "IoT · Embedded · Telemetry · Edge AI" },
  { key: "Domains", value: "Disaster early warning, environmental monitoring, industrial QC" },
];

const strong = "font-semibold text-ink";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      number="05"
      eyebrow="About"
      title="Engineer for the field, not just the lab."
      tone="band"
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="min-w-0 max-w-[65ch] space-y-5 text-ink-2">
          <p className="t-lede text-ink">
            Electrical Engineer specializing in IoT architecture, embedded systems, and telemetry networks. My work
            spans the complete engineering stack: electronic circuit interfacing, firmware development, communication
            protocols, instrumentation systems, and edge AI deployment.
          </p>
          <p>
            Projects include <strong className={strong}>tsunami early warning buoy systems</strong>,{" "}
            <strong className={strong}>emergency VoIP communication networks</strong>,{" "}
            <strong className={strong}>AI-powered quality control systems</strong>, and autonomous connected devices.
            Each implementation emphasizes reliable field operation, robust electronic design, and measurable outcomes.
          </p>
          <p>
            Bachelor of Electrical Engineering from Universitas Lampung. Thesis focused on Python-based telemetry
            transmission systems for remote ocean monitoring platforms.
          </p>
        </Reveal>

        <Reveal as="aside" delay={60} className="min-w-0 self-start">
          <div aria-labelledby="datasheet-title" role="group" className="rounded-sm border border-line bg-bg shadow-(--shadow-card)">
            <p id="datasheet-title" className="flex items-center gap-2 border-b border-line px-5 py-3 t-eyebrow text-ink-3">
              <span className="inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
              Datasheet: RHF-01
            </p>
            <dl>
              {datasheet.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[88px_1fr] gap-3 border-b border-line px-5 py-3 text-sm sm:grid-cols-[110px_1fr] sm:gap-4"
                >
                  <dt className="font-mono text-ink-3">{row.key}</dt>
                  <dd className="min-w-0 text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="px-4 py-1.5">
              <Button href="/cv.pdf" download variant="ghost">
                Download full CV <span className="sr-only">(PDF)</span>
                <FiArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
