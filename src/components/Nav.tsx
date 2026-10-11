"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-10">
      <div
        className="mt-4 flex items-center justify-between rounded-xl border px-4 sm:px-5 py-3 backdrop-blur-md transition-colors duration-300"
        style={{
          borderColor: "var(--page-line)",
          background: "color-mix(in srgb, var(--page-bg) 55%, transparent)",
        }}
      >
        <a
          href="#top"
          className="font-[var(--font-display)] font-semibold text-sm sm:text-base tracking-tight whitespace-nowrap"
        >
          Vraj Patel<span style={{ color: "var(--signal)" }}>.</span>
        </a>

        <nav className="hidden sm:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-mono uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest rounded-lg px-3.5 py-2 transition-colors"
            style={{ background: "var(--signal)", color: "#fff" }}
          >
            Let&apos;s talk
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-lg border"
            style={{ borderColor: "var(--page-line)" }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden mt-2 rounded-xl border overflow-hidden backdrop-blur-md"
            style={{
              borderColor: "var(--page-line)",
              background: "color-mix(in srgb, var(--page-bg) 92%, transparent)",
            }}
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3.5 text-sm font-mono uppercase tracking-widest border-b last:border-b-0"
                style={{ borderColor: "var(--page-line)" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block px-5 py-3.5 text-sm font-mono uppercase tracking-widest"
              style={{ color: "var(--signal)" }}
            >
              Let&apos;s talk
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
