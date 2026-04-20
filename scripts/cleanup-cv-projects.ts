import { PrismaClient, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

const updates: Array<{ slug: string; coverImage: string; techStack?: string }> = [
  {
    slug: "indomaker-early-warning-system",
    coverImage: "/project-covers/early-warning.jpg",
    techStack: "Embedded Systems, Sensor Integration, Real-Time Telemetry, Python",
  },
  {
    slug: "indomaker-voip-emergency-call",
    coverImage: "/project-covers/voip-emergency.jpg",
    techStack: "Embedded Linux, VoIP, Networking, Python",
  },
  {
    slug: "raspbot-ai-trainer-kit",
    coverImage: "/project-covers/raspbot-ai.jpg",
    techStack: "Raspberry Pi, Edge AI, Python, Device Integration",
  },
  {
    slug: "priscop-vending-sbc",
    coverImage: "/project-covers/priscop-vending.jpg",
    techStack: "Python, Single Board Computer, Hardware Control, Automation",
  },
  {
    slug: "buoy-utews-monitoring",
    coverImage: "/project-covers/buoy-utews.jpg",
    techStack: "Python, DART Algorithm, IoT Telemetry, Cloud Data Pipeline",
  },
  {
    slug: "pumma-utews-node-red",
    coverImage: "/project-covers/pumma-utews.jpg",
    techStack: "Node-RED, MQTT, Sensor Systems, Coastal Deployment",
  },
  {
    slug: "eddy-station-carbon-monitoring",
    coverImage: "/project-covers/eddy-station.jpg",
    techStack: "Node-RED, TCP/IP, MQTT, Carbon Monitoring",
  },
  {
    slug: "microclimate-station-laravel-dashboard",
    coverImage: "/project-covers/microclimate-dashboard.png",
    techStack: "Node-RED, Laravel, MQTT, Environmental Monitoring",
  },
  {
    slug: "ai-lemon-quality-classification",
    coverImage: "/project-covers/ai-lemon.jpg",
    techStack: "YOLOv8, TensorFlow, Python, Streamlit, Computer Vision",
  },
];

async function main() {
  const deleted = await prisma.project.deleteMany({ where: { slug: "starter-project" } });
  console.log(`Deleted starter project count: ${deleted.count}`);

  for (const item of updates) {
    await prisma.project.updateMany({
      where: { slug: item.slug },
      data: {
        coverImage: item.coverImage,
        status: ProjectStatus.PUBLISHED,
        ...(item.techStack ? { techStack: item.techStack } : {}),
      },
    });
    console.log(`Updated: ${item.slug}`);
  }

  const rows = await prisma.project.findMany({
    orderBy: { title: "asc" },
    select: { title: true, slug: true, coverImage: true, status: true },
  });

  console.log("Final project summary:");
  rows.forEach((row, i) => {
    console.log(`${i + 1}. [${row.status}] ${row.title} | ${row.slug} | ${row.coverImage ?? "-"}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
