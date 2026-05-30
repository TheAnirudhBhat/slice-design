import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
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
// (`reference_web_proto.md` § "Agentation"). R23 fix-it-2-cont-10: rendered as
// a direct sibling of <App />, NO wrapper. The wrapper-with-pointer-events:
// none experiment broke the toolbar's click handler. agentation's own UI uses
// z-index 99994-100020 so it stacks above App's z-auto stage naturally.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Agentation
      onAnnotationAdd={(a) => console.log('[agentation] add', a)}
      onSubmit={(payload) => console.log('[agentation] submit', payload)}
    />
  </React.StrictMode>,
);
