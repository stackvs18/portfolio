"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

const SketchScene = dynamic(() => import("./SketchScene"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Projects() {
  return (
    <section
      id="projects"
      data-theme="ink"
      className="relative py-28 sm:py-36 px-6 sm:px-10"
    >
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <SketchScene tone="dark" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="flex items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-3xl sm:text-5xl">
              Things I built
            </h2>
          </div>
          <span
            className="hidden sm:block text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--page-muted)" }}
          >
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </motion.div>

        <div className="space-y-6">
          {projects.map((p) => (
            <motion.article
              key={p.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className="group relative rounded-2xl border p-7 sm:p-10 transition-colors"
              style={{ borderColor: "var(--page-line)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x,50%) var(--y,50%), var(--signal-soft), transparent 60%)",
                }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start">
                <span
                  className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold"
                  style={{ color: "var(--page-accent)" }}
                >
                  {p.index}
                </span>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <h3 className="text-xl sm:text-2xl font-semibold font-[var(--font-display)]">
                      {p.name}
                    </h3>
                    <span
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{ color: "var(--page-accent-strong)" }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <p
                    className="text-sm sm:text-base leading-relaxed mb-5"
                    style={{ color: "var(--page-muted)" }}
                  >
                    {p.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {p.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed"
                        style={{ color: "var(--page-muted)" }}
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--page-accent)" }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border px-3 py-1 text-xs font-mono"
                        style={{ borderColor: "var(--page-line-strong)", color: "var(--page-muted)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3 lg:items-end">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--page-accent)] transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
