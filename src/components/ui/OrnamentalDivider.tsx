interface OrnamentalDividerProps {
  width?: string;
  className?: string;
}

export default function OrnamentalDivider({
  width = "120px",
  className,
}: OrnamentalDividerProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            0,
        width:          width,
        margin:         "0 auto",
      }}
    >
      {/* Left half of line */}
      <div
        style={{
          flex:            1,
          height:          "2px",
          backgroundImage: "linear-gradient(90deg, rgba(201,168,76,0) 0%, #C9A84C 50%, #FFFCE0 100%)",
          boxShadow:       "0 1px 3px rgba(201,168,76,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
          borderRadius:    "1px",
        }}
      />

      {/* Center diamond ornament */}
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, margin: "0 4px" }}
      >
        <polygon
          points="4,0 8,4 4,8 0,4"
          fill="var(--color-gold)"
        />
      </svg>

      {/* Right half of line */}
      <div
        style={{
          flex:            1,
          height:          "2px",
          backgroundImage: "linear-gradient(90deg, #FFFCE0 0%, #C9A84C 50%, rgba(201,168,76,0) 100%)",
          boxShadow:       "0 1px 3px rgba(201,168,76,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
          borderRadius:    "1px",
        }}
      />
    </div>
  );
}
