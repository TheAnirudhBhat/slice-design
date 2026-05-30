// Root: iPhone shell + fixed-overlay status bar (text re-tints per element as
// pages slide under it) + dynamic island (hardware chrome) + page pager + bottom nav.
//
// R23 fix-it pass:
//   • Phone shell rock-solid centered via position:fixed + 50/50 + translate(-50%,-50%)
//   • Banking + Explore page bg → slate-10 so 0.05 alpha card shadows actually show

import React, { useEffect, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import BottomNav from './components/BottomNav.jsx';
import MotionStatusBar, { DynamicIsland } from './components/StatusBar.jsx';
import Pager from './components/Pager.jsx';
import BankingL0 from './pods/banking/L0.jsx';
import PaymentsL0 from './pods/payments/L0_valentinoHome.jsx';
import ActivityL0 from './pods/activity/L0.jsx';
import ExploreL0 from './pods/explore/L0.jsx';
import CreditL0 from './pods/credit/L0.jsx';
import ProfileL1 from './pods/profile/L1.jsx';
import TxnDetailL1 from './pods/activity/TxnDetailL1.jsx';
import L1Stack from './components/L1Stack.jsx';

// L1 registry — name → component or { Component, slideFrom }. Each L0 calls
// `useL1().push(name, props)` to open an L1; L1 components receive `onClose`
// to dismiss themselves. Profile slides up from BOTTOM (identity sheet);
// txnDetail slides from RIGHT (canonical L1 push).
const L1_REGISTRY = {
  profile: { Component: ProfileL1, slideFrom: 'bottom' },
  txnDetail: { Component: TxnDetailL1, slideFrom: 'right' },
};

const PODS = ['banking', 'explore', 'pay', 'credit', 'activity'];

// Page bgs. Pure WHITE for every non-immersive pod — slice has no gray surfaces.
// Pay alone is the V-500 immersive surface.
const PAGE_BG = {
  banking: 'var(--page-bg)',
  explore: 'var(--page-bg)',
  pay: '#D30AD7', // Valentino immersive — stays V-500 (dark-Pay treatment TBD)
  credit: 'var(--page-bg)',
  activity: 'var(--page-bg)',
};

const STATUS_VARIANT = {
  banking: 'light',
  explore: 'light',
  pay: 'dark',
  credit: 'light',
  activity: 'light',
};

// R24 cont-13: map from pod → component constructor (not pre-instantiated JSX)
// so we can hand each L0 a per-pod `onScrollChange` callback at render time.
// The callback lifts the L0's scroll state up to App.jsx so the 54px status
// reserve sitting ABOVE the L0 can also paint white when the L0 is scrolled.
const PAGES_BY_POD = {
  banking: BankingL0,
  explore: ExploreL0,
  pay: PaymentsL0,
  credit: CreditL0,
  activity: ActivityL0,
};

// Dev control: small bottom-left toggle that flips the proto between light/dark
// by setting data-theme on the stage. Neutral contrast glyph (slice has no theme
// icon yet) — swap for a slice glyph if one lands in the DLS.
function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'switch to light mode' : 'switch to dark mode'}
      style={{
        position: 'fixed',
        left: 16,
        bottom: 16,
        zIndex: 100,
        width: 40,
        height: 40,
        borderRadius: 100,
        background: dark ? '#1B1B1F' : '#FFFFFF',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.1)'}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke={dark ? '#FFFFFF' : '#171A1F'} strokeWidth="1.6" />
        <path d="M10 3a7 7 0 010 14z" fill={dark ? '#FFFFFF' : '#171A1F'} />
      </svg>
    </button>
  );
}

// R24 cont-9: real iPhone 16 Pro logical dims — screen 393×852 CSS px.
// R24 cont-31 FIX: the OUTER chassis MUST equal screen + 2×(total bezel padding),
// or the fixed-393 screen is wider than the chassis "hole" and the white screen
// pokes past the black bezel ("screen width bigger than the phone"). Old 402×874
// with 6+4=10px padding gave a 382-wide hole < 393. Now: FRAME pad 4 + BLACK pad 2
// = 6px each side → OUTER = 393+12 × 852+12 = 405×864, screen fits exactly with an
// even 6px bezel.
const PHONE_OUTER_WIDTH = 405;
const PHONE_OUTER_HEIGHT = 864;
const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;

