"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./StatsBar.module.css";

const STATS = [
  { value: 17,   suffix: "+",   label: "Modules built-in",  desc: "Sell, Stock, Invoices, Udhar, Reports, and more"  },
  { value: 100,  suffix: "%",   label: "Offline capable",   desc: "PTCL down? Load shedding? POS-it doesn't care"    },
  { value: 4.3,  suffix: " MB", label: "Installer size",    desc: "Fits on a USB with room to spare"                 },
  { value: 0,    suffix: "/-",  label: "Monthly fee",       desc: "Pay once per device. No renewals, ever."          },
];

function CountUp({ to, suffix, duration = 1.5 }) {
  const [val, setVal] = useState(0);
  const ref           = useRef(null);
  const inView        = useInView(ref, { once: true, margin: "-80px" });
  const isDecimal     = to % 1 !== 0;

  useEffect(() => {
    if (!inView || to === 0) { setVal(to); return; }
    const start = performance.now();
    const tick  = (now) => {
      const t    = Math.min((now - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const cur  = to * ease;
      setVal(isDecimal ? Math.round(cur * 10) / 10 : Math.round(cur));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration, isDecimal]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function StatsBar() {
  return (
    <section className={styles.bar} aria-label="Product highlights">
      <div className="container">
        <div className={styles.dividerTop} />
        <div className={styles.grid} role="list">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.stat}
              role="listitem"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={i}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className={styles.value}>
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className={styles.label}>{s.label}</div>
              <div className={styles.desc}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className={styles.dividerBottom} />
      </div>
    </section>
  );
}
