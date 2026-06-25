import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailTemplate from "@/components/projects/ProjectDetailTemplate";
import { getProjectBySlug, projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found | iDecorwala" };

  return {
    title: `${project.title} | iDecorwala Projects`,
    description: `${project.title}, a ${project.typology.toLowerCase()} project in ${project.location}.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailTemplate project={project} />;
}