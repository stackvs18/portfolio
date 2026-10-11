"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ThemeName = "ink" | "paper" | "blue";

const THEMES: Record<
  ThemeName,
  {
    bg: string;
    fg: string;
    muted: string;
    accent: string;
    accentStrong: string;
    line: string;
    lineStrong: string;
  }
> = {
  ink: {
    bg: "#000000",
    fg: "#ffffff",
    muted: "#8b909a",
    accent: "#3d63ff",
    accentStrong: "#6f8bff",
    line: "rgba(242,243,245,0.1)",
    lineStrong: "rgba(242,243,245,0.18)",
  },
  paper: {
    bg: "#ffffff",
    fg: "#000000",
    muted: "#5a5f66",
    accent: "#0000ff",
    accentStrong: "#3d63ff",
    line: "rgba(13,15,18,0.12)",
    lineStrong: "rgba(13,15,18,0.22)",
  },
  blue: {
    bg: "#0000ff",
    fg: "#ffffff",
    muted: "#c7ccff",
    accent: "#ffffff",
    accentStrong: "#ffffff",
    line: "rgba(255,255,255,0.22)",
    lineStrong: "rgba(255,255,255,0.36)",
  },
};

/**
 * Every section carries data-theme="ink" | "paper" | "blue". Whenever a
 * section's theme differs from the section before it, we scrub the shared
 * CSS custom properties smoothly across that section's entry instead of
 * hard-cutting.
 */
export default function ThemeScroller() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-theme]")
    );

    const triggers = sections
      .map((section, i) => {
        const to = section.dataset.theme as ThemeName;
        const prev = (sections[i - 1]?.dataset.theme as ThemeName) ?? "ink";
        if (to === prev) return null;

        const from = THEMES[prev];
        const target = THEMES[to];
        // A linear RGB blend between white and blue reads as muddy purple
        // mid-scroll, so any transition touching the blue theme snaps
        // instead of crossfading; ink<->paper transitions still blend smoothly.
        const involvesBlue = to === "blue" || prev === "blue";

        return ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          end: "top 35%",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            if (involvesBlue) {
              const snap = p > 0.5;
              root.style.setProperty("--page-bg", snap ? target.bg : from.bg);
              root.style.setProperty("--page-fg", snap ? target.fg : from.fg);
              root.style.setProperty("--page-muted", snap ? target.muted : from.muted);
              root.style.setProperty("--page-accent", snap ? target.accent : from.accent);
              root.style.setProperty(
                "--page-accent-strong",
                snap ? target.accentStrong : from.accentStrong
              );
            } else {
              root.style.setProperty("--page-bg", mixHex(from.bg, target.bg, p));
              root.style.setProperty("--page-fg", mixHex(from.fg, target.fg, p));
              root.style.setProperty("--page-muted", mixHex(from.muted, target.muted, p));
              root.style.setProperty("--page-accent", mixHex(from.accent, target.accent, p));
              root.style.setProperty(
                "--page-accent-strong",
                mixHex(from.accentStrong, target.accentStrong, p)
              );
            }
            root.style.setProperty("--page-line", p > 0.5 ? target.line : from.line);
            root.style.setProperty(
              "--page-line-strong",
              p > 0.5 ? target.lineStrong : from.lineStrong
            );
          },
        });
      })
      .filter(Boolean);

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  return null;
}

function mixHex(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
