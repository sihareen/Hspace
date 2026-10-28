import { FiArrowRight } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const datasheet: { key: string; value: string }[] = [
  { key: "Discipline", value: "Electrical Engineering" },
  { key: "Degree", value: "B.Eng, Universitas Lampung" },
  { key: "Thesis", value: "Python-based telemetry for remote ocean monitoring" },
  { key: "Focus", value: "IoT · Embedded · Edge AI · FMS" },
  { key: "Current", value: "Electrical Engineer at Bhinneka Nusantara Mandiri" },
];

const highlights = [
  { label: "PRISCOP smart kiosk & vending system", domain: "Edge Computing" },
  { label: "Fuel & Engine Monitoring Systems", domain: "Industrial IoT" },
  { label: "AI-powered lemon quality assessment", domain: "Computer Vision" },
  { label: "Multi-layer PCB design & power routing", domain: "Hardware Design" },
];

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
            Electrical Engineer with 3+ years building field-deployed monitoring systems, edge computing solutions,
            and applied AI. Currently at Bhinneka Nusantara Mandiri working on FMS installation, engine monitoring,
            and IoT product development.
          </p>
          <p>
            Previously at Indomaker Indonesia Mandiri building PRISCOP smart kiosks, local LLM/RAG pipelines,
            computer vision systems, and multi-layer PCBs. B.Eng from Universitas Lampung with thesis on
            Python-based telemetry for remote ocean monitoring.
          </p>

          {/* Highlighted project domains */}
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-sm border border-line bg-bg p-3 transition-colors duration-(--dur-fast) hover:border-line-strong"
              >
                <span className="mt-0.5 shrink-0 font-mono text-xs text-accent">0{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{item.label}</p>
                  <p className="mt-0.5 font-mono text-[0.625rem] text-ink-3 uppercase tracking-wider">{item.domain}</p>
                </div>
              </div>
            ))}
          </div>
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
