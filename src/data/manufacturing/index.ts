import {
  Factory,
  ShieldCheck,
  Settings,
  Leaf,
  LineChart,
  Warehouse,
  Building2,
  Wrench,
  Search,
  PenTool,
  FileText,
  Hammer,
  CheckCircle2,
  Network
} from "lucide-react";

export const manufacturingPillars = [
  { icon: Factory, label: "Operationally\nEfficient" },
  { icon: ShieldCheck, label: "Safe, Compliant\n& Reliable" },
  { icon: Settings, label: "Scalable for\nthe Future" },
  { icon: Leaf, label: "Sustainable\nby Design" },
];

export const manufacturingStats = [
  { value: "30%+", label: "Increase in Productivity", desc: "Through efficient layouts and optimized workflows.", icon: LineChart },
  { value: "25%", label: "Reduction in Downtime", desc: "With smart planning and reliable infrastructure.", icon: Settings },
  { value: "20%", label: "Lower Energy Consumption", desc: "Sustainable design for a greener tomorrow.", icon: Leaf },
  { value: "100%", label: "Compliance Assured", desc: "Spaces built to meet the highest safety standards.", icon: ShieldCheck },
];

export const manufacturingServices = [
  { icon: Factory, title: "Factories & Plants", desc: "Efficient layouts that enhance production, safety and workflow." },
  { icon: Warehouse, title: "Warehouses & Logistics", desc: "Spacious, well-planned spaces for storage, movement and distribution." },
  { icon: Settings, title: "Production Facilities", desc: "Purpose-built environments that support precision and scale." },
  { icon: FileText, title: "Infrastructure Projects", desc: "Reliable spaces for critical infrastructure and utility operations." },
  { icon: Building2, title: "Industrial Admin Buildings", desc: "Functional, comfortable spaces for teams that keep industries running." },
  { icon: Wrench, title: "Maintenance & Utility Areas", desc: "Designed for efficiency, accessibility and safety." },
];

export const manufacturingProcess = [
  { num: "01", name: "Discover", desc: "Understanding your operations, challenges and future goals.", icon: Search },
  { num: "02", name: "Design", desc: "Creating efficient layouts that maximize productivity.", icon: PenTool },
  { num: "03", name: "Plan", desc: "Detailed planning with focus on safety, compliance and sustainability.", icon: FileText },
  { num: "04", name: "Build", desc: "Precision execution with quality, speed and transparency.", icon: Hammer },
  { num: "05", name: "Deliver", desc: "On-time handover and ongoing support for seamless operations.", icon: CheckCircle2 },
];

export const manufacturingFeatures = [
  { icon: Hammer, title: "Robust Construction", desc: "Built to last and perform" },
  { icon: Network, title: "Advanced Infrastructure", desc: "Future-ready and adaptable" },
  { icon: Settings, title: "Seamless Integration", desc: "Aligned with your operations" },
  { icon: Leaf, title: "Sustainable Practices", desc: "Responsibly designed" },
];
