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
| Transition 1 | **Glass break** — fracture lines crack from center, shards fly outward with depth, revealing the name behind the broken pane |
| 2 · SHRUTI RAI | Large cinematic typography composition with drifting particles |
| Transition 2 | **Whole-screen camera zoom toward the "A"** — the entire composition scales, letters move to the edges, the camera passes through the A |
| 3 · About Me | Photo (left) + description (right) with a pulsing green **OPEN TO WORK** badge |
| Transition 3 | Camera zooms the whole About composition into the badge, then passes through it |
| 4 · Tech Stack | Orbiting technology ecosystem around an S.R. hub |
| Transition 4 | Camera zooms the whole scene into its center |
| 5 · Projects | Cinematic editorial list of verified projects (Khety, MEDTrust, SkillBridge, this portfolio) |
| Transition 5 | Camera zoom into the projects' center |
| 6 · Fun Facts | Playful, personality-driven facts with the anime portrait as the centerpiece |
| Transition 6 | Camera zooms into the anime image and passes through it |
| 7 · Contact | The conclusion — GitHub, LinkedIn, Instagram, email, LeetCode, TryHackMe |

## Tech

- **GSAP + ScrollTrigger** — one scrubbed master timeline drives the entire camera journey (Lenis-synced)
- **Lenis** — smooth inertial scrolling
- **React + Vite** — component-per-scene, no unnecessary re-renders
- Fonts: **Cormorant Garamond** (hero/headings) × **Manrope** (body)
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
- `prefers-reduced-motion` and small screens get a simplified experience (fewer shards, reduced zoom, tuned typography) without losing the story.
- In development, `window.__journey.goto(progress)` is exposed for deterministic timeline inspection.

© 2026 Shruti Rai
