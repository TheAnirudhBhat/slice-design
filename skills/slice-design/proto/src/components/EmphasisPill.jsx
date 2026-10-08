// Emphasis action pill — the ONE pill on the Pay home's action-pills row that is
// "more important right now" (a nudge: birthday gift, new spark live, an offer).
// Canon (user, cal:2026-10-07, from the birthday pill): it looks exactly like the
// other action pills — same white-10 fill, same 1.5px white-05 outline — and is
// emphasised only by MOTION: once it has landed, a soft white arc sweeps round its
// rim once (2.6s, ease-in-out) and fades, leaving a normal pill. Max one per row.
// Shared by both protos so future nudges stay consistent with the app.
//
//   glide     its own arrival (slides in from the left); false when something else
//             moves it in (the Pay home's first-open pill entrance)
//   arcDelay  seconds until the sweep — after it has landed, or after it is let go
//   emphasize false holds the sweep while something bigger is on screen (the birthday
//             balloons); it runs arcDelay s after this turns true
//   children  the pill's content: a 16px glyph + label, as ActionPill
//
// The arc lives IN the background (a conic wedge whose angle --arc and brightness
// --arc-a animate) over the resting rim: a rotating child layer was painted ABOVE
// the face by iOS WebKit, smearing the arc across the pill (IMG_3811).
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.65, 0, 0.35, 1];

export default function EmphasisPill({ label, onTap, glide = true, arcDelay = 0.55, emphasize = true, children, ...rest }) {
  const reduce = useReducedMotion();
  const slide = glide && !reduce;
  return (
    <motion.button
      type="button"
      onClick={onTap}
      aria-label={label}
      {...rest}
      // a smooth ease-in-out glide, no spring (user: "smooth ease in ease out, and not
      // a bouncy effect")
      initial={reduce ? false : { ...(slide && { opacity: 0, x: -32, scale: 0.94 }), '--arc': '0deg', '--arc-a': 0 }}
      animate={reduce ? { opacity: 1, x: 0, scale: 1 } : { opacity: 1, x: 0, scale: 1, ...(emphasize && { '--arc': '360deg', '--arc-a': [0, 0.55, 0.55, 0] }) }}
      transition={{
        duration: 0.55,
        ease: EASE,
        // slow and soft (user, cal:2026-10-07: "smoother and more subtle… way too fast")
        '--arc': { duration: 2.6, delay: arcDelay, ease: [0.37, 0, 0.63, 1] },
        '--arc-a': { duration: 2.6, delay: arcDelay, times: [0, 0.2, 0.75, 1], ease: 'easeInOut' },
      }}
      style={{
        position: 'relative',
        height: 36,
        flexShrink: 0,
        padding: 0,
        border: 'none',
        borderRadius: 100,
        overflow: 'hidden',
        // at rest the rim is ActionPill's: WHITE_05 stroke over the WHITE_10 fill
        background:
          'conic-gradient(from var(--arc, 0deg), transparent 0deg 230deg, rgba(255,255,255,var(--arc-a, 0)) 320deg, transparent 360deg), linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)), rgba(255,255,255,0.1)', // dls-lint-ok: animated white arc
        cursor: 'pointer',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* face: the page colour under the same white-10 wash as ActionPill, so the arc
         only shows at the rim */}
      <span aria-hidden="true" style={{ position: 'absolute', inset: 1.5, borderRadius: 100, background: 'var(--brand-bg)' }} />
      <span aria-hidden="true" style={{ position: 'absolute', inset: 1.5, borderRadius: 100, background: 'rgba(255,255,255,0.1)' /* dls-lint-ok: WHITE_10, as ActionPill */ }} />
      <span style={{ position: 'relative', height: 36, display: 'flex', alignItems: 'center', gap: 4, padding: '0 16px 0 12px' }}>
        {children}
      </span>
    </motion.button>
  );
}
