export default function HeroPlaceholder() {
  return (
    <section
      aria-label="Hero section placeholder"
      style={{
        minHeight:       "100vh",
        backgroundColor: "var(--color-parchment)",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        paddingTop:      "76px",   /* Navbar height */
      }}
    >
      {/*
        HERO CONTENT GOES HERE IN A FUTURE STEP.
        This is a deliberate spacer so the HeadlineSection
        sits below the fold exactly as in the screenshot.
        DO NOT DELETE — replace with real hero content later.
      */}
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "12px",
          opacity:       0.25,
        }}
      >
        <div
          style={{
            width:           "1px",
            height:          "60px",
            backgroundColor: "var(--color-gold)",
          }}
        />
        <span
          className="font-sans uppercase"
          style={{
            fontSize:      "0.625rem",
            letterSpacing: "0.22em",
            color:         "var(--color-gold-600)",
          }}
        >
          Hero Section — Coming Soon
        </span>
        <div
          style={{
            width:           "1px",
            height:          "60px",
            backgroundColor: "var(--color-gold)",
          }}
        />
      </div>
    </section>
  );
}
