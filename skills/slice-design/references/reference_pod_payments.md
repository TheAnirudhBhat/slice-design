---
name: slice-design Payments pod
description: Per-pod aggregator — every rule, recipe, anti-pattern, and motion touching the Payments pod (V-500 brand-immersive dialer, action pills, pay flows, payment confirmation + transition envelope). Load this for any Payments-pod task.
type: reference-aggregator
---

# Payments pod

## The brand-immersive principle

Payments is the pod where slice's brand identity lives most strongly. Where Banking, Explore, Credit, and Activity are white-page card surfaces with V-500 reserved for accents, Payments **takes over the entire surface in Valentino-500** — page bg, status bar text, chrome edge-to-edge. The user enters the payments moment and the brand answers back: this is where slice is loudest.

Three rules flow from this principle:
1. **Brand fill is the chrome.** No App bar at L0. No white card heroes. The V-500 fill IS the container. Anything that lands on it must coexist with the brand, not compete.
2. **Translucent over solid.** Every secondary surface (action pills, Tertiary buttons, status-bar elements) uses translucent-white fills — tinting the brand colour, never blocking it. Solid white or solid V-500 on a V-500 page bg both fail the test.
3. **Brand-immersion is light-mode-only.** In dark mode the V-500 fill flattens to pure black; the brand survives only as text + the active dock-icon glyph. The pod doesn't "become darker purple" — it sheds the fill entirely.

These rules apply at the L0 surface (dialer). Downstream flows (Pay person, Pay screen L1/L2, PIN entry, confirmation) drop the brand-immersion in favour of standard chrome — with the single exception of the Pay person brand-immersive screen for known UPI ID payees.

## In scope

- **Payments L0** — V-500 brand-immersive dialer + Action Pills row (R19 updated recipe)
- **Action Pills** — anatomy, width variants, interaction rules, sequential tickers, campaign-pill reveal motion
- **Pay person — brand-immersive** — full V-500 fill for known UPI ID payees
- **Pay screen L1/L2** — App bar Standard + dynamic title `Pay ₹X` + form rows + QUICK PAY circles
- **Amount entry** — big centred Display, ₹ matches digit weight
- **PIN entry** — App bar Standard + Display title + system keyboard (not custom keypad)
- **Payment confirmation** — grainy gradient tick + verb+amount H2 + Done/Share receipt CTAs
- **Transaction failed** — red Avatar Bold X + retry pattern
- **Payment status transition envelope** — 3-stage rewarded vs un-rewarded
- **Campaign pill reveal motion** — 9-step choreography
- **Dark-mode swap** — brand-immersive surface flattens to pure black

## Out of scope (see)

- Banking pod → `reference_pod_banking.md`
- Credit repayment dialer (rotary, on credit surface) → `reference_pod_credit.md`
- Hard rules / brand voice / palette → `reference_pod_cross_cutting.md`
- Bottom sheet base anatomy → `reference_dls_bottomsheet.md`
- Per-component deep specs → `reference_dls_<component>.md`
- Transaction detail page (L2 status header recipe) → `reference_dls_screen_layouts.md` R19 batch

---

## Payments L0 — brand-immersive dialer

**Source frames:** Valentino file `J8xKGFeQ5JoDJZdaUXiLPz` node `8772:12216` (30+ instances across Default / Expansion / Dismiss / Highlight / Ticker variants). Canonical L0: working copy `PNUz3Dr9KSlFJSnsXsC0nL` node `885:19901` (light) + `1967:18266` (dark). R19-updated 2026-05-28.

**This is NOT the "Pay screen" form.** That's a downstream L1/L2 surface after picking a payee — recipe further below.

---

## CANONICAL — Valentino home (R23 proto rewrite)

**Canonical proto:** `slice/projects/slice-app-proto/src/pods/payments/L0_valentinoHome.jsx` (the live spec; node `885:19901` in `PNUz3Dr9KSlFJSnsXsC0nL`).
**Status:** R23 calibrated. Supersedes any earlier App-bar / hero / keypad spec for the Valentino home.

### Anatomy (top → bottom)

