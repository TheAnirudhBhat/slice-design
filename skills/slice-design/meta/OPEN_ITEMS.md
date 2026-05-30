# slice-design — R23 open items (executable checklist)

Updated 2026-05-29 (after live user-review fix-it pass).
Items ordered by priority. STATUS legend: ☐ pending / ⚡ in-flight / ✅ done.

---

## 🔴 P0 — R23 build (canonical reconciliation) — ALL DONE

### ✅ A1. Verify Valentino home canonical from Figma — DONE
Node `885:19901`. Proto rewritten with 52px app bar, transparent Check-balance pill, Display Large hero, 4×3 keypad, Request|Transfer below keypad.

### ✅ A2. Verify Banking L0 canonical from Figma — DONE
Node `885:19757`. Amount ₹45,800, Display Small 48/56M -0.48, Savings → FD → monies order, no atom card, "Add money" no-icon pill, FD rocket + monies cluster corners.

### ✅ A3. Verify Activity L0 canonical from Figma — DONE
Node `885:20122`. Photo / monogram / icon avatar variants; right-aligned amounts (primary or positive); bottom fade restored.

### ✅ A4. Verify Explore L0 canonical from Figma — DONE
Node `885:19759`. Recharge & bills composite + 2×2 explore-card grid + stacked Credit Score / Autopay.

### ✅ A5. Extract slice DLS line icons — DONE (5 / 10)
Saved to `public/assets/icons/`: dls_eye, dls_search, dls_filter, dls_arrow_up, dls_chevron. Pending: eye-closed, plus, cross, bell — fetch on demand from `ncGqxiE6wUOqgOURwHx6Hp` when next needed.

### ✅ A6. Real illustrations — DONE (partial)
Saved: fd_card_corner.png, monies_card_corner.png, fd_mascot.png, monies_glyph.png. Atom mascot not needed (no atom card in canonical Banking L0).

---

## 🔴 P0 — R23 FIX-IT PASS (live user review) — ALL DONE

### ✅ FX1. Status bar icons white on partial Valentino overlap — DONE
`StatusBar.jsx` rewritten to use `colorForSpan` — checks element span overlap against every page; ANY overlap with `dark` variant → render `LIGHT`. Bias toward immersive visibility.

### ✅ FX2. Phone shell rock-solid centering — DONE
`App.jsx` centering refactored to `position:fixed; inset:0` + child anchored at `top:50% left:50%; translate(-50%,-50%)` sized to scaled dims + grandchild with `scale()` from `top-left`. Three layers. Survives any viewport.

### ✅ FX3. Banking + Explore + Credit page bg slate-10 — DONE
`PAGE_BG[banking/explore/credit]` = `#F6F9FC` in App.jsx. Card 0.05-alpha drop-shadows finally visible. Activity stays white (no shadow cards). Pay stays V-500.

### ✅ FX4. Activity: search/filter visible + bottom fade — DONE
Restructured to relative wrapper + scroll child + BottomFade sibling. SearchBarRow sits below AppBar with 48h pill + 48×48 filter pill (slate-10 bg + 2px outline-subtle stroke).

### ✅ FX5. Banking + Explore: bottom fade overlay — DONE
New `BottomFade.jsx` component. Wired into Banking, Explore, Activity, Credit (not Pay). Transparent → page-bg gradient over the bottom 140px above the floating dock.

### ✅ FX6. monies brand glyph render fix — DONE
Inline `MoniesMark` SVG replacing the empty/transparent PNG asset. V-500 droplet + orange dot. Sized to match Display Small amount baseline.

### ✅ FX7. Explore L0 fonts/sizes match canonical — DONE
Card titles `T.h4` 16/20M (not H3 20/24M). Bill avatars 40×40 (not 54). Bill icons 20×20 (not 24). TagInfo: 10/12 Regular UPPERCASE white-on-Blue-500 (canonical), not 14/20 Medium Blue-on-50.

### ✅ FX8. Failed/pending txn states match Figma DLS — DONE
Avatar stays the regular monogram (slate-10 bg + primary text). 16×16 status badge anchored bottom-right with 2px page-bg ring around it. Failed: red bg + white X. Pending: amber bg + white clock-tick. Subtitle text turns red/amber.

### ✅ FX9. Update slice-design skill MYSELF with R23 fix-it learnings — DONE (this entry)
Touched 4 files by hand (no subagent): `reference_proto_patterns.md` (R23 fix-it section), `reference_anti_patterns.md` (8 new entries), `reference_calibration_log.md` (R23 fix-it entry), this `OPEN_ITEMS.md`.

---

## 🟡 P1 — After P0 lands

### ☐ B1. App-bar elevation reference from slice-explore-pro-2
**Pending**: user has the canonical interaction documented in that project. Need path.

