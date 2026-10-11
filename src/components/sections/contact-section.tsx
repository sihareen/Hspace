import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { SectionShell } from "@/components/shared/section-shell";
import { textLink } from "@/components/ui/text-link";
import { availability, contactContent } from "@/data/site-content";

export function ContactSection() {
  const { email, linkedin, github } = contactContent;
  const mailto = `mailto:${email}`;

  return (
    <SectionShell id="contact" title="Contact">
      <p className="max-w-[62ch] text-ink-2">
        {availability.open ? "I'm currently available for projects. " : ""}Email is the quickest way to reach me.
      </p>
      {/* Mailto link + sibling copy button: no nested interactive elements. */}
      <div className="mt-4 flex flex-wrap items-center gap-x-2">
        <a
          href={mailto}
          className="inline-flex min-h-11 min-w-0 items-center text-lg font-medium text-accent underline decoration-1 underline-offset-4 wrap-anywhere hover:decoration-2"
        >
          {email}
        </a>
        <CopyEmailButton
          email={email}
          className="grid size-11 cursor-pointer place-items-center rounded-sm text-ink-3 transition-colors duration-(--dur-fast) hover:bg-surface-2 hover:text-ink"
        />
      </div>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
        <li>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={textLink}>
            LinkedIn<span className="sr-only"> (opens in new tab)</span>
          </a>
        </li>
        <li>
          <a href={github} target="_blank" rel="noopener noreferrer" className={textLink}>
            GitHub<span className="sr-only"> (opens in new tab)</span>
          </a>
        </li>
        <li>
          <a href="/cv.pdf" download className={textLink}>
            CV (PDF)
          </a>
        </li>
      </ul>
    </SectionShell>
  );
}
