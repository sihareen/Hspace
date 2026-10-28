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
    period: "Jul 2026 - Present",
    title: "Electrical Engineer",
    company: "Bhinneka Nusantara Mandiri",
    description:
      "FMS installation & maintenance, Engine Monitoring Systems, sensor/communication diagnostics, sensor testing & calibration, and IoT product development with hardware integration and field testing.",
    tags: ["FMS", "IoT", "Sensors", "Field Testing"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "Oct 2025 - Apr 2026",
    title: "Programmer Raspberry Pi & Edge Devices",
    company: "Indomaker Indonesia Mandiri",
    description:
      "Edge computing & IoT (Raspberry Pi, Orange Pi, Docker), local LLM & RAG (Ollama, ChromaDB), PRISCOP smart kiosk, computer vision, multi-layer PCB design in KiCad, and embedded disaster early warning systems.",
    tags: ["Edge Computing", "Docker", "RAG", "KiCad", "CV"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "Apr 2023 - Apr 2025",
    title: "IoT Engineer",
    company: "Freelance",
    description:
      "Buoy Tsunami Early Warning System (U-TEWS) with Python monitoring software and DART integration. PUMMA tsunami systems with Node-RED monitoring and microclimate stations across multiple coastal sites.",
    tags: ["Tsunami", "Node-RED", "Raspberry Pi", "MQTT"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "Jun 2023 - Jun 2024",
    title: "System Engineer",
    company: "Freelance",
    description:
      "Eddy Station carbon monitoring with Node-RED and TCP/IP communication. Mangrove microclimate monitoring with MQTT transmission and Laravel dashboards for environmental analysis.",
    tags: ["Node-RED", "MQTT", "Laravel", "TCP/IP"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "Mar 2024 - Aug 2025",
    title: "Laboratory Assistant",
    company: "Telecommunication Lab, Universitas Lampung",
    description:
      "Assisted students in communication systems and telecommunication network fundamentals through hands-on laboratory sessions.",
    tags: ["MATLAB", "Networking", "Telecom"],
    category: ExperienceCategory.EXPERIENCE,
  },
  {
    period: "Jul 2024 - Jan 2025",
    title: "IBM SkillsBuild for AI & Cybersecurity",
    company: "Skilvul · Kampus Merdeka Batch 6",
    description:
      "Developed Smart Lemon Insight — AI-based quality classification using YOLOv8, TensorFlow, and Keras. Built deep learning pipelines for object detection with image preprocessing and data augmentation.",
    tags: ["YOLOv8", "TensorFlow", "Deep Learning", "AI"],
    category: ExperienceCategory.EDUCATION,
  },
  {
    period: "2020 - 2024",
    title: "B.Eng Electrical Engineering",
    company: "Universitas Lampung",
    description:
      "Specialization in embedded systems, IoT architecture, and telemetry. Thesis on Python-based telemetry transmission for remote ocean monitoring platforms.",
    tags: ["Embedded Systems", "IoT", "Telemetry", "Research"],
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
    <SectionShell id="experience" number="03" eyebrow="Experience" title="Experience & education" tone="band">
      <ExperienceGallery items={timelineItems} />
    </SectionShell>
  );
}
