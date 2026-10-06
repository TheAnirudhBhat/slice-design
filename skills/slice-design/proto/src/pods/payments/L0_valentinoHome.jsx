// Payments L0 — "Valentino home" — canonical per Figma node 885:19901
// (PNUz3Dr9KSlFJSnsXsC0nL · cal:2026-05-29 R23 rewrite).
//
// Canonical anatomy (top to bottom):
//   1. Status bar (rendered globally by App.jsx as fixed overlay)
//   2. App bar — 64px row (Figma Valentino ✅ 10028:8953, cal:2026-10-06):
//        LEFT  : "Check balance" + chevron (no border, 14/20 Regular)
//        RIGHT : chat glyph + 40 photo avatar
//   3. Action pills row — fire · monies · UPI ID (Figma Valentino ✅ 10028:9340
//      "Pre-scan", cal:2026-10-06). The UPI ID moved UP here from under the amount.
//   4. Top Section (centered, flex-1):
//        — ₹0 Display Large (80/96 Regular, -0.8px letter-spacing)
//   5. Bottom Section (anchored, 16px gap between rows):
//        — Custom keypad (4 rows × 3 cols, 20/24 Medium digits, 72px gap between cols)
//        — Save | Transfer button row (Save replaced Request, matching the live app) (white-20 bg, 16/24 Medium, equal flex)
//   6. Bottom nav (rendered by App.jsx)

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useL1 } from '../../components/L1Stack.jsx';
import { SPLASH_EXIT_MS, useBoot } from '../../boot.js';
import Avatar from '../../components/Avatar.jsx';
import formatINR from '../../utils/formatINR.js';

import { BRAND_BG, WHITE, WHITE_05, WHITE_10, WHITE_20, WHITE_70 } from '../../tokens.js';

const USER_AVATAR_URL = '/assets/avatar_only.png';
const UPI_ID = 'rajan@sliceaxis';

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'backspace'],
];

function fontSizeForAmount(amountStr) {
  const digits = String(amountStr).split('.')[0].replace(/\D/g, '').length;
  if (digits <= 3) return 80;
  if (digits === 4) return 72;
  if (digits === 5) return 64;
  if (digits === 6) return 56;
  return 48;
}

function AppBar({ onAvatarTap }) {
  // Figma Valentino ✅ 10028:8953 "App bar / Dropdown" (cal:2026-10-06): 24/12 padding,
  // 40-tall row. LEFT: "Check balance" + 16 chevron, 5 gap, no pill border any more.
  // RIGHT (gap 28): 18 chat glyph, 40 avatar (48 hit) like every L0, no ring.
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px', // 8 not Figma's 12: the 48 avatar hit-area keeps the bar at 64
      }}
    >
      <button
        style={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          background: 'transparent',
          border: 'none',
          padding: 0,
          color: WHITE,
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 400,
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.28px',
          filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.08))',
          cursor: 'pointer',
          outline: 'none',
        }}
        aria-label="check balance"
      >
        Check balance
        <img src="/assets/icons/appbar_chevron.svg" alt="" width={16} height={16} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 /* 28 visual − 4 hit-area inset */ }}>
        <button
          style={{
            height: 40,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="chat"
        >
          <img src="/assets/icons/appbar_chat.svg" alt="" width={18} height={18} />
        </button>

        <Avatar size={40} photo={USER_AVATAR_URL} hit onTap={onAvatarTap} ariaLabel="profile" />
      </div>
    </div>
  );
}

// ── Action pills ─────────────────────────────────────────────────────────────
// Figma Valentino ✅ 10028:9340 ("Pre-scan"): the user's current design, and the row
// slice-wallpaper ships (canonical 4802:17211 there). User: "we have removed this [the
// UPI chip under the amount] and added the action pills up top" — the UPI ID is the
// rightmost pill, the identity anchor that never dismisses (reference_pod_payments).
// Row: 64 band, 16 above / 12 below, 24 sides, 12 between pills; it scrolls, no mask.
// Pill: 36 tall, Circle, 10/16 padding (fire 10/14/10/12), 16 glyph box + 4 + label.
// Colours by variable name: label + glyphs = Text&Icons/On color/Secondary → WHITE_70.
// The fill is a raw #D828DC in Figma = white ~12% over V-500 → the DLS translucent-white
// rule → WHITE_10, which also holds on the dark (#090B0C) Pay page. Stroke 1.5px
// Alpha/White/a05 on EVERY pill — Figma's fire pill has none; user: "this one
// doesn't have an outline".
const PILL_TEXT = {
  fontFamily: 'Rubik, sans-serif',
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '16px',
  letterSpacing: '0.24px',
  color: WHITE_70,
  whiteSpace: 'nowrap',
};

