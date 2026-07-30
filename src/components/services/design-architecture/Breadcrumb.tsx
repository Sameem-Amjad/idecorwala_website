import styles from "./DesignArchitecture.module.css";

export default function Breadcrumb() {
  return <nav className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb"><span>Home</span><span className={styles.crumbArrow}>›</span><span>Services</span><span className={styles.crumbArrow}>›</span><b>Design &amp; Architecture</b></nav>;
}
