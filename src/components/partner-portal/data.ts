import {
  Award,
  BadgeCheck,
  Box,
  Building2,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  Clock3,
  DraftingCompass,
  FileChartColumn,
  FileText,
  Handshake,
  HardHat,
  Headphones,
  Laptop,
  Mail,
  Phone,
  Presentation,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PartnerItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessItem extends PartnerItem {
  stepNumber: string;
}

export interface LinkedPartnerItem extends PartnerItem {
  href: string;
}

export interface ContactItem {
  icon: LucideIcon;
  title: string;
  value: string;
}

export const whyPartnerBenefits: PartnerItem[] = [
  { icon: Handshake, title: "Collaborate", description: "Work with a trusted brand with proven expertise and values." },
  { icon: ChartNoAxesCombined, title: "Grow Together", description: "Unlock new business opportunities and expand your reach." },
  { icon: Award, title: "Access Resources", description: "Get access to product information, technical support and marketing collaterals." },
  { icon: Presentation, title: "Training & Support", description: "Benefit from regular training, tools and dedicated partner support." },
  { icon: ClipboardCheck, title: "Be Part of Excellence", description: "Contribute to projects that create impact and set new benchmarks." },
  { icon: ShieldCheck, title: "Trusted & Transparent", description: "Enjoy fair practices, transparency and a long-term relationship." },
];

export const howItWorksSteps: ProcessItem[] = [
  { stepNumber: "01", icon: UserPlus, title: "Register", description: "Fill in your details and apply to become a partner." },
  { stepNumber: "02", icon: FileText, title: "Evaluation", description: "Our team will review your application." },
  { stepNumber: "03", icon: Check, title: "Onboarding", description: "Complete onboarding and get access to partner benefits." },
  { stepNumber: "04", icon: Handshake, title: "Collaborate & Grow", description: "Start collaborating on projects and grow together." },
];

export const partnerNetworkTypes: LinkedPartnerItem[] = [
  { icon: DraftingCompass, title: "Architects & Designers", description: "Collaborate on innovative design solutions and bring visionary ideas to life.", href: "/contact" },
  { icon: HardHat, title: "Contractors", description: "Work with us to deliver high-quality projects with efficiency and excellence.", href: "/contact" },
  { icon: Box, title: "Suppliers & Vendors", description: "Partner with us to supply trusted, quality materials and products.", href: "/contact" },
  { icon: Users, title: "Consultants", description: "Join hands to bring expertise, insights and value to every project.", href: "/contact" },
  { icon: Building2, title: "Real Estate Developers", description: "Create spaces that enhance value and deliver lasting impact.", href: "/contact" },
];

export const partnerResources: LinkedPartnerItem[] = [
  { icon: FileText, title: "Product Catalogue", description: "Download resources and technical details.", href: "/products" },
  { icon: BadgeCheck, title: "Brand Guidelines", description: "Access logos, guidelines and brand assets.", href: "/contact" },
  { icon: FileChartColumn, title: "Marketing Materials", description: "Use brochures, presentations and case studies.", href: "/contact" },
  { icon: Laptop, title: "Training Portal", description: "Enhance your skills with our training modules.", href: "/partner-portal" },
  { icon: Headphones, title: "Partner Support", description: "Get help from our dedicated partner support team.", href: "/contact" },
];

export const contactInfoItems: ContactItem[] = [
  { icon: Headphones, title: "Partner Support", value: "We're here to help you at every step." },
  { icon: Mail, title: "Email Us", value: "partner@idecorwala.com" },
  { icon: Phone, title: "Call Us", value: "+91 124 456 6000" },
  { icon: Clock3, title: "Working Hours", value: "Mon - Sat | 9:00 AM - 6:00 PM" },
];

