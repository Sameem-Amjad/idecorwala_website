import {
  Construction,
  Building2,
  Settings2,
  Search,
  PenTool,
  BarChart,
  FileText,
  Hammer,
  CheckCircle,
  Network,
  ShieldCheck,
  Leaf,
  Settings,
  Users,
  Compass,
  Building,
  Home,
  Factory,
  GraduationCap,
  HeartPulse,
  Route,
  Store,
  Hotel,
  Award,
  MapPin,
  Star
} from "lucide-react";

export const civilSolutions = [
  {
    id: "civil",
    title: "Civil Engineering",
    icon: Construction,
    description: "Comprehensive civil engineering services that form the backbone of sustainable and resilient infrastructure.",
    bullets: ["Site Development", "Infrastructure Works", "Earthworks & Retaining Structures", "Utilities & Drainage"],
    image: "/images/services/civil/civil-construction.jpg",
  },
  {
    id: "structural",
    title: "Structural Engineering",
    icon: Building2,
    description: "Innovative structural designs that combine safety, efficiency and constructability.",
    bullets: ["Structural Analysis & Design", "Concrete Structures", "Steel Structures", "Seismic & Wind Analysis"],
    image: "/images/services/civil/structural-steel.jpg",
  },
  {
    id: "facade",
    title: "Facade Engineering",
    icon: Settings2,
    description: "High-performance facade solutions that elevate architecture while enhancing building performance.",
    bullets: ["Facade Design & Engineering", "Curtain Wall Systems", "Cladding & Finishes", "Performance Optimization"],
    image: "/images/services/civil/facade-glass.jpg",
  },
];

export const civilProcess = [
  { number: "01", title: "UNDERSTAND", description: "We study your vision, site conditions and project requirements.", icon: Search },
  { number: "02", title: "DESIGN", description: "Our engineers create smart, optimized and code-compliant designs.", icon: PenTool },
  { number: "03", title: "ANALYZE", description: "Advanced tools and simulations ensure safety, efficiency and constructability.", icon: BarChart },
  { number: "04", title: "PLAN", description: "Detailed drawings, BOQs and documentation for seamless execution.", icon: FileText },
  { number: "05", title: "EXECUTE", description: "On-site support and quality assurance through every stage of construction.", icon: Hammer },
  { number: "06", title: "DELIVER", description: "We deliver structures that stand strong and perform for decades.", icon: CheckCircle },
];

export const civilCapabilities = [
  { icon: Network, title: "Advanced Engineering", description: "Leveraging cutting-edge technology and software." },
  { icon: ShieldCheck, title: "Code Compliance", description: "Adhering to international standards and best practices." },
  { icon: Leaf, title: "Sustainable Approach", description: "Designing for efficiency, resilience and sustainability." },
  { icon: Settings, title: "Value Engineering", description: "Optimizing designs to maximize value and performance." },
  { icon: Users, title: "Expert Team", description: "Experienced engineers and technical specialists." },
  { icon: Compass, title: "End-to-End Support", description: "From concept to completion, we are with you all the way." },
];

export const civilProjectTypes = [
  { icon: Building, label: "Commercial\nBuildings" },
  { icon: Home, label: "Residential\nDevelopments" },
  { icon: Factory, label: "Industrial\nFacilities" },
  { icon: GraduationCap, label: "Institutional\nProjects" },
  { icon: HeartPulse, label: "Hospitals &\nHealthcare" },
  { icon: Route, label: "Infrastructure\nProjects" },
  { icon: Store, label: "Retail &\nMixed-Use" },
  { icon: Hotel, label: "Hospitality\nProjects" },
];

export const civilStats = [
  { value: "15+", label: "Years of\nExperience", icon: Building },
  { value: "500+", label: "Projects\nDelivered", icon: FileText },
  { value: "250+", label: "Expert\nEngineers", icon: Users },
  { value: "25+", label: "Cities\nServed", icon: MapPin },
  { value: "100%", label: "Commitment to\nQuality", icon: Star },
];
