---
name: DLS 2.0 Figma build reference
description: Component Registry (keys + galleryIds + setProperties), script templates, hard rules for figma_execute, layout/tokens cheatsheet, screen recipes. Load ONLY when building or modifying in Figma — not needed for judging or applying calibrated rules.
type: reference
---

**Load this only when you're about to call `use_figma` to build or modify a slice screen.** For judging / auditing / applying calibrated rules without writing to Figma, the main SKILL.md + the calibrated_digest are enough.

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
