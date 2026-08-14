import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG } from '../data.js';
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

export default function World({ lenis, returnInfo }) {
  const rootRef = useRef(null);
  const restoredRef = useRef(false);
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

    const g2 = stage('name');
    const g3 = stage('about');
    const g4 = stage('tech');
    const g5 = stage('projects');
    const g6 = stage('facts');
    const g7 = stage('contact');

    const backdrop = q(root, '.world-backdrop');
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
      gsap.set(portalRing, { opacity: 0 });
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

      // ---------- SHRUTI RAI — the hero scrolls away naturally and the
      // name arrives, then the pinned camera moment: ZOOM INTO THE A ----------
      // A gentle rise-and-fade as the name scrolls into view (before the pin).
      gsap.fromTo(
        g2,
        { yPercent: 8, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: s2, start: 'top 92%', once: true },
        }
      );
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

      // Restore the journey position once (first build) when returning from a
      // project page. The position is scene-relative, and the scene top is
      // re-measured here — after pins/spacers exist — so it stays exact even
      // if the viewport changed between visits. A rAF keeps us after Lenis's
      // own sync, and force bypasses Lenis if it is stopped/locked.
      if (!restoredRef.current) {
        restoredRef.current = true;
        if (returnInfo && returnInfo.scene) {
          const el = q(root, `[data-scene="${returnInfo.scene}"]`);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const maxOffset = Math.max(0, rect.height - window.innerHeight);
            const target = top + Math.min(returnInfo.offset || 0, maxOffset);
            requestAnimationFrame(() => {
              if (lenis) {
                // Lenis caches document dimensions, but this fresh mount just
                // inserted pin spacers — force a re-measure or scrollTo will
                // clamp against the stale (tiny) limit.
                lenis.resize();
                lenis.scrollTo(target, { immediate: true, force: true });
              } else {
                window.scrollTo(0, target);
              }
              ScrollTrigger.update();
            });
          }
        } else {
          window.scrollTo(0, 0);
        }
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
