import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { contactContent } from "@/data/site-content";

export function ContactSection() {
  return (
    <SectionShell id="contact" title="Contact">
      <div className="grid gap-4 md:grid-cols-3">
        <a
          href={`mailto:${contactContent.email}`}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-white/70 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
        >
          <FiMail className="h-5 w-5 text-cyan-300" aria-hidden />
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white">Email</p>
          <p className="mt-2 break-all text-sm text-white/75">{contactContent.email}</p>
        </a>

        <a
          href={contactContent.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-white/70 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
        >
          <FiLinkedin className="h-5 w-5 text-cyan-300" aria-hidden />
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white">LinkedIn</p>
          <p className="mt-2 text-sm text-white/75">Professional profile</p>
        </a>

        <a
          href={contactContent.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-white/70 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
        >
          <FiGithub className="h-5 w-5 text-cyan-300" aria-hidden />
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white">GitHub</p>
          <p className="mt-2 text-sm text-white/75">Open repositories</p>
        </a>
      </div>
    </SectionShell>
  );
}
