// Activity L0 — canonical per Figma node 885:20122 (PNUz3Dr9KSlFJSnsXsC0nL · R23 fix-it).
//
// Canonical anatomy:
//   1. App bar L0 — "Activity" H2 + photo Avatar trailing (NO eye toggle)
//   2. Search row — search input (rounded pill, slate-10 bg, 48h) + 48×48 filter pill
//      (sits BELOW the app bar, scrolls WITH the list per Figma)
//   3. Flat transaction list — each row 56-72px, no section headers in this state
//      (canonical state shows undated/mixed; section headers are an opt-in)
//        — 40×40 avatar (photo / initial monogram / icon variant)
//        — name (16/24 Regular primary)
//        — date subtitle (12/16 Regular secondary) — OR status subtitle for failed/pending
//        — right-aligned amount (16/24 Regular)
//          • primary for sent/debit
//          • Positive Green for received/cashback/interest
//          • Negative Red for failed
//          • Amber-700 for pending
//   4. Bottom fade overlay (transparent → white) above floating nav.
//
// R23 fix-it pass:
//   • Search row hoisted to a sticky position below the app bar so it stays visible.
//   • Bottom fade re-implemented as proper absolute overlay (no flex/order hacks).
//   • Failed/pending avatars now use canonical pattern: regular avatar + small
//     status badge bottom-right + status-colored subtitle (instead of jarring
//     full-red-circle / amber-ring-only avatars).

import React, { useEffect, useRef } from 'react';
import { AppBar, usePageScroll } from '../../components/AppBar.jsx';
import BottomFade from '../../components/BottomFade.jsx';
import { useL1 } from '../../components/L1Stack.jsx';

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

// ───────────────── tokens ─────────────────
const COLORS = {
  pageBg: '#FFFFFF',
  textPrimary: 'rgba(0,0,0,0.9)',
  textSecondary: 'rgba(0,0,0,0.7)',
  textTertiary: 'rgba(0,0,0,0.5)',
  outlineSubtle: 'rgba(0,0,0,0.05)',
  outlineBold: 'rgba(0,0,0,0.1)',
  v500: '#D30AD7',
  v100: '#F4E5F8',
  v50: '#FAE2FA',
  positive: '#00A63E',
  positive50: '#E0F4E8',
  negative: '#CE1D26',
  negative50: '#F9E4E5',
  amber: '#FF9A17',
  amber50: '#FFF3E3',
  amber700: '#C27511',
  slate10: '#F6F9FC',
  slate30: '#F0F4F7',
  slate100: '#CDD0D4',
  slate400: '#78808B',
  slate900: '#171A1F',
  white: '#FFFFFF',
};

// ───────────────── mock transactions ─────────────────
// type: 'sent' | 'received' | 'failed' | 'pending'
const TXNS = [
  { id: 't1',  name: 'Aman Saxena',     subtitle: 'today',       amount: 250,    type: 'sent',     initial: 'A' },
  { id: 't2',  name: 'Zomato',          subtitle: '24 Jan ‘26',  amount: 419,    type: 'sent',     initial: 'Z' },
  { id: 't3',  name: 'Riya Mehta',      subtitle: '24 Jan ‘26',  amount: 1200,   type: 'received', initial: 'R' },
  { id: 't4',  name: 'BluSmart',        subtitle: '23 Jan ‘26',  amount: 387,    type: 'failed',   initial: 'B' },
  { id: 't5',  name: 'HDFC Bank',       subtitle: '22 Jan ‘26',  amount: 78500,  type: 'received', initial: 'H' },
  { id: 't6',  name: 'Karan Verma',     subtitle: '22 Jan ‘26',  amount: 5000,   type: 'pending',  initial: 'K' },
  { id: 't7',  name: 'Blinkit',         subtitle: '21 Jan ‘26',  amount: 642,    type: 'sent',     initial: 'B' },
  { id: 't8',  name: 'Jan fires',       subtitle: '20 Jan ‘26',  amount: 129,    type: 'received', initial: 'C' },
  { id: 't9',  name: 'Swiggy',          subtitle: '19 Jan ‘26',  amount: 286,    type: 'sent',     initial: 'S' },
  { id: 't10', name: 'Priya Iyer',      subtitle: '18 Jan ‘26',  amount: 800,    type: 'received', initial: 'P' },
  { id: 't11', name: 'Amazon Pay',      subtitle: '18 Jan ‘26',  amount: 2499,   type: 'sent',     initial: 'A' },
  { id: 't12', name: 'Vikas Tiwari',    subtitle: '17 Jan ‘26',  amount: 350,    type: 'failed',   initial: 'V' },
  { id: 't13', name: 'IRCTC',           subtitle: '17 Jan ‘26',  amount: 1875,   type: 'sent',     initial: 'I' },
  { id: 't14', name: 'Aisha Khan',      subtitle: '16 Jan ‘26',  amount: 450,    type: 'received', initial: 'A' },
  { id: 't15', name: 'BSES Electricity',subtitle: '15 Jan ‘26',  amount: 1240,   type: 'sent',     initial: 'B' },
  { id: 't16', name: 'Dec savings interest', subtitle: '14 Jan ‘26', amount: 218, type: 'received', initial: 'S' },
  { id: 't17', name: 'Cult.fit',        subtitle: '13 Jan ‘26',  amount: 1499,   type: 'pending',  initial: 'C' },
  { id: 't18', name: 'Rohan Bose',      subtitle: '12 Jan ‘26',  amount: 200,    type: 'sent',     initial: 'R' },
  { id: 't19', name: 'Tata Cliq',       subtitle: '11 Jan ‘26',  amount: 3499,   type: 'sent',     initial: 'T' },
  { id: 't20', name: 'Meera Pillai',    subtitle: '10 Jan ‘26',  amount: 600,    type: 'received', initial: 'M' },
];

