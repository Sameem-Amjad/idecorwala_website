import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpaceFold AI | iDecorwala / Spacefold InteriorTech",
  description:
    "The world's first AI-powered spatial commerce platform that lets anyone design, visualize, optimize, manufacture and execute their dream home.",
  alternates: {
    canonical: "/technology/spacefold",
  },
};

export default function SpacefoldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
