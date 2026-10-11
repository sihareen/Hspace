"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { scrollToSection } from "@/components/ui/scroll-to";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/** Section ids must match the `id` on each section in page.tsx. */
const navItems = [
  { label: "Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Expertise", id: "skills" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

const observedIds = ["hero", ...navItems.map((item) => item.id)];
const MENU_ID = "mobile-menu";
const CV_HREF = "/cv.pdf";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /** Whether closing the menu should return focus to the toggle (false when a link was chosen). */
  const restoreFocusRef = useRef(true);

  // Active section tracking.
  useEffect(() => {
    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    // A thin "reading line" at 40% of the viewport: the section crossing it is active.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -59% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    restoreFocusRef.current = restoreFocus;
    // Unlock synchronously so a following scroll is not blocked.
    document.documentElement.classList.remove("scroll-locked");
    setMenuOpen(false);
  }, []);

  // Mobile menu: scroll lock, initial focus, Escape, auto-close on md+.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    root.classList.add("scroll-locked");
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = () => {
      if (desktop.matches) closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    const toggle = toggleRef.current;
    return () => {
      root.classList.remove("scroll-locked");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      if (restoreFocusRef.current) toggle?.focus();
      restoreFocusRef.current = true;
    };
  }, [menuOpen, closeMenu]);

  // Keep Tab inside the header while the full-screen menu covers the page.
  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!menuOpen || event.key !== "Tab" || !headerRef.current) return;
    const focusables = Array.from(headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null,
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    // Let modified clicks (new tab etc.) behave natively.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (menuOpen) closeMenu(false);
    scrollToSection(id);
  };

  return (
    <header ref={headerRef} onKeyDown={handleHeaderKeyDown} className="sticky top-0 z-40">
      <a
        href="#main"
        className="sr-only-focusable absolute top-2 left-2 z-50 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary"
      >
        Skip to content
      </a>

      {/* Bar. Note: backdrop-filter creates a containing block for fixed children,
          so the mobile panel lives outside this element. */}
      <div className="h-16 border-b border-line bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/70">
        <div className="container-page flex h-full items-center justify-between gap-4">
          <a
            href="#hero"
            onClick={(event) => handleNavClick(event, "hero")}
            className="-ml-1 flex min-h-11 items-center gap-2.5 rounded-sm px-1"
            aria-label="Rizkan Harin, back to top"
          >
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-xs bg-primary font-mono text-xs font-semibold text-on-primary"
            >
              RH
            </span>
            <span aria-hidden="true" className="hidden font-display font-semibold text-ink min-[360px]:inline">
              Rizkan Harin
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-7">
              {navItems.map((item) => {
                const isActive = item.id === activeSection;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleNavClick(event, item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center px-1 text-sm font-medium transition-colors duration-(--dur-fast)",
                        "after:absolute after:inset-x-0 after:-bottom-[10px] after:h-0.5 after:bg-accent after:transition-opacity after:duration-(--dur-fast)",
                        isActive ? "text-ink after:opacity-100" : "text-ink-2 after:opacity-0 hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Wrapper handles visibility: Button already sets display (no class merging). */}
            <div className="hidden lg:block">
              <Button href={CV_HREF} download variant="secondary" size="sm">
                CV
                <FiDownload aria-hidden="true" />
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
              className="inline-grid size-11 place-items-center rounded-sm border border-line-strong text-ink transition-colors duration-(--dur-fast) hover:border-ink hover:bg-surface-2 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
            >
              {menuOpen ? <FiX aria-hidden="true" className="size-5" /> : <FiMenu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={panelRef}
        id={MENU_ID}
        hidden={!menuOpen}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain bg-surface md:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pt-2 pb-8">
          <ul className="mb-8">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection;
              return (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleNavClick(event, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex min-h-14 items-center gap-4 py-3 text-lg font-medium",
                      isActive ? "text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    <span aria-hidden="true" className={cn("t-chip", isActive ? "text-accent" : "text-ink-3")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button href={CV_HREF} download variant="primary" className="mt-auto w-full">
            <FiDownload aria-hidden="true" />
            Download CV
          </Button>
        </nav>
      </div>
    </header>
  );
}
