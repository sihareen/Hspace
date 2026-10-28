import type { ReactNode } from "react";
import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Reveal } from "@/components/ui/reveal";
import { SignalDot } from "@/components/ui/signal-dot";
import { availability, contactContent } from "@/data/site-content";

/* Tokens on the inverse panel: accent/focus are too dark on navy, so links use on-inverse colours + ring. */
const focusInverse = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-inverse";
const tileBorder =
  "rounded-sm border border-on-inverse/25 transition-colors duration-(--dur-fast) dark:border-line-strong";
const tileHover = "hover:border-on-inverse/50 hover:bg-on-inverse/5";

function TileLabel({ children }: { children: ReactNode }) {
  return <span className="block t-eyebrow text-on-inverse-2">{children}</span>;
}

function LinkTile({
  href,
  label,
  value,
  icon,
  external,
  download,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group flex min-h-11 min-w-0 items-center justify-between gap-3 p-4",
        tileBorder,
        tileHover,
        focusInverse,
      )}
    >
      <span className="min-w-0">
        <TileLabel>{label}</TileLabel>
        <span className="mt-1 block truncate text-sm font-semibold text-on-inverse">{value}</span>
        {external ? <span className="sr-only"> (opens in new tab)</span> : null}
      </span>
      <span aria-hidden="true" className="shrink-0 text-on-inverse-2 group-hover:text-on-inverse [&_svg]:size-5">
        {icon}
      </span>
    </a>
  );
}

export function ContactSection() {
  const { email, linkedin, github } = contactContent;
  const mailto = `mailto:${email}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-bg py-20 md:py-32">
      <div className="container-page">
        <Reveal>
          {/* crop-marks wrapper must not clip; the inner frame clips the grid overlay. */}
          <div className="crop-marks rounded-md bg-inverse text-on-inverse [--cm:var(--on-inverse-2)] dark:border dark:border-line-strong">
            <div className="relative overflow-hidden rounded-md p-6 md:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-blueprint mask-fade-center opacity-[.08] [--grid:var(--on-inverse)]"
              />

              <div className="relative">
                <p className="t-eyebrow text-on-inverse-2">
                  <span className="text-on-inverse">06</span> / Contact
                </p>
                <h2 id="contact-title" className="mt-4 max-w-[22ch] t-h2 text-balance text-on-inverse">
                  Let&apos;s build something that works in the field.
                </h2>
                <p className="mt-4 max-w-[52ch] t-lede text-on-inverse-2">
                  Open to collaboration on IoT, embedded systems and telemetry projects.
                </p>

                {availability.open ? (
                  <p className="mt-6 flex items-center gap-2 t-eyebrow text-on-inverse dark:text-signal">
                    <SignalDot />
                    {availability.label}
                  </p>
                ) : null}

                <div className="mt-8">
                  <Button href={mailto} variant="inverse">
                    <FiMail aria-hidden="true" />
                    Email me
                  </Button>
                </div>

                <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {/* Email: mailto link + sibling copy button (no nested interactive elements). */}
                  <li className={cn("flex min-w-0 items-stretch sm:col-span-3 lg:col-span-2", tileBorder)}>
                    <a
                      href={mailto}
                      className={cn(
                        "group flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-sm p-4",
                        "hover:bg-on-inverse/5",
                        focusInverse,
                      )}
                    >
                      <span className="min-w-0">
                        <TileLabel>Email</TileLabel>
                        <span
                          title={email}
                          className="mt-1 block text-sm font-semibold text-on-inverse wrap-anywhere sm:truncate"
                        >
                          {email}
                        </span>
                      </span>
                    </a>
                    <div className="flex shrink-0 items-center border-l border-on-inverse/25 px-1.5 dark:border-line-strong">
                      <CopyEmailButton
                        email={email}
                        className={cn(
                          "grid size-11 place-items-center rounded-sm text-on-inverse-2",
                          "transition-colors duration-(--dur-fast) hover:bg-on-inverse/10 hover:text-on-inverse",
                          focusInverse,
                        )}
                      />
                    </div>
                  </li>
                  <li className="min-w-0">
                    <LinkTile
                      href={linkedin}
                      label="LinkedIn"
                      value="Connect"
                      icon={<FiLinkedin />}
                      external
                    />
                  </li>
                  <li className="min-w-0">
                    <LinkTile href={github} label="GitHub" value={`@${github.replace(/\/+$/, "").split("/").pop()}`} icon={<FiGithub />} external />
                  </li>
                  <li className="min-w-0">
                    <LinkTile
                      href="/cv.pdf"
                      label="CV"
                      value="Download PDF"
                      icon={<FiDownload />}
                      download
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
