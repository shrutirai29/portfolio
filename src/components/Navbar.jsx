import React, { useEffect, useState } from 'react';
import { sounds } from '../lib/sound.js';

export default function Navbar({ lenis }) {
  const [activeSection, setActiveSection] = useState('name');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      // Detect active section
      const sections = ['name', 'about', 'tech', 'projects', 'experience', 'facts', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(`[data-scene="${sections[i]}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sceneName) => {
    sounds.playChime(640, 0.15);
    setMobileMenuOpen(false);
    const target = document.querySelector(`[data-scene="${sceneName}"]`);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      if (lenis) {
        lenis.scrollTo(top, { duration: 1.4 });
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const handleAudioToggle = () => {
    const on = sounds.toggleMute();
    setIsAudioOn(on);
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'tech', label: 'Tech' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Journey' },
    { id: 'facts', label: 'Facts' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <div className="header-inner">
        {/* Left: Brand logo */}
        <button
          className="brand-interactive"
          onClick={() => scrollToSection('name')}
          aria-label="Scroll to top"
        >
          <span className="brand-symbol font-hero">S.R.</span>
          <span className="brand-dot-pulse" />
          <span className="brand-sub">GANDHINAGAR</span>
        </button>

        {/* Center: Floating Capsule Navigation */}
        <nav className="desktop-dock" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`dock-link ${activeSection === item.id ? 'dock-link-active' : ''}`}
            >
              <span className="dock-link-text">{item.label}</span>
              {activeSection === item.id && <span className="dock-active-glow" layoutid="activeGlow" />}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          {/* Sound FX Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`action-btn sound-toggle ${isAudioOn ? 'sound-on' : ''}`}
            title={isAudioOn ? 'Mute sound effects' : 'Enable ambient soundscape & interaction chimes'}
            aria-label="Toggle Sound"
          >
            <div className="sound-bars" aria-hidden="true">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </div>
            <span className="sound-label">{isAudioOn ? 'SFX ON' : 'SFX'}</span>
          </button>

          {/* Resume PDF Download/View */}
          <a
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn resume-btn"
            title="Download Shruti Rai's Resume (PDF)"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>RESUME</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            className={`mobile-menu-trigger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="mobile-dock-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`mobile-dock-link ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className="mobile-dock-num font-hero">
                0{navItems.findIndex((x) => x.id === item.id) + 1}
              </span>
              <span className="mobile-dock-text">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="mobile-drawer-footer">
          <a href="resume.pdf" target="_blank" rel="noopener noreferrer" className="mobile-resume-btn">
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </header>
  );
}
