import { storyTimeline } from "@/data/aboutData";
import styles from "./About.module.css";

export default function OurStorySection() {
  return <section className={`${styles.section} ${styles.story}`} id="our-story"><div className={`${styles.container} ${styles.storyGrid}`}><div><div className={styles.eyebrow}>Our Story</div><h2 className={styles.sectionTitle}>From Vision<br />to Built Reality</h2><p className={styles.storyCopy}>iDecorwala was founded with a simple belief: that every space, when designed and built with precision, can elevate the way people live, work, and connect.</p><p className={styles.storyCopy}>What started as a passion for beautiful design has evolved into a purpose-driven approach that blends creativity, technology, and craftsmanship to deliver future-ready environments.</p><div className={styles.signature}>iDecorwala Team</div></div><div className={styles.timeline}>{storyTimeline.map(({ id, icon: Icon, title, caption }) => <article className={styles.storyItem} key={id}><div className={styles.storyIcon}><Icon size={31} strokeWidth={1.35} /></div><h3>{title}</h3><p>{caption}</p></article>)}</div></div></section>;
}
