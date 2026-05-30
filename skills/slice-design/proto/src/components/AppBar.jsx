// Canonical slice DLS 2.0 App bar — matching Figma node 3:38 spec.
//
// Two variants:
//   • L0 (node 678:454): pod home — title H2 left + optional eye/balance toggle
//     + photo Avatar trailing. Use on Banking, Explore, Credit, Activity L0.
//   • Standard (node 679:2330): L1+ — chevron back left + title H3 (left,
//     after chevron) + 0–2 trailing icons. Use on every screen below L0.
//
// Anatomy (both variants):
//   • Total height: 64px (status bar is separately rendered by PhoneFrame)
//   • Bg: white. Scroll elevation: when content scrolls under, bottom shadow
//     `0 6px 8px rgba(0,0,0,0.05)` appears.
//   • Icon buttons: 48×48 hit area with 24×24 glyph (the inner glyph is
//     padded by 12px on all sides).
//
// L0 specifics:
//   • padding: 24px left, 20px right, 8px vertical
//   • title: Rubik Medium 24/32, letter-spacing 0.48
//   • gap between items: 8px
//   • trailing: optional eye icon (48×48) then Avatar container (48×48 with
//     40×40 photo inside)
//
// Standard specifics:
//   • padding: 12px horizontal, 8px vertical
//   • title: Rubik Medium 20/24, letter-spacing 0.4
//   • justify-between row: nav-icon | title (flex-1) | icons cluster
//   • nav-icon: 48×48 with 24×24 chevron-back (default; pass null to hide)
//   • icons: 0–2 trailing 48×48 buttons with 24×24 glyphs
//
// Immersive variant is NOT in this canonical spec — it's a per-pod exception
// (Pay/Valentino home keeps its own immersive app bar with white-alpha pills).

import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar.jsx';
import { ChevronBackGlyph } from '../icons/ChevronBack.jsx';

/**
 * usePageScroll — attach to a scrollable container ref, returns true once it has
 * scrolled past `threshold` px. Use to drive AppBar elevation.
 *
 *   const ref = useRef(null);
 *   const scrolled = usePageScroll(ref);
 *   return <div ref={ref}><AppBar scroll={scrolled} />…</div>
 */
export function usePageScroll(ref, threshold = 1) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const isScrolled = el.scrollTop > threshold;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [ref, threshold]);
  return scrolled;
}

