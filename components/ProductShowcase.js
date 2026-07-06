"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Circle, Wifi, TrendingUp, PackageX, ShieldCheck } from "lucide-react";
import styles from "./ProductShowcase.module.css";

// ── Setup wizard sub-carousel — real screenshots that weren't wired up yet ──
const SETUP_STEPS = [
  { label: "Business details",    src: "/screenshots/setup-1-business.png" },
  { label: "Invoice settings",    src: "/screenshots/setup-2-invoice.png" },
  { label: "Admin account",       src: "/screenshots/setup-3-admin.png" },
  { label: "Starting inventory",  src: "/screenshots/setup-4-inventory.png" },
  { label: "First login",         src: "/screenshots/setup-5-login.png" },
];
const WIZARD_SUBSTEP_MS = 1800;

const STEPS = [
  {
    id: "setup",
    label: "Setup wizard",
    title: "Up and running in under two minutes",
    text:  "Business name, invoice prefix, an admin account, and your starting inventory — a 4-step wizard configures everything before your first sale.",
    type:  "wizard",
    duration: SETUP_STEPS.length * WIZARD_SUBSTEP_MS,
  },
  {
    id: "sell",
    label: "POS Terminal",
    title: "Search, add, collect — in under 10 seconds",
    text:  "Type a product name, SKU, or barcode. It lands in the cart instantly. Switch between Cash, Card, Easypaisa, or JazzCash with one tap. Hit Complete Sale. Receipt prints. Stock updates automatically.",
    src:   "/screenshots/app/sell.png",
    type:  "screen",
    duration: 5000,
  },
  {
    id: "products",
    label: "Product management",
    title: "Your entire catalogue, properly structured",
    text:  "17 product fields including cost price, selling price, barcode, variant, and category. Bulk-import from any spreadsheet via CSV — POS-it detects column headers and maps them automatically.",
    src:   "/screenshots/app/products.png",
    type:  "screen",
    duration: 5000,
  },
  {
    id: "stock",
    label: "Inventory dashboard",
    title: "Know what to reorder before you run out",
    text:  "Low-stock alerts with configurable thresholds, out-of-stock flags, and a live total inventory value. Everything visible in one screen before you start the day.",
    src:   "/screenshots/app/stock.png",
    type:  "screen",
    duration: 5000,
  },
  {
    id: "reports",
    label: "Reports",
    title: "Revenue, profit, and top sellers — all local",
    text:  "Today's sales, total revenue, profit per product, and a 7-day trend chart. No analytics vendor, no data leaving your machine. Export as a spreadsheet in one click.",
    src:   "/screenshots/app/reports.png",
    type:  "screen",
    duration: 5000,
  },
  {
    id: "customers",
    label: "Customer management",
    title: "Every customer, one screen",
    text:  "Name, phone, email, and full purchase history. Link credit sales to a customer and track their outstanding balance — no separate ledger book needed.",
    src:   "/screenshots/app/customers.png",
    type:  "screen",
    duration: 5000,
  },
  {
    id: "credits",
    label: "Credit sales (Udhar)",
    title: "Track udhar the way shops actually work",
    text:  "Mark any sale as credit. The balance sits against the customer with a full payment log. Send a WhatsApp reminder in one tap — no third-party app required.",
    src:   "/screenshots/app/credits.png",
    type:  "screen",
    duration: 5000,
  },
  {
    id: "glance",
    label: "At a glance",
    title: "Everything that matters, the moment you open it",
    text:  "Today's revenue, low-stock alerts, till status, and offline mode — one glance tells you exactly where the shop stands before a single sale is rung up.",
    type:  "glance",
    duration: 6000,
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [wizardSub, setWizardSub] = useState(0);
  const wizardRef = useRef(null);

  const step = STEPS[active];

  const next = useCallback(() => setActive((i) => (i + 1) % STEPS.length), []);

  // Advance the main step
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, step.duration);
    return () => clearTimeout(id);
  }, [active, paused, next, step.duration]);

  // Reset + auto-advance the setup wizard's internal sub-carousel
  useEffect(() => {
    if (step.type !== "wizard") return;
    setWizardSub(0);
    if (paused) return;
    wizardRef.current = setInterval(() => {
      setWizardSub((i) => (i + 1) % SETUP_STEPS.length);
    }, WIZARD_SUBSTEP_MS);
    return () => clearInterval(wizardRef.current);
  }, [active, paused, step.type]);

  return (
    <section id="showcase" className="section">
      <div className="container">
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Product tour</span>
          <h2 className={styles.headingTitle}>
            Every screen your shop needs
          </h2>
          <p className={styles.headingSub}>
            Real data. Real screens. No mockups — this is the actual
            application running on a pharmacy&apos;s counter.
          </p>
        </motion.div>

        <div
          className={styles.layout}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── App window frame ── */}
          <div className={styles.frame}>
            <div className={styles.titlebar}>
              <div className={styles.dots}>
                <span className={styles.dotR} />
                <span className={styles.dotY} />
                <span className={styles.dotG} />
              </div>
              <span className={styles.titleText}>POS-it — Life Pharmacy</span>
              <span className={styles.statusPill}>
                <Circle size={6} fill="currentColor" strokeWidth={0} />
                {step.type === "wizard" ? SETUP_STEPS[wizardSub].label : step.label}
              </span>
            </div>

            <div className={styles.screenWrap}>
              <AnimatePresence mode="wait">
                {step.type === "screen" && (
                  <motion.div
                    key={step.src}
                    className={styles.screen}
                    initial={{ opacity: 0, scale: 1.012 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={step.src}
                      alt={step.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 760px"
                      className={styles.screenImg}
                      priority={active === 0}
                    />
                  </motion.div>
                )}

                {step.type === "wizard" && (
                  <motion.div
                    key={`wizard-${SETUP_STEPS[wizardSub].src}`}
                    className={styles.screen}
                    initial={{ opacity: 0, scale: 1.012 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={SETUP_STEPS[wizardSub].src}
                      alt={`Setup wizard — ${SETUP_STEPS[wizardSub].label}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 760px"
                      className={styles.screenImg}
                    />
                    <div className={styles.wizardOverlay}>
                      <span className={styles.wizardStepTag}>
                        Step {wizardSub + 1} of {SETUP_STEPS.length} — {SETUP_STEPS[wizardSub].label}
                      </span>
                      <div className={styles.wizardDots}>
                        {SETUP_STEPS.map((s, i) => (
                          <span
                            key={s.label}
                            className={`${styles.wizardDot} ${i === wizardSub ? styles.wizardDotActive : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step.type === "glance" && (
                  <motion.div
                    key="glance"
                    className={`${styles.screen} ${styles.glanceScreen}`}
                    initial={{ opacity: 0, scale: 1.012 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.glanceGrid}>
                      <div className={styles.glanceCard}>
                        <span className={styles.glanceLabel}>Today&apos;s revenue</span>
                        <span className={styles.glanceValue}>Rs 48,250</span>
                        <span className={styles.glanceHintUp}>
                          <TrendingUp size={12} strokeWidth={2.25} /> 12% vs yesterday
                        </span>
                      </div>
                      <div className={styles.glanceCard}>
                        <span className={styles.glanceLabel}>Low stock items</span>
                        <span className={styles.glanceValue}>7</span>
                        <span className={styles.glanceHint}>
                          <PackageX size={12} strokeWidth={2.25} /> 3 out of stock
                        </span>
                      </div>
                      <div className={styles.glanceCard}>
                        <span className={styles.glanceLabel}>Till status</span>
                        <span className={styles.glanceValueSmall}>Open · Counter 1</span>
                        <span className={styles.glanceHint}>
                          <ShieldCheck size={12} strokeWidth={2.25} /> Admin session
                        </span>
                      </div>
                      <div className={styles.glanceCard}>
                        <span className={styles.glanceLabel}>Connection</span>
                        <span className={styles.glanceValueSmall}>Fully offline</span>
                        <span className={styles.glanceHintUp}>
                          <Wifi size={12} strokeWidth={2.25} /> Running on local SQLite
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress tracks — one per step */}
            <div className={styles.progressRow}>
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={styles.progressTrack}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.label}`}
                >
                  <span
                    className={styles.progressFill}
                    style={{
                      width: i < active ? "100%" : i === active ? "100%" : "0%",
                      transitionDuration:
                        i === active && !paused ? `${s.duration}ms` : "0.3s",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Side panel — copy updates with each step ── */}
          <div className={styles.sidePanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.stepTag}>
                  {String(active + 1).padStart(2, "0")} / {step.label}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </motion.div>
            </AnimatePresence>

            <div className={styles.stepList}>
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`${styles.stepListItem} ${i === active ? styles.stepListItemActive : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.stepListIndex}>{i + 1}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
