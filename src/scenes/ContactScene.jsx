import React from 'react';
import { CONTACT } from '../data.js';

// A quiet, premium closing — big serif invitation, one refined link list,
// and a single bookend S.R. at the very end.
const LINKS = [
  { label: 'GitHub', href: CONTACT.github },
  { label: 'LinkedIn', href: CONTACT.linkedin },
  { label: 'Instagram', href: CONTACT.instagram },
  { label: 'Email', href: `mailto:${CONTACT.email}` },
  { label: 'LeetCode', href: CONTACT.leetcode },
  { label: 'TryHackMe', href: CONTACT.tryhackme },
];

export default function ContactScene() {
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

          <nav className="final-links" data-reveal="rise" aria-label="Contact links">
            {LINKS.map((l) => (
              <a key={l.label} className="final-link" href={l.href} target="_blank" rel="noreferrer">
                <span className="final-link-text">{l.label}</span>
                <span className="final-link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </nav>

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
