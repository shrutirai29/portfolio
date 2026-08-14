import React from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import App from './App.jsx';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// The journey always starts at S.R. — never restore a deep scroll position.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Smooth cinematic scroll (Lenis) synced with the GSAP scroll system.
const lenis = new Lenis({
  duration: 1.15,
  smoothWheel: true,
  wheelMultiplier: 1,
});
lenis.stop(); // locked while the loading scene plays
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')).render(<App lenis={lenis} />);
