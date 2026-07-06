import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const LINKS = {
  Product: [
    { label: "Download",       href: "/download" },
    { label: "Pricing",        href: "/pricing" },
    { label: "Features",       href: "/features" },
    { label: "Product tour",   href: "/product-tour" },
    { label: "How it works",   href: "/how-it-works" },
  ],
  Resources: [
    { label: "Getting started",     href: "/getting-started" },
    { label: "CSV import guide",    href: "/csv-import-guide" },
    { label: "License activation",  href: "/license-activation" },
    { label: "FAQ",                 href: "/faq" },
  ],
  Support: [
    { label: "Email support",       href: "/email-support" },
    { label: "WhatsApp helpline",   href: "/whatsapp-helpline" },
    { label: "Report a bug",        href: "/report-a-bug" },
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
