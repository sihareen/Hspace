import type { Project } from "@prisma/client";

import { ProjectsGallery, type ProjectCardItem, type ProjectCategory } from "@/components/sections/projects-gallery";
import { SectionShell } from "@/components/shared/section-shell";
import { parseProjectCoverImages } from "@/lib/project-covers";
import { getPrisma } from "@/lib/prisma";

function parseLabels(raw: string | null): ProjectCategory[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is ProjectCategory => s === "IoT" || s === "AI" || s === "Data");
}

export async function ProjectsSection() {
  let publishedProjects: Project[] = [];

  try {
    publishedProjects = await getPrisma().project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    });
  } catch (error) {
    console.error("Failed to load published projects from database.", error);
    publishedProjects = [];
  }

  const displayProjects: ProjectCardItem[] =
    publishedProjects.length > 0
      ? publishedProjects.map((project) => ({
          title: project.title,
          description: project.description,
          techStack: project.techStack
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          externalUrl: project.externalUrl,
          coverImages: parseProjectCoverImages(project.coverImage),
          labels: parseLabels(project.labels),
        }))
      : [
          {
            title: "PRISCOP",
            description:
              "Smart kiosk and vending system integrated with QR printing, billing automation, and VoIP softphone services. Built on Raspberry Pi with Docker Compose for 24/7 operation.",
            techStack: ["Raspberry Pi", "Docker", "Python", "PHP", "VoIP"],
            externalUrl: "https://github.com/sihareen",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
          {
            title: "Smart Lemon Insight",
            description:
              "AI-powered lemon quality assessment system using YOLOv8 object detection. Classifies lemons by color, size, and defects for real-time quality control.",
            techStack: ["YOLOv8", "TensorFlow", "Keras", "Python", "Streamlit"],
            externalUrl: "https://github.com/sihareen/capstone-skilvul39",
            coverImages: [],
            labels: ["AI"] as ProjectCategory[],
          },
          {
            title: "Fuel & Engine Monitoring",
            description:
              "Field-deployed Fuel Monitoring Systems (FMS) and Engine Monitoring Systems with sensor calibration, real-time telemetry, and system integration.",
            techStack: ["Embedded C", "Sensors", "Telemetry", "IoT"],
            externalUrl: "https://github.com/sihareen",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
          {
            title: "Dashboard Microclimate",
            description:
              "Web dashboard for microclimate station data visualization and environmental monitoring at Petengoran-Panjang.",
            techStack: ["Laravel", "PHP", "HTML/CSS", "MySQL"],
            externalUrl: "https://github.com/sihareen/dashboard-microclimate",
            coverImages: [],
            labels: ["Data"] as ProjectCategory[],
          },
          {
            title: "Softphone Emergency Call",
            description:
              "Emergency VoIP softphone system for station-based communication, built on Asterisk PBX with totem hardware integration.",
            techStack: ["Asterisk", "VoIP", "SIP", "Linux"],
            externalUrl: "https://github.com/sihareen/Softphone-emergency-call",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
          {
            title: "IoT Sensor Platform",
            description:
              "ThingsBoard-based IoT platform measuring temperature, humidity, gas levels, and rainfall using DHT, MQ, and raindrop sensors with Arduino.",
            techStack: ["Arduino", "ThingsBoard", "C++", "MQTT", "Sensors"],
            externalUrl: "https://github.com/sihareen/IOT",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
          {
            title: "Buoy Tsunami Early Warning (U-TEWS)",
            description:
              "Python-based monitoring software for real-time sea surface observation on U-TEWS buoy platforms with DART tsunami detection algorithm integration.",
            techStack: ["Python", "Raspberry Pi", "DART", "Node-RED", "MQTT"],
            externalUrl: "https://github.com/sihareen",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
          {
            title: "PUMMA Tsunami Early Warning",
            description:
              "PUMMA systems integrated with microclimate stations in coastal environments. Node-RED monitoring for sea surface and climate data across multiple sites.",
            techStack: ["Node-RED", "PUMMA", "Raspberry Pi", "MQTT"],
            externalUrl: "https://github.com/sihareen",
            coverImages: [],
            labels: ["IoT"] as ProjectCategory[],
          },
          {
            title: "Eddy Station Carbon Monitoring",
            description:
              "Node-RED monitoring systems for real-time carbon emission and climate observation in plantation environments with TCP/IP device integration.",
            techStack: ["Node-RED", "MQTT", "TCP/IP", "Raspberry Pi"],
            externalUrl: "https://github.com/sihareen",
            coverImages: [],
            labels: ["Data"] as ProjectCategory[],
          },
          {
            title: "Mangrove Microclimate Station",
            description:
              "Climate monitoring software for mangrove ecosystem with end-to-end MQTT data transmission and Laravel dashboards for environmental analysis.",
            techStack: ["Laravel", "MQTT", "Raspberry Pi", "Python"],
            externalUrl: "https://github.com/sihareen",
            coverImages: [],
            labels: ["Data"] as ProjectCategory[],
          },
        ];

  return (
    <SectionShell
      id="projects"
      number="02"
      eyebrow="Work"
      title="Selected projects"
      intro="Field deployments, embedded devices and telemetry systems — hardware to dashboard."
      meta={`${displayProjects.length} project${displayProjects.length === 1 ? "" : "s"}`}
    >
      <ProjectsGallery projects={displayProjects} />
    </SectionShell>
  );
}
