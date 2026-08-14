# Shruti Rai — Cinematic Portfolio

A portfolio that isn't a scrolling website — it's a **camera journey through one continuous visual world**.

The camera is the protagonist. You don't scroll through sections; you travel through them:

**S.R. → glass breaks → SHRUTI RAI → zoom into the "A" → pass through it → About → zoom into "OPEN TO WORK" → Tech Stack → Projects → Fun Facts → zoom into the anime portrait → Contact**

Every transition is a camera move on a single GSAP ScrollTrigger timeline — fully reversible, so scrolling back re-traverses the world in reverse.

## The journey

| Scene | What happens |
| --- | --- |
| 0 · Loading | Minimal cinematic preloader (fonts + images preloaded), curtain lifts |
| 1 · S.R. | First identity reveal — initials only, elegant and mysterious |
| Transition 1 | **Glass break** — fracture lines crack from center, shards fly outward with depth, revealing the name behind the broken pane. The glass then **leaves the frame completely** (the whole S.R. layer is removed — no cracks or fragments ever persist) |
| 2 · SHRUTI RAI | Large cinematic typography composition with drifting particles |
| Transition 2 | **Whole-screen camera zoom toward the "A"** — the entire composition scales, letters move to the edges, the camera passes through the A |
| 3 · About Me | Photo (left) + description (right) with a pulsing green **OPEN TO WORK** badge |
| Transition 3 | Camera zooms the whole About composition into the badge, then passes through it |
| 4 · Tech Stack | **Capability index** (OKC-style) — one editorial row per domain (Languages, Web & Frontend, Backend & Data, Security & Systems, Tools & Core) with a script label and a flowing technology cluster |
| Transition 4 | The rows **collapse into a single point**, then the camera zooms through it |
| 5 · Projects | **Editorial project index** (Studio Foundry pattern) — numbered rows with name, tagline, description, stack and an EXPLORE link, under a CA Film Creatives-style "by the numbers" stat band |
| Transition 5 | Camera zoom into the projects' center |
| 6 · Fun Facts | **Kinetic editorial scrapbook** — the anime portrait anchored in a collage of rotated, drifting, verified facts |
| Transition 6 | Camera zooms into the anime image and passes through it |
| 7 · Contact | **Final transmission** — an interactive radar signal with orbiting links; the camera then pulls back and a small **S.R.** closes the loop |

## Tech

- **GSAP + ScrollTrigger** — one scrubbed master timeline drives the entire camera journey (Lenis-synced)
- **Lenis** — smooth inertial scrolling
- **React + Vite** — component-per-scene, no unnecessary re-renders
- Fonts (self-hosted in `public/fonts`): **Cassandra** — headings · **Beautiful People** — labels & captions · **Vacations in Paradise** — the S.R. identity marks · **Manrope** — body. All three Billy Argel script fonts are **free for personal use only**; commercial use requires a license from [billyargel.com](https://billyargel.com)
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
- The "A" zoom is a real camera move: the whole scene scales around the letter, the other letters remain visible and drift to the edges — nothing is hidden or individually animated.
- The glass break is a transition, not a texture: once the pane shatters, the entire S.R. layer (cracks, shards, reflections) is removed from the scene and never returns until you scroll back to the start.
- `prefers-reduced-motion` and small screens get a simplified experience (fewer shards, reduced zoom, tuned typography) without losing the story.
- In development, `window.__journey.goto(progress)` + `window.__lenis.scrollTo(y)` are exposed for deterministic timeline inspection.

© 2026 Shruti Rai
