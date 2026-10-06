// Three-finger tap-and-hold → the debug sheet on a phone (cal:2026-10-06, ported
// from aibanker-design's useProtoMobile). Fires once when three or more fingers
// are pressed and held still for `holdMs`; cancels if a finger lifts or the
// fingers travel past `moveTolerance`, so it never fights a scroll or a drag.
// The lift that ends a fired hold is preventDefault-ed: otherwise iOS's
// compatibility click lands on the sheet's scrim that just opened under the
// fingers and shuts it at once (aibanker's "hold opens an overlay" lesson).
import { useEffect, useRef } from 'react';

export default function useThreeFingerHold(onTrigger, { enabled = true, holdMs = 500, moveTolerance = 24 } = {}) {
  const cb = useRef(onTrigger);
  useEffect(() => {
    cb.current = onTrigger;
  });

  useEffect(() => {
    if (!enabled) return undefined;
    let timer = null;
    let fired = false;
    let start = null;
    const clear = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    };
    const center = (t) => {
      let x = 0;
      let y = 0;
      for (let i = 0; i < t.length; i++) {
        x += t[i].clientX;
        y += t[i].clientY;
      }
      return { x: x / t.length, y: y / t.length };
    };
    const onStart = (e) => {
      if (e.touches.length < 3) return clear();
      fired = false;
      start = center(e.touches);
      clear();
      timer = window.setTimeout(() => {
        timer = null;
        fired = true;
        cb.current();
      }, holdMs);
    };
    const onMove = (e) => {
      if (timer === null) return;
      if (e.touches.length < 3) return clear();
      const c = center(e.touches);
      if (Math.hypot(c.x - start.x, c.y - start.y) > moveTolerance) clear();
    };
    const onEnd = (e) => {
      if (fired) {
        e.preventDefault();
        if (e.touches.length === 0) fired = false;
      }
      if (e.touches.length < 3) clear();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: false });
    window.addEventListener('touchcancel', onEnd, { passive: false });
    return () => {
      clear();
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
    };
  }, [enabled, holdMs, moveTolerance]);
}
