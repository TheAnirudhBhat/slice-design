// Bottom fade overlay — content scrolls behind it; cards fade into the page-bg
// just above the floating bottom nav. Reusable across white-page pods.
//
// Usage:
//   <div style={{position:'relative', width:'100%', height:'100%', overflow:'hidden'}}>
//     <ScrollContent ... />
//     <BottomFade color="#F6F9FC" />
//   </div>
//
// `color` should match the underlying page bg so the gradient resolves cleanly.

import React from 'react';

// R23 fix-it-2-cont-14: default height bumped 140 → 200 per user — fade must
// fully obscure scrolling content behind the floating nav (transactions in
// Activity were peeking through the gap above the dock).
export default function BottomFade({ color = 'var(--page-bg)', height = 200 }) {
  // Build the start/end gradient stops by stripping alpha at start.
  const transparent = colorWithAlpha(color, 0);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height,
        background: `linear-gradient(to bottom, ${transparent} 0%, ${color} 60%)`,
        pointerEvents: 'none',
        zIndex: 5,
      }}
      aria-hidden="true"
    />
  );
}

function colorWithAlpha(hex, alpha) {
  // Accepts "#RRGGBB". Returns "rgba(r,g,b,alpha)".
  if (!hex.startsWith('#') || hex.length !== 7) {
    // Fall back: emit a transparent value for the start stop.
    return 'rgba(255,255,255,0)';
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
