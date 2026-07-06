"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShoppingCart,
  Package,
  BarChart3,
  FileText,
  Users,
  Circle,
} from "lucide-react";
import styles from "./ProductMockup.module.css";

const TABS = [
  {
    id: "sell",
    label: "Sell",
    icon: ShoppingCart,
    src: "/screenshots/app/sell.png",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    src: "/screenshots/app/products.png",
  },
  {
    id: "stock",
    label: "Stock",
    icon: BarChart3,
    src: "/screenshots/app/stock.png",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    src: "/screenshots/app/reports.png",
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: FileText,
    src: "/screenshots/app/invoices.png",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    src: "/screenshots/app/customers.png",
  },
];

export default function ProductMockup() {
  const [active, setActive] = useState("sell");
  const tab = TABS.find((t) => t.id === active);

  return (
    <div className={styles.frame}>
      <div className={styles.titlebar}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.titleText}>POS-it — Life Pharmacy</span>
        <span className={styles.statusPill}>
          <Circle size={6} fill="currentColor" strokeWidth={0} />
          Offline mode
        </span>
      </div>

      <div className={styles.tabRow}>
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => setActive(t.id)}
            >
              <Icon size={14} strokeWidth={2.25} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className={styles.screenWrap}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.src}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={styles.screen}
          >
            <Image
              src={tab.src}
              alt={`POS-it ${tab.label} screen`}
              fill
              sizes="(max-width: 1040px) 100vw, 1040px"
              className={styles.screenImg}
              priority={tab.id === "sell"}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