1. **Status bar** — rendered GLOBALLY by `App.jsx` as a fixed overlay (54px reserve). NOT per-page. Status-bar text recolors per-element as pages slide under it (see `reference_motion.md` R23 "clean-cut variant transition").
2. **App bar** — ~52px row (less thick than other L0s; R23 user direction):
   - **LEFT:** "Check balance" pill — `transparent bg + 1px solid rgba(255,255,255,0.20) border`, white text Rubik Regular 14/20 0.28px tracking, padding `6px 14px`, radius 100. **Note: TRANSPARENT bg, NOT white-alpha fill** (caught in R23 — solid-ish fills compete with the keypad).
   - **RIGHT cluster** (4px gap):
     - audio/voice icon button — `36×36` circle, transparent bg + 1px `rgba(255,255,255,0.30)` border, contains `valentino_audio_icon.svg` at 18×18.
     - photo avatar button — `40×40` hit area containing `36×36` photo avatar (border `1px rgba(255,255,255,0.30)`). Avatar is `/assets/avatar_only.png`.
   - App bar padding: `4px top/bottom`, `16px left/right`.
3. **Action pills row** (cal:2026-10-06, Figma Valentino ✅ `10028:9340` "Pre-scan" — the user's current design; slice-wallpaper ships the same row): directly under the app bar, a 64 band — 16 above / 12 below, 24 sides, 12 between pills, scrolls sideways with no mask. Pills left → right: `[fire] 8 fires left` · `[₹] monies` (94 fixed, the empty state) · `[UPI] <upi_id>` (rightmost, the identity anchor). Pill = 36 tall, Circle radius, padding 10/16 (fire 10/14/10/12), 16px glyph box + 4 + label; fill WHITE_10 (Figma paints a raw `#D828DC` = white ~12% over V-500 → the translucent-white rule, which also holds on the dark page); stroke 1.5px Alpha/White/a05 on every pill (Figma's fire pill has none — user, 2026-10-06: "this one doesn't have an outline"); label Caption 12/16 Regular + glyphs in Text&Icons/On color/Secondary (white-70; the glyphs are opaque masks tinted by the token). Glyphs: `public/assets/icons/pill_fire.svg`, `pill_monies.svg`, `pill_upi.svg` (exported from 10028:9340).
4. **Hero amount** (centered, `flex: 1`):
   - `₹<formatted>` Display Large — Rubik Regular **80/96** with **-0.8px letter-spacing**, white. White-space: nowrap.
   - **Dynamic shrink** as digits grow (font-size by digit count): ≤3 → 80, 4 → 72, 5 → 64, 6 → 56, ≥7 → 48. Transitions over 220ms `cubic-bezier(0.25,0.1,0.25,1)`.
   - **No UPI chip under the amount** (user, 2026-10-06: "we have removed this and added the action pills up top"). It was the R18 placement; R19 already moved it into the pill row, the proto now matches.
5. **Bottom section** (anchored, `gap:16` between rows, `padding-bottom: 8`):
   - **Keypad** — 4 rows × 3 cols. Rows: `[1,2,3] / [4,5,6] / [7,8,9] / [•, 0, backspace]`. Each KEY is `48×48` transparent. Digits Rubik Medium **20/24** 0.4px tracking white. **72px column gap, 8px row gap.** Keys centered. Backspace = left-chevron (24×24 stroke 2 white). `.` rendered as `•`. Tap feedback via `.slice-keypad-key:active { background: rgba(255,255,255,0.08); }`.
   - **Request | Transfer button row** — BELOW the keypad. Both buttons share row equally (`flex: 1` each), 16px gap, horizontal padding 24, white-20 bg, no border, 12px vertical / 24px horizontal padding, radius 100, Rubik Medium 16/24 0.32px tracking, white.
6. **Bottom nav** — rendered by `App.jsx` (floating, transparent bg, page bg cascades through).
7. **Page body padding:** `paddingBottom: 140` to clear the floating bottom nav.

### Indian-comma + cap rule

- `formatINR(str)` formats integer portion with Indian-style grouping: last 3 digits, then `,` every 2 digits going left → `1,00,000` not `100,000`.
- Decimal portion stays unformatted: `1,00,000.50`.
- **Max amount cap: `₹50,00,000` (50L).** Tapping more digits is a no-op past the cap.
- **Max length: 7 digits in integer portion.**
- Backspace at length-1 returns to `0` (not empty string — prevents the ₹ from sitting alone).
- `.` only allowed once (no `1.2.3`).
- Leading `0` is replaced by first non-zero key (so `0` → tap `5` → `5`, not `05`).

### Why these specs (R23 calibration)

- **52px app bar (not 64):** user direction in R23 — Valentino home app bar is visually lighter than other L0s; less chrome to compete with the brand-immersive hero. Other L0s keep their 64px standard app bar.
- **TRANSPARENT bg on "Check balance" pill (not white-10):** solid-ish fills on the V-500 page bg compete with the keypad numerals (white) and Request/Transfer pills (white-20). Pure outline + transparent fill reads as the lightest possible affordance.
- **72px keypad column gap:** wider than a standard system keypad. The V-500 hero amount sits ABOVE the keypad — generous breathing room between keys prevents misfires AND keeps the visual weight at the top (the amount, not the input).
- **Request and Transfer below the keypad (NOT side-anchored).** Earlier proto drafts placed them as floating side actions; the canonical 885:19901 frame anchors them below. Caught in R23.
- **Dynamic font shrink (80 → 48):** prevents the amount from overflowing the phone width as digits grow. Smooth tween, never a hard jump.

