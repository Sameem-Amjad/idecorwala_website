import styles from "./ThoughtLeadership.module.css";

export default function Breadcrumb() {
  return (
    <div className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb">
      <span>Home</span>
      <span className={styles.crumbArrow}>›</span>
      <strong>Thought Leadership</strong>
    </div>
  );
}
