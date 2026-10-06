// App boot (cal:2026-10-06, user: "the images should be cached and preloaded…
// sometimes the page loads with a different font"). The shell holds the app
// HIDDEN behind the slice splash (Splash.jsx — replaced the shimmer 2026-10-07)
// until Rubik and the images are in, so nothing paints in a fallback font or
// pops in late. A slow network never holds it longer than BOOT_CAP_MS.
// Pods that play something on arrival read `useBoot().ready` and wait for it.
import { createContext, useContext, useEffect, useState } from 'react';

export const BootContext = createContext({ ready: true });
export const useBoot = () => useContext(BootContext);

const BOOT_CAP_MS = 4000;
// The splash's fade-out after ready; arrival motion waits for it (Splash.jsx, payments L0).
export const SPLASH_EXIT_MS = 300;
const FONTS = ['400 16px Rubik', '500 16px Rubik', '600 16px Rubik', '700 16px Rubik'];

// Every static image the shell references (src + CSS-mask urls; grep of src/,
// 2026-10-06). Add new ones here — a missing entry only means it can pop in late.
export const SHELL_IMAGES = [
  '/assets/splash_logo.svg',
  '/assets/iphone17_bezel.png',
  '/assets/avatar_only.png',
  '/assets/contact_deepika.png',
  '/assets/credit_bag.svg',
  '/assets/credit_car.svg',
  '/assets/fd_card_corner.svg',
  '/assets/fire_sparkle.png',
  '/assets/invite_magnet.png',
  '/assets/may_spends.png',
  '/assets/monies_card_corner.png',
  '/assets/pay_active_qr.png',
  '/assets/super_card_mascot.png',
  '/assets/theme_moon.svg',
  '/assets/theme_sun.svg',
  '/assets/icons/appbar_chat.svg',
  '/assets/icons/appbar_chevron.svg',
  '/assets/icons/get_assured_flame.svg',
  '/assets/icons/pill_fire.svg',
  '/assets/icons/pill_monies.svg',
  '/assets/icons/pill_upi.svg',
  '/assets/icons/profile_about.svg',
  '/assets/icons/profile_action_centre.svg',
  '/assets/icons/profile_close.svg',
  '/assets/icons/profile_help.svg',
  '/assets/icons/profile_pricing.svg',
  '/assets/icons/profile_settings.svg',
  '/assets/icons/profile_upi_settings.svg',
  '/assets/icons/settings_bell.svg',
  '/assets/icons/settings_fingerid.svg',
  '/assets/icons/settings_logout.svg',
  '/assets/icons/settings_moon.svg',
  '/assets/icons/settings_pin.svg',
  '/assets/icons/slice_eye_open.png',
];

// Preloaded images are held for the page's life: one nobody references can have its
// decoded bitmap dropped (iOS does, under memory pressure), and the next mount paints
// it blank until it decodes again.
const KEEP = [];
// A failed request is tried once more: over a phone's Wi-Fi a dropped one otherwise
// stays missing for the session.
const fetchImage = (src, cors, tries = 2) =>
  new Promise((done) => {
    const im = new Image();
    if (cors) im.crossOrigin = 'anonymous';
    im.onload = () => {
      KEEP.push(im);
      im.decode?.().catch(() => {});
      done();
    };
    im.onerror = () => (tries > 1 ? fetchImage(src, cors, tries - 1).then(done) : done());
    im.src = src;
  });
// The same for every <img> on the page: one whose request failed is asked for once
// more (a query string, so the failed entry in the browser's cache isn't reused).
if (typeof document !== 'undefined') {
  document.addEventListener(
    'error',
    (e) => {
      const im = e.target;
      if (im.tagName !== 'IMG' || im.dataset.retried || !im.src) return;
      im.dataset.retried = '1';
      im.src = `${im.src}${im.src.includes('?') ? '&' : '?'}retry=1`;
    },
    true, // load errors don't bubble
  );
}

// Mask images load twice. The icons are CSS masks (Glyph, the pill icons), and a mask
// fetches in CORS mode, which a plain <img> fetch can't serve: without the CORS copy
// every mask icon was fetched again after the splash, and popped in late (or not at
// all). Masks = every SVG, and the one PNG drawn as a mask (spark's empty slot ring).
const MASK = /\.svg$|slot_empty_ring\.png$/;
const loadImage = (src) => Promise.all([fetchImage(src, false), MASK.test(src) && fetchImage(src, true)]);

// Fonts + the shell's images + a project's own list + every <img> already in the
// DOM (all L0 pods mount on load). Resolves once, on mount. `progress` (0–1)
// feeds the splash's loader.
export function useBootReady(preload = []) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let live = true;
    let loaded = 0;
    const pending = [...document.images]
      .filter((im) => !im.complete)
      .map((im) => new Promise((done) => {
        im.addEventListener('load', done, { once: true });
        im.addEventListener('error', done, { once: true });
      }));
    const jobs = [
      ...FONTS.map((f) => document.fonts.load(f).catch(() => {})),
      // the bezel is desktop chrome: a phone (the shell's useIsMobile query) never shows it
      ...[...new Set([...SHELL_IMAGES, ...preload])]
        .filter((src) => !(src.endsWith('_bezel.png') && window.matchMedia('(max-width: 600px), (display-mode: standalone)').matches))
        .map(loadImage),
      ...pending,
    ].map((job) => job.then(() => live && setProgress(++loaded / jobs.length)));
    const all = Promise.all(jobs);
    const cap = new Promise((done) => setTimeout(done, BOOT_CAP_MS));
    Promise.race([all, cap]).then(() => live && setReady(true));
    return () => {
      live = false;
    };
    // once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ready, progress };
}
