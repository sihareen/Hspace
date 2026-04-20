import { SiDocker, SiLaravel, SiMqtt, SiNodedotjs, SiPostgresql, SiPython, SiTensorflow } from "react-icons/si";
import { TbBrandCpp, TbMathFunction } from "react-icons/tb";
import { FiRadio } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { techStack } from "@/data/site-content";

const iconByStack: Record<string, ComponentType<{ className?: string }>> = {
  "C/C++": TbBrandCpp,
  Python: SiPython,
  "Node.js": SiNodedotjs,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  LoRa: FiRadio,
  MQTT: SiMqtt,
  TensorFlow: SiTensorflow,
  Docker: SiDocker,
};

export function TechStackSection() {
  return (
    <SectionShell id="tech-stack" title="Tech Stack">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((item) => {
          const Icon = iconByStack[item] ?? TbMathFunction;

          return (
            <li
              key={item}
              className="group flex items-center gap-3 rounded-xl border border-cyan-300/15 bg-slate-900/70 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-300/40"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                <Icon className="h-4 w-4" />
              </span>
              <span className="tracking-wide">{item}</span>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
import type { ComponentType } from "react";
