---
name: DLS 2.0 Error states
description: 4-variant error system (Offline / API failure L1 / API failure L0 / Maintenance) + cross-frame error patterns. The single consolidated reference for error UI in slice. Pairs with screen_layouts.md (Transaction Failed, Validation Error) and snackbar.md (transient error toasts).
type: reference
---
Figma source: `PNUz3Dr9KSlFJSnsXsC0nL` page `Error` (node `861:12802`), R20 sweep 2026-05-28.

Slice's canonical error system has **4 full-screen variants** + several inline / row-level error treatments. The 4 full-screen variants share a structural skeleton; the differences are in chrome (what stays around the centred stack) and CTA presence (when the user can recover).

## The 4 full-screen variants

| Variant | Frame (Light) | Frame (Dark) | Chrome | Mascot | CTA |
|---|---|---|---|---|---|
| Offline / Network missing | `861:14626` | `2467:81940` | None — full takeover, no app bar, no nav | Broken-wifi mascot on cloud | **None** — auto-recovers on reconnect |
| API failure (L1 / inside screen) | `861:14635` | `2467:81941` | App bar Standard with **chevron-back leading only** | Lollipop-wave friendly mascot | `Reload` Primary with leading refresh-circle icon |
| API failure (L0 / pod home) | `861:14647` | `2467:81942` | App bar L0 + photo Avatar trailing + floating bottom dock | Same lollipop-wave friendly mascot | `Reload` Primary + dock-switch available |
| Maintenance in progress | `1941:3944` | `2467:81943` | App bar L0 + photo Avatar trailing + floating bottom dock | Broom-and-leaves mascot | **None** — user waits or switches pods |

## Shared skeleton (the invariant)

Every full-screen error/empty state in slice is a **vertically centred 3-element stack**:

1. **Illustration** — ~140-160px branded mascot
2. **H2 title** — noun-led (state name) or emotion-led (slice voice)
3. **Body caption secondary** — explanation + optional next-step copy

Chrome around this stack varies. CTA below the stack varies. The stack itself does not.

WHY: slice treats full-screen states as a hero composition, not a card. Consistent vertical centring + same illustration scale across all error/empty states means the user recognises the state class instantly — "this screen is telling me something."

## Variant 1: Offline / Network missing

**Trigger**: device has no internet (system-level, not API-level). Applies anywhere in the app.

**Chrome**: status bar only (9:41 + signal/wifi/battery glyphs). NO app bar, NO floating dock — pure takeover.

**Stack**:
- **Illustration**: pink mascot holding a device with broken-wifi waves above; sits on a small light-blue/lavender cloud base (~140-160px)
- **Title**: `Network missing` (H2 Rubik Medium ~20-22pt) — noun-led
- **Body**: caption secondary, 3 lines: `You're not connected to the internet, try reconnecting to WiFi or connect to mobile data`

**CTA**: **none**. No Retry button. No close button. App auto-resumes when connectivity returns.

WHY no retry: slice auto-retries in background; showing a Retry button puts work on the user that the system handles itself. The dev note on the canonical frame reads: "This is the default behaviour for network missing scenario."

## Variant 2: API failure (L1 — inside screen)

**Trigger**: a single API call fails on an L1+ page accessed via push navigation.

**Chrome**: **App bar Standard — chevron-back leading only**, no title, no trailing. The chevron back IS the recovery for users who want to leave the broken screen.

**Stack**:
- **Illustration**: pink slice mascot, waving / holding a lollipop — different mascot from Offline. Friendly, neutral pose, NOT distressed (~140-160px)
- **Title**: `Something weird happened` (H2) — emotion-led, slice voice
- **Body**: caption secondary, 2 lines: `Looks like it needs a little push. Reload to try again`

**CTA**: single Primary `Reload` with leading **refresh-circle icon** (R20 exception to the R15 no-leading-icon rule — see below).

WHY: API failure ≠ system failure ≠ money failure. The friendly mascot + V-500 Primary keeps the slice tone — "small hiccup, push to recover." Red would over-dramatise.

## Variant 3: API failure (L0 — pod home)

**Trigger**: an API call fails on a pod L0 (Banking, Explore, Credit, Activity).

**Chrome**: **App bar L0 — pod title leading (`Banking` etc.) + eye-icon (hide/show balance) + photo Avatar trailing. + floating bottom dock preserved.** All 3-5 dock icons visible, just darker/less prominent.

**Stack**: identical content to Variant 2 (Same lollipop-wave mascot, same `Something weird happened` title, same body).

**CTA**: Primary `Reload` (same as Variant 2). Plus the floating dock is available — **pod-switching is a valid alternative recovery path**.

