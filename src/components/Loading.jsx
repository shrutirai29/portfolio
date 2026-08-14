import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IMAGES_TO_PRELOAD } from '../data.js';

export default function Loading({ onDone }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const fillRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;

    const preload = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = src;
      });

    const count = { v: 0 };
    const counter = gsap.to(count, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(count.v);
        if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0');
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${count.v / 100})`;
      },
    });

    Promise.all([
      document.fonts.ready,
      ...IMAGES_TO_PRELOAD.map(preload),
      new Promise((r) => setTimeout(r, 1600)),
    ]).then(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      counter.kill();

      // Exit: curtain lifts upward, revealing the first scene.
      gsap
        .timeline()
        .to(root.querySelector('.loader-inner'), { y: -26, opacity: 0, duration: 0.5, ease: 'power2.in' })
        .to(root, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.0, ease: 'power4.inOut' }, 0.15)
        .add(() => onDone(), 0.15)
        .set(root, { display: 'none' });
    });

    return () => {
      counter.kill();
      gsap.killTweensOf(root);
    };
  }, [onDone]);

  return (
    <div className="loader" ref={rootRef} aria-label="Loading">
      <div className="loader-inner">
        <div className="loader-mark font-hero">S.R.</div>
        <div className="loader-bar">
          <div className="loader-fill" ref={fillRef} />
        </div>
        <div className="loader-count" ref={countRef}>
          000
        </div>
      </div>
    </div>
  );
}