function PhoneFrame({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        width: PHONE_OUTER_WIDTH,
        height: PHONE_OUTER_HEIGHT,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 62,
          background: 'linear-gradient(135deg, #2A2D31 0%, #16181B 45%, #1F2125 100%)',
          padding: 4,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 56,
            background: '#000',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: PHONE_WIDTH,
              height: PHONE_HEIGHT,
              borderRadius: 52,
              overflow: 'hidden',
              position: 'relative',
              background: 'var(--page-bg)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <div style={sideButtonStyle('left', 130, 32)} />
      <div style={sideButtonStyle('left', 175, 56)} />
      <div style={sideButtonStyle('left', 245, 56)} />
      <div style={sideButtonStyle('right', 175, 96)} />
    </div>
  );
}

function sideButtonStyle(side, top, height) {
  return {
    position: 'absolute',
    top,
    [side]: -2,
    width: 3,
    height,
    background: 'linear-gradient(90deg, #0A0B0D 0%, #2A2D31 50%, #0A0B0D 100%)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
    borderRadius: side === 'left' ? '2px 0 0 2px' : '0 2px 2px 0',
  };
}

// R23 fix-it-2-cont-9 (corrected): phone stays at native 440×952 or smaller
// (never upscaled). The user's "proto page should be as big as the view area"
// refers to the OUTER STAGE — the black background that fills the browser
// viewport — not the phone itself. The stage already fills the viewport via
// position:fixed inset:0. Phone scales DOWN to fit if browser is smaller; at
// browser ≥ 440×952 the phone renders at native and the black stage extends
// to all four edges around it.
function useFitScale(targetWidth, targetHeight, padding = 8) {
  const compute = () => {
    if (typeof window === 'undefined') return 1;
    const w = Math.max(1, window.innerWidth - padding * 2);
    const h = Math.max(1, window.innerHeight - padding * 2);
    const s = Math.min(1, w / targetWidth, h / targetHeight);
    return s > 0.05 ? s : 1;
  };
  const [scale, setScale] = useState(compute);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScale(compute()));
    };
    update();
    window.addEventListener('resize', update);
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(document.documentElement);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', update);
      if (ro) ro.disconnect();
    };
  }, [targetWidth, targetHeight, padding]);
  return scale;
}

const PAGES_META = PODS.map((pod) => ({ pod, variant: STATUS_VARIANT[pod] }));

