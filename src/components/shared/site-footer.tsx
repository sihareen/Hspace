import { FiArrowUp } from "react-icons/fi";

import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <p className="text-ink-2 text-sm">© {year} Muhammad Rizkan Harin Faza</p>
          <p className="t-chip text-ink-3 font-mono">Electrical Engineer · IoT · Embedded · Edge AI</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="#hero"
            className="inline-flex min-h-10 items-center gap-1.5 px-2 text-sm text-ink-3 underline-offset-2 transition-colors duration-(--dur-fast) hover:text-ink hover:underline font-mono"
          >
            <FiArrowUp aria-hidden="true" className="size-3.5" />
            Back to top
          </a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}