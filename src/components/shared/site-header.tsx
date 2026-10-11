"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { cn } from "@/components/ui/cn";
import { scrollToSection } from "@/components/ui/scroll-to";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/** Section ids must match the `id` on each section in page.tsx. */
const navItems = [
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
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

    // The last section is too short to reach the reading line; mark it active at page bottom.
    const lastId = observedIds[observedIds.length - 1];
    const onScroll = () => {
      const root = document.documentElement;
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) setActiveSection(lastId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
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

      {/* Bar. The mobile panel lives outside this element (fixed positioning stays viewport-relative). */}
      <div className="h-14 border-b border-line bg-bg">
        <div className="container-page flex h-full items-center justify-between gap-4">
          <a
            href="#hero"
            onClick={(event) => handleNavClick(event, "hero")}
            className="-ml-1 flex min-h-11 items-center rounded-sm px-1 text-[0.9375rem] font-semibold text-ink"
            aria-label="Rizkan Harin, back to top"
          >
            Rizkan Harin
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = item.id === activeSection;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleNavClick(event, item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center px-1 text-sm transition-colors duration-(--dur-fast)",
                        isActive ? "text-ink" : "text-ink-3 hover:text-ink",
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
            <button
              ref={toggleRef}
              type="button"
              onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
              className="inline-grid size-11 place-items-center rounded-sm text-ink transition-colors duration-(--dur-fast) hover:bg-surface-2 md:hidden"
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
        className="fixed inset-x-0 top-14 bottom-0 overflow-y-auto overscroll-contain bg-bg md:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pt-2 pb-8">
          <ul>
            {navItems.map((item) => {
              const isActive = item.id === activeSection;
              return (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleNavClick(event, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex min-h-12 items-center text-base font-medium",
                      isActive ? "text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={CV_HREF}
            download
            className="mt-8 inline-flex min-h-11 items-center self-start text-accent underline underline-offset-4"
          >
            Download CV (PDF)
          </a>
        </nav>
      </div>
    </header>
  );
}
