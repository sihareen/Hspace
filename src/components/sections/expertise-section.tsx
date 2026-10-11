import { SectionShell } from "@/components/shared/section-shell";

type CapabilityDomain = {
  category: string;
  technologies: string[];
};

const capabilities: CapabilityDomain[] = [
  {
    category: "IoT & embedded",
    technologies: ["Embedded development", "IoT architecture", "Edge computing", "Real-time systems", "Microcontrollers"],
  },
  {
    category: "Electronics",
    technologies: ["Circuit interfacing", "Sensor integration", "Instrumentation", "Electronic design"],
  },
  {
    category: "Communication & telemetry",
    technologies: ["MQTT", "TCP/IP", "LoRa", "Telemetry Systems", "VoIP", "Wireless Networks"],
  },
  {
    category: "Machine learning & vision",
    technologies: ["YOLOv8", "TensorFlow", "Computer Vision", "Edge AI", "Model Deployment"],
  },
  {
    category: "Languages & platforms",
    technologies: ["Python", "C/C++", "Node.js", "Laravel", "Raspberry Pi", "ESP32", "PLC", "Linux"],
  },
];

export function ExpertiseSection() {
  return (
    <SectionShell id="skills" title="Skills">
      <dl className="divide-y divide-line border-y border-line">
        {capabilities.map((d) => (
          <div key={d.category} className="grid gap-1 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-x-8">
            <dt className="font-medium text-ink">{d.category}</dt>
            <dd className="text-ink-2">{d.technologies.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}
