import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG } from '../data.js';
import SRScene from '../scenes/SRScene.jsx';
import NameScene from '../scenes/NameScene.jsx';
import AboutScene from '../scenes/AboutScene.jsx';
import TechScene from '../scenes/TechScene.jsx';
import ProjectsScene from '../scenes/ProjectsScene.jsx';
import FunFactsScene from '../scenes/FunFactsScene.jsx';
import ContactScene from '../scenes/ContactScene.jsx';

gsap.registerPlugin(ScrollTrigger);

const q = (root, sel) => root.querySelector(sel);

// Focal point of `el` as a percentage of `container` (layout-based, transform-safe).
function originAt(container, el) {
  const c = container.getBoundingClientRect();
  const e = el.getBoundingClientRect();
  return `${(((e.left + e.width / 2 - c.left) / c.width) * 100).toFixed(2)}% ${(((e.top + e.height / 2 - c.top) / c.height) * 100).toFixed(2)}%`;
}

const rand = (a, b) => a + Math.random() * (b - a);

export default function World() {
  const rootRef = useRef(null);
  const spacerRef = useRef(null);
  const [buildKey, setBuildKey] = useState(0);

  // Rebuild the world when the viewport size changes meaningfully,
  // so camera focal points stay accurate.
  useLayoutEffect(() => {
    let lastW = window.innerWidth;
    let timer = 0;
    const onResize = () => {
      const w = window.innerWidth;
      if (Math.abs(w - lastW) < 140) return;
      lastW = w;
      clearTimeout(timer);
      timer = setTimeout(() => setBuildKey((k) => k + 1), 350);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Always start the journey at scene 1 (browser scroll restoration can
    // otherwise deep-link the scrubbed timeline into the middle of the world).
    window.scrollTo(0, 0);

    const isMobile = window.innerWidth <= 768;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const Z = (isMobile ? 0.72 : 1) * (reduced ? 0.55 : 1);

    const scene = (name) => q(root, `[data-scene="${name}"]`);
    const stage = (name) => q(root, `[data-scene="${name}"] [data-stage]`);
    const revealsIn = (name, kind) => scene(name).querySelectorAll(`[data-reveal="${kind}"]`);

    const s2 = scene('name');
    const s3 = scene('about');
    const s4 = scene('tech');
    const s5 = scene('projects');
    const s6 = scene('facts');
    const s7 = scene('contact');

    const g1 = stage('sr');
    const g2 = stage('name');
    const g3 = stage('about');
    const g4 = stage('tech');
    const g5 = stage('projects');
    const g6 = stage('facts');
    const g7 = stage('contact');

    const shards = [...root.querySelectorAll('.glass-shard')];
    const crackPaths = [...root.querySelectorAll('.crack-path')];
    const glassFlash = q(root, '.glass-flash');
    const glassSheen = q(root, '.glass-sheen');
    const glassLayer = q(root, '.glass-layer');
    const scrollHint = q(root, '.scroll-hint');

    const nameCaption = q(root, '.name-caption');
    const portalRing = q(root, '.portal-ring');
    const zoomDark2 = q(root, '[data-scene="name"] [data-zoom-dark]');
    const zoomDark3 = q(root, '[data-scene="about"] [data-zoom-dark]');
    const zoomDark4 = q(root, '[data-scene="tech"] [data-zoom-dark]');
    const zoomDark5 = q(root, '[data-scene="projects"] [data-zoom-dark]');
    const zoomDark6 = q(root, '[data-scene="facts"] [data-zoom-dark]');

    // Camera focal points
    const aOrigin = originAt(g2, q(root, '[data-scene="name"] [data-focal="a"]'));
    const badgeOrigin = originAt(g3, q(root, '[data-scene="about"] [data-focal="badge"]'));
    const animeOrigin = originAt(g6, q(root, '[data-scene="facts"] [data-focal="anime"]'));

    const photo = q(root, '[data-photo]');
    const techChips = root.querySelectorAll('[data-scene="tech"] .chip');

    let st = null;

    const ctx = gsap.context(() => {
      // ---------- initial states ----------
      gsap.set([s2, s3, s4, s5, s6, s7], { opacity: 0 });
      gsap.set([g2, g3, g4, g5, g6, g7], { scale: 1.7 });
      gsap.set([glassFlash, portalRing, nameCaption], { opacity: 0 });
      gsap.set([zoomDark2, zoomDark3, zoomDark4, zoomDark5, zoomDark6], { opacity: 0 });
      gsap.set(crackPaths, {
        strokeDasharray: (i, el) => el.getTotalLength(),
        strokeDashoffset: (i, el) => el.getTotalLength(),
      });
      gsap.set(root.querySelectorAll('[data-reveal]'), { opacity: 0 });
      gsap.set(root.querySelectorAll('[data-reveal="clip"]'), { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.set(revealsIn('about', 'rise'), { y: 34, opacity: 0 });
      gsap.set(revealsIn('projects', 'rise'), { y: 40, opacity: 0 });
      gsap.set(revealsIn('facts', 'rise'), { y: 30, opacity: 0 });
      gsap.set(revealsIn('contact', 'rise'), { y: 26, opacity: 0 });
      gsap.set(root.querySelectorAll('[data-reveal="pop"]'), { scale: 0.6, opacity: 0 });
      gsap.set(root.querySelectorAll('[data-reveal="frame"]'), { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 });
      gsap.set(photo, { clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.set(techChips, { opacity: 0 });

      // Camera targets (whole-scene zooms rotate around these points)
      gsap.set(g2, { transformOrigin: aOrigin });
      gsap.set(g3, { transformOrigin: badgeOrigin });
      gsap.set(g4, { transformOrigin: '50% 50%' });
      gsap.set(g5, { transformOrigin: '50% 50%' });
      gsap.set(g6, { transformOrigin: animeOrigin });
      gsap.set(g7, { transformOrigin: '50% 50%' });

      // Per-shard flight vectors (radial, with depth)
      const maxDist = Math.max(window.innerWidth, window.innerHeight) * (isMobile ? 0.5 : 0.85);
      const shardMotion = shards.map((el) => {
        const dx = parseFloat(el.dataset.dx);
        const dy = parseFloat(el.dataset.dy);
        const depth = parseFloat(el.dataset.depth);
        const dist = maxDist * (0.45 + depth * 0.75) * rand(0.7, 1.25);
        return {
          x: dx * dist,
          y: dy * dist,
          rotation: rand(-90, 90),
          rotateX: rand(-14, 14),
          rotateY: rand(-14, 14),
          opacity: 0,
        };
      });

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

      /* ============ SCENE 1 · S.R. ============ */
      tl.to(g1, { scale: 1.07, duration: 16 }, 0)
        .to(scrollHint, { opacity: 0, duration: 2.6, ease: 'power1.out' }, 0.4);

      /* ============ GLASS CRACK (4 → 6.6) ============ */
      tl.to(crackPaths, { strokeDashoffset: 0, duration: 2.3, ease: 'power2.inOut', stagger: 0.05 }, 4)
        .to(glassSheen, { opacity: 0, duration: 2.2, ease: 'power1.in' }, 4.2);

      if (!reduced) {
        tl.fromTo(glassFlash, { opacity: 0 }, { opacity: 0.9, duration: 0.6, ease: 'power2.out' }, 4)
          .to(glassFlash, { opacity: 0, duration: 1.7, ease: 'power1.in' }, 4.6)
          .to(
            g1,
            { keyframes: { x: [0, 8, -6, 4, -2, 0], y: [0, -3, 2, -1, 0] }, duration: 1.5, ease: 'power2.out' },
            4
          );
      }

      /* ============ SHATTER (6.6 → 10) ============ */
      tl.to(
        shards,
        {
          x: (i) => shardMotion[i].x,
          y: (i) => shardMotion[i].y,
          rotation: (i) => shardMotion[i].rotation,
          rotateX: (i) => shardMotion[i].rotateX,
          rotateY: (i) => shardMotion[i].rotateY,
          opacity: 0,
          transformPerspective: 900,
          duration: 3.4,
          ease: 'power3.out',
          stagger: 0.011,
        },
        6.6
      )
        .to(g1, { opacity: 0, duration: 1.6, ease: 'power1.inOut' }, 6.4)
        .to(glassLayer, { opacity: 0, duration: 1.6, ease: 'power1.inOut' }, 8.4)
        .to(nameCaption, { opacity: 1, duration: 2.4, ease: 'power1.inOut' }, 7.5);

      /* ============ SHRUTI RAI revealed behind the glass ============ */
      tl.to(s2, { opacity: 1, duration: 3.2, ease: 'power1.inOut' }, 6.6).to(
        g2,
        { scale: 1, duration: 5.6, ease: 'power1.out' },
        6.6
      );

      /* ============ ZOOM INTO THE "A" — the whole screen zooms (16 → 26) ============ */
      tl.to(g2, { scale: 11.5 * Z, duration: 10, ease: 'power1.in' }, 16)
        .to(zoomDark2, { opacity: 0.85, duration: 10, ease: 'power1.in' }, 16)
        .to(nameCaption, { opacity: 0, duration: 6, ease: 'power1.in' }, 16);

      /* ============ PASS THROUGH THE A (26 → 28.5) ============ */
      tl.to(g2, { scale: 13 * Z, opacity: 0, duration: 2.5, ease: 'power1.in' }, 26)
        .to(zoomDark2, { opacity: 1, duration: 2.5, ease: 'power1.in' }, 26);

      if (!reduced) {
        tl.fromTo(portalRing, { opacity: 0, scale: 0.5 }, { opacity: 0.85, duration: 1.3, ease: 'power2.out' }, 26).to(
          portalRing,
          { opacity: 0, scale: 1.7, duration: 1.2, ease: 'power1.in' },
          27.3
        );
      }

      /* ============ ABOUT ME arrives from inside the A (26 → 31) ============ */
      tl.to(s3, { opacity: 1, duration: 2.6, ease: 'power1.inOut' }, 26).fromTo(
        g3,
        { scale: 1.7 },
        { scale: 1, duration: 5, ease: 'power1.out' },
        26
      );

      /* ============ ABOUT hold + content reveals (31 → 38) ============ */
      tl.fromTo(photo, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.6, ease: 'power2.inOut' }, 31)
        .fromTo(
          q(root, '[data-scene="about"] [data-reveal="clip"]'),
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power2.inOut' },
          31.2
        )
        .fromTo(
          revealsIn('about', 'rise'),
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6, ease: 'power2.out', stagger: 0.14 },
          31.6
        );

      /* ============ ZOOM INTO OPEN TO WORK (38 → 45) ============ */
      tl.to(g3, { scale: 9.5 * Z, duration: 7, ease: 'power1.in' }, 38).to(
        zoomDark3,
        { opacity: 0.85, duration: 7, ease: 'power1.in' },
        38
      );

      /* ============ PASS THROUGH THE BADGE → TECH (45 → 48.5) ============ */
      tl.to(g3, { scale: 11 * Z, opacity: 0, duration: 2.4, ease: 'power1.in' }, 45)
        .to(zoomDark3, { opacity: 1, duration: 2.4, ease: 'power1.in' }, 45)
        .to(s4, { opacity: 1, duration: 2.2, ease: 'power1.inOut' }, 45)
        .fromTo(g4, { scale: 1.6 }, { scale: 1, duration: 3.6, ease: 'power1.out' }, 45);

      /* ============ TECH STACK hold (48.5 → 55) ============ */
      tl.fromTo(
        root.querySelectorAll('[data-reveal="pop"]'),
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'back.out(1.6)' },
        48.5
      ).fromTo(
        techChips,
        { opacity: 0 },
        { opacity: 1, duration: 1.3, ease: 'power1.out', stagger: 0.045 },
        49
      );

      /* ============ ZOOM INTO TECH CENTER (55 → 60) ============ */
      tl.to(g4, { scale: 6.5 * Z, duration: 5, ease: 'power1.in' }, 55).to(
        zoomDark4,
        { opacity: 0.85, duration: 5, ease: 'power1.in' },
        55
      );

      /* ============ PASS THROUGH → PROJECTS (60 → 63.5) ============ */
      tl.to(g4, { scale: 8 * Z, opacity: 0, duration: 2.2, ease: 'power1.in' }, 60)
        .to(zoomDark4, { opacity: 1, duration: 2.2, ease: 'power1.in' }, 60)
        .to(s5, { opacity: 1, duration: 2.2, ease: 'power1.inOut' }, 60)
        .fromTo(g5, { scale: 1.55 }, { scale: 1, duration: 3.4, ease: 'power1.out' }, 60);

      /* ============ PROJECTS hold (63.5 → 69) ============ */
      tl.fromTo(
        q(root, '[data-scene="projects"] [data-reveal="clip"]'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power2.inOut' },
        63.5
      ).fromTo(
        revealsIn('projects', 'rise'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', stagger: 0.11 },
        63.8
      );

      /* ============ ZOOM INTO PROJECTS CENTER (69 → 74) ============ */
      tl.to(g5, { scale: 6.5 * Z, duration: 5, ease: 'power1.in' }, 69).to(
        zoomDark5,
        { opacity: 0.85, duration: 5, ease: 'power1.in' },
        69
      );

      /* ============ PASS THROUGH → FUN FACTS (74 → 77.5) ============ */
      tl.to(g5, { scale: 8 * Z, opacity: 0, duration: 2.2, ease: 'power1.in' }, 74)
        .to(zoomDark5, { opacity: 1, duration: 2.2, ease: 'power1.in' }, 74)
        .to(s6, { opacity: 1, duration: 2.2, ease: 'power1.inOut' }, 74)
        .fromTo(g6, { scale: 1.55 }, { scale: 1, duration: 3.4, ease: 'power1.out' }, 74);

      /* ============ FUN FACTS hold (77.5 → 82) ============ */
      tl.fromTo(
        q(root, '[data-scene="facts"] [data-reveal="frame"]'),
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 2.4, ease: 'power2.inOut' },
        77.5
      )
        .fromTo(
          q(root, '[data-scene="facts"] [data-reveal="clip"]'),
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power2.inOut' },
          77.8
        )
        .fromTo(
          revealsIn('facts', 'rise'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power2.out', stagger: 0.09 },
          78
        );

      /* ============ ZOOM INTO THE ANIME IMAGE (82 → 87) ============ */
      tl.to(g6, { scale: 9 * Z, duration: 5, ease: 'power1.in' }, 82).to(
        zoomDark6,
        { opacity: 0.85, duration: 5, ease: 'power1.in' },
        82
      );

      /* ============ PASS THROUGH THE ANIME → CONTACT (87 → 90) ============ */
      tl.to(g6, { scale: 10.5 * Z, opacity: 0, duration: 2.2, ease: 'power1.in' }, 87)
        .to(zoomDark6, { opacity: 1, duration: 2.2, ease: 'power1.in' }, 87)
        .to(s7, { opacity: 1, duration: 2.2, ease: 'power1.inOut' }, 87)
        .fromTo(g7, { scale: 1.6 }, { scale: 1, duration: 3.4, ease: 'power1.out' }, 87);

      /* ============ CONTACT hold (90 → 96) ============ */
      tl.fromTo(
        q(root, '[data-scene="contact"] [data-reveal="clip"]'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power2.inOut' },
        90
      )
        .fromTo(
          revealsIn('contact', 'rise'),
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', stagger: 0.07 },
          90.3
        )
        .to(g7, { scale: 1.045, duration: 5, ease: 'none' }, 91);

      /* ============ master scroll trigger ============ */
      const TOTAL = 96;
      const pxPerUnit = isMobile ? 78 : 96;
      const spacer = spacerRef.current;
      if (spacer) spacer.style.height = `${TOTAL * pxPerUnit}px`;

      const progressEl = document.getElementById('journey-progress');
      st = ScrollTrigger.create({
        trigger: spacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        animation: tl,
        onUpdate: (self) => {
          if (progressEl) progressEl.style.transform = `scaleX(${self.progress})`;
        },
      });

      ScrollTrigger.refresh();

      // Dev-only QA hook: pin the timeline to an exact progress so scenes can
      // be inspected deterministically regardless of scroll position.
      if (import.meta.env.DEV) {
        window.__journey = {
          goto: (p) => tl.progress(p),
          len: tl.duration(),
        };
      }
    }, root);

    return () => {
      if (st) st.kill();
      ctx.revert();
    };
  }, [buildKey]);

  return (
    <>
      <div className="scroll-spacer" ref={spacerRef} aria-hidden="true" />
      <div className="world" ref={rootRef}>
        <div
          className="world-backdrop"
          style={{ backgroundImage: `url(${IMG('background.webp')})` }}
          aria-hidden="true"
        />
        <div className="camera">
          <SRScene />
          <NameScene />
          <AboutScene />
          <TechScene />
          <ProjectsScene />
          <FunFactsScene />
          <ContactScene />
        </div>
      </div>
    </>
  );
}
