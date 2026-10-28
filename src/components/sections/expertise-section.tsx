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
    category: "IoT & Embedded",
    descriptor: "Microcontroller firmware and edge devices built for unattended field operation.",
    icon: TbCpu,
    technologies: ["Raspberry Pi", "ESP32", "Arduino", "Docker", "Edge Computing", "ThingsBoard"],
  },
  {
    category: "Electronic Systems",
    descriptor: "From sensor front-ends to multi-layer PCB design and power routing.",
    icon: TbCircuitResistor,
    technologies: ["KiCad", "Sensor Calibration", "PCB Design", "Power Routing", "Hardware Integration"],
  },
  {
    category: "Communication",
    descriptor: "Getting data off-site: MQTT, VoIP, Asterisk and telemetry links.",
    icon: TbAntenna,
    technologies: ["MQTT", "VoIP/SIP", "Asterisk", "Telemetry", "LoRa", "TCP/IP"],
  },
  {
    category: "Applied AI",
    descriptor: "Vision models, local LLMs and RAG pipelines deployed on edge devices.",
    icon: TbBrain,
    technologies: ["YOLOv8", "TensorFlow", "Ollama", "ChromaDB", "RAG", "Computer Vision"],
  },
  {
    category: "Engineering Tools",
    descriptor: "The languages, boards and platforms I ship with.",
    icon: TbTool,
    technologies: ["Python", "C/C++", "Laravel", "PHP", "Linux", "Docker Compose", "Git"],
  },
];

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
      <ul className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
        {capabilities.map((domain, i) => {
          const Icon = domain.icon;
          return (
            <Reveal as="li" key={domain.category} delay={Math.min(i, 5) * 60} className={spanFor(i, capabilities.length)}>
              <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-sm border border-line bg-surface p-5 md:p-6 transition-[border-color,box-shadow] duration-(--dur-base) hover:border-line-strong hover:shadow-(--shadow-card)">
                {/* Accent top border */}
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-accent origin-left scale-x-0 transition-transform duration-(--dur-slow) group-hover:scale-x-100" />

                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-sm bg-surface-2 text-accent transition-colors duration-(--dur-base) group-hover:bg-accent group-hover:text-on-primary">
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
