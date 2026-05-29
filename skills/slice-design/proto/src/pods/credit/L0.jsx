// Credit L0 — canonical per Figma file PNUz3Dr9KSlFJSnsXsC0nL node 885:20015.
// Icons + photo avatar extracted directly from canonical (R23 cal:2026-05-29).
//
// Anatomy:
//   • App bar L0: "Credit" title (24/32 Medium) + photo Avatar trailing (40×40 in 48 hit)
//   • L0 Large card:
//       — "Spends • 5 Jun - 4 Jul" caption (14/20 Medium, tertiary text)
//       — ₹1,00,550 Display Small (48/56 Medium, -0.48 letter-spacing)
//       — 2 inline insight rows with 16px line glyphs (NOT mini-Avatars):
//           Blue car + "Paid ₹370 to Uber"
//           Red bag + "Paid ₹180 to Sampath stores"
//       — In-card slate-10 callout "Invite a friend / You have the power"
//         with the canonical scatter glyph (24px)
//   • L0 Medium card: "Meet your slice super card / Discover the benefits"
//     with super_card_mascot illustration trailing
//   • Page bg #FFFFFF — content scrolls under sticky AppBar with elevation

import React, { useEffect, useRef } from 'react';
import { AppBar, usePageScroll } from '../../components/AppBar.jsx';
import { useL1 } from '../../components/L1Stack.jsx';

const PAGE_BG = '#FFFFFF';
const CARD_BG = '#FFFFFF';
const CARD_SHADOW = '0px 4px 24px 0px rgba(0,0,0,0.08)';
const CARD_BORDER = '1px solid rgba(0,0,0,0.05)';
const CARD_RADIUS = 16;
const PAGE_PAD = 24;
const CARD_PAD = 24;
const CARD_GAP = 16;
const NAV_INSET = 120;
const SLATE_10 = '#F6F9FC';
const TEXT_PRIMARY = 'rgba(0,0,0,0.9)';
const TEXT_SECONDARY = 'rgba(0,0,0,0.7)';
const TEXT_TERTIARY = 'rgba(0,0,0,0.5)';

function PhotoAvatar() {
  return (
    <img
      src="/assets/avatar_only.png"
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      aria-label="profile photo"
    />
  );
}

function SpendsCard() {
  return (
    <div
      style={{
        background: CARD_BG,
        border: CARD_BORDER,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
        padding: CARD_PAD,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Caption */}
        <div
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 500,
            letterSpacing: '0.28px',
            color: TEXT_TERTIARY,
          }}
        >
          Spends • 5 Jun - 4 Jul
        </div>

        {/* Display amount + 2 inline insight rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 48,
              lineHeight: '56px',
              fontWeight: 500,
              letterSpacing: '-0.48px',
              color: TEXT_PRIMARY,
            }}
          >
            ₹1,00,550
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <InsightRow icon="/assets/credit_car.svg" text="Paid ₹370 to Uber" />
            <InsightRow icon="/assets/credit_bag.svg" text="Paid ₹180 to Sampath stores" />
          </div>
        </div>
      </div>

      {/* Invite-friend in-card callout */}
      <button
        type="button"
        style={{
          background: SLATE_10,
          borderRadius: CARD_RADIUS,
          padding: 16,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          textAlign: 'left',
        }}
      >
        <img
          src="/assets/credit_invite_scatter.svg"
          alt=""
          width={24}
          height={24}
          style={{ display: 'block', flexShrink: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 500,
              letterSpacing: '0.28px',
              color: TEXT_PRIMARY,
            }}
          >
            Invite a friend
          </div>
          <div
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 12,
              lineHeight: '16px',
              fontWeight: 400,
              letterSpacing: '0.24px',
              color: TEXT_TERTIARY,
            }}
          >
            You have the power
          </div>
        </div>
      </button>
    </div>
  );
}

function InsightRow({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src={icon} alt="" width={16} height={16} style={{ display: 'block', flexShrink: 0 }} />
      <span
        style={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          letterSpacing: '0.28px',
          color: TEXT_TERTIARY,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function SuperCardPromo() {
  return (
    <div
      style={{
        background: CARD_BG,
        border: CARD_BORDER,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
        padding: CARD_PAD,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 20,
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '0.4px',
            color: TEXT_PRIMARY,
          }}
        >
          Meet your slice<br />super card
        </div>
        <div
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 12,
            lineHeight: '16px',
            fontWeight: 400,
            letterSpacing: '0.24px',
            color: TEXT_SECONDARY,
          }}
        >
          Discover the benefits
        </div>
      </div>
      <img
        src="/assets/super_card_mascot.png"
        alt=""
        width={108}
        height={108}
        style={{ flexShrink: 0, objectFit: 'contain' }}
      />
    </div>
  );
}

export default function CreditL0({ onScrollChange }) {
  const scrollRef = useRef(null);
  const scrolled = usePageScroll(scrollRef);
  const { push } = useL1();
  // R24 cont-13: lift scroll state so App.jsx's status reserve paints white.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onScrollChange?.(scrolled); }, [scrolled]); // dep [scrolled] only — R24 cont-24 audit

  return (
    <div
      ref={scrollRef}
      style={{
        width: '100%',
        height: '100%',
        background: PAGE_BG,
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
        title="Credit"
        avatar={<PhotoAvatar />}
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
        <SpendsCard />
        <SuperCardPromo />
      </div>
    </div>
  );
}
