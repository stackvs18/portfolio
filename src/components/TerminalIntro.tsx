"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { terminalLines } from "@/lib/data";

const PROMPT = "vraj@folio ~ %";

type RenderedLine = {
  kind: "cmd" | "out";
  text: string;
};

export default function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [rendered, setRendered] = useState<RenderedLine[]>([]);
  const [typing, setTyping] = useState<{ text: string; kind: "cmd" | "out" } | null>(null);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let cancelled = false;

    async function run() {
      for (const line of terminalLines) {
        if (cancelled) return;
        await typeLine(line.text as string, line.type as "cmd" | "out");
        await wait(line.type === "cmd" ? 90 : 260);
      }
      if (!cancelled) setReady(true);
    }

    function wait(ms: number) {
      return new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.current.push(t);
      });
    }

    function typeLine(full: string, kind: "cmd" | "out") {
      return new Promise<void>((resolve) => {
        if (kind === "out") {
          // output prints instantly (real shells don't type their own stdout)
          setRendered((prev) => [...prev, { kind, text: full }]);
          resolve();
          return;
        }
        let i = 0;
        setTyping({ text: "", kind });
        const step = () => {
          i += 1;
          setTyping({ text: full.slice(0, i), kind });
          if (i < full.length) {
            const t = setTimeout(step, 28 + Math.random() * 35);
            timeouts.current.push(t);
          } else {
            setRendered((prev) => [...prev, { kind, text: full }]);
            setTyping(null);
            resolve();
          }
        };
        const t = setTimeout(step, 60);
        timeouts.current.push(t);
      });
    }

    run();
    return () => {
      cancelled = true;
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") enter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [ready]);

  function enter() {
    if (!ready || exiting) return;
    setExiting(true);
    document.body.style.overflow = "";
    const t = setTimeout(onComplete, 900);
    timeouts.current.push(t);
  }

  return (
    <AnimatePresence>
      <motion.div
        key="terminal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "#08090c" }}
        initial={{ opacity: 1 }}
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] as const }}
      >
          <motion.div
            className="w-full max-w-2xl rounded-xl border overflow-hidden shadow-2xl"
            style={{ borderColor: "rgba(242,243,245,0.14)", background: "#0c0d11" }}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={
              exiting
                ? { opacity: 0, scale: 8, filter: "blur(6px)" }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={
              exiting
                ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const }
                : { duration: 0.6, ease: "easeOut", delay: 0.1 }
            }
          >
            <div
              className="flex items-center gap-1.5 px-4 py-3 border-b"
              style={{ borderColor: "rgba(242,243,245,0.1)" }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
              <span
                className="ml-3 text-[11px]"
                style={{ fontFamily: "var(--font-mono)", color: "#8b909a" }}
              >
                folio.sh — bash
              </span>
            </div>

            <div
              className="px-5 py-6 text-[13px] sm:text-sm leading-relaxed min-h-[280px]"
              style={{ fontFamily: "var(--font-mono)", color: "#e7e9ec" }}
            >
              {rendered.map((line, idx) =>
                line.kind === "cmd" ? (
                  <div key={idx} className="mb-1">
                    <span style={{ color: "#3d63ff" }}>{PROMPT} </span>
                    <span>{line.text}</span>
                  </div>
                ) : (
                  <div key={idx} className="mb-3 pl-1" style={{ color: "#8b909a" }}>
                    {line.text}
                  </div>
                )
              )}

              {typing && (
                <div className="mb-1">
                  <span style={{ color: "#3d63ff" }}>{PROMPT} </span>
                  <span>{typing.text}</span>
                  <Cursor />
                </div>
              )}

              {ready && (
                <motion.button
                  onClick={enter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 flex items-center gap-2 text-left group"
                  style={{ color: "#e7e9ec" }}
                >
                  <span style={{ color: "#3d63ff" }}>{PROMPT}</span>
                  <span className="underline decoration-dotted underline-offset-4 group-hover:text-[#6f8bff] transition-colors">
                    press enter to continue
                  </span>
                  <Cursor />
                </motion.button>
              )}
            </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Cursor() {
  return (
    <span
      className="inline-block w-[7px] h-[15px] ml-0.5 align-middle animate-pulse"
      style={{ background: "#3d63ff" }}
    />
  );
}