// ───────────────── icons ─────────────────
const SearchIcon = ({ size = 20, color = COLORS.textTertiary }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6.25" stroke={color} strokeWidth="1.8" />
    <path d="M13.5 13.5L17 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const FilterIcon = ({ size = 20, color = COLORS.textPrimary }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M3 5h14M5.5 10h9M8 15h4"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Status badges sit at bottom-right corner of the avatar.
function FailedBadge() {
  return (
    <div
      style={{
        position: 'absolute',
        right: -2,
        bottom: -2,
        width: 16,
        height: 16,
        borderRadius: 100,
        background: COLORS.negative,
        border: `2px solid ${COLORS.pageBg}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path
          d="M1.5 1.5l5 5M6.5 1.5l-5 5"
          stroke={COLORS.white}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function PendingBadge() {
  return (
    <div
      style={{
        position: 'absolute',
        right: -2,
        bottom: -2,
        width: 16,
        height: 16,
        borderRadius: 100,
        background: COLORS.amber,
        border: `2px solid ${COLORS.pageBg}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {/* clock-tick mini glyph */}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="3.6" stroke={COLORS.white} strokeWidth="1.2" />
        <path d="M5 3.2V5l1.2 0.8" stroke={COLORS.white} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Search row — sticky just below the app bar so it remains visible while the
// txn list scrolls under it. Per canonical Figma it lives at top of the txn list.
function SearchBarRow() {
  return (
    <div
      style={{
        padding: '8px 24px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: COLORS.pageBg,
      }}
    >
      <label
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: COLORS.pageBg,
          border: `2px solid ${COLORS.outlineSubtle}`,
          borderRadius: 100,
          padding: '0 16px',
          height: 48,
        }}
      >
        <SearchIcon size={20} color={COLORS.textTertiary} />
        <input
          type="text"
          placeholder="Search"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'Rubik, sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '0.28px',
            color: COLORS.textPrimary,
            minWidth: 0,
          }}
        />
      </label>
      <button
        type="button"
        style={{
          width: 48,
          height: 48,
          borderRadius: 100,
          background: COLORS.pageBg,
          border: `2px solid ${COLORS.outlineSubtle}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="filter"
      >
        <FilterIcon size={20} color={COLORS.textPrimary} />
      </button>
    </div>
  );
}

// ───────────────── avatar by txn type ─────────────────
// R24 cont-6: rebuilt to match canonical Activity (Figma node 885:20122).
// Canonical avatars are OUTLINED circles (1.5px border, no fill) with letter
// centered. Received/cashback variants use a thin green border + green letter.
// Failed/pending DON'T get avatar badges — their state is communicated by the
// red/amber subtitle text below the name (see TxnRow subtitle logic).
function TxnAvatar({ type, initial }) {
  const isReceived = type === 'received';
  const borderColor = isReceived ? COLORS.positive : COLORS.outlineBold;
  const letterColor = isReceived ? COLORS.positive : COLORS.textPrimary;
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 100,
        // R24 cont-10: thinner 1px border to match DLS canonical (was 1.5px which
        // read too bold next to the canonical's delicate outlines).
        border: `1px solid ${borderColor}`,
        background: COLORS.pageBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Rubik, sans-serif',
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 500,
        letterSpacing: '0.32px',
        color: letterColor,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

// ───────────────── transaction row ─────────────────
function TxnRow({ txn, onTap }) {
  const formatAmount = (n) => {
    const s = n.toString();
    const lastThree = s.slice(-3);
    const rest = s.slice(0, -3);
    if (rest === '') return lastThree;
    const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return `${grouped},${lastThree}`;
  };

  let amountColor = COLORS.textPrimary;
  let amountPrefix = '₹';

  if (txn.type === 'received') {
    amountColor = COLORS.positive;
    amountPrefix = '+₹';
  } else if (txn.type === 'failed') {
    amountColor = COLORS.negative;
    amountPrefix = '₹';
  } else if (txn.type === 'pending') {
    amountColor = COLORS.amber700;
    amountPrefix = '₹';
  }

  const subtitleText =
    txn.type === 'failed' ? 'failed' :
    txn.type === 'pending' ? 'pending' :
    txn.subtitle;

  const subtitleColor =
    txn.type === 'failed' ? COLORS.negative :
    txn.type === 'pending' ? COLORS.amber700 :
    COLORS.textSecondary;

  // R24 cont-6: track pointermove distance between pointerdown and click,
  // suppress the click if the pointer moved more than ~10px. Why: when the
  // user drags the L0 pager (Activity → Credit/Pay) but releases before the
  // page-snap midpoint, the Pager animates back to Activity. The synthetic
  // click that fires at release would otherwise open the txn detail under
  // their finger. We use the native onClick (so programmatic clicks +
  // keyboard activation still work) but cancel it when our pointer-move ref
  // says the user was actually dragging.
  const downRef = useRef(null);
  const handlePointerDown = (e) => {
    downRef.current = { x: e.clientX, y: e.clientY, dragged: false };
  };
  const handlePointerMove = (e) => {
    const d = downRef.current;
    if (!d || d.dragged) return;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) >= 10) {
      d.dragged = true;
    }
  };
  const handleClick = () => {
    const d = downRef.current;
    downRef.current = null;
    if (d?.dragged) return;
    onTap && onTap(txn);
  };
  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      style={{
        width: '100%',
        // R24 cont-19: padding from the actual published variant — pulled
        // List item/Transaction (key 57e2a21c6b1758903b732050281bfb146cc1a4fd,
        // node 796:27298) from DLS 2.0 library. visualSpec.layout says
        // paddingTop/Bottom 16, paddingLeft/Right 24, itemSpacing 12,
        // counterAxisAlign CENTER, bounds 360×76. No more guessing — this is
        // the canonical row.
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: COLORS.pageBg,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        font: 'inherit',
        touchAction: 'pan-y', // allow horizontal swipe to bubble to Pager
      }}
      aria-label={`transaction ${txn.name}`}
    >
      <TxnAvatar type={txn.type} initial={txn.initial} />
      {/* R24 cont-7: DLS canonical (node 3:41 → List item / Sanjay S. variant)
          puts the right amount on the SAME baseline as the title, with the
          subtitle stacked underneath the title. Previous version had everything
          centered vertically in the row which dropped the amount mid-height.
          Layout: title|amount on row 1 (top-aligned), subtitle alone on row 2. */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              fontFamily: 'Rubik, sans-serif',
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 500,
              letterSpacing: '0.32px',
              color: COLORS.textPrimary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {txn.name}
          </div>
          <div
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 16,
              lineHeight: '24px',
              // R24 cont-18: amount is Body REGULAR (400), not Medium. User:
              // "this is supposed to be body normal, weight is too high".
              // Title stays Medium (500) so the contact name reads as the
              // primary anchor and the amount sits visually one step lighter.
              fontWeight: 400,
              letterSpacing: '0.32px',
              color: amountColor,
              flexShrink: 0,
              textAlign: 'right',
              whiteSpace: 'nowrap',
            }}
          >
            {amountPrefix}
            {formatAmount(txn.amount)}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 400,
            letterSpacing: '0.28px',
            color: subtitleColor,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {subtitleText}
        </div>
      </div>
    </button>
  );
}

// ───────────────── page ─────────────────
export default function ActivityL0({ onScrollChange }) {
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
          background: COLORS.pageBg,
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
          title="Activity"
          avatar={<PhotoAvatar />}
          onAvatarTap={() => push('profile')}
          background="#FFFFFF"
        />
        <SearchBarRow />
        <div style={{ paddingBottom: 140 }}>
          {TXNS.map((t) => (
            <TxnRow
              key={t.id}
              txn={t}
              onTap={(txn) =>
                push('txnDetail', {
                  txn: {
                    name: txn.name,
                    amount: txn.amount,
                    state:
                      txn.type === 'received' ? 'success' :
                      txn.type === 'failed' ? 'failed' :
                      txn.type === 'pending' ? 'pending' :
                      'success',
                    label:
                      txn.type === 'received' ? `received from ${txn.name}` :
                      txn.type === 'failed' ? `payment to ${txn.name} failed` :
                      txn.type === 'pending' ? `request to ${txn.name} pending` :
                      `sent to ${txn.name}`,
                    fromLabel: txn.type === 'received' ? `From ${txn.name}` : `To ${txn.name}`,
                    timestamp: txn.subtitle === 'today' ? "Today, 9:41 am" : `${txn.subtitle}, 9:41 am`,
                    txnId: `Ax${Date.now().toString().slice(-10)}${Math.floor(Math.random() * 1e9).toString(16)}`,
                    sourceLabel: 'From slice savings',
                    sourceValue: 'xxx1234',
                    detailLabel: 'UPI reference',
                    detailValue: `0D${Date.now().toString().slice(-13)}${Math.floor(Math.random() * 1e6)}`,
                  },
                })
              }
            />
          ))}
        </div>
      </div>
      <BottomFade color={COLORS.pageBg} height={200} />
    </div>
  );
}
