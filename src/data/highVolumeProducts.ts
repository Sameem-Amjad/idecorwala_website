import type { LucideIcon } from "lucide-react";
import {
  Building2,
  DoorOpen,
  DoorClosed,
  Factory,
  Layers3,
  PanelTop,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  UsersRound,
  Warehouse,
  Wrench,
} from "lucide-react";

export type ProductRange = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export const productRange: ProductRange[] = [
  { title: "Doors", description: "Durable, stylish and precision-manufactured doors for every need.", image: "/images/products/high-volume/doors.png", icon: DoorOpen },
  { title: "Door Frames", description: "Strong, reliable frames designed for easy installation and long life.", image: "/images/products/high-volume/door-frames.png", icon: DoorClosed },
  { title: "Partition Systems", description: "Modular partition solutions that deliver functionality and flexibility.", image: "/images/products/high-volume/partitions.png", icon: PanelTop },
  { title: "Ceiling Systems", description: "High-performance ceiling solutions for modern, efficient spaces.", image: "/images/products/high-volume/ceilings.png", icon: Layers3 },
  { title: "Panels & Boards", description: "Versatile panels and boards for walls, ceilings and furniture applications.", image: "/images/products/high-volume/panels.png", icon: SlidersHorizontal },
  { title: "Fittings & Accessories", description: "Precision fittings and accessories engineered for strength and reliability.", image: "/images/products/high-volume/fittings.png", icon: Wrench },
];

export const heroFeatures = [
  { label: "Scalable\nProduction", icon: Factory },
  { label: "Consistent\nQuality", icon: ShieldCheck },
  { label: "Faster\nTurnaround", icon: Truck },
  { label: "Cost\nEffective", icon: Building2 },
];

export const volumeStats = [
  { value: "1M+", label: "Products Manufactured Every Month", icon: Factory },
  { value: "250+", label: "Large Scale Projects Delivered", icon: Warehouse },
  { value: "50+", label: "Cities & Countries Where We Deliver", icon: Building2 },
  { value: "100%", label: "Quality Checked Before Dispatch", icon: ShieldCheck },
];

export const reasons = [
  { title: "Optimized for Large-Scale Projects", description: "Products designed to meet the demands of massive developments and tight schedules.", icon: Factory },
  { title: "Advanced Manufacturing", description: "State-of-the-art facilities ensuring accuracy, consistency and high output.", icon: SlidersHorizontal },
  { title: "Sustainable by Design", description: "Environment-friendly materials and responsible manufacturing for a better future.", icon: ShieldCheck },
  { title: "End-to-End Support", description: "From selection to delivery, we support you at every step.", icon: UsersRound },
];

export const idealFor = [
  { label: "Residential Communities", icon: Building2 },
  { label: "Commercial Complexes", icon: Building2 },
  { label: "Hospitality Projects", icon: UsersRound },
  { label: "Institutional Buildings", icon: Warehouse },
  { label: "Retail Spaces", icon: DoorOpen },
  { label: "Industrial Facilities", icon: Factory },
];
