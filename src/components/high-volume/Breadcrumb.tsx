import styles from "./HighVolume.module.css";

interface BreadcrumbProps {
  categoryName?: string;
}

export default function Breadcrumb({ categoryName }: BreadcrumbProps) {
  const currentCrumb = categoryName || "High Volume Products";
  return <div className={`${styles.container} ${styles.breadcrumb}`} aria-label="Breadcrumb"><span>Home</span><span className={styles.crumbArrow}>›</span><span>Products</span><span className={styles.crumbArrow}>›</span><strong>{currentCrumb}</strong></div>;
}
