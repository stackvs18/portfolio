# Vraj Patel — Portfolio

Built with Next.js 16 (App Router) + TypeScript + Tailwind v4, Framer Motion, GSAP/ScrollTrigger,
and React Three Fiber. Fonts are self-hosted via Fontsource (Space Grotesk / Inter / JetBrains Mono)
— no runtime call to Google Fonts, so builds work offline and behind proxies.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. First load shows the terminal boot sequence — press Enter or click the
prompt to zoom into the site.

```bash
npm run build && npm run start   # production build
```

## Structure

```
src/
  app/
    layout.tsx      # fonts + metadata
    page.tsx         # assembles the whole page
    globals.css       # design tokens (colors, fonts) as CSS variables
  components/
    TerminalIntro.tsx # boot-sequence overlay, gates the rest of the page
    ThemeScroller.tsx # scrubs --page-bg/--page-fg smoothly at ink<->paper section boundaries
    Nav.tsx
    Hero.tsx           # data-theme="ink"
    About.tsx          # data-theme="paper" — has the 3D wireframe sketch
    SketchScene.tsx    # React Three Fiber wireframe (dynamically imported, ssr:false)
    Projects.tsx       # data-theme="ink"
    Stack.tsx
    Credentials.tsx
    Contact.tsx
    icons.tsx          # hand-written GitHub/LinkedIn marks (lucide-react dropped brand icons)
  lib/
    data.ts            # all copy + project/stack/credential content lives here
```

## How the theme transition works

Every section has `data-theme="ink"` or `data-theme="paper"`. `ThemeScroller` finds every place the
theme changes between consecutive sections and creates a GSAP ScrollTrigger over that section's entry
(`top 85%` → `top 35%`), interpolating the shared `--page-bg` / `--page-fg` / `--page-muted` /
`--page-line` CSS variables smoothly across it — so the color genuinely crossfades as you scroll,
instead of the page ever showing two colors split down the middle. Add a new section anywhere and
give it `data-theme`; the transition wiring is automatic.

## What to do before shipping

1. **Content**: `src/lib/data.ts` is the single source of truth — swap in real numbers/dates as they
   change (CGPA, new projects, new certifications).
2. **Links**: double-check `profile.github` / `profile.linkedin` in `data.ts` are current.
3. **OG image / favicon**: add `app/icon.png` and `app/opengraph-image.png` for link previews.
4. **Mobile QA**: built mobile-first with Tailwind breakpoints, but give the terminal intro and the
   Projects cards a manual pass on a real phone — animation timing sometimes needs to shrink on touch.
5. **Deploy**: this is a stock Next.js app — push to GitHub and import into Vercel, or
   `vercel --prod` from this folder.

## Known trade-offs

- The 3D sketch in About is a plain wireframe icosahedron/torus (kept intentionally light — no
  textures, no post-processing) to protect scroll performance. Swap the geometry in `SketchScene.tsx`
  if you want something more elaborate.
- ESLint flags two `react-hooks/exhaustive-deps` warnings in `TerminalIntro.tsx` — both are
  intentional (a ref array used only for cleanup, and a stable local function); safe to ignore.
