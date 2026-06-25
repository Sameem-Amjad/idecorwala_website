import styles from "./HighVolume.module.css";

export default function Breadcrumb() {
  return <div className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb"><span>Home</span><span className={styles.crumbArrow}>›</span><span>Products</span><span className={styles.crumbArrow}>›</span><strong>High Volume Products</strong></div>;
}
