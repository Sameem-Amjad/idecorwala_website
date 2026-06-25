import { Building, Utensils, Home, PartyPopper, Search, Pencil, Settings, Star } from "lucide-react";

export const hospitalityServices = [
  {
    icon: Building,
    title: "Hotels & Resorts",
    body: "Create memorable stays with elegant interiors that reflect your brand and enhance guest comfort.",
    href: "/solutions/hospitality/hotels",
  },
  {
    icon: Utensils,
    title: "Restaurants & Cafés",
    body: "Design inviting, high-performance spaces that elevate dining experiences and drive repeat visits.",
    href: "/solutions/hospitality/restaurants",
  },
  {
    icon: Home,
    title: "Serviced Apartments",
    body: "Maximise space, comfort, and functionality for extended stays and modern traveller expectations.",
    href: "/solutions/hospitality/apartments",
  },
  {
    icon: PartyPopper,
    title: "Banquet & Event Spaces",
    body: "Flexible, stunning interiors that adapt to every occasion and leave a lasting impression.",
    href: "/solutions/hospitality/events",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    icon: Search,
    body: "Understanding your brand, goals, and guest expectations to define the right direction.",
  },
  {
    number: "02",
    title: "Design",
    icon: Pencil,
    body: "Conceptualising spaces that balance aesthetics, functionality, and brand identity.",
  },
  {
    number: "03",
    title: "Deliver",
    icon: Settings,
    body: "Executing with precision through our integrated manufacturing and assembly.",
  },
  {
    number: "04",
    title: "Delight",
    icon: Star,
    body: "Handing over spaces that perform beautifully and create lasting impressions.",
  },
];

export const aiStats = [
  { value: "30%", label: "Faster Project Turnaround" },
  { value: "25%", label: "Reduced On-Site Rework" },
  { value: "100%", label: "Design-to-Delivery Transparency" },
];

export const aiFeatures = [
  "AI-Driven Space Planning",
  "Real-Time 3D Visualization",
  "Accurate BOQ & Costing",
  "Seamless Production Integration",
  "Faster Delivery, Greater Accuracy",
];
