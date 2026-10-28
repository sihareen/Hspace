export type ProjectItem = {
  title: string;
  description: string;
  techStack: string[];
  externalUrl: string;
};

export const heroContent = {
  headline: "Embedded & IoT Engineer",
  subtitle:
    "3+ years building field-deployed monitoring systems, edge computing solutions, and applied AI — from PCB design to production backend.",
  ctaLabel: "Explore Projects",
  ctaTarget: "#projects",
};

export const aboutContent = {
  summary:
    "Electrical Engineering graduate specializing in embedded systems, IoT architecture, and edge AI deployment. I build end-to-end solutions — from sensor interfacing and PCB design to backend services and computer vision integration.",
};

export const projects: ProjectItem[] = [
  {
    title: "PRISCOP",
    description:
      "Smart kiosk and vending system integrated with QR printing, billing automation, and VoIP softphone services. Built on Raspberry Pi with Docker Compose for 24/7 operation.",
    techStack: ["Raspberry Pi", "Docker", "Python", "PHP", "VoIP"],
    externalUrl: "https://github.com/sihareen",
  },
  {
    title: "Smart Lemon Insight",
    description:
      "AI-powered lemon quality assessment system using YOLOv8 object detection. Classifies lemons by color, size, and defects for real-time quality control.",
    techStack: ["YOLOv8", "TensorFlow", "Keras", "Python", "Streamlit"],
    externalUrl: "https://github.com/sihareen/capstone-skilvul39",
  },
  {
    title: "Fuel & Engine Monitoring",
    description:
      "Field-deployed Fuel Monitoring Systems (FMS) and Engine Monitoring Systems with sensor calibration, real-time telemetry, and system integration.",
    techStack: ["Embedded C", "Sensors", "Telemetry", "IoT"],
    externalUrl: "https://github.com/sihareen",
  },
  {
    title: "Dashboard Microclimate",
    description:
      "Web dashboard for microclimate station data visualization and environmental monitoring at Petengoran-Panjang.",
    techStack: ["Laravel", "PHP", "HTML/CSS", "MySQL"],
    externalUrl: "https://github.com/sihareen/dashboard-microclimate",
  },
  {
    title: "Softphone Emergency Call",
    description:
      "Emergency VoIP softphone system for station-based communication, built on Asterisk PBX environment with totem hardware integration.",
    techStack: ["Asterisk", "VoIP", "SIP", "Linux"],
    externalUrl: "https://github.com/sihareen/Softphone-emergency-call",
  },
  {
    title: "IoT Sensor Platform",
    description:
      "ThingsBoard-based IoT platform measuring temperature, humidity, gas levels, and rainfall using DHT, MQ, and raindrop sensors with Arduino.",
    techStack: ["Arduino", "ThingsBoard", "C++", "MQTT", "Sensors"],
    externalUrl: "https://github.com/sihareen/IOT",
  },
  {
    title: "Buoy Tsunami Early Warning (U-TEWS)",
    description:
      "Python-based monitoring software for real-time sea surface observation on U-TEWS buoy platforms with DART tsunami detection algorithm integration and cloud-based dashboards.",
    techStack: ["Python", "Raspberry Pi", "DART", "Node-RED", "MQTT"],
    externalUrl: "https://github.com/sihareen",
  },
  {
    title: "PUMMA Tsunami Early Warning",
    description:
      "Installed and configured PUMMA systems integrated with microclimate stations in coastal environments. Node-RED monitoring for sea surface and climate data acquisition across multiple sites.",
    techStack: ["Node-RED", "PUMMA", "Raspberry Pi", "MQTT", "Cloud"],
    externalUrl: "https://github.com/sihareen",
  },
  {
    title: "Eddy Station Carbon Monitoring",
    description:
      "Node-RED monitoring systems for real-time carbon emission and climate observation in plantation environments with TCP/IP device integration and MQTT transmission.",
    techStack: ["Node-RED", "MQTT", "TCP/IP", "Raspberry Pi"],
    externalUrl: "https://github.com/sihareen",
  },
  {
    title: "Mangrove Microclimate Station",
    description:
      "Climate monitoring software for mangrove ecosystem observation with end-to-end MQTT data transmission and Laravel-based dashboards for environmental analysis.",
    techStack: ["Laravel", "MQTT", "Raspberry Pi", "Python"],
    externalUrl: "https://github.com/sihareen",
  },
];

export const techStack = [
  "C/C++",
  "Python",
  "Raspberry Pi",
  "ESP32",
  "Docker",
  "Laravel",
  "MQTT",
  "KiCad",
  "YOLOv8",
  "TensorFlow",
  "Linux",
  "Arduino",
];

export const contactContent = {
  email: "muhamadrizkanharinfaza@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-rizkan-harin-faza/",
  github: "https://github.com/sihareen",
  instagram: "https://www.instagram.com/rijkhan_/",
  whatsapp: "https://wa.me/+6285738368305",
};

export const availability = {
  open: false,
  label: "Currently employed",
} as const;
