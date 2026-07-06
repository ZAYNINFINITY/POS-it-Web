"use client";

import { motion } from "framer-motion";
import { Download, Settings, ShoppingCart } from "lucide-react";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    icon: <Download size={22} strokeWidth={1.75} />,
    number: "01",
    title: "Download the installer",
    body: "4.3MB setup file. Runs on any Windows machine from 7 onwards — no prerequisites, no .NET frameworks, no admin drama. Double-click, next, done.",
  },
  {
    icon: <Settings size={22} strokeWidth={1.75} />,
    number: "02",
    title: "Run the 4-step wizard",
    body: "Enter your business name, set your invoice prefix, create your admin account, and choose whether to start with empty inventory or import from a CSV. Takes under two minutes.",
  },
  {
    icon: <ShoppingCart size={22} strokeWidth={1.75} />,
    number: "03",
    title: "Start selling, immediately",
    body: "Search a product by name, SKU, or barcode. It lands in the cart. Hit Complete Sale. That's it. POS-it prints the receipt and updates stock without asking for anything else.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Getting started</span>
          <h2 className={styles.title}>Up and running in under five minutes</h2>
          <p className={styles.sub}>
            No onboarding call. No IT department. No migration consultant.
            Install it yourself, like any other Windows program.
          </p>
        </motion.div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {i < STEPS.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepNum}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
