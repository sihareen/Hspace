import { ExperienceCategory, type ExperienceEntry } from "@prisma/client";

import { SectionShell } from "@/components/shared/section-shell";
import { getPrisma } from "@/lib/prisma";

type TimelineItem = {
  period: string;
  title: string;
  description: string;
  tags: string[];
  category: ExperienceCategory;
};

const fallbackTimelineItems: TimelineItem[] = [
  {
    period: "2024 - Present",
    title: "IoT & AI Engineer",
    description:
      "Developing connected sensing systems and analytics workflows for monitoring, automation, and decision support.",
    tags: ["IoT", "Embedded", "AI"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "2023 - 2024",
    title: "Engineering Project Implementation",
    description:
      "Delivered field-oriented embedded and telemetry projects with end-to-end integration from hardware to dashboard.",
    tags: ["Telemetry", "System Integration", "Deployment"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "Electrical Engineering Graduate",
    title: "Bachelor of Electrical Engineering",
    description:
      "Academic foundation in control systems, electronics, instrumentation, and practical engineering research.",
    tags: ["Control Systems", "Electronics", "Research"],
    category: ExperienceCategory.EDUCATION,
  },
];

function mapEntriesToTimeline(entries: ExperienceEntry[]): TimelineItem[] {
  return entries.map((entry) => ({
    period: entry.period,
    title: entry.title,
    description: entry.description,
    tags: entry.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    category: entry.category,
  }));
}

export async function ExperienceSection() {
  let entries: ExperienceEntry[] = [];

  try {
    entries = await getPrisma().experienceEntry.findMany({
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    });
  } catch (error) {
    console.error("Failed to load experience entries from database.", error);
    entries = [];
  }

  const timelineItems = entries.length > 0 ? mapEntriesToTimeline(entries) : fallbackTimelineItems;

  return (
    <SectionShell id="experience" title="Experience / Education">
      <div className="grid gap-4 lg:grid-cols-3">
        {timelineItems.map((item) => (
          <article
            key={`${item.period}-${item.title}`}
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
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/45">{item.category}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
