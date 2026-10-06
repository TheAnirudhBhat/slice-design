// App splash (Figma Valentino ✅ 11762:12087 "0.0 Splash screen", cal:2026-10-07).
// Replaced the full-page shimmer — user: "use this as the splash screen when the
// app is opening… a small loader at the bottom, or progress if it's taking
// time… the experience of opening the app should be smooth".
// Background/Brand + the 140×56 white slice logo, dead centre. Shown by AppBase
// while boot.js waits for Rubik + the images; index.html paints a static twin
// on a phone before any JS runs, and this removes it once it's on screen.
// The loader stays hidden on a fast (cached) open and fades in only after
// SLOW_MS, as a thin progress bar fed by boot.js.
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BRAND_BG, WHITE, WHITE_20 } from '../tokens.js';
import { SPLASH_EXIT_MS } from '../boot.js';

const SLOW_MS = 600;

export default function Splash({ progress }) {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    document.getElementById('splash')?.remove();
    const t = setTimeout(() => setSlow(true), SLOW_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      aria-busy="true"
      aria-label="Loading slice"
      exit={{ opacity: 0 }}
      transition={{ duration: SPLASH_EXIT_MS / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3000,
        background: BRAND_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/assets/splash_logo.svg" alt="slice" width={140} height={56} style={{ display: 'block' }} />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: slow ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 72,
          width: 64,
          height: 3,
          marginLeft: -32,
          borderRadius: 100,
          background: WHITE_20,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.round(progress * 100)}%`,
            height: '100%',
            borderRadius: 100,
            background: WHITE,
            transition: 'width 200ms cubic-bezier(0.25,0.1,0.25,1)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
