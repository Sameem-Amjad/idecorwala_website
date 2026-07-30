import React from "react";
import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  align?: "left" | "center";
}

export default function GoldDivider({ className, align = "left" }: GoldDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 my-4",
        align === "center" ? "justify-center" : "justify-start",
        className
      )}
    >
      <div className="w-[60px] h-[1px] bg-[#C9A050]" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A050]" />
    </div>
  );
}
