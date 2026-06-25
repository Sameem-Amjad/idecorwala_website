export interface VisualNarrativeItem {
  label: string;
  image: string;
  caption?: string;
}

export interface RelatedProject {
  title: string;
  category: string;
  image: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  titleMain: string;
  titleAccent: string;
  category: string;
  location: string;
  year: string;
  area: string;
  typology: string;
  tagline?: string;
  description: string;
  scope: string[];
  heroImage: string;
  quoteImage: string;
  visualNarrative: VisualNarrativeItem[];
  selectedImages: string[];
  relatedProjects: RelatedProject[];
  narrativeHeading: string;
  quote: string;
}

const cloudinary = {
  iconiqa: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952291/ICONICA_jxqxtw.png",
  sterling: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952301/STERLING_scuj3w.png",
  synergy: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952302/SYNERGY_hmduu3.png",
  infocity: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952303/SP_INFOCITY_wsjjrf.png",
  taj: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952302/TAJ_s0seqs.png",
  apl: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952291/APL_q8gn5q.png",
};

const generated = "/projects/royal-orchid-iconiqa";
const selectedWork: Array<RelatedProject & { slug: string }> = [
  { slug: "sterling-lonavala", title: "Sterling Lonavala", category: "Hospitality", image: `${generated}/selected-sterling-lonavala.png`, href: "/projects/sterling-lonavala" },
  { slug: "taj-ganges-varanasi", title: "Taj Ganges Varanasi", category: "Hospitality", image: `${generated}/selected-taj-ganges.png`, href: "/projects/taj-ganges-varanasi" },
  { slug: "synergy-consulting", title: "Synergy Consulting", category: "Corporate", image: `${generated}/selected-synergy-consulting.png`, href: "/projects/synergy-consulting" },
  { slug: "sp-infocity-mohali", title: "SP Infocity Mohali", category: "Commercial", image: cloudinary.infocity, href: "/projects/sp-infocity-mohali" },
  { slug: "apl-logistics", title: "APL Logistics", category: "Corporate", image: cloudinary.apl, href: "/projects/apl-logistics" },
  { slug: "royal-orchid-iconiqa", title: "Royal Orchid Iconiqa", category: "Hospitality", image: `${generated}/hero-hotel-night.png`, href: "/projects/royal-orchid-iconiqa" },
];

const relatedFor = (slug: string): RelatedProject[] => selectedWork.filter((item) => item.slug !== slug).slice(0, 3).map(({ slug: _slug, ...item }) => item);
const media = (primary: string, fallbacks: [string, string, string, string]) => ({
  heroImage: primary,
  quoteImage: primary,
  visualNarrative: [
    { label: "Featured View", image: primary, caption: "Featured project view" },
    { label: "Detail Study", image: fallbacks[0], caption: "Detail study" },
    { label: "Material Detail", image: fallbacks[1], caption: "Material detail" },
    { label: "Architectural Context", image: fallbacks[2], caption: "Architectural context" },
    { label: "Interior Sequence", image: fallbacks[3], caption: "Interior sequence" },
  ],
  selectedImages: fallbacks.slice(0, 3),
});

const royalMedia = {
  heroImage: `${generated}/hero-hotel-night.png`,
  quoteImage: `${generated}/atmosphere-quote.png`,
  visualNarrative: [
    { label: "Featured View", image: `${generated}/hero-hotel-night.png`, caption: "Featured project view" },
    { label: "Detail Study", image: `${generated}/detail-study.png`, caption: "Detail study" },
    { label: "Material Detail", image: `${generated}/material-detail.png`, caption: "Material palette" },
    { label: "Architectural Context", image: `${generated}/architectural-context.png`, caption: "Architectural context" },
    { label: "Interior Sequence", image: `${generated}/interior-sequence.png`, caption: "Interior sequence" },
  ],
  selectedImages: [`${generated}/selected-sterling-lonavala.png`, `${generated}/selected-taj-ganges.png`, `${generated}/selected-synergy-consulting.png`],
};

const tagline = "Precision. Performance. Profitability Delivered.";

