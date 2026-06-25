import type { LucideIcon } from "lucide-react";
import { Award, Building2, Cog, DraftingCompass, Leaf, Lightbulb, PencilRuler, Shield, ShieldCheck, Target, Trophy, UserCheck, Users } from "lucide-react";

export interface AboutItem { id: string; icon: LucideIcon; title: string; caption: string; }
export interface AboutStat { id: string; icon: LucideIcon; value: string; label: string; }
export interface TeamRole { id: string; icon: LucideIcon; label: string; }

export const storyTimeline: AboutItem[] = [
  { id: "beginning", icon: Lightbulb, title: "The Beginning", caption: "A small team with big ideas and a shared passion for design." },
  { id: "growth", icon: Cog, title: "The Growth", caption: "Expanding our expertise, embracing innovation, and earning trust." },
  { id: "purpose", icon: Target, title: "The Purpose", caption: "Delivering spaces that create value for people and businesses." },
  { id: "future", icon: Trophy, title: "The Future", caption: "Continuing to innovate, evolve, and set new benchmarks." },
];

export const coreValues: AboutItem[] = [
  { id: "precision", icon: Target, title: "Precision", caption: "We focus on the details that make a difference." },
  { id: "integrity", icon: ShieldCheck, title: "Integrity", caption: "We do what's right, always, for our clients and partners." },
  { id: "collaboration", icon: Users, title: "Collaboration", caption: "We work together to build stronger ideas and solutions." },
  { id: "innovation", icon: Lightbulb, title: "Innovation", caption: "We embrace new technologies and better ways." },
  { id: "sustainability", icon: Leaf, title: "Sustainability", caption: "We design and build responsibly for a better tomorrow." },
];

export const aboutStats: AboutStat[] = [
  { id: "experience", icon: Lightbulb, value: "10+", label: "Years of Experience" },
  { id: "projects", icon: Users, value: "250+", label: "Projects Delivered" },
  { id: "verticals", icon: Shield, value: "25+", label: "Industry Verticals" },
  { id: "area", icon: Building2, value: "1M+", label: "Sq. Ft. Designed & Built" },
  { id: "quality", icon: Award, value: "100%", label: "Commitment to Quality" },
];

export const teamRoles: TeamRole[] = [
  { id: "architects", icon: DraftingCompass, label: "Architects" },
  { id: "designers", icon: PencilRuler, label: "Designers" },
  { id: "engineers", icon: Users, label: "Engineers" },
  { id: "experts", icon: UserCheck, label: "Project Experts" },
];
