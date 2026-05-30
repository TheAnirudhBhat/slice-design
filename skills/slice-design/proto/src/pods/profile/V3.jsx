// Profile V3 — slice DLS 2.0 (R21 calibration)
//
// Canonical recipe (per slice-design skill · reference_dls_screen_layouts.md Profile V3,
// reference_pod_banking.md · cal:2026-05-28 R21):
//   • OVERLAY surface — NO bottom nav
//   • X close top-right (sheet-style overlay dismiss)
//   • Hero: QR-as-identity — large UPI QR (~160px) with photo Avatar dead-centre + finder squares
//   • Below QR: Name H3 + UPI handle caption
//   • 2-up action grid (2 columns × N rows) — ~120×100 tiles, 16px radius, subtle white bg
//     Tiles: Help & support / About / Refer & earn / Settings / Logout
//
// Page bg #FFFFFF, 24px page padding, phone 390×844.
// QR is an inline SVG placeholder — real QR is dynamically generated in production.
// Avatar in QR centre is a V-100 circle dummy.

import React from 'react';

// ---- Tokens ----
const PAGE_BG = '#FFFFFF';
const CARD_BG = '#FFFFFF';
const CARD_SHADOW = '0px 2px 32px 0px rgba(0,0,0,0.05)';
const CARD_RADIUS = 16;
const PAGE_PAD = 24;
const TEXT_PRIMARY = 'rgba(0,0,0,0.9)';
const TEXT_SECONDARY = 'rgba(0,0,0,0.7)';
const OUTLINE_SUBTLE = 'rgba(0,0,0,0.05)';
const V_500 = '#D30AD7';
const V_100 = '#F4E5F8';
const QR_DARK = '#171A1F'; // slate-900

// ---- Mock data ----
const USER = {
  name: 'rohan sharma',
  upiHandle: 'rohan@sliceaxis',
  upiPayload: 'upi://pay?pa=rohan@sliceaxis&pn=rohan%20sharma',
};

