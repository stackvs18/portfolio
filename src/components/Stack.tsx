"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { stack } from "@/lib/data";

const SketchScene2 = dynamic(() => import("./SketchScene2"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Stack() {
  return (
    <section id="stack" data-theme="ink" className="relative py-24 sm:py-32 px-6 sm:px-10 overflow-hidden">
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-[420px] h-[420px] opacity-25">
        <SketchScene2 tone="dark" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="eyebrow mb-4"
        >
          Toolbox
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="font-[var(--font-display)] font-semibold tracking-tight text-3xl sm:text-4xl mb-12"
        >
          What I reach for.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border" style={{ borderColor: "var(--page-line)" }}>
          {stack.map((group, i) => (
            <motion.div
              key={group.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="p-6 sm:p-7"
              style={{ background: "color-mix(in srgb, var(--page-fg) 3%, transparent)" }}
            >
              <p
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: "var(--signal-strong)" }}
              >
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-x-2 gap-y-1.5 text-sm" style={{ color: "var(--page-muted)" }}>
                {group.items.map((item, idx) => (
                  <li key={item}>
                    {item}
                    {idx < group.items.length - 1 && <span className="mx-1.5 opacity-40">/</span>}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
