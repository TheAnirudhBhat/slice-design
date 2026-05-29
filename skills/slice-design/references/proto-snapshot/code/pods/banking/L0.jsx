// Banking L0 — canonical per Figma node 885:19757 (PNUz3Dr9KSlFJSnsXsC0nL · cal:2026-05-29 R23 rewrite).
//
// Canonical anatomy (top to bottom):
//   1. App bar L0 — "Banking" H2 + eye-toggle + photo Avatar trailing
//   2. L0 Large card — Savings hero
//        — caption "Savings ••••5732" (14/20 Medium, tertiary)
//        — Display Small ₹45,800 (48/56 Medium, -0.48px tracking)
//        — green up-arrow + "Earn interest at 100% RBI repo rate" (14/20 Medium, positive)
//        — full-bleed divider within card
//        — Row: "Grow your savings (V-500 14M) / Earn interest daily (12R secondary)"
//          + V-500 "Add money" pill (14M, no icon)
//   3. L0 Medium card — Fixed deposits + rocket-mascot corner
//   4. L0 Medium card — monies + inline monies-mark glyph + cluster corner
//
// R23 fix-it pass:
//   • Page bg now transparent so App.jsx slate-10 wrapper bg shows through →
//     card 0.05-alpha drop shadows actually visible.
//   • Bottom fade overlay added (transparent → slate-10) above the floating
//     nav, matching the canonical bottom-nav gradient.
//   • monies brand mark now rendered as inline SVG (the PNG asset was too
//     small/transparent to read against white) — V-500 droplet + orange dot.

import React, { useEffect, useRef, useState } from 'react';
import { AppBar, EyeOpenGlyph, EyeClosedGlyph, usePageScroll } from '../../components/AppBar.jsx';
import BottomFade from '../../components/BottomFade.jsx';
import { useL1 } from '../../components/L1Stack.jsx';

// ---- Tokens ----
const CARD_BG = '#FFFFFF';
const CARD_SHADOW = '0px 4px 24px 0px rgba(0,0,0,0.08)';
const CARD_RADIUS = 16;
const PAGE_PAD = 24;
const CARD_PAD = 24;
const CARD_GAP = 16;
const TEXT_PRIMARY = 'rgba(0,0,0,0.9)';
const TEXT_SECONDARY = 'rgba(0,0,0,0.7)';
const TEXT_TERTIARY = 'rgba(0,0,0,0.5)';
const OUTLINE_SUBTLE = 'rgba(0,0,0,0.05)';
const V_500 = '#D30AD7';
const GREEN_500 = '#00A63E';
const SLATE_10 = '#F6F9FC';
const NAV_INSET = 140; // floating nav reserve

