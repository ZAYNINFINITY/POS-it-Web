"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Zap } from "lucide-react";
import styles from "./Pricing.module.css";

const PLANS = [
  {
    name: "Free",
    price: "Rs 0",
    period: "forever",
    desc: "One counter, one device, no time limit.",
    badge: null,
    features: [
      "1 device activation",
      "Unlimited products & sales",
      "Thermal & A4 receipts",
      "CSV inventory import",
      "Basic reporting",
      "Community support",
    ],
    cta: "Download free",
    ctaVariant: "btn-secondary",
    href: "#",
  },
  {
    name: "Pro",
    price: "Rs 4,500",
    period: "one-time per device",
    desc: "For shops running more than one till.",
    badge: "Most popular",
    features: [
      "Everything in Free",
      "Up to 3 device activations",
      "Customer ledger & udhar tracking",
      "Role-based staff accounts",
      "WhatsApp receipt sharing",
      "Priority email support",
      "Free updates for 1 year",
    ],
    cta: "Get Pro",
    ctaVariant: "btn-accent",
    href: "#",
    featured: true,
  },
  {
    name: "Business",
    price: "Custom",
    period: "volume pricing",
    desc: "Multi-branch retailers and distributors.",
    badge: null,
    features: [
      "Everything in Pro",
      "Unlimited device activations",
      "Multi-branch inventory sync",
      "White-label receipts",
      "Dedicated onboarding call",
      "SLA support",
    ],
    cta: "Talk to us",
    ctaVariant: "btn-secondary",
    href: "mailto:sales@pos-it.app",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const card = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Pricing</span>
          <h2 className={styles.headingTitle}>
            Buy once.{" "}
            <span className="text-gradient">Own it forever.</span>
          </h2>
          <p className={styles.headingSub}>
            No subscriptions, no per-sale fees, no renewal reminders.
            Pay once per device and the license is permanently yours.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={card}
              className={`${styles.pricingCard} ${plan.featured ? styles.featured : ""}`}
            >
              {plan.badge && (
                <div className={styles.badgeRow}>
                  <span className={styles.badge}>
                    <Zap size={11} strokeWidth={2.5} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={styles.cardTop}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.desc}</p>

                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>/ {plan.period}</span>
                </div>
              </div>

              <Link
                href={plan.href}
                className={`btn ${plan.ctaVariant} ${styles.cta}`}
              >
                {plan.cta}
                <ArrowRight size={14} strokeWidth={2.25} />
              </Link>

              <ul className={styles.featureList}>
                {plan.features.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <Check size={14} strokeWidth={2.5} className={styles.check} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <p className={styles.footnote}>
          All plans include a 4-step guided setup wizard, local SQLite storage,
          and no data sent to external servers — ever.
        </p>
      </div>
    </section>
  );
}
