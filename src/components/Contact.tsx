"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile, gmailComposeLink } from "@/lib/data";

const SketchScene2 = dynamic(() => import("./SketchScene2"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Contact() {
  return (
    <section
      id="contact"
      data-theme="paper"
      className="relative pt-24 sm:pt-32 pb-10 px-6 sm:px-10"
    >
      <div className="pointer-events-none absolute -left-16 top-10 w-[400px] h-[400px] opacity-25">
        <SketchScene2 tone="light" />
      </div>
      <div className="relative mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.6fr] gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          <p className="eyebrow mb-6">Get in touch</p>
          <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-4xl sm:text-6xl leading-[1.02] max-w-2xl">
            Got something worth building?
          </h2>

          <a
            href={gmailComposeLink("Let's work together")}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-3 text-lg sm:text-2xl font-medium border-b pb-1 transition-colors hover:opacity-60 transition-opacity"
            style={{ borderColor: "var(--page-line-strong)" }}
          >
            {profile.email}
            <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} />
          </a>

          <p className="mt-4 text-sm" style={{ color: "var(--page-muted)" }}>
            {profile.location} · {profile.phone}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block rounded-2xl overflow-hidden border shadow-2xl"
          style={{ borderColor: "var(--page-line)" }}
        >
          <Image
            src="/mockups/mockup-1.webp"
            alt="Vraj brand mark"
            width={1600}
            height={2033}
            className="w-full h-auto"
            sizes="(min-width: 1024px) 26vw, 50vw"
          />
        </motion.div>
      </div>

      <div className="mx-auto max-w-5xl">
        <div
          className="mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t pt-8"
          style={{ borderColor: "var(--page-line)" }}
        >
          <p className="text-xs font-mono" style={{ color: "var(--page-muted)" }}>
            © {new Date().getFullYear()} Vraj Patel. Built from scratch.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              <GithubIcon size={14} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
