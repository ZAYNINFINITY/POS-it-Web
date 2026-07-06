import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "./Navbar.js";
import Footer from "./Footer";
import styles from "./InfoPage.module.css";

export default function InfoPage({ page }) {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <Link href="/" className="btn btn-ghost">
            <ArrowLeft size={14} strokeWidth={2.25} />
            Back to home
          </Link>

          <header className={styles.hero}>
            <span className={`eyebrow ${styles.kicker}`}>{page.kicker}</span>
            <h1 className={styles.title}>{page.title}</h1>
            <p className={styles.intro}>{page.intro}</p>
            {page.updated && <p className={styles.updated}>{page.updated}</p>}
          </header>

          <div className={styles.layout}>
            <div className={styles.content}>
              {page.sections.map((section) => (
                <section key={section.title} className={styles.section}>
                  <h2>{section.title}</h2>
                  {section.body && <p>{section.body}</p>}
                  {section.items && (
                    <ul className={styles.list}>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <aside className={styles.side}>
              <div className={styles.panel}>
                <p className={styles.panelTitle}>{page.sideTitle}</p>
                <p className={styles.panelText}>{page.sideText}</p>
              </div>
              <div className={styles.actions}>
                {page.actions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`btn ${action.variant || "btn-secondary"}`}
                  >
                    {action.label}
                    <ArrowRight size={14} strokeWidth={2.25} />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
