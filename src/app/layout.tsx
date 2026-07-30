import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SmoothScrolling } from "@/components/layout/SmoothScrolling";
import PWARegister from "@/components/PWARegister";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://idecorwala.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "iDecorwala | Tech-First Institutional, Interiors, EPC, PMC & Design.",
  description:
    "India's most agile institutional solution provider. Design, Engineering, Manufacturing, and Technology — unified under one execution engine.",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "iDecorwala | Tech-First Institutional, Interiors, EPC, PMC & Design.",
    description:
      "India's most agile institutional solution provider. Design, Engineering, Manufacturing, and Technology — unified under one execution engine.",
    url: BASE_URL,
    siteName: "iDecorwala",
    locale: "en_IN",
    type: "website",
    images: [
      {
        // TODO: Replace this placeholder image URL with your actual production Open Graph image URL.
        url: `${BASE_URL}/og-image-placeholder.png`,
        width: 1200,
        height: 630,
        alt: "iDecorwala - Tech-First Institutional, Interiors, EPC, PMC & Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iDecorwala | Tech-First Institutional, Interiors, EPC, PMC & Design.",
    description:
      "India's most agile institutional solution provider. Design, Engineering, Manufacturing, and Technology — unified under one execution engine.",
    images: [`${BASE_URL}/og-image-placeholder.png`], // TODO: Replace this placeholder
  },
  other: {
    "theme-color": "#000000",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "iDecorwala",
    "url": BASE_URL,
    "logo": `${BASE_URL}/id-logo-red.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressCountry": "India",
    },
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <PWARegister />
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
