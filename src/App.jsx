import React, { useEffect, useRef, useState } from 'react';
import Loading from './components/Loading.jsx';
import World from './components/World.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';

// Tiny hash router — #/project/01 opens the detail page, anything else is home.
function getRoute() {
  const m = window.location.hash.match(/^#\/project\/(\d+)/);
  return m ? { page: 'project', index: m[1] } : { page: 'home' };
}

// Which scene is the current scroll position in, and how far into it?
// Stored scene-relative so the restore survives viewport changes (pin
// spacers resize with the viewport, so absolute Y values go stale).
function captureJourneyPosition() {
  const y = window.scrollY;
  const scenes = [...document.querySelectorAll('[data-scene]')];
  let scene = scenes[0] ? scenes[0].getAttribute('data-scene') : null;
  let offset = 0;
  for (const s of scenes) {
    const top = s.getBoundingClientRect().top + y;
    if (top <= y + 10) {
      scene = s.getAttribute('data-scene');
      offset = Math.max(0, y - top);
    } else {
      break;
    }
  }
  return { scene, offset };
}

export default function App({ lenis }) {
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState(getRoute);
  const [returnInfo, setReturnInfo] = useState(null);
  const routeRef = useRef(route);

  useEffect(() => {
    const onHash = () => {
      const next = getRoute();
      if (next.page === 'project' && routeRef.current.page === 'home') {
        // Remember where the journey was when leaving for a project page.
        setReturnInfo(captureJourneyPosition());
        window.scrollTo(0, 0);
      } else if (next.page === 'home') {
        window.scrollTo(0, 0);
      }
      routeRef.current = next;
      setRoute(next);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReady = () => {
    setReady(true);
    lenis.start();
  };

  // Project detail pages are self-contained — no journey needed.
  if (route.page === 'project') {
    return <ProjectDetail index={route.index} />;
  }

  return (
    <>
      <header className="brand">
        <span className="brand-mark">S.R.</span>
        <span className="brand-tag">GANDHINAGAR · INDIA</span>
      </header>
      <div className="journey-progress" aria-hidden="true">
        <div id="journey-progress" />
      </div>

      {!ready && <Loading onDone={handleReady} />}
      {ready && <World lenis={lenis} returnInfo={returnInfo} />}
    </>
  );
}
