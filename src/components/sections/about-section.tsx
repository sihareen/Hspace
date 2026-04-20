import { SectionShell } from "@/components/shared/section-shell";
import { aboutContent } from "@/data/site-content";

export function AboutSection() {
  return (
    <SectionShell id="about" title="About">
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-cyan-200/10 bg-slate-900/70 p-6 backdrop-blur-sm sm:p-8">
          <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{aboutContent.summary}</p>
        </div>
        <div className="rounded-2xl border border-indigo-300/15 bg-slate-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Core Focus</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Embedded IoT Systems</li>
            <li>AI-Assisted Automation</li>
            <li>Data-Driven Engineering</li>
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
