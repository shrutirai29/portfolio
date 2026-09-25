import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG } from '../data.js';
import NameScene from '../scenes/NameScene.jsx';
import AboutScene from '../scenes/AboutScene.jsx';
import TechScene from '../scenes/TechScene.jsx';
import ProjectsScene from '../scenes/ProjectsScene.jsx';
import ExperienceScene from '../scenes/ExperienceScene.jsx';
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

  // Rebuild when the viewport size changes meaningfully
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
    const Z = (isMobile ? 0.75 : 1) * (reduced ? 0.55 : 1);

    const scene = (name) => q(root, `[data-scene="${name}"]`);
    const stage = (name) => q(root, `[data-scene="${name}"] [data-stage]`);
    const revealsIn = (name, kind) => scene(name) ? scene(name).querySelectorAll(`[data-reveal="${kind}"]`) : [];

    const s2 = scene('name');
    const s3 = scene('about');
    const s4 = scene('tech');
    const s5 = scene('projects');
    const sExp = scene('experience');
    const s6 = scene('facts');
    const s7 = scene('contact');

    const g2 = stage('name');
    const g3 = stage('about');
    const g4 = stage('tech');

    const backdrop = q(root, '.world-backdrop');
    const nameCaption = q(root, '.name-caption');
    const portalRing = q(root, '.portal-ring');
    const photo = q(root, '[data-photo]');
    const scrapFacts = [...root.querySelectorAll('.scrap-fact')];
    const finalMark = q(root, '.final-mark');

    const aFocal = q(root, '[data-focal="a"]');
    const aOrigin = aFocal && g2 ? originAt(g2, aFocal) : '50% 50%';

    const ctx = gsap.context(() => {
      // ---------- initial states ----------
      gsap.set(portalRing, { opacity: 0 });
      gsap.set(root.querySelectorAll('[data-reveal]:not([data-reveal="clip"])'), { opacity: 0 });
      gsap.set(root.querySelectorAll('[data-reveal="clip"]'), { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.set(root.querySelectorAll('[data-reveal="frame"]'), { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 });
      if (photo) gsap.set(photo, { clipPath: 'inset(0% 0% 100% 0%)' });
      if (finalMark) gsap.set(finalMark, { autoAlpha: 0 });

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
        { scale: 1.12, xPercent: -1 },
        {
          scale: 1.25,
          xPercent: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: true },
        }
      );

      // ---------- SCENE 1: SHRUTI RAI — Zoom into the 'A' ----------
      gsap.fromTo(
        g2,
        { yPercent: 6, opacity: 0.9 },
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
            end: '+=160%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });
        aTL
          .to(g2, { scale: 10 * Z, duration: 6, ease: 'power1.in' }, 0)
          .to(nameCaption, { opacity: 0, duration: 2.5, ease: 'power1.in' }, 0)
          .to(g2, { scale: 12.5 * Z, opacity: 0, duration: 2, ease: 'power1.in' }, 6)
          .fromTo(portalRing, { opacity: 0, scale: 0.6 }, { opacity: 0.9, duration: 1.0, ease: 'power2.out' }, 5.6)
          .to(portalRing, { opacity: 0, scale: 1.8, duration: 0.9, ease: 'power1.in' }, 6.6);
      }

      // ---------- SCENE 2: ABOUT ME ----------
      if (photo) {
        gsap.fromTo(
          photo,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: s3, start: 'top 70%', once: true },
          }
        );
      }

      gsap.fromTo(
        revealsIn('about', 'clip'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s3, start: 'top 70%', once: true },
        }
      );

      gsap.fromTo(
        revealsIn('about', 'rise'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: s3, start: 'top 72%', once: true },
        }
      );

      // ---------- SCENE 3: TECH STACK ----------
      gsap.fromTo(
        revealsIn('tech', 'clip'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s4, start: 'top 75%', once: true },
        }
      );

      const capRows = [...s4.querySelectorAll('.cap-row')];
      capRows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      // ---------- SCENE 4: PROJECTS ----------
      gsap.fromTo(
        revealsIn('projects', 'clip'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s5, start: 'top 75%', once: true },
        }
      );

      const projStats = q(s5, '.proj-stats');
      if (projStats) {
        gsap.fromTo(
          projStats,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: s5, start: 'top 72%', once: true },
          }
        );
      }

      const projFilters = q(s5, '.proj-filters');
      if (projFilters) {
        gsap.fromTo(
          projFilters,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: s5, start: 'top 70%', once: true },
          }
        );
      }

      const projRows = [...s5.querySelectorAll('.proj-row-wrap')];
      projRows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });

      // ---------- SCENE 5: EXPERIENCE & MILESTONES ----------
      if (sExp) {
        gsap.fromTo(
          revealsIn('experience', 'clip'),
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: sExp, start: 'top 75%', once: true },
          }
        );

        const metricCards = [...sExp.querySelectorAll('.metric-card, .metric-card-link')];
        gsap.fromTo(
          metricCards,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: sExp, start: 'top 72%', once: true },
          }
        );

        const expCards = [...sExp.querySelectorAll('.exp-timeline-card')];
        expCards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 86%', once: true },
            }
          );
        });
      }

      // ---------- SCENE 6: FUN FACTS ----------
      gsap.fromTo(
        q(root, '[data-scene="facts"] [data-reveal="frame"]'),
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.3,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s6, start: 'top 70%', once: true },
        }
      );

      gsap.fromTo(
        revealsIn('facts', 'clip'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s6, start: 'top 73%', once: true },
        }
      );

      scrapFacts.forEach((f) => {
        gsap.fromTo(
          f,
          { y: 25, opacity: 0 },
          {
            y: 0,
            rotation: parseFloat(f.dataset.rot || 0),
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: f, start: 'top 90%', once: true },
          }
        );
      });

      // ---------- SCENE 7: CONTACT ----------
      gsap.fromTo(
        revealsIn('contact', 'clip'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: s7, start: 'top 70%', once: true },
        }
      );

      gsap.fromTo(
        revealsIn('contact', 'rise'),
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: s7, start: 'top 72%', once: true },
        }
      );

      if (finalMark) {
        gsap.to(finalMark, {
          autoAlpha: 1,
          duration: 1.4,
          ease: 'power1.out',
          scrollTrigger: { trigger: s7, start: 'bottom bottom+=200', once: true },
        });
      }

      ScrollTrigger.refresh();

      // Restore position if returning from project detail
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
        <ExperienceScene />
        <FunFactsScene />
        <ContactScene />
      </div>
    </div>
  );
}
