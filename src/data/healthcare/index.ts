import {
  ShieldPlus,
  Settings,
  ClipboardCheck,
  Leaf,
  Building2,
  Bed,
  TestTube,
  Stethoscope,
  Activity,
  Accessibility,
  Search,
  PenTool,
  Settings2,
  ShieldCheck,
  Star,
  CheckCircle2,
  PlusCircle,
  Building
} from "lucide-react";

export const healthcareHeroChips = [
  { icon: ShieldPlus, label: "Patient-Centric\nDesign" },
  { icon: Settings, label: "Infection-Safe\nEnvironments" },
  { icon: ClipboardCheck, label: "Operational\nEfficiency" },
  { icon: Leaf, label: "Sustainable &\nFuture-Ready" }
];

export const healthcareServices = [
  {
    icon: Building2,
    title: "Hospitals",
    body: "Designing complex hospital interiors that streamline patient flow, enhance clinical efficiency, and ensure a healing experience.",
  },
  {
    icon: Bed,
    title: "Clinics &\nOutpatient Centers",
    body: "Efficient, welcoming spaces that optimize consultation experiences and operational workflows.",
  },
  {
    icon: TestTube,
    title: "Diagnostic\nCenters",
    body: "Precision-driven layouts for labs and imaging centers with a focus on safety, accuracy, and seamless processes.",
  },
  {
    icon: Stethoscope,
    title: "Surgical &\nProcedure Units",
    body: "High-performance environments built to support critical care, safety protocols, and sterilization.",
  },
  {
    icon: Activity, // Used as alternative to tooth glyph
    title: "Dental\nClinics",
    body: "Ergonomic, calming interiors that ensure comfort for patients and efficiency for dental professionals.",
  },
  {
    icon: Accessibility,
    title: "Rehabilitation\nCenters",
    body: "Spaces that encourage recovery and well-being through thoughtful design and comfortable environments.",
  }
];

export const healthcareProcess = [
  { number: "01", icon: Search, title: "Discover", body: "Understanding your vision, clinical workflows, and regulatory requirements to set the right direction." },
  { number: "02", icon: PenTool, title: "Design", body: "Creating intelligent spaces that align with healthcare standards, brand identity, and patient needs." },
  { number: "03", icon: Settings2, title: "Build", body: "Executing with precision and quality to ensure minimal disruption and maximum reliability." },
  { number: "04", icon: ShieldCheck, title: "Deliver", body: "Handover with complete documentation, training, and post-completion support." },
  { number: "05", icon: Star, title: "Support", body: "Ongoing maintenance and support to keep your spaces performing at their best." }
];

export const healthcareChecklist = [
  "AI-Driven Space Planning",
  "Real-Time 3D Visualization",
  "Accurate BOQ & Costing",
  "Seamless Production Integration",
  "Faster Delivery, Greater Accuracy"
];

export const healthcareStats = [
  { number: "30%", body: "Faster Project\nTurnaround" },
  { number: "25%", body: "Reduced\nOn-Site Rework" },
  { number: "100%", body: "Design-to-Delivery\nTransparency" },
  { number: "100%", body: "Compliance\n& Safety Focus" }
];

export const healthcareTrust = [
  { icon: ShieldPlus, label: "COMPLIANT BY DESIGN", body: "Adhering to global healthcare\nstandards and regulations." },
  { icon: PlusCircle, label: "SAFETY FIRST", body: "Spaces that prioritize patient\nsafety and infection control." },
  { icon: Building, label: "BUILT TO LAST", body: "Durable, sustainable, and future-\nready healthcare environments." }
];
