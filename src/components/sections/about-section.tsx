import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";

export function AboutSection() {
  return (
    <SectionShell id="about" title="About">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="aspect-[4/5] grayscale">
            <Image
              src="/profile/me.jpg"
              alt="Professional portrait"
              width={900}
              height={1100}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Professional Profile</p>
          <p className="text-base leading-8 text-white/75">
            I am an Electrical Engineering graduate specializing in IoT architecture, embedded platforms, and
            intelligent analytics. My work combines reliable hardware integration, clean firmware design, and
            data-driven decision systems for real-world operations.
          </p>
          <p className="text-base leading-8 text-white/75">
            I focus on maintainable engineering, measurable outcomes, and solutions that bridge physical systems with
            scalable digital intelligence.
          </p>

          <div className="rounded-xl border border-cyan-300/25 bg-cyan-500/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Let&apos;s Collaborate
            </p>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Open to IoT, embedded, and AI engineering collaborations for product development, automation, and
              research-driven implementation.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
