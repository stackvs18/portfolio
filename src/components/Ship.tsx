"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { shipCopy } from "@/lib/data";

const SketchScene3 = dynamic(() => import("./SketchScene3"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Ship() {
  return (
    <section data-theme="paper" className="relative py-28 sm:py-36 px-6 sm:px-10 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <SketchScene3 color="#000000" />
      </div>
      <div className="relative mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
        <div className="relative h-[320px] sm:h-[380px] order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 bottom-0 w-[85%] rounded-2xl overflow-hidden border shadow-2xl"
            style={{ borderColor: "var(--page-line)" }}
          >
            <Image
              src="/mockups/mockup-5.webp"
              alt="Product concept — MacBook"
              width={1600}
              height={1168}
              className="w-full h-auto"
              sizes="(min-width: 1024px) 34vw, 70vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 w-[36%] rounded-2xl overflow-hidden border shadow-2xl"
            style={{ borderColor: "var(--page-line)" }}
          >
            <Image
              src="/mockups/mockup-4.webp"
              alt="Product concept — mobile"
              width={1600}
              height={1185}
              className="w-full h-auto"
              sizes="(min-width: 1024px) 15vw, 30vw"
            />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="order-1 lg:order-2"
        >
          <p className="eyebrow mb-5">{shipCopy.eyebrow}</p>
          <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-3xl sm:text-5xl leading-[1.05] mb-6">
            {shipCopy.heading}
          </h2>
          {shipCopy.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base sm:text-lg leading-relaxed mb-4 max-w-lg"
              style={{ color: "var(--page-muted)" }}
            >
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
