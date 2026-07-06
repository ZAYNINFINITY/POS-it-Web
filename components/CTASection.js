"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.glow} aria-hidden="true" />

          <span className="eyebrow">Start today</span>

          <h2 className={styles.title}>
            Your shop deserves a POS that{" "}
            <span className="text-gradient">works as hard as you do</span>
          </h2>

          <p className={styles.body}>
            Free for one device, forever. No credit card, no trial period, no
            expiry date. Download, install, and start billing in under five
            minutes.
          </p>

          <div className={styles.actions}>
            <Link href="#pricing" className="btn btn-accent btn-lg">
              Download POS-it free
              <ArrowRight size={15} strokeWidth={2.25} />
            </Link>
            <Link href="mailto:support@pos-it.com" className="btn btn-secondary btn-lg">
              Talk to us first
            </Link>
          </div>

          <p className={styles.note}>
            Need to run on multiple computers?{" "}
            <Link href="#pricing" className={styles.noteLink}>
              See Pro & Business plans →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
