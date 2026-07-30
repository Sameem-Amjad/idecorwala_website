import Image from "next/image";
import { heroFeatures } from "./data";
import styles from "./Hospitality.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div>
          <div className={styles.breadcrumb}>
            <span>Solutions</span>
            <span>›</span>
            <b>Hospitality</b>
          </div>
          
          <h1 className={styles.heroTitle}>Hospitality</h1>
          
          <div className={styles.ornament}>
            <i />
          </div>
          
          <h2 className={styles.tagline}>
            Elevated guest experiences.<br />Engineered to perform.
          </h2>
          
          <p className={styles.heroCopy}>
            We design and build hospitality interiors that blend aesthetics with operational efficiency—delivering timeless spaces that impress guests and maximise long-term value.
          </p>

          <div className={styles.heroFeatures}>
            {heroFeatures.map(({ icon: Icon, label }) => (
              <div className={styles.heroFeature} key={label}>
                <Icon size={27} strokeWidth={1.4} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <Image 
              src="/images/hospitality/hero-lobby.png" 
              alt="Luxury hotel lobby with warm timber walls, a sculptural chandelier, and cream lounge seating" 
              fill 
              priority 
              sizes="(max-width:1023px) 100vw, 54vw"
              className="object-cover"
            />
            <div className={styles.goldLine} />
          </div>
          <div className={styles.quoteCard}>
            <div className={styles.quoteMark}>“</div>
            <p>Spaces that inspire.<br />Guest experiences that last.</p>
          </div>
        </div>
      </div>
    </section>
  );
}