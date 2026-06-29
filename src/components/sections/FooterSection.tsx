"use client";

type IconProps = {
  className?: string;
};

function UserIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7.5" r="3.1" />
      <path d="M5.8 20c.7-4 2.8-6 6.2-6s5.5 2 6.2 6" />
    </svg>
  );
}

function MailIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 6.8h15v10.4h-15V6.8Z" />
      <path d="m5.2 7.4 6.8 5.2 6.8-5.2" />
    </svg>
  );
}

function BuildingIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.4 20V8.2h5.8V20" />
      <path d="M11.2 20V4.4h7.4V20" />
      <path d="M7.6 11h1.3M7.6 14h1.3M7.6 17h1.3M14 7.5h1.7M14 10.8h1.7M14 14.1h1.7M14 17.4h1.7" />
    </svg>
  );
}

function BriefcaseIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 8.2h15v10.2h-15V8.2Z" />
      <path d="M9.2 8.2V5.8h5.6v2.4" />
      <path d="M4.5 12.1h15M10.2 12.1v1.5h3.6v-1.5" />
    </svg>
  );
}

function RupeeIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 5h8M8 9h8M8 5c3.7 0 6 1.1 6 4.1 0 2.7-2.2 4.2-5.6 4.2L15 20" />
    </svg>
  );
}

function CalendarIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7.2h14v12H5v-12Z" />
      <path d="M8.2 4.5v4M15.8 4.5v4M5 10.6h14" />
      <path d="M8.3 13.5h1.3M11.4 13.5h1.3M14.5 13.5h1.3M8.3 16.3h1.3M11.4 16.3h1.3" />
    </svg>
  );
}

function MessageIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 6.4h14v9.2H9.2L5 19.2V6.4Z" />
      <path d="M8.3 10.2h7.4M8.3 13h4.8" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.3 4.7 9.4 3.6l3 4.8-2.1 1.8c1 2 2.5 3.6 4.7 4.7l1.8-2.1 4.8 3-1.1 2.1c-.5 1-1.7 1.5-2.8 1.1C10.3 16.9 6.8 13.4 4.9 6.4c-.3-.8.3-1.3 2.4-1.7Z" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.6" />
      <path d="M4.4 12h15.2" />
      <path d="M12 4.4c2.3 2.3 3.4 4.8 3.4 7.6s-1.1 5.3-3.4 7.6" />
      <path d="M12 4.4C9.7 6.7 8.6 9.2 8.6 12s1.1 5.3 3.4 7.6" />
    </svg>
  );
}

function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.6V12l3 2.1" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.2 9.8v7" />
      <path d="M7.2 7.2v.1" />
      <path d="M11 16.8v-7" />
      <path d="M11 12.7c0-1.8 1-3 2.8-3 1.9 0 3 1.3 3 3.5v3.6" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M15.7 8.5h.1" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.8 8.8c.2-1 1-1.7 2-1.8 2.8-.2 5.6-.2 8.4 0 1 .1 1.8.8 2 1.8.3 2.1.3 4.3 0 6.4-.2 1-1 1.7-2 1.8-2.8.2-5.6.2-8.4 0-1-.1-1.8-.8-2-1.8-.3-2.1-.3-4.3 0-6.4Z" />
      <path d="m10.7 9.7 4.1 2.3-4.1 2.3V9.7Z" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m7 9.5 5 5 5-5" />
    </svg>
  );
}

function PinterestIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 22a9 9 0 0 1-1.91-8.39c.35-1.4.92-2.73 1.68-3.97a9.38 9.38 0 0 1 5.92-4.5A9 9 0 0 1 22 13a9 9 0 0 1-6.19 8.56c-.66.23-1.37.16-1.97-.2a4.4 4.4 0 0 1-1.63-2.65c-.17-.67-.3-1.35-.43-2.03-.24-1.25-.49-2.5-.73-3.75" />
      <path d="M12 10c.8 2.2 2 4.1 3.5 5.7" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SparkleDivider({ className = "", isFullWidth = false }: { className?: string; isFullWidth?: boolean }) {
  return (
    <div className={`sparkle-divider ${isFullWidth ? "full-width" : "brand-width"} ${className}`} aria-hidden="true">
      <div className="sparkle-line-left" />
      <svg className="sparkle-glyph" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
      </svg>
      <div className="sparkle-line-right" />
    </div>
  );
}

