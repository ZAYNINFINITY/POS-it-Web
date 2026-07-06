"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HardDrive, ChevronRight } from "lucide-react";
import styles from "./Hero.module.css";

// ── Store types cycling in headline ─────────────────────────────────────────
const STORE_TYPES = [
  "pharmacies",
  "hardware shops",
  "grocery stores",
  "medical stores",
  "general stores",
];

// ── Walkthrough steps that sync with the video ───────────────────────────────
// Durations (ms) should roughly match each section in your recorded webm
const STEPS = [
  {
    id: "login",
    label: "Login & setup",
    desc: "Your business name, invoice prefix, and admin account — configured once in a 4-step wizard. Takes under two minutes.",
    duration: 7500,
  },
  {
    id: "sell",
    label: "POS Terminal",
    desc: "Search by name, SKU, or barcode. Products land in the cart instantly. Cash, card, Easypaisa, JazzCash — one tap to switch.",
    duration: 10000,
  },
  {
    id: "products",
    label: "Product management",
    desc: "Add products manually or import an existing spreadsheet as CSV. POS-it maps columns and creates categories automatically.",
    duration: 7000,
  },
  {
    id: "stock",
    label: "Inventory dashboard",
    desc: "Low stock alerts, out-of-stock flags, and total inventory value — all visible before you start the day.",
    duration: 7000,
  },
  {
    id: "reports",
    label: "Reports",
    desc: "Today's revenue, total profit, top sellers, and a 7-day trend chart. Export the full report as a spreadsheet in one click.",
    duration: 8000,
  },
  {
    id: "credits",
    label: "Credit sales (Udhar)",
    desc: "Track what each customer owes. Set credit limits, log payments, and see the outstanding balance — all stored offline.",
    duration: 7000,
  },
];

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(words, speed = 85, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (!deleting && display === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === "") {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    } else {
      const next = deleting
        ? word.slice(0, display.length - 1)
        : word.slice(0, display.length + 1);
      t = setTimeout(
        () => setDisplay(next),
        deleting ? speed * 0.5 : speed + Math.random() * 30,
      );
    }
    return () => clearTimeout(t);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── Stagger variants — one cohesive entrance ─────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(STORE_TYPES);
  const [active, setActive]     = useState(0);
  const [progress, setProgress] = useState(0);
  const raf    = useRef(null);
  const start  = useRef(null);
  const paused = useRef(false);

  // Advance walkthrough steps with smooth progress bar
  useEffect(() => {
    const duration = STEPS[active].duration;
    start.current  = performance.now();

    const tick = (now) => {
      if (paused.current) { raf.current = requestAnimationFrame(tick); return; }
      const elapsed = now - start.current;
      const pct     = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setActive(i => (i + 1) % STEPS.length);
        setProgress(0);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  const step = STEPS[active];

  return (
    <section className={`${styles.hero} bg-grid bg-grid-fade`}>
      <div className={`container ${styles.inner}`}>

        {/* ── LEFT: Copy ───────────────────────────────────────────────── */}
        <motion.div
          className={styles.left}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={item}>
            <span className="eyebrow">
              Offline-first · Windows 7+ · Buy once
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className={styles.headline}>
            Built for{" "}
            <span className={styles.typeWrap}>
              <span className={styles.typed}>{typed}</span>
              <span className={styles.caret} aria-hidden="true" />
            </span>
            {" "}—{" "}
            <span className="text-gradient">not for servers</span>
          </motion.h1>

          {/* Walkthrough indicator */}
          <motion.div variants={item} className={styles.walkthrough}>
            <p className={styles.walkthroughLabel}>
              <ChevronRight size={12} strokeWidth={2.5} />
              Now in the walkthrough
            </p>

            <div className={styles.steps}>
              {STEPS.map((s, i) => {
                const isActive = i === active;
                const isDone   = i < active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`${styles.step} ${isActive ? styles.stepActive : ""} ${isDone ? styles.stepDone : ""}`}
                    onClick={() => { setActive(i); setProgress(0); }}
                  >
                    <span className={styles.stepDot} />
                    <span className={styles.stepLabel}>{s.label}</span>
                    {isActive && (
                      <span className={styles.stepBar}>
                        <motion.span
                          key={active}
                          className={styles.stepBarFill}
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress * 100}%` }}
                          transition={{ duration: 0 }}
                          style={{ width: `${progress * 100}%` }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Description updates with each step */}
            <AnimatePresence mode="wait">
              <motion.p
                key={step.id}
                className={styles.stepDesc}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {step.desc}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className={styles.ctas}>
            <Link href="#pricing" className="btn btn-accent btn-lg">
              Download free
              <ArrowRight size={15} strokeWidth={2.25} />
            </Link>
            <Link href="#showcase" className="btn btn-secondary btn-lg">
              See full product tour
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={item} className={styles.trust}>
            <span className={styles.trustItem}>
              <ShieldCheck size={13} strokeWidth={2.25} />
              Data never leaves your PC
            </span>
            <span className={styles.trustDivider} />
            <span className={styles.trustItem}>
              <HardDrive size={13} strokeWidth={2.25} />
              SQLite, no server
            </span>
            <span className={styles.trustDivider} />
            <span className={styles.trustItem}>No subscription, ever</span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Video window ──────────────────────────────────────── */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 48, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow */}
          <div className={styles.glow} aria-hidden="true" />

          {/* App window frame */}
          <div
            className={styles.frame}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
          >
            {/* Window chrome */}
            <div className={styles.chrome}>
              <div className={styles.dots}>
                <span className={styles.dr} />
                <span className={styles.dy} />
                <span className={styles.dg} />
              </div>
              <span className={styles.chromeTitle}>
                POS-it System — Life Pharmacy
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={step.id}
                  className={styles.chromePill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className={styles.pillDot} />
                  {step.label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Video */}
            <div className={styles.videoWrap}>
              <video
                className={styles.video}
                src="/hero-demo.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className={styles.videoFade} />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
