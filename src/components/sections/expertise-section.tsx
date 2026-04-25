import { SectionShell } from "@/components/shared/section-shell";

type ExpertiseItem = {
  title: string;
  description: string;
  tags: string[];
};

const expertiseItems: ExpertiseItem[] = [
  {
    title: "IoT Development",
    description:
      "Designing connected systems from sensing layer to cloud pipelines with robust telemetry and monitoring.",
    tags: ["MQTT", "LoRa", "Node-RED", "Telemetry"],
  },
  {
    title: "Embedded Systems",
    description:
      "Building firmware-oriented solutions with reliable hardware interfacing, protocol handling, and field stability.",
    tags: ["C/C++", "Microcontrollers", "RTOS", "Device Control"],
  },
  {
    title: "AI / Machine Learning",
    description:
      "Applying machine intelligence for detection, prediction, and automation inside practical engineering workflows.",
    tags: ["TensorFlow", "Computer Vision", "Model Deployment", "Python"],
  },
  {
    title: "Data Science",
    description:
      "Transforming raw operational data into actionable insights through analytics, modeling, and visual reporting.",
    tags: ["Pandas", "Forecasting", "Statistics", "Dashboarding"],
  },
];

export function ExpertiseSection() {
  return (
    <SectionShell id="skills" title="Expertise">
      <div className="grid gap-4 md:grid-cols-2">
        {expertiseItems.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-500/[0.04]"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={`${item.title}-${tag}`}
                  className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/75"
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
