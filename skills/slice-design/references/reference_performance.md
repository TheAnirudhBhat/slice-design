---
name: Performance — slice motion + UI runtime
description: Rules for keeping slice UI smooth — GPU-only animations, cheap CSS variables, framework gotchas, when CSS beats JS.
type: reference
---

Performance in slice = users feel speed. A 60fps interaction with a 200ms duration feels faster than a 30fps interaction at 100ms. Drop frames once and the UI feels broken even if everything else is perfect.

This file documents the runtime constraints that apply across slice — web protos, Figma plugin work, any code that has to keep up with user interaction.

## Only animate `transform` and `opacity`

These properties skip the layout + paint pipeline. Animations run on the GPU compositor, off the main thread. Animating anything else (`padding`, `margin`, `height`, `width`, `top`, `left`, `background`, `color`) triggers layout and/or paint per frame — every frame — which drops frames under any main-thread load (scrolling, JS, image decode).

Replace common patterns:

| Bad | Good | Why |
|---|---|---|
| `height: 0 → auto` | `transform: scaleY(0) → scaleY(1)` with `transform-origin: top` | scaleY is GPU; height triggers layout |
| `width: 0 → 100%` | `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` | clip-path is paint-only (no layout); width triggers layout |
| `top: 100px → 0` | `transform: translateY(100px) → translateY(0)` | translate is GPU; top triggers layout |
| `background-color: A → B` | OK for occasional state change, NOT for continuous animation | paint is acceptable for one-off; not for 60fps |

Why: a single layout reflow on the main thread costs ~5–10ms. At 60fps you have 16ms per frame. One reflow eats two-thirds of your budget. Two reflows = dropped frame.

## CSS variables on parent = expensive recalc

Changing a CSS variable on a parent element recalculates styles for **every descendant that reads it**. In a drawer with many items, updating `--swipe-amount` on the drawer container triggers style recalculation on every child.

```js
// Bad: triggers recalc on all children
drawer.style.setProperty('--swipe-amount', `${distance}px`);

// Good: only affects this element
drawer.style.transform = `translateY(${distance}px)`;
```

Rule: if a value is only used by one element, set it directly on that element. Reserve CSS variables on parents for theme tokens (light/dark) that genuinely cascade.

## Framer Motion: shorthand vs transform string

Framer Motion's shorthand properties (`x`, `y`, `scale`) are NOT hardware-accelerated. They use `requestAnimationFrame` on the main thread. Convenient but drop frames under load.

```jsx
// NOT hardware accelerated — convenient but drops frames under load
<motion.div animate={{ x: 100 }} />

// Hardware accelerated — stays smooth even when main thread is busy
<motion.div animate={{ transform: "translateX(100px)" }} />
```

When to care: any time the animation runs while the browser is also loading content, running heavy JS, or painting. At slice's scale (web protos with images + data fetches) this matters constantly. Default to the `transform` string.

## CSS animations beat JS under load

CSS animations run off the main thread. When the browser is busy loading a new page, Framer Motion / requestAnimationFrame animations drop frames; CSS animations stay smooth.

Rule of thumb:
- **Predetermined animations** (sheet present, push transition, button press feedback) → CSS
- **Dynamic, interruptible, user-driven** (drag interactions, scroll-linked, gesture-coupled) → JS (springs, useTransform, etc.)

Translating dropped-frame Framer Motion patterns to CSS is often the perf fix. Example from Vercel's dashboard: Shared Layout Animations + heavy page loads dropped frames; switching the layout animation to CSS keyframes fixed it.

## WAAPI for programmatic CSS animations

When you need JS control over CSS-quality animations, use the Web Animations API. Hardware-accelerated, interruptible, no library needed.

```js
element.animate(
  [
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0 0)' }
  ],
  {
    duration: 1000,
    fill: 'forwards',
    easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
  }
);
```

Use when:
- You need to trigger a CSS-quality animation from a JS event handler
- You need to interrupt and retarget mid-animation
- You don't want to add a motion library for a one-off

## Stagger animations — short delays only

Long stagger between list items (>80ms per item) makes the page feel slow even though each item is fast. Why: total perceived duration = number of items × stagger delay. 10 items × 100ms stagger = the user feels a 1-second reveal.

Keep stagger 30–80ms per item. For long lists, only stagger the first 5–7 items; the rest appear in sync. The first wave gives the cascading feel; the tail doesn't punish the user.

