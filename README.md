# Shruti Rai — Cinematic Portfolio

An editorial, cinematic portfolio that **scrolls like a real website** — natural flowing sections with a couple of signature camera moments, not a site where everything is a zoom.

The experience opens directly with **SHRUTI RAI** (no initials hero) and the one big pinned camera move — a **whole-screen zoom into the "A"** — before settling into a normal, premium editorial scroll through About, Tech Stack, Projects, Fun Facts and Contact.

## The journey

| Scene | What happens |
| --- | --- |
| 0 · Loading | Minimal cinematic preloader (fonts + images preloaded), curtain lifts |
| 1 · SHRUTI RAI | The name appears directly after the loader — large cinematic typography with drifting particles and floating dev-humor code snippets ("// works on my machine", "catch (error) { blameTheWiFi(); }"); the only pinned moment — a **real camera zoom into the "A"**: the whole composition scales around the letter, the other letters remain visible and drift to the edges, and the camera passes through the A |

| 3 · About Me | Photo (left) + description (right) with a pulsing green **OPEN TO WORK** badge |
| Transition 3 | A pinned camera **zooms into OPEN TO WORK** and passes through it into the Tech Stack |
| 4 · Tech Stack | **Capability index** (OKC-style) — one editorial row per domain (Languages, Web & Frontend, Backend & Data, Security & Systems, Tools & Core); rows **slide in from alternate directions**, converging to the center as you scroll |
| 5 · Projects | **Editorial project index** (Studio Foundry pattern) — numbered rows entering from **alternate directions** under a CA Film Creatives-style "by the numbers" stat band. **EXPLORE opens a dedicated project page** (`#/project/01` …) with the full story, highlights, tech, and live + GitHub links at the end |
| 6 · Fun Facts | **Kinetic editorial scrapbook** — the anime portrait anchored in a collage of rotated, drifting, verified facts |
| 7 · Contact | **Final transmission** — a clean, premium centered composition: "Let's create something." with one refined link list (GitHub · LinkedIn · Instagram · Email · LeetCode · TryHackMe) and a small **S.R.** bookend closing the loop |

Everything is scroll-driven with GSAP ScrollTrigger and fully reversible.

## Tech

- **GSAP + ScrollTrigger** — scroll-driven timeline for the pinned A-zoom, the OPEN TO WORK zoom, and reveal animations (Lenis-synced)
- **Lenis** — smooth inertial scrolling
- **React + Vite** — component-per-scene, no unnecessary re-renders
- Typography: **Playfair Display** (display serif — hero, headings, editorial accents) × **Manrope** (body, UI, micro-labels) via Google Fonts
- The whole palette is **derived from the provided background image** (deep indigo / violet night) — see `scripts/sample-colors.mjs`
- Images optimized to WebP (originals kept as source assets)

## Run it

```bash
npm install
npm run dev      # develop at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

`npm run optimize:images` regenerates the WebP assets from the source PNGs via `scripts/optimize-images.mjs`.

## Notes

- All content is sourced from the résumé, GitHub profile and public profiles — nothing is invented.
- `prefers-reduced-motion` and small screens get a simplified experience (reduced zoom, tuned typography) without losing the story.
- In development, `window.__journey` + `window.__lenis` are exposed for deterministic timeline inspection.

© 2026 Shruti Rai