### ☐ B2. Profile V3 overlay wiring
Avatar tap on any L0 → open Profile as full-screen overlay. Built but not wired.

### ☐ B3. L1 push transitions
When tapping into a deeper screen (e.g. Add money), slide-in from right.

### ☐ B4. Action Pills row canonical icons
UPI + monies real glyphs. Pending Figma link from user.

---

## 🟢 P2 — Skill housekeeping (no proto impact)

### ☐ C1. Compression sweep phases 1-6
- Delete 8 stale files (feedback_*, calibrated_digest, INDEX) — Phase 1
- Merge god-view 3 → 1 — Phase 2
- Merge proto-patterns 2 → 1 — Phase 3
- Co-locate anti-patterns — Phase 4
- Distribute misc — Phase 5
- Pod aggregators → recipe pointers — Phase 6

### ☐ C2. R22 gap remediation (13 gaps)
### ☐ C3. Recurring eval cadence
### ☐ C4. Backfill WHY on top-20 most-cited rules
### ☐ C5. shadcn adoption pipeline
### ☐ C6. Sweep Sunrise Deposits → FD recipes
### ☐ C7. Document slice PIN vs UPI PIN branch

---

**R23 session outcome (2026-05-29)**: A1–A6 (canonical reconciliation) done. FX1–FX9 (first fix-it pass) done. FX10–FX14 (fix-it-2 retraction pass) done. 5 skill files touched by hand across both fix-it passes.

---

## 🔴 P0 — R23 FIX-IT-2 RETRACTION PASS (same-day, 2026-05-29) — ALL DONE

The first fix-it pass shipped three wrong rules. User overruled. Retracted and corrected.

### ✅ FX10. Revert page bgs to pure white — DONE
`App.jsx PAGE_BG` reverted: Banking, Explore, Credit, Activity all `#FFFFFF`. Pay stays V-500. slice has zero gray surfaces.

### ✅ FX11. Revert status bar to center-point sampling — DONE
`StatusBar.jsx` rewritten with `colorForCenter`. Each status element tracks the page under its center x. Dark over white, light over Valentino. Hard cut at the page boundary. Removed the span-overlap algorithm that flipped white-side icons to white prematurely.

### ✅ FX12. Fetch real monies icon from Figma — DONE
`get_screenshot` on node `886:24912` returned valid 21×37 RGBA PNG. Saved as `public/assets/monies_mark.png`. Banking L0 `MoniesMark` component now references the real PNG (not inline SVG approximation).

### ✅ FX13. AppBar avatar 40×40 no outline/ring — DONE
`AppBar.jsx AvatarContainer` simplified — no 48×48 outer wrapper, no `1px solid rgba(0,0,0,0.05)` border, no ring. Pure 40×40 photo with `border-radius: 9999`.

### ✅ FX14. Retract wrong rules in skill (personal, no subagent) — DONE
- SKILL.md "Page bgs" section rewritten as RETRACTION re-affirming pure white.
- Cross-cutting craft checklist rewritten with corrected rules.
- `reference_proto_patterns.md` page bg map reverted, span-overlap section replaced with center-point, inline-SVG anti-pattern inverted.
- `reference_anti_patterns.md` new "R23 fix-it-2 retractions" section.
- `reference_calibration_log.md` fix-it-2 entry.

**META rule captured**: when a craft problem surfaces, the first move is "what does canonical Figma do here?" — NOT "what's a clever workaround?". Approximations and clever algorithms are how the proto drifts off-canonical.

---

## 🔴 P0 — R23 FIX-IT-2 continuation (same day) — ALL DONE

### ✅ FX15. Keypad align with Request/Transfer width — DONE
`Keypad` row now `padding: 0 24px` + `justify-content: space-between`. Each row spans the same horizontal extent as the Request|Transfer button row.

### ✅ FX16. Nav inactive icons visible through white→Valentino drag — DONE
`isImmersive = active === 'pay'` (was `visuallyActive === 'pay'`). Variant only flips on commit. Inactive circles stay readable through the entire drag. Status bar continues to recolor in real time.

### ✅ FX17. Inactive nav icons on Valentino match ₹3K pill visual weight — DONE
`BottomNav.css` immersive variant: `--inactive-bg: rgba(255,255,255,0.22)`, `--inactive-fg: rgba(255,255,255,0.85)`. Matches the canonical screenshot.

### ✅ FX18. Explore typography rebalanced for proto viewport — DONE
Card titles `T.h3` (20/24M, was H4 16/20M). Bill avatars 48×48 (was 40). Bill icons 24×24 (was 20). Recharge & bills header H3. Proto-calibrated deviation from strict canonical — documented as such in calibration log.

### ✅ FX19. Agentation installed + wired — DONE
`package.json` → `agentation@^3.0.2`. `src/main.jsx` → `<Agentation />` sibling of `<App />` with console-logging callbacks.