Source: cal:2026-05-29 R23 proto rewrite — canonical frame `885:19901` in `PNUz3Dr9KSlFJSnsXsC0nL`. Proto: `slice/projects/slice-app-proto/src/pods/payments/L0_valentinoHome.jsx`.

---

### Legacy specs (pre-R23, kept for context — superseded by CANONICAL above)

**Page bg:** Full-bleed Valentino-500 fill (`#D30AD7`), edge-to-edge, status bar text white. Light mode only. WHY: brand-immersion establishes "you are in the payments moment" — the surface itself is the affordance.

### App bar (y=0–108)
- **No standard App bar component.** The chrome is brand-immersive.
- **Top-left:** "Check balance" pill — transparent fill + chevron-down + white-subtle outline + white text, Radius Circle, padding 10/16
- **Top-right:** voice/audio icon (white, in circle outline) + photo Avatar trailing (user identity, same Avatar that appears in trailing slot across all other L0s)

### Action Pills row (NEW R19, y=108–172)
64px tall band, 16px vertical padding, pills 36px tall. See "Action Pills — anatomy + behavior" below for full spec.

**Default state (app open, pre-BE response):** NO action pills row visible.

**Return state (post-BE response):** ONE pill centred — `[UPI logo] anushamahesh21@slc` (195×36).

**Expanded states (after delay or campaign-trigger event):** horizontally-scrolling row of 1–3 pills with 8–12px inter-pill gap. Left-aligned starting at x=24, OR centred when only one pill fits. Row can clip the right edge — pills overflow under the trailing Avatar, no fade mask observed.

**Pill order (left → right):** marketing pill → product pills (Fire, Monies) → UPI ID pill (always rightmost — identity anchor).

### Centred hero stack (y=172+)
- Massive `₹0` Display/Large in white. **₹ matches digit weight — NEVER subscript.** See "Amount entry rule" further below.
- **"Enter amount to transfer" caption** — appears between Display and keypad ONLY when action pills are present AND keypad is awaiting input (nudge state). Removes when user starts typing.

### Custom slice keypad (centred lower-half)
- 3-column grid: 1-2-3 / 4-5-6 / 7-8-9 / . / 0 / ‹backspace
- **White numerals, borderless** (no stroke, no card outline — key tap target is implicit)
- Generous tap targets (~56×56)

WHY custom keypad here (but not in PIN entry): the dialer surface IS the input — a system keyboard rising up would break the brand-immersive surface and cover the hero amount. PIN entry is a downstream Standard chrome surface where the system keyboard belongs.

### Request / Transfer Tertiary pill buttons
- Bottom-anchored side-by-side, 12px gap
- Transparent fill + white-subtle outline + white text
- Both dim to ~30% opacity during the scrim/expansion-plus-dismiss state when `₹0` is unentered. Restore to full opacity once the action pill row settles.

### Floating bottom dock
- Central **QR-scan icon prominent** — large white circle + V-500 glyph as the pod's signature action
- 5 icons visible centered on QR-scan
- Active state = white circle + V-500 glyph; inactive = semi-transparent slate fill + slate glyph
- Content scrolls UNDER the dock (no bar, floating)

### What Payments L0 doesn't do
- ❌ **Brand-gradient "Pay anyone" banner as hero.** L0 is solid V-500 fill, NOT a gradient. The Valentino → Blue gradient is reserved for non-Payments brand moments.
- ❌ **App bar Standard + form rows + QUICK PAY circles.** That's the downstream Pay flow (L1/L2), not L0.
- ❌ **List or Bold section header on the surface.** L0s use the surface itself as structure — no intermediate headers.
- ❌ **Leading icon on App bar L0.** No hamburger, no slice logo, no back chevron — Payments doesn't even have an App bar; it has brand-immersive chrome.

Source: `reference_anti_patterns.md` "Brand-gradient 'Pay anyone' banner", "List or Bold section header between L0 cards", "Leading icon on App bar L0", `SKILL.md` "Absolute bans" line 151.

### Dark mode
**Brand-immersive surface FLATTENS to pure black.** Page bg = `#000000` (true black, OLED-friendly — not slate-950, not a darker purple). White text + outline-subtle pills (transparent fill + white-subtle outline) + V-500 only on the active dock-icon glyph + link text.