export function AppBar({
  variant = 'l0',
  title,
  leading,         // Standard: nav icon (default chevron-back). Pass null to hide.
  actions = [],    // Trailing icon buttons (React nodes). Up to 2 for Standard, 1+ avatar for L0.
  avatar,          // L0 specific: Avatar React node — renders in a 48×48 hit container with 40×40 inner
  onAvatarTap,     // L0 specific: tap handler for avatar (opens Profile L1). When given, avatar becomes a button with 48×48 hit area surrounding the 40×40 image.
  onBack,          // Standard: chevron-back tap handler (default leading)
  scroll = false,  // When true, elevation shadow appears
  background = 'transparent', // R23 fix-it-2-cont-4: per-pod override. Activity uses white.
}) {
  const isL0 = variant === 'l0';
  // R24 cont-13: on scroll, the AppBar background becomes white regardless of
  // its default. User feedback: "when scrolled this part should become white
  // with the status bar above it, right now it's transparent, so you can see
  // cards below it ... it cuts the card drop shadow". The card shadows now
  // get fully covered by the white AppBar fill once they slide under it.
  const effectiveBg = scroll ? 'var(--page-bg)' : background;
  return (
    <div
      style={{
        position: 'sticky',  // FIXED at top of its scrollable parent — content scrolls UNDER it
        top: 0,
        width: '100%',
        height: 64,
        background: effectiveBg,
        boxShadow: scroll ? '0 6px 8px rgba(0,0,0,0.05)' : 'none',
        transition: 'background 160ms linear, box-shadow 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        zIndex: 20,
      }}
    >
      {isL0 ? (
        // L0: title H2 left + optional eye + avatar trailing
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 24,
            paddingRight: 20,
            paddingTop: 8,
            paddingBottom: 8,
            width: '100%',
          }}
        >
          <div
            style={{
              flex: '1 1 0',
              minWidth: 0,
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 500,
              fontSize: 24,
              lineHeight: '32px',
              letterSpacing: '0.48px',
              color: 'var(--text-primary)',
            }}
          >
            {title}
          </div>

          {actions.map((action, i) => (
            <ActionSlot key={`a-${i}`}>{action}</ActionSlot>
          ))}

          {avatar && (
            <Avatar size={44} hit onTap={onAvatarTap}>
              {avatar}
            </Avatar>
          )}
        </div>
      ) : (
        // Standard: chevron-back + title (left-after-chevron) + 0–2 trailing icons
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 8,
            paddingBottom: 8,
            width: '100%',
          }}
        >
          <IconButton onClick={onBack} ariaLabel="back" tone="primary">
            {leading === undefined ? <ChevronBackGlyph /> : leading}
          </IconButton>

          <div
            style={{
              flex: '1 1 0',
              minWidth: 0,
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 500,
              fontSize: 20,
              lineHeight: '24px',
              letterSpacing: '0.4px',
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {actions.map((action, i) => (
              <ActionSlot key={`a-${i}`}>{action}</ActionSlot>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----- Subcomponents -----

function IconButton({ children, onClick, ariaLabel, tone = 'primary' }) {
  // R24 cont-4: tone determines glyph color (via parent CSS color → SVG
  // currentColor). leading chevron/close = 'primary' (0.9); trailing actions
  // like 3-dot menu, eye, share = 'tertiary' (0.5).
  const color = tone === 'tertiary' ? 'var(--text-tertiary)' : 'var(--text-primary)';
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 48,
        height: 48,
        padding: 12,
        background: 'transparent',
        color,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
    </button>
  );
}

// R24 cont-5/11: ActionSlot replaces the old IconButton wrapper for trailing
// AppBar actions. Each action passed in is typically already an interactive
// element (a <button> with its own onClick) — wrapping it in another <button>
// caused React's button-in-button DOM-nesting warning. ActionSlot is a plain
// 48×48 div that just sizes/centers the action; the inner action handles its
// own interaction.
//
// Tertiary tinting: uses opacity:0.5 instead of color:rgba(0,0,0,0.5) so it
// works on BOTH inline SVG glyphs (whose strokes/fills inherit `currentColor`)
// AND raster PNG glyphs (like /assets/icons/slice_eye_open.png) that can't
// respond to a CSS color value. Color stays solid black so SVG paint stays
// at 100% black before opacity drops it to ≈ tertiary (0.5). PNG renders
// natively, then the same 0.5 opacity drops it to tertiary too. User
// direction: "tertiary colour fill, [on] any icons on the app bar which is
// on the right".
function ActionSlot({ children }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        padding: 0,
        color: 'rgba(0,0,0,1)',
        opacity: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// ----- Glyphs (inline slice DLS line icons) -----

// R23 fix-it-2-cont-6: eye open + closed glyphs now use the canonical slice DLS
// PNGs fetched from Figma nodes 586:138 (open) and 586:132 (closed) — was inline
// SVG approximation. Per user direction: "the eye icon is not from slice, please
// get the slice icons from figma".
export function EyeOpenGlyph() {
  return (
    <img
      src="/assets/icons/slice_eye_open.png"
      alt=""
      width={24}
      height={24}
      style={{ display: 'block', pointerEvents: 'none', userSelect: 'none' }}
      aria-hidden="true"
    />
  );
}

export function EyeClosedGlyph() {
  return (
    <img
      src="/assets/icons/slice_eye_closed.png"
      alt=""
      width={24}
      height={24}
      style={{ display: 'block', pointerEvents: 'none', userSelect: 'none' }}
      aria-hidden="true"
    />
  );
}

export function SearchGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function FilterGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default AppBar;