---

## 🔴 P0 — R23 FIX-IT-2 CONTINUATION 2 (4 polish items + Activity nav) — ALL DONE

### ✅ FX20. Phone shell auto-fit bulletproof — DONE
`useFitScale` now uses ResizeObserver on `document.documentElement` AS WELL AS `window.resize`, with `requestAnimationFrame` debounce + inline-initial-state. Padding tightened 24→8. Phone refits at every resize regardless of trigger.

### ✅ FX21. Bottom nav inactive icons stay visible during drag (incl. Activity) — DONE
`BottomNav.css` immersive `--inactive-bg` now `rgba(0,0,0,0.22)` (was `rgba(255,255,255,0.22)`). Slate-tinted alpha on BOTH variants. Visible on white, V-500, and mid-drag half-and-half. Activity nav included — slate-on-white reads correctly there too.

### ✅ FX22. Explore bento — column heights align — DONE
`ExploreSmall` height 70→66, padding tightened. Stack of 2 + 16 gap = 148 = INVITE card height. Bento second row columns are equal height.

### ✅ FX23. AppBar transparent — DONE
`AppBar.jsx` `background: 'transparent'` (was `'#FFFFFF'`). Sticky position + scroll-elevation shadow do the visual work. Page bg cascades through the bar.

### ✅ FX24. Skill updated with R23 fix-it-2-cont rules — DONE
SKILL.md proto cross-cutting rules block updated; cross-cutting craft checklist extended with items 15–17 (transparent AppBar, bento height match, ResizeObserver fit-scale); calibration log fix-it-2-cont entry added.

### ✅ FX25. Valentino nav canonical aesthetic — DONE
Immersive `--inactive-bg: rgba(255,255,255,0.30)`, `--inactive-fg: #D30AD7` (V-500, matching page bg). ₹3K balance text already V-500. `isImmersive = active === 'pay'` (committed) so the white-alpha look only renders when the screen is fully V-500 — mid-drag stays standard slate. SKILL.md + calibration log updated with the final canonical rule.

---

## 🔴 P0 — R23 FIX-IT-2 CONTINUATION 4 (5 polish items + per-slot variant) — ALL DONE

### ✅ FX26. Card drop-shadows more visible — DONE
Banking/Explore/Credit `CARD_SHADOW = '0px 4px 24px 0px rgba(0,0,0,0.08)'`. 5% → 8% alpha, tighter 24px blur. Subtle but reads on white.

### ✅ FX27. Activity AppBar solid white — DONE
AppBar accepts `background` prop (default `'transparent'`). Activity passes `background="#FFFFFF"`.

### ✅ FX28. More activity list items — DONE
TXNS extended from 10 → 20. Mix of sent/received/failed/pending across a month of dates.

### ✅ FX29. SLOT_WIDTH 85 → 83 — DONE
ROW_WIDTH = 415 in 425 viewport with 5px gutters. CONTAINER_CENTER pinned to viewport center 212.5.

### ✅ FX30. Per-slot nav variant — DONE
Each Slot uses `useMotionValueEvent` on `navX` + `pagerX` to determine which page is under its center, writes `data-slot-variant="immersive"|"standard"` to its DOM ref. CSS keys off the attribute. Mid-drag the row is heterogeneous (V-500-half slots immersive, white-half slots standard). Continuous, never invisible. Skill updated with the per-slot pattern as the canonical decomposition.

---

## 🔴 P0 — R23 FIX-IT-2 CONTINUATION 5 (4 polish items + skill) — ALL DONE

### ✅ FX31. Standard nav slot bg more visible on white — DONE
`[data-slot-variant='standard']` bg `0.06 → 0.10` alpha. fg `0.45 → 0.55`. Balance text `0.55 → 0.65`. Slate medallions now clearly visible on white pods.

### ✅ FX32. Keypad +8px padding each side — DONE
Keypad rows `padding: 0 32px` (was `0 24px`). Tightens digit cluster.

### ✅ FX33. Phone shell centering — grid place-items center — DONE
`App.jsx` outer wrapper: `position: fixed; inset: 0; display: grid; place-items: center`. Middle div sized to scaled dims. Inner does `transform: scale(...)` from top-left. Simpler and more reliable than the previous absolute+translate dance.

### ✅ FX34. SLOT_WIDTH 83 → 81 — DONE
ROW_WIDTH = 405 in 425 viewport with 10px gutter each side. Tighter icon clustering.

### ✅ FX35. Skill updated with all FX31–34 + meta-learning — DONE
SKILL.md cross-cutting checklist extended to item 20 (grid centering). reference_calibration_log appended with fix-it-2-cont-5 entry. Meta rule captured: "when user re-asks the same question, they mean DO MORE of the same direction".

---

