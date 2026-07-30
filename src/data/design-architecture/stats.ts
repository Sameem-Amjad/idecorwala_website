import type { LucideIcon } from "lucide-react";
import { Award, Building2, ClipboardCheck, MapPin, Users } from "lucide-react";

export interface DesignStat {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
}

export const designStats: DesignStat[] = [
  { id: "experience", icon: Building2, value: "15+", label: "Years of Experience" },
  { id: "projects", icon: ClipboardCheck, value: "500+", label: "Projects Delivered" },
  { id: "clients", icon: Users, value: "250+", label: "Happy Clients" },
  { id: "cities", icon: MapPin, value: "25+", label: "Cities Served" },
  { id: "quality", icon: Award, value: "100%", label: "Commitment to Quality" },
];
