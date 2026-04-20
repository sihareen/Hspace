export type ProjectItem = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
};

export const heroContent = {
  headline: "IoT & AI Engineer",
  subtitle:
    "Building resilient embedded systems, edge intelligence, and data-driven automation for real-world impact.",
  ctaLabel: "Explore Projects",
  ctaTarget: "#projects",
};

export const aboutContent = {
  summary:
    "I design and ship practical engineering solutions across IoT devices, networked systems, and applied AI workflows. My focus is clean architecture, measurable outcomes, and maintainable implementation.",
};

export const projects: ProjectItem[] = [
  {
    title: "PUMMA U-TEWS",
    description:
      "Real-time sea level monitoring unit for tsunami early warning integration in high-risk coastal zones.",
    techStack: ["Embedded C", "Sensor Systems", "Telemetry"],
    externalUrl: "https://github.com/sihareen",
  },
  {
    title: "Dashboard Climate",
    description:
      "Web platform for climate station data visualization and environmental decision support.",
    techStack: ["Laravel", "MySQL", "Charting"],
    externalUrl: "https://github.com/sihareen",
  },
  {
    title: "Rubus IOC",
    description:
      "LoRa-based soil moisture monitoring with solar-powered field deployment for precision irrigation.",
    techStack: ["LoRa", "IoT", "Power Systems"],
    externalUrl: "https://github.com/sihareen",
  },
];

export const techStack = [
  "C/C++",
  "Python",
  "Node.js",
  "Laravel",
  "PostgreSQL",
  "LoRa",
  "MQTT",
  "TensorFlow",
  "Docker",
];

export const contactContent = {
  email: "muhamadrizkanharinfaza@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-rizkan-harin-faza/",
  github: "https://github.com/sihareen",
};
