"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project, RelatedProject } from "@/data/projects";

const container = "mx-auto w-full max-w-[1280px]";
const paper = "bg-[#F1E6D2] bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.46),transparent_34%),radial-gradient(circle_at_82%_74%,rgba(211,202,187,0.24),transparent_38%),repeating-linear-gradient(90deg,rgba(90,72,48,0.018)_0,rgba(90,72,48,0.018)_1px,transparent_1px,transparent_5px)]";

function Marker({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return <div className={`flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-[#C9A050]" : "text-[#9B6F28]"}`}><span>{number}</span><span className="h-px w-7 bg-[#C9A050]" /><span>{label}</span></div>;
}

function HeroSection({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const metadata = [
    { label: "Area / Scope", value: project.area },
    { label: "Category", value: project.category },
    { label: "Typology", value: project.typology },
    { label: "Year", value: project.year },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#0A0A0A] text-[#F7F6F2]">
      <div className="grid lg:min-h-[760px] lg:grid-cols-[54%_46%]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative z-10 order-2 flex bg-[#0A0A0A] pb-[60px] pl-[clamp(40px,6vw,100px)] pr-[clamp(24px,3vw,60px)] pt-[clamp(120px,14vw,160px)] lg:order-1 lg:items-center">
          <div className="ml-auto w-full max-w-[650px]">
            <Link href="/#projects" className="group mb-[clamp(56px,7vw,88px)] inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D8C8AE] transition-colors hover:text-white"><ArrowLeft aria-hidden="true" size={15} className="text-[#C9A050] transition-transform group-hover:-translate-x-1" />Back to projects</Link>
            <Marker number="01" label="Project Identity" dark />
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{project.category} <span className="px-2 text-[#C9A050]">—</span> {project.year}</p>

            <div className="mb-[clamp(40px,5vw,64px)] mt-[clamp(42px,6vw,72px)]">
              <h1 className="max-w-[620px] font-serif text-[clamp(4rem,7vw,6.2rem)] font-light leading-[0.88] tracking-[-0.045em] drop-shadow-[0_8px_26px_rgba(0,0,0,0.4)]"><span className="block text-[#F7F6F2]">{project.titleMain}</span><em className="mt-2 block font-light text-[#C9A050]">{project.titleAccent}</em></h1>
            </div>

            <div className="flex flex-col border-t border-white/20 pt-5 lg:flex-row lg:items-start">
              {metadata.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 && <div aria-hidden="true" className="mr-6 hidden h-11 w-px shrink-0 self-center bg-white/20 lg:block" />}
                  <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 + index * 0.1 }} className={`flex min-w-0 flex-1 flex-col gap-1.5 py-4 pr-6 ${index > 0 ? "border-t border-white/10 lg:border-t-0" : ""}`}>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C9A050]">{item.label}</span>
                    <span className="max-w-full break-words font-serif text-[clamp(0.95rem,1.6vw,1.25rem)] font-normal leading-[1.25] text-white">{item.value}</span>
                  </motion.div>
                </Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative order-1 h-[320px] min-h-0 overflow-hidden lg:order-2 lg:h-auto lg:min-h-[760px]">
          <img src={project.heroImage} alt={`${project.title} exterior at night`} className="h-full w-full object-cover object-center" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/15" />
        </motion.div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[54%] opacity-[0.12] bg-[radial-gradient(circle,rgba(201,160,80,0.34)_0_0.7px,transparent_0.9px)] bg-[size:19px_19px] max-lg:hidden" />
      <svg aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 z-20 size-[240px] opacity-30" viewBox="0 0 220 220"><circle cx="110" cy="110" r="108" stroke="#C9A050" strokeWidth="1" fill="none" strokeDasharray="320 100" /></svg>
    </section>
  );
}
function NarrativeSection({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-[#F5EFE6] px-[clamp(40px,6vw,100px)] py-[clamp(80px,10vw,120px)]">
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }} className="mx-auto max-w-[720px] text-center">
        <div className="flex justify-center"><Marker number="02" label="Narrative" /></div>
        <h2 className="mt-6 font-serif text-[clamp(1.75rem,3.8vw,3rem)] font-normal italic leading-[1.25] text-[#8B0D12]">{project.narrativeHeading}</h2>
        <div className="mx-auto mb-7 mt-5 h-px w-14 bg-[#C9A050]" />
        <p className="mb-11 text-center text-[clamp(14px,1.3vw,16px)] leading-[1.8] text-[#4A4A4A]">{project.description}</p>
        {project.scope.length > 0 && <div><p className="mb-3.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C9A050]">Scope of Work</p><ul className="flex flex-wrap justify-center gap-3">{project.scope.map((item) => <li key={item} className="border border-[#1A1A1A] bg-transparent px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]">{item}</li>)}</ul></div>}
      </motion.div>
    </section>
  );
}