export default function App() {
  const [active, setActive] = useState('pay');
  const [visuallyActive, setVisuallyActive] = useState('pay');
  const [theme, setTheme] = useState('light'); // light | dark — flips data-theme on the stage
  const [l1Open, setL1Open] = useState(false);
  // R24 cont-13: per-pod scroll state lifted up so the 54px status reserve
  // (sitting OUTSIDE each L0 in App.jsx) can paint white when that L0 is
  // scrolled. Without this, the cards scrolling under the AppBar visually
  // bled into the transparent status reserve above it (drop shadows showed
  // through). Now reserve + AppBar both transition to white together.
  const [scrolledByPod, setScrolledByPod] = useState({});
  const handlePodScroll = (pod, isScrolled) => {
    setScrolledByPod((prev) =>
      prev[pod] === isScrolled ? prev : { ...prev, [pod]: isScrolled }
    );
  };

  // Shared motion value for the page pager's x-translation. Drives:
  // (1) the Pager itself; (2) the StatusBar overlay's per-element color.
  const pagerX = useMotionValue(-PODS.indexOf('pay') * PHONE_WIDTH);

  const activeIndex = PODS.indexOf(active);
  // In dark theme every pod surface is dark → force the "dark" status/nav variant
  // (light icons + white-alpha nav medallions) across all slots.
  const pagesMeta = theme === 'dark' ? PODS.map((p) => ({ pod: p, variant: 'dark' })) : PAGES_META;
  const fitScale = useFitScale(PHONE_OUTER_WIDTH, PHONE_OUTER_HEIGHT);

  const handlePageIndexChange = (idx) => {
    const newPod = PODS[idx];
    if (newPod !== visuallyActive) setVisuallyActive(newPod);
  };
  const handlePageCommit = (idx) => {
    const newPod = PODS[idx];
    setActive(newPod);
    setVisuallyActive(newPod);
  };
  const handleNavChange = (pod) => {
    setActive(pod);
    setVisuallyActive(pod);
  };
  const handleNavVisualChange = (pod) => {
    setVisuallyActive(pod);
  };

  // R23 fix-it-2-cont-10: simplified to 2-div scaffold. Outer is the App
  // container — width:100vw height:100vh — visibly the full browser viewport.
  // Inner is the phone chassis at native 440×952 with transform-scale around
  // its own center. Flex centers the un-scaled layout box; visual phone
  // appears centered. App-pointed agentation feedback now correctly identifies
  // the OUTER as width-responsive (100vw).

  return (
    <div
      data-theme={theme}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: PHONE_OUTER_WIDTH,
          height: PHONE_OUTER_HEIGHT,
          transform: `scale(${fitScale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        <PhoneFrame>
          {/* L1Stack provides useL1() to all descendants. L1 overlays render
             above the L0 pager via AnimatePresence + slide-in motion. */}
          <L1Stack registry={L1_REGISTRY} onOpenChange={setL1Open}>
            {/* Horizontal page pager — each page renders FULL HEIGHT (no per-page
               status bar). The slide edge appears top-to-bottom because pages
               span the full phone screen. */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                overflow: 'hidden',
              }}
            >
              <Pager
                activeIndex={activeIndex}
                pageCount={PODS.length}
                pageWidth={PHONE_WIDTH}
                externalX={pagerX}
                onIndexChange={handlePageIndexChange}
                onCommit={handlePageCommit}
              >
                {PODS.map((pod) => {
                  const PodPage = PAGES_BY_POD[pod];
                  const podScrolled = !!scrolledByPod[pod];
                  // Pay (V-500 immersive) keeps a transparent reserve so the
                  // V-500 page bg shows through — no white-on-scroll there.
                  const reserveBg =
                    pod === 'pay'
                      ? 'transparent'
                      : podScrolled
                      ? 'var(--page-bg)'
                      : 'transparent';
                  return (
                    <div
                      key={pod}
                      style={{
                        width: '100%',
                        height: '100%',
                        background: PAGE_BG[pod],
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* 54px status-bar reserve — paints white on scroll for
                         non-Pay pods so the cards scrolling under the AppBar
                         don't visibly bleed past it. */}
                      <div
                        style={{
                          height: 54,
                          flexShrink: 0,
                          background: reserveBg,
                          transition: 'background 160ms linear',
                        }}
                      />
                      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
                        <PodPage onScrollChange={(s) => handlePodScroll(pod, s)} />
                      </div>
                    </div>
                  );
                })}
              </Pager>
            </div>

            {/* Fixed status bar overlay — text/icons stay put, recolor per-element
               based on which page is under each element. */}
            <MotionStatusBar
              pagerX={pagerX}
              pages={pagesMeta}
              pageWidth={PHONE_WIDTH}
              forceVariant={theme === 'dark' ? 'dark' : l1Open ? 'light' : null}
            />

            {/* Hardware dynamic island */}
            <DynamicIsland />

            {/* Bottom nav floats above pager — pagerX + pages shared so each
               nav slot can compute its own variant based on what's under it */}
            <BottomNav
              active={active}
              visuallyActive={visuallyActive}
              onChange={handleNavChange}
              onVisualChange={handleNavVisualChange}
              balance="₹3K"
              pagerX={pagerX}
              pages={pagesMeta}
            />
          </L1Stack>
        </PhoneFrame>
      </div>
      <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
    </div>
  );
}
