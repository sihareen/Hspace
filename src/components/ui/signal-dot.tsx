import { cn } from "./cn";

type SignalDotProps = {
  className?: string;
};

/**
 * 8px "live" LED with a pulse ring (disabled under reduced motion).
 * Decorative: always pair with visible text such as "Available".
 */
export function SignalDot({ className }: SignalDotProps) {
  return <span aria-hidden="true" className={cn("signal-dot", className)} />;
}
