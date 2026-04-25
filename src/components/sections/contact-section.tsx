import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { contactContent } from "@/data/site-content";

export function ContactSection() {
  return (
    <SectionShell id="contact" title="Contact">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={`mailto:${contactContent.email}`}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:text-cyan-300"
          aria-label="Email"
        >
          <FiMail className="h-5 w-5 text-cyan-300" aria-hidden />
        </a>

        <a
          href={contactContent.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:text-cyan-300"
          aria-label="LinkedIn"
        >
          <FiLinkedin className="h-5 w-5 text-cyan-300" aria-hidden />
        </a>

        <a
          href={contactContent.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-white/80 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:text-cyan-300"
          aria-label="GitHub"
        >
          <FiGithub className="h-5 w-5 text-cyan-300" aria-hidden />
        </a>
      </div>
    </SectionShell>
  );
}
