import React, { useEffect, useState, useRef } from 'react';
import { euphoriaAudio } from '../lib/euphoriaAudio.js';

export default function Navbar({ lenis }) {
  const [activeSection, setActiveSection] = useState('name');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeRef = useRef('name');
  const scrolledRef = useRef(false);

  useEffect(() => {
    const unsub = euphoriaAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const nextScrolled = scrollY > 60;
          if (nextScrolled !== scrolledRef.current) {
            scrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
          }

          if (scrollY < 100) {
            if (activeRef.current !== 'name') {
              activeRef.current = 'name';
              setActiveSection('name');
            }
            ticking = false;
            return;
          }

          const sections = ['contact', 'facts', 'experience', 'projects', 'tech', 'about', 'name'];
          for (const s of sections) {
            const el = document.querySelector(`[data-scene="${s}"]`);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45) {
                if (activeRef.current !== s) {
                  activeRef.current = s;
                  setActiveSection(s);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sceneName) => {
    setMobileMenuOpen(false);

    if (sceneName === 'name') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const target = document.querySelector(`[data-scene="${sceneName}"]`);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.2, offset: -30 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const handleAudioToggle = () => {
    euphoriaAudio.toggle();
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
              {activeSection === item.id && <span className="dock-active-glow" />}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          {/* BTS Euphoria Instrumental Button */}
          <button
            onClick={handleAudioToggle}
            className={`action-btn bts-toggle ${isPlaying ? 'bts-on' : ''}`}
            title={isPlaying ? 'Euphoria Instrumental (BTS) — Click to Pause' : 'Play Euphoria Instrumental (BTS) 💜'}
            aria-label="Toggle Euphoria Instrumental"
          >
            <span className="bts-heart" aria-hidden="true">💜</span>
            <div className="sound-bars" aria-hidden="true">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </div>
            <span className="sound-label truncate max-w-[110px]">
              {isPlaying ? 'Euphoria' : 'Euphoria ♫'}
            </span>
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
          <button
            onClick={handleAudioToggle}
            className={`w-full py-3 px-4 rounded-xl border text-xs font-bold tracking-wider flex items-center justify-center gap-2 mb-3 transition-colors ${
              isPlaying
                ? 'border-purple-400 bg-purple-950/60 text-purple-200 shadow-lg shadow-purple-900/30'
                : 'border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            <span>💜</span>
            <span>{isPlaying ? 'PAUSE EUPHORIA (BTS)' : 'PLAY EUPHORIA INSTRUMENTAL (BTS)'}</span>
          </button>
          <a href="resume.pdf" target="_blank" rel="noopener noreferrer" className="mobile-resume-btn">
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </header>
  );
}