## Skeleton shimmer is the only allowed infinite loop

All other infinite ambient animation is anti-pattern (battery, attention budget). Skeleton shimmer is an exception because it serves a purpose (loading state) and the loop ends when content arrives.

Skeleton shimmer spec:
- Linear gradient (`#F6F9FC` → `#EAEBED` → `#F6F9FC`)
- `transform: translateX(-100% → 100%)`
- 1200ms, `linear`, infinite

Stop the loop the moment real content arrives. Don't fade the skeleton out before swapping; just remove it. The content appearing IS the transition.

## Will-change — use sparingly

`will-change: transform` hints to the browser that a property will animate, letting it promote the element to its own GPU layer ahead of time. Useful for elements that animate after a user interaction (e.g. drawer that drags).

Don't apply `will-change` to large numbers of elements or to elements that stay still. GPU layers cost memory; over-promotion can hurt perf.

```css
.drawer {
  will-change: transform; /* OK — drawer animates often */
}

.button {
  /* No will-change — buttons animate briefly, not worth a permanent layer */
}
```

## iOS WebKit (iPhone) — measured on a phone, not assumed (cal:2026-10-07, birthday-spark)

Every rule here came from a phone screen recording, stepped frame by frame. Desktop browsers and headless WebKit don't show any of them: WebKit screenshots even force synchronous image decoding. Verify motion work on a phone.

| Don't | Do | What it did on the phone |
|---|---|---|
| CSS `filter` (`drop-shadow`, `blur`) on anything that moves, lifts or hides | `box-shadow` on the element's own radius, or the shadow baked into the image | iOS kept painting the filter layer's rectangle: a rectangular fade round a lifted card (IMG_3813/3817/3818) |
| SVG filters (`feDropShadow`) or SVG `<image>` in animated content | one `<img>` with its soft shadow baked in (the gift's bow: `gen_bow_shadow.png`, the source padded 40px for its shadow) | drawn late or not at all: the bow missing through a drag and a landing, popping in after (IMG_3829) |
| a fill or clip `url(#id)` pointing into ANOTHER `<svg>`'s `<defs>` | every `<svg>` carries its own `<defs>` (ids unique per instance, `useId`) | now and then it didn't resolve, and the face drew nothing |
| a large image in an `<img>` that mounts during motion (decoded `w × h × 4` over 500KB) | `decoding="sync"` on it | WebKit decodes it off-thread on that element's first paint and draws nothing until it lands (`RenderBoxModelObject::decodingModeForImageDraw`, `BitmapImageSource::isLargeForDecoding`): the bow vanished for 2 frames at a tap (IMG_3831), or for the whole toss (IMG_3830) |
| promoting a layer at an animation's first frame | `will-change: transform` from mount on everything that will move, and hold the first pose until the page has painted twice (`useAfterPaint(2)`, a double rAF) before starting | the phone stalled that frame to draw the new layers, then jumped to catch up (IMG_3828: per-frame steps −3, −14, −41px) |
| mounting dozens of animations on a tap's frame (a confetti burst with the lid toss) | mount the effect a few frames later (`useAfterFrames(5)`), after the main motion's start frame | the main motion's first frames were starved |
| `:active` press-scale on a card whose content swaps or whose shadow matters | no press-scale on that card | iOS made a layer mid-press that clipped the shadow to a rectangle, and the swapped-in card painted hard-cornered for a frame (IMG_3827) |
| independent `x` / `y` / `rotate` tracks for physics paths (confetti, emoji, cannons) | ONE transform-string keyframe track per piece, sampled at 30fps (framer hands it to WAAPI, the compositor) | smooth while the page was busy |
| a full-screen light effect built from many glowing DOM nodes | one WebGL fragment shader on one canvas (the GPU draws it; JS only ticks the clock); three.js loaded lazily on first use; a fresh canvas per run (a context that was let go can't be had back); `compileAsync` before starting | — |

**Verifying off the phone:** run Playwright WebKit (outside the sandbox) and freeze the motion, stepping it through WAAPI `currentTime`; stamp captured frames with the page's own clock (screenshot latency drifts later frames late); the desktop app's browser pane pauses `requestAnimationFrame` while hidden. What only a phone shows (decoding, compositing), say so and get a screen recording. See `reference_proto_systematics.md` root causes #21–#23.
