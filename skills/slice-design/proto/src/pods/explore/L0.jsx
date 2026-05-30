// Explore L0 — slice DLS 2.0
//
// Canonical recipe (per slice-design skill · reference_pod_explore.md, cal:2026-05-28 R18;
// distilled from explore-base/src/App.jsx — OriginalExplore, BillsCompositeCard,
// ExploreMedium, ExploreSmall, BILL_ICONS):
//   • App bar L0: "Explore" title left + photo Avatar trailing (no eye toggle — no balance)
//   • Recharge & bills white card — H4 + Blue-500 "₹0 fee" Tag pill + 4-up bill grid
//     (54×54 slate-10 avatars carrying real bill_v2_* PNG glyphs) + 1px hairline divider
//     + whole-row reward strip (flame_orange.png 40×40 + Get assured ₹10 / Reward on
//     1st bill payment + chevron)
//   • 2×2 small-card grid (ExploreMedium 148px height, illustration absolute right/bottom):
//       row 1: Play & win / 5 fires    (fire_sparkle.png 52×52)
//              May spends / ₹12,487    (may_spends.png 54×54)
//       row 2: Invite & earn / Get ₹150 (invite_magnet.png 54×54)
//              stacked Credit score 785 + Autopay 1 active (ExploreSmall 66px height)
//   • No section header between cards (R18 — Banking/Explore/Credit are card-stacked L0s)
//
// Bottom nav lives in App.jsx — this page renders only the scrollable content above it.
// Page bg #FFFFFF, 24px page padding, 16px card gap, 120px bottom inset for floating nav.

import React, { useEffect, useRef } from 'react';
import { AppBar, usePageScroll } from '../../components/AppBar.jsx';
import BottomFade from '../../components/BottomFade.jsx';
import { useL1 } from '../../components/L1Stack.jsx';
import { TEXT_PRIMARY, TEXT_SECONDARY, TEXT_TERTIARY, OUTLINE_SUBTLE, BLUE_500, SLATE_10, SURFACE } from '../../tokens.js';
import { CreditCardIcon, ElectricityIcon, MobileIcon, MoreIcon } from '../../icons/BillIcons.jsx';
import { InviteEarnIcon } from '../../icons/InviteEarnIcon.jsx';

// ---- Tokens ----
const CARD_BG = SURFACE;
const CARD_SHADOW = '0px 4px 24px 0px rgba(0,0,0,0.08)';
const CARD_BORDER = '1px solid rgba(0,0,0,0.05)';
const CARD_RADIUS = 16;
const PAGE_PAD = 24;
const CARD_PAD = 24;
const CARD_GAP = 16;
const NAV_INSET = 140;

// ---- Type tokens — calibrated for slice-app-proto viewport (R23 fix-it-2) ----
// User feedback: strict-canonical 16/20M titles felt small at the scaled-down
// browser viewport. Bumped one DLS step to H3 (20/24M) so the cards have more
// visual presence without breaking the brand scale. Bill avatars 48, icons 24
// (matches the earlier explore-base sizing the user signed off on).
const T = {
  h3: { fontSize: 20, lineHeight: '24px', fontWeight: 500, letterSpacing: '0.40px', color: TEXT_PRIMARY },
  h4: { fontSize: 16, lineHeight: '20px', fontWeight: 500, letterSpacing: '0.32px', color: TEXT_PRIMARY },
  caption: { fontSize: 12, lineHeight: '16px', fontWeight: 400, letterSpacing: '0.24px', color: TEXT_TERTIARY },
  // canonical card-subtext on Explore is Metadata: 10/12 Regular UPPERCASE 0.4 secondary
  metadata: { fontSize: 11, lineHeight: '14px', fontWeight: 400, letterSpacing: '0.4px', color: TEXT_SECONDARY, textTransform: 'uppercase' },
  btnSm: { fontSize: 14, lineHeight: '20px', fontWeight: 500, letterSpacing: '0.28px' },
  tagPill: { fontSize: 10, lineHeight: '12px', fontWeight: 400, letterSpacing: '0.4px', textTransform: 'uppercase' },
};

