export type IconName =
  | "chart"
  | "leaf"
  | "expand"
  | "shield"
  | "network"
  | "users"
  | "building"
  | "chair"
  | "tree"
  | "parking"
  | "lock"
  | "search"
  | "pencil"
  | "gear"
  | "hardhat"
  | "star";

export const heroFeatures = [
  {
    icon: "network",
    label: "Future-Ready\nInfrastructure",
  },
  {
    icon: "leaf",
    label: "Sustainable &\nGreen Design",
  },
  {
    icon: "users",
    label: "Collaborative\nWorkspaces",
  },
  {
    icon: "shield",
    label: "Secure, Smart &\nResilient",
  },
] satisfies Array<{ icon: IconName; label: string }>;

export const stats = [
  {
    icon: "chart",
    value: "30%+",
    label: "Increase in Productivity",
    desc: "Through efficient, human-centric designs",
  },
  {
    icon: "leaf",
    value: "25%",
    label: "Lower Operational Costs",
    desc: "With sustainable & energy-efficient solutions",
  },
  {
    icon: "expand",
    value: "100%",
    label: "Scalable & Flexible",
    desc: "Spaces that grow with your business",
  },
  {
    icon: "shield",
    value: "100%",
    label: "Safety & Compliance",
    desc: "Built to global standards and future regulations",
  },
] satisfies Array<{ icon: IconName; value: string; label: string; desc: string }>;

export const services = [
  {
    icon: "building",
    title: "Office Buildings",
    desc: "Efficient, modern workspaces designed for productivity and performance.",
  },
  {
    icon: "users",
    title: "Collaborative Spaces",
    desc: "Dynamic spaces that encourage teamwork, creativity and knowledge sharing.",
  },
  {
    icon: "chair",
    title: "Amenities & Services",
    desc: "Premium amenities that enhance employee well-being and convenience.",
  },
  {
    icon: "tree",
    title: "Landscape & Open Spaces",
    desc: "Green, rejuvenating outdoor areas that promote wellness and sustainability.",
  },
  {
    icon: "parking",
    title: "Parking & Mobility",
    desc: "Smart parking and seamless mobility solutions for a hassle-free experience.",
  },
  {
    icon: "lock",
    title: "Security & Technology",
    desc: "Advanced security systems and smart technologies for a safe connected campus.",
  },
] satisfies Array<{ icon: IconName; title: string; desc: string }>;

export const techChecklist = [
  "AI-Driven Space Planning",
  "Smart Building Solutions",
  "Energy Management Systems",
  "Scalable Infrastructure",
  "Future-Ready Technology Integration",
];

export const processSteps = [
  {
    icon: "search",
    step: "01",
    title: "Discover",
    desc: "Understanding your vision, needs and business objectives.",
  },
  {
    icon: "pencil",
    step: "02",
    title: "Design",
    desc: "Crafting smart, efficient layouts that inspire performance.",
  },
  {
    icon: "gear",
    step: "03",
    title: "Plan",
    desc: "Detailed planning with focus on sustainability, safety and scalability.",
  },
  {
    icon: "hardhat",
    step: "04",
    title: "Build",
    desc: "Precision execution with quality, speed and transparency.",
  },
  {
    icon: "star",
    step: "05",
    title: "Deliver",
    desc: "On-time handover and ongoing support for seamless operations.",
  },
] satisfies Array<{ icon: IconName; step: string; title: string; desc: string }>;
