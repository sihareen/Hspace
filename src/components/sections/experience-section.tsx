import { ExperienceCategory, type ExperienceEntry } from "@prisma/client";

import { ExperienceGallery } from "@/components/sections/experience-gallery";
import { SectionShell } from "@/components/shared/section-shell";
import { getPrisma } from "@/lib/prisma";

type TimelineItem = {
  period: string;
  title: string;
  company: string | null;
  description: string;
  tags: string[];
  category: ExperienceCategory;
};

const fallbackTimelineItems: TimelineItem[] = [
  {
    period: "2024 - Present",
    title: "IoT & AI Engineer",
    company: "Industrial / Field Deployment",
    description:
      "Developing connected sensing systems and analytics workflows for monitoring, automation, and decision support.",
    tags: ["IoT", "Embedded", "AI"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "2023 - 2024",
    title: "Engineering Project Implementation",
    company: "Applied Engineering Projects",
    description:
      "Delivered field-oriented embedded and telemetry projects with end-to-end integration from hardware to dashboard.",
    tags: ["Telemetry", "System Integration", "Deployment"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "Electrical Engineering Graduate",
    title: "Bachelor of Electrical Engineering",
    company: "University of Lampung",
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
    company: entry.company,
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
      <ExperienceGallery items={timelineItems} />
    </SectionShell>
  );
}