function VisualNarrativeSection({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  if (project.visualNarrative.length === 0) return null;

  return (
    <section className="border-t border-[#1A1A1A]/10 bg-[#F5EFE6] px-[clamp(40px,6vw,100px)] py-[clamp(60px,8vw,100px)]">
      <div className="mx-auto max-w-[780px]">
        <Marker number="03" label="Visual Narrative" />
        <p className="mb-9 mt-4 text-[13px] text-[#6A6A6A]">Move through the visual story of this project.</p>
        <div className="w-full">
          {project.visualNarrative.map((item, index) => (
            <motion.button key={`${item.label}-${item.image}`} type="button" initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.08 }} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)} aria-pressed={activeIndex === index} className={`relative flex min-h-14 w-full items-center justify-between gap-5 border-b border-[#1A1A1A]/10 py-5 pr-0 text-left transition-colors duration-200 ${activeIndex === index ? "pl-5 text-[#1A1A1A]" : "pl-4 text-[#AAAAAA] hover:text-[#1A1A1A]"}`}>
              <motion.span aria-hidden="true" initial={false} animate={{ scaleY: activeIndex === index ? 1 : 0 }} className="absolute inset-y-0 left-0 w-[3px] origin-center bg-[#C9A050]" />
              <span className={`font-serif transition-all duration-200 ${activeIndex === index ? "text-[clamp(1.375rem,2.6vw,2rem)]" : "text-[clamp(1.0625rem,2vw,1.4375rem)]"}`}>{item.label}</span>
              <span className={`text-[11px] tracking-[0.12em] ${activeIndex === index ? "text-[#C9A050]" : "text-[#CCCCCC]"}`}>{String(index + 1).padStart(2, "0")}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
function AtmosphereQuote({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative isolate flex min-h-[clamp(280px,40vh,500px)] items-center justify-center overflow-hidden"><img src={project.quoteImage} alt="" aria-hidden="true" className="absolute inset-0 -z-30 h-full w-full object-cover object-[center_35%]" /><div className="absolute inset-0 -z-20 bg-[rgba(8,7,6,0.62)]" /><div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,8,5,0.48)_100%)]" /><motion.blockquote initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8 }} className="mx-auto max-w-[850px] px-[clamp(24px,5vw,60px)] py-[clamp(60px,8vw,100px)] text-center font-serif text-[clamp(1.7rem,3.8vw,3rem)] font-light italic leading-[1.3] text-[#F7F6F2]"><span className="mr-2 text-[#C9A050]">“</span>{project.quote}<span className="ml-1 text-[#C9A050]">”</span></motion.blockquote></section>;
}

function ProjectCard({ project, index }: { project: RelatedProject; index: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.article initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.12 }}><Link href={project.href} className="group block overflow-hidden rounded-xl border border-white/5 bg-[#161513] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.4)]"><div className="aspect-[4/3] overflow-hidden"><img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /></div><div className="px-5 pb-5 pt-4"><div className="flex items-center justify-between gap-4"><h3 className="font-serif text-xl text-[#F7F6F2]">{project.title}</h3><ArrowRight aria-hidden="true" size={16} className="shrink-0 text-[#C9A050] transition-transform group-hover:translate-x-1" /></div><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9A9489]">{project.category}</p></div></Link></motion.article>;
}

function SelectedWork({ projects }: { projects: RelatedProject[] }) {
  if (projects.length === 0) return null;
  return <section className="relative overflow-hidden bg-[#0A0A0A] px-[clamp(40px,6vw,100px)] py-[clamp(60px,8vw,100px)] text-white"><div aria-hidden="true" className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0_0.6px,transparent_0.8px)] bg-[size:17px_17px]" /><div className={`${container} relative`}><Marker number="04" label="Selected Work" dark /><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.slice(0, 3).map((project, index) => <ProjectCard key={project.href} project={project} index={index} />)}</div></div></section>;
}

function ProjectCTA() {
  return <section className={`${paper} border-t border-[#C9A050]/30 px-[clamp(24px,5vw,80px)] py-[clamp(48px,6vw,72px)]`}><div className={`${container} flex flex-col gap-8 md:flex-row md:items-center md:justify-between`}><div><h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] text-[#1B1714]">Have a similar project in mind?</h2><p className="mt-2 text-sm text-[#70695F]">Let&apos;s discuss how iDecorwala can shape it from concept to completion.</p></div><Link href="/contact" className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-lg border border-[#C9A84C] bg-[linear-gradient(135deg,#8B1A1A_0%,#520F0F_100%)] px-8 text-[11px] font-bold uppercase tracking-[0.14em] text-[#F7F1E8] shadow-[0_10px_28px_rgba(122,13,18,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#C51F24] hover:shadow-[0_14px_34px_rgba(122,13,18,0.48)]">Connect With Us <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" /></Link></div></section>;
}

export default function ProjectDetailTemplate({ project }: { project: Project }) {
  return <main className="overflow-x-hidden"><HeroSection project={project} /><NarrativeSection project={project} /><VisualNarrativeSection project={project} /><AtmosphereQuote project={project} /><SelectedWork projects={project.relatedProjects} /><ProjectCTA /></main>;
}