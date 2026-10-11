"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { aboutCopy } from "@/lib/data";

const SketchScene = dynamic(() => import("./SketchScene"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function About() {
  return (
    <section
      id="about"
      data-theme="paper"
      className="relative py-28 sm:py-36 px-6 sm:px-10 overflow-hidden"
    >
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="eyebrow mb-6"
        >
          {aboutCopy.eyebrow}
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="font-[var(--font-display)] font-semibold tracking-tight text-3xl sm:text-5xl leading-[1.05] max-w-3xl"
        >
          {aboutCopy.heading}
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-12">
          {/* text column — the wireframe sits behind just this column */}
          <div className="relative space-y-6">
            <div className="absolute -inset-x-6 -inset-y-10 -z-0 opacity-60 pointer-events-none">
              <SketchScene />
            </div>
            {aboutCopy.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="relative text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--page-muted)" }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="space-y-6">
            <motion.dl
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              className="h-fit rounded-2xl border p-6 space-y-4 backdrop-blur-sm"
              style={{
                borderColor: "var(--page-line-strong)",
                background: "color-mix(in srgb, var(--page-bg) 55%, transparent)",
              }}
            >
              {aboutCopy.meta.map((m) => (
                <div key={m.label} className="flex items-baseline justify-between gap-4">
                  <dt
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: "var(--page-muted)" }}
                  >
                    {m.label}
                  </dt>
                  <dd className="text-sm font-medium text-right">{m.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden border shadow-xl"
              style={{ borderColor: "var(--page-line)" }}
            >
              <Image
                src="/mockups/mockup-3.webp"
                alt="Seize the unexpected — brand concept"
                width={1600}
                height={1185}
                className="w-full h-auto"
                sizes="(min-width: 1024px) 26vw, 60vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
