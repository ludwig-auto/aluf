"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm:      "px-4 py-2 text-xs",
  default: "px-5 py-3 text-sm",
  lg:      "px-6 py-3.5 text-sm",
  icon:    "h-10 w-10",
} as const;

export interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  size?: keyof typeof sizeMap;
  href?: string;
  target?: string;
  rel?: string;
  tabIndex?: number;
  variant?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent) => void;
}

export const GlassButton = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size = "default", contentClassName, href, target, rel, tabIndex, variant = "primary", onClick }, ref) => {

    const classes = cn(
      "group inline-flex items-center justify-center",
      "rounded-full",
      "font-medium tracking-tight",
      "transition-colors duration-200",
      "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
      sizeMap[size],
      variant === "primary"
        ? "bg-violet-500/20 border border-violet-400/40 text-white hover:bg-violet-500/30 hover:border-violet-400/60"
        : "text-white/80 border border-transparent hover:bg-white/5",
      className
    );

    const inner = (
      <span className={cn("relative z-10 inline-flex items-center whitespace-nowrap", contentClassName)}>{children}</span>
    );

    if (href) {
      return (
        <a href={href} target={target} rel={rel} tabIndex={tabIndex} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} ref={ref as React.Ref<HTMLAnchorElement>} className={classes}>
          {inner}
        </a>
      );
    }

    return (
      <button tabIndex={tabIndex} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} ref={ref as React.Ref<HTMLButtonElement>} className={classes}>
        {inner}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
