import styles from "./ITParkPage.module.css";

export default function GoldDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`${styles.goldDivider} ${dark ? styles.goldDividerDark : ""}`} aria-hidden="true">
      <span />
      <i />
      <span />
    </div>
  );
}