function ParticleArt() {
  return (
    <div className="rfp-footer-particles" aria-hidden="true">
      <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pglow1" cx="30%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#b8945a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#b8945a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pglow2" cx="10%" cy="100%" r="50%">
            <stop offset="0%" stopColor="#fcf6ba" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4a84b" stopOpacity="0" />
          </radialGradient>
          
          {/* Metallic gold gradient paths */}
          <linearGradient id="goldWave1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a6f27" />
            <stop offset="20%" stopColor="#e8c86b" />
            <stop offset="40%" stopColor="#fffdd0" />
            <stop offset="60%" stopColor="#b38728" />
            <stop offset="80%" stopColor="#fbf5b7" />
            <stop offset="100%" stopColor="#aa771c" />
          </linearGradient>
          <linearGradient id="goldWave2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8945a" />
            <stop offset="30%" stopColor="#fdf4c6" />
            <stop offset="50%" stopColor="#805b15" />
            <stop offset="70%" stopColor="#f5d796" />
            <stop offset="100%" stopColor="#a37c3f" />
          </linearGradient>
          <linearGradient id="goldWave3" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#aa771c" />
            <stop offset="25%" stopColor="#fffdd0" />
            <stop offset="50%" stopColor="#b38728" />
            <stop offset="75%" stopColor="#fffdd0" />
            <stop offset="100%" stopColor="#8a6f27" />
          </linearGradient>
          
          <filter id="softblur"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id="tinyblur"><feGaussianBlur stdDeviation="0.8" /></filter>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <ellipse cx="100" cy="280" rx="200" ry="120" fill="url(#pglow1)" />
        <ellipse cx="50" cy="300" rx="150" ry="100" fill="url(#pglow2)" />
        
        {/* Curved Golden Waves with Gradients */}
        <path d="M -20 280 Q 80 200 200 220 Q 320 240 420 180 Q 480 160 520 140" stroke="url(#goldWave1)" strokeWidth="1.8" fill="none" opacity="0.95" filter="url(#goldGlow)" />
        <path d="M -20 300 Q 100 230 220 240 Q 350 250 450 200 Q 490 185 530 170" stroke="url(#goldWave2)" strokeWidth="1.2" fill="none" opacity="0.8" />
        <path d="M -20 260 Q 60 180 180 200 Q 290 220 390 160 Q 460 135 510 120" stroke="url(#goldWave3)" strokeWidth="2.2" fill="none" opacity="0.75" filter="url(#goldGlow)" />
        <path d="M 0 290 Q 120 210 250 225 Q 370 238 470 175" stroke="url(#goldWave1)" strokeWidth="1.0" fill="none" opacity="0.65" />
        <path d="M -10 270 Q 90 195 210 210 Q 330 225 440 165 Q 500 145 530 130" stroke="url(#goldWave2)" strokeWidth="1.5" fill="none" opacity="0.9" filter="url(#tinyblur)" />
        
        {/* Sparkling particle stars */}
        {[[60,238],[130,222],[200,218],[280,228],[360,198],[430,172],[90,252],[160,242],[240,235],[320,218],[400,185],[40,265],[110,248],[190,230],[270,240],[350,208]].map(([cx, cy], index) => (
          <circle key={`particle-${index}`} cx={cx} cy={cy} r={index % 3 === 0 ? 1.8 : 1.2} fill="#fffdd0" opacity={0.7 + (index % 4) * 0.1} filter="url(#tinyblur)" />
        ))}
        {[[85,230],[210,215],[340,195],[165,245],[290,225]].map(([cx, cy], index) => (
          <g key={`highlight-${index}`}>
            <circle cx={cx} cy={cy} r="4.5" fill="#fcf6ba" opacity="0.4" filter="url(#softblur)" />
            <circle cx={cx} cy={cy} r="1.8" fill="#ffffff" opacity="0.95" />
          </g>
        ))}
      </svg>
    </div>
  );
}

const contactItems = [
  {
    label: "CALL US",
    value: "+91-7200303022",
    href: "tel:+917200303022",
    icon: PhoneIcon,
  },
  {
    label: "EMAIL US",
    value: "contact@idecorwala.com",
    href: "mailto:contact@idecorwala.com",
    icon: MailIcon,
  },
  {
    label: "VISIT WEBSITE",
    value: "www.idecorwala.com",
    href: "https://www.idecorwala.com",
    icon: GlobeIcon,
    external: true,
  },
];

const socialItems = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon },
  { label: "YouTube", href: "https://www.youtube.com", icon: YoutubeIcon },
];

const optionStyle = {
  backgroundColor: "#1a1a1a",
  color: "#f0ece6",
};

function setFieldShellStyle(target: HTMLElement, borderColor: string, boxShadow = "none") {
  const shell = target.closest(".rfp-field, .rfp-textarea-field") as HTMLElement | null;
  if (!shell) return;
  shell.style.borderColor = borderColor;
  shell.style.boxShadow = boxShadow;
}

const fieldEvents = {};

function TextField({
  icon: Icon,
  placeholder,
}: {
  icon: (props: IconProps) => React.ReactNode;
  placeholder: string;
}) {
  return (
    <div className="rfp-field">
      <Icon className="rfp-field-icon" />
      <input aria-label={placeholder} placeholder={placeholder} {...fieldEvents} />
    </div>
  );
}

function SelectField({
  icon: Icon,
  label,
  options,
}: {
  icon: (props: IconProps) => React.ReactNode;
  label: string;
  options: string[];
}) {
  return (
    <div className="rfp-field rfp-select-field">
      <Icon className="rfp-field-icon" />
      <select aria-label={label} defaultValue="" {...fieldEvents}>
        <option value="" disabled style={optionStyle}>
          {label}
        </option>
        {options.map((option) => (
          <option value={option.toLowerCase().replace(/\s+/g, "-")} key={option} style={optionStyle}>
            {option}
          </option>
        ))}
      </select>
      <ChevronIcon className="rfp-chevron" />
    </div>
  );
}

