import { coreValues } from "@/data/aboutData";
import styles from "./About.module.css";

export default function OurValuesSection() {
  return <section className={styles.values}><div className={styles.valueWedge} /><div className={`${styles.container} ${styles.valuesInner}`}><div className={styles.valuesHeading}><div className={styles.eyebrow}>Our Values</div><h2 className={styles.sectionTitle}>The Principles That<br />Shape Everything We Do</h2><div className={styles.ornament}><i /></div></div><div className={styles.valuesGrid}>{coreValues.map(({ id, icon: Icon, title, caption }) => <article className={styles.valueItem} key={id}><div className={styles.valueIcon}><Icon size={27} strokeWidth={1.35} /></div><h3>{title}</h3><p>{caption}</p></article>)}</div></div></section>;
}
