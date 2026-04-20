import { PrismaClient, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

type ProjectSeed = {
  slug: string;
  title: string;
  description: string;
  techStack: string;
  externalUrl: string;
  coverImage?: string | null;
  status: ProjectStatus;
};

const SOURCE_URL = "https://www.linkedin.com/in/muhammadrizkan-harin-faza";

const projects: ProjectSeed[] = [
  {
    slug: "indomaker-early-warning-system",
    title: "Embedded Early Warning System (Landslide, Flood, Lahar)",
    description:
      "Developed an embedded, sensor-based early warning system for natural hazards with real-time communication architecture to improve response speed and field reliability.",
    techStack: "Embedded Systems, Python, Real-Time Telemetry, Sensor Integration",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "indomaker-voip-emergency-call",
    title: "VoIP Emergency Call Device for Public Safety",
    description:
      "Engineered a VoIP emergency call solution on embedded hardware for public-area deployment, emphasizing stable communication flow and maintainable system behavior.",
    techStack: "Embedded Linux, VoIP, Networking, Python",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "raspbot-ai-trainer-kit",
    title: "Raspbot Trainer Kit Enhancement with AI Integration",
    description:
      "Upgraded the Raspbot Trainer Kit into a more robust platform by integrating AI capabilities to support education and research use cases.",
    techStack: "Raspberry Pi, AI Integration, Edge Devices, Python",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "priscop-vending-sbc",
    title: "PRISCOP Smart Vending (Print, Scan, Copy)",
    description:
      "Designed a Python-based PRISCOP system on a single-board computer, delivering a compact vending workflow for print, scan, and copy services.",
    techStack: "Python, Single Board Computer, Device Control, Automation",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "buoy-utews-monitoring",
    title: "Buoy U-TEWS Monitoring and Tsunami Detection Pipeline",
    description:
      "Built Python software for sea-level and microclimate monitoring on Buoy U-TEWS, integrated real-time telemetry with DART-based tsunami detection logic, and supported long-cycle preventive maintenance.",
    techStack: "Python, DART Algorithm, IoT Telemetry, Cloud Data Flow",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "pumma-utews-node-red",
    title: "PUMMA U-TEWS Deployment and Node-RED Monitoring",
    description:
      "Implemented Node-RED monitoring for sea-level and climate signals, deployed PUMMA units in coastal sites, and standardized local-to-cloud data architecture for dashboard operations.",
    techStack: "Node-RED, MQTT, Sensor Systems, Field Deployment",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "eddy-station-carbon-monitoring",
    title: "Eddy Station Carbon Monitoring Integration",
    description:
      "Developed monitoring software for carbon and climate measurement in plantation environments, integrating station devices through TCP/IP and MQTT with structured local/cloud data delivery.",
    techStack: "Node-RED, TCP/IP, MQTT, Carbon Monitoring",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "microclimate-station-laravel-dashboard",
    title: "Microclimate Station and Laravel Dashboard",
    description:
      "Designed a microclimate monitoring system for mangrove environments and implemented a Laravel dashboard to visualize telemetry data delivered from shelter devices via MQTT.",
    techStack: "Node-RED, Laravel, MQTT, Environmental Monitoring",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
  {
    slug: "ai-lemon-quality-classification",
    title: "AI Lemon Quality Classification (MSIB Batch 6)",
    description:
      "Built an AI pipeline to classify lemon quality using YOLOv8 and TensorFlow, including deployment via Streamlit for practical quality inspection workflows.",
    techStack: "YOLOv8, TensorFlow, Python, Streamlit, Computer Vision",
    externalUrl: SOURCE_URL,
    status: ProjectStatus.PUBLISHED,
  },
];

async function main() {
  const existing = await prisma.project.count();
  console.log(`Existing projects before import: ${existing}`);

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: project,
      update: {
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        externalUrl: project.externalUrl,
        coverImage: project.coverImage ?? null,
        status: project.status,
      },
    });
    console.log(`Upserted: ${project.slug}`);
  }

  const total = await prisma.project.count();
  const published = await prisma.project.count({ where: { status: ProjectStatus.PUBLISHED } });
  console.log(`Import complete. Total projects: ${total}, Published: ${published}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
