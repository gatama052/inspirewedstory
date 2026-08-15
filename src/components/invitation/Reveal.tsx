import type { ReactNode } from "react";

type Variant = "up" | "scale" | "left" | "right" | "bottom";

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  duration,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
  duration?: number;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "li";
}) {
  return (
    <Tag
      className={`reveal reveal-${variant} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        ...(duration ? { animationDuration: `${duration}ms` } : {}),
      }}
    >
      {children}
    </Tag>
  );
}
