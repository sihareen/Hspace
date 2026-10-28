import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { contactContent } from "@/data/site-content";

const footerLinks = [
  { label: "GitHub", href: contactContent.github, icon: FiGithub, external: true },
  { label: "LinkedIn", href: contactContent.linkedin, icon: FiLinkedin, external: true },
  { label: "Email", href: `mailto:${contactContent.email}`, icon: FiMail, external: false },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-8 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-display font-bold text-ink tracking-tight">
              RIZKAN<span className="text-accent">.</span>HARIN
            </p>
            <p className="t-chip text-ink-3 font-mono">Electrical Engineer · IoT · Embedded · Edge AI</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {footerLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="inline-grid size-10 place-items-center rounded-sm border border-line text-ink-3 transition-colors duration-(--dur-fast) hover:border-line-strong hover:text-ink hover:bg-surface-2"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink-3">© {year} Muhammad Rizkan Harin Faza. All rights reserved.</p>
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 text-sm text-ink-3 font-mono transition-colors duration-(--dur-fast) hover:text-ink"
          >
            <FiArrowUp aria-hidden="true" className="size-3.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
