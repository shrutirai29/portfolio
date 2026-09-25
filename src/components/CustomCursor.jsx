import React, { useEffect, useRef } from 'react';
import { sounds } from '../lib/sound.js';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop / trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;
    let isClicking = false;
    let rafId = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      if (glow) {
        glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      ring.classList.add('cursor-clicking');
    };

    const onMouseUp = () => {
      isClicking = false;
      ring.classList.remove('cursor-clicking');
    };

    // Check for interactive targets
    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, [role="button"], input, textarea, .proj-row, .cap-chip, .scrap-fact, .photo-frame, .brand-interactive')
      ) {
        isHovering = true;
        ring.classList.add('cursor-hovering');
        sounds.playHover();
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, [role="button"], input, textarea, .proj-row, .cap-chip, .scrap-fact, .photo-frame, .brand-interactive')
      ) {
        isHovering = false;
        ring.classList.remove('cursor-hovering');
      }
    };

    // Smooth lerp loop for the ring follower
    const render = () => {
      const ease = isHovering ? 0.22 : 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-ambient-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
