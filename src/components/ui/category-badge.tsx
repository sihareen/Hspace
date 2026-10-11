import type { IconType } from "react-icons";
import { FiBarChart2, FiCpu, FiEye } from "react-icons/fi";

import { cn } from "./cn";

/** Structurally identical to ProjectCategory in sections/projects-gallery. */
export type Category = "IoT" | "AI" | "Data";

const styles: Record<Category, { className: string; icon: IconType }> = {
  IoT: { className: "bg-cat-iot-bg text-cat-iot", icon: FiCpu },
  AI: { className: "bg-cat-ai-bg text-cat-ai", icon: FiEye },
  Data: { className: "bg-cat-data-bg text-cat-data", icon: FiBarChart2 },
};

type CategoryBadgeProps = {
  category: Category;
  /** Show the category icon instead of the 6px swatch. */
  withIcon?: boolean;
  className?: string;
};

export function CategoryBadge({ category, withIcon = false, className }: CategoryBadgeProps) {
  const { className: tone, icon: Icon } = styles[category];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-xs px-2 font-mono text-[0.6875rem] leading-none font-semibold tracking-[0.08em] uppercase",
        tone,
        className,
      )}
    >
      {withIcon ? (
        <Icon aria-hidden="true" className="size-3" />
      ) : (
        <span aria-hidden="true" className="size-1.5 bg-current" />
      )}
      {category}
    </span>
  );
}
