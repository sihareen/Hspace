import { SectionShell } from "@/components/shared/section-shell";

type TimelineItem = {
  period: string;
  title: string;
  description: string;
  tags: string[];
};

const timelineItems: TimelineItem[] = [
  {
    period: "2024 - Present",
    title: "IoT & AI Engineer",
    description:
      "Developing connected sensing systems and analytics workflows for monitoring, automation, and decision support.",
    tags: ["IoT", "Embedded", "AI"],
  },
  {
    period: "2023 - 2024",
    title: "Engineering Project Implementation",
    description:
      "Delivered field-oriented embedded and telemetry projects with end-to-end integration from hardware to dashboard.",
    tags: ["Telemetry", "System Integration", "Deployment"],
  },
  {
    period: "Electrical Engineering Graduate",
    title: "Bachelor of Electrical Engineering",
    description:
      "Academic foundation in control systems, electronics, instrumentation, and practical engineering research.",
    tags: ["Control Systems", "Electronics", "Research"],
  },
];

export function ExperienceSection() {
  return (
    <SectionShell id="experience" title="Experience / Education">
      <div className="grid gap-4 lg:grid-cols-3">
        {timelineItems.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:border-cyan-300/35"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">{item.period}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={`${item.title}-${tag}`}
                  className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/65"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
