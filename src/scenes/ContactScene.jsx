import React from 'react';
import { CONTACT } from '../data.js';

// Editorial closing index — the same language as the Projects rows:
// label · handle · arrow, with a quiet hover interaction.
const LINKS = [
  { label: 'GitHub', value: 'shrutirai29', href: CONTACT.github },
  { label: 'LinkedIn', value: 'Shruti Rai', href: CONTACT.linkedin },
  { label: 'Instagram', value: '@shruti.r8524', href: CONTACT.instagram },
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'LeetCode', value: 'Shruti_rai', href: CONTACT.leetcode },
  { label: 'TryHackMe', value: 'shruti.r8524', href: CONTACT.tryhackme },
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

          <div className="contact-index" data-reveal="rise">
            {LINKS.map((l) => (
              <a key={l.label} className="contact-row" href={l.href} target="_blank" rel="noreferrer">
                <span className="contact-label">{l.label}</span>
                <span className="contact-value">{l.value}</span>
                <span className="contact-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
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
