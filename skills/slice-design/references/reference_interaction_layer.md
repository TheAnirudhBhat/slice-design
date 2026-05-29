---
name: slice interaction layer — vocabulary (not feel)
description: Vocabulary for micro-interactions + page transitions + interaction primitives. Documents WHICH primitive applies to WHICH context (right slide vs bottom slide vs fade vs instant). **Does NOT capture actual interaction feel** — friction curves, settle behavior, micro-delays, gesture sensitivity vary per-app and need per-project calibration. Treat this file as starter vocabulary; per-project memory (.slice-design/project.md) captures the canonical feel for each project.
type: reference
---

# Interaction layer — vocabulary, not feel

This file is the abstract "WHEN to use WHICH interaction primitive" layer. It does NOT document the actual feel of slice interactions in production — that's app-specific and varies between proto and shipped app.

## What this file IS

- A taxonomy of interaction primitives (press feedback / page transitions / drag / hover / stagger / value change)
- WHEN-to-use rules (push nav for forward, bottom slide for sheets, fade for state change, instant for high-frequency)
- Starter timings and easings (matching `reference_motion.md`'s named curves)
- Anti-patterns (no scale-on-press, no infinite ambient motion, etc.)

## What this file is NOT

- The actual production interaction feel (friction curves, gesture sensitivity, settle behavior)
- Per-screen timing fine-tunes (Banking L0 card press might feel different than Payments L0 action pill press, even if both use the same opacity-dim rule)
- The latest shipped interaction behavior (production may have evolved beyond what's calibrated here)

**Interaction feel is per-app/project. Calibrate it in `.slice-design/project.md`** when working on a specific proto or project. The values here are starter defaults; project memory captures canonical decisions for that project's context.

## How to use this file with project memory

1. Open the project (e.g. `explore-base` proto, `atom-proto`, or any slice surface work)
2. Check `.slice-design/project.md` first for any interaction overrides
3. Fall back to this file for unmocked surfaces
4. When the project ships, promote project-memory interaction decisions back to global calibration via `/calibrate` or `/sweep`

This is the same hard-rules / soft-rules / exploration model that applies to recipes — vocabulary is the soft rule; per-project memory can extend with specific feel; hard rules (no scale-on-press, no infinite ambient motion) never bend.

WHY: slice has a distinctive interaction feel — but it's been calibrated through use, not formal documentation. This file is the abstract scaffolding. Per-project sweeps + calibration are where the actual feel gets captured.

---

## Press feedback — taps

When a user taps any tappable element, the response is feedback that confirms the system heard the tap.

### Slice canonical press feedback
- **Opacity dim**: 1 → 0.7 over 160ms `quick`
- **Release**: 0.7 → 1 over 160ms `out-fast`
- **No scale.** Slice does NOT use `scale(0.97)` on tap. The iOS rubber-band scale-on-press is anti-pattern.

WHY no scale: scale-on-press is consumer-toy aesthetic; slice is calm fintech. Opacity dim is subtler, faster, and works on all surfaces (cards, rows, buttons) without making elements physically move.

### Applies to
- Buttons (Primary, Secondary, Tertiary, all sizes)
- Cards that are tappable (L0 cards, L1 cards, callouts)
- List item rows
- Tappable text links (V-500 inline links)
- Avatar buttons in App bar trailing slot
- Floating bottom dock icons
- Pills (chips, segmented control thumb, action pills)

### Does NOT apply to
- High-frequency taps where animation feels slow:
  - **Keypad digits** (Payments L0 custom keypad) — instant, no opacity dim
  - **System keyboard** (PIN entry, text input) — OS handles
  - **Filter pill toggles** in segmented controls — instant state change
  - **Toggle switches** — toggle animation IS the feedback
- Non-tappable surfaces (display values, decorative illustrations, captions)

### Press feedback for hold-to-confirm patterns (asymmetric)
For deliberate "hold this button to confirm a destructive action" patterns:
- **Press**: 2s linear `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` on a coloured overlay
- **Release before complete**: 200ms `ease-out` snap-back to `inset(0 100% 0 0)`
- **Complete**: action fires

WHY asymmetric: slow press = deliberation required. Fast release = system responds immediately. See `reference_exploration_patterns.md` for clip-path mechanics.

---

## Page transitions — the taxonomy

Every time the user navigates from one surface to another, the transition communicates WHAT just happened.

### Right slide-in (push nav — forward in a flow)
- **Outgoing screen**: translateX 0 → -25%, opacity 1 → 0.7, 320ms `out`
- **Incoming screen**: translateX 100% → 0, 320ms `out`
- **Bottom nav**: stays put (anchored layer, never animates)

**Use when**:
- Pushing forward into a flow step (Banking L0 → Add money form → Source picker → PIN)
- Drilling into detail (Activity L0 → Transaction detail L2)
- Entering a sub-surface (Profile V3 → Profile details L2)

WHY: matches the user's mental model of "going deeper." The slight slide-out + dim of the previous screen signals "this is still there, behind you."

### Left slide-in (pop nav — backward)
- **Incoming screen**: translateX -25% → 0, opacity 0.7 → 1, 320ms `out`
- **Outgoing screen**: translateX 0 → 100%, 320ms `out`

**Use when**:
- Chevron back from any L1+ surface
- Programmatic back navigation (after confirmation, after error retry)

### Bottom slide-up (sheet present — modal, not flow step)
- **Sheet**: translateY 100% → 0, 280ms `out`
- **Backdrop**: opacity 0 → 0.3, 280ms `out`
- **Page underneath**: stays put (no scaling)

**Use when**:
- Bottom sheet (any of the 4 row clusters per `reference_dls_bottomsheet.md`)
- Modal overlays (Confirm T&C consent, payment confirm contextual sheets)
- Action centre notifications surfacing inline
- Picker bottom sheets (source account, date, plan)
- Snackbar (when used as a non-blocking notification — short translateY)

WHY distinct from push: the user isn't moving forward in a flow — the sheet is a transient interruption / decision / picker that returns control to the underlying screen on dismiss.

### Sheet dismiss
- **Sheet**: translateY 0 → 100%, 240ms `out-fast`
- **Backdrop**: opacity 0.3 → 0, 240ms `out-fast`

Exit is faster than enter (asymmetric timing — system responds fast).

### Fade in-place (state change, no spatial movement)
- **Element**: opacity 0 → 1 over 240ms `out` (or 160ms `quick` for small elements)

**Use when**:
- Card content swap on filter change
- Action pill state morph (default → highlighted on Payments L0)
- Loading skeleton → real content swap
- Tab content change (Pills segmented control)

WHY: state changes don't move physically — they morph in place. Sliding would imply spatial change that didn't happen.

### Instant / no transition (high-frequency or zero-latency contexts)
- **Element appears**: no animation

**Use when**:
- Keyboard digit press → number appears in input
- Filter pill state toggle
- Toggle switch flip → bg color change is the only "animation"
- Action pills row update when BE responds (the appearance is the change)
- Skeleton → content (content just replaces skeleton, no fade-through)

WHY: per Emil's frequency rule — high-frequency actions feel slow with any animation. 100+/day actions get no animation, ever.

### Full-screen takeover (no underlying page)
- Like Sheet but the entire surface fills with no backdrop
- **Use when**: Connection Lost, Offline error, Pay person brand-immersive, Payment confirmation tick screen
- Transition: translateY 100% → 0 over 280ms `out` (same as sheet) but no backdrop dim — the takeover IS the surface

### Brand-immersion intermediate (rewarded payments only)
- Pink full-bleed fades IN over ~520ms `linger` → reveal frame shows reward art → resolves to white tick frame
- **Use when**: payment status transition envelope for rewarded txns (FIRE, MONIES, SPARK+FIRE+MONIES, FIRE+CASHBACK)

See `reference_motion.md` § payment_status_transition for the 3-stage envelope detail.

---

## Drag interactions

When the user touches and drags an element.

### Drag-to-dismiss (bottom sheets — Payment + Information clusters only)
Per R20 bottom sheet sweep:
- **Touch start** → pointer capture activates
- **Drag**: sheet follows finger 1:1 (no damping until boundary)
- **Damping at top boundary**: if user drags above the rest position, increasing friction reduces movement
- **Release**: if velocity > 0.11 OR distance > SWIPE_THRESHOLD → dismiss (translateY to 100% over 240ms `out-fast`); else snap back to rest position (240ms `out`)

Does NOT apply to Action driven / Action on sheet sheets — they have no handle and no drag-dismiss.

### Drag-to-reveal (Repayment dialer rotary input)
Per R19 Credit Card 2026 sweep:
- **Touch start on dialer notch** → pointer capture
- **Drag along ring**: notch follows finger angle; caption above ring updates per position
- **Damping at chip boundaries**: dragging past the Min/Total/Full notches applies increasing friction (can't snap off the ring)
- **Release on a chip notch**: snap into chip's exact position (200ms `out-fast`); chip selects
- **Release between notches**: stay at exact drag position (custom amount mode)

### Drag-to-archive / swipe-to-dismiss (Action centre cards — TBD)
Pattern exists but not yet calibrated. When confirmed, will follow momentum-dismissal rule (velocity > 0.11).

---

## Hover states (web protos only)

Slice ships as a mobile app primarily; web protos exist for design exploration. Hover behaviour applies ONLY in web contexts.

### Touch-device hover gate
All hover styling MUST be gated:
```css
@media (hover: hover) and (pointer: fine) {
  .element:hover { ... }
}
```

WHY: touch devices trigger `:hover` on tap, causing false-positive hover states. Gating prevents this.

### Slice canonical hover (when applicable)
- Card hover: NO lift, NO shadow swap, NO scale. Cards are tap targets, not hover surfaces.
- Button hover: opacity 1 → 0.9 over 120ms `out` (subtle)
- Link hover: underline appears (was absent in idle state) over 120ms `out`
- Avatar hover: NO change. Identity doesn't react to hover.

WHY: slice's restraint principle. Web hovers are subtle informational signals, not motion moments.

---

## List interactions

### Tap a list row
- Row dims to 0.7 opacity over 160ms `quick` (press feedback)
- On release: opacity returns + push nav transitions to the row's destination

### Sticky date group headers (Activity)
When the user scrolls past a date-group boundary:
- **Outgoing header** (e.g. TODAY): stays pinned to top until next header reaches it, then is replaced
- **Incoming header** (e.g. YESTERDAY): slides up from below into the pinned position
- 160ms `quick` ease

WHY: keeps the user oriented in the timeline without forcing them to scroll back to find a date label.

### Pull-to-refresh (TBD)
Not yet calibrated. When confirmed:
- Probably damping + spring-back behaviour
- Pink-immersion or skeleton shimmer on refresh

### Auto-load on scroll (long lists)
- When user scrolls within ~200px of list bottom: spinner appears + "Loading more…" caption
- No "Load more" button — auto-load preserves continuity
- New rows fade-in in place (NOT stagger, NOT slide — would feel like discontinuity)

---

## Stagger animations (multiple elements entering together)

When N elements appear together (list reveal, action pills appearing post-BE-response, atom cards on chooser):
- **Per-item delay**: 30-80ms
- **Cap at first 5-7 items**: longer lists stop staggering after item ~7; remaining items appear in sync
- **Total perceived duration ≤ 500ms** — beyond that the list feels slow

WHY 30-80ms: short enough to feel like a single coordinated reveal, long enough that the eye perceives directional cascade. > 80ms feels broken / janky.

WHY cap at ~7: total stagger time = N × per-item delay. With 20 list items × 50ms = 1 second of staggering, which feels punishingly slow. Cap protects long lists.

---

## Value change (amount, counter)

When a displayed value updates (Savings balance ticks up after Add money, monies pill ticks up after cashback):
- **New value**: translateY -100% → 0 + opacity 0 → 1 over 240ms `out`
- **Old value**: translateY 0 → 100% + opacity 1 → 0 over 240ms `out` (same time, edges masked)

WHY: the up-down movement physically signals "this number changed" without abruptness. Edges-masked transition prevents seeing two overlapping numbers.

### Sequential ticker for multi-value (Action Pills row)
When multiple value tickers fire (fire count + monies count both increment after a rewarded payment):
- First ticker completes value-change animation
- THEN second ticker starts
- Never parallel

WHY: parallel value changes are visually noisy and the user can't track either. Sequential preserves attention.

---

## Skeleton shimmer (the only allowed infinite loop)

- Linear gradient (`#F6F9FC` → `#EAEBED` → `#F6F9FC`)
- `transform: translateX(-100% → 100%)`
- 1200ms, `linear`, infinite
- Stops when real content arrives (don't fade skeleton out — just replace)

WHY shimmer is the exception to the no-infinite-loops rule: it serves a real purpose (loading state) and the loop ends when content arrives. Other infinite animations (logo spin, parallax) don't serve a moment.

---

## Spark hero reveal (anchor → reveal choreography)

The signature slice motion moment. Used when a quiet card resolves into a richer state (savings hook → live drops, balance hook → reward unlock).

```
t=0      static icon + anchor copy visible
t≈1.6s   icon does short bling twitch (scale + wiggle, 640ms spring-soft)
t≈1.8s   title pushes from below into new copy
         (translateY 100%→0%, 520ms `linger`, edges masked top/bottom 22%/78% for fade-on-cross)
t≈2.1s   icon rotates 360° + scales to 0 + opacity fades
         brand pills cascade in from the same anchor with right→left stagger
```

WHY this is reserved for delight moments only: it's 2.1 seconds of choreography. Applying it to routine state changes or filter toggles would feel performative.

---

## Campaign pill reveal (Payments L0 — R20 motion)

9-step sequence — how the "Win up to ₹100" marketing pill enters the Payments L0.

1. **Opening**: numpad + ₹0 + scanner FAB, no Action Pills row
2. **Return state (post-BE response)**: UPI ID pill appears centred
3. **Glyph fade-in**: tiny ↻ refresh glyph appears + haptic + `bling` (640ms `spring-soft`)
4. **Pill collapses out from glyph anchor**: 320ms `gentle` ease
5. **Pill at full width**: glyph leading inside
6. **UPI ID pill returns** (opacity 0→1 + translateX)
7. **Compressed identity** (when > 14 chars)
8. **Both pills at full**: settled state
9. **On tap**: scrim 280ms + sheet rises (translateY 100%→0)
10. **Holding state**: run-once gated, does NOT loop

WHY run-once: reinforces the no-infinite-loops rule. Attention-grab that loops becomes noise.

---

## Payment status transition envelope (rewarded vs un-rewarded)

3-stage envelope for payment-completion transitions:

| Stage | Un-rewarded (NO_REWARDS) | Rewarded (FIRE / MONIES / SPARK+FIRE+MONIES / FIRE+CASHBACK) |
|---|---|---|
| 1. Brand-immersion | (skipped) | Pink full-bleed fades in (~520ms `linger`) |
| 2. Reveal | (skipped) | Reward visual fades in over pink (stagger 80-120ms between reward-card elements) |
| 3. Resolve | White screen + green grainy gradient tick + verb-amount H2 | Same as un-rewarded |

WHY pink immersion for rewarded txns: rewards are a brand moment. Slice celebrates user-unlocked events before resolving to canonical confirmation. Un-rewarded txns skip straight to confirmation because there's no celebration to land.

Motion durations are inferred (LOW-MEDIUM confidence per R19) — per-frame calibration pending.

---

## What slice doesn't animate

| Element | Reason |
|---|---|
| Card hover (web protos) | Cards are tap targets, not hover surfaces |
| Header titles | Stay still — movement lives in body content |
| Bottom nav | Anchored layer — never animates between screens |
| Avatars | No pulse / glow / breathe — identity is stable |
| Buttons | No shimmer through label, no gradient sweep |
| Page-level scale on sheet present | iOS-Maps look — doesn't fit 360-width phone-first |

---

## Anti-patterns (interaction-layer specific)

### ❌ Scale-on-press for tap feedback
Slice uses opacity dim, NOT scale. iOS rubber-band is anti-pattern.

### ❌ Bounce on entry (overshoot on routine elements)
Reserved for one-shot bling (Spark hero reveal). NOT for routine card enters, NOT for sheet rises, NOT for value changes.

### ❌ Animating from `scale(0)` for entry
Start from `scale(0.95)` + `opacity: 0`. Nothing in the real world disappears and reappears completely.

### ❌ `transition: all`
Always specify exact properties. `all` triggers off-GPU props and drops frames.

### ❌ `transform-origin: center` on popovers
Popovers should scale from their trigger anchor, not from centre. Modals are the exception (centre-origin OK because they're not trigger-anchored).

### ❌ Animation on keyboard-initiated actions
Per Emil's frequency rule: keyboard taps are 100+/day. Any animation feels slow + disconnected from the keystroke.

### ❌ Same enter/exit timing
Enter at 200-400ms, exit at 200-280ms (faster). Slow press, fast release.

### ❌ Stagger > 80ms per item OR not capping at item ~7
Long lists with full stagger feel broken / slow. Cap and accelerate.

### ❌ Two value tickers animating simultaneously
Sequential only. Parallel value changes are noisy and untrackable.

### ❌ Spinning logos / icons for ambient motion
Reads as "loading" even when not loading. Confuses users.

---

## Decision tree for choosing a transition

When designing a new surface or flow step, ask:

1. **Is this a flow step?**
   - YES → push nav (right slide-in for forward, left slide-in for back)
   - NO → continue

2. **Is this a modal interruption that returns control to the underlying screen?**
   - YES → bottom slide-up (sheet present)
   - NO → continue

3. **Is this a state change in place (no spatial movement)?**
   - YES → fade in-place
   - NO → continue

4. **Is this a high-frequency action (keyboard digit, filter pill, switch flip)?**
   - YES → instant / no transition
   - NO → continue

5. **Is this a full-screen takeover that replaces the underlying surface entirely (not a sheet over it)?**
   - YES → full-screen takeover (translateY 100%→0 without backdrop)
   - NO → reconsider — most cases fit one of the above

6. **Is this a celebration / brand moment (payment success, FTUX hero, reward reveal)?**
   - YES → brand-immersion intermediate OR Spark hero reveal choreography
   - NO → use one of the standard transitions

WHY this tree exists: when you reach for a new transition, you usually shouldn't. The 5 canonical transitions (right / left / bottom / fade / instant) + 2 special cases (full-screen takeover, brand moment) cover ~95% of slice surfaces. Inventing new transitions is anti-pattern.

---

## How to use this file

Load this when:
- Designing a new interaction (button feedback, sheet entry, card morph, value update)
- Reviewing motion in an existing surface ("does the action pill morph feel right?")
- Choosing between transition options (does this surface push or slide-up?)
- Verifying interaction timing for a flow step

Don't load this for:
- Motion vocabulary (durations, easings) → `reference_motion.md`
- Flow connectivity (which surface goes to which) → `reference_flows.md`
- Component-specific anatomy → `reference_dls_<component>.md`

This is the WHEN layer. `reference_motion.md` is the WHAT (vocabulary). `reference_flows.md` is the WHY (intent). Together they describe slice's interaction feel.

---

## Calibrated through

R21 (2026-05-28). Many entries here are derived from R11-R21 motion + sweep findings; durations marked LOW confidence pending per-frame calibration sweeps (payment status transition envelope, Spark hero reveal timings).

Open / pending:
- Pull-to-refresh pattern — TBD
- Swipe-to-archive for Action centre cards — TBD
- Custom Spark game interactions — TBD
- Tap-to-reveal QR card on Profile V3 — TBD
