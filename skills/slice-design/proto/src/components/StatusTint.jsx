// The iOS status bar is transparent. index.html runs it "black-translucent", so the
// page draws under the bar, and whatever covers the page covers the bar too: a
// sheet's scrim, the drag scrim, a pod sliding in. The old opaque bar was a separate
// strip that iOS repainted from theme-color late, and no overlay could reach it.
//
// iOS 26 lays a Liquid Glass blur over the top edge of a translucent web app.
// WebKit skips that blur when a position:fixed, full-width box touches the edge,
// and fills the band with that box's background colour instead
// (LocalFrameView::fixedContainerEdges hit-tests the top edge's centre). This strip
// is that box:
//   • it paints at 10%, the sampler's floor, so what you see is the page itself;
//     WebKit still reads its colour at full strength
//   • WebKit only re-reads the colour when a fixed box is added or removed, so the
//     strip is re-keyed on every colour change
//
// <StatusTint surface overlays/> — surface = the page colour at the top;
//   overlays = colours registered with useStatusDim(), faded in and out like a scrim.
import React, { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { animate, useIsPresent } from 'framer-motion';

export const StatusDimContext = createContext(null);

// An overlay calls this while it covers the page; the status bar dims with it.
// `color` = the overlay's colour (default: the DLS overlay), null = not covering.
export function useStatusDim(color = 'var(--dls-bg-overlay)') {
  const dims = useContext(StatusDimContext);
  const present = useIsPresent(); // false once its exit starts, so the bar fades out with it
  const id = useId();
  useEffect(() => {
    if (!dims || !present || !color) return undefined;
    dims.set(id, color);
    return () => dims.set(id, null);
  }, [dims, present, id, color]);
}

const rgba = (css) => (css.match(/[\d.]+/g) || []).map(Number);

export default function StatusTint({ surface, overlays }) {
  const probe = useRef(null);
  const shown = useRef(overlays); // the overlays fading out are no longer registered
  if (overlays.length) shown.current = overlays;
  const [fade, setFade] = useState(0);
  const dimmed = overlays.length > 0;
  useEffect(() => {
    const run = animate(fade, dimmed ? 1 : 0, { duration: dimmed ? 0.2 : 0.24, onUpdate: setFade });
    return () => run.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs from wherever the last fade left off
  }, [dimmed]);

  // resolve the tokens in the stage's theme, then lay the overlays over the surface
  const [color, setColor] = useState(null);
  useLayoutEffect(() => {
    const read = (c) => {
      probe.current.style.backgroundColor = c;
      return rgba(getComputedStyle(probe.current).backgroundColor);
    };
    let [r, g, b] = read(surface);
    for (const o of fade > 0 ? shown.current : []) {
      const [or, og, ob, oa = 1] = read(o);
      const a = oa * fade;
      r += (or - r) * a;
      g += (og - g) * a;
      b += (ob - b) * a;
    }
    const next = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    if (next !== color) setColor(next);
  });

  return (
    <>
      <span ref={probe} aria-hidden="true" style={{ display: 'none' }} />
      {color && (
        <div
          key={color}
          aria-hidden="true"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 'max(12px, env(safe-area-inset-top, 0px))', background: color, opacity: 0.1, pointerEvents: 'none', zIndex: 2147483647 }}
        />
      )}
    </>
  );
}