// Official glyphs (exported from 10028:9340, made opaque) tinted with the token as a
// mask, so their alpha isn't applied twice.
function PillGlyph({ src, width = 16 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width,
        height: 16,
        flexShrink: 0,
        background: WHITE_70,
        WebkitMask: `url(${src}) center / contain no-repeat`,
        mask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}

function ActionPill({ label, style, intro, children }) {
  return (
    <motion.button
      data-pill
      initial={false}
      animate={intro?.animate ?? { x: 0, opacity: 1 }}
      transition={intro?.transition}
      type="button"
      aria-label={label}
      style={{
        height: 36,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '0 16px',
        background: WHITE_10,
        backdropFilter: 'blur(5px)', // Figma 11762:11611 pills: backdrop-blur 5
        WebkitBackdropFilter: 'blur(5px)',
        border: `1.5px solid ${WHITE_05}`,
        borderRadius: 100,
        cursor: 'pointer',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

// First-open entrance (Figma Valentino ✅ 11762:11598, cal:2026-10-07): three static
// frames read as a sequence — the pills sit in a tight centred stack (hidden), fade
// in as a looser overlapping stack, then fan out to their row. Once per app open,
// once the splash has lifted. Stack steps are the frames' left-edge
// deltas (~12, then ~55); the fan uses the row's ease-in-out curve.
const INTRO_STEPS = [12, 56];
const INTRO_FADE = { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] };
const INTRO_FAN = { duration: 0.5, ease: [0.65, 0, 0.35, 1] };
let introPlayed = false;

function usePillsIntro(rowRef) {
  const { ready } = useBoot();
  const [stage, setStage] = useState(introPlayed ? null : { i: 0, x: [] }); // null = at rest
  useLayoutEffect(() => {
    if (introPlayed || !ready || !rowRef.current) return undefined;
    introPlayed = true;
    // rest positions → each pill's x offset into a centred stack of step s
    const pills = [...rowRef.current.querySelectorAll('[data-pill]')];
    const W = rowRef.current.clientWidth;
    const stack = (s) => {
      const extent = Math.max(...pills.map((p, i) => i * s + p.offsetWidth));
      const start = (W - extent) / 2;
      return pills.map((p, i) => start + i * s - p.offsetLeft);
    };
    const [tight, loose] = INTRO_STEPS.map(stack);
    setStage({ i: 0, x: tight });
    const timers = [
      setTimeout(() => setStage({ i: 1, x: loose }), SPLASH_EXIT_MS),
      setTimeout(() => setStage(null), SPLASH_EXIT_MS + INTRO_FADE.duration * 1000),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  // per-pill props for ActionPill (index = DOM order in the row)
  return (i) => {
    if (!stage) return { animate: { x: 0, opacity: 1 }, transition: INTRO_FAN };
    if (stage.i === 0) return { animate: { x: stage.x[i] ?? 0, opacity: 0 }, transition: { duration: 0 } };
    return { animate: { x: stage.x[i] ?? 0, opacity: 1 }, transition: INTRO_FADE };
  };
}

function ActionPills({ upiId }) {
  const rowRef = useRef(null);
  const intro = usePillsIntro(rowRef);
  return (
    <div
      ref={rowRef}
      className="no-scrollbar"
      style={{ height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px 12px', overflowX: 'auto' }}
    >
      <ActionPill label="8 fires left" style={{ padding: '0 14px 0 12px' }} intro={intro(0)}>
        <PillGlyph src="/assets/icons/pill_fire.svg" />
        <span style={PILL_TEXT}>8 fires left</span>
      </ActionPill>
      {/* 94 fixed = the compact "no monies yet" state; the value variant is wider */}
      <ActionPill label="monies" style={{ width: 94 }} intro={intro(1)}>
        <PillGlyph src="/assets/icons/pill_monies.svg" />
        <span style={PILL_TEXT}>monies</span>
      </ActionPill>
      <ActionPill label={`UPI ID ${upiId}`} intro={intro(2)}>
        <PillGlyph src="/assets/icons/pill_upi.svg" width={31} />
        {/* UPI ID in primary white (user, cal:2026-10-06) — it is the identity anchor */}
        <span style={{ ...PILL_TEXT, color: WHITE }}>{upiId}</span>
      </ActionPill>
    </div>
  );
}

function AmountHero({ amount }) {
  const formatted = formatINR(amount);
  const fontSize = fontSizeForAmount(amount);
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
      }}
    >
      {/* ₹0 Display Large — 80/96 Regular, -0.8 letter-spacing */}
      <div
        style={{
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 400,
          fontSize,
          lineHeight: '96px',
          letterSpacing: '-0.8px',
          color: WHITE,
          whiteSpace: 'nowrap',
          transition: 'font-size 220ms cubic-bezier(0.25,0.1,0.25,1)',
        }}
      >
        ₹{formatted}
      </div>
      {/* No UPI chip here any more — it is the rightmost action pill (cal:2026-10-06). */}
    </div>
  );
}

function KeypadKey({ value, onTap }) {
  const isBackspace = value === 'backspace';
  return (
    <button
      onClick={() => onTap(value)}
      style={{
        width: 48,
        height: 48,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label={isBackspace ? 'backspace' : value}
      className="slice-keypad-key"
    >
      {isBackspace ? (
        // Backspace = chevron rotated to point left, white
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 6L9 12L15 18"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : value === '.' ? (
        <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 24, color: WHITE, lineHeight: 1 }}>
          •
        </span>
      ) : (
        <span
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            fontSize: 20,
            lineHeight: '24px',
            letterSpacing: '0.4px',
            color: WHITE,
          }}
        >
          {value}
        </span>
      )}
    </button>
  );
}

function Keypad({ onTap }) {
  // Per canonical Figma node 885:19901 + R23 fix-it-2 user direction: keypad
  // rows respect the SAME horizontal margin (24px) as the Request|Transfer
  // row below — 3 keys distributed via `space-between` across the full width
  // minus 24px gutters, so the leftmost (1/4/7/.) sits on the same vertical
  // axis as the left edge of the Request pill, and the rightmost (3/6/9/⌫)
  // sits on the right edge of the Transfer pill.
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
      }}
    >
      {KEYPAD.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // R23 fix-it-2-cont-9: user direction — "the margin on the keypad
            // should be 12 instead of 8". So 24px page gutter + 12px breathing
            // = 36px each side. Tighter cluster, same canonical-aligned rule.
            padding: '0 36px',
          }}
        >
          {row.map((key, i) => (
            <KeypadKey key={`${ri}-${i}`} value={key} onTap={onTap} />
          ))}
        </div>
      ))}
    </div>
  );
}

