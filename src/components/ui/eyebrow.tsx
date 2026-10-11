import type { ElementType, ReactNode } from "react";

import { cn } from "./cn";

type EyebrowProps = {
  /** Optional accent-coloured prefix, e.g. "02" renders "02 / {children}". */
  number?: string;
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/** Mono uppercase label. Default colour text-ink-3; override via className (e.g. text-on-inverse-2). */
export function Eyebrow({ number, children, as: Tag = "p", className }: EyebrowProps) {
  return (
    <Tag className={cn("t-eyebrow text-ink-3", className)}>
      {number ? (
        <>
          <span className="text-accent">{number}</span>
          {" / "}
        </>
      ) : null}
      {children}
    </Tag>
  );
}
