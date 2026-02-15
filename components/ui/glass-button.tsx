"use client";

import * as React from "react";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

const sizeMap = {
  sm: "px-5 py-2.5 text-sm",
  default: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-base",
  icon: "h-10 w-10 flex items-center justify-center",
} as const;

export interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  size?: keyof typeof sizeMap;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const wrapStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
  borderRadius: "9999px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
};

const btnStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  overflow: "hidden",
  color: "#111827",
  cursor: "pointer",
  border: "none",
  background: "none",
  fontFamily: "inherit",
  borderRadius: "9999px",
  textDecoration: "none",
};

// Glass base - visible gradient background with stronger definition
const glassBaseStyle: React.CSSProperties = {
  content: '""',
  position: "absolute",
  inset: 0,
  zIndex: 0,
  borderRadius: "inherit",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(236,253,245,0.85) 30%, rgba(209,250,229,0.75) 60%, rgba(255,255,255,0.9) 100%)",
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  border: "1.5px solid rgba(255,255,255,0.8)",
  boxShadow: "inset 0 0 0 0.5px rgba(16, 185, 129, 0.1)",
};

// Glass specular highlight - more pronounced
const glassShineStyle: React.CSSProperties = {
  content: '""',
  position: "absolute",
  inset: 0,
  zIndex: 1,
  borderRadius: "inherit",
  background:
    "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, transparent 50%, rgba(255,255,255,0.15) 100%)",
  boxShadow:
    "inset 0 1px 3px rgba(255,255,255,1), inset 0 -1px 1px rgba(0,0,0,0.04)",
  pointerEvents: "none",
};

const textStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 10,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  letterSpacing: "-0.015em",
  transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
};

const shadowStyle: React.CSSProperties = {
  position: "absolute",
  inset: "6px",
  zIndex: -1,
  borderRadius: "9999px",
  opacity: 0,
  background: "rgba(16, 185, 129, 0.25)",
  filter: "blur(24px)",
  transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  pointerEvents: "none",
};

export const GlassButton = React.forwardRef<HTMLElement, GlassButtonProps>(
  ({ className, children, size = "default", contentClassName, href, onClick }, ref) => {
    const [hovered, setHovered] = React.useState(false);

    const content = (
      <>
        {/* Glass base layer */}
        <span style={glassBaseStyle} aria-hidden />
        {/* Glass specular highlight */}
        <span style={glassShineStyle} aria-hidden />
        {/* Text content */}
        <span
          style={{
            ...textStyle,
            transform: hovered ? "scale(0.98)" : "scale(1)",
          }}
          className={cn(sizeMap[size], contentClassName)}
        >
          {children}
        </span>
      </>
    );

    const wrapHoverStyle: React.CSSProperties = {
      ...wrapStyle,
      boxShadow: hovered
        ? "0 8px 20px rgba(0, 0, 0, 0.12), 0 3px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)"
        : wrapStyle.boxShadow,
      transform: hovered ? "translateY(-2px)" : "none",
    };

    if (href) {
      return (
        <div
          className={cn(className)}
          style={wrapHoverStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <a
            href={href}
            style={btnStyle}
            onClick={onClick as any}
            ref={ref as any}
          >
            {content}
          </a>
          <span
            style={{ ...shadowStyle, opacity: hovered ? 1 : 0 }}
            aria-hidden
          />
        </div>
      );
    }

    return (
      <div
        className={cn(className)}
        style={wrapHoverStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          style={btnStyle}
          onClick={onClick as any}
          ref={ref as any}
        >
          {content}
        </button>
        <span
          style={{ ...shadowStyle, opacity: hovered ? 1 : 0 }}
          aria-hidden
        />
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";
