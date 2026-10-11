"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

type RevealTag = "div" | "li" | "article" | "section" | "span" | "aside" | "header" | "ul" | "ol";

type RevealProps = {
  as?: RevealTag;
  /** Stagger delay in ms (e.g. i * 60). Capped at 300ms. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
};

const MAX_DELAY = 300;

/**
 * Fades/slides children in once when scrolled into view.
 * - No-JS safe: hidden state only applies under html.js (set by the theme script).
 * - Reduced motion: CSS forces it visible, no transition.
 * - Server component children are fine; only this wrapper is a client component.
 */
export function Reveal({ as = "div", delay = 0, className, style, id, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-revealed", "true");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal items the user already scrolled past (e.g. after an anchor jump).
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            show();
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clamped = Math.min(Math.max(delay, 0), MAX_DELAY);

  // Single cast keeps the ref typing simple across the allowed intrinsic tags.
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement | null>}
      id={id}
      className={className}
      data-reveal=""
      style={clamped ? ({ ...style, "--reveal-delay": `${clamped}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
