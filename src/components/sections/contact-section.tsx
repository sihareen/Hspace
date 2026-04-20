import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { SectionShell } from "@/components/shared/section-shell";
import { contactContent } from "@/data/site-content";

export function ContactSection() {
  return (
    <SectionShell id="contact" title="Contact">
      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href={`mailto:${contactContent.email}`}
          className="group rounded-xl border border-cyan-300/20 bg-slate-900/70 p-5 text-sm text-slate-200 transition hover:border-cyan-300/50"
        >
          <FiMail className="h-5 w-5 text-cyan-200" aria-hidden />
          <p className="mt-3 font-semibold uppercase tracking-[0.14em] text-slate-100">Email</p>
          <p className="mt-1 break-all text-cyan-200">{contactContent.email}</p>
        </a>

        <a
          href={contactContent.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-cyan-300/20 bg-slate-900/70 p-5 text-sm text-slate-200 transition hover:border-cyan-300/50"
        >
          <FiLinkedin className="h-5 w-5 text-cyan-200" aria-hidden />
          <p className="mt-3 font-semibold uppercase tracking-[0.14em] text-slate-100">LinkedIn</p>
          <p className="mt-1 text-cyan-200">View profile</p>
        </a>

        <a
          href={contactContent.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-cyan-300/20 bg-slate-900/70 p-5 text-sm text-slate-200 transition hover:border-cyan-300/50"
        >
          <FiGithub className="h-5 w-5 text-cyan-200" aria-hidden />
          <p className="mt-3 font-semibold uppercase tracking-[0.14em] text-slate-100">GitHub</p>
          <p className="mt-1 text-cyan-200">Open repositories</p>
        </a>
      </div>
    </SectionShell>
  );
}
