import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  text: string;
  className?: string;
  color?: string;
}

export default function SectionEyebrow({ text, className, color = "#C9A050" }: SectionEyebrowProps) {
  return (
    <span
      className={cn("block font-sans font-medium uppercase", className)}
      style={{
        fontSize: "11px",
        letterSpacing: "0.15em",
        color: color,
        lineHeight: 1,
      }}
    >
      {text}
    </span>
  );
}
