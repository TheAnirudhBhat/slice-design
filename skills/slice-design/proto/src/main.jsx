import React from 'react';
import ReactDOM from 'react-dom/client';
// Self-hosted Rubik (bundled via @fontsource) — NEVER rely on the Google Fonts
// CDN. On slice's corporate network fonts.gstatic.com is throttled/blocked, so
// the CDN <link> silently fell back to system fonts on Medium (500) weight
// (card headings looked "not Rubik" while 400 body stayed fine). Bundling makes
// every weight load offline. (R24 cont-31)
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';
import App from './App.jsx';
import './index.css';

// Agentation: click any element → annotate → emit structured markdown the user
// can paste back. Mandatory in every slice proto per slice-design skill rules
// (`reference_web_proto.md` "Agentation"). R23 fix-it-2-cont-10: rendered as
// a direct sibling of <App />, NO wrapper. The wrapper-with-pointer-events:
// none experiment broke the toolbar's click handler. agentation's own UI uses
// z-index 99994-100020 so it stacks above App's z-auto stage naturally.
// Hide the Agentation toolbar in full-bleed device/mobile view — it's a desktop
// design-review tool and shouldn't show on a real phone. Same query as App's
// useIsMobile (phone viewport OR installed PWA). Still mounted on desktop, so the
// skill's "agentation wired in every proto" rule holds for the review surface.
// Lazy, so a phone never downloads or parses it (~400 KB).
const Agentation = React.lazy(() => import('agentation').then((m) => ({ default: m.Agentation })));
function MaybeAgentation() {
  const query = '(max-width: 600px), (display-mode: standalone)';
  const [mobile, setMobile] = React.useState(
    typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMobile(mq.matches);
    mq.addEventListener?.('change', on);
    window.addEventListener('resize', on);
    return () => {
      mq.removeEventListener?.('change', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  if (mobile) return null;
  return (
    <React.Suspense fallback={null}>
      <Agentation
        onAnnotationAdd={(a) => console.log('[agentation] add', a)}
        onSubmit={(payload) => console.log('[agentation] submit', payload)}
      />
    </React.Suspense>
  );
}

// Standalone skill proto = clean app view. The debug panel (the proto's second
// view) is OPT-IN: enable it with the ?debug URL param for skill-author testing.
// A derived project enables it in its own wrapper: <App debug debugContent={...} />.
const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
const debugEnabled = params.has('debug');

// ?playground → the canonical-URL gallery (dev chrome, lazy so the clean app
// path bundles nothing extra). ?playground=screen:<pod> → the FULL app at that
// pod (the canonical per-screen screenshot URL).
const playgroundParam = params.get('playground');
const Playground = React.lazy(() => import('./playground/Playground.jsx'));

let root;
if (params.has('playground') && !(playgroundParam || '').startsWith('screen:')) {
  root = (
    <React.Suspense fallback={null}>
      <Playground initialEntry={playgroundParam || undefined} />
    </React.Suspense>
  );
} else if ((playgroundParam || '').startsWith('screen:')) {
  root = <App initialPod={playgroundParam.slice('screen:'.length)} />;
} else {
  root = <App debug={debugEnabled} initialDebugOpen={debugEnabled} />;
}

// Image cache (public/sw.js) — production only, so the dev server never serves a
// stale asset out of it.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}

// No StrictMode: in dev it renders every component twice and runs every effect
// twice, and the phone views the proto through the dev server.
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {root}
    <MaybeAgentation />
  </>,
);
