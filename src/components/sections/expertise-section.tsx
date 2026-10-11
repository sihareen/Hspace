import type { IconType } from "react-icons";
import { TbAntenna, TbBrain, TbCircuitResistor, TbCpu, TbTool } from "react-icons/tb";

import { SectionShell } from "@/components/shared/section-shell";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/components/ui/cn";
import { Reveal } from "@/components/ui/reveal";

type CapabilityDomain = {
  category: string;
  descriptor: string;
  icon: IconType;
  technologies: string[];
};

const capabilities: CapabilityDomain[] = [
  {
    category: "IoT & Embedded Systems",
    descriptor: "Microcontroller firmware and edge devices built for unattended field operation.",
    icon: TbCpu,
    technologies: ["Embedded Development", "IoT Architecture", "Edge Computing", "Real-Time Systems", "Microcontrollers"],
  },
  {
    category: "Electronic Systems",
    descriptor: "Sensor front-ends, interfacing and instrumentation that measure reliably.",
    icon: TbCircuitResistor,
    technologies: ["Circuit Interfacing", "Sensor Integration", "Instrumentation", "Electronic Design", "Hardware Platforms"],
  },
  {
    category: "Communication & Telemetry",
    descriptor: "Getting data off-site: MQTT, LoRa, TCP/IP and VoIP links.",
    icon: TbAntenna,
    technologies: ["MQTT", "TCP/IP", "LoRa", "Telemetry Systems", "VoIP", "Wireless Networks"],
  },
  {
    category: "Applied Artificial Intelligence",
    descriptor: "Vision models trained and deployed on the edge.",
    icon: TbBrain,
    technologies: ["YOLOv8", "TensorFlow", "Computer Vision", "Edge AI", "Model Deployment"],
  },
  {
    category: "Engineering Tools",
    descriptor: "The languages, boards and platforms I ship with.",
    icon: TbTool,
    technologies: ["Python", "C/C++", "Node.js", "Laravel", "Raspberry Pi", "ESP32", "PLC", "Linux"],
  },
];

/** Bento spans: items 1–3 take 2/6 at lg, items 4–5 take 3/6; the 5th spans both columns at md. */
function spanFor(i: number, total: number): string {
  return cn(i < 3 ? "lg:col-span-2" : "lg:col-span-3", i === total - 1 && total % 2 === 1 && "md:col-span-2");
}

export function ExpertiseSection() {
  return (
    <SectionShell
      id="skills"
      number="04"
      eyebrow="Expertise"
      title="Capabilities"
      intro="Five disciplines I work across, end to end."
    >
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-6">
        {capabilities.map((domain, i) => {
          const Icon = domain.icon;
          return (
            <Reveal as="li" key={domain.category} delay={Math.min(i, 5) * 60} className={spanFor(i, capabilities.length)}>
              <article className="flex h-full flex-col gap-4 rounded-sm border border-line bg-surface p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-sm bg-surface-2 text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="t-chip text-ink-3">M-{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="t-h3 text-ink">{domain.category}</h3>
                  <p className="mt-2 t-small text-ink-2">{domain.descriptor}</p>
                </div>
                <ul aria-label={`${domain.category} technologies`} className="mt-auto flex flex-wrap gap-1.5">
                  {domain.technologies.map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </SectionShell>
  );
}
