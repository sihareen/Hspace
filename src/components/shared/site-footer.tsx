import { FiArrowUp } from "react-icons/fi";

import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-ink-2">© {year} Muhammad Rizkan Harin Faza</p>
          <p className="font-mono text-xs">Electrical Engineer · IoT · Embedded · Edge AI</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center gap-1.5 px-1 text-ink-2 underline-offset-4 transition-colors duration-(--dur-fast) hover:text-ink hover:underline"
          >
            Back to top
            <FiArrowUp aria-hidden="true" className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