## 🔴 P0 — R23 FIX-IT-2 CONTINUATION 6 (Valentino app bar + slice icons + native-size phone) — ALL DONE

### ✅ FX36. Valentino app bar canonical from Figma — DONE
`pods/payments/L0_valentinoHome.jsx` AppBar restructured to match canonical Figma node 885:19901. Row padding 8/20/8/16. "Check balance" pill 8/16 padding + 1px white-20 border. Audio + avatar both 48 hit-area wrapping 40 inner with 1px white-30 border. 20×20 audio glyph inside.

### ✅ FX37. Slice DLS eye icons from Figma — DONE
Fetched canonical via get_screenshot on nodes 586:138 (open) and 586:132 (closed). Saved to `public/assets/icons/slice_eye_{open,closed}.png`. `AppBar.jsx` EyeOpenGlyph + EyeClosedGlyph now render the real PNG, not inline SVG.

### ✅ FX38. Phone shell native-size + center — DONE
Removed `useFitScale` entirely. Phone renders at native 440×952. Outer wrapper `position: fixed; inset: 0; display: grid; place-items: center` keeps it centered regardless of browser size. Smaller browser → symmetric clipping via `overflow: hidden`. Per user direction: "size should not change, but should center out".

**Confirmed already-done**: standard nav slot bg = `rgba(0,0,0,0.10)` (matches user's "deselected state on white should be 000000 10% opacity" — set in cont-5).

---

## 🔴 P0 — R23 FIX-IT-2 CONTINUATION 7 (BottomNav rewrite + 3 polish items) — ALL DONE

### ✅ FX39. SLOT_WIDTH → flex+gap rewrite — DONE
Replaced uniform SLOT_WIDTH grid with `display: flex; gap: 20px`. Each item natural circle diameter (44/64/72). Edge-to-edge gap = constant 20px. Symmetric spacing regardless of which item is active.

### ✅ FX40. BHIM UPI logo from Figma — DONE
Fetched canonical PNG via get_screenshot on Figma node `886:28338` (30×12 RGBA). Saved to `public/assets/bhim_upi.png`. Valentino UPI ID pill now renders the real BHIM logo, not inline SVG.

### ✅ FX41. Responsive scaling + grid centering restored — DONE
Restored `useFitScale` (removed in cont-6). Phone scales down when browser is smaller than 440×952, native size otherwise. Always centered via `display: grid; place-items: center`.

### ✅ FX42. Agentation verified — DONE
`agentation@3.0.2` installed and wired in `main.jsx` as `<Agentation />` sibling of `<App />` with console-logging callbacks. Per the package README, toolbar appears bottom-right; popup z-index is 100001 (above the phone shell).

### ✅ FX43. New polish — symmetric edge-to-edge nav spacing — DONE (part of FX39 rewrite)
User: "the space between 2 deselected bottom nav tabs seems more than the space between the center selected one and the ones besides it". Math fix: uniform SLOT_WIDTH can never give symmetric edge-to-edge gaps with different circle sizes. flex+gap solves it directly — the `gap` IS the edge-to-edge distance and is uniform by definition.

---

## 🔴 P0 — R23 FIX-IT-2 CONTINUATION 8 (centering + GAP 24 + comprehensive skill update) — ALL DONE

### ✅ FX44. Phone shell horizontally centered — DONE
Switched outer wrapper from `display: grid; place-items: center` to explicit flex (`display: flex; flex-direction: column; justify-content: center; align-items: center`). Both axes explicit; inner gets `flexShrink: 0`.

### ✅ FX45. Bottom nav GAP 20 → 24 — DONE
Matches canonical Banking dock spacing.

### ✅ FX46. Comprehensive skill update — DONE (the big one)
NEW reference file `reference_proto_systematics.md` distills all 7 fix-it rounds into 16 permanent rules + a pre-build checklist + post-build verification list + component contracts. SKILL.md updated with top-of-file pointer to the new systematics file. calibration_log appended with cont-8 entry summarizing the meta. From now on: future proto builds read systematics FIRST and ship in one round, not seven.

---

## 🔴 P0 — R23 FIX-IT-2 CONTINUATION 9–10 (App responsive + keypad 36 + agentation revert) — ALL DONE

### ✅ FX47. App container width responsive + 2-div scaffold — DONE
Restructured App.jsx: outer `position: fixed; inset: 0; width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center` (truly width-responsive container). Inner = phone chassis at native 440×952 with `transform: scale(fitScale); transform-origin: center center`. Cleaner than the prior 3-div scaffold.

### ✅ FX48. Keypad margin 32 → 36 — DONE
24 page gutter + 12 extra per user direction.

### ✅ FX49. Agentation rendered as direct sibling — DONE
Removed the pointer-events:none wrapper. Agentation's own UI z-indexes (99994-100020) naturally stack above App. Confirmed working — user is now sending feedback THROUGH agentation.
