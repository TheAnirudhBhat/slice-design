// App boot (cal:2026-10-06, user: "the images should be cached and preloaded…
// sometimes the page loads with a different font… run a full-page shimmer if
// it's loading"). The shell holds the app HIDDEN behind a full-page shimmer
// until Rubik and the images are in, so nothing paints in a fallback font or
// pops in late. A slow network never holds it longer than BOOT_CAP_MS.
// Pods that play something on arrival read `useBoot().ready` and wait for it.
import { createContext, useContext, useEffect, useState } from 'react';

export const BootContext = createContext({ ready: true });
export const useBoot = () => useContext(BootContext);

const BOOT_CAP_MS = 4000;
const FONTS = ['400 16px Rubik', '500 16px Rubik', '600 16px Rubik', '700 16px Rubik'];

// Every static image the shell references (src + CSS-mask urls; grep of src/,
// 2026-10-06). Add new ones here — a missing entry only means it can pop in late.
export const SHELL_IMAGES = [
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

const loadImage = (src) =>
  new Promise((done) => {
    const im = new Image();
    im.onload = done;
    im.onerror = done;
    im.src = src;
  });

// Fonts + the shell's images + a project's own list + every <img> already in the
// DOM (all L0 pods mount on load). Resolves once, on mount.
export function useBootReady(preload = []) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    const pending = [...document.images]
      .filter((im) => !im.complete)
      .map((im) => new Promise((done) => {
        im.addEventListener('load', done, { once: true });
        im.addEventListener('error', done, { once: true });
      }));
    const all = Promise.all([
      ...FONTS.map((f) => document.fonts.load(f).catch(() => {})),
      ...[...new Set([...SHELL_IMAGES, ...preload])].map(loadImage),
      ...pending,
    ]);
    const cap = new Promise((done) => setTimeout(done, BOOT_CAP_MS));
    Promise.race([all, cap]).then(() => live && setReady(true));
    return () => {
      live = false;
    };
    // once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ready;
}
