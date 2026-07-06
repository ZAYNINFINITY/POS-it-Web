"use client";

import { motion } from "framer-motion";
import {
  WifiOff, HardDrive, Receipt, PackageSearch,
  Users, ShieldCheck, Zap, FileSpreadsheet, ArrowRight,
} from "lucide-react";
import styles from "./FeaturesBento.module.css";

// Parent stagger — one cohesive animation wave for the whole grid
const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const cell = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturesBento() {
  return (
    <section id="features" className={`section ${styles.section}`}>
      <div className="container">

        {/* Heading */}
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Why POS-it</span>
          <h2 className={styles.headingTitle}>
            Built for the shop floor,{" "}
            <span className="text-gradient">not a server room</span>
          </h2>
          <p className={styles.headingSub}>
            Every feature exists because a real business needed it — not
            because it looked good in a pitch deck.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className={styles.grid}
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >

          {/* ── Hero cell: Offline ── */}
          <motion.div
            variants={cell}
            className={`${styles.cell} ${styles.cellLarge} ${styles.cellOffline}`}
          >
            <div className={`${styles.cellIcon} ${styles.iconTeal}`}>
              <WifiOff size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Zero internet dependency</h3>
            <p className={styles.cellText}>
              Process sales, adjust stock, and print receipts with the router
              unplugged. PTCL outage, load shedding — POS-it keeps running.
            </p>

            {/* Real offline status indicator — not placeholder bars */}
            <div className={styles.statusCard} aria-hidden="true">
              <div className={styles.statusHeader}>
                <span className={styles.statusBadge}>
                  <span className={styles.statusDotRed} />
                  No internet
                </span>
                <span className={styles.statusBadgeGreen}>
                  <span className={styles.statusDotGreen} />
                  POS-it running
                </span>
              </div>
              <div className={styles.statusRows}>
                {[
                  ["Local database",  "● Active",  true ],
                  ["Receipt printer", "● Ready",   true ],
                  ["Inventory sync",  "● Local",   true ],
                  ["Cloud backup",    "— Offline", false],
                ].map(([label, status, ok]) => (
                  <div key={label} className={styles.statusRow}>
                    <span className={styles.statusLabel}>{label}</span>
                    <span className={ok ? styles.statusOk : styles.statusOff}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Your data ── */}
          <motion.div variants={cell} className={`${styles.cell} ${styles.cellData}`}>
            <div className={`${styles.cellIcon} ${styles.iconBlue}`}>
              <HardDrive size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Your data, your machine</h3>
            <p className={styles.cellText}>
              SQLite database lives on your PC. Nothing sent to a server you
              don't control. One-click backup to USB.
            </p>
            <div className={styles.dbBadge} aria-hidden="true">
              <span className={styles.dbDot} />
              <span className={styles.dbPath}>C:\Users\...\POS-it\pos-it.db</span>
            </div>
          </motion.div>

          {/* ── Receipts ── */}
          <motion.div variants={cell} className={styles.cell}>
            <div className={`${styles.cellIcon} ${styles.iconAmber}`}>
              <Receipt size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Thermal &amp; A4 receipts</h3>
            <p className={styles.cellText}>
              80mm thermal for the counter, full A4 invoice for business
              clients. Share either over WhatsApp in one tap.
            </p>
            <div className={styles.receiptPreview} aria-hidden="true">
              <div className={styles.receiptLine}>
                <span>2x Paracetamol 500mg</span><span>Rs 60</span>
              </div>
              <div className={styles.receiptLine}>
                <span>1x Surgical mask (box)</span><span>Rs 250</span>
              </div>
              <div className={styles.receiptDivider} />
              <div className={`${styles.receiptLine} ${styles.receiptTotal}`}>
                <span>Total</span><span>Rs 310</span>
              </div>
            </div>
          </motion.div>

          {/* ── Inventory (wide) ── */}
          <motion.div variants={cell} className={`${styles.cell} ${styles.cellWide}`}>
            <div className={`${styles.cellIcon} ${styles.iconTeal}`}>
              <PackageSearch size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Inventory that catches mistakes early</h3>
            <p className={styles.cellText}>
              Low-stock alerts, barcode scanning, variant tracking by size and
              brand, and bulk import from any spreadsheet — auto-detected
              column mapping included.
            </p>
            <div className={styles.miniStatRow} aria-hidden="true">
              <div className={styles.miniStat}>
                <span className={styles.miniStatLabel}>Low stock</span>
                <span className={`${styles.miniStatValue} ${styles.amber}`}>7</span>
              </div>
              <div className={styles.miniStat}>
                <span className={styles.miniStatLabel}>Out of stock</span>
                <span className={`${styles.miniStatValue} ${styles.red}`}>3</span>
              </div>
              <div className={styles.miniStat}>
                <span className={styles.miniStatLabel}>Total SKUs</span>
                <span className={styles.miniStatValue}>1,240</span>
              </div>
            </div>
          </motion.div>

          {/* ── Udhar ── */}
          <motion.div variants={cell} className={styles.cell}>
            <div className={`${styles.cellIcon} ${styles.iconPurple}`}>
              <Users size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Customer ledger built-in</h3>
            <p className={styles.cellText}>
              Track udhar balances, purchase history, and send WhatsApp
              reminders — no separate notebook needed.
            </p>
            <div className={styles.ledgerRows} aria-hidden="true">
              {[
                ["Ahmed Traders", "Rs 4,200"],
                ["Zainab Fatima", "Rs 1,850"],
              ].map(([name, balance]) => (
                <div key={name} className={styles.ledgerRow}>
                  <span className={styles.ledgerName}>{name}</span>
                  <span className={styles.ledgerBalance}>{balance}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CSV import ── */}
          <motion.div variants={cell} className={styles.cell}>
            <div className={`${styles.cellIcon} ${styles.iconTeal}`}>
              <FileSpreadsheet size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Import without the headache</h3>
            <p className={styles.cellText}>
              Drop in any CSV. POS-it detects columns automatically and
              merges without creating duplicates.
            </p>
            <div className={styles.mapRow} aria-hidden="true">
              <span className={styles.mapPill}>Item Name</span>
              <ArrowRight size={11} strokeWidth={2} className={styles.mapArrow} />
              <span className={styles.mapPillMatched}>name</span>
            </div>
            <div className={styles.mapRow} aria-hidden="true">
              <span className={styles.mapPill}>Sale Price</span>
              <ArrowRight size={11} strokeWidth={2} className={styles.mapArrow} />
              <span className={styles.mapPillMatched}>selling_price</span>
            </div>
          </motion.div>

          {/* ── Roles ── */}
          <motion.div variants={cell} className={styles.cell}>
            <div className={`${styles.cellIcon} ${styles.iconBlue}`}>
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Role-based access</h3>
            <p className={styles.cellText}>
              Admin and cashier roles, separate logins, and a full activity
              trail for every sale made.
            </p>
            <div className={styles.roleBadges} aria-hidden="true">
              <span className={styles.roleBadge}>
                <span className={styles.roleDotAdmin} />
                Admin · full access
              </span>
              <span className={styles.roleBadge}>
                <span className={styles.roleDotCashier} />
                Cashier · till only
              </span>
            </div>
          </motion.div>

          {/* ── Hardware ── */}
          <motion.div variants={cell} className={styles.cell}>
            <div className={`${styles.cellIcon} ${styles.iconAmber}`}>
              <Zap size={18} strokeWidth={2} />
            </div>
            <h3 className={styles.cellTitle}>Runs on old hardware</h3>
            <p className={styles.cellText}>
              Core 2 Duo, 4GB RAM, 32-bit Windows — POS-it was built to
              be light, not require an upgrade.
            </p>
            <div className={styles.specRow} aria-hidden="true">
              <span className={styles.specBadge}>Core 2 Duo</span>
              <span className={styles.specBadge}>4GB RAM</span>
              <span className={styles.specBadge}>Win 7 32-bit</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
