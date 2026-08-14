import React, { useEffect, useState } from 'react';
import Loading from './components/Loading.jsx';
import World from './components/World.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';

// Tiny hash router — #/project/01 opens the detail page, anything else is home.
function getRoute() {
  const m = window.location.hash.match(/^#\/project\/(\d+)/);
  return m ? { page: 'project', index: m[1] } : { page: 'home' };
}

export default function App({ lenis }) {
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
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
      {ready && <World />}
    </>
  );
}
