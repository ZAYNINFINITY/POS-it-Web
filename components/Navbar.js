"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const intersecting        = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => intersecting.current.set(e.target.id, e.isIntersecting));
        const first = ids.find((id) => intersecting.current.get(id));
        setActive(first ?? null);
      },
      { rootMargin: "-62px 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const SECTION_IDS = ["features", "showcase", "pricing", "faq"];
const NAV_LINKS = [
  { href: "#features", label: "Features",    section: "features" },
  { href: "#showcase", label: "Product tour", section: "showcase" },
  { href: "#pricing",  label: "Pricing",      section: "pricing"  },
  { href: "#faq",      label: "FAQ",          section: "faq"      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const activeSection           = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} glass`}>
      <div className={`container ${styles.inner}`}>

        <Link href="/" className={styles.logo} aria-label="POS-it home">
          <Image src="/pos logo.png" alt="POS-it" width={30} height={30} className={styles.logoImg} priority />
          <span className={styles.logoText}>POS-it</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((l) => {
            const isActive = activeSection === l.section;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    className={styles.navIndicator}
                    layoutId="nav-indicator"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link href="mailto:support@pos-it.app" className={`btn btn-ghost ${styles.support}`}>Support</Link>
          <Link href="#pricing" className="btn btn-accent">
            <Download size={14} strokeWidth={2.25} />
            Download free
          </Link>
        </div>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: "flex" }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobile}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`container ${styles.mobileLinks}`}>
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`${styles.mobileLink} ${activeSection === l.section ? styles.mobileLinkActive : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="#pricing" className="btn btn-accent" style={{ width: "100%", marginTop: "0.5rem" }} onClick={() => setOpen(false)}>
                <Download size={14} /> Download free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
