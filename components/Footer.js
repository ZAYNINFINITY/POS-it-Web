import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const LINKS = {
  Product: [
    { label: "Download",       href: "#pricing" },
    { label: "Pricing",        href: "#pricing" },
    { label: "Features",       href: "#features" },
    { label: "Product tour",   href: "#showcase" },
    { label: "How it works",   href: "#how-it-works" },
  ],
  Resources: [
    { label: "Getting started",     href: "#how-it-works" },
    { label: "CSV import guide",    href: "#faq" },
    { label: "License activation",  href: "#faq" },
    { label: "FAQ",                 href: "#faq" },
  ],
  Support: [
    { label: "Email support",       href: "mailto:support@pos-it.com" },
    { label: "WhatsApp helpline",   href: "https://wa.me/923001234567" },
    { label: "Report a bug",        href: "mailto:bugs@pos-it.com" },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>

        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/pos logo.png"
              alt="POS-it logo"
              width={30}
              height={30}
              className={styles.logoMark}
              priority
            />
            <span className={styles.logoText}>POS-it</span>
          </Link>

          <p className={styles.brandDesc}>
            Offline-first point of sale for Pakistani shops. No cloud, no
            subscription, no downtime when the internet goes out.
          </p>

          <p className={styles.version}>
            Current version: <span className={styles.vTag}>v2.0.0</span>
          </p>
        </div>

        {/* Links */}
        <div className={styles.linksGrid}>
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} className={styles.linkGroup}>
              <h3 className={styles.groupTitle}>{group}</h3>
              {items.map(item => (
                <Link key={item.label} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} POS-it. All rights reserved.
        </p>
        <div className={styles.bottomLinks}>
          <Link href="/privacy" className={styles.bottomLink}>Privacy</Link>
          <Link href="/terms"   className={styles.bottomLink}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}
