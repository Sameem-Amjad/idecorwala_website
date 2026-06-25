import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface OutlinedCTAProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "charcoal" | "gold" | "white";
}

export default function OutlinedCTA({
  label,
  href,
  onClick,
  className,
  variant = "charcoal",
}: OutlinedCTAProps) {
  const baseStyles =
    "inline-flex items-center justify-center border font-sans text-[12px] font-medium tracking-[0.1em] uppercase transition-all duration-300 px-6 py-3 cursor-pointer group";

  const variants = {
    charcoal:
      "border-[#1B1714] text-[#1B1714] bg-transparent hover:bg-[#1B1714] hover:text-[#F2EAE0]",
    gold: "border-[#C9A050] text-[#C9A050] bg-transparent hover:bg-[#C9A050] hover:text-[#1B1714]",
    white: "border-[#F2EAE0] text-[#F2EAE0] bg-transparent hover:bg-[#F2EAE0] hover:text-[#7A1216]",
  };

  const content = (
    <>
      {label}
      <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {content}
    </button>
  );
}
