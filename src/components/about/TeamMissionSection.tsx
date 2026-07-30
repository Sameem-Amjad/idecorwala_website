import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { teamRoles } from "@/data/aboutData";
import styles from "./About.module.css";

export default function TeamMissionSection() {
  return <section className={styles.teamMission}><div className={styles.teamGrid}><div className={styles.teamCopy}><div className={styles.eyebrow}>People Behind the Purpose</div><h2 className={styles.sectionTitle}>A Team That<br />Builds More Than Spaces</h2><p>Our architects, designers, engineers, and project experts bring together creativity, technical expertise, and unwavering dedication to turn vision into reality.</p><div className={styles.roles}>{teamRoles.map(({ id, icon: Icon, label }) => <div className={styles.role} key={id}><Icon size={28} strokeWidth={1.35} /><span>{label}</span></div>)}</div></div><div className={styles.teamImageFrame}><div className={styles.teamImage}><Image src="/images/about/team-blueprint.png" alt="Architect drafting detailed floor plans" fill sizes="(max-width: 767px) 100vw, 31vw" /></div></div><div className={styles.mission}><div className={styles.eyebrow}>Our Mission</div><h2 className={styles.sectionTitle}>To Design. To Build.<br />To Make a Difference.</h2><div className={styles.ornament}><i /></div><p>We are committed to creating spaces that inspire, perform, and stand the test of time, delivered with precision, on time, every time.</p><Link className={styles.button} href="/contact">Let&apos;s build together <ArrowRight size={15} /></Link></div></div></section>;
}
