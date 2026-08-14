import React, { useEffect, useState } from 'react';
import Loading from './components/Loading.jsx';
import World from './components/World.jsx';

export default function App({ lenis }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReady = () => {
    setReady(true);
    lenis.start();
  };

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
