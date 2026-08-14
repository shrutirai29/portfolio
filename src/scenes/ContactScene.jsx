import React from 'react';
import { CONTACT } from '../data.js';

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
        <div className="scene-content contact-content">
          <div className="contact-eyebrow" data-reveal="rise">
            THE END OF THE JOURNEY
          </div>
          <h2 className="contact-heading font-hero" data-reveal="clip">
            Contact Me
          </h2>
          <p className="contact-sub" data-reveal="rise">
            Let&rsquo;s build something amazing together.
          </p>
          <div className="contact-links">
            {LINKS.map((l) => (
              <a key={l.label} className="contact-link" href={l.href} target="_blank" rel="noreferrer" data-reveal="rise">
                <span className="contact-label">{l.label}</span>
                <span className="contact-value">{l.value}</span>
                <span className="contact-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
          <p className="contact-foot" data-reveal="rise">
            © 2026 Shruti Rai — crafted with a camera, not a scrollbar.
          </p>
        </div>
        <div className="vignette" />
      </div>
    </section>
  );
}