export default function FooterSection() {
  return (
    <section className="rfp-footer-section" aria-label="RFP and contact footer">
      <style>{`
        .rfp-footer-section {
          --rfp-bg: #0a0a0a;
          --rfp-panel: #0d0d0d;
          --rfp-field: #1a1a1a;
          --rfp-gold: #b8945a;
          --rfp-red: #c00000;
          --rfp-tag-red: #c00000;
          --rfp-white: #f0ece6;
          --rfp-muted: #8d867e;
          --rfp-border: rgba(184, 148, 90, 0.35);
          --rfp-line: rgba(184, 148, 90, 0.3);
          width: 100%;
          background: var(--rfp-bg);
          padding: 48px 40px 40px;
          box-sizing: border-box;
          font-family: var(--font-dm-sans), var(--font-inter), Arial, sans-serif;
        }

        .rfp-footer-card {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 12px;
          background: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E") padding-box,
            #060606;
          overflow: hidden;
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.75),
            0 0 15px rgba(212, 175, 55, 0.08);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .rfp-footer-card:hover {
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 
            0 16px 50px rgba(0, 0, 0, 0.85),
            0 0 25px rgba(212, 175, 55, 0.18);
        }

        .rfp-upper {
          display: flex;
          width: 100%;
          min-height: 580px;
          box-sizing: border-box;
          background: transparent;
          overflow: visible;
        }

        .rfp-left-panel,
        .rfp-right-panel {
          position: relative;
          min-width: 0;
          background: transparent;
        }

        .rfp-left-panel {
          width: 42%;
          flex-shrink: 0;
          padding: 48px 44px;
          box-sizing: border-box;
          overflow: hidden;
          background: radial-gradient(circle at 0% 100%, rgba(184, 148, 90, 0.08) 0%, transparent 60%);
        }

        .rfp-right-panel {
          flex: 1;
          min-width: 0;
          padding: 44px 48px;
          box-sizing: border-box;
          background: transparent;
        }

        .rfp-center-divider {
          position: relative;
          width: 2px;
          background: linear-gradient(180deg, rgba(184,148,90,0.05) 0%, #bf953f 20%, #fcf6ba 40%, #b38728 60%, #fbf5b7 80%, rgba(184,148,90,0.05) 100%);
          flex-shrink: 0;
          overflow: visible;
          box-shadow: 0 0 8px rgba(191, 149, 63, 0.35);
          z-index: 2;
        }

        .rfp-center-diamond {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 11px;
          height: 11px;
          transform: translate(-50%, -50%) rotate(45deg);
          background: linear-gradient(135deg, #bf953f, #fcf6ba);
          box-shadow: 0 0 16px rgba(241, 198, 119, 0.85), 0 0 4px rgba(241, 198, 119, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.55);
          z-index: 3;
        }

        .rfp-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--rfp-tag-red);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
          margin-bottom: 8px;
        }

        .rfp-eyebrow-line {
          width: 24px;
          height: 1px;
          background: rgba(184, 148, 90, 0.5);
        }

        .rfp-eyebrow-diamond {
          display: block;
          width: 5px;
          height: 5px;
          margin-top: 6px;
          transform: rotate(45deg);
          background: #bf953f;
          box-shadow: 0 0 10px rgba(241, 198, 119, 0.4);
        }

        .rfp-headline {
          position: relative;
          z-index: 1;
          margin: 24px 0;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .rfp-headline span {
          display: block;
        }

        .rfp-headline-white {
          background: linear-gradient(135deg, #ffffff 0%, #dfd9ce 60%, #f7f5f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .rfp-headline-red {
          background: linear-gradient(135deg, #ff3333 0%, #bd0808 50%, #800000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(189, 8, 8, 0.45));
        }

        .rfp-left-rule {
          position: relative;
          z-index: 1;
          width: 260px;
          height: 1px;
          margin-top: 30px;
          background: linear-gradient(90deg, rgba(184,148,90,0.1), rgba(184,148,90,0.5), rgba(184,148,90,0.1));
        }

        .rfp-left-rule::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          height: 7px;
          transform: translate(-50%, -50%) rotate(45deg);
          background: linear-gradient(135deg, #bf953f, #fcf6ba);
          box-shadow: 0 0 10px rgba(241, 198, 119, 0.6);
        }

        .rfp-left-copy {
          position: relative;
          z-index: 1;
          max-width: 390px;
          margin-top: 28px;
          color: rgba(240, 236, 230, 0.85);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .rfp-footer-particles {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 55%;
          pointer-events: none;
          overflow: hidden;
        }

        .rfp-footer-particles svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .rfp-form-title {
          color: var(--rfp-white);
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 0.18em;
          line-height: 1;
          text-align: center;
          text-transform: uppercase;
        }

        .rfp-form-rule {
          position: relative;
          width: min(430px, 68%);
          height: 1px;
          margin: 22px auto 28px;
          background: linear-gradient(90deg, rgba(184,148,90,0), rgba(184,148,90,0.4), rgba(184,148,90,0));
        }

        .rfp-form-rule::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 12px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L14.5 4.5L24 6L16.5 8L18 12L12 9L6 12L7.5 8L0 6L9.5 4.5L12 0Z' fill='%23e2c07a'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          filter: drop-shadow(0 0 4px rgba(226, 192, 122, 0.8));
        }

        .rfp-field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 18px;
        }

        .rfp-field,
        .rfp-textarea-field {
          position: relative;
          min-width: 0;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          background: rgba(15, 15, 15, 0.65);
          color: var(--rfp-white);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.65);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .rfp-field:hover,
        .rfp-textarea-field:hover {
          border-color: rgba(184, 148, 90, 0.3);
          background: rgba(20, 20, 20, 0.7);
        }

        .rfp-field:focus-within,
        .rfp-textarea-field:focus-within {
          border-color: rgba(184, 148, 90, 0.65);
          background: rgba(22, 22, 22, 0.85);
          box-shadow: 
            inset 0 1px 2px rgba(0, 0, 0, 0.7),
            0 0 12px rgba(184, 148, 90, 0.15);
        }

        .rfp-field {
          height: 54px;
          display: flex;
          align-items: center;
        }

        .rfp-field-wide,
        .rfp-textarea-field {
          grid-column: 1 / -1;
        }

        .rfp-field-half {
          grid-column: 1 / 2;
        }

        .rfp-field input,
        .rfp-field select,
        .rfp-textarea-field textarea {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: rgba(240, 236, 230, 0.95);
          font-family: var(--font-dm-sans), var(--font-inter), Arial, sans-serif;
          font-size: 13.5px;
          font-weight: 300;
          box-sizing: border-box;
          letter-spacing: 0.03em;
        }

        .rfp-field input,
        .rfp-field select {
          height: 100%;
          padding: 12px 44px 12px 40px;
        }

        .rfp-field select {
          appearance: none;
          cursor: pointer;
        }

        .rfp-field input::placeholder,
        .rfp-textarea-field textarea::placeholder {
          color: rgba(184, 148, 90, 0.45);
          opacity: 1;
        }

        .rfp-field select:invalid {
          color: rgba(184, 148, 90, 0.45);
        }

        .rfp-field select option {
          background-color: #121110;
          color: #f0ece6;
        }

        .rfp-field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          width: 18px;
          height: 18px;
          transform: translateY(-50%);
          color: rgba(184, 148, 90, 0.45);
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .rfp-field:hover .rfp-field-icon,
        .rfp-textarea-field:hover .rfp-field-icon {
          color: rgba(184, 148, 90, 0.85);
        }

        .rfp-field:focus-within .rfp-field-icon,
        .rfp-textarea-field:focus-within .rfp-field-icon {
          color: #fcf6ba;
          filter: drop-shadow(0 0 8px rgba(252, 246, 186, 0.7));
          transform: translateY(-50%) scale(1.15);
        }

        .rfp-chevron {
          position: absolute;
          right: 14px;
          top: 50%;
          width: 17px;
          height: 17px;
          transform: translateY(-50%);
          color: rgba(184, 148, 90, 0.6);
          stroke: currentColor;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .rfp-field:hover .rfp-chevron {
          color: rgba(184, 148, 90, 0.95);
        }

        .rfp-field:focus-within .rfp-chevron {
          color: #f1c677;
          transform: translateY(-50%) rotate(180deg);
        }

        .rfp-textarea-field {
          min-height: 104px;
        }

        .rfp-textarea-field .rfp-field-icon {
          top: 17px;
          transform: none;
        }

        .rfp-textarea-field:focus-within .rfp-field-icon {
          transform: scale(1.1);
        }

        .rfp-textarea-field textarea {
          height: 100%;
          resize: vertical;
          min-height: 104px;
          padding: 15px 14px 14px 40px;
          line-height: 1.45;
        }

        .rfp-submit {
          position: relative;
          grid-column: 1 / -1;
          justify-self: center;
          width: 100%;
          max-width: 320px;
          height: 52px;
          border: 1px solid #1a0000;
          border-top: 1.5px solid #ffae19;
          border-radius: 8px;
          background: linear-gradient(180deg, #4a0000 0%, #8c0000 15%, #b80000 45%, #4a0000 85%, #0d0000 100%);
          color: #ffffff;
          cursor: pointer;
          font-family: var(--font-dm-sans), var(--font-inter), Arial, sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-align: center;
          text-transform: uppercase;
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.5), 
            inset 0 1px 1px rgba(255, 255, 255, 0.1),
            inset 0 2px 4px rgba(255, 174, 25, 0.5),
            inset 0 -3px 8px rgba(0, 0, 0, 0.9);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .rfp-submit::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: none;
        }

        .rfp-submit:hover::before {
          animation: rfp-shimmer 1.5s infinite;
        }

        @keyframes rfp-shimmer {
          100% {
            left: 200%;
          }
        }

        .rfp-submit:hover {
          background: linear-gradient(180deg, #5c0000 0%, #a30000 15%, #d60000 45%, #5c0000 85%, #120000 100%);
          box-shadow: 
            0 10px 30px rgba(184, 0, 0, 0.3),
            0 4px 15px rgba(0, 0, 0, 0.5), 
            inset 0 1px 1px rgba(255, 255, 255, 0.2),
            inset 0 2.5px 6px rgba(255, 174, 25, 0.75), 
            inset 0 -3px 8px rgba(0, 0, 0, 0.9);
          border-top-color: #ffc252;
          transform: translateY(-1px);
        }

        .rfp-submit:active {
          transform: translateY(1px);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.5),
            inset 0 1px 3px rgba(0, 0, 0, 0.9);
        }

        .rfp-submit-arrow {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          line-height: 1;
          font-weight: 300;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .rfp-submit:hover .rfp-submit-arrow {
          transform: translateY(-50%) translateX(6px);
        }

        .rfp-response-note {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: -6px;
          color: #999999;
          font-size: 12px;
          font-weight: 300;
          line-height: 1;
        }

        .rfp-response-note svg {
          width: 16px;
          height: 16px;
          color: #999999;
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .rfp-contact-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: nowrap;
          width: 100%;
          box-sizing: border-box;
          border-top: 1px solid rgba(184,148,90,0.2);
          padding: 20px 44px;
          background: #101010;
        }

        .rfp-contact-column {
          position: relative;
          min-width: 0;
          height: auto;
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          padding: 0;
        }

        .rfp-contact-column:nth-child(4) {
          flex: 1 1 auto;
          min-width: 360px;
        }

        .rfp-contact-column + .rfp-contact-column::before {
          content: "";
          position: absolute;
          left: -12px;
          top: 3px;
          bottom: 3px;
          width: 1px;
          background: rgba(184,148,90,0.25);
        }

        .rfp-contact-link,
        .rfp-office,
        .rfp-social {
          display: flex;
          align-items: center;
          min-width: 0;
          color: inherit;
          text-decoration: none;
        }

        .rfp-contact-link {
          gap: 12px;
        }

        .rfp-contact-icon,
        .rfp-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: transparent;
          color: var(--rfp-gold);
          flex: 0 0 auto;
        }

        .rfp-contact-icon {
          width: 40px;
          height: 40px;
        }

        .rfp-contact-icon .icon-inner > svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          stroke-width: 1.45;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .rfp-contact-copy,
        .rfp-office,
        .rfp-social {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 3px;
          min-width: 0;
          line-height: 1;
        }

        .rfp-contact-label {
          color: var(--rfp-gold);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .rfp-contact-value {
          color: var(--rfp-white);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.3;
          white-space: nowrap;
        }

        .rfp-contact-value-link {
          color: var(--rfp-white);
          text-decoration: none;
          transition: color 0.25s ease;
          cursor: pointer;
        }

        .rfp-contact-link:hover .rfp-contact-value-link {
          color: #c9a84c;
        }

        .rfp-office .rfp-contact-value {
          font-size: 12px;
        }

        .rfp-social {
          align-items: flex-end;
          gap: 8px;
        }

        .rfp-social-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rfp-social-link {
          width: 38px;
          height: 38px;
          text-decoration: none;
        }

        .rfp-social-link .icon-inner > svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          stroke-width: 1.65;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        @media (max-width: 1279px) {
          .footer-inner-container {
            padding-left: 40px;
            padding-right: 40px;
          }
          /* Reflow columns to span multiple grid slots */
          .footer-top-grid {
            grid-template-columns: repeat(6, 1fr);
          }

          .footer-brand-col {
            grid-column: 1 / -1;
            margin-bottom: 24px;
          }

          .footer-link-col {
            grid-column: span 2; /* flows 3 columns per row */
          }

          .footer-contact-map-row {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .footer-contact-blocks {
            width: 100%;
            justify-content: space-around;
            gap: 24px;
          }

          .footer-map-container {
            width: 100%;
            max-width: 480px;
            height: 200px;
          }
        }

        @media (max-width: 1023px) {
          .footer-inner-container {
            padding-left: 48px;
            padding-right: 48px;
          }

          .footer-top-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-brand-col {
            grid-column: 1 / -1;
          }

          .footer-link-col {
            grid-column: span 1; /* flows 2 columns per row */
          }

          .footer-contact-map-row {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .footer-contact-blocks {
            width: 100%;
            flex-direction: column;
            gap: 24px;
          }

          .footer-contact-item {
            max-width: 100%;
          }

          .footer-contact-divider {
            height: 1px;
            width: 100%;
            display: none;
          }

          .footer-contact-item + .footer-contact-item {
            border-top: 1px solid rgba(201, 160, 80, 0.25);
            padding-top: 24px;
          }

          .footer-map-container {
            width: 70%;
            height: 200px;
          }
        }

        @media (max-width: 1024px) {
          .rfp-upper {
            flex-direction: column;
          }

          .rfp-center-divider {
            display: none;
          }

          .rfp-left-panel {
            width: 100%;
          }

          .rfp-left-panel,
          .rfp-right-panel {
            padding: 48px 28px;
          }

          .rfp-field-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .rfp-field-half,
          .rfp-submit {
            grid-column: 1 / -1;
          }

          .rfp-contact-bar {
            min-height: 0;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 0 24px;
          }

          .rfp-contact-column,
          .rfp-contact-column:nth-child(4) {
            flex: 1 1 auto;
            height: auto;
            min-height: 88px;
            min-width: 0;
            padding: 20px 0;
          }

          .rfp-contact-column + .rfp-contact-column::before {
            left: 0;
            top: 0;
            right: 0;
            bottom: auto;
            width: auto;
            height: 1px;
          }

          .rfp-social {
            align-items: flex-start;
          }

          .rfp-contact-value {
            white-space: normal;
          }
        }

        @media (max-width: 560px) {
          .rfp-footer-section {
            padding: 40px 14px 28px;
          }

          .rfp-headline {
            font-size: clamp(34px, 11vw, 48px);
          }

          .rfp-eyebrow {
            white-space: normal;
            line-height: 1.45;
          }

          .rfp-left-rule {
            width: 220px;
          }

          .rfp-field {
            height: 64px;
          }

          .rfp-submit {
            height: 66px;
          }
        }

        .rfp-footer-bottom {
          display: none;
        }

        /* --- NEW UTILITY FOOTER STYLES --- */
        .footer-utility-section {
          background-color: #0A0A0A;
          padding-top: 64px;
          padding-bottom: 0;
          font-family: Satoshi, Inter, var(--font-sans), sans-serif;
          color: #D8D6D0;
        }

        .footer-inner-container {
          width: 100%;
          max-width: 1720px;
          margin: 0 auto;
          padding-left: 80px;
          padding-right: 80px;
          box-sizing: border-box;
        }

        /* Top Grid - Desktop default: 6 columns (Brand + 5 links) */
        .footer-top-grid {
          display: grid;
          grid-template-columns: minmax(260px, 1.6fr) repeat(5, 1fr);
          column-gap: 40px;
          row-gap: 32px;
          align-items: start;
          margin-bottom: 48px;
        }

        /* Brand Column */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .footer-logo {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.5px;
          line-height: 1.2;
          font-family: var(--font-serif);
        }

        .footer-logo-i {
          color: var(--color-crimson, #C0392B);
        }

        .footer-logo-text {
          color: #F5F4F0;
        }

        .footer-tagline {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          color: #9A9890;
          margin-top: 10px;
          text-transform: uppercase;
        }

        /* Sparkle Divider Component */
        .sparkle-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
          margin-bottom: 20px;
          color: #C9A050;
        }

        .sparkle-divider.brand-width {
          width: 90px;
        }

        .sparkle-divider.full-width {
          width: 100%;
          margin-top: 40px;
          margin-bottom: 40px;
        }

        .sparkle-line-left,
        .sparkle-line-right {
          height: 1px;
          background-color: #C9A050;
          flex: 1;
        }

        .sparkle-divider.full-width .sparkle-line-left,
        .sparkle-divider.full-width .sparkle-line-right {
          background-color: rgba(201, 160, 80, 0.3);
        }

        .sparkle-glyph {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
        }

        .footer-brand-desc {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.65;
          color: #A8A39A;
          max-width: 260px;
          margin-bottom: 20px;
        }

        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .footer-social-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(201, 160, 80, 0.4);
          background-color: transparent;
          color: #C9A050;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out, transform 200ms ease-out;
          cursor: pointer;
        }

        .footer-social-btn:hover {
          background-color: #C9A050;
          color: #0A0A0A;
          border-color: rgba(201, 160, 80, 1);
          transform: translateY(-2px);
        }

        .footer-social-btn svg {
          width: 26px;
          height: 26px;
          stroke: currentColor;
          stroke-width: 1.65;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }

        /* Link Columns */
        .footer-link-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-col-header {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #C9A050;
          text-transform: uppercase;
        }

        .footer-header-underline {
          width: 26px;
          height: 2px;
          background-color: #C9A050;
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .footer-link-item a {
          font-size: 14.5px;
          font-weight: 400;
          color: #D8D6D0;
          text-decoration: none;
          position: relative;
          display: inline-block;
          transition: color 200ms ease-out;
        }

        .footer-link-item a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background-color: #C9A050;
          transition: width 200ms ease-out;
        }

        .footer-link-item a:hover {
          color: #C9A050;
        }

        .footer-link-item a:hover::after {
          width: 100%;
        }

        /* Keyboard Focus Outline */
        .footer-social-btn:focus-visible,
        .footer-link-item a:focus-visible,
        .footer-contact-item a:focus-visible {
          outline: 2px solid #C9A050;
          outline-offset: 2px;
        }

        /* Contact + Map Row */
        .footer-contact-map-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          margin-bottom: 40px;
        }

        .footer-contact-blocks {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: stretch;
          gap: 24px;
        }

        .footer-contact-item {
          flex: 1;
          max-width: 220px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: transform 200ms ease-out;
        }

        .footer-contact-item:hover {
          transform: translateY(-2px);
        }

        .footer-contact-item:hover .footer-contact-icon-circle {
          background-color: #C9A050;
          color: #0A0A0A;
          border-color: #C9A050;
          box-shadow: 0 0 15px rgba(201, 160, 80, 0.4);
        }

        .footer-contact-divider {
          width: 1px;
          background-color: rgba(201, 160, 80, 0.25);
          align-self: stretch;
        }

        .footer-contact-icon-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid #C9A050;
          background-color: transparent;
          color: #C9A050;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
        }

        /* Ensure contact icons with fill=none can render visible strokes */
        .footer-contact-icon-circle svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }

        .footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-contact-header {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #C9A050;
          text-transform: uppercase;
        }

        .footer-contact-content {
          font-size: 14.5px;
          font-weight: 400;
          color: #D8D6D0;
          line-height: 1.8;
        }

        .footer-contact-content a {
          color: #D8D6D0;
          text-decoration: none;
          position: relative;
          display: inline-block;
          transition: color 200ms ease-out;
        }

        .footer-contact-content a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background-color: #C9A050;
          transition: width 200ms ease-out;
        }

        .footer-contact-content a:hover {
          color: #C9A050;
        }

        .footer-contact-content a:hover::after {
          width: 100%;
        }

        .footer-pipe-sep {
          color: #8C857A;
          margin: 0 8px;
        }

        /* Map Graphic styling */
        .footer-map-container {
          width: 480px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .footer-map-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .footer-map-dots {
          fill: rgba(201, 160, 80, 0.25);
        }

        /* Pulsing Glow pins */
        .footer-map-pin {
          position: relative;
        }

        .footer-map-pin-core {
          fill: #C0392B;
        }

        .footer-map-pin-glow {
          fill: #C0392B;
          opacity: 0.35;
          transform-origin: center;
          animation: mapPinGlow 2s infinite ease-out;
        }

        @keyframes mapPinGlow {
          0% {
            transform: scale(0.9);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        /* Copyright Bar */
        .footer-copyright-bar {
          border-top: 1px solid rgba(201, 160, 80, 0.25);
          padding-top: 32px;
          padding-bottom: 32px;
          text-align: center;
        }

        .footer-copyright-text {
          font-size: 13px;
          font-weight: 400;
          color: #8C857A;
        }

        /* --- RESPONSIVE BREAKPOINTS --- */
        @media (max-width: 1279px) {
          /* Reflow columns to span multiple grid slots */
          .footer-top-grid {
            grid-template-columns: repeat(6, 1fr);
          }

          .footer-brand-col {
            grid-column: 1 / -1;
            margin-bottom: 24px;
          }

          .footer-link-col {
            grid-column: span 2; /* flows 3 columns per row */
          }

          .footer-contact-map-row {
            gap: 24px;
          }

          .footer-map-container {
            width: 380px;
          }
        }

        @media (max-width: 1023px) {
          .footer-inner-container {
            padding-left: 48px;
            padding-right: 48px;
          }

          .footer-top-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-brand-col {
            grid-column: 1 / -1;
          }

          .footer-link-col {
            grid-column: span 1; /* flows 2 columns per row */
          }

          .footer-contact-map-row {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }

          .footer-contact-blocks {
            width: 100%;
            flex-direction: column;
            gap: 24px;
          }

          .footer-contact-item {
            max-width: 100%;
          }

          .footer-contact-divider {
            height: 1px;
            width: 100%;
            display: none;
          }

          .footer-contact-item + .footer-contact-item {
            border-top: 1px solid rgba(201, 160, 80, 0.25);
            padding-top: 24px;
          }

          .footer-map-container {
            width: 70%;
            height: 200px;
          }
        }

        @media (max-width: 767px) {
          .footer-inner-container {
            padding-left: 24px;
            padding-right: 24px;
          }

          .footer-top-grid {
            grid-template-columns: 1fr;
          }

          .footer-brand-col,
          .footer-link-col {
            grid-column: span 1;
          }

          .footer-map-container {
            width: 90%;
            height: 180px;
          }

          .footer-social-row {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="rfp-footer-card">
        <div className="rfp-upper">
          <div className="rfp-left-panel">
            <div className="rfp-eyebrow">
              <span className="rfp-eyebrow-line" />
              <span>BEYOND SPACES. BEYOND ORDINARY.</span>
            </div>
            <span className="rfp-eyebrow-diamond" aria-hidden="true" />

            <h2 className="rfp-headline">
              <span className="rfp-headline-white">LET&apos;S BUILD</span>
              <span className="rfp-headline-red">EXPERIENCES</span>
              <span className="rfp-headline-white">THAT LAST.</span>
            </h2>

            <div className="rfp-left-rule" aria-hidden="true" />
            <p className="rfp-left-copy">
              Partner with India&apos;s most agile<br />
              institutional solutions provider.
            </p>
            <ParticleArt />
          </div>

          <div className="rfp-center-divider" aria-hidden="true">
            <span className="rfp-center-diamond" />
          </div>

          <div className="rfp-right-panel">
            <div className="rfp-form-title">RFP FORM</div>
            <div className="rfp-form-rule" aria-hidden="true" />

            <div className="rfp-field-grid" aria-label="RFP request fields">
              <TextField icon={UserIcon} placeholder="Full Name" />
              <TextField icon={MailIcon} placeholder="Email Address" />

              <div className="rfp-field-wide">
                <TextField icon={BuildingIcon} placeholder="Company / Organization" />
              </div>

              <SelectField icon={BriefcaseIcon} label="Project Type" options={["Residential", "Commercial", "Hospitality", "Institutional", "Retail"]} />
              <SelectField icon={RupeeIcon} label="Budget Range" options={["Under \u20B910L", "\u20B910L - \u20B950L", "\u20B950L - \u20B92Cr", "\u20B92Cr - \u20B910Cr", "Above \u20B910Cr"]} />

              <div className="rfp-field-wide">
                <SelectField icon={CalendarIcon} label="Timeline" options={["Under 1 Month", "1-3 Months", "3-6 Months", "6+ Months"]} />
              </div>

              <div className="rfp-textarea-field">
                <MessageIcon className="rfp-field-icon" />
                <textarea aria-label="Tell us about your project" placeholder="Tell us about your project" {...fieldEvents} />
              </div>

              <button
                className="rfp-submit"
                type="button"
                onClick={() => undefined}
              >
                SUBMIT RFP
                <span className="rfp-submit-arrow" aria-hidden="true">→</span>
              </button>

              <div className="rfp-response-note">
                <ClockIcon />
                <span>Get a response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Utility Footer */}
      <div className="footer-utility-section">
        <div className="footer-inner-container">
          {/* Top Row: Brand + Links as direct siblings for grid layout */}
          <div className="footer-top-grid">
            {/* Brand Col (Column 1) */}
            <div className="footer-brand-col">
              <div className="footer-logo-container" style={{ marginBottom: "16px" }}>
                <img 
                  src="https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781154909/iD_logo_RED-Photoroom_p59ja1.png" 
                  alt="iDECORWALA Logo" 
                  style={{ height: "64px", width: "auto", objectFit: "contain" }} 
                />
              </div>
              <div className="footer-tagline">DESIGN IT. BUILD IT. LIVING IT.</div>
              
              <SparkleDivider />

              <p className="footer-brand-desc">
                India&apos;s most agile institutional solutions provider for spaces that inspire, perform and deliver measurable impact.
              </p>

              <div className="footer-social-row">
                <a className="footer-social-btn" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page">
                  <LinkedinIcon aria-hidden="true" />
                </a>
                <a className="footer-social-btn" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">
                  <InstagramIcon aria-hidden="true" />
                </a>
                <a className="footer-social-btn" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube page">
                  <YoutubeIcon aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* SOLUTIONS (Column 2) */}
            <nav className="footer-link-col" aria-labelledby="footer-solutions-heading">
              <span className="footer-col-header" id="footer-solutions-heading">Solutions</span>
              <span className="footer-header-underline" />
              <ul className="footer-link-list">
                <li className="footer-link-item"><a href="/solutions/hospitality">Hospitality</a></li>
                <li className="footer-link-item"><a href="/solutions/healthcare">Healthcare</a></li>
                <li className="footer-link-item"><a href="/solutions/malls-multiplexes">Malls &amp; Multiplexes</a></li>
                <li className="footer-link-item"><a href="/solutions/it-park-campuses">ITPL / Tech Parks</a></li>
                <li className="footer-link-item"><a href="/solutions/manufacturing-infrastructure">Manufacturing &amp; Infrastructure</a></li>
              </ul>
            </nav>

            {/* SERVICES (Column 3) */}
            <nav className="footer-link-col" aria-labelledby="footer-services-heading">
              <span className="footer-col-header" id="footer-services-heading">Services</span>
              <span className="footer-header-underline" />
              <ul className="footer-link-list">
                <li className="footer-link-item"><a href="/services/design-architecture">Design &amp; Architecture</a></li>
                <li className="footer-link-item"><a href="/services/civil-structural-facade">Civil &amp; Structural &amp; Facade</a></li>
                <li className="footer-link-item"><a href="#">MEP / HVAC</a></li>
                <li className="footer-link-item"><a href="#">EPC</a></li>
                <li className="footer-link-item"><a href="/services/interiors-fitouts">Interiors &amp; Fitouts</a></li>
              </ul>
            </nav>

            {/* PRODUCTS (Column 4) */}
            <nav className="footer-link-col" aria-labelledby="footer-products-heading">
              <span className="footer-col-header" id="footer-products-heading">Products</span>
              <span className="footer-header-underline" />
              <ul className="footer-link-list">
                <li className="footer-link-item"><a href="/products/walls">Walls</a></li>
                <li className="footer-link-item"><a href="/products/floors">Floors</a></li>
                <li className="footer-link-item"><a href="/products/ceilings">Ceilings</a></li>
                <li className="footer-link-item"><a href="/products/spaces">Spaces</a></li>
              </ul>
            </nav>

            {/* TECHNOLOGY (Column 5) */}
            <nav className="footer-link-col" aria-labelledby="footer-technology-heading">
              <span className="footer-col-header" id="footer-technology-heading">Technology</span>
              <span className="footer-header-underline" />
              <ul className="footer-link-list">
                <li className="footer-link-item"><a href="/technology/spacefold">Spacefold AI</a></li>
                <li className="footer-link-item"><a href="/technology/idda-assistant">IDDA Assistant</a></li>
                <li className="footer-link-item"><a href="/technology/cad-cam">CAD to CAM Pipeline</a></li>
              </ul>
            </nav>

            {/* COMPANY (Column 6) */}
            <nav className="footer-link-col" aria-labelledby="footer-company-heading">
              <span className="footer-col-header" id="footer-company-heading">Company</span>
              <span className="footer-header-underline" />
              <ul className="footer-link-list">
                <li className="footer-link-item"><a href="/company/about">About Us</a></li>
                <li className="footer-link-item"><a href="/company/thought-leadership">Thought Leadership</a></li>
                <li className="footer-link-item"><a href="/company/partner-portal">Partner Portal</a></li>
                <li className="footer-link-item"><a href="/company/careers">Careers</a></li>
              </ul>
            </nav>
          </div>

          {/* Section Divider */}
          <SparkleDivider isFullWidth={true} />

          {/* Contact + Map Row */}
          <div className="footer-contact-map-row">
            {/* Contact Blocks */}
            <div className="footer-contact-blocks">
              {/* GET IN TOUCH */}
              <div className="footer-contact-item">
                <div className="footer-contact-icon-circle">
                  <PhoneIcon aria-hidden="true" />
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-header">Get In Touch</span>
                  <div className="footer-contact-content">
                    {contactItems.map((item, idx) => (
                      <div key={idx}>
                        <a 
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="footer-contact-divider" />

              {/* OFFICES */}
              <div className="footer-contact-item">
                <div className="footer-contact-icon-circle">
                  <MapPinIcon aria-hidden="true" />
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-header">Offices</span>
                  <div className="footer-contact-content">
                    <div>Chennai (HQ)<span className="footer-pipe-sep">|</span>Delhi NCR</div>
                    <div>Mumbai<span className="footer-pipe-sep">|</span>Bengaluru</div>
                    <div>Hyderabad<span className="footer-pipe-sep">|</span>Pune</div>
                    <div>Kolkata</div>
                  </div>
                </div>
              </div>

              <div className="footer-contact-divider" />

              {/* WE OPERATE */}
              <div className="footer-contact-item">
                <div className="footer-contact-icon-circle">
                  <GlobeIcon aria-hidden="true" />
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-header">We Operate</span>
                  <div className="footer-contact-content">
                    <div>Pan India &amp; Beyond</div>
                    <div>Global Project Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* World Map Graphic */}
            <div className="footer-map-container" aria-hidden="true">
              <img 
                src="/imgs/world-map.svg" 
                alt="World Map" 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Bottom Copyright Bar - Dynamic Year */}
          <div className="footer-copyright-bar">
            <span className="footer-copyright-text">© {new Date().getFullYear()} iDecorwala Interiors Pvt. Ltd. All rights reserved.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
