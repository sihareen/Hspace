import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "md" | "sm";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    /** Appends a visually-hidden "(opens in new tab)" and sets rel when target="_blank". */
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-semibold whitespace-nowrap " +
  "transition-[color,background-color,border-color,transform] duration-(--dur-fast) " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const heights: Record<ButtonSize, string> = {
  md: "h-11 text-sm",
  sm: "h-9 text-sm",
};

const paddings: Record<ButtonSize, string> = {
  md: "px-5",
  sm: "px-3.5",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-line-strong text-ink hover:border-ink hover:bg-surface-2",
  ghost: "text-accent underline-offset-4 hover:underline",
  /** For the inverse (contact) panel: light-on-dark in light theme, primary in dark theme. */
  inverse:
    "bg-on-inverse text-inverse hover:bg-on-inverse/90 focus-visible:outline-on-inverse " +
    "dark:bg-primary dark:text-on-primary dark:hover:bg-primary-hover",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cn(base, heights[size], variant === "ghost" ? "px-1" : paddings[size], variants[variant], className);
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, external, target, rel, ...rest } = props;
    const isNewTab = external || target === "_blank";
    return (
      <a
        {...rest}
        target={isNewTab ? "_blank" : target}
        rel={isNewTab ? (rel ?? "noopener noreferrer") : rel}
        className={buttonClasses({ variant, size, className })}
      >
        {children}
        {isNewTab ? <span className="sr-only"> (opens in new tab)</span> : null}
      </a>
    );
  }

  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button {...rest} type={type} className={buttonClasses({ variant, size, className })}>
      {children}
    </button>
  );
}
