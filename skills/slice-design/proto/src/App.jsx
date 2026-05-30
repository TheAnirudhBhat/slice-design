// Root: iPhone shell + fixed-overlay status bar (text re-tints per element as
// pages slide under it) + dynamic island (hardware chrome) + page pager + bottom nav.
//
// R23 fix-it pass:
//   • Phone shell rock-solid centered via position:fixed + 50/50 + translate(-50%,-50%)
//   • Banking + Explore page bg → slate-10 so 0.05 alpha card shadows actually show

import React, { useEffect, useState } from 'react';
import { useMotionValue, motion, AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav.jsx';
import MotionStatusBar from './components/StatusBar.jsx';
import { MoonIcon, BulbIcon } from './icons/ThemeIcons.jsx';
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
  pay: 'var(--brand-bg)', // Valentino immersive — V-500 light, #090B0C dark (Figma Background/Brand)
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
// (sets data-theme on the stage). Sun in dark (tap → light), moon in light
// (tap → dark). White pill so it reads as slice chrome on the white stage.
function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'switch to light mode' : 'switch to dark mode'}
      style={{
        position: 'fixed',
        left: 20,
        bottom: 20,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: 100,
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        color: '#171A1F',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* moon in light (tap → dark), bulb in dark (tap → light) — DLS Objects icons */}
      {dark ? <BulbIcon /> : <MoonIcon />}
    </button>
  );
}

// Device frame = the iPhone 17 Pro Silver bezel PNG exported from Figma
// (file cMITYopAqGfe4JC6gIkrIE, node 8402:7). The art is 450×920 with a
// TRANSPARENT screen cut-out inset ~24px L/R and ~23px T/B (measured from the
// PNG alpha) → a 402×874 screen. Rim + Dynamic Island + side buttons are baked
// into the PNG; screen content shows through the transparent cut-out.
const PHONE_OUTER_WIDTH = 450; // bezel art width
const PHONE_OUTER_HEIGHT = 920; // bezel art height
const PHONE_WIDTH = 402; // screen cut-out width
const PHONE_HEIGHT = 874; // screen cut-out height
const SCREEN_INSET_LEFT = 24; // rim+bezel thickness L/R (from PNG alpha)
const SCREEN_INSET_TOP = 23; // rim+bezel thickness T/B
const SCREEN_RADIUS = 50; // screen corner radius

function PhoneFrame({ children }) {
  return (
    <div style={{ position: 'relative', width: PHONE_OUTER_WIDTH, height: PHONE_OUTER_HEIGHT, flexShrink: 0 }}>
      {/* Screen content sits in the transparent cut-out, BEHIND the bezel art. */}
      <div
        style={{
          position: 'absolute',
          top: SCREEN_INSET_TOP,
          left: SCREEN_INSET_LEFT,
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          borderRadius: SCREEN_RADIUS,
          overflow: 'hidden',
          background: 'var(--page-bg)',
          zIndex: 1,
        }}
      >
        {children}
      </div>
      {/* iPhone 17 Pro Silver bezel from Figma — rim + Dynamic Island + side
         buttons baked in. drop-shadow follows the device silhouette (alpha) so
         it floats on the white stage. pointer-events:none → taps pass through. */}
      <img
        src="/assets/iphone17_bezel.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          filter: 'drop-shadow(0px 20px 50px rgba(0,0,0,0.18)) drop-shadow(0px 4px 14px rgba(0,0,0,0.10))',
        }}
      />
    </div>
  );
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

// EXTENSION SEAM (R24 cont-35): a derived project wraps this App and injects its
// feature WITHOUT forking — so it inherits the whole shell, theme, and every pod
// live. Props (all default to the standalone skill proto, so the skill itself is
// unchanged):
//   • extraL1            — extra L1 routes merged into the registry ({ name: {Component, slideFrom} })
//   • exploreExtraCards  — extra full-width cards injected into Explore (after Recharge & bills)
//   • initialPod         — landing pod (default 'pay' = Valentino home)
// Usage (project App.jsx): <App extraL1={{insurance:{Component,slideFrom:'right'}}}
//   exploreExtraCards={[<InsuranceEntryCard/>]} initialPod="explore" />
export default function App({ extraL1 = {}, exploreExtraCards = [], initialPod = 'pay' } = {}) {
  const [active, setActive] = useState(initialPod);
  const [visuallyActive, setVisuallyActive] = useState(initialPod);
  const [theme, setTheme] = useState('light'); // light | dark — flips data-theme on the stage
  // Theme-switch reveal: flip data-theme instantly, then slide a cover of the
  // PREVIOUS bg out — up for →dark (dark fades in from the bottom), down for
  // →light (light fades in from the top). Cleared when the slide finishes.
  const [themeAnim, setThemeAnim] = useState(null);
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
  const pagerX = useMotionValue(-PODS.indexOf(initialPod) * PHONE_WIDTH);

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
  const handleThemeToggle = () => {
    const goingDark = theme !== 'dark';
    // Cover = the CURRENT (pre-flip) page bg of the active pod, so the reveal
    // starts from exactly what's on screen (Pay is V-500 in light, #090B0C dark).
    const cover =
      active === 'pay'
        ? theme === 'dark'
          ? '#090B0C'
          : '#D30AD7'
        : theme === 'dark'
        ? '#090B0C'
        : '#FFFFFF';
    setThemeAnim({ dir: goingDark ? 'toDark' : 'toLight', cover, id: Date.now() });
    setTheme(goingDark ? 'dark' : 'light');
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
        background: '#FFFFFF',
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
          <L1Stack registry={{ ...L1_REGISTRY, ...extraL1 }} onOpenChange={setL1Open}>
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
                        <PodPage
                          onScrollChange={(s) => handlePodScroll(pod, s)}
                          {...(pod === 'explore' ? { extraCards: exploreExtraCards } : {})}
                        />
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

            {/* Theme-switch reveal — flips data-theme instantly, then slides a
               cover of the PREVIOUS bg out: up for →dark (dark fades in from the
               bottom), down for →light (light fades in from the top). The soft
               gradient leading edge makes it read as a fade, not a hard wipe.
               Sits inside the screen (under the bezel), above pager/status/nav. */}
            <AnimatePresence>
              {themeAnim && (
                <motion.div
                  key={themeAnim.id}
                  initial={{ y: '0%' }}
                  animate={{ y: themeAnim.dir === 'toDark' ? '-100%' : '100%' }}
                  // Calm, appreciable reveal — slow settle (user: "make it calmer,
                  // right now it's too fast"). ~1s with a gentle ease-out.
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  onAnimationComplete={() => setThemeAnim(null)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 999,
                    pointerEvents: 'none',
                    background:
                      themeAnim.dir === 'toDark'
                        ? `linear-gradient(to bottom, ${themeAnim.cover} 78%, transparent 100%)`
                        : `linear-gradient(to top, ${themeAnim.cover} 78%, transparent 100%)`,
                  }}
                />
              )}
            </AnimatePresence>
          </L1Stack>
        </PhoneFrame>
      </div>
      <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
    </div>
  );
}