WHY: when a surface is brand-immersive (full-bleed brand colour) in light mode, dark mode renders it as pure black with the brand colour reduced to text + active glyph accents only. The brand fill does NOT carry into dark mode. The full V-500 fill at night would burn eyes; the pure-black floor lets the V-500 accents read as brand without overwhelming.

**Scope clarification:** this rule applies ONLY to full-bleed brand surfaces (Payments L0). Smaller brand-tinted callouts (Spark Offer pill, in-card V-50 callout rows) render in dark mode as **deep V-700/950 fill**, NOT pure black. A callout's job is to read as a brand moment within surrounding chrome — flattening would lose the signal.

Source: cal:2026-05-28 R18 + R19 — Payments L0 light (885:19901) vs dark (1967:18266); AVC Spark Offer pill light (2410:40749) vs dark (2410:125949).

---

## Action Pills — anatomy + behavior

**Source frames:** Valentino file `J8xKGFeQ5JoDJZdaUXiLPz` node `8772:12216`. Calibrated R19 (2026-05-28).

A distinct pill family used ONLY on the Payments L0 brand-immersive surface. Not segmented control (see `reference_dls_pills.md` for that — those are filter pills, different role).

### Anatomy

| Property | Value |
|---|---|
| Width — long | 195 × 36 |
| Width — extra-long | 214 × 36 (for "New spark live", longer UPI IDs) |
| Width — compact | 94 × 36 (for `monies` empty state) |
| Radius | Circle (18 / fully-pill) |
| Fill — default | translucent-white ~10–14% on V-500 |
| Fill — emphasis | SAME as default — emphasis is motion, not fill: a one-time rim arc sweep (`EmphasisPill`, see rules) (cal:2026-10-07, supersedes ~22% fill) |
| Stroke | 1.5px white-05 on every pill (cal:2026-10-06) |
| Backdrop | Figma background blur 300 = CSS `backdrop-filter: blur(150px)`, past which it stops changing (Figma's radius is 2× CSS; cal:2026-10-07); the page is the backdrop root so it never samples the bezel |
| Padding | 16px left, 16px right, 10px top/bottom |
| Internal gap | 4px between logo/glyph and text |
| Logo zone | 31×16 for UPI wordmark, 16×16 for icon glyphs |
| Text | Rubik 12/16, primary white on every pill (cal:2026-10-07); glyphs white-70 |

### Pill catalogue

- `[UPI logo] <upi_id>` — **identity anchor**, always present. Truncates to icon-only when >14 chars; tap opens My QR directly
- `[₹ glyph] monies` (compact 94×36) when monies balance is 0 — empty state
- `[₹ glyph] 3,224 monies` (long 195×36) when monies balance exists — ticker-animates as value grows
- `[fire icon] 8 fires left` — Spark fires balance
- `[bolt icon] New spark live` — marketing pill (yellow bolt accent — the only marketing-pill icon with a brand-coloured fill vs the otherwise-white pill content)

### Interaction rules

- **UPI ID pill is the identity anchor.** Survives dismiss. Product/marketing pills can dismiss; UPI cannot. When all secondary pills dismiss, UPI re-expands to full 195 width and centres in the row (DEFAULT state).
- **Sequential tickers, never parallel.** When monies value increases significantly (thousands → 10,000), the monies pill expands slightly to fit new digit count. Two simultaneous tickers (fire + monies) run sequentially — second ticker waits for first to complete. WHY: parallel value changes are visually noisy; the eye gets pulled between competing motions.
- **Marketing pill emphasis = `EmphasisPill` (proto `src/components/EmphasisPill.jsx`).** Max 1 emphasized pill at a time. It is styled exactly like the others (same fill, outline, text); once it has landed, a soft white arc sweeps its rim once (2.6s ease-in-out, peak ~55% white) and fades, leaving a normal pill. Arrives with an ease-in-out slide from the left (no spring) — or, on the first open, moves in with the row's entrance and sweeps after it lands. Use it for every nudge (birthday gift, new spark live, offers) so they read the same as in the app. WHY: one pill "more important right now"; motion draws the eye once without permanently out-shouting the row. (cal:2026-10-07, from the birthday-spark gift pill) While a full-screen moment plays (the birthday balloons), `emphasize={false}` holds the sweep; it runs `arcDelay` (default 0.55s) after it's let go, so the emphasis comes once the moment has left the screen (cal:2026-10-07).
- **First-open entrance.** Once per app open, after the splash lifts: the row's pills start as a tight centred stack (12px steps) and open to their places in ONE ease-in-out move (0.7s, `[0.65,0,0.35,1]`), fading in over the first half. No middle keyframe. (Valentino `11762:11598` — the three frames illustrate it, cal:2026-10-07)
- **On tap of campaign/marketing pill.** Page dims to scrim, bottom sheet rises with copy + "Got it" Primary CTA. Cashback / FYI rewards = bottom-sheet pattern. Fire / monies = redirect with page transition.

### What action pills don't do

- ❌ **Solid white or V-500 fill.** Solid fills compete with the keypad numerals (white) and the Request/Transfer Tertiary pills (transparent-white-outline). Solid V-500 fill is invisible against V-500 page bg. Use translucent-white only.
- ❌ **Two emphasized marketing pills at once.** Priority dilution — see emphasis rule above.
- ❌ **Removing the UPI ID pill.** Without it, the user loses the "this is your account" signal during the payment-entry moment.
- ❌ **Two simultaneous tickers.** Tickers run sequentially.

Source: `reference_anti_patterns.md` R19 batch.

### Campaign pill reveal motion (9-step choreography)

Source frames: Payment OS `xIc12scqCFBSJ5Kgyd6Krh` frames `168:32546` (light) + `168:35440` (dark). 9 designer-labeled states.

How the "Win up to ₹100" / marketing pill enters the Payments L0 screen post-BE response:

1. **Opening state** (no BE response yet): numpad + ₹0 + scanner FAB, no Action Pills row visible
2. **Return state** (post-BE response): UPI ID pill appears centred in the Action Pills row
3. **Transition state 1:** tiny inline ↻ refresh glyph appears centred under the amount (UPI pill briefly hidden) — `bling` (640ms `spring-soft`) + haptic
4. **Transition state 2:** "Win up to ₹100" pill begins to appear collapsed to the right of the glyph
5. **Transition state 3:** "Win up to ₹100" pill at full width, glyph leading inside the pill on left — `gentle` (320ms `out`) horizontal expand
6. **Transition state 4:** "Win up to ₹100" pill + UPI ID pill together (2 pills horizontal)
7. **Transition end state 2:** "Win up to ₹100" pill + UPI ID compressed (icon-only when char > 15)
8. **Transition end state 1:** both pills open (char ≤ 15)
9. **On tap of campaign pill:** page dims to scrim → bottom sheet rises with copy + "Got it" Primary CTA over 280ms `out`. Cashback / FYI rewards open bottom-sheet; Fire / monies redirect with page transition.

**Holding state (post-animation steady state):** Run-once gated — does NOT loop after first trigger. WHY: reinforces the no-infinite-loop rule. Attention-grab animation that loops becomes noise.

Source: cal:2026-05-28 R19, `reference_motion.md` campaign_pill_reveal.

---

## Pay person — brand-immersive (post-payee resolution)

The second brand-immersive surface in the pod. Used **only when paying a known UPI ID / saved payee** — when the recipient identity is resolved and the act of payment is the entire focus.

1. **Full-page Valentino-500 background** — V-500 fill, edge to edge, chrome too
2. **X close top-left in white** (NOT chevron — this is a payment moment, not nav)
3. **Centred:**
   - Payee name H3 white
   - UPI ID caption white-secondary
   - Massive amount `₹90` Display in white, ₹ matches digit weight
4. **"Add a note" pill bottom-anchored:** transparent-white bg, white text + note-icon leading

### What Pay person — brand-immersive doesn't do
- ❌ **Pay-to-person screen on white.** The brand-immersive V-500 fill IS the screen for known UPI ID payee. White is the unresolved-payee Pay screen (L1/L2 below).
- ❌ **Chevron back at top-left.** Confirmation / brand-immersive payment surfaces use X close, not chevron. Chevron = nav back; X = exit modal/flow.

Source: `reference_dls_screen_layouts.md` "Pay person — brand-immersive", `SKILL.md` "slice-slop test" line 167.

---

## Pay screen L1/L2 — form flow

The **downstream pay surface** — after the user has picked "Pay anyone" / unresolved payee. NOT the L0 dialer, NOT the brand-immersive Pay person. White-page form chrome.

1. **App bar Standard** chevron back + **dynamic title `Pay ₹2,000`** + trailing instrument-card icon
2. **Form rows** (no card wrappers, hairline between):
   - `From: Savings · ₹2,00,000` + slate-10 circle pill chevron-down (selectable)
   - `Mode: UPI` + chevron-down pill
   - `To: <Name, phone, UPI ID>` — input
3. **QUICK PAY** List section header (UPPERCASE Metadata weight, slate-10 bg)
4. **3-up grid of large bold COLOURED circle category icons** (~88px) — Orange / Blue / Green Avatar Bold + white line icon inside

WHY dynamic title `Pay ₹X`: the amount has been entered upstream (or is being entered now); reflecting it in the App bar gives the user a persistent confirmation of the value they're committing — important on a flow that ends in money leaving the account.

WHY this is L1/L2, not L0: this surface presents form rows + lists + section headers — a clear flow-with-data pattern. L0 surfaces don't use intermediate section headers. The Payments L0 dialer is the entry point; this is the journey.

Source: `reference_dls_screen_layouts.md` "Pay screen".

---

## Amount entry rule

Payment / transfer amount entry uses a **big centred Display number** (~64px), with the **₹ symbol at the same font size** as the main value (matched, not smaller). Caption "Enter amount" above.

**Do NOT scale the ₹ symbol down or render it as a tiny prefix** — it reads as broken alignment.

This rule applies across:
- Payments L0 (`₹0` hero in white on V-500)
- Pay person — brand-immersive (`₹90` Display in white)
- Add money / amount entry (`₹1,20,000` on white)
- Atom contribution setup (Display amount, ₹ matches digit weight)

Source: cal:2026-05-17 — pair 800 A + reason "rupee symbol not aligned properly, it should be the same size as the main value font" ✅. `reference_dls_screen_layouts.md` Amount entry.

---

## PIN entry

**slice uses the system keyboard here, NOT the custom keypad.** The custom slice keypad is for amount entry on Payments L0; PIN entry is a downstream Standard chrome surface where the system keyboard belongs.

1. **App bar Standard** chevron back, no title
2. **Top-left aligned title** (Display/Small ~48px): `Enter slice PIN`
3. **Context subtitle** (body, secondary): `Paying ₹1,000 to Aman` — always carries transaction context mid-flow, never the generic "4 digits to unlock"
4. **PIN slot row**, left-aligned, 24px gap from subtitle:
   - Slot diameter ~64×64 (first-class focus targets — larger than the M-40 size used on other circular slots)
   - 12px gap between slots
   - Idle: 2px outline-bold border, transparent bg
   - Filled: 2px V-500 border, V-500 filled dot (12×12) centred inside
   - Focused (current digit): 2px V-500 border, no inner dot yet
   - Error: 2px red-500 border
   - **Brief digit-visibility before mask** (~600ms) — intentional feedback, not a bug
5. **Text-link `Forgot PIN?`** V-500 buttonSmall (optional, left-aligned, anchors near bottom-left of content area above the keypad)
6. **System keyboard** opens from below

CVV input uses the same circular box pattern (3 boxes instead of 4).

Source: cal:2026-05-17 — pair 515, review-1105 reference frame. `reference_dls_pin_field.md`.

---

## Payment confirmation

The success state — the receipt screen at the end of every successful payment. Lives on a **full white screen** (no brand-immersion here; the celebration is the textured tick + verb-amount copy).

1. **App bar Standard** with **X close top-left** (no chevron, no title). Chevron = nav back; X = exit confirmation.
2. **Centred:**
   - **Textured grainy gradient tick** illustration (~120px green-blue noisy gradient + white check, **8px stroke** — not 6, the noisy gradient eats thinner strokes)
   - `**Paid ₹X,XXX**` H2 (verb + amount, never "Payment sent" — verb+value is the slice receipt pattern)
3. **NO body explanation paragraph** — the title is the receipt
4. **CTAs bottom-anchored:** Primary `Done` + Text `Share receipt`

### What Payment confirmation doesn't do
- ❌ **Chevron back instead of X close** on a confirmation screen — confirmations exit via X, not navigate back.
- ❌ **Avatar with `✓` glyph as the success indicator** — confirmation uses the textured grainy gradient tick (~120px), not an Avatar-with-checkmark.
- ❌ **Generic line-art illustration in confirmation state** — slice ships the real branded grainy tick. Generic placeholders are prototyping only.
- ❌ **"Confirm payment" bottom sheet pattern** — slice doesn't use bottom sheets for payment commitments. Bottom sheets carry transient single-action prompts ("Continue with Aadhaar?", "Switch account?"), not financial commitments — those are too important to be dismissable via a scrim tap.

Source: `reference_dls_screen_layouts.md` Payment confirmation, `SKILL.md` "Absolute bans" lines 145–146, `reference_anti_patterns.md` R12 batch.

---

## Transaction failed

The failure-state counterpart to Payment confirmation. Same scaffold inverted.

1. **App bar Standard** with **X close top-left** (no chevron, no title) — matches success
2. **Centred Avatar Bold red** (~120px) with white X glyph inside — mirrors the success grainy-tick architecture **but inverted: solid red, no grain, X instead of check**
3. **H2 title** `Payment of ₹X,XX,XXX failed` (verb + amount + state, parallel to `Paid ₹X,XXX` success copy)
4. **Body (secondary, optional)** — 1 line on next step
5. **Bottom-anchored CTAs:** Primary `Retry payment` + Text `Cancel`

Source: cal:2026-05-21 — r14-empty-1404. `reference_dls_screen_layouts.md` Transaction Failed. `reference_dls_illustrations.md` red_avatar_bold_x.

---

## Payment status transition envelope

Source frames: Payment OS 26 `xIc12scqCFBSJ5Kgyd6Krh` canvas `30:18423` "Txn status page". Calibrated R19 (2026-05-28).

The 3-stage envelope structure for payment-completion transitions. Branches on whether the txn unlocks a reward.

| Stage | Un-rewarded (NO_REWARDS) | Rewarded (FIRE / MONIES / SPARK+FIRE+MONIES / CASHBACK) |
|---|---|---|
| 1. Brand-immersion | (skipped) | Pink full-bleed brand background (`#E14ED7` family) — held briefly |
| 2. Reveal | (skipped) | Reward / state visual on the pink immersion (fire-mode card art, monies green-motif, cashback amount, etc.) |
| 3. Resolve | White screen + green grainy gradient tick (~120px) + `Paid ₹X` H2 | Same white-tick resolve frame as un-rewarded |

WHY pink immersion for rewarded txns: rewards are a brand moment — slice celebrates the user-unlocked event before resolving to the canonical confirmation. The pink immersion acts as a brand-celebratory beat. Un-rewarded txns skip directly to the confirmation because there's no celebration to land.

### Rewarded vs un-rewarded scenario variants (observed)
`NO_REWARDS` · `FIRE` · `FIRE+MONIES` · `FIRE+INSTANT_CASHBACK` · `POST_FIRE+CARD_CHANGE` · `MONIES` · `SPARK+FIRE+MONIES` · `SPARK+FIRE+MONIES+CASHBACK` · `NPS` · `FAILURE` · `PENDING` · `LOW_NET_LOADING` · `PRESS_FOR_CARD_OPENING`

### Motion specifics (confidence LOW-MEDIUM — durations inferred)
- **Stage 1 (brand-immersion, rewarded only):** pink full-bleed fades in. Duration likely `linger` (520ms `out`).
- **Stage 2 (reveal, rewarded only):** reward visual fades in over the pink. Stagger 80–120ms between reward-card elements (per slice stagger rule, capped at 80ms in lists — slight stretch acceptable for reward reveal).
- **Stage 3 (resolve):** white screen + green grainy gradient tick. Tick may have a one-shot `spring-soft` overshoot (typical for "tick" reveal moments). H2 `Paid ₹X` title slides up `translateY 100%→0` + opacity per slice's existing value-change rule (240ms `out`).

WHY (per-frame durations TBD): captured at canvas-level; per-frame node IDs not extracted in R19 sweep. Should be confirmed via individual frame sampling in a follow-up calibration.

Source: cal:2026-05-28 R19, `reference_motion.md` payment_status_transition.

---

## Motion choreographies in Payments

| Choreography | Use | Duration / curve | Source |
|---|---|---|---|
| **Sheet present** (campaign-pill bottom sheet, etc.) | Sheet rises on tap of campaign pill | translateY 100%→0, 280ms `out` + backdrop 0→0.3 | `reference_motion.md` Sheet present |
| **Sheet dismiss** | Scrim tap dismisses | translateY 0→100%, 240ms `out-fast` | `reference_motion.md` Sheet dismiss |
| **Value change** (amount morph) | Hero amount updates as user types | New value translateY -100%→0 + opacity 0→1, 240ms `out`; old value mirror | `reference_motion.md` Value change |
| **Campaign pill reveal** (9-step) | Marketing pill enters Action Pills row post-BE | bling 640ms `spring-soft` + horizontal `gentle` 320ms `out` + run-once gate | This file Campaign pill reveal motion |
| **Payment status transition envelope** | Payment completion → confirmation | 3-stage (brand-immersion → reveal → resolve), durations TBD | This file Payment status transition envelope |
| **Press feedback** on Tertiary pill / dock icon | Tap confirmation | Opacity 1→0.7→1, 160ms `quick` | `reference_motion.md` Press feedback |

### What we never animate in Payments
- ❌ Digit entry on the custom keypad — high-frequency interaction, no animation (per emil's frequency rule: 100+ times/day = no animation ever)
- ❌ Bottom dock between screens — anchored layer, stays put
- ❌ Bounce on tap — slice is calm fintech, not iOS-y toy
- ❌ Infinite ambient motion on action pills (campaign reveal runs ONCE, gated)
- ❌ Parallel tickers — sequential only

---

## Payments-relevant illustrations

| Illustration | Use | Size | Source |
|---|---|---|---|
| **grainy_gradient_tick_hero** | Full-screen payment-success confirmation hero | ~120px, 8px white check stroke | `reference_dls_illustrations.md` |
| **grainy_gradient_tick_status_indicator** | Top-right of payment txn-detail status header (Success state) | ~32–40px (S-32 to M-40 Avatar) | `reference_dls_illustrations.md` |
| **red_avatar_bold_x** (hero + small) | Transaction Failed confirmation hero (~120px); failure status indicator on txn detail (~32–40px) | 120px / 32–40px | `reference_dls_illustrations.md` |
| **amber_processing_ring** | Top-right of "Processing" / "Pending" txn-detail status header | ~32–40px, amber ring + white ! | `reference_dls_illustrations.md` |
| **blue_info_initiated_ring** | Top-right of "Payment initiated" txn-detail status header (NEFT awaiting beneficiary credit) | ~32–40px, blue + white info/arrow | `reference_dls_illustrations.md` |
| **fire_pink_swirl** | Rewarded success card art (Fire card variants: FIRE, FIRE + INSTANT CASHBACK) — Stage 2 of transition envelope | Full-card width, ~360×240 horiz / ~180×360 vert | `reference_dls_illustrations.md` |
| **monies_green_motif** | Monies-mode card styles on payment success — Stage 2 of transition envelope | Card-sized | `reference_dls_illustrations.md` |

---

## Calibrated history

- **R11 (cal:2026-05-17)** — Brand-immersive recipes established: Pay person brand-immersive screen, Payment confirmation grainy tick + verb-amount H2, PIN entry circular boxes + system keyboard, Amount entry ₹ matches digit weight, Pay screen L1/L2 with dynamic title + QUICK PAY grid.
- **R12 (cal:2026-05-18)** — Confirmation tick stroke thickened from 6px → 8px (noisy gradient eats thinner). "Confirm payment" bottom sheet ruled out as a pattern. Sheet handle banned.
- **R14 (cal:2026-05-21)** — Transaction Failed recipe (red Avatar Bold X + retry pattern). Failure as success-mirror architecture.
- **R18 (cal:2026-05-28)** — L0 sweep across all 6 pods. Payments L0 confirmed as full-bleed V-500 dialer (overriding any "Pay anyone banner" reading). Brand-immersive dark-mode rule: flattens to pure black. Floating dock active = white circle + V-500 glyph (inverted from fill-bg).
- **R19 (cal:2026-05-28)** — Major Payments L0 update: Action Pills row added between App bar and hero (previously placed UPI ID pill below amount — wrong). 30+ Valentino frames extracted. Action Pills anatomy + interaction rules. Campaign pill reveal motion (9-step). Payment status transition envelope (3-stage rewarded vs un-rewarded). Brand-tinted callouts scoped: only full-bleed surfaces flatten to black in dark mode; smaller callouts use deep V-700/950. Status caption colour rule (status colour, not secondary grey) carried over to Payments txn-detail surfaces.

Cross-references: `reference_calibration_log.md` for full audit trail. `reference_calibrated_digest.md` for single-page index of every calibrated rule.

---

## Flows Payments participates in

See `reference_flows.md` for full step-by-step.

- **Pay someone via UPI** — native here (Payments L0 dialer). 3 branches: QR scan / Transfer pill / Paste UPI ID. Converge to Pay person → PIN → confirmation.
- **Request money** — native here (Request Tertiary pill on Payments L0).
- **Receive money** — passive event, surfaced via snackbar / Action centre / Activity row prepend / Banking L0 balance ticker.
- **PIN entry** — appears in every money-action flow (cross-pod ubiquitous). System keyboard, not slice custom keypad.
- **Payment confirmation** — native here (3-stage transition envelope for rewarded; direct white tick for un-rewarded).
- **Transaction failed** — native here (red Avatar Bold X full-screen + Retry/Cancel).

Cross-pod handoffs:
- Payments → Activity (every payment creates an Activity row + txn detail L2)
- Banking → Payments (Add money confirm reuses Payments confirmation tick anatomy)
- Credit → Payments (Repay flow source picker is the same component)
- Any pod → Payments (bottom dock QR-scan is global)
