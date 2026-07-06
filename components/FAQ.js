"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";

const QUESTIONS = [
  {
    q: "Does POS-it really work with no internet at all?",
    a: "Yes — completely. Billing, inventory, customer ledger, and reporting all run against a local SQLite database on your machine. Internet is only used for optional features like WhatsApp receipt sharing or cloud backup. Everything else works offline, indefinitely.",
  },
  {
    q: "What happens to my data if I reinstall Windows or switch PCs?",
    a: "Your database is a single file you control. Back it up to a USB drive or any folder from Settings → Backup, then restore it on the new machine in one click. Nothing is locked behind a server you don't own.",
  },
  {
    q: "Is the Free plan actually free, or is it a trial?",
    a: "It is free, permanently, for one device. No credit card required, no expiry date, no feature cut-off after 14 days. Pro adds multi-device activations, customer ledger, and staff roles if your shop grows.",
  },
  {
    q: "Can I import my existing inventory from Excel or Google Sheets?",
    a: "Yes. Export your sheet as a CSV file, then drop it into the setup wizard or the Inventory section. POS-it detects column headers automatically and lets you map them if the names differ. Categories are created for you.",
  },
  {
    q: "What hardware does POS-it need?",
    a: "Windows 7 and above, including 32-bit systems. A Core 2 Duo with 4 GB RAM is enough — POS-it was deliberately kept lightweight so you don't need to upgrade just to run your shop software. 80mm thermal printers and standard A4 printers are both supported.",
  },
  {
    q: "How does the udhar (credit) tracking work?",
    a: "Add a customer, then mark any sale as a credit sale. POS-it records the outstanding balance against that customer and shows it on the Credit Sales screen. You can log partial payments and see a full history per customer — no separate ledger notebook needed.",
  },
  {
    q: "Can multiple staff members log in with separate accounts?",
    a: "Free includes a single admin account. Pro and Business plans add role-based accounts — admin and cashier roles — each with their own login and a full activity trail tied to every sale they process.",
  },
  {
    q: "Does the license work if I buy a new computer?",
    a: "Licenses are tied to a device activation, not a hardware fingerprint. If you replace your machine, contact support and we'll transfer the activation. Pro allows up to 3 simultaneous activations so both your counter and back-office PC are covered.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">FAQ</span>
          <h2 className={styles.headingTitle}>Questions, answered honestly</h2>
          <p className={styles.headingSub}>
            If something isn&apos;t covered here, email us at{" "}
            <a href="mailto:support@pos-it.app" style={{ color: "var(--accent)" }}>
              support@pos-it.app
            </a>
          </p>
        </motion.div>

        <div className={styles.list} role="list">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                className={styles.item}
                role="listitem"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  className={`${styles.question} ${isOpen ? styles.questionOpen : ""}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.chevron}
                  >
                    <ChevronDown size={17} strokeWidth={2.25} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.answerWrap}
                    >
                      <p className={styles.answer}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