WHY L0 keeps dock: the dock IS the affordance map. If the user can switch to another pod (Explore, Activity, etc.), that's a recovery. Removing the dock would trap them on the broken L0.

## Variant 4: Maintenance in progress (scheduled)

**Trigger**: scheduled / planned maintenance window — known degradation.

**Chrome**: App bar L0 + photo Avatar trailing + floating dock (same as Variant 3).

**Stack**:
- **Illustration**: pink mascot holding a broom with leaves swirling and a small cloud (~140-160px). "Sweeping things back into shape" metaphor — clearly distinct from the lollipop-wave mascot
- **Title**: `Maintenance in progress` (H2) — noun-led
- **Body**: caption secondary, 2 lines: `Some services may not be available till 4PM today.` — **time-bound expectation** is the slice voice tell

**CTA**: **none**. No Reload, no Notify me, no Help. User waits or moves to another pod via the dock.

WHY no CTA: Maintenance isn't user-recoverable. Showing a button trains learned helplessness. Concrete time (`till 4PM today`) is the contract — vague time ("later", "soon") is anti-pattern.

**Note on the time placeholder**: "till 4PM today" is the canonical reference copy with a placeholder time. Product teams swap in the actual end-time. Don't ship the literal `till 4PM today` string.

## Cross-frame invariants (the R20 rules)

These hold across all 4 variants and several adjacent error contexts.

### 1. error_state_skeleton — 3-element vertical centred stack
Illustration ~140-160px + H2 title + body caption secondary. Vertically centred. Chrome and CTA vary; the stack doesn't. Also true for Empty Activity / Empty Action Centre / Empty Search Results (matches across 7 surfaces total).

### 2. chrome_signals_recoverability
The chrome around the centred stack IS the recovery affordance map:
- **No chrome** (no app bar, no dock) → Offline. Recovery = wait for network. No CTA needed.
- **App bar Standard chevron only** → L1 API failure. Recovery = `Reload` OR back-out via chevron.
- **App bar L0 + floating dock** → L0 API failure or Maintenance. Recovery = `Reload` (API) OR switch pods via dock (Maintenance — no Reload).

WHY: the chrome already provides exit affordances. **You never need a "Go home" or "Switch pod" CTA inside the centred stack** — the chrome IS that affordance.

### 3. no_red_on_system_errors
System-level errors (offline / API / maintenance) **never use red**. No red icon, no red border, no red caption, no red CTA. Primary CTA is V-500 Valentino magenta — the regular brand colour.

**Cross-context contrast**:
- **System failure** (offline / API / maintenance) → friendly mascot + V-500 Primary, NO red
- **Money failure** (Transaction Failed, Validation Error, Card blocked, txn detail Failed status) → red Avatar Bold / red border / red caption / Negative Red banner

Rule: **money-failure = red. system-failure = mascot.** Red is reserved for moments where the user's money is at stake.

WHY: spiking the user's stress with danger colour over a feed-load error would be wrong. Conversely, a stiff "API request returned 500" tone on a failed ₹50,000 transfer would under-acknowledge the moment.

