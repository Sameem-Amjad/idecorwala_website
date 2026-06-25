import { aboutStats } from "@/data/aboutData";
import styles from "./About.module.css";

export default function StatsStrip() {
  return <section className={styles.statsSection}><div className={`${styles.container} ${styles.statsPanel}`}>{aboutStats.map(({ id, icon: Icon, value, label }) => <div className={styles.stat} key={id}><div className={styles.statIcon}><Icon size={24} strokeWidth={1.35} /></div><div><strong>{value}</strong><span>{label}</span></div></div>)}</div></section>;
}