export const projects: Project[] = [
  {
    slug: "royal-orchid-iconiqa", titleMain: "Royal Orchid", titleAccent: "Iconiqa", title: "Royal Orchid Iconiqa",
    location: "Mumbai International Airport", category: "Hospitality", typology: "Luxury Hotel", year: "2025", area: "Rooms & Banquet Hall", tagline,
    description: "Royal Orchid Iconiqa is a new luxury hotel brand launched by Royal Orchid Hotels. It is part of Royal Orchid Hotels’ expansion plan to grow its portfolio to over 300 hotels and 20,000 rooms in the next five years. The first Iconiqa hotel is located at Mumbai International Airport.",
    scope: ["Rooms", "Banquet Hall"], ...royalMedia, relatedProjects: relatedFor("royal-orchid-iconiqa"),
    narrativeHeading: "Contemporary hospitality, warmly expressed.", quote: "Hospitality begins where atmosphere and ease feel inseparable.",
  },
  {
    slug: "sterling-lonavala", titleMain: "Sterling", titleAccent: "Lonavala", title: "Sterling Lonavala",
    location: "Lonavala, Sahyadri Mountain Range", category: "Hospitality", typology: "Resort", year: "2025", area: "Rooms, Banquet Hall & Landscape", tagline,
    description: "Sterling Lonavala is a popular destination in the Sahyadri mountain range, known for its peaceful surroundings and family-friendly atmosphere. The resort includes an outdoor swimming pool, a games room, and a garden for relaxation.",
    scope: ["Rooms", "Banquet Hall", "Landscape"], ...media(cloudinary.sterling, [cloudinary.iconiqa, cloudinary.taj, cloudinary.infocity, cloudinary.apl]), relatedProjects: relatedFor("sterling-lonavala"),
    narrativeHeading: "A relaxed retreat shaped by its setting.", quote: "A retreat feels complete when every transition invites you to slow down.",
  },
  {
    slug: "synergy-consulting", titleMain: "Synergy", titleAccent: "Consulting", title: "Synergy Consulting",
    location: "India", category: "Corporate", typology: "Office Interiors", year: "2025", area: "Reception, Workspace & Meeting Areas", tagline,
    description: "Synergy Consulting is a global leader in financial and corporate advisory services. Their work includes leading, structuring, and closing large and complex transactions across different sectors. They work with public and private sector clients, financial institutions, co-advisors, and stakeholders to deliver results and growth.",
    scope: ["Reception Area", "Office Interiors", "Workspace Planning", "Meeting Rooms", "Ceiling and Material Detailing"], ...media(cloudinary.synergy, [cloudinary.apl, cloudinary.infocity, cloudinary.iconiqa, cloudinary.sterling]), relatedProjects: relatedFor("synergy-consulting"),
    narrativeHeading: "A workplace built around focus and exchange.", quote: "Good workplaces make concentration effortless and collaboration natural.",
  },
  {
    slug: "sp-infocity-mohali", titleMain: "SP Infocity", titleAccent: "Mohali", title: "SP Infocity Mohali",
    location: "Mohali", category: "Commercial", typology: "IT / ITES SEZ", year: "2025", area: "Lobby, Office Corridors & Workspace Interiors", tagline,
    description: "SP Infocity Mohali gives businesses the convenience of expanding under a single umbrella. The project is a notified IT/ITES SEZ, allowing eligible clients to access income tax exemption, GST exemption, and other duty benefits as per applicable laws and government policies.",
    scope: ["Main Entrance", "Lobby Area", "Office Corridor", "Workspace Interiors", "Discussion / Cabin Spaces"], ...media(cloudinary.infocity, [cloudinary.synergy, cloudinary.apl, cloudinary.iconiqa, cloudinary.taj]), relatedProjects: relatedFor("sp-infocity-mohali"),
    narrativeHeading: "A clear identity at an urban scale.", quote: "Architecture gives movement a rhythm and arrival a sense of place.",
  },
  {
    slug: "taj-ganges-varanasi", titleMain: "Taj Ganges", titleAccent: "Varanasi", title: "Taj Ganges Varanasi",
    location: "Varanasi", category: "Hospitality", typology: "5-Star Hotel", year: "2025", area: "Building Elevation, Gym, Spa & Salon", tagline,
    description: "Taj Ganges in Varanasi is a 5-star hotel known for its luxurious charm and peaceful ambiance. It offers 130 rooms and suites and is located within 40 acres of lush tropical gardens. This was a sub-contract project in partnership with Archcon Infra, the main contractor of the project.",
    scope: ["Building Elevation", "Interiors of Gym", "Spa", "Salon"], ...media(cloudinary.taj, [cloudinary.iconiqa, cloudinary.sterling, cloudinary.infocity, cloudinary.synergy]), relatedProjects: relatedFor("taj-ganges-varanasi"),
    narrativeHeading: "Wellness spaces with a composed sense of calm.", quote: "Wellness is shaped as much by atmosphere as by function.",
  },
  {
    slug: "apl-logistics", titleMain: "APL", titleAccent: "Logistics", title: "APL Logistics",
    location: "India", category: "Corporate", typology: "Office Interiors", year: "2025", area: "Office Interiors, Space Planning & Furniture", tagline,
    description: "APL Logistics provides global supply chain solutions across automotive, consumer, industrial, and retail markets. Their services include order management, distribution and fulfillment, customs brokerage, and transportation solutions.",
    scope: ["Office Interiors", "Space Planning", "Furniture & Woodwork"], ...media(cloudinary.apl, [cloudinary.synergy, cloudinary.infocity, cloudinary.sterling, cloudinary.iconiqa]), relatedProjects: relatedFor("apl-logistics"),
    narrativeHeading: "An efficient workplace with a human pace.", quote: "Efficiency becomes meaningful when it also supports the people within it.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}