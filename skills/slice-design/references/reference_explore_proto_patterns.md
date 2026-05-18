# Explore page proto — patterns learned (default states)

Patterns extracted from the default state of every section in `explore-base` (the slice Explore page web proto). Variant-specific experiments are not captured here; only the defaults that landed cleanly.

Defaults considered:
- **For You**: `FY_I` — card-stack shuffle (deck of 3 with auto-cycle + manual drag)
- **AI Banker**: `AB_A` / `AB_E` — pill search bar with rolling questions
- **Bills**: `BL_A` — 4-tile grid
- **Rewards**: `RW_F` — fire + monies 2-up + SparkHeroCard
- **Statistics**: `ST_L` — inline graph + categories
- **More**: `MR_A` — two large tiles (ExploreMedium)
- **Invite & earn**: `FT_A` — purple-band closer with `Send link` CTA

## Card recipe (the "DLS card")

Every default tile / hero / row that needs to read as a card uses the same five tokens. Don't ad-hoc the values:

```js
background: '#FFFFFF',
border: CARD_BORDER,           // 1px hairline, rgba(0,0,0,0.05)
boxShadow: CARD_SHADOW,        // 0 2px 32px rgba(0,0,0,0.05)
borderRadius: 16,              // M-radius
padding: 20,                   // 24 for hero, 20 for standard, 12-16 for compact rows
```

Variant tints (Valentino-50, Slate-30, brand gradient) only appear on **reward-of-the-brand** surfaces (e.g. Spark gradient in `RW_N`). Don't tint generic monies / fires / utility cards.

## Caption + h3 pattern

Section beats use a two-line content block: a quiet caption label + a strong h3 value. Mirrors the Rewards row in `RW_F` and the entries in `RW_O`.

```jsx
<div style={{ ...T.caption, color: 'rgba(0,0,0,0.5)' }}>Spark</div>
<div style={{ ...T.h3, color: 'rgba(0,0,0,0.9)', marginTop: 2 }}>5 drops live</div>
```

Caption is the kind ("Fires" / "Monies" / "Spark"), h3 is the value ("3 ready" / "240" / "5 drops live"). One-word captions read at a glance.

## `.tap` press state

Any card that's a tap target gets `className="tap"`. The CSS provides:

```css
.tap            { transition: transform .12s ease, opacity .12s; }
.tap:active     { transform: scale(0.97); opacity: 0.9; }
```

No JS handlers needed — pure CSS active-state. Used on every default card (May spends, Rewards tiles, BL_A grid items, MR_A tiles, Invite CTA).

## Section anchoring + smart scroll-on-change

Pattern for any page where a control (debug panel, filter, action) mutates a section's content and you want to bring the changed section into view — but only if it's NOT already comfortably on screen.

**Step 1 — anchor the section with scroll-margin:**

```css
[data-section] {
  scroll-margin-top: calc(var(--bar-overlap, 118px) + 20px);
}
```

`scrollIntoView({ block: 'start' })` then lands the section's top exactly 20px below the app bar. The 20px is the slice breathing gap — never 0 (target hides under the bar), never L (24px, reads as too much air below the bar).

**Step 2 — only scroll when needed:**

```js
const BAR_OVERLAP = 118; // matches --bar-overlap CSS default
const BAR_GAP = 20;
const scrollToSection = (key) => {
  const measureAndScroll = () => {
    const target = document.querySelector(`[data-section="${key}"]`);
    if (!target) return;
    // Mobile: always scroll — the page is short, the user expects it.
    const isPhone = window.matchMedia('(max-width: 640px)').matches;
    if (isPhone) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const rect = target.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    const underBar = rect.top < BAR_OVERLAP + BAR_GAP;
    const topInTop50 = rect.top >= 0 && rect.top < vh * 0.5;
    const bottomVisible = rect.bottom <= vh;
    // Skip only when comfortably positioned: not under bar, in upper half,
    // bottom fully visible. Any failure → scroll.
    if (!underBar && topInTop50 && bottomVisible) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // Two RAF ticks so React's variant-change reflow has finished before measuring.
  requestAnimationFrame(() => requestAnimationFrame(measureAndScroll));
};
```

**Why each check exists:**
- `underBar` — the section is hidden behind the app bar overlap. Always scroll.
- `!topInTop50` — section top is below the fold. User would have to scroll manually to see what changed. Scroll for them.
- `!bottomVisible` — variant got taller and now overflows the viewport bottom. Scroll up so the whole new variant comes into view.

The two RAF ticks matter: the first lets React commit, the second lets layout finish — `getBoundingClientRect` lies if you measure on the same frame as the state change.

## Section-to-section spacing