### 4. mascot_carries_the_emotion
Each error category gets its **own dedicated branded mascot illustration**:
- **Offline** → mascot with broken-wifi glyph held up, sitting on/in a cloud → "you fell off the connection"
- **API failure** (L1 + L0, same mascot) → friendly waving lollipop mascot → "small hiccup"
- **Maintenance** → mascot with broom + swirling leaves → "work in progress"
- **Transaction Failed** → red Avatar Bold X (not a mascot — the exception, because it's a money-failure receipt)
- **Connection Lost** (older variant, semi-superseded by Offline) → sad mascot

WHY: a user who has seen the app once recognises the maintenance mascot before reading "Maintenance in progress". The illustration is the primary signal; the title is the secondary signal. Generic line-art / undraw-style illustrations are anti-pattern — they don't carry slice-specific metaphor.

### 5. reload_cta_signals_user_actionable
A `Reload` Primary CTA appears **iff the user can meaningfully fix the state by triggering a retry**:
- API failure L1 → Reload (retry succeeds)
- API failure L0 → Reload (retry succeeds)
- Offline → NO Reload (user can't fix their network from inside the app)
- Maintenance → NO Reload (waiting it out is the only option)

WHY: this is the deeper version of the "Connection Lost has no retry" rule. The principle generalises: never show a CTA pressing it won't change anything. Slice prefers honesty (no button) over learned-helplessness button-spam.

### 6. reload_primary_carries_leading_refresh_icon (R15 exception)
**The R15 anti-pattern "no leading icon on Primary CTA" has a third exception**: the **Reload Primary in API failure states** carries a leading refresh-circle icon. Visible in `861:14635` (L1 API failure) + `861:14647` (L0 API failure) across Light + Dark = 4 instances.

R15 exception list (now 3):
1. Icon-only FAB-style buttons (no label)
2. Tertiary "Share receipt" / "Download" etc.
3. **Reload Primary in API failure states** (NEW R20)

WHY: refresh-circle is a system action, not a money action. The icon disambiguates "this button triggers a retry, not a forward step" from regular flow CTAs.

### 7. copy_voice_separates_system_from_money_errors
**System errors** use the brand-voice slice register (warm, mascot energy):
- `Something weird happened. Looks like it needs a little push. Reload to try again.`
- `Network missing. You're not connected to the internet, try reconnecting to WiFi or connect to mobile data.`
- `Maintenance in progress. Some services may not be available till 4PM today.`

**Money-failure errors** use the literal financial-receipt register:
- `Payment of ₹10,000 failed. Refund will be processed within 4-5 days. Please reach out to us if not reflected.`

Pattern: system errors get emotional / friendly copy. Money errors get factual + amount + next-step (refund window) copy.

WHY: slice respects that a payment failure is a **legal/financial moment**, not a brand-voice moment. A "weird happened" tone on a ₹50,000 failed transfer would be deeply wrong.

## Anti-patterns (R20 additions)

### ❌ Red colour on system-level errors
Offline, API failure, maintenance — none use red. Red is reserved for money / validation failures.

### ❌ Generic / undraw-style illustrations on error screens
Slice uses three named branded mascots (broken-wifi, lollipop-wave, broom-and-leaves) — plus the red Avatar Bold X for money failure. Don't substitute generic art.

### ❌ Reload CTA on Offline or Maintenance
Not user-recoverable. Showing a button trains learned helplessness.

### ❌ "Try again later" vague copy on Maintenance
Slice ships concrete time windows (`till 4PM today`). Vague time is anti-pattern.

### ❌ Stripping the floating dock on L0 errors
The dock stays so the user can switch pods. Removing it traps the user.

### ❌ Mascot + avatar paired on same error screen
Pick one leading visual (avatar OR illustration OR neither). Same rule as bottom sheets.

## Inline / row-level error states (cross-references — not duplicated here)

| Error type | Treatment | Reference file |
|---|---|---|
| Form input validation | 2px red-500 border + red caption + red label (no helper text until error) | `reference_dls_screen_layouts.md` Validation Error + `reference_dls_input_field.md` |
| PIN / OTP error | 2px red-500 border on the PIN field | `reference_dls_pin_field.md` |
| Transaction Failed (full-screen) | App bar X close + red Avatar Bold X (~120px) + `Payment of ₹X failed` H2 + Retry/Cancel CTAs | `reference_dls_screen_layouts.md` Transaction Failed |
| Txn detail header — Failed state | Red Avatar Bold X (~40px) + red-600 caption beneath title | `reference_dls_screen_layouts.md` Transaction detail L2 Failed state |
| Negative Red Snackbar | Bottom-anchored toast, red bg, white text, optional action | `reference_dls_snackbar.md` |
| Negative Red Subtle Banner (User Action Request) | Inline pill banner, red-50 bg, red Bold Avatar, red caption | `reference_dls_user_action_banners.md` |

## Reverifications (R20 against existing skill)

### Update: Connection Lost recipe
Existing `reference_dls_screen_layouts.md` Connection Lost recipe (cal:2026-05-21 r14-empty-1403) describes what the DLS canonical file labels as **Offline / Network missing** at `861:14626`. The canonical illustration is the **broken-wifi mascot on a cloud**, not a generic "sad mascot."
- **Action**: update the screen_layouts recipe to use the canonical name "Offline / Network missing" and the broken-wifi mascot anatomy. The structural rule (no CTA, full takeover) holds.

### Update: R15 anti-pattern (no leading icon on Primary)
Add the third exception: **Reload Primary in API failure states** carries a leading refresh-circle icon. Canonical in 4 frames.

### Update: screen_layouts Error states section
Expand or split the single "Connection Lost" recipe into the 4-variant system. This file is now the consolidated home; the screen_layouts file should reference it.

## Source

cal:2026-05-28 R20 — DLS file `PNUz3Dr9KSlFJSnsXsC0nL` page Error `861:12802`. 4 canonical variants × 2 modes = 8 frames + dev notes per variant. All cross-frame patterns observed across multiple frames per the conservative bar.
