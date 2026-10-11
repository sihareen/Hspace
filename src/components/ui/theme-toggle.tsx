"use client";

import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import { cn } from "./cn";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme | null {
  return null;
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable (private mode etc.): theme still applies for this page view */
  }
}

type ThemeToggleProps = {
  className?: string;
  /** "md" = 44px (default, mobile-safe), "sm" = 40px (desktop header per spec). */
  size?: "md" | "sm";
};

/** Icon button that flips data-theme on <html> and persists to localStorage.theme. */
export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={theme ? `Switch to ${next} theme` : "Toggle theme"}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-sm border border-line-strong text-ink",
        "transition-colors duration-(--dur-fast) hover:border-ink hover:bg-surface-2",
        size === "md" ? "size-11" : "size-10",
        className,
      )}
    >
      {/* Both icons rendered; CSS picks one so SSR markup is theme-agnostic (no flash). */}
      <FiMoon aria-hidden="true" className="size-[18px] dark:hidden" />
      <FiSun aria-hidden="true" className="hidden size-[18px] dark:block" />
    </button>
  );
}
