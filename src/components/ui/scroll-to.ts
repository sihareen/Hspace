/** True when the user asked for reduced motion (always false on the server). */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scrolls to an in-page section, respecting reduced motion and the sticky header
 * (via CSS scroll-margin-top), updates the URL hash and moves focus to the target
 * for keyboard / screen-reader users. Returns false if the target is missing.
 */
export function scrollToSection(id: string, { updateHash = true, focus = true } = {}): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });

  if (updateHash && window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }

  if (focus) {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  return true;
}
