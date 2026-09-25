import React, { useState } from 'react';
import { CONTACT } from '../data.js';
import { sounds } from '../lib/sound.js';

const LINKS = [
  { label: 'GitHub', href: CONTACT.github, desc: 'github.com/shrutirai29', icon: '💻' },
  { label: 'LinkedIn', href: CONTACT.linkedin, desc: 'linkedin.com/in/shruti-rai', icon: '💼' },
  { label: 'LeetCode', href: CONTACT.leetcode, desc: 'leetcode.com/u/Shruti_rai', icon: '⚡' },
  { label: 'TryHackMe', href: CONTACT.tryhackme, desc: 'tryhackme.com/p/shruti.r8524', icon: '🛡️' },
  { label: 'Instagram', href: CONTACT.instagram, desc: '@shruti.r8524', icon: '📸' },
];

export default function ContactScene() {
  const [copiedType, setCopiedType] = useState(null);

  const copyToClipboard = (text, type) => {
    sounds.playChime(780, 0.2);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    });
  };

  return (
    <section className="scene" data-scene="contact" aria-label="Contact Me">
      <div className="stage" data-stage>
        <div className="final-content">
          <span className="kicker final-kicker" data-reveal="rise">
            06 · CONNECT &amp; COLLABORATE
          </span>
          <h2 className="final-title font-hero" data-reveal="clip">
            Let&rsquo;s build
            <br />
            <em>something memorable.</em>
          </h2>
          <p className="final-sub" data-reveal="rise">
            OPEN FOR INTERNSHIPS · FULL-STACK &amp; AI ENGINEERING · RESEARCH COLLABORATIONS
          </p>

          {/* Quick Communication Hub */}
          <div className="contact-hub-card" data-reveal="rise">
            <div className="hub-top">
              <div className="hub-status">
                <span className="hub-dot" />
                <span>CURRENTLY AVAILABLE FOR OPPORTUNITIES</span>
              </div>
              <div className="hub-location">📍 GANDHINAGAR, GUJARAT, INDIA</div>
            </div>

            <div className="hub-actions">
              <div className="hub-action-box">
                <span className="hub-label">PRIMARY EMAIL</span>
                <div className="hub-value-row">
                  <a href={`mailto:${CONTACT.email}`} className="hub-value hub-email font-mono">
                    {CONTACT.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(CONTACT.email, 'email')}
                    className="copy-btn"
                    title="Copy email to clipboard"
                  >
                    {copiedType === 'email' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="hub-action-box">
                <span className="hub-label">PHONE / WHATSAPP</span>
                <div className="hub-value-row">
                  <a href="tel:+917007787536" className="hub-value font-mono">
                    +91 7007787536
                  </a>
                  <button
                    onClick={() => copyToClipboard('+917007787536', 'phone')}
                    className="copy-btn"
                    title="Copy phone to clipboard"
                  >
                    {copiedType === 'phone' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="hub-action-box hub-resume-box">
                <span className="hub-label">OFFICIAL CV</span>
                <a
                  href="resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-resume-cta"
                >
                  <span>Download Resume (PDF)</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* Editorial Social Grid */}
          <nav className="final-social-grid" data-reveal="rise" aria-label="Social and coding profiles">
            {LINKS.map((l) => (
              <a
                key={l.label}
                className="social-tile"
                href={l.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sounds.playHover()}
              >
                <div className="social-tile-icon" aria-hidden="true">{l.icon}</div>
                <div className="social-tile-info">
                  <span className="social-tile-label">{l.label}</span>
                  <span className="social-tile-desc">{l.desc}</span>
                </div>
                <span className="social-tile-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </nav>

          <p className="final-foot" data-reveal="rise">
            © 2026 SHRUTI RAI — ENGINEERED WITH REACT, GSAP &amp; PRECISION
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