// ---- Inline glyphs ----
function ArrowUpIcon({ size = 16, color = GREEN_500 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 13V3M8 3 4 7M8 3l4 4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Canonical monies brand mark — fetched from Figma node 886:24912 (the same
// glyph that prefixes the monies amount on Banking L0 in DLS 2.0). Saved as
// monies_mark.png in public/assets. NEVER approximate with inline SVG — Figma
// is the source of truth, fetch the asset every time.
function MoniesMark({ height = 36 }) {
  return (
    <img
      src="/assets/monies_mark.png"
      alt=""
      aria-hidden="true"
      style={{
        height,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}

// ---- Savings hero — L0 Large card ----
function SavingsHero({ balanceHidden }) {
  return (
    <div
      style={{
        background: CARD_BG,
        borderRadius: CARD_RADIUS,
        padding: CARD_PAD,
        boxShadow: CARD_SHADOW,
        border: `1px solid ${OUTLINE_SUBTLE}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '0.28px',
            color: TEXT_TERTIARY,
            fontWeight: 500,
          }}
        >
          Savings ••••5732
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 48,
              lineHeight: '56px',
              letterSpacing: '-0.48px',
              color: TEXT_PRIMARY,
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {balanceHidden ? '₹•••••' : '₹45,800'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 24 }}>
            <ArrowUpIcon size={16} color={GREEN_500} />
            <span
              style={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: 14,
                lineHeight: '20px',
                letterSpacing: '0.28px',
                color: GREEN_500,
                fontWeight: 500,
              }}
            >
              Earn interest at 100% RBI repo rate
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            height: 1,
            background: OUTLINE_SUBTLE,
            margin: `0 -${CARD_PAD}px`,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 8,
            paddingTop: 16,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            <span
              style={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: 14,
                lineHeight: '20px',
                letterSpacing: '0.28px',
                color: V_500,
                fontWeight: 500,
              }}
            >
              Grow your savings
            </span>
            <span
              style={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: 12,
                lineHeight: '16px',
                letterSpacing: '0.24px',
                color: TEXT_SECONDARY,
                fontWeight: 400,
              }}
            >
              Earn interest daily
            </span>
          </div>
          <button
            style={{
              background: V_500,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 100,
              padding: '8px 16px',
              fontFamily: 'Rubik, sans-serif',
              fontSize: 14,
              lineHeight: '20px',
              letterSpacing: '0.28px',
              fontWeight: 500,
              cursor: 'pointer',
              flexShrink: 0,
              outline: 'none',
            }}
            aria-label="add money"
          >
            Add money
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Fixed deposits — L0 Medium card with rocket-mascot corner ----
function FixedDepositsCard({ balanceHidden }) {
  return (
    <div
      style={{
        position: 'relative',
        background: CARD_BG,
        borderRadius: CARD_RADIUS,
        padding: CARD_PAD,
        boxShadow: CARD_SHADOW,
        border: `1px solid ${OUTLINE_SUBTLE}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.28px',
          color: TEXT_TERTIARY,
          fontWeight: 500,
        }}
      >
        Fixed deposits
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 48,
            lineHeight: '56px',
            letterSpacing: '-0.48px',
            color: TEXT_PRIMARY,
            fontWeight: 500,
          }}
        >
          {balanceHidden ? '₹•••' : '₹0'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 24 }}>
          <ArrowUpIcon size={16} color={GREEN_500} />
          <span
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 14,
              lineHeight: '20px',
              letterSpacing: '0.28px',
              color: GREEN_500,
              fontWeight: 500,
            }}
          >
            Earn interest up to 7.75 p.a.
          </span>
        </div>
      </div>
      <img
        src="/assets/fd_card_corner.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 96,
          height: 96,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

// ---- monies — L0 Medium card with inline brand glyph + cluster corner ----
function MoniesCard({ balanceHidden }) {
  return (
    <div
      style={{
        position: 'relative',
        background: CARD_BG,
        borderRadius: CARD_RADIUS,
        padding: CARD_PAD,
        boxShadow: CARD_SHADOW,
        border: `1px solid ${OUTLINE_SUBTLE}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.28px',
          color: TEXT_TERTIARY,
          fontWeight: 500,
        }}
      >
        monies
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MoniesMark height={40} />
          <span
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 48,
              lineHeight: '56px',
              letterSpacing: '-0.48px',
              color: TEXT_PRIMARY,
              fontWeight: 500,
            }}
          >
            {balanceHidden ? '•••••' : '12,740'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 24 }}>
          <span
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 14,
              lineHeight: '20px',
              letterSpacing: '0.28px',
              color: V_500,
              fontWeight: 500,
            }}
          >
            Reward rate at 1%
          </span>
        </div>
      </div>
      <img
        src="/assets/monies_card_corner.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 96,
          height: 96,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

// ---- Page ----
export default function BankingL0({ onScrollChange }) {
  const [balanceHidden, setBalanceHidden] = useState(false);
  const scrollRef = useRef(null);
  const scrolled = usePageScroll(scrollRef);
  const { push } = useL1();
  // R24 cont-13: lift scroll state up so App.jsx's 54px status reserve can
  // also paint white when this L0 is scrolled (matches the AppBar's scroll
  // elevation so the cards don't bleed past the chrome).
  useEffect(() => { onScrollChange?.(scrolled); }, [scrolled, onScrollChange]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        ref={scrollRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent', // let App.jsx slate-10 page bg show through
          fontFamily: 'Rubik, sans-serif',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar
          scroll={scrolled}
          variant="l0"
          title="Banking"
          actions={[
            <button
              key="eye"
              onClick={() => setBalanceHidden((v) => !v)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                // R24 cont-11: color removed — let parent ActionSlot drive the
                // tertiary fill via opacity:0.5 (works for both the PNG eye and
                // future inline SVG icons).
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
              aria-label={balanceHidden ? 'show balance' : 'hide balance'}
            >
              {balanceHidden ? <EyeClosedGlyph /> : <EyeOpenGlyph />}
            </button>,
          ]}
          avatar={
            <img
              src="/assets/avatar_only.png"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              aria-label="profile photo"
            />
          }
          onAvatarTap={() => push('profile')}
        />

        <div
          style={{
            padding: `8px ${PAGE_PAD}px ${NAV_INSET}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: CARD_GAP,
          }}
        >
          <SavingsHero balanceHidden={balanceHidden} />
          <FixedDepositsCard balanceHidden={balanceHidden} />
          <MoniesCard balanceHidden={balanceHidden} />
        </div>
      </div>
      <BottomFade color="#FFFFFF" height={200} />
    </div>
  );
}