// ---- Inline glyphs ----
function XIcon({ size = 24, color = TEXT_PRIMARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HelpIcon({ size = 24, color = TEXT_PRIMARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <path
        d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1 2-1.7 2.5-.7.5-.8 1.1-.8 1.7"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  );
}

function InfoIcon({ size = 24, color = TEXT_PRIMARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <path d="M12 11v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill={color} />
    </svg>
  );
}

function GiftIcon({ size = 24, color = TEXT_PRIMARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9h16v3H4zM5 12v9h14v-9M12 9v12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9c-2 0-4-.5-4-2.5S10 5 12 9c0-3.5 2-4.5 4-2.5S14 9 12 9Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon({ size = 24, color = TEXT_PRIMARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon({ size = 24, color = TEXT_PRIMARY }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---- QR placeholder — pseudo-random 21×21 module grid with corner finders ----
// Real QR is generated from USER.upiPayload at runtime in production.
function QRPlaceholder({ size = 168 }) {
  const MODULES = 21;
  const MODULE = size / MODULES;

  // Stable pseudo-random pattern (deterministic seed so it renders the same every paint).
  // NOT a real QR — purely visual approximation per skill convention.
  const isModuleOn = (r, c) => {
    // Reserve 7×7 finder regions: top-left, top-right, bottom-left
    const inTL = r < 7 && c < 7;
    const inTR = r < 7 && c >= MODULES - 7;
    const inBL = r >= MODULES - 7 && c < 7;
    if (inTL || inTR || inBL) return false;
    // Deterministic noise — feels QR-like
    const hash = (r * 73856093) ^ (c * 19349663);
    return (hash & 1) === 1 && (r + c) % 2 !== 0 ? true : (hash & 3) === 0;
  };

  const modules = [];
  for (let r = 0; r < MODULES; r++) {
    for (let c = 0; c < MODULES; c++) {
      if (isModuleOn(r, c)) {
        modules.push(
          <rect
            key={`${r}-${c}`}
            x={c * MODULE}
            y={r * MODULE}
            width={MODULE}
            height={MODULE}
            fill={QR_DARK}
          />,
        );
      }
    }
  }

  // 7×7 corner finder — outer 7px square, white inner ring, 3px solid centre
  const Finder = ({ x, y }) => {
    const s = MODULE * 7;
    const inner = MODULE * 5;
    const innerOff = MODULE;
    const dot = MODULE * 3;
    const dotOff = MODULE * 2;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect width={s} height={s} fill={QR_DARK} />
        <rect x={innerOff} y={innerOff} width={inner} height={inner} fill="#FFFFFF" />
        <rect x={dotOff} y={dotOff} width={dot} height={dot} fill={QR_DARK} />
      </g>
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="UPI QR code">
      <rect width={size} height={size} fill="#FFFFFF" />
      {modules}
      <Finder x={0} y={0} />
      <Finder x={size - MODULE * 7} y={0} />
      <Finder x={0} y={size - MODULE * 7} />
    </svg>
  );
}

// ---- QR block with avatar dead-centre ----
function QRWithAvatar({ size = 168, avatarSize = 44 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <QRPlaceholder size={size} />
      {/* Avatar overlay — V-100 circle dummy */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: avatarSize,
          height: avatarSize,
          borderRadius: '50%',
          background: V_100,
          border: '3px solid #FFFFFF',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
        aria-label="Profile photo"
      />
    </div>
  );
}

// ---- App bar — X close top-right (sheet-style overlay) ----
function AppBar({ onClose }) {
  return (
    <div
      style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: `0 ${PAGE_PAD}px`,
        background: PAGE_BG,
        flexShrink: 0,
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close profile"
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <XIcon size={24} />
      </button>
    </div>
  );
}

// ---- Hero block — QR card with avatar + name + UPI handle ----
function ProfileHero() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: '16px 0 32px',
      }}
    >
      {/* QR card — white background with shadow, 16px corner radius */}
      <div
        style={{
          background: CARD_BG,
          borderRadius: CARD_RADIUS,
          padding: 20,
          boxShadow: CARD_SHADOW,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <QRWithAvatar size={168} avatarSize={48} />
      </div>

      {/* Name + UPI handle below QR */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 20,
            lineHeight: '24px',
            letterSpacing: '0.4px',
            color: TEXT_PRIMARY,
            fontWeight: 500,
          }}
        >
          {USER.name}
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
          {USER.upiHandle}
        </span>
      </div>
    </div>
  );
}

// ---- Single action tile — icon top-left + label below ----
function ActionTile({ Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: CARD_BG,
        borderRadius: CARD_RADIUS,
        border: `1px solid ${OUTLINE_SUBTLE}`,
        boxShadow: CARD_SHADOW,
        padding: 16,
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'Rubik, sans-serif',
      }}
    >
      <Icon size={24} color={TEXT_PRIMARY} />
      <span
        style={{
          fontSize: 16,
          lineHeight: '20px',
          letterSpacing: '0.32px',
          color: TEXT_PRIMARY,
          fontWeight: 500,
          marginTop: 16,
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ---- 2-up action grid ----
function ActionGrid({ onAction }) {
  const tiles = [
    { key: 'help', label: 'Help & support', Icon: HelpIcon },
    { key: 'about', label: 'About', Icon: InfoIcon },
    { key: 'refer', label: 'Refer & earn', Icon: GiftIcon },
    { key: 'settings', label: 'Settings', Icon: SettingsIcon },
    { key: 'logout', label: 'Logout', Icon: LogoutIcon },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}
    >
      {tiles.map((t) => (
        <ActionTile
          key={t.key}
          Icon={t.Icon}
          label={t.label}
          onClick={() => onAction?.(t.key)}
        />
      ))}
    </div>
  );
}

// ---- Page ----
export default function ProfileV3({ onClose, onAction }) {
  return (
    <div
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
      <AppBar onClose={onClose} />

      <div
        style={{
          padding: `0 ${PAGE_PAD}px 24px`,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <ProfileHero />
        <ActionGrid onAction={onAction} />
      </div>
    </div>
  );
}
