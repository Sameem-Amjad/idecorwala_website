import type { LucideIcon } from "lucide-react";
import { BedDouble, Building2, ChartNoAxesCombined, ConciergeBell, PencilRuler, Search, Settings, ShieldCheck, Sparkles, Star, Users } from "lucide-react";

export interface HospitalityFeature { icon: LucideIcon; label: string; }
export interface HospitalityNeed { icon: LucideIcon; title: string; description: string; }
export interface ApproachStep extends HospitalityNeed { number: string; }
export interface SpacefoldStat { value: string; label: string; }

export const heroFeatures: HospitalityFeature[] = [
  { icon: Star, label: "Guest-Centric Design" },
  { icon: Settings, label: "End-to-End Execution" },
  { icon: ShieldCheck, label: "Durable & Sustainable" },
  { icon: ChartNoAxesCombined, label: "Return on Experience" },
];

export const hospitalityNeeds: HospitalityNeed[] = [
  { icon: Building2, title: "Hotels & Resorts", description: "Create memorable stays with elegant interiors that reflect your brand and enhance guest comfort." },
  { icon: ConciergeBell, title: "Restaurants & Cafés", description: "Design inviting, high-performance spaces that elevate dining experiences and drive repeat visits." },
  { icon: BedDouble, title: "Serviced Apartments", description: "Maximise space, comfort, and functionality for extended stays and modern traveller expectations." },
  { icon: Users, title: "Banquet & Event Spaces", description: "Flexible, stunning interiors that adapt to every occasion and leave a lasting impression." },
];

export const approachSteps: ApproachStep[] = [
  { number: "01", icon: Search, title: "Discover", description: "Understanding your brand, goals, and guest expectations to define the right direction." },
  { number: "02", icon: PencilRuler, title: "Design", description: "Conceptualising spaces that balance aesthetics, functionality, and brand identity." },
  { number: "03", icon: Settings, title: "Deliver", description: "Executing with precision through our integrated manufacturing and assembly." },
  { number: "04", icon: Sparkles, title: "Delight", description: "Handing over spaces that perform beautifully and create lasting impressions." },
];

export const spacefoldChecklist = ["AI-Driven Space Planning", "Real-Time 3D Visualization", "Accurate BOQ & Costing", "Seamless Production Integration", "Faster Delivery, Greater Accuracy"];
export const spacefoldStats: SpacefoldStat[] = [
  { value: "30%", label: "Faster Project Turnaround" },
  { value: "25%", label: "Reduced On-Site Rework" },
  { value: "100%", label: "Design-to-Delivery Transparency" },
];