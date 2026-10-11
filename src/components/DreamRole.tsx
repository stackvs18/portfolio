"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { dreamRoleCopy } from "@/lib/data";

const SketchScene3 = dynamic(() => import("./SketchScene3"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function DreamRole() {
  return (
    <section data-theme="blue" className="relative py-28 sm:py-36 px-6 sm:px-10 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <SketchScene3 tone="dark" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="relative mx-auto max-w-2xl text-center"
      >
        <p className="eyebrow mb-5 justify-center flex">{dreamRoleCopy.eyebrow}</p>
        <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-3xl sm:text-5xl leading-[1.05] mb-6">
          {dreamRoleCopy.heading}
        </h2>
        {dreamRoleCopy.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-base sm:text-lg leading-relaxed mb-4"
            style={{ color: "var(--page-muted)" }}
          >
            {p}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
