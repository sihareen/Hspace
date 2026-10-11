import Image from "next/image";

import { textLink } from "@/components/ui/text-link";
import { contactContent } from "@/data/site-content";

const LEDE =
  "I'm an electrical engineer. I build IoT devices, embedded systems and the software that moves their data, mostly for disaster early-warning and environmental monitoring.";

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Not wrapped in any reveal: above the fold / LCP. */}
      <div className="container-page lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-x-12">
        <div className="relative mb-8 aspect-[4/5] w-24 overflow-hidden rounded-sm bg-surface-2 lg:mb-0 lg:w-full">
          <Image
            src="/profile/me.jpg"
            alt="Portrait of Muhammad Rizkan Harin Faza"
            fill
            priority
            sizes="(min-width: 1024px) 180px, 96px"
            className="object-cover object-[50%_25%]"
          />
        </div>
        <div className="min-w-0 lg:self-end">
          <h1 id="hero-title" className="t-name text-balance text-ink">
            Muhammad Rizkan Harin Faza
          </h1>
          <p className="mt-5 max-w-[56ch] t-lede text-ink-2">{LEDE}</p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
            <a href={`mailto:${contactContent.email}`} className={textLink}>
              Email
            </a>
            <a href="/cv.pdf" download className={textLink}>
              CV (PDF)
            </a>
            <a href={contactContent.github} target="_blank" rel="noopener noreferrer" className={textLink}>
              GitHub<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href={contactContent.linkedin} target="_blank" rel="noopener noreferrer" className={textLink}>
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
