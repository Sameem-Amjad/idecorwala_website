import type { LucideIcon } from "lucide-react";
import { Armchair, Building2, FileCheck2, Grid2X2, Ruler, SwatchBook } from "lucide-react";

export interface OfferCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const offerCards: OfferCard[] = [
  { id: "architectural", icon: Building2, title: "Architectural Design", description: "Concept to detailed design solutions that blend aesthetics, functionality and regulatory compliance." },
  { id: "interior", icon: Armchair, title: "Interior Architecture", description: "People-centric interiors that elevate experience and maximize spatial performance." },
  { id: "planning", icon: Grid2X2, title: "Space Planning & Strategy", description: "Efficient layouts and space strategies that enhance flow, utilization and productivity." },
  { id: "materials", icon: SwatchBook, title: "Material & Finish Consultation", description: "Curated materials and finishes aligned with design intent, durability and sustainability." },
  { id: "documentation", icon: Ruler, title: "Technical Documentation", description: "Accurate drawings, specifications and BOQs for smooth approvals and execution." },
  { id: "support", icon: FileCheck2, title: "Design Support & Supervision", description: "On-site coordination and design supervision to ensure design integrity and quality outcomes." },
];
