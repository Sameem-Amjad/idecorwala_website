"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children:    React.ReactNode;
  className?:  string;
  delay?:      number;   /* ms stagger delay */
  direction?:  "up" | "fade";
  translateOffset?: number; /* custom translate Y distance */
  style?:      React.CSSProperties;
}

export default function AnimatedSection({
  children,
  className,
  delay    = 0,
  direction = "up",
  translateOffset = 20,
  style,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const baseStyle: React.CSSProperties = {
    transitionProperty:        "opacity, transform",
    transitionDuration:        "700ms",
    transitionTimingFunction:  "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay:           `${delay}ms`,
    opacity:                   isVisible ? 1 : 0,
    transform:                 isVisible
      ? "translate3d(0, 0px, 0)"
      : direction === "up" ? `translate3d(0, ${translateOffset}px, 0)` : "translate3d(0, 0px, 0)",
    willChange:                "opacity, transform",
    backfaceVisibility:        "hidden",
    ...style,
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
      style={baseStyle}
    >
      {children}
    </div>
  );
}
