import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { IMAGES_TO_PRELOAD } from '../data.js';
import { euphoriaAudio } from '../lib/euphoriaAudio.js';

export default function Loading({ onDone }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const fillRef = useRef(null);
  const doneRef = useRef(false);
  const [readyToEnter, setReadyToEnter] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const unsub = euphoriaAudio.subscribe((state) => {
      setAudioActive(state.isPlaying);
      // If audio successfully started on its own, auto-advance if ready
      if (state.isPlaying && readyToEnter && !doneRef.current) {
        exitLoader();
      }
    });
    return unsub;
  }, [readyToEnter]);

  const exitLoader = () => {
    if (doneRef.current) return;
    doneRef.current = true;

    const root = rootRef.current;
    if (!root) {
      onDone();
      return;
    }

    gsap
      .timeline()
      .to(root.querySelector('.loader-inner'), { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in' })
      .to(root, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.9, ease: 'power4.inOut' }, 0.15)
      .add(() => {
        onDone();
      }, 0.2)
      .set(root, { display: 'none' });
  };

  const handleEnterClick = (e) => {
    if (e) e.stopPropagation();
    euphoriaAudio.play();
    exitLoader();
  };

  useEffect(() => {
    const root = rootRef.current;

    // Try starting audio immediately on mount
    euphoriaAudio.startAutoplayOnArrival();

    const preload = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = src;
      });

    const count = { v: 0 };
    const counter = gsap.to(count, {
      v: 100,
      duration: 1.5,
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
      new Promise((r) => setTimeout(r, 1500)),
    ]).then(() => {
      counter.kill();
      if (countRef.current) countRef.current.textContent = '100';
      if (fillRef.current) fillRef.current.style.transform = 'scaleX(1)';

      // Check if browser already allowed unmuted autoplay
      if (euphoriaAudio.isPlaying) {
        exitLoader();
      } else {
        // Show interactive entry button to guarantee user gesture audio unlock
        setReadyToEnter(true);
      }
    });

    return () => {
      counter.kill();
      if (root) gsap.killTweensOf(root);
    };
  }, [onDone]);

  return (
    <div
      className="loader"
      ref={rootRef}
      aria-label="Loading"
      onClick={handleEnterClick}
      onPointerDown={handleEnterClick}
    >
      <div className="loader-inner">
        <div className="loader-mark font-hero">S.R.</div>
        <div className="loader-bar">
          <div className="loader-fill" ref={fillRef} />
        </div>
        <div className="loader-count" ref={countRef}>
          000
        </div>

        {readyToEnter && (
          <div className="loader-enter-box" onClick={handleEnterClick}>
            <button
              type="button"
              className="loader-enter-btn font-hero"
              onClick={handleEnterClick}
            >
              <span>ENTER PORTFOLIO ♫</span>
              <span className="enter-btn-sub">Click anywhere to begin with sound 💜</span>
            </button>
          </div>
        )}

        {!readyToEnter && (
          <span className="loader-hint-micro">
            Click anywhere to enter with BTS soundtrack 💜
          </span>
        )}
      </div>
    </div>
  );
}
