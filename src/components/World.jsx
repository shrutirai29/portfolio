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
const rand = (a, b) => a + Math.random() * (b - a);

// Focal point of `el` as a percentage of `container` (layout-based, transform-safe).
function originAt(container, el) {
  const c = container.getBoundingClientRect();
  const e = el.getBoundingClientRect();
  return `${(((e.left + e.width / 2 - c.left) / c.width) * 100).toFixed(2)}% ${(((e.top + e.height / 2 - c.top) / c.height) * 100).toFixed(2)}%`;
}

export default function World() {
  const rootRef = useRef(null);
  const [buildKey, setBuildKey] = useState(0);

  // Rebuild when the viewport size changes meaningfully, so focal points
  // and pinned layouts stay accurate.
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

    // Always start the journey at S.R.
    window.scrollTo(0, 0);

    const isMobile = window.innerWidth <= 768;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const Z = (isMobile ? 0.72 : 1) * (reduced ? 0.55 : 1);

    const scene = (name) => q(root, `[data-scene="${name}"]`);
    const stage = (name) => q(root, `[data-scene="${name}"] [data-stage]`);
    const revealsIn = (name, kind) => scene(name).querySelectorAll(`[data-reveal="${kind}"]`);

    const s1 = scene('sr');
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
    const glassShock = q(root, '.glass-shock');
    const glassLayer = q(root, '.glass-layer');
    const backdrop = q(root, '.world-backdrop');
    const scrollHint = q(root, '.scroll-hint');
    const nameCaption = q(root, '.name-caption');
    const portalRing = q(root, '.portal-ring');
    const photo = q(root, '[data-photo]');
    const capRows = [...root.querySelectorAll('.cap-row')];
    const scrapFacts = [...root.querySelectorAll('.scrap-fact')];
    const projStats = q(root, '.proj-stats');
    const finalMark = q(root, '.final-mark');

    const aOrigin = originAt(g2, q(root, '[data-focal="a"]'));

    const ctx = gsap.context(() => {
      // ---------- initial states ----------
      gsap.set([glassFlash, glassShock, portalRing], { opacity: 0 });
      gsap.set(crackPaths, {
        strokeDasharray: (i, el) => el.getTotalLength(),
        strokeDashoffset: (i, el) => el.getTotalLength(),
      });
      gsap.set(root.querySelectorAll('[data-reveal]:not([data-reveal="clip"])'), { opacity: 0 });
      gsap.set(root.querySelectorAll('[data-reveal="clip"]'), { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.set(root.querySelectorAll('[data-reveal="frame"]'), { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 });
      gsap.set(photo, { clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.set(finalMark, { autoAlpha: 0 });

      // ---------- journey progress bar ----------
      const progressBar = document.querySelector('#journey-progress');
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (progressBar) progressBar.style.transform = `scaleX(${self.progress.toFixed(4)})`;
        },
      });

      // ---------- background parallax across the whole journey ----------
      gsap.fromTo(
        backdrop,
        { scale: 1.12, xPercent: -0.8 },
        {
          scale: 1.24,
          xPercent: 0.8,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: true },
        }
      );

      // ---------- GLASS BREAK — a pinned camera zoom: the camera pushes
      // through the shattering pane and the name is revealed behind it. The
      // whole S.R. layer is removed once the pass-through completes.
      const maxDist = Math.max(window.innerWidth, window.innerHeight) * (isMobile ? 0.5 : 0.85);
      const shardMotion = shards.map((el) => {
        const dx = parseFloat(el.dataset.dx);
        const dy = parseFloat(el.dataset.dy);
        const depth = parseFloat(el.dataset.depth);
        const dist = maxDist * (0.45 + depth * 0.75) * rand(0.7, 1.25);
        return {
          x: dx * dist,
          y: dy * dist + maxDist * 0.12,
          rotation: rand(-90, 90),
          rotateX: rand(-14, 14),
          rotateY: rand(-14, 14),
          scale: 0.82 + depth * 0.14,
        };
      });

      const heroZoom = reduced ? 2.3 : 5.4 * Z;
      gsap.set(g1, { transformOrigin: '50% 45%' });

      const heroTL = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: s1, start: 'top top', end: '+=240%', pin: true, scrub: true, anticipatePin: 1 },
      });

      // Cracks develop slowly and gradually across most of the pin —
      // the pane fractures bit by bit as the user scrolls.
      heroTL
        .to(scrollHint, { opacity: 0, duration: 0.3 }, 0)
        .to(crackPaths, { strokeDashoffset: 0, duration: 1.3, ease: 'power1.inOut', stagger: 0.01 }, 0.05)
        .to(glassSheen, { opacity: 0, duration: 0.9, ease: 'power1.in' }, 0.1)
        .fromTo(glassShock, { scale: 0, opacity: 0.9 }, { scale: 2.4, opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.12);

      if (!reduced) {
        heroTL
          .fromTo(glassFlash, { opacity: 0 }, { opacity: 0.85, duration: 0.3, ease: 'power2.out' }, 0.12)
          .to(glassFlash, { opacity: 0, duration: 0.8, ease: 'power1.in' }, 0.45)
          .to(
            g1,
            { keyframes: { x: [0, 8, -6, 4, -2, 0], y: [0, -3, 2, -1, 0] }, duration: 0.7, ease: 'power2.out' },
            0.2
          );
      }

      heroTL
        .to(
          shards,
          {
            x: (i) => shardMotion[i].x,
            y: (i) => shardMotion[i].y,
            scale: (i) => shardMotion[i].scale,
            rotation: (i) => shardMotion[i].rotation,
            rotateX: (i) => shardMotion[i].rotateX,
            rotateY: (i) => shardMotion[i].rotateY,
            opacity: 0,
            transformPerspective: 900,
            duration: 1.8,
            ease: 'power3.out',
            stagger: 0.005,
          },
          1.6
        )
        .to(g1, { scale: heroZoom, duration: 4.2, ease: 'power2.inOut' }, 0.3)
        .fromTo(g2, { yPercent: 16, opacity: 0.15 }, { yPercent: 0, opacity: 1, duration: 2.8, ease: 'power2.out' }, 2.4)
        .to(crackPaths, { opacity: 0, duration: 0.5, ease: 'power1.in' }, 3.6)
        .to(g1, { opacity: 0, duration: 0.9, ease: 'power1.in' }, 4.6)
        .to(glassLayer, { autoAlpha: 0, duration: 0.5, ease: 'power1.inOut' }, 4.3);

      // ---------- SHRUTI RAI + the one pinned camera moment: ZOOM INTO THE A ----------
      gsap.set(g2, { transformOrigin: aOrigin });
      if (!reduced) {
        const aTL = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: s2,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });
        aTL
          .to(g2, { scale: 11.5 * Z, duration: 6, ease: 'power1.in' }, 0)
          .to(nameCaption, { opacity: 0, duration: 3.5, ease: 'power1.in' }, 0)
          .to(g2, { scale: 13 * Z, opacity: 0, duration: 2, ease: 'power1.in' }, 6)
          .fromTo(portalRing, { opacity: 0, scale: 0.5 }, { opacity: 0.85, duration: 0.9, ease: 'power2.out' }, 5.8)
          .to(portalRing, { opacity: 0, scale: 1.7, duration: 0.8, ease: 'power1.in' }, 6.7);
      } else {
        gsap.to(nameCaption, { opacity: 1, duration: 0.8, delay: 0.2 });
      }

      // ---------- ABOUT — enter reveals, then a pinned camera zoom into
      // OPEN TO WORK that passes through into the Tech Stack ----------
      const badge = q(root, '[data-focal="badge"]');
      const badgeOrigin = originAt(g3, badge);
      gsap.set(g3, { transformOrigin: badgeOrigin });
      const aboutZoom = reduced ? 2.4 : 6.8 * Z;
      if (!reduced) {
        const aboutTL = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: s3, start: 'top top', end: '+=200%', pin: true, scrub: true, anticipatePin: 1 },
        });
        aboutTL
          .to(g3, { scale: aboutZoom, duration: 5.2, ease: 'power1.in' }, 0.6)
          .to(g3, { scale: aboutZoom * 1.28, opacity: 0, duration: 1.8, ease: 'power1.in' }, 5.8)
          .fromTo(g4, { yPercent: 16, opacity: 0.15 }, { yPercent: 0, opacity: 1, duration: 2.8, ease: 'power2.out' }, 3.6);
      }

      gsap.fromTo(
        photo,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s3, start: 'top 65%', once: true },
        }
      );
      gsap.fromTo(
        q(root, '[data-scene="about"] [data-reveal="clip"]'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s3, start: 'top 68%', once: true },
        }
      );
      gsap.fromTo(
        revealsIn('about', 'rise'),
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: s3, start: 'top 70%', once: true },
        }
      );

      // ---------- TECH — enter reveals ----------
      gsap.fromTo(
        q(root, '[data-scene="tech"] [data-reveal="clip"]'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s4, start: 'top 75%', once: true },
        }
      );
      // Tech rows slide in from alternate directions, converging to the
      // center early in the section so every row is settled and readable
      // well before the next scene arrives (scrubbed — normal scroll).
      gsap.fromTo(
        capRows,
        { xPercent: (i) => (i % 2 ? 18 : -18), opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: s4, start: 'top 95%', end: 'top 68%', scrub: true },
        }
      );

      // ---------- PROJECTS — enter reveals ----------
      gsap.fromTo(
        q(root, '[data-scene="projects"] [data-reveal="clip"]'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s5, start: 'top 72%', once: true },
        }
      );
      gsap.fromTo(
        projStats,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: s5, start: 'top 74%', once: true },
        }
      );
      // Project rows — same alternate-direction entrance, converged early
      // so the index is fully readable before Fun Facts arrives.
      gsap.fromTo(
        revealsIn('projects', 'rise'),
        { xPercent: (i) => (i % 2 ? 20 : -20), opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          ease: 'none',
          stagger: 0.14,
          scrollTrigger: { trigger: s5, start: 'top 85%', end: 'top 45%', scrub: true },
        }
      );

      // ---------- FUN FACTS — enter reveals ----------
      gsap.fromTo(
        q(root, '[data-scene="facts"] [data-reveal="frame"]'),
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s6, start: 'top 70%', once: true },
        }
      );
      gsap.fromTo(
        q(root, '[data-scene="facts"] [data-reveal="clip"]'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s6, start: 'top 73%', once: true },
        }
      );
      const factEntries = [
        { x: -90, y: 16, rotation: -8 },
        { x: 90, y: -12, rotation: 8 },
        { x: 30, y: 56, rotation: 6 },
        { x: -64, y: -18, rotation: -6 },
        { x: 0, y: 32, rotation: 10, scale: 0.4 },
        { x: 72, y: 20, rotation: -8 },
      ];
      scrapFacts.forEach((f, i) => {
        const from = factEntries[i] || { x: -50, y: 24, rotation: -4 };
        gsap.fromTo(
          f,
          { ...from, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: parseFloat(f.dataset.rot || 0),
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: s6, start: 'top 78%', once: true },
          }
        );
      });

      // ---------- CONTACT — enter reveals + closing S.R. ----------
      gsap.fromTo(
        q(root, '[data-scene="contact"] [data-reveal="clip"]'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s7, start: 'top 70%', once: true },
        }
      );
      gsap.fromTo(
        revealsIn('contact', 'rise'),
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: s7, start: 'top 72%', once: true },
        }
      );
      gsap.to(finalMark, {
        autoAlpha: 1,
        duration: 1.6,
        ease: 'power1.out',
        scrollTrigger: { trigger: s7, start: 'bottom bottom+=260', once: true },
      });

      ScrollTrigger.refresh();

      if (import.meta.env.DEV) {
        window.__journey = { sts: ScrollTrigger.getAll() };
      }
    }, root);

    return () => ctx.revert();
  }, [buildKey]);

  return (
    <div className="world" ref={rootRef}>
      <div
        className="world-backdrop"
        style={{ backgroundImage: `url(${IMG('background.webp')})` }}
        aria-hidden="true"
      />
      <div className="world-shade" aria-hidden="true" />
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
  );
}