| From → To | Gap (px) | Notes |
|---|---|---|
| Utility FY (card-stack `I`) → next section | 28 | Card stack's shadow needs room |
| Gradient FY (`D`/`F`/`J`) → next section | 24 | Gradient ends in white at the bottom |
| Strip FY (`B`/`C`) → next section | 4 - 12 | Strip already has internal scroll-padding |
| Bills header → grid content | 4 - 8 | List-style header is tight |
| Inter-card stack (RW_F's hero + tiles) | 16 | Standard card-stack gap |

If `isFirst` is true on a `SectionWrap`, the `gapHeaderAbove` is suppressed — the upstream Spacer owns the gap.

## SparkHeroCard choreography (the RW_F default)

A 3-beat reveal that runs on viewport-enter, then loops the title:

1. **t=0** — caption `Spark`, h3 `Save ₹1200`, spark icon visible on the right.
2. **t≈650ms** — spark icon rotates 360° + scales to 0 + blur-out (540-680ms, `cubic-bezier(0.65, 0, 0.35, 1)`). Brand pills cascade in from the same anchor with a right→left stagger (780ms each, 110ms stagger). Pills render OVER the spark icon (zIndex), not behind.
3. **t≈2450ms** — title slides up to next entry (translateY 100% → 0%, 800ms, `cubic-bezier(0.22, 1, 0.36, 1)`). Continuous upward rotation — strip never resets; each cycle just adds another row to the strip and bumps the translateY further negative.
4. **every 5200ms thereafter** — title swap repeats.

**Reusable knobs (on SparkBrandStack):**
- `iconSize` controls only the initial spark glyph (44-52px reads well next to 32-52px brand pills)
- `size` controls the brand circles (28-32px sweet spot)
- `overlap` is the px the pills slide into each other (9-10 keeps a clean cascade)
- `play` lets a parent control the trigger (otherwise the stack uses its own observer)
- `blobs={true}` swaps the entry keyframe to `spark-blob-in` — pills scale up past 1 and settle, used in `RW_G`-style clustered reveals.

## Continuous text-roll (the rolling title)

The h3 in SparkHeroCard rotates through `['Save ₹1200', '5 drops live']` with a continuous UPWARD slide — the strip never resets, never reverses, never teleports. Each cycle just adds another row at the bottom and bumps the translate further negative. Reads as a smooth conveyor belt instead of a fade or a jumpy reset.

**Why this approach** — a naïve cross-fade between two titles loses direction continuity (which way is "next"?); a translateY-with-reset has a visible snap at every loop. The append-and-translate strip has neither problem because there's never a discontinuity to render.

**Implementation:**

```jsx
const ROW_H = 24;                          // one h3 line height
const titleSlideMs = 800;
const titleEasing = 'cubic-bezier(0.22, 1, 0.36, 1)';
const TITLES = ['Save ₹1200', '5 drops live'];

const [cycleIdx, setCycleIdx] = useState(0);
// On viewport-enter, after the spark-cascade beat lands:
//   setTimeout(() => setCycleIdx(i => i + 1), 2450);     // first swap
//   setInterval(() => setCycleIdx(i => i + 1), 5200);    // loop

// Strip is `cycleIdx + buffer` rows long; each row holds the title at
// `TITLES[i % TITLES.length]`. The strip never resets — we just keep
// appending rows so translateY can keep going more negative forever.
const stripLen = cycleIdx + 4;
const stripItems = useMemo(
  () => Array.from({ length: stripLen }, (_, i) => TITLES[i % TITLES.length]),
  [stripLen]
);

return (
  <div style={{
    position: 'relative', height: ROW_H, overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      transform: `translateY(${-cycleIdx * ROW_H}px)`,
      transition: `transform ${titleSlideMs}ms ${titleEasing}`,
      willChange: 'transform',
    }}>
      {stripItems.map((t, i) => (
        <div key={i} style={{
          ...T.h3, height: ROW_H, lineHeight: `${ROW_H}px`,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{t}</div>
      ))}
    </div>
  </div>
);
```

**Knobs:**
- `ROW_H` must match the line height of the text inside. h3 = 24px in slice DLS.
- `titleSlideMs` 640-800ms feels right; under 500ms reads as a hard cut, over 1000ms feels mushy.
- `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) — punchy start, long settle. Avoid linear (reads mechanical).
- Loop interval should be at least 4× the slide duration so the user can read each entry before the next swap.
- The `+ 4` buffer is enough — React only re-renders the strip when `cycleIdx` changes, so memory growth is bounded by however long the user keeps the card on screen.

**Apply when:** a single attention slot (h3, caption, badge value) needs to cycle through 2-3 short strings with a clear "newer entry replaces older" feel. Not for live counters, not for marquee tickers.

## SparkBubbleCloud (RW_G's Spark tile)

When the brand pills should feel like SCATTERED bubbles rather than a row:

- Cluster confined to a ~70×80 quadrant in the bottom-right of the parent (right offset + size ≤ 52 for every pill at standard card widths).
- Quincunx layout: 1 big anchor at the corner + 4 satellites with corner touches (not overlap).
- Smaller pills render ON TOP of bigger ones (`zIndex: i + 1`) so a smaller satellite never gets hidden behind the anchor.
- Spark icon rotates about its own center (`transformOrigin: '50% 50%'`), not its bottom-right corner — keeps the rotation visually anchored.

## Headers, no-header, in-card

Three header modes per section (`headerStyle` switch):
- **Bold** — large section title above content
- **List** — slim list-style title above content
- **None** — section flows in-card; title (if any) is rendered INSIDE the first card via `InCardHeader`

The default proto layout uses List for most sections, None for FY (the For You section never carries a section header — the carousel/cards ARE the section).

## What NOT to do (anti-patterns specific to this proto)

- Don't put a chevron on the right of a monies card. Monies tap targets read as cards; the chevron is reserved for list rows that drill into a detail.
- Don't tint a generic monies row Valentino. Valentino-50 belongs on spark / brand-led surfaces.
- Don't reuse `bling` shine effects on the spark icon. The rotate-and-shrink + pill cascade is the validated motion; layered shines on top read as gimmicky.
- Don't pin small bubbles to the top-only of the cloud anchor — they read as disconnected satellites. Spread them around the anchor in a quincunx or fan.
