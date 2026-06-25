import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block font-sans text-[11px] font-medium tracking-[0.12em] text-[#C9A050] uppercase",
        className
      )}
    >
      {text}
    </span>
  );
}
