import type { HTMLAttributes } from "react";

import { cn } from "./cn";

type ChipProps = HTMLAttributes<HTMLSpanElement>;

/** Neutral tech / meta chip (mono, 24px tall, square-ish). */
export function Chip({ className, ...rest }: ChipProps) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex h-6 items-center whitespace-nowrap rounded-xs bg-surface-2 px-2 t-chip text-ink-2",
        className,
      )}
    />
  );
}
