import type { LucideIcon } from "lucide-react";
import { Box, Building2, FileText, HardHat, PenLine, Search } from "lucide-react";

export interface JourneyStep {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const journeySteps: JourneyStep[] = [
  { id: "discover", number: "01", icon: Search, title: "Discover", description: "Understanding your goals, context, users and functional requirements." },
  { id: "conceptualise", number: "02", icon: PenLine, title: "Conceptualize", description: "Ideation, space strategy and concept development that reflects your vision." },
  { id: "design", number: "03", icon: Box, title: "Design", description: "Detailed architectural design, planning and material exploration." },
  { id: "document", number: "04", icon: FileText, title: "Document", description: "Technical drawings, BOQs and specifications ready for execution." },
  { id: "coordinate", number: "05", icon: HardHat, title: "Coordinate", description: "Collaboration with consultants and stakeholders for seamless project alignment." },
  { id: "deliver", number: "06", icon: Building2, title: "Deliver", description: "Execution support and on-site guidance till project completion." },
];
