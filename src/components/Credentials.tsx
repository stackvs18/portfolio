"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { credentials } from "@/lib/data";

const SketchScene3 = dynamic(() => import("./SketchScene3"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Credentials() {
  return (
    <section data-theme="blue" className="relative py-24 sm:py-32 px-6 sm:px-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <SketchScene3 tone="dark" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="eyebrow mb-4"
        >
          Certifications & Honors
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="font-[var(--font-display)] font-semibold tracking-tight text-3xl sm:text-4xl mb-12"
        >
          Proof I follow through.
        </motion.h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 border-t border-l"
          style={{ borderColor: "var(--page-line)" }}
        >
          {credentials.map((c, i) => (
            <motion.div
              key={c.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeUp}
              transition={{ delay: (i % 2) * 0.06 }}
              className="border-r border-b p-6"
              style={{ borderColor: "var(--page-line)" }}
            >
              <p className="text-sm font-medium mb-1">{c.title}</p>
              <p className="text-xs font-mono" style={{ color: "var(--page-muted)" }}>
                {c.org} · {c.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
