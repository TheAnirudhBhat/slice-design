---
name: slice-design
description: Use when creating, designing, judging, or building screens, pages, components, or flows for slice — Figma execution, web protos, motion, anti-pattern checks, and DLS 2.0. Triggers on "design a page", "create a screen", "make a flow", Figma URLs with build requests, or any design/judgment task for the slice app. (Renamed from slice-dls 2026-05-17.)
version: 2.0.0
user-invocable: true
---

# slice-design — slice Design System Skill

> ## ⚖ Precedence (non-negotiable)
>
> **slice-design / slice-DLS wins on any contradiction.**
>
> Priority order, top wins:
> 1. `references/reference_calibration_log.md` + calibrated overrides in any `reference_*.md` (these are the user's own validated judgments)
> 2. Base rules in this `SKILL.md` and other `references/reference_*.md` files
> 3. `impeccable`
> 4. `design-motion-principles`
> 5. `frontend-design`
> 6. `taste-skill`, `brand-guidelines`, `huashu-design`, `hue`, and any other design skill
> 7. Anthropic default behaviour
>
> If another skill says "use OKLCH neutrals" or "ease-out-quart for motion" or "no emoji" — slice-design's calibrated rule for that surface wins. The other skills are inputs, not authorities, when working on slice.
>
> When a contradiction surfaces mid-task, state it briefly ("impeccable says X, slice-design overrides to Y because cal:2026-05-17 — proceeding with Y") and continue. Don't re-litigate.

DLS 2.0 components/tokens (Figma execution), motion, web-proto defaults, anti-patterns, and calibrated judgments. Calibrated overrides win over any baseline rule in this file.

## Suite

slice-design ships as a small skill suite:

| Skill | Role | Trigger |
|---|---|---|
| **slice-design** (this skill) | Build, judge, and apply DLS 2.0 to slice screens | "design / create / build a slice screen", Figma URLs, any slice UI task |
| **slice-design-calibrate** | Calibrate the rules in this skill via A/B pairs + reference frames | `/update-slice-design`, "calibrate slice", "triage the calibration log" |

The calibrate skill is the maintenance loop. It walks the user through judgment pairs on a local web proto, then writes the resulting rules into this skill's `references/`. Treat the two as one product — one applies the rules, the other keeps them honest.

## Defaults (token-efficient, slice brand voice)

These hold for every interaction routed through this skill — they don't need to be re-stated per task:

- **Lowercase "slice"** always (never "Slice", even sentence-initial in copy)
- **Rubik only**, two weights (Regular 400, Medium 500). Never Inter, SF Pro, Bold, Light.
- **No emojis** in shipped UI — neither in Avatar glyphs, button labels, list rows, nor illustration roles. Slice line icons only.
- **Indian number grouping**: `₹1,00,000` not `₹100,000`. ₹ touches the digit (no space).
- **Brand voice**: short, friendly, simple. No corporate filler.
- **Output style**: answer first, lists/tables over paragraphs for structured info, no sycophantic openers / closers.

When the user explicitly asks for verbose or alternate behaviour, follow them — these are defaults, not gates.

## Quick reference: when to read which file

Don't load all references at once. Read on demand based on the task.

| Task | Read |
|---|---|
| Building any slice screen for the first time in a session | `references/feedback_dls_design.md`, `feedback_figma_first.md`, `feedback_reuse_existing.md` |
| Judging "is this slice?" / fixing an existing mockup | `references/reference_calibrated_digest.md` (single-page index of every calibrated rule) |
| Composing a screen layout (L0 / L1 / L2 / form / confirmation / empty) | `references/reference_dls_screen_layouts.md` (includes screen recipes calibrated through R11) |
| Anti-pattern check before shipping | `references/reference_anti_patterns.md` |
| Specific component spec (anatomy, sizes, states) | `references/reference_dls_<component>.md` (28 files — appbar, avatar, buttons, button_group, cards, chips, accordion, badge, bottom_nav, bottomsheet, carousel, controls, corner_radius, colors, dialer, dividers, dot_indicator, elevation, file_upload, footer_header, iconography, input_field, list_items, pills, pin_field, progress, search, section_header, slider, snackbar, spacing, tabs, tags, tooltip) |
| Specific token (color / spacing / radius / elevation) | `references/reference_dls_<topic>.md` |
| Motion / transitions / choreography | `references/reference_motion.md` |
| Starting a new slice web proto (Vite + agentation + DLS primitives) | `references/reference_web_proto.md` |
| Specific calibrated rule's history | `references/reference_calibration_log.md` (append-only audit) |
| `figma-use` Plugin API call | `figma:figma-use` SKILL.md ONLY. **Do not load figma-use's references/** |

## Sub-commands (routing)

When the user opens a task with one of these verbs (or types them into the conversation), follow the matching workflow. No verb = general design invocation = apply defaults + the right reference for the surface in focus.

| Verb | Category | What it does | Read |
|---|---|---|---|
| `build [screen]` | Build | Plan → resolve gallery IDs → 1 `use_figma` call → screenshot verify | this file + `feedback_*.md` + relevant `reference_dls_*.md` |
| `iterate [frame]` | Build | Clone existing frame, swap props for variants — never hand-build elements | `feedback_reuse_existing.md` |
| `judge [frame]` | Evaluate | "Is this slice?" review against calibrated rules + anti-patterns | `reference_calibrated_digest.md`, `reference_anti_patterns.md` |
| `audit [frame]` | Evaluate | Walk every calibrated rule against the frame, list violations | `reference_calibrated_digest.md` |
| `recipe [screen-type]` | Build | Return the calibrated recipe (L0 / balance L1 / confirm / pay / etc.) | `reference_dls_screen_layouts.md` |
| `proto [name]` | Build | Scaffold a new slice web proto with DLS primitives | `reference_web_proto.md` |
| `motion [target]` | Enhance | Apply slice motion choreography (Spark reveal, push left/right etc.) | `reference_motion.md` |
| `calibrate` | Maintain | Run the calibration loop → invokes `slice-design-calibrate` skill | (suite companion) |

If the user invokes `calibrate`, hand off to the `slice-design-calibrate` skill. Don't duplicate that flow here.

## Absolute bans (match and refuse)

If you're about to write any of these in slice UI, rewrite the element differently. These are calibrated bans — they were tested and rejected.

- **Capital-S "Slice"** — always lowercase, even sentence-initial
- **Emoji as Avatar glyph or in CTA leading-icon slot** — slice line icons only
- **Red-fill Primary button** for destructive actions — use a dialog with neutral Primary, or Tertiary with red text
- **Right-chevron `›` in non-row contexts** (column headers, rows that already have a CTA / switch). Valid: tap-the-whole-row callouts. Invalid: redundant trailing affordance.
- **Arrow + sign together on trend deltas** (`↑ +12%`). Pick one — arrow alone preferred.
- **`+` prefix on credit / received amounts** — use Positive Green colour alone, no `+`. Credits read as green; debits stay neutral.
- **Rainbow / multi-stop gradients** (>2 stops). The Payments brand gradient (Valentino → Blue) and the Rewards leaderboard gradient (Valentino-pink → coral) are the only sanctioned 2-stop gradients.
- **Fire / hot / winning state in orange or yellow** — slice fire is Valentino purple.
- **Cashback on subtle-bg** — cashback strip is always a white card (subtle-bg = banners only).
- **List section header directly after App bar** — needs a content row between.
- **In-card header with leading icon or hairline below** — cards are clean inside.
- **Centred body text on cards** — left-aligned only.
- **Page-edge full-bleed cards** — 24px page padding, always.
- **Standalone illustration in list-leading position** — use Avatar container.
- **Avatar component for quick-action icon tiles** — use white + outline-subtle circle + V-500 (action tiles) or slate (content-grid tiles) glyph.
- **Generic line-art illustration in empty / confirmation states** — slice ships real branded illustrations (asteroid + diamonds for rewards, grainy gradient tick for paid). Generic placeholders are prototyping only.
- **Avatar with `✓` glyph as confirmation indicator** — confirmation success uses the textured grainy gradient tick (~120px).
- **Week-summary hero block on Activity L0** — L0 is App bar + search + filter trailing + flat transaction list with relative-date subtitles. Week-summary is L2/L3.
- **Cancel button on a slice bottom sheet** — sheet dismisses via scrim tap. Bottom sheets carry the Primary action only.
- **Tabs as a navigation / filter pattern** — use pills.
- **Banking home as a separate L0 with quick-action grid + accounts list** — Banking home IS the Savings/Balance L1 screen.
- **Coloured-card hero on Credit L0** — Credit home is the bill summary view.
- **Brand-gradient "Pay anyone" banner as Payments L0 hero** — the live pattern is Standard app bar with dynamic amount title + form rows + QUICK PAY coloured circles.

Source for every entry: `references/reference_anti_patterns.md` + `reference_calibrated_digest.md` (calibrated through 2026-05-17 round 11).

## The slice-slop test

If someone could look at a screen and say "AI made this slice mockup" without doubt, it's failed. Specific slop signatures for slice:

- Anything from the "Absolute bans" list above
- Generic capitalised "Slice" branding
- Section-header / page-header / list-header inconsistencies (mixed Bold and List on the same screen)
- Cards that don't have shadow chrome OR don't have outline-border chrome (one of the two — slice has both variants for different contexts, but never bare)
- Quick-action tiles with V-500 fill avatars on a content-grid card (that's the action-tile pattern leaking into the content-grid pattern)
- A confirmation screen with a chevron back instead of an X close
- A payment-to-person screen on white (the brand-immersive V-500 fill IS the screen for known UPI ID payee)
- "+₹X" notation on a credit-amount row
- A search bar with the filter icon trailing on a screen that's NOT Activity L0
- An emoji in any production surface

Run this test before declaring a slice mockup done.

## Workflow

### Building new screens (`build`)
1. **PLAN** (no Figma calls) — Parse brief, pick screen type, list components + content, check `reference_calibrated_digest.md` for the screen recipe if one exists
2. **RESOLVE** (0 calls) — Look up gallery IDs from the registry below
3. **EXECUTE** (1 `use_figma` call) — Build entire screen using gallery components
4. **VERIFY** (1 `get_screenshot` call) — Confirm visual output. Run the slice-slop test.

### Iterating on existing designs (`iterate`)
1. **SCREENSHOT** — Capture the base frame, understand the layout
2. **INSPECT** — Get node tree to identify components, instances, and custom elements
3. **PLAN** — For each variation, list what changes. Map EVERY new element to a DLS component.
4. **CLONE** — Duplicate the base frame(s) into a named Section
5. **MODIFY** — For each clone, import DLS components via `importComponentSetByKeyAsync` and modify. NEVER hand-build elements.
6. **VERIFY** — Screenshot each variation. Run the slice-slop test.

### Judging an existing frame (`judge` / `audit`)
1. **SCREENSHOT** — Get the frame
2. **SCAN** — Run `reference_calibrated_digest.md` mentally against the frame
3. **REPORT** — List violations with severity (anti-pattern / calibrated rule mismatch / minor) and the rule each one breaks. Cite the reference file + section.

## Gallery (12× faster than import)

A `🗄️ Component Gallery` page (ID: `6422:340`) in the DLS working copy (`PNUz3Dr9KSlFJSnsXsC0nL`) has pre-imported DLS instances. Use `getNodeById(galleryId)` → `createInstance()` instead of `importComponentSetByKeyAsync`.

**Fallback:** If building in a DIFFERENT file (not the working copy), use `importComponentSetByKeyAsync` with the `componentKey` from the registry.

**DO NOT load `figma:figma-use` reference docs.** This skill contains everything needed. Only load `figma-use` SKILL.md for the `use_figma` tool definition, then STOP — skip all `references/` files.

## Component Registry (Unified)

Each entry: name, componentKey (for import fallback), galleryId (for fast builds), setProperties keys, findOne overrides.

### App bar/Standard
Key: `46c0d218f87eb62d656e741a8a1e78af081bf307` | Gallery: `6398:625`
setProperties: `"Show title#681:0"` BOOL, `"Show button#679:38"` BOOL, `"Show Icon 1#679:50"` BOOL, `"Show Icon 2#679:47"` BOOL, `"Scroll#679:26"` BOOL, `"Nav icon#679:29"` SWAP, `"Icon 1#679:44"` SWAP, `"Icon 2#679:41"` SWAP
Variants: `Type` = Button / Icon / Alt button
findOne: `"Title"` — text node for page title

### App bar/L0
Key: `2a9861957c79964260c045522a783ed089dc6c51` | Gallery: `6422:2212`
setProperties: `"Scroll#678:0"` BOOL, `"Icon#730:0"` SWAP, `"Hide balance feature#3621:0"` BOOL
Variants: `Pod` = Banking / Explore / Payments / Credit / Activity

### App bar/Search
Key: `6f8a1b1951df5f00615db4c137b440d3f3af965f`
setProperties: `"Scroll#679:0"` BOOL, `"Placeholder#667:0"` TEXT
Variants: `Type` = Search

### Top header
Key: `23fd66e83c5a536ea485b133bfc179b436a2386d` | Gallery: `6410:1860`
setProperties: `"Text#2090:1"` TEXT (heading), `"Show Buttons#2091:0"` BOOL, `"Show To-do#2091:3"` BOOL, `"Show heading#2136:0"` BOOL, `"Switch icon#4453:2"` BOOL
Variants: `Type` = Default / Two buttons
findOne: `"Value"` (amount, use `&& n.visible`), `"Insight text"` (subtitle), `"Button"` (CTA label), `"User action request"` (todo title), `"Subtitle giving context"` (todo subtitle)

### Section header
Key: `8cc10f494c9c0e1802fb108b048ac3c247e71470` | Gallery List: `6412:404` | Gallery Bold: `6412:406`
setProperties: `"Header text#686:338"` TEXT (for List type), `"Header#915:430"` TEXT (for Bold type), `"Collapsible#738:0"` BOOL, `"Background#5738:0"` BOOL
Variants: `Type` = Bold / List / Bold with CTA / Pay with UPI, `Page` = Onboarding / Default

### List item/Standard
Key: `11c3f7573a75ba2deb9c1f612b43e20f2fd79134` | Gallery Avatar: `6422:614` | Gallery Icon: `6422:613` | Gallery Empty: `6422:612`
setProperties: `"Title#684:317"` TEXT, `"Icon#684:293"` SWAP, `"Trailing config#3734:0"` BOOL
Variants: `Leading config` = Empty / Avatar / Icon

### List item/Transaction
Key: `89e7507ea2bb40a9099f5fc9bac48f504da645a3` | Gallery: `6414:436`
setProperties: `"Name#2696:0"` TEXT, `"Subtitle 1#796:331"` TEXT, `"Subtitle 2#796:333"` TEXT, `"Show Subtitle 2#796:332"` BOOL, `"Avatar#796:330"` BOOL
Variants: `Type` = Transaction
findOne: `"₹[Value]"` — amount text

### List item/Setup
Key: `d91b2153c5ad26c308c555e2e1ba19311be9ba8d`
setProperties: `"Text#4489:0"` TEXT, `"Subtext#4489:3"` TEXT, `"Info icon#2482:0"` BOOL
Variants: `Leading config` = Title / Title + subtitle

### List item/Selection
Key: `f2fe23fb877b6578ba082f068a0cdbc15a929ba5`
setProperties: `"Option text#2329:3"` TEXT
Variants: `Type` = Default / Disabled / Loading

### List item/Deposit
Key: `da2d78c72b5c73809cc0de2547d7ee04a59fe900`
setProperties: `"Amount#793:297"` TEXT, `"Subtitle#793:298"` TEXT, `"Subtitle 2#793:299"` TEXT, `"Show subtitle 2#793:300"` BOOL, `"Value#793:301"` TEXT, `"Rate of Interest#331:0"` TEXT
Variants: `Type` = Stages / Avatar

### Button/Default
Key: `cddad172ededefae2ad1f4e3b0a6da0fe86ca910` | Gallery: `6398:458`
setProperties: `"CTA Text#231:1"` TEXT, `"Show Trailing Icon#231:6"` BOOL, `"Show Leading Icon#231:11"` BOOL, `"Choose Trailing Icon#231:16"` SWAP, `"Choose Leading Icon#231:21"` SWAP
Variants: `Type` = Primary/Secondary/Tertiary/Text, `State` = Default/Pressed/Disabled/Loading, `Size` = Regular/Small, `Variant` = Default/Icon button
Copy rules: Verb first. 1-2 words. Sentence case. Never "Submit" or "NEXT".

### Button/OnColor
Key: `f1976be65e8d53aff19b2f0630ca964065d16896`
setProperties: `"CTA Text#231:1"` TEXT, `"Show Trailing Icon#231:6"` BOOL, `"Show Leading Icon#231:11"` BOOL
Variants: `Type` = Primary/Secondary/Tertiary/Grey, `State`, `Size`, `Variant` (same as Default)

### Button/Extended
Key: `7860af897b65f311d8ba7b10346084e67d299a46`
setProperties: `"CTA Text#343:8"` TEXT, `"Show Trailing Icon#343:9"` BOOL, `"Show Leading Icon#343:10"` BOOL
Variants: `Type` = Grey, `State`, `Size`, `Variant`

### FAB
Key: `3d75a8b2b6903b87961d3665004d1031a94fe328` | Gallery: `6421:476`
setProperties: `"Icon#640:0"` SWAP, `"Gesture nav#646:0"` BOOL
Variants: `State` = Default / Loading / Pressed / Disabled

### Button Group
Key: `32bb4d5dad9925bc3886d11f0e2403378070b3b0` | Gallery: `6422:1529`
setProperties: `"Scroll#893:330"` BOOL, `"Header#898:392"` BOOL, `"Footer#1544:3"` BOOL, `"Content#893:337"` TEXT (assistive), `"CTA Text#231:1"` TEXT (button label)
Variants: `Type` = 1 button / 2 Vertical buttons / 2 Horizontal buttons

### Divider/Default
Key: `96acaec2d155eb3fb5fddf9559244236ce147838` | Gallery Inset: `6415:421` | Gallery FullBleed: `6415:423`
Variants: `Type` = Full-bleed/Middle/Inset, `Style` = Solid/Dashed

### Divider/Big
Key: `0c44c2ed7c8fcebd19517f68d517ca89b919270f` | Gallery: `6412:400`

### Bottom nav
Key: `264778b214072f77a3d078335ec8e255985e89a9` | Gallery Banking: `6422:978`
Variants: `Pod` = Banking / Explore / Payments / Credit / Activity

### Gesture Nav
Key: `863204ce5bdaf38cc81096b427f3be6951debdba` | Gallery: `6401:399`

### Avatar
Key: `b5cdc904991c0c193718353f8bf42846414bc637` | Gallery M/Text: `6410:947`
Variants: `Size` = S-32/M-40/L-48/XL-64/XXL-80/XXXL-128, `Type` = Icon/Text/Logo/Image, `Color` = Valentino/Blue/Orange/Red/Green/Slate, `Emphasis` = Subtle/Bold

### Other components (query `search_design_system` at runtime)
- Underlined input: `4c59ebf583609934d0c4e8b437bd03425023f358` | Gallery: `6422:1800`
- OTP: `b1e5e3dc150a690d3ccbf23fd37a96363aa6ffc9`
- PIN: `9c6826bfb2ed3e1723b0c829c3e5371b27025379`
- UPI PIN: `de3cba9620ae64c6fe3d58c09642fac4f0109a6e`
- Search: `836c0f2bf06467fbaa200f068593afebad9e97ac`
- Checkbox+Radio: `937799183b6f7e163ac873b965aca63469c69a7c`
- 2 Tabs: `ce82e4ca78fb042cbbf7886dcd61ad8a7b6fb381` | Tab unit: `93ae898e98d11a49889a04f31038eb4c15102213`
- 3 Tabs: `e5dfdc0b1b14700225424d9e138cb69aa7e80775`
- Tabs Mode Bottom Bar: `d2865580d8710e43ad9d7661ce0397af3b81adab`
- Bottom sheet: `f1dcd276d4b205ca67e5197146a1cb15fbd043c7`
- Snackbar: `8d864584ebaeddc85e4e76cb03dbb7dfa0e82105`

#### Cards
- L0 card/Large: `e5e0b7865245f3b535fcb8b9582a57003df82d07` | Gallery: `6422:2321`
- L0 card/Medium: `7a9a4244b860ccc0515f79e1356fd8872c8f3df6` | Gallery: `6422:2448`
- L0 card/Small: `c7803539b4ee18360b00cae376179155bdd7d2c7`
- L0 card/CC card: `a13e149392fb52e486c6cae88f5301b26e52c872`
- L0/spark card: `8e31086a3f19302d6620b4fc0177dedce262f140`
- Explore cards: `3b9cfda0cec7da4b618c3f650b57a645149a7cdc` (Large 312×160 / Medium 148×148 / Small 148×66)
- Marketing card: `20e48675dac5273c1580bb78c5ffd69437c265b9`
- To-do card v1: `d4ed94449314848e93d2a48ff2c56fd1e3eb0cce` | Gallery: `6410:1777`
- To-do card v2: `780a640c111f4a080fefaedba7b81220214b0206`
- 3 cards carousel: `011c2b186c494e8de57b4a54161fd4faf4cdabba`
- Card cashback: `e33574038f62dc738fe282e55fb05650f2062c68`
- Card cashback (reversed): `2d165a903d60fa46ca5732146ec512cdd5bee316`
- Scratch card: `dc01290e40d14bee4ef82501b46623698d0d98f0`
- Credit card benefits: `c670e3883abdffcfa34583910aebb06f9aeb8290`
- Cards/Card: `b614d8f6998730a260321ea01f6679c4142a8a5d`
- Cards/Card delivery: `08529197a2d50f64964766225ed1ed33fa3c9abe`
- Cards/Card status: `fe60afa67a8d2ee04bdfd9bb286c8ee00c4264d9`
- Cards/Add money on card: `6375eaafb66a11646c5bba0dc75b1297f098c317`
- Cards/Book physical card: `cd2f9a21e1f7f9060e70947c8663e0237e42bbbf`

#### Misc
- Alt Button: `77a5fc597cb83273c7fd1980cbe6466957b761c7`
- Merchant/App bar: `07abb7507ebbe736414bbf330f9ca494470961f9`
- Status Bar: `e954ead13af4337a5ce0f5927a62225881e123df`
- Big Header (utility): `1abf533d4e784c7bfd70d22442b098c11aaf0759`

## Script Templates

### L1 list screen (most common)
```js
// Load gallery
const gp = figma.root.children.find(p => p.name.includes("Gallery"));
await figma.setCurrentPageAsync(gp);
const g = {
  appBar: figma.getNodeById("6398:625"), topHeader: figma.getNodeById("6410:1860"),
  shList: figma.getNodeById("6412:404"), shBold: figma.getNodeById("6412:406"),
  txn: figma.getNodeById("6414:436"), divInset: figma.getNodeById("6415:421"),
  divBig: figma.getNodeById("6412:400"), gestureNav: figma.getNodeById("6401:399"),
  fab: figma.getNodeById("6421:476"), btnGroup: figma.getNodeById("6422:1529")
};
// Switch to target
const pg = figma.root.children.find(p => p.name.includes("TARGET_PAGE"));
await figma.setCurrentPageAsync(pg);
await figma.loadFontAsync({ family: "Rubik", style: "Medium" });
await figma.loadFontAsync({ family: "Rubik", style: "Regular" });
// Screen
const sc = figma.createFrame();
sc.name = "SCREEN_NAME"; sc.resize(360, 720);
sc.layoutMode = "VERTICAL"; sc.primaryAxisAlignItems = "MIN"; sc.counterAxisAlignItems = "MIN";
sc.primaryAxisSizingMode = "AUTO"; sc.layoutSizingHorizontal = "FIXED";
sc.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
sc.cornerRadius = 16; sc.clipsContent = true; sc.itemSpacing = 0;
sc.x = 100; sc.y = 100;
// Helpers
async function setTitle(inst, text) {
  const t = inst.findOne(n => n.type === "TEXT" && n.name === "Title");
  if (t && t.fontName !== figma.mixed) { await figma.loadFontAsync(t.fontName); t.characters = text; }
}
async function addSection(title, items, headerType) {
  const db = g.divBig.createInstance(); sc.appendChild(db); db.layoutSizingHorizontal = "FILL";
  const sh = (headerType === "bold" ? g.shBold : g.shList).createInstance();
  sc.appendChild(sh); sh.layoutSizingHorizontal = "FILL";
  sh.setProperties(headerType === "bold" ? { "Header#915:430": title } : { "Header text#686:338": title });
  for (let i = 0; i < items.length; i++) {
    const it = g.txn.createInstance(); sc.appendChild(it); it.layoutSizingHorizontal = "FILL";
    it.setProperties({ "Name#2696:0": items[i].n, "Subtitle 1#796:331": items[i].s1, "Subtitle 2#796:333": items[i].s2, "Show Subtitle 2#796:332": true, "Avatar#796:330": true });
    const vn = it.findOne(n => n.type === "TEXT" && n.name === "₹[Value]");
    if (vn && vn.fontName !== figma.mixed) { await figma.loadFontAsync(vn.fontName); vn.characters = items[i].v; }
    if (i < items.length - 1) { const dv = g.divInset.createInstance(); sc.appendChild(dv); dv.layoutSizingHorizontal = "FILL"; }
  }
}
// === BUILD (replace below with actual data) ===
// App bar
const ab = g.appBar.createInstance(); sc.appendChild(ab); ab.layoutSizingHorizontal = "FILL";
ab.setProperties({ "Show title#681:0": true, "Show button#679:38": false, "Show Icon 1#679:50": false, "Show Icon 2#679:47": false });
await setTitle(ab, "PAGE_TITLE");
// Top header (optional — remove if not needed)
const th = g.topHeader.createInstance(); sc.appendChild(th); th.layoutSizingHorizontal = "FILL";
th.setProperties({ "Text#2090:1": "HEADING", "Show Buttons#2091:0": false, "Show To-do#2091:3": false, "Show heading#2136:0": true, "Switch icon#4453:2": false });
for (const t of th.findAll(n => n.type === "TEXT")) {
  if (t.fontName === figma.mixed) continue;
  await figma.loadFontAsync(t.fontName);
  if (t.name === "Value" && t.visible) t.characters = "AMOUNT";
  if (t.name === "Insight text") t.characters = "INSIGHT";
}
// Sections
await addSection("SECTION_1", [
  { n: "Item 1", s1: "Sub 1", s2: "Sub 2", v: "₹100" }
], "list");
// Footer
const gn = g.gestureNav.createInstance(); sc.appendChild(gn); gn.layoutSizingHorizontal = "FILL";
return { screenId: sc.id };
```

## Script Rules (Error Prevention)

### HARD RULES — violating these is always wrong
1. **NEVER use Inter or any non-Rubik font.** Always `await figma.loadFontAsync({ family: "Rubik", style: "Medium" })` and `"Regular"`. If you catch yourself typing `"Inter"`, STOP.
2. **NEVER hand-build a button, card, header, or any element that exists in the DLS.** Always import via `importComponentSetByKeyAsync` (for external files) or gallery `createInstance()` (for working copy). The only exception is when the user explicitly says "explore" or "go beyond the DLS".
3. **NEVER create text nodes with `figma.createText()` when a DLS component exists for that purpose.** Buttons have text built in. Section headers have text built in. Use `setProperties` or `findOne` to set text on instances.

### API quirks
4. **Use `getNodeByIdAsync`, not `getNodeById`.** The sync version fails with `documentAccess: dynamic-page` error.
5. **Solid fill colors don't take `a` (alpha).** Use `{ type: 'SOLID', color: { r, g, b } }` + `node.opacity` for transparency. Only `gradientStops` accept `a` in the color object.
6. **Check instance type before detaching.** Always: `if (node.type === 'INSTANCE') node = node.detachInstance();` — cloned instances may already be frames.
7. **Gallery IDs persist across calls. Import IDs don't.** Never store import IDs across `use_figma` calls.
8. **Never chain on appendChild.** Always: `const inst = comp.createInstance(); sc.appendChild(inst); inst.layoutSizingHorizontal = "FILL";`
9. **Font on existing text: use `t.fontName`, never `getRangeFont`.** Always check `!== figma.mixed` first.
10. **Async helpers: use `async function`, not `const fn = async () =>`.** Figma runtime rejects arrow syntax.
11. **setProperties vs findOne.** If a prop fails in setProperties, use findOne. Schemas above mark which is which.
12. **Always switch page context.** `figma.currentPage` resets every call. Switch to gallery first, then target.
13. **Always return data.** Wrap in try/catch: `catch(e) { return { error: e.message }; }`

### When modifying existing designs
14. **Import DLS components even when editing.** When adding new elements to cloned frames, ALWAYS import the DLS component — don't create `figma.createFrame()` + manual styling as a shortcut.
15. **Match the existing font.** If editing text in an existing design, load the font from `t.fontName` first. For new text nodes, always use Rubik.
16. **Invoke this skill BEFORE writing any figma_execute code.** The component keys and variant names are here — don't guess.

## Design Consistency Rules

1. **Section headers must be the same type within a screen.** Never mix List and Bold headers on the same page. Pick one and use it throughout.
2. **List headers stand alone — no Divider/Big before them.** They already have a grey background that provides visual separation. Divider/Big only pairs with Bold headers.
3. **Status colors must be consistent.** If red = "you owe", green = "you're owed", grey = "settled" — apply the same mapping to ALL items.
4. **Divider types must be consistent.** Use the same divider variant between all items of the same type.

## Screen Recipes

### l0-home (pod root)
`App bar/L0 → L0 card/Large → [16px] → L0 card/Medium → [16px] → [optional Small + Small] → Section content → Bottom nav`

### l0-explore (Explore-specific)
`App bar/L0 (Pod=Explore) → L0 card/Large or Hero → [16px] → Sectioned content (Section header List + Explore cards / List items) → Bottom nav`

### activity (search + tabs)
`App bar/L0 → Search → 2 Tabs / 3 Tabs → [Section header (List) → List item/Transaction → Divider/Inset]* → Bottom nav`

### balance-screen (L1)
`App bar/Standard → Top header → [Divider/Big → Section header → List items]* → Button group / Gesture nav`

### list-screen (L1)
`App bar/Standard → [Divider/Big → Section header → List items]* → Gesture nav`

### form-screen (L2)
`App bar/Standard → Underlined inputs (stacked) → Button group → Gesture nav`

### confirmation-screen (L2)
`App bar/Standard → Illustration → Title + Body → Button group → Gesture nav`

For full diagrams + composition rules see `references/reference_dls_screen_layouts.md`.

## Layout Rules

Width: 360px. Height: 720px base, extends with content. Corner radius: 16px. Page padding: 24px.
- L0: App bar L0 (108px) → content → Bottom nav (120px)
- L1: App bar Standard (108px) → content → Gesture nav (20px)

### Stack-gap rule
- **Inside flat list components** (App bar → Top header → Section header → List item → Divider → Footer): gap `0`. Spacing is internal to each component.
- **Between L0 cards** (Large/Medium/Small in a column): gap `16px`. Cards are NOT 0-gap.
- **Page horizontal padding**: 24px. L0 cards get this padding via the screen frame, not via card margin.

### Divider rule
- List with **avatars** → use **Inset divider** between items.
- List **without avatars** → use **Full-bleed divider** between items.
- Don't mix variants within a single list.

### Header rule
- **Bold** section header → must be preceded by **Divider/Big**.
- **List** section header → stands alone (has built-in `#F6F9FC` background, no Divider/Big before it).
- Never mix Bold and List headers on the same screen.

## Tokens

**Font:** Rubik only. Two weights only — Regular (400), Medium (500). Never Inter/SF Pro/Bold/Light.

**Type scale** (size / weight / line-height / tracking):
- H2 = 24 / Medium / 32 / 0.48
- H3 = 20 / Medium / 24 / 0.40
- H4 = 16 / Medium / 20 / 0.32
- BodyNormal = 16 / Regular / 24 / 0.32
- buttonNormal = 16 / Medium / 24 / 0.32
- buttonSmall = 14 / Medium / 20 / 0.28
- Caption = 12 / Regular / 16 / 0.24
- Metadata = 10 / Regular / 12 / 0.40 (UPPERCASE)
- Display/Small = 48 / Medium / 56 / -0.48 (hero amounts on L0/Large)

**Colors (semantic, light mode):**
- Brand: `#D30AD7` (Valentino 500). Pressed/Bold: `#A008A3` (V600). Subtle bg: `#FAE2FA` (V50).
- Text: primary `rgba(0,0,0,0.9)`, secondary `0.7`, tertiary `0.5`, disabled `0.2`.
- Text on color: primary `#FFFFFF`, secondary `rgba(255,255,255,0.7)`, tertiary `0.4`, disabled `0.3`.
- BG: primary `#FFFFFF`, secondary `#F6F9FC` (Slate 10), disabled `#EAEBED` (Slate 50), overlay `rgba(0,0,0,0.3)`.
- Outline: bold `rgba(0,0,0,0.1)`, subtle `rgba(0,0,0,0.05)`.
- Utility: positive `#00A63E`, negative `#CE1D26`, warning `#FF9A17`, info `#2B6ACF`.

**Brand gradient:** `linear-gradient(→) #D30AD7 0%, #2B6ACF 100%` (Valentino 500 → Blue 500). Used on Payments L0 surfaces.

**Spacing:** 2/4/8/12/16/24/32/40/48/64px (3XS→4XL). Page horizontal padding = L (24px). Card internal padding = L (24px).

**Corner radius:** S=8 (chips/tags), M=16 (cards/banners/sheet), L=24 (large surfaces), Circle=100 (pills/avatars). **Corner smoothing 60% default** (100% if platform supports).

**Elevation tokens:**
- Card: `0 2px 32px 0 rgba(0,0,0,0.05)` (floating cards)
- Above: `0 -6px 8px 0 rgba(0,0,0,0.05)` (fixed bottom on scroll — button group)
- Below: `0 6px 8px 0 rgba(0,0,0,0.05)` (fixed top on scroll — app bar)

### Visual rules
- **Fire-state highlights stay PURPLE (Valentino).** Never orange/yellow for hot/active/winning states. Brand purple is the slice "fire" colour.
- **Lowercase "slice"** always — never capitalize, even sentence-initial.
- **Indian number grouping**: ₹1,00,000 not ₹100,000. Currency symbol touches the number.
- **Date format**: `20 Nov '25`. Caption type style.
- **Masking**: card numbers `xx1234`, accounts last 4 digits.

## Exploration Mode

Only when user says "explore" or is iterating on custom/non-DLS elements (e.g., game cards, promotional banners). Even in exploration mode, these are NON-NEGOTIABLE:

1. **Font: Rubik only.** `{ family: "Rubik", style: "Medium" }` for headings/emphasis, `"Regular"` for body. NEVER Inter, SF Pro, or any other font.
2. **Buttons: ALWAYS DLS instances.** Even on custom cards. Import `Button/OnColor` (key `f1976be65e8d53aff19b2f0630ca964065d16896`) for buttons on colored/gradient backgrounds. Import `Button/Default` (key `cddad172ededefae2ad1f4e3b0a6da0fe86ca910`) for buttons on white backgrounds.
3. **Colors:** DLS palette. Brand=#D30AD7. Don't invent new purples — use the ones in the system.
4. **Spacing:** DLS spacing scale (2/4/8/12/16/24/32/40/48/64px).
5. **Corner radii:** 8/16/24px only.
6. **Text nodes:** If you must create a `figma.createText()` (no DLS component fits), use Rubik + DLS type scale (see Tokens).

## Recipe Learning Loop

Only for existing screens user references via URL. Ask "Save as new recipe?" if no match. Never auto-save agent-created screens.

## Writing Rules

Brand: lowercase "slice". Products: lowercase. Acronyms: uppercase. Numbers: digits, Indian grouping (₹1,00,000). Dates: 20 Nov '25. Masking: xx1234.

## File References

- **DLS 2.0 published library** (where components are imported from at runtime): `ncGqxiE6wUOqgOURwHx6Hp`
- **DLS 2.0 working copy** (gallery for fast `createInstance`): `PNUz3Dr9KSlFJSnsXsC0nL`
- **DLS 2.0 reference / spec file** (cited in token reference docs as "source"): `HBoBlZN1CrmVwO3rXeZjY0`
- Gallery page ID (in working copy): `6422:340`
- DLS library key: `lk-94a7c674d0d111141706c02f8f7c7abc550a3e87995e822010612b78359b502b89cf1c1137fda19fb2a5ec7ea66a5c603894d744c8dcb721851c7745a72f4cd7`

> File keys are recoverable any time from Figma — don't sweat key mismatches; the registry above is what matters for runtime.

## On-Demand References

Detailed component/token specs live in `references/` next to this file. Read only the file you need, don't load all 40 at once.

**Index:** `references/INDEX.md`

**Design rules** (read when working on a screen for the first time):
- `references/feedback_dls_design.md` - always use DLS tokens, never raw hex
- `references/feedback_figma_first.md` - match Figma 1:1, never improvise
- `references/feedback_reuse_existing.md` - never recreate components
- `references/feedback_design_mode.md` - "design mode" = preview route for variants
- `references/feedback_screenshot_verify.md` - screenshot after every visual change
- `references/feedback_transitions.md` - push left/right for nav, slide up/down for overlays
- `references/feedback_assets.md` - never substitute user-provided assets

**Top-level references (read these when context applies):**
- `references/reference_anti_patterns.md` — hard "don't do" list with conflict-resolution table
- `references/reference_motion.md` — named durations, easings, choreographies (Spark reveal etc.)
- `references/reference_web_proto.md` — how to start a new slice web proto (Vite + agentation + DLS primitives)
- `references/reference_calibration_log.md` — what's been learned from `/update-slice-design` runs (overrides win)

**Patterns:** `references/reference_dls_screen_layouts.md` — full L0/L1/L2/Form/Confirmation/Activity diagrams + composition rules + HTML scaffold.

**Foundation tokens:** `references/reference_dls_{colors,spacing,corner_radius,elevation,dividers,iconography}.md`

**Components (26 total):** `references/reference_dls_{appbar,buttons,button_group,bottomsheet,input_field,cards,list_items,section_header,chips,tabs,tags,controls,progress,tooltip,badge,avatar,dot_indicator,carousel,bottom_nav,accordion,dialer,file_upload,footer_header,search,slider,snackbar}.md`

When the user asks about a component or token, read the matching file. Skim INDEX.md if unsure which file applies.
