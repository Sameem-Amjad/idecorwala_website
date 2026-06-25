export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export const values: ValueItem[] = [
  { icon: "people", title: "People First", description: "We value people, relationships and collaboration." },
  { icon: "bulb", title: "Think Bold", description: "We challenge norms and embrace innovation." },
  { icon: "shield", title: "Do Right", description: "Integrity and transparency guide everything we do." },
  { icon: "target", title: "Deliver Excellence", description: "We are committed to quality, always and in every detail." },
  { icon: "leaf", title: "Sustainable Impact", description: "We create environments that inspire and endure." },
];

export const departments = [
  "All Departments", 
  "Design", 
  "Engineering", 
  "Project Management", 
  "Operations", 
  "Corporate"
];

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  experience: string;
}

export const openPositions: JobOpening[] = [
  { title: "Senior Interior Designer", department: "Design", location: "Gurugram, Haryana", experience: "5-8 Years" },
  { title: "MEP Project Engineer", department: "Engineering", location: "Mumbai, Maharashtra", experience: "3-6 Years" },
  { title: "Project Manager", department: "Project Management", location: "Bangalore, Karnataka", experience: "6-10 Years" },
  { title: "Site Supervisor", department: "Operations", location: "Hyderabad, Telangana", experience: "2-4 Years" },
  { title: "Business Development Manager", department: "Corporate", location: "Gurugram, Haryana", experience: "4-7 Years" },
];

export interface WhyJoinItem {
  icon: string;
  title: string;
  description: string;
}

export const whyJoinItems: WhyJoinItem[] = [
  { icon: "people", title: "Meaningful Impact", description: "Work on projects that transform spaces and communities." },
  { icon: "growth", title: "Growth & Learning", description: "Continuous learning and career advancement opportunities." },
  { icon: "team", title: "Collaborative Culture", description: "A supportive, inclusive and respectful work environment." },
  { icon: "buildings", title: "Diverse Projects", description: "Work across industries and geographies on iconic projects." },
  { icon: "bulb", title: "Recognition", description: "Celebrate wins and recognize contributions that matter." },
  { icon: "balance", title: "Work-Life Balance", description: "We value your well-being as much as your performance." },
];
