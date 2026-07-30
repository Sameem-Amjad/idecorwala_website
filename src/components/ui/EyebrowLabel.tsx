import { cn } from "@/lib/utils";

interface EyebrowLabelProps {
  text: string;
  className?: string;
  align?: "left" | "center" | "right";
  showRules?: boolean;
}

export default function EyebrowLabel({
  text,
  className,
  align = "center",
  showRules = true,
}: EyebrowLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        align === "left"   && "justify-start",
        align === "right"  && "justify-end",
        className
      )}
    >
      {/* Left rule — hidden when align is "left" */}
      {showRules && align !== "left" && <GoldRule />}

      {/* Label text */}
      <span
        className="font-sans font-medium uppercase"
        style={{
          fontSize:      "0.6875rem",   /* 11px */
          letterSpacing: "0.26em",
          color:         "var(--color-crimson)",
          lineHeight:    1,
        }}
      >
        {text}
      </span>

      {/* Right rule — hidden when align is "right" */}
      {showRules && align !== "right" && <GoldRule />}
    </div>
  );
}

/* Internal GoldRule — only used inside EyebrowLabel */
function GoldRule() {
  return (
    <span
      aria-hidden="true"
      style={{
        display:         "inline-block",
        width:           "2.25rem",      /* 36px */
        height:          "2px",          /* Bolder */
        backgroundImage: "linear-gradient(90deg, rgba(201,168,76,0) 0%, #C9A84C 25%, #FFFCE0 50%, #C9A84C 75%, rgba(201,168,76,0) 100%)",
        boxShadow:       "0 1px 4px rgba(201,168,76,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
        flexShrink:      0,
        borderRadius:    "1px",
      }}
    />
  );
}
