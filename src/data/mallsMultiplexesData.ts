import type { LucideIcon } from "lucide-react";
import { BadgeCheck, BarChart3, Building2, CarFront, Gamepad2, Gem, HardHat, IndianRupee, ParkingSquare, PenLine, Popcorn, Search, Settings2, ShieldCheck, ShoppingBag, Star, Users, UtensilsCrossed } from "lucide-react";

export interface MallItem { id: string; icon: LucideIcon; title: string; body: string; }
export interface MallStat { id: string; icon: LucideIcon; value: string; label: string; sub: string; }
export interface MallStep extends MallItem { number: string; }

export const heroFeatures: MallItem[] = [
  { id: "people", icon: Users, title: "People-Centric Design", body: "" },
  { id: "footfall", icon: BarChart3, title: "Higher Footfall & Engagement", body: "" },
  { id: "operations", icon: Settings2, title: "Optimised Operations", body: "" },
  { id: "future", icon: ShieldCheck, title: "Safe, Durable & Future-Ready", body: "" },
];

export const mallFeatures: MallItem[] = [
  { id: "retail", icon: ShoppingBag, title: "Retail Spaces", body: "High-street to anchor stores designed to attract shoppers and boost sales." },
  { id: "multiplex", icon: Popcorn, title: "Multiplexes", body: "Immersive cinematic experiences with acoustics, comfort and seamless flow." },
  { id: "food", icon: UtensilsCrossed, title: "Food Courts", body: "Vibrant, well-planned food courts that enhance dwell time and footfall." },
  { id: "entertainment", icon: Gamepad2, title: "Entertainment Zones", body: "Engaging zones for games, family fun and events that keep visitors coming back." },
  { id: "parking", icon: ParkingSquare, title: "Parking & Circulation", body: "Smart circulation and parking solutions for effortless movement and convenience." },
  { id: "amenities", icon: Gem, title: "Amenities & Lounges", body: "Comfortable lounges, prayer rooms, kids areas and premium amenities for all." },
];

export const partnerStats: MallStat[] = [
  { id: "footfall", icon: Users, value: "30%+", label: "Higher Footfall", sub: "Through experience-led design" },
  { id: "dwell", icon: BarChart3, value: "25%", label: "Increase in Dwell Time", sub: "Smart layouts & engaging experiences" },
  { id: "roi", icon: IndianRupee, value: "100%", label: "ROI Focused", sub: "Spaces designed to deliver measurable value" },
  { id: "delivery", icon: BadgeCheck, value: "End-to-End", label: "Delivery", sub: "Concept to completion with precision" },
];

export const processSteps: MallStep[] = [
  { id: "discover", number: "01", icon: Search, title: "Discover", body: "Understanding your brand, audience, goals and site potential." },
  { id: "design", number: "02", icon: PenLine, title: "Design", body: "Conceptualising captivating spaces that enhance experience and performance." },
  { id: "plan", number: "03", icon: Settings2, title: "Plan", body: "Detailing every aspect for smooth execution, safety and efficiency." },
  { id: "build", number: "04", icon: HardHat, title: "Build", body: "Precision execution with quality, speed and accountability." },
  { id: "deliver", number: "05", icon: Star, title: "Deliver", body: "Handing over future-ready spaces that exceed expectations." },
];

export const ctaIcon = Building2;
