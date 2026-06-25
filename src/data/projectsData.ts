export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
  color: string;
  logoText: string;
  sortOrder: number;
}

export interface ProjectDetail {
  year: string;
  location: string;
  area: string;
  client: string;
  description: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "proj-1",
    slug: "royal-orchid-iconiqa",
    title: "Royal Orchid Iconiqa",
    category: "Hospitality",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952291/ICONICA_jxqxtw.png",
    aspect: "aspect-[4/3]",
    color: "#8B1A1A",
    logoText: "RO",
    sortOrder: 1,
  },
  {
    id: "proj-2",
    slug: "sterling-lonavala",
    title: "Sterling Lonavala",
    category: "Hospitality",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952301/STERLING_scuj3w.png",
    aspect: "aspect-[1/1]",
    color: "#C9A84C",
    logoText: "ST",
    sortOrder: 2,
  },
  {
    id: "proj-3",
    slug: "synergy-consulting",
    title: "Synergy Consulting",
    category: "Corporate Office",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952302/SYNERGY_hmduu3.png",
    aspect: "aspect-[3/4]",
    color: "#1B2A47",
    logoText: "SY",
    sortOrder: 3,
  },
  {
    id: "proj-4",
    slug: "sp-infocity-mohali",
    title: "SP Infocity Mohali",
    category: "IT Park & Commercial",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952303/SP_INFOCITY_wsjjrf.png",
    aspect: "aspect-[4/3]",
    color: "#2E3A2F",
    logoText: "SP",
    sortOrder: 4,
  },
  {
    id: "proj-5",
    slug: "taj-ganges-varanasi",
    title: "Taj Ganges Varanasi",
    category: "Hospitality",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952302/TAJ_s0seqs.png",
    aspect: "aspect-[1/1]",
    color: "#544338",
    logoText: "TJ",
    sortOrder: 5,
  },
  {
    id: "proj-6",
    slug: "apl-logistics",
    title: "APL Logistics",
    category: "Corporate Office",
    image: "https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1781952291/APL_q8gn5q.png",
    aspect: "aspect-[3/4]",
    color: "#3B5360",
    logoText: "AL",
    sortOrder: 6,
  },
];

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "royal-orchid-iconiqa": {
    year: "2025",
    location: "Mumbai, India",
    area: "Rooms, Banquet Hall",
    client: "Royal Orchid Hotels",
    description: "Royal Orchid Iconiqa is a new luxury hotel brand launched by Royal Orchid Hotels. It is part of Royal Orchid Hotels' ambitious expansion plan to triple its portfolio to over 300 hotels and 20,000 rooms in the next five years.\n\nThe hotel blends contemporary design with authentic hospitality to create unforgettable experiences for today's discerning travellers.",
  },
  "sterling-lonavala": {
    year: "2024",
    location: "Lonavala, India",
    area: "Rooms, Banquet Hall, Landscape",
    client: "Sterling Holiday Resorts",
    description: "Sterling Lonavala is a popular destination in the Sahyadri mountain range, known for its serene surroundings and family-friendly atmosphere.\n\nThe resort features an outdoor swimming pool, a games room, and a garden for relaxation.",
  },
  "synergy-consulting": {
    year: "2024",
    location: "Delhi NCR, India",
    area: "Office Interiors, Space Planning, Furniture & woodwork",
    client: "Synergy Consulting",
    description: "Synergy Consulting (“Synergy”) is a global leader in Financial and Corporate Advisory Services.\n\nTheir track record is a testimony to Synergy’s unique abilities, skills and global resources for leading, structuring and closing large and complex transactions in a range of sectors.",
  },
  "sp-infocity-mohali": {
    year: "2024",
    location: "Mohali, India",
    area: "Lobby, Staircase, Office Interiors",
    client: "Shapoorji Pallonji",
    description: "The development scale of SP Infocity Mohali gives businesses the convenience of expanding under a single umbrella.\n\nThe project is notified IT/ITES SEZ that allows clients to avail of income tax exemption, GST exemption and a suite of other duty benefits subject to eligibility, prevailing applicable laws, and government policies.",
  },
  "taj-ganges-varanasi": {
    year: "2023",
    location: "Varanasi, India",
    area: "Building Elevation, Interiors of Gym, Spa & Salon",
    client: "Taj Hotels (Sub-contract)",
    description: "The Taj Ganges in Varanasi is a 5-star hotel known for its luxurious charm and serene ambiance. It offers 130 rooms and suites, nestled within 40 acres of lush tropical gardens.\n\nThis was a sub-contract project in partnership with Archcon Infra who were the main contractor of this project.",
  },
  "apl-logistics": {
    year: "2024",
    location: "Corporate Office",
    area: "Office Interiors, Space Planning, Furniture & woodwork",
    client: "APL Logistics (KWE Group)",
    description: "APL Logistics provides innovative, global supplychain solutions across Automotive, Consumer, Industrial and Retail markets.\n\nThese solutions include Order Management, Distribution & Fulfillment, Customs Brokerage and Transportation products.",
  },
};