function RequestTransferRow() {
  // Below the keypad. Both buttons share the row equally (flex 1 each).
  return (
    <div style={{ display: 'flex', gap: 16, padding: '0 24px', width: '100%' }}>
      <button
        style={{
          flex: 1,
          background: WHITE_20,
          color: WHITE,
          border: 'none',
          padding: '12px 24px',
          borderRadius: 100,
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: '0.32px',
          cursor: 'pointer',
          outline: 'none',
        }}
        aria-label="save money"
      >
        Save
      </button>
      <button
        style={{
          flex: 1,
          background: WHITE_20,
          color: WHITE,
          border: 'none',
          padding: '12px 24px',
          borderRadius: 100,
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: '0.32px',
          cursor: 'pointer',
          outline: 'none',
        }}
        aria-label="transfer money"
      >
        Transfer
      </button>
    </div>
  );
}

export default function L0ValentinoHome({ onScrollChange }) {
  // eslint-disable-next-line no-unused-vars
  const _ = onScrollChange; // R24 cont-13: Pay/Valentino is immersive (no scroll-elevation chrome) — accept and ignore.
  const [amount, setAmount] = useState('0');
  const { push } = useL1();

  const handleKey = (key) => {
    setAmount((prev) => {
      if (key === 'backspace') {
        if (prev.length <= 1) return '0';
        return prev.slice(0, -1);
      }
      if (key === '.') {
        if (prev.includes('.')) return prev;
        return prev + '.';
      }
      if (prev === '0') return key;
      const [intPart, decPart] = prev.split('.');
      if (decPart === undefined) {
        const proposed = Number(intPart + key);
        if (proposed > 5000000) return prev; // ₹50,00,000 cap
        if ((intPart + key).length > 7) return prev;
      }
      return prev + key;
    });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: BRAND_BG,
        // backdrop root for the pills' blur: it samples this page only, never the
        // black bezel past the screen edge (user screenshot: a dark smear at the right)
        clipPath: 'inset(0)',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 140, // floating bottom nav reserve
      }}
    >
      <AppBar onAvatarTap={() => push('profile')} />
      <ActionPills upiId={UPI_ID} />
      <AmountHero amount={amount} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingBottom: 8,
        }}
      >
        <Keypad onTap={handleKey} />
        <RequestTransferRow />
      </div>
    </div>
  );
}
