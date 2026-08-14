import React, { useRef } from 'react';
import { CONTACT } from '../data.js';

const LINKS = [
  { label: 'GitHub', value: 'shrutirai29', href: CONTACT.github },
  { label: 'LinkedIn', value: 'Shruti Rai', href: CONTACT.linkedin },
  { label: 'Instagram', value: '@shruti.r8524', href: CONTACT.instagram },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'LeetCode', value: 'Shruti_rai', href: CONTACT.leetcode },
  { label: 'TryHackMe', value: 'shruti.r8524', href: CONTACT.tryhackme },
];

// Place links around the radar ring; the dot sits on the circle, the
// label sits just outside it.
const polar = (i, n, r) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(a) * r,
    y: Math.sin(a) * r,
    angle: (a * 180) / Math.PI + 90,
  };
};

export default function ContactScene() {
  const signalRef = useRef(null);

  const onMove = (e) => {
    const el = signalRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty('--px', px.toFixed(3));
    el.style.setProperty('--py', py.toFixed(3));
  };

  const onLeave = () => {
    const el = signalRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
  };

  return (
    <section className="scene" data-scene="contact" aria-label="Contact Me">
      <div className="stage" data-stage>
        <div className="final-content">
          <span className="kicker final-kicker" data-reveal="rise">
            07 · FINAL TRANSMISSION
          </span>
          <h2 className="final-title font-hero" data-reveal="clip">
            Let&rsquo;s create
            <br />
            <em>something.</em>
          </h2>
          <p className="final-sub" data-reveal="rise">
            AVAILABLE FOR INTERNSHIPS · COLLABORATIONS · PROJECTS
          </p>

          <div className="signal" ref={signalRef} data-reveal="rise" onPointerMove={onMove} onPointerLeave={onLeave}>
            <div className="signal-rings" aria-hidden="true">
              <span className="ring ring-1" />
              <span className="ring ring-2" />
              <span className="ring ring-3" />
              <span className="ring ring-4" />
              <span className="signal-sweep" />
            </div>
            <div className="signal-core font-hero" aria-hidden="true">
              S.R.
            </div>
            {LINKS.map((l, i) => {
              const pos = polar(i, LINKS.length, 46);
              return (
                <a
                  key={l.label}
                  className="signal-link"
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ '--sx': `${pos.x}%`, '--sy': `${pos.y}%`, '--sa': `${pos.angle}deg` }}
                >
                  <span className="signal-dot" aria-hidden="true" />
                  <span className="signal-label">{l.label}</span>
                  <span className="signal-value">{l.value}</span>
                </a>
              );
            })}
          </div>

          <p className="final-foot" data-reveal="rise">
            © 2026 SHRUTI RAI — CRAFTED WITH A CAMERA, NOT A SCROLLBAR
          </p>
        </div>
        <div className="vignette" />
      </div>
      <div className="final-mark font-hero" aria-hidden="true">
        S.R.
      </div>
    </section>
  );
}
