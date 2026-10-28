import type { ReactNode } from "react";
import { FiArrowUpRight, FiDownload, FiGithub, FiInstagram, FiLinkedin, FiMail, FiMessageCircle } from "react-icons/fi";

import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Reveal } from "@/components/ui/reveal";
import { availability, contactContent } from "@/data/site-content";

const focusInverse = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-inverse";

function ChannelCard({
  href,
  label,
  handle,
  icon,
  external,
  accent,
}: {
  href: string;
  label: string;
  handle: string;
  icon: ReactNode;
  external?: boolean;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex flex-col justify-between gap-4 overflow-hidden rounded-sm p-4 transition-all duration-(--dur-base)",
        focusInverse,
        accent
          ? "bg-accent/15 border border-accent/30 hover:bg-accent/20 hover:border-accent/50"
          : "bg-on-inverse/5 border border-on-inverse/10 hover:bg-on-inverse/10 hover:border-on-inverse/25",
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn(
          "grid size-10 place-items-center rounded-sm transition-colors duration-(--dur-fast) [&_svg]:size-5",
          accent
            ? "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-on-primary"
            : "bg-on-inverse/10 text-on-inverse/60 group-hover:bg-on-inverse/20 group-hover:text-on-inverse",
        )}>
          {icon}
        </span>
        <FiArrowUpRight
          aria-hidden="true"
          className="size-4 text-on-inverse/30 transition-transform duration-(--dur-fast) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-on-inverse/60"
        />
      </div>
      <div>
        <span className="block font-mono text-[0.625rem] uppercase tracking-wider text-on-inverse/40">
          {label}
        </span>
        <span className="mt-0.5 block text-sm font-semibold text-on-inverse truncate">{handle}</span>
      </div>
      {external ? <span className="sr-only"> (opens in new tab)</span> : null}
    </a>
  );
}

export function ContactSection() {
  const { email, linkedin, github, instagram, whatsapp } = contactContent;
  const mailto = `mailto:${email}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-bg py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="crop-marks rounded-md bg-inverse text-on-inverse [--cm:var(--on-inverse-2)] dark:border dark:border-line-strong">
            <div className="relative overflow-hidden rounded-md p-6 md:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-blueprint mask-fade-center opacity-[.06] [--grid:var(--on-inverse)]"
              />

              <div className="relative">
                {/* Header */}
                <div className="mb-10">
                  <p className="t-eyebrow text-on-inverse-2">
                    <span className="text-on-inverse">06</span> / Contact
                  </p>
                  <h2 id="contact-title" className="mt-4 max-w-[28ch] t-h2 text-balance text-on-inverse">
                    Let&apos;s build something that works in the field.
                  </h2>
                  <p className="mt-3 max-w-[52ch] t-lede text-on-inverse-2">
                    Open to collaboration on IoT, embedded systems and telemetry projects.
                    {!availability.open ? (
                      <span className="mt-2 flex items-center gap-2 text-sm text-on-inverse/40">
                        <span className="inline-block size-1.5 rounded-full bg-on-inverse/30" aria-hidden="true" />
                        {availability.label}
                      </span>
                    ) : null}
                  </p>
                </div>

                {/* Email — featured */}
                <div className="mb-4 flex flex-col gap-3 rounded-sm border border-on-inverse/15 bg-on-inverse/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-accent/20 text-accent">
                      <FiMail aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <span className="block font-mono text-[0.625rem] uppercase tracking-wider text-on-inverse/40">
                        Email
                      </span>
                      <a
                        href={mailto}
                        className={cn("block text-sm font-semibold text-on-inverse truncate hover:underline underline-offset-4", focusInverse)}
                        title={email}
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <CopyEmailButton
                      email={email}
                      className={cn(
                        "grid size-10 place-items-center rounded-sm border border-on-inverse/15 text-on-inverse-2",
                        "transition-colors duration-(--dur-fast) hover:bg-on-inverse/10 hover:text-on-inverse",
                        focusInverse,
                      )}
                    />
                    <Button href={mailto} variant="inverse" size="sm">
                      Send email
                    </Button>
                  </div>
                </div>

                {/* Channel grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <ChannelCard
                    href={whatsapp}
                    label="WhatsApp"
                    handle="Chat"
                    icon={<FiMessageCircle />}
                    external
                    accent
                  />
                  <ChannelCard
                    href={linkedin}
                    label="LinkedIn"
                    handle="Connect"
                    icon={<FiLinkedin />}
                    external
                  />
                  <ChannelCard
                    href={github}
                    label="GitHub"
                    handle={`@${github.replace(/\/+$/, "").split("/").pop()}`}
                    icon={<FiGithub />}
                    external
                  />
                  <ChannelCard
                    href={instagram}
                    label="Instagram"
                    handle="@rijkhan_"
                    icon={<FiInstagram />}
                    external
                  />
                </div>

                {/* CV download strip */}
                <div className="mt-4 flex items-center justify-between rounded-sm border border-on-inverse/10 bg-on-inverse/[.03] px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FiDownload aria-hidden="true" className="size-4 shrink-0 text-on-inverse/40" />
                    <span className="text-sm text-on-inverse/60">
                      Curriculum Vitae
                    </span>
                  </div>
                  <Button href="/cv.pdf" download variant="inverse" size="sm">
                    Download CV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
