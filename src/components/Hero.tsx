"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { heroCopy, profile, gmailComposeLink } from "@/lib/data";

const SketchScene3 = dynamic(() => import("./SketchScene3"), { ssr: false });

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  return (
    <section
      id="top"
      data-theme="ink"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 sm:px-10 pt-28 pb-16 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 18%, var(--signal-soft), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute -right-24 top-16 w-[480px] h-[480px] opacity-40">
        <SketchScene3 tone="dark" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-5xl mx-auto w-full"
      >
        <motion.p variants={item} className="eyebrow mb-6">
          {heroCopy.eyebrow}
        </motion.p>

        <h1 className="font-[var(--font-display)] font-semibold tracking-tight text-[13vw] sm:text-[7vw] lg:text-[5.4rem] leading-[0.98]">
          {heroCopy.headlineLines.map((line, i) => {
            const isLast = i === heroCopy.headlineLines.length - 1;
            const words = line.split(" ");
            return (
              <motion.span key={i} variants={item} className="block">
                {words.map((w, j) => {
                  const isAccent = isLast && j === words.length - 1;
                  return (
                    <span key={j} style={isAccent ? { color: "var(--signal)" } : undefined}>
                      {w}{" "}
                    </span>
                  );
                })}
              </motion.span>
            );
          })}
        </h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--page-muted)" }}
        >
          {heroCopy.sub}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={heroCopy.cta.href}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--signal)", color: "#fff" }}
          >
            {heroCopy.cta.label}
            <ArrowDown size={15} />
          </a>

          <div className="flex items-center gap-3">
            <SocialLink href={profile.github} label="GitHub">
              <GithubIcon size={16} />
            </SocialLink>
            <SocialLink href={profile.linkedin} label="LinkedIn">
              <LinkedinIcon size={16} />
            </SocialLink>
            <SocialLink href={gmailComposeLink()} label="Email">
              <Mail size={16} />
            </SocialLink>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="relative mx-auto mt-16 flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-50"
      >
        scroll
        <span className="inline-block h-8 w-px animate-pulse" style={{ background: "var(--page-fg)" }} />
      </motion.div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
      style={{ borderColor: "var(--page-line-strong)" }}
    >
      {children}
    </a>
  );
}