// ---- Chevron ----
function Chevron({ color = 'rgba(0,0,0,0.3)' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---- Tag (info intent — white text on Blue-500, 10/12 Regular UPPERCASE) ----
// Canonical: tag is solid Blue-500 bg with white text per Figma node 885:19759.
function TagInfo({ children }) {
  return (
    <span
      style={{
        ...T.tagPill,
        color: '#FFFFFF',
        background: BLUE_500,
        padding: '4px 8px',
        borderRadius: 100,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

// ---- 48×48 bill avatar (slate-10 tinted, no stroke) — proto-calibrated size ----
// `color: TEXT_SECONDARY` themes the inline-SVG glyph's `currentColor` to the
// canonical bill-icon tone (black 0.7 in light, white 0.7 in dark) so the
// glyphs never vanish on the dark page.
function BillAvatar({ children }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 100,
        background: SLATE_10,
        color: TEXT_SECONDARY,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// ---- BILL_ICONS — inline SVG glyphs (theme-safe currentColor + V-500 accent) ----
const BILL_ICONS = [
  { Icon: CreditCardIcon, t: 'Credit\ncard' },
  { Icon: ElectricityIcon, t: 'Electricity\nbill' },
  { Icon: MobileIcon, t: 'Mobile\nrecharge' },
  { Icon: MoreIcon, t: 'View\nmore' },
];

// ---- Recharge & bills composite card ----
function BillsCompositeCard() {
  return (
    <div
      style={{
        background: CARD_BG,
        boxShadow: CARD_SHADOW,
        border: CARD_BORDER,
        borderRadius: CARD_RADIUS,
        padding: CARD_PAD,
      }}
    >
      {/* header — H3 left + Blue-500 "₹0 fee" pill right (proto-calibrated) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={T.h3}>Recharge & bills</span>
        <TagInfo>₹0 fee</TagInfo>
      </div>

      {/* 4-up bill grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginTop: 20,
        }}
      >
        {BILL_ICONS.map((b, i) => (
          <button
            key={i}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <BillAvatar>
              <b.Icon size={24} />
            </BillAvatar>
            <div
              style={{
                ...T.caption,
                textAlign: 'center',
                marginTop: 8,
                whiteSpace: 'pre-line',
                color: TEXT_SECONDARY,
              }}
            >
              {b.t}
            </div>
          </button>
        ))}
      </div>

      {/* hairline divider (1px solid, not dashed — matches explore-base) */}
      <div style={{ borderTop: `1px solid ${OUTLINE_SUBTLE}`, margin: '16px 0' }} />

      {/* reward strip — flame orange 40×40 + copy + chevron */}
      <button
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          textAlign: 'left',
        }}
      >
        <img
          src="/assets/flame_orange.png"
          width={40}
          height={40}
          alt=""
          style={{ display: 'block', flexShrink: 0, borderRadius: 100 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...T.btnSm, color: TEXT_PRIMARY }}>Get assured ₹10</div>
          <div style={{ ...T.caption, marginTop: 2 }}>Reward on 1st bill payment</div>
        </div>
        <Chevron />
      </button>
    </div>
  );
}

// ---- ExploreMedium — 148px tile, illustration bleeds bottom-right ----
// Proto-calibrated: subtext = 11px UPPERCASE, title = H3 (20/24 Medium).
function ExploreMedium({ subtext, title, icon }) {
  return (
    <button
      style={{
        background: CARD_BG,
        border: CARD_BORDER,
        borderRadius: CARD_RADIUS,
        boxShadow: CARD_SHADOW,
        width: '100%',
        height: 148,
        padding: '20px 16px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div style={T.metadata}>{subtext}</div>
      <div style={{ ...T.h3, marginTop: 6 }}>{title}</div>
      {icon && (
        <div style={{ position: 'absolute', right: 16, bottom: 16 }}>{icon}</div>
      )}
    </button>
  );
}

// ---- ExploreSmall — 66px tile, value-only ----
// Heights tuned so 2 stacked + CARD_GAP (16) = 148, matching the INVITE card's
// height in the bento grid. R23 fix-it-2-cont: user said cards were
// overextending — that was because ExploreSmall (70) × 2 + 16 = 156 > 148.
// Restoring 66 so the bento row's two columns align in height.
function ExploreSmall({ subtext, title }) {
  return (
    <button
      style={{
        background: CARD_BG,
        border: CARD_BORDER,
        borderRadius: CARD_RADIUS,
        boxShadow: CARD_SHADOW,
        width: '100%',
        height: 66,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'left',
        gap: 8,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={T.metadata}>{subtext}</div>
        <div style={{ ...T.h4, marginTop: 2 }}>{title}</div>
      </div>
    </button>
  );
}

// ---- Page ----
export default function ExploreL0({ onScrollChange }) {
  const scrollRef = useRef(null);
  const scrolled = usePageScroll(scrollRef);
  const { push } = useL1();
  // R24 cont-13: lift scroll state so App.jsx's status reserve paints white.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onScrollChange?.(scrolled); }, [scrolled]); // dep [scrolled] only — R24 cont-24 audit

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div
        ref={scrollRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent', // App.jsx slate-10 page bg shows through
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
          title="Explore"
          avatar={
            <img
              src="/assets/avatar_only.png"
              alt="profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
          <BillsCompositeCard />

          {/* row 1: Play & win + May spends */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: CARD_GAP }}>
            <ExploreMedium
              subtext="Play & win"
              title="Rewards"
              icon={
                <img
                  src="/assets/fire_sparkle.png"
                  width={52}
                  height={52}
                  alt=""
                  style={{ display: 'block' }}
                />
              }
            />
            <ExploreMedium
              subtext="May spends"
              title="₹12,487"
              icon={
                <img
                  src="/assets/may_spends.png"
                  width={54}
                  height={54}
                  alt=""
                  style={{ display: 'block' }}
                />
              }
            />
          </div>

          {/* row 2: Invite & earn + stacked (Credit score / Autopay) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: CARD_GAP }}>
            <ExploreMedium
              subtext="Invite"
              title="Earn ₹150"
              icon={<InviteEarnIcon size={54} color={TEXT_PRIMARY} />}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: CARD_GAP }}>
              <ExploreSmall subtext="Credit score" title="785" />
              <ExploreSmall subtext="Autopay" title="1 active" />
            </div>
          </div>
        </div>
      </div>
      <BottomFade color="var(--page-bg)" height={200} />
    </div>
  );
}
