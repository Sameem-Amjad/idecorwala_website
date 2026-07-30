// src/data/interiorsFitouts.ts
import { ReactNode } from 'react';

export interface DeliverItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to load the correct Lucide icon in the component
}

export const deliverItems: DeliverItem[] = [
  {
    id: "residential",
    title: "Residential Interiors",
    description: "Curated, deeply personal living spaces that balance luxury with daily comfort.",
    iconName: "Home"
  },
  {
    id: "commercial",
    title: "Commercial Workspaces",
    description: "High-performance offices designed to enhance productivity and reflect corporate identity.",
    iconName: "Briefcase"
  },
  {
    id: "retail",
    title: "Retail Environments",
    description: "Immersive retail spaces optimized for customer experience and brand engagement.",
    iconName: "ShoppingBag"
  },
  {
    id: "hospitality",
    title: "Hospitality Venues",
    description: "Atmospheric, memorable settings for hotels, restaurants, and luxury lounges.",
    iconName: "Coffee"
  },
  {
    id: "institutional",
    title: "Institutional Spaces",
    description: "Functional, durable, and inspiring interiors for educational and civic facilities.",
    iconName: "Building"
  },
  {
    id: "fitouts",
    title: "Bespoke Fitouts",
    description: "Precision-engineered custom installations and millwork for any scale of project.",
    iconName: "Hammer"
  }
];

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    stepNumber: "01",
    title: "Discover & Define",
    description: "We begin by understanding your vision, functional needs, and brand identity to establish a clear project brief."
  },
  {
    id: "conceptualize",
    stepNumber: "02",
    title: "Conceptual Design",
    description: "Our design team develops mood boards, initial sketches, and spatial layouts to translate the brief into a visual narrative."
  },
  {
    id: "design",
    stepNumber: "03",
    title: "Detailed Design",
    description: "We refine the concept with 3D renderings, material selection, and precise interior detailing for comprehensive visualization."
  },
  {
    id: "plan",
    stepNumber: "04",
    title: "Plan & Specify",
    description: "Rigorous technical planning, engineering coordination, and procurement scheduling ensure seamless execution."
  },
  {
    id: "execute",
    stepNumber: "05",
    title: "Execute & Deliver",
    description: "Our project managers oversee construction and installation, delivering the finished space to our exacting standards."
  }
];

export interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const differentiators: DifferentiatorItem[] = [
  {
    id: "bespoke",
    title: "Bespoke Design",
    description: "Every element is custom-tailored to your unique requirements and aesthetic preferences.",
    iconName: "PenTool"
  },
  {
    id: "materials",
    title: "Premium Materials",
    description: "We source only the finest finishes and materials globally to ensure enduring luxury.",
    iconName: "Layers"
  },
  {
    id: "smart",
    title: "Smart Planning",
    description: "Intelligent spatial layouts that maximize functionality, flow, and natural light.",
    iconName: "Maximize"
  },
  {
    id: "quality",
    title: "Quality Execution",
    description: "Flawless craftsmanship delivered by our network of master artisans and contractors.",
    iconName: "Award"
  },
  {
    id: "ontime",
    title: "On-Time Delivery",
    description: "Rigorous project management guarantees your space is ready exactly when promised.",
    iconName: "Clock"
  },
  {
    id: "support",
    title: "End-to-End Support",
    description: "A single point of contact from initial concept through to post-occupancy care.",
    iconName: "LifeBuoy"
  }
];

export interface StatItem {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export const stats: StatItem[] = [
  {
    id: "experience",
    value: "20+",
    label: "Years of Excellence",
    iconName: "Calendar"
  },
  {
    id: "projects",
    value: "500+",
    label: "Completed Projects",
    iconName: "CheckCircle"
  },
  {
    id: "clients",
    value: "100+",
    label: "Global Clients",
    iconName: "Users"
  },
  {
    id: "area",
    value: "2M+",
    label: "Sq. Ft. Transformed",
    iconName: "Box"
  },
  {
    id: "quality",
    value: "100%",
    label: "Quality Commitment",
    iconName: "Shield"
  }
];
