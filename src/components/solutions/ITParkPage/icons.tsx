"use client";

import {
  Armchair,
  BarChart3,
  Building2,
  Check,
  DraftingCompass,
  Expand,
  HardHat,
  Leaf,
  LockKeyhole,
  Network,
  ParkingCircle,
  PencilRuler,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trees,
  UsersRound,
} from "lucide-react";
import type { IconName } from "@/data/itParksData";

export const iconMap = {
  chart: BarChart3,
  leaf: Leaf,
  expand: Expand,
  shield: ShieldCheck,
  network: Network,
  users: UsersRound,
  building: Building2,
  chair: Armchair,
  tree: Trees,
  parking: ParkingCircle,
  lock: LockKeyhole,
  search: Search,
  pencil: PencilRuler,
  gear: Settings,
  hardhat: HardHat,
  star: Star,
} satisfies Record<IconName, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>>;

export { Check, DraftingCompass };
