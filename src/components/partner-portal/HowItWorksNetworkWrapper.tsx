import HowItWorksSection from "./HowItWorksSection";
import PartnerNetworkSection from "./PartnerNetworkSection";
import styles from "./PartnerPortal.module.css";

export default function HowItWorksNetworkWrapper() {
  return (
    <section className={styles.section} style={{ background: "var(--cream)" }}>
      <div className={`${styles.container} ${styles.howItWorksBox}`}>
        <HowItWorksSection />
        <PartnerNetworkSection />
      </div>
    </section>
  );
}
