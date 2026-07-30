import type { LucideIcon } from "lucide-react";
import { Handshake, Leaf, Lightbulb, MapPin, TrendingUp, Users } from "lucide-react";

export interface ApproachItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const approachItems: ApproachItem[] = [
  { id: "people", icon: Users, title: "User-Centric", description: "Designing around people, their needs and behaviors." },
  { id: "context", icon: MapPin, title: "Contextual", description: "Spaces that respond to site, culture and climate." },
  { id: "sustainable", icon: Leaf, title: "Sustainable", description: "Responsible design for a better tomorrow." },
  { id: "innovative", icon: Lightbulb, title: "Innovative", description: "Creative ideas powered by research and technology." },
  { id: "collaborative", icon: Handshake, title: "Collaborative", description: "Transparent collaboration at every stage." },
  { id: "measurable", icon: TrendingUp, title: "Measurable", description: "Designs that drive performance and long-term value." },
];
