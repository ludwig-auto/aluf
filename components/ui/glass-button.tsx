"use client";

import * as React from "react";
import { motion } from "framer-motion";

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
    const buttonRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

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
            transform: hovered ? "scale(1.02)" : "scale(1)",
          }}
          className={cn(sizeMap[size], contentClassName)}
        >
          {children}
        </span>
      </>
    );

    const renderButton = () => {
      const commonProps = {
        ref: buttonRef as any,
        className: cn("group relative", className),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: {
          cursor: "pointer",
          borderRadius: "9999px",
          display: "inline-block",
        } as any,
      };

      const innerContent = (
        <motion.div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            boxShadow: hovered
              ? "0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(16, 185, 129, 0.1)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {href ? (
            <a href={href} style={btnStyle} onClick={onClick as any} ref={ref as any}>
              {content}
            </a>
          ) : (
            <button style={btnStyle} onClick={onClick as any} ref={ref as any}>
              {content}
            </button>
          )}
          <motion.span
            style={{
              ...shadowStyle,
              opacity: hovered ? 0.6 : 0,
              scale: hovered ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            aria-hidden
          />
        </motion.div>
      );

      return (
        <motion.div {...commonProps}>
          {innerContent}
        </motion.div>
      );
    };

    return renderButton();
  }
);
GlassButton.displayName = "GlassButton";
