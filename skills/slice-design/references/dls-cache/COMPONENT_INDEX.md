# DLS 2.0 — Master Component Index

> **fileKey:** `ncGqxiE6wUOqgOURwHx6Hp` (DLS 2.0 published library) · **calibrated 2026-05-30**
> **Total: 380 top-level components** — 115 component sets + 265 standalone components.
> Source: 4 raw pages in `raw/components_offset_{0,100,200,300}.json`.

## Tier model (read this first)

This index is **Tier 1**. It records *every* component's existence plus its `nodeId` and `key`, for all 380. It does **not** carry full specs.

- **Tier 1 — this index.** Existence + `nodeId` + `key` (+ variant list for sets) for all 380 components. Grep here first.
- **Tier 2 — full spec, already cached.** The common, high-traffic components have full specs written into the skill's `reference_dls_*.md` files: app bar, buttons, cards, list items, inputs, status, tags, sheets, nav, PDP. If a component is one of these, read the matching `reference_dls_*.md` instead of refetching.
- **Tier 3 — fetch-on-miss.** For anything not in Tier 2, take the `nodeId`/`key` from this index, fetch the spec from Figma (`get_design_context` / `figma_get_node` + screenshot), then **write the spec back** into a Tier 2 reference file so the next lookup is a cache hit.

**Row format:** `- **<name>** — \`<type>\` — node \`<nodeId>\` — key \`<key>\`` and, for sets, `— variants: …`.
Mega-sets (Avatar 288, Default/button 52, OnColor 64, Extended 16) have their variant arrays summarized in the raw JSON to stay legible; their full variant lists were captured live and can be re-pulled on demand.

---

## Screen templates & FTUX

- **Core PDP** — `COMPONENT_SET` — node `2061:86829` — key `5bb74204b1f838878013959098725a7fcd5d7bf7` — variants: Type=Default, Type=Big title
- **Feature PDP** — `COMPONENT` — node `2063:87946` — key `7926628c6c7ea2b17bec18932f16684fd6749968`
- **Header** — `COMPONENT_SET` — node `893:38265` — key `299d0635e3036288eb6f19654cc2b5ec36a463a3` — variants: Type=T&C, Type=Trust builder, Type=Placeholder, Type=T&C w checkbox
- **Primary heading** — `COMPONENT_SET` — node `2329:180092` — key `f89fa257ad009ec9c4ec74b29327867387679657` — variants: Page=Onboarding, Page=Default
- **<Utility> Big header** — `COMPONENT` — node `4907:598` — key `1abf533d4e784c7bfd70d22442b098c11aaf0759`
- **<Utility> Small header** — `COMPONENT_SET` — node `5389:919` — key `654c6ca1404d8eba8a262c4cd443e0e5e6e2f20e` — variants: Color=Blue, Color=Green, Color=Yellow, Color=Red, Color=Valentino
- **<Utility>Flow header** — `COMPONENT` — node `2467:82477` — key `bf3db6d1412fc1c4e19c3c026e8572aa8e5ad2c1`
- **Empty** — `COMPONENT_SET` — node `2855:3899` — key `33fdb3934ba35e9c12bc0df7bce0285a2c78cb0f` — variants: Type=Section, Type=Page
- **Empty** (alt) — `COMPONENT` — node `995:9831` — key `f0fdbd8933cf9b0f1b66bb48d0a666eae6beb8c7`
- **Error** — `COMPONENT_SET` — node `861:14625` — key `993f9c4e908bba263b0ff6a65d7ace26d5709a54` — variants: Type=API failure, Type=Maintainence in progress, Type=No network, Type=L0 error
- **Maintenance** — `COMPONENT` — node `1941:3832` — key `b99eda9f2a3d23e1ec36091fd02a2e845e83a919`
- **Full page loader** — `COMPONENT` — node `932:73872` — key `e771dc0390f8c1125ead2f070470f8a8988a6aa3`
- **Partial loading** — `COMPONENT_SET` — node `840:44816` — key `fad24cb91ff0a9fe4c4e5290ae21f8cd7005dda7` — variants: Scroll=False, Scroll=True
- **Shimmer** — `COMPONENT_SET` — node `2073:18608` — key `8dbaad7339b84af7a50b458a3ac5154f88cc1069` — variants: Type=Header centre, Type=Small block, Type=List, Type=Block, Type=Explore, Type=Header, Type=Long list

## App chrome & navigation

- **App bar/L0** — `COMPONENT_SET` — node `678:454` — key `2a9861957c79964260c045522a783ed089dc6c51` — variants: Pod=Payments, Pod=Credit, Pod=Explore, Pod=Activity, Pod=Banking
- **App bar/Search** — `COMPONENT_SET` — node `678:732` — key `6f8a1b1951df5f00615db4c137b440d3f3af965f` — variants: Type=Search
- **App bar/Standard** — `COMPONENT_SET` — node `679:2330` — key `46c0d218f87eb62d656e741a8a1e78af081bf307` — variants: Type=Alt button, Type=Button, Type=Icon
- **Merchant/App bar** — `COMPONENT` — node `3719:27888` — key `07abb7507ebbe736414bbf330f9ca494470961f9`
- **Status Bar** — `COMPONENT` — node `277:18480` — key `e954ead13af4337a5ce0f5927a62225881e123df`
- **Gesture Nav** — `COMPONENT` — node `233:41123` — key `863204ce5bdaf38cc81096b427f3be6951debdba`
- **Nav bar** — `COMPONENT` — node `3692:10856` — key `a054f0d53899c59373939652c97be69099211504`
- **Bottom nav** — `COMPONENT_SET` — node `451:1116` — key `264778b214072f77a3d078335ec8e255985e89a9` — variants: Pod=Payments, Pod=Activity, Pod=Banking, Pod=Credit, Pod=Explore
- **Merchant/Bottom nav** — `COMPONENT_SET` — node `3719:28439` — key `3f2d0e0a1a11e33f683d0ebffaa07ec58a064226` — variants: Pod=Rewards, Pod=Account, Pod=Home, Pod=Loan
- **Tabs Mode Bottom** — `COMPONENT_SET` — node `276:12086` — key `5d22cb86c96990daa5a35c08ae15ce47e11b3739` — variants: Dark=Off, Dark=On
- **Tabs Mode Bottom Bar** — `COMPONENT_SET` — node `276:12098` — key `d2865580d8710e43ad9d7661ce0397af3b81adab` — variants: Dark=Off, Dark=On
- **Tabs Mode Compact** — `COMPONENT_SET` — node `276:12077` — key `b68c00ffdd0455a9815e42fd2840f6ccbcd91674` — variants: Dark=On, Dark=Off
- **Tabs Mode Top Search Bar** — `COMPONENT_SET` — node `276:12093` — key `bcafa03977c25ea953f53c86e128303137d8c9c9` — variants: Dark=On, Dark=Off
- **Top header** — `COMPONENT_SET` — node `2090:10090` — key `23fd66e83c5a536ea485b133bfc179b436a2386d` — variants: Type=Two buttons, Type=Default
- **Top nudge** — `COMPONENT_SET` — node `796:27486` — key `01df9e1dc4b4e509d746aa638b560ff7c5633b60` — variants: Type=Brand Subtle, Type=Error, Type=Brand Bold, Type=Warning, Type=Subtle
- **Toolbar** — `COMPONENT` — node `276:12112` — key `d994de9b4f16a95d24ad448c9708bfe88ddd4a68`
- **URL Scroll** — `COMPONENT_SET` — node `276:12103` — key `def0b34fc302dd37b05e5dc9ecda450ffc2d3917` — variants: Dark=Off, Dark=On

## Buttons

- **Default** (primary button set) — `COMPONENT_SET` — node `231:31270` — key `cddad172ededefae2ad1f4e3b0a6da0fe86ca910` — variants: 52 (Type Primary/Secondary/Tertiary/Text × State × Size × Default/Icon button); key variant Type=Primary,State=Default,Size=Regular,Variant=Default key `5f76536000a6c22ef7cdcc161c3dfccd9c2aacd8` node `236:43859`
- **OnColor** — `COMPONENT_SET` — node `232:33805` — key `f1976be65e8d53aff19b2f0630ca964065d16896` — variants: 64 (Type Primary/Secondary/Tertiary/Grey × State × Size × Default/Icon button); key variant Type=Primary,State=Default,Size=Regular,Variant=Default key `5571009cf2b17c2e7136d8524302b8616301ddb9` node `455:5361`
- **Extended** — `COMPONENT_SET` — node `343:16573` — key `7860af897b65f311d8ba7b10346084e67d299a46` — variants: 16 (grey extended; State × Size × Default/Icon button); Default-Regular-Default key `db8d2283e33b75df257df3ca48c0edb8ba23433c` node `231:31363`
- **FAB** — `COMPONENT_SET` — node `640:2036` — key `3d75a8b2b6903b87961d3665004d1031a94fe328` — variants: State=Pressed, State=Disabled, State=Default, State=Loading
- **Button** — `COMPONENT` — node `276:12118` — key `a2498a9603280ccb29f636807873cb924c14c3ce`
- **Button group** — `COMPONENT_SET` — node `232:35139` — key `32bb4d5dad9925bc3886d11f0e2403378070b3b0` — variants: Type=2 Horizontal buttons, Type=1 button, Type=2 Vertical buttons, Type=Checkout
- **Alt Button** — `COMPONENT` — node `4443:58196` — key `77a5fc597cb83273c7fd1980cbe6466957b761c7`
- **Chip** — `COMPONENT_SET` — node `758:39885` — key `4bf69fe225a17856556fdf6874473ad64f408699` — variants: Type=Selected/Disabled, Type=Unselected/Disabled, Type=Unselected/Enabled, Type=Selected/Enabled

## Cards

- **L0 card/CC Card** — `COMPONENT` — node `2497:7257` — key `a13e149392fb52e486c6cae88f5301b26e52c872`
- **L0 card/Large** — `COMPONENT_SET` — node `866:8117` — key `e5e0b7865245f3b535fcb8b9582a57003df82d07` — variants: Type=Default/Insight=One, Type=Repayment/Insight=Two, Type=Repayment/Insight=One, Type=Default/Insight=Two
- **L0 card/Medium** — `COMPONENT_SET` — node `882:760` — key `7a9a4244b860ccc0515f79e1356fd8872c8f3df6` — variants: Type=Zero state, Type=With grey CTA, Type=Active state, Type=monies, Type=Marketing Card, Type=With smaller CTA
- **L0 card/Small** — `COMPONENT_SET` — node `885:17575` — key `c7803539b4ee18360b00cae376179155bdd7d2c7` — variants: Type=Default
- **L0/spark card** — `COMPONENT` — node `6144:19692` — key `8e31086a3f19302d6620b4fc0177dedce262f140`
- **L0** (pod surface set) — `COMPONENT_SET` — node `885:19758` — key `0016c9db7218759fd6decca6c53f9cfb6cb7cbd8` — variants: Pod=Explore, Pod=Activity, Pod=Banking, Pod=Credit, Pod=Profile, Pod=Payments
- **L1** — `COMPONENT_SET` — node `2327:21757` — key `9bc89e8c15ad8fafc5361c2f770bf93e577e8068` — variants: Type=Savings, Type=CC, Type=Fixed deposit
- **Explore cards** — `COMPONENT_SET` — node `887:31003` — key `3b9cfda0cec7da4b618c3f650b57a645149a7cdc` — variants: Size=Large/Error, Size=Large/Default, Size=Small/Error, Size=Small/Default, Size=Medium/Error, Size=Medium/Default
- **Marketing card** — `COMPONENT` — node `625:5158` — key `20e48675dac5273c1580bb78c5ffd69437c265b9`
- **To-do card v1** — `COMPONENT_SET` — node `833:31052` — key `d4ed94449314848e93d2a48ff2c56fd1e3eb0cce` — variants: Type=Brand bold, Type=Negative, Type=Positive, Type=Warning, Type=Neutral, Type=Info
- **To-do card v2** — `COMPONENT` — node `625:5250` — key `780a640c111f4a080fefaedba7b81220214b0206`
- **Info box** — `COMPONENT` — node `3671:16661` — key `ad2a8a1fd774a41e2542e1912644deddf0ed6476`
- **3 cards carousel** — `COMPONENT` — node `833:31143` — key `011c2b186c494e8de57b4a54161fd4faf4cdabba`
- **Accordion** — `COMPONENT_SET` — node `1272:17393` — key `1a21047406eabe22f4c2a7ad7ab3144bf1c67500` — variants: Type=Collapsed, Type=Expanded

## List items

- **List item/Control** — `COMPONENT_SET` — node `7489:18663` — key `fade3824c6ed0bacea3f6f1e6b9874420b4986c8` — variants: Leading config=Icon, =Avatar, =Empty
- **List item/Deposit** — `COMPONENT_SET` — node `793:24207` — key `da2d78c72b5c73809cc0de2547d7ee04a59fe900` — variants: Type=Avatar, Type=Stages
- **List item/Selection** — `COMPONENT_SET` — node `2329:166297` — key `f2fe23fb877b6578ba082f068a0cdbc15a929ba5` — variants: Type=Default, Type=Disabled, Type=Loading
- **List item/Setup** — `COMPONENT_SET` — node `796:24539` — key `d91b2153c5ad26c308c555e2e1ba19311be9ba8d` — variants: Leading config=Title, =Title + subtitle
- **List item/Standard** — `COMPONENT_SET` — node `684:4477` — key `11c3f7573a75ba2deb9c1f612b43e20f2fd79134` — variants: Leading config=Empty, =Avatar, =Icon
- **List item/Transaction** — `COMPONENT_SET` — node `796:27448` — key `89e7507ea2bb40a9099f5fc9bac48f504da645a3` — variants: Type=Transaction
- **Trailing config-Control** — `COMPONENT_SET` — node `7489:23396` — key `26bfb410e86618bd1479ae07c1df58b7935796e3` — variants: Type=Switch, Type=Checkbox + Radio
- **Trailing config-Setup** — `COMPONENT_SET` — node `796:24578` — key `ace5f53f4bc4aaab68f59ad3d6786b1f6cf096fa` — variants: Type=Checkbox + Radio, =Text, =Text + Subtitle, =Amount, =Text button, =Icon, =Bold text, =Switch, =None
- **Trailing config-Standard** — `COMPONENT_SET` — node `684:4807` — key `7ae63de077ce3d87ef3cd3350ca1012aa4aa3c72` — variants: Type=Icon, =None, =Badge, =Value, =Text + Subtitle, =Button, =Tag
- **Default list** — `COMPONENT` — node `2091:3597` — key `4f917ad947b4ee83b3c00ebb1e32143333f8fad8`
- **Other list** — `COMPONENT` — node `2091:3611` — key `826c28399db072aa837bcc66d742de47d01ec20c`

## Inputs & controls

- **Underlined input field** — `COMPONENT_SET` — node `687:7108` — key `4c59ebf583609934d0c4e8b437bd03425023f358` — variants: 20 (State Empty/Typing/Focused/Filled/Disabled × Type Default/Help text/Error/Success)
- **Base/Regular** (input base) — `COMPONENT_SET` — node `791:24068` — key `851ee431557c99f6369cac1cc09465e16d4ea1b8` — variants: State Default/Focused/Activated/Masked/Focussed masked/Positive/Error/Masked Error/Disabled
- **Base/Small** (input base) — `COMPONENT_SET` — node `2859:6254` — key `579c2053078ad7954d81ad212b79c7067afd1095` — variants: State Default/Focused/Activated/Masked/Focussed masked/Positive/Error/Masked Error/Disabled
- **OTP** — `COMPONENT_SET` — node `791:24031` — key `b1e5e3dc150a690d3ccbf23fd37a96363aa6ffc9` — variants: 12 (State Default/Active/Focused/Filled/Error/Disabled × Type 4 digit/6 digit)
- **PIN** — `COMPONENT_SET` — node `1974:18395` — key `9c6826bfb2ed3e1723b0c829c3e5371b27025379` — variants: 12 (State Default/Active/Focused/Filled/Error/Disabled × Type 4 digit/6 digit)
- **UPI PIN** — `COMPONENT` — node `5565:1665` — key `de3cba9620ae64c6fe3d58c09642fac4f0109a6e`
- **Search** — `COMPONENT_SET` — node `678:611` — key `836c0f2bf06467fbaa200f068593afebad9e97ac` — variants: Type=Typing, Type=Filled, Type=Focused, Type=Default
- **Search Bar** — `COMPONENT` — node `276:12108` — key `7631cc5304143d2595d5a9f915f8edb38f5b04cb`
- **Switch** — `COMPONENT_SET` — node `686:5401` — key `c7003a0228ba18fe023661bf1d2b94950c380ce2` — variants: Toggle=On/Disable=False, Toggle=Off/Disable=True, Toggle=On/Disable=True, Toggle=Off/Disable=False
- **Checkbox + Radio** — `COMPONENT_SET` — node `686:5355` — key `937799183b6f7e163ac873b965aca63469c69a7c` — variants: 14 (Checked/Unchecked/Indeterminate/Checkmark/Checkmark empty/Radio empty/Radio selected × Disable True/False)
- **Slider** — `COMPONENT_SET` — node `1955:16555` — key `462302bfa4682fa3af353ec08e6ad4785ec8d9ad` — variants: Progress=Mid, Progress=Max, Progress=Min
- **Upload** — `COMPONENT_SET` — node `727:1529` — key `734f009ea57466cb774f2e840672ee26f097025f` — variants: State=PDF, State=Image, State=Loading, State=Default
- **Notes** — `COMPONENT` — node `911:58375` — key `50c552e0691a2d570e60aba399cf2f2dd66a2aef`
- **Wheel-Time** — `COMPONENT_SET` — node `276:12037` — key `12a619b8e678825974290508d27e4406abc70772` — variants: Dark=Off, Dark=On
- **Date picker** — `COMPONENT_SET` — node `276:11928` — key `9231251be4b99d979b7e4083199894e373706d65` — variants: Dark=On, Dark=Off
- **Keyboard/Default** — `COMPONENT_SET` — node `276:11524` — key `1616f2076cebb08be410234ea0a6de5a7338eb33` — variants: Type=Numpad/Dark=Off, Type=Keyboard/Dark=Off, Type=Keyboard/Dark=On, Type=Numpad/Dark=On
- **Numpad** — `COMPONENT` — node `886:27886` — key `24112295e9550488af01234776ac19cc72c662bf`
- **Calculator** — `COMPONENT` — node `2855:3248` — key `8669841ab3883d9e296acc93481644d9eec05289`

## Status & transaction

- **Transaction status - Big** — `COMPONENT_SET` — node `7821:3065` — key `908bea50937733ced80748ddfc41953695119829` — variants: state=Success, state=Pending, state=Loading, state=Failure
- **Transaction status - Small** — `COMPONENT_SET` — node `7821:3955` — key `6a1900e0ca20463c4936ca4a7d095033e8250dde` — variants: Status=Reversed, Refunded, Failed, Expired, Requested, Pending, Success, Rejected
- **Initial** — `COMPONENT_SET` — node `894:39715` — key `111a8977c6e9a6495831d5aaf4403cb81c57c9ab` — variants: Status=Failed, Success, In progress, Loading
- **Intermediate** — `COMPONENT_SET` — node `898:49124` — key `5936989345dafd3f07ebc288355a84c6885d36e7` — variants: Status=Success, Pending, Failure
- **Progress** — `COMPONENT_SET` — node `774:5462` — key `27f78e12a7383b1c7e45fd740b2b0fbe971854d7` — variants: Range=Start, Range=Full, Range=Half
- **Details** (txn status detail) — `COMPONENT_SET` — node `905:51988` — key `c53c3ef814be33f8cb2e26b559fafd46e3573556` — variants: Status=Success, Initiated, Pending, Failed
- **Status/Add** — `COMPONENT` — node `594:538` — key `f20eef1a185050c409988d49fe6f8420cb1294a6`
- **Status/Ban** — `COMPONENT` — node `594:531` — key `12e032bbfead6fef4319f05dc02d5f346168dc13`
- **Status/Disclaimer** — `COMPONENT` — node `594:542` — key `b465d5805d3ccd8bbf96ba82d6a29a5828f7eeb8`
- **Status/Error outline** — `COMPONENT` — node `594:536` — key `4f980c8d01bf1849155b8136f52e5ea048cb9f16`
- **Status/Info** — `COMPONENT` — node `594:533` — key `d4a34d620030226b8a7df7c767cbc2da785b7990`
- **Status/Primary** — `COMPONENT` — node `594:535` — key `5e03dfba34967c935498a1ccd3a9b0bec53ef10b`
- **Status/Remove** — `COMPONENT` — node `594:539` — key `1560355eeb678ccd2b5c15372fb20f2e71f63231`
- **Status/Source** — `COMPONENT` — node `594:537` — key `cdf8cf51969cc47c6e7821c71c2facbf6a8f8a53`
- **Status/Tick** — `COMPONENT_SET` — node `2327:116275` — key `a238805bfc762522b84c7dbe500c7b6dfb24d00c` — variants: Stroke=Regular, Stroke=Thin
- **Status/Tick pending** — `COMPONENT` — node `594:541` — key `1ec975a09e868336cb8babf506bdb02fe5814340`
- **Status/Tick-rounded** — `COMPONENT_SET` — node `2078:36908` — key `54c5b72d0e1a9e2145ab2de65a3ebe94dcf3c11b` — variants: Type=Outline, Type=Filled
- **Status/Upload circle** — `COMPONENT` — node `594:534` — key `91eaf4e98c7f1c7221d8de5f7dcc3b5bef270cef`
- **Status/Verified** — `COMPONENT` — node `594:540` — key `4ba7223ccee2b327a3a86491e808848d447d6371`

## Overlays & feedback

- **Bottom sheet** — `COMPONENT_SET` — node `2001:41881` — key `f1dcd276d4b205ca67e5197146a1cb15fbd043c7` — variants: Type=Payment, Action, Action + Illustration, Slot w header, Slot w/o header, Multiple actions
- **Snackbar** — `COMPONENT_SET` — node `670:240` — key `8d864584ebaeddc85e4e76cb03dbb7dfa0e82105` — variants: Type=Negative, Type=Default
- **Tooltip** — `COMPONENT_SET` — node `352:162` — key `e0cb26dbd91f543bcd8f07f606eb0c77603fe092` — variants: Orientation=Top right, Bottom left, Bottom right, Top, Bottom, Top left
- **Tag** — `COMPONENT_SET` — node `416:1142` — key `3459a52f1cf064639f613b572c7d2306b1abb4c1` — variants: 12 (Intent Negative/Neutral/Info/Positive/Brand/Warning × Emphasis Subtle/Bold)
- **Tag_v2** — `COMPONENT_SET` — node `8026:424` — key `def7e7ea01d3a218ac71bfe10634c0f2b34f0521` — variants: 12 (Intent Negative/Warning/Info/Positive/Brand/Neutral × Emphasis Subtle/Bold)
- **Badge** — `COMPONENT_SET` — node `450:158` — key `9164af3c8be7a7f201c90dd1a362bdb7fd7d73d2` — variants: Type=Count, Type=Dot Medium, Type=Dot Small
- **Section header** — `COMPONENT_SET` — node `686:5876` — key `8cc10f494c9c0e1802fb108b048ac3c247e71470` — variants: 8 (Type Pay with UPI/Bold/List/Bold with CTA × Page Default/Onboarding)
- **Tab** — `COMPONENT_SET` — node `756:39747` — key `93ae898e98d11a49889a04f31038eb4c15102213` — variants: Type=Unselected, Type=Selected
- **2 Tabs** — `COMPONENT_SET` — node `486:2788` — key `ce82e4ca78fb042cbbf7886dcd61ad8a7b6fb381` — variants: Selected=Tab 1, Selected=Tab 2
- **3 Tabs** — `COMPONENT_SET` — node `486:2792` — key `e5dfdc0b1b14700225424d9e138cb69aa7e80775` — variants: Selected=Tab 1, Tab 3, Tab 2
- **Divider/Default** — `COMPONENT_SET` — node `566:1995` — key `96acaec2d155eb3fb5fddf9559244236ce147838` — variants: 6 (Type Middle/Full-bleed/Inset × Style Dashed/Solid)
- **Divider/Big** — `COMPONENT` — node `815:16696` — key `0c44c2ed7c8fcebd19517f68d517ca89b919270f`
- **Dot Indicator** — `COMPONENT_SET` — node `2061:86618` — key `e513ea94b4aa07fc3c02ced5579873f14c19cb1e` — variants: 6 (Active 1st/2nd/3rd × Type Circle/Pill)
- **Table** — `COMPONENT` — node `2467:92535` — key `ded9583f89678b1aac9eed62ae99c12540dcb18f`

## Footers

- **Footer** — `COMPONENT_SET` — node `893:33090` — key `8864f3277c0db8e680ffababb85b4d36d99715bf` — variants: 11 (Logo=UPI ATM, Placeholder, RuPay on CC, RuPay on CC onColor, IMPS, Billpay, UPI ATM on color, RTGS, BHIM UPI, Autopay, UPI)
- **UPI footer** — `COMPONENT_SET` — node `893:33128` — key `b76ae6ea186b704f63064f67dd0e61b6a4f00a6a` — variants: Surface=on color, Surface=Default

## Avatar & overlays-base

- **Avatar** — `COMPONENT_SET` — node `247:2500` — key `b5cdc904991c0c193718353f8bf42846414bc637` — variants: 288 (Size S-32/M-40/L-48/XL-64/XXL-80/XXXL-128 × Type Image/Logo/Text/Icon × Color Orange/Slate/Blue/Green/Red/Valentino × Emphasis Subtle/Bold); sample Size=M-40,Type=Logo,Color=Valentino,Emphasis=Bold key `12dfee463c48ec4493595bb64a7760e06218349c` node `448:224`

## Iconography (standalone glyphs)

### General/*
- **General/Action_centre** — `COMPONENT` — node `594:364` — key `15dbe43b9d434f5dadacf5e30c3b09729f056135`
- **General/Cloud** — `COMPONENT` — node `582:2184` — key `c40c19364bef891a9e7079f04df8f491214c077d`
- **General/Copy** — `COMPONENT` — node `586:128` — key `ca9df31db18780946bee14da1d8e9e5fa900a59c`
- **General/Data** — `COMPONENT` — node `594:362` — key `fb20a46efa6bc8c9eef441c0240145cffc65c3fb`
- **General/Data internet** — `COMPONENT` — node `594:363` — key `bdb98f36e83c789c5e977eb52ce339b0eb022f10`
- **General/Delete** — `COMPONENT` — node `582:2233` — key `a798844b9f150d6435ada9ff04e67da3f01cf3ef`
- **General/Download** — `COMPONENT` — node `3560:1654` — key `366380d2eec6da1b542183f875a93ded7dc24499`
- **General/Edit text** — `COMPONENT` — node `586:129` — key `e2598df7afadde40ad819203857c68b91afa166d`
- **General/Eye** — `COMPONENT_SET` — node `586:133` — key `01bb680d56f5082352ab8f97d8e403e77192bf25` — variants: Type=Open, Type=Closed
- **General/Face id** — `COMPONENT` — node `582:1933` — key `a7fd1af58dbccfe338533c333d877013d3528234`
- **General/Finger id** — `COMPONENT` — node `582:1883` — key `1a9e1cf51545109481444d2e27a495126470fab5`
- **General/Gallery** — `COMPONENT` — node `586:131` — key `912661d6404c48c1700fe1b554150228e950e86f`
- **General/Globe** — `COMPONENT_SET` — node `3531:1572` — key `6aa44376dfb2591a9f799c0e44bf4c3b673fc104` — variants: Type=Line, Type=Filled
- **General/Link attach** — `COMPONENT` — node `586:130` — key `70885eca3bbe3307942fa7b1c6d0cbef709581f5`
- **General/Location GPS** — `COMPONENT` — node `586:97` — key `5b61dcf60f7d94bf417345e5c1ef2d44107f9e6a`
- **General/Logout** — `COMPONENT` — node `582:2186` — key `76ab1de8fd909f56dc16848b8ffeda9a6f10c0f3`
- **General/Microphone** — `COMPONENT_SET` — node `594:347` — key `4add4dc98114ada906c795a6788fc4ad0b76fee0` — variants: Type=Default, Type=Mute
- **General/Music** — `COMPONENT` — node `586:96` — key `e1d33a3e2774016c2ee6ca71b03e1cefca165046`
- **General/Online transaction** — `COMPONENT` — node `594:365` — key `208dfc0134b4efc04ee3ab02406722e2a0e2ead8`
- **General/personal heart** — `COMPONENT` — node `6064:29010` — key `77c8b7b440b84da71419ce3ed1b2c80d3cf30563`
- **General/Phone** — `COMPONENT_SET` — node `586:99` — key `5f969b1165421ee6a8efea31d758689a66efd56f` — variants: Type=Outgoing, Type=Phone, Type=Missed
- **General/placeholder** — `COMPONENT` — node `230:28792` — key `4b1437f672486a85800e196323ee4e5e2987c6f4`
- **General/Privacy** — `COMPONENT_SET` — node `582:2162` — key `512531b6ba7b304fe1d856463459c3d694fcaea4` — variants: Style=Lock, Style=Unlock
- **General/QR** — `COMPONENT_SET` — node `582:2054` — key `1b945c944518d15d426674863f3553c5803bac41` — variants: Style=Solid, Style=Outline
- **General/Search** — `COMPONENT` — node `582:1880` — key `3a5030aae7879e5e544bdf1f6456a1f35189d785`
- **General/Settings** — `COMPONENT` — node `594:369` — key `4952a878b63de378f17a2dea8bf350e3e0c99c48`
- **General/Share** — `COMPONENT` — node `582:2187` — key `f0dc9c07f24b565dc9c21dd0e775ac55b9e3fb41`
- **General/Shield** — `COMPONENT_SET` — node `2111:4025` — key `2eba9fcbe32259d51573e246ce1e0d4d77a9ebb3` — variants: Style=Line, Style=Fill
- **General/Tap to pay** — `COMPONENT_SET` — node `586:73` — key `e2f0d6967d0e9fc5cb2a6d5cd0812c4624ae7a53` — variants: Type=Enabled, Type=Disabled
- **General/Transactions** — `COMPONENT` — node `594:370` — key `5a6fe347eef0e5737868d734aed8eba80956f637`
- **General/Video camera record** — `COMPONENT` — node `586:127` — key `6c356ddb3766c1a488d682f86f1043731fee9121`
- **General/Voice** — `COMPONENT` — node `594:367` — key `20895b27696f3b77cfd9eb7f0a80e7674d29cacc`

### Interface/*
- **Interface/Action arrows** — `COMPONENT_SET` — node `594:448` — key `da2befd430e8a4ed02230af52f0ab9af710e96bd` — variants: Direction=Up, Left, Right, Down
- **Interface/Add** — `COMPONENT` — node `594:425` — key `c28b2e73d74ec17b0e83f26f5582075a9b89baaa`
- **Interface/Align** — `COMPONENT_SET` — node `594:478` — key `2853f6e6b998e189e5041510af5d9c7f031c3417` — variants: Type=Center Inverted, Left inverted, Centre, Left
- **Interface/Analytics** — `COMPONENT_SET` — node `594:399` — key `52c63643b46faae960cd088293d4046a93d17c32` — variants: Direction=Down, Direction=Up
- **Interface/Applications** — `COMPONENT` — node `594:395` — key `4733dc4e14058a4bfea601b0ee1bd964994502ae`
- **Interface/Arrow** — `COMPONENT_SET` — node `582:588` — key `26adb7f1c3e7f8a50d85e7fdf3c2b749dfa2a02b` — variants: Direction=down, left, right, up
- **Interface/Bullet point dot** — `COMPONENT` — node `594:427` — key `d13b9f5f0941f7642dfe7b81ea0589e36645e65d`
- **Interface/Categories** — `COMPONENT` — node `594:521` — key `85290798bab7f689552db54cfde5614d0e90a980`
- **Interface/Chevron** — `COMPONENT_SET` — node `582:579` — key `f3739269e3f2b715e81d739b5c8893db8048e5bd` — variants: Direction=down, left, up, right
- **Interface/Circle share** — `COMPONENT_SET` — node `594:470` — key `9d023521348a4c7e942a4bfb13ee4c62f31b4d9c` — variants: Direction=Left, Direction=Right
- **Interface/Cross** — `COMPONENT` — node `594:424` — key `8bd4f2b3d7d9a037630bf48066573aadd2192ab2`
- **Interface/Dashboard** — `COMPONENT` — node `594:523` — key `0ea2e2ae310e90d07248b85d48e6ada6871d3432`
- **Interface/Double arrow** — `COMPONENT` — node `594:397` — key `104c293a43742b618e6cc824b31294f7f845bc7c`
- **Interface/Exclude** — `COMPONENT` — node `594:530` — key `e0fbd690df679e03a1ce77f162365c6fee7699c2`
- **Interface/Hashtag** — `COMPONENT` — node `594:522` — key `5bc4f5ea2d4baf0c99bf87510b0e58375edeec48`
- **Interface/Language** — `COMPONENT_SET` — node `594:526` — key `ce7be3582012d0befe1d86fff8cae12b17d7b8a2` — variants: Type=English, Type=Hindi
- **Interface/Library** — `COMPONENT` — node `594:394` — key `5c8c838ea14c197e9c251e65051b8e155c9be9fa`
- **Interface/List_cross** — `COMPONENT` — node `594:428` — key `9b021e0f6a9b97578739587c10740e315532fac7`
- **Interface/Other** — `COMPONENT_SET` — node `582:620` — key `1b0c898e26fcb023701d7bb71b82bddcdfc501cf` — variants: Orientation=Horizontal, Orientation=Vertical
- **Interface/Reload** — `COMPONENT_SET` — node `594:501` — key `e0928c125fac7f3d1e878b721df0f8694d8bd240` — variants: Type=Re-apply, Reload, Refresh, Refresh subtle, Reload inverted
- **Interface/Replay** — `COMPONENT` — node `3639:1308` — key `3ada5f8800114c29b2e28007c9528bda85e801b4`
- **Interface/Setup limit** — `COMPONENT` — node `594:426` — key `0def8da4947a864130817aa4d7e26af26716b9cc`
- **Interface/Side arrows** — `COMPONENT` — node `594:476` — key `319a5ea3e06946dddfb4c574bfa2adb96ee086fc`
- **Interface/up and down arrow** — `COMPONENT` — node `2614:5276` — key `6de7f0a204366d348e8a4a3e5a74ce39aabc581d`
- **Interface/Upgrade** — `COMPONENT` — node `594:396` — key `727aaf5fccb0ef873c1a4d7db76e280f744db5a4`
- **Interface/Widgets library** — `COMPONENT` — node `582:1918` — key `54ce2ba22e5fb64ae7bf52eb125a85d72879cef6`
- **Interface/Withdraw** — `COMPONENT` — node `594:520` — key `eb033b89dffc0165119d965cde57a4957b62eec0`

### Objects/*
- **Objects** — `COMPONENT_SET` — node `8114:242` — key `88152a7153d729272ac222ec283640ad6e7b8f23` — variants: Type=Fill, Type=Line
- **Objects/Bell** — `COMPONENT` — node `2425:4086` — key `77a36f7b3aa33e1e09d9e1f4678bb97f06309d7c`
- **Objects/Book** — `COMPONENT_SET` — node `6641:14715` — key `a3a860154651e9cd35b7ded7156eae80fc24a76c` — variants: Type=Education_surcharge, Education_reversal, Book
- **Objects/Bulb FAQ** — `COMPONENT` — node `594:552` — key `4d15b86624fe6aac3fb9f17484471e8a2087733c`
- **Objects/Cap** — `COMPONENT` — node `594:554` — key `a4f9d964c98292f785040c8c85078b7eaaf7c3bd`
- **Objects/Car** — `COMPONENT_SET` — node `6637:68652` — key `96b3176c24c071730b8bb92f0db3b504be6acd1c` — variants: Type=Transport_reversal, Transport_surcharge, Car
- **Objects/Chair** — `COMPONENT` — node `594:555` — key `c4d8fa1320347d34c2748e9e1d9ffe3f6aad1c2a`
- **Objects/Crown** — `COMPONENT` — node `594:562` — key `6db30e74f4df2fc8a2a8a37c11cb2e9a87054eb9`
- **Objects/Diamond** — `COMPONENT` — node `594:568` — key `ec1fda8a10da7dfd0630f69e45435cb5b65ccae3`
- **Objects/Electricity** — `COMPONENT` — node `594:559` — key `7e3ecc246f56dac18e691a9a7ccb51b7722ccb18`
- **Objects/Fast tag** — `COMPONENT` — node `595:346` — key `530f71fdae8a9ecf12a80387b4ad144d0a69f92f`
- **Objects/Fitness** — `COMPONENT` — node `594:567` — key `cf6b1b073e73d0fc0b09b87f0b6ebc5d036a749c`
- **Objects/Flash** — `COMPONENT_SET` — node `7855:3072` — key `2ce3cc452c88c8e587432f7c809289f3c15fa225` — variants: Type=Flash-on, Type=Flash-off
- **Objects/Flight** — `COMPONENT` — node `594:557` — key `5301421ec111cb2a01e9cc7e654c5f5011bf6b7c`
- **Objects/Food** — `COMPONENT` — node `594:565` — key `9203b48fb4cd73cccb8e5b6a02eda8a33bd2ae3f`
- **Objects/Fraud** — `COMPONENT` — node `630:755` — key `f1d11ac44448a33f40917860ffeaa3860735e856`
- **Objects/Freeze** — `COMPONENT` — node `595:347` — key `e1f4e07c28910f2a82cdf595108872a654e5a368`
- **Objects/Game** — `COMPONENT_SET` — node `2936:8406` — key `c794078177c86903cba50a0ea8813f1b688acea6` — variants: Type=Fill, Type=Line
- **Objects/Gas cylinder** — `COMPONENT` — node `630:743` — key `8b36ab59eb0674b124a9db58908cef6b6e526084`
- **Objects/Gold** — `COMPONENT` — node `595:340` — key `057008675f209b6ab885c5f530424afc0e4625e3`
- **Objects/Gold chain** — `COMPONENT` — node `595:339` — key `4707c8fe21a0362b46729dc7856fdc5a4232d077`
- **Objects/Groceries** — `COMPONENT` — node `594:551` — key `fb3e372f20e4b2f1b82dca20c3dfb2ee17a8d117`
- **Objects/Headphone** — `COMPONENT` — node `594:560` — key `19fa865d6401478342f690ed2b10a5acff17a204`
- **Objects/Key** — `COMPONENT` — node `594:566` — key `a4e1f32b261bd36b0ce05af87be8fe7e71037378`
- **Objects/Medical** — `COMPONENT` — node `595:342` — key `058d91c1024e2dd30cd9105b44cc2e528c3f2f19`
- **Objects/Medicine** — `COMPONENT` — node `595:343` — key `4c9527d8d3ceb2e409de8fae4b26832d8611d227`
- **Objects/Metro** — `COMPONENT` — node `2109:12263` — key `80a2e4662a68c55e67c2cf03a36f6d55b101574a`
- **Objects/Moon** — `COMPONENT` — node `3531:1556` — key `86eff8dfb57221bbc0a7dbcba8ca21d5c4e96171`
- **Objects/Pet** — `COMPONENT` — node `595:341` — key `3e15d1459b31517c09463dc9355c4578ddf1e039`
- **Objects/Pipe gas** — `COMPONENT` — node `594:558` — key `520e2ac71677bcebec7455f9876f715ea3f40443`
- **Objects/Sun** — `COMPONENT` — node `7935:11` — key `51de71e31725a49766b0082804a0801e03f0097d`
- **Objects/Thumbs down dislike** — `COMPONENT` — node `595:345` — key `3d8be1b2c37425ba642ee4654aa67bedaa33b145`
- **Objects/Thumbs up like** — `COMPONENT` — node `595:344` — key `c29db012a747457fcc74047a96ce3239232bf794`
- **Objects/Umbrella** — `COMPONENT` — node `594:553` — key `f9fbe89fb6721ce86cf2d080761764e3ad25c583`
- **Objects/Water** — `COMPONENT` — node `594:564` — key `a8e16afa5340bc599aa703aa87538562228ab476`

### Money/*
- **Money/Add money** — `COMPONENT` — node `595:403` — key `65bd1f36368096ebe3417701786aa52032009812`
- **Money/Advance money** — `COMPONENT` — node `595:405` — key `b6933c673da6fd462689910b036a60bacd7aa428`
- **Money/Autopay** — `COMPONENT` — node `595:388` — key `c9ef62060d47bea7fb596d44a83092dbeaf056af`
- **Money/Cashback history** — `COMPONENT` — node `595:393` — key `7e48f354670106b7eeb6da46da65464013b83915`
- **Money/Coin deposit** — `COMPONENT` — node `595:404` — key `e38e9b83f14d3b7f5fd22949294bd91346463e18`
- **Money/Coins** — `COMPONENT` — node `595:394` — key `1e02721fb502fd4c46877bf512bfe00871f03375`
- **Money/Deposit** — `COMPONENT` — node `595:389` — key `0558bdfd8bed1de68931606e487cb1911072db47`
- **Money/Donation** — `COMPONENT` — node `595:407` — key `145c075ee5d8d496c93e76f16525597dbc2670d5`
- **Money/Money canceled** — `COMPONENT` — node `595:392` — key `736f8f1cb903cf5c24c3fd15c7ed2c7d0b78d9b5`
- **Money/Money cross** — `COMPONENT` — node `595:387` — key `c8a8f2e76f972045d8be1567267e7996e2f17dac`
- **Money/Money notification** — `COMPONENT` — node `595:391` — key `e0653594e49544b88d5d4956afbcbe60962e23e0`
- **Money/Money Transfer** — `COMPONENT` — node `595:386` — key `f6d6f51eaec4ccbe69b3e018d4d2e33d6097fc9c`
- **Money/Money_bag** — `COMPONENT` — node `595:406` — key `949cab2da911af08283a209131f04d0ad518af17`
- **Money/Note** — `COMPONENT` — node `3531:1571` — key `f87d760fe7f7402bbca735a539824c474d4c5007`
- **Money/Pay_now** — `COMPONENT` — node `595:401` — key `822aa8d5afac09bdd79bb5284211cb2e0fd386c8`
- **Money/Purchase power** — `COMPONENT` — node `595:410` — key `5c70ecad52524d31eec2c011dc70ee8c8aa20749`
- **Money/Purchase power issue** — `COMPONENT` — node `595:408` — key `d8bec0fb83d15685eb3368d77475f557237b09e8`
- **Money/Purchase power lock** — `COMPONENT` — node `595:409` — key `37a2cc9056b23ce21964c8f314631db3dcaa4456`
- **Money/Repayment failed** — `COMPONENT` — node `595:402` — key `7ea70ecda033f6d5dbb3b12e463e1e4459b80f03`
- **Money/Rupees** — `COMPONENT` — node `595:390` — key `ed1f4f2377e90d361fbf0a9f8d5886f415c2a1b3`
- **Money/surplus transfer** — `COMPONENT` — node `1848:130` — key `82e7ae59d4289beb60357f37329814b71a44a667`

### Time/*
- **Time/Alarm** — `COMPONENT` — node `595:417` — key `12517a242b78c599f5ffa739a251ff371927321f`
- **Time/Calendar** — `COMPONENT_SET` — node `601:79` — key `d5c92721591639145c1d8efd127fb6600679ad3c` — variants: Type=Default, Lock, Start, No dues, Dues, Stop, Remove, Withdraw
- **Time/Credit limit** — `COMPONENT` — node `595:420` — key `acd2e5266ccc3af5ff4add1807c7f03c731b1abd`
- **Time/Credit_score** — `COMPONENT` — node `595:415` — key `46257f9cd291f5d61c19daf8d0e6b177ab543790`
- **Time/Faster time** — `COMPONENT` — node `595:412` — key `8749c96ea4b65896639ab5f3b54f28ca0017cdb3`
- **Time/Frequency** — `COMPONENT` — node `1848:119` — key `4c5ef573ac9bb6bc50d97e092363687120b60628`
- **Time/Hour glass** — `COMPONENT_SET` — node `595:422` — key `91d0eaa0f3e9157e0024684aeb6eead26814f493` — variants: Direction=Down, Direction=Up
- **Time/IMPS** — `COMPONENT` — node `601:115` — key `63264e051bf4455237d7f64346ac2b8dc3b53679`
- **Time/Limit** — `COMPONENT` — node `595:416` — key `0d5a75fac4978388c7a3c144a5e0a3212054bb7c`
- **Time/Pause** — `COMPONENT` — node `595:419` — key `2af5729428bdbf8d1ab7e5173482adc644963f0c`
- **Time/RTGS** — `COMPONENT` — node `1740:5` — key `9188cf52e17b8e260e6a42285fe4ae7aa49fe58f`
- **Time/Stopwatch** — `COMPONENT` — node `595:418` — key `c7874030d1b32a23f7dfb2b6ea4f3131e7dd7360`
- **Time/Time** — `COMPONENT` — node `595:411` — key `51ac3d9262792f64b4c2d115e5bc4e96a5fd6956`
- **Time/Time loading** — `COMPONENT` — node `595:414` — key `f786608d3cef603d21e60eb41cf41513c44f3d8c`
- **Time/Time reload** — `COMPONENT` — node `595:413` — key `6d66a7255b14542e8be303a5037e177eb36afa38`

### Products/*
- **Products/&** — `COMPONENT` — node `601:126` — key `0e32e5b588fff51c25ba991c6d9fcffcfbc11d1a`
- **Products/Bonfire** — `COMPONENT` — node `601:139` — key `ae767d7fdb03f5b552e7d6bf8a65ef428c857d2f`
- **Products/Borrow** — `COMPONENT` — node `601:137` — key `f1bb7ecb0535db6c405796f20e1b69565b75fe97`
- **Products/Explore** — `COMPONENT` — node `601:129` — key `fd755d3f4c76e8cbcb8c93e84d0b21b1d12f4e45`
- **Products/Fire** — `COMPONENT_SET` — node `2061:67777` — key `646da8c1d1a1515c6915e78cff01e7d161b13b05` — variants: Type=Fill, Type=Line
- **Products/Mini** — `COMPONENT` — node `601:130` — key `d8b61c5b623f53bf8db34e8f7516062bf9f22ffc`
- **Products/monies** — `COMPONENT` — node `601:128` — key `7e23bf228d8f03f177d235c54b639bc5bad4b254`
- **Products/Spark** — `COMPONENT_SET` — node `601:131` — key `2828c541edaeb56732a97264101a9bd2a91ea6f5` — variants: Type=Line, Type=Fill
- **Products/UPI** — `COMPONENT` — node `601:142` — key `66da4c781a7f6da8d2e079241f27a3520174f79d`

### Profile/*
- **Profile/Add people** — `COMPONENT` — node `601:146` — key `e251bb7f2c6d039456b5b705ff622cd346fe5764`
- **Profile/Membership** — `COMPONENT` — node `2109:12222` — key `dbbf700685663541391146ffaafe7c97cc6b232a`
- **Profile/Nominee management** — `COMPONENT` — node `601:155` — key `70888c8a5f60dbfe4e0f853dfc05978b73aaea68`
- **Profile/Profile** — `COMPONENT` — node `601:144` — key `9d1d2ebe45c84c3680207873902505035dd3f544`
- **Profile/Self transfer** — `COMPONENT_SET` — node `601:148` — key `40693403ac2048bf34eeafd1444019e34d7348cd` — variants: Type=Line, Type=Fill
- **Profile/Verify selfie** — `COMPONENT` — node `601:143` — key `b8483de141351627beb79701e06b25e90cb473af`
- **Profile/Wrong aacount** — `COMPONENT` — node `601:156` — key `f8c48fdf191b47bb1219ac9d679bbf3885ee13bc`

### Shopping/*
- **Shopping/Analytics** — `COMPONENT` — node `601:166` — key `d8de2bf43062e9f639f974d8c62a2b538c17cc7c`
- **Shopping/Bag** — `COMPONENT` — node `601:171` — key `6893fdafccdc06fd3c3558e75fb95ec9660045b9`
- **Shopping/Calculate interest** — `COMPONENT` — node `601:164` — key `1dec3281ba5030b7dd24985f22eadab789b6af8f`
- **Shopping/Coupon** — `COMPONENT` — node `601:165` — key `c418a953045e34be072cd7bd8f1a3585ffb2f5f7`
- **Shopping/Delivery** — `COMPONENT` — node `6064:29020` — key `e667f3c0a8475f1a5dba0846ea5e88cbd833bbfa`
- **Shopping/Filter** — `COMPONENT` — node `601:176` — key `5c2ab5cdc2fbba14e21bccc9dd006b8ec23aaef4`
- **Shopping/Graph** — `COMPONENT` — node `601:175` — key `869fe398f4236e5dfb4d13599a544bb5d976ce30`
- **Shopping/Grocery cart** — `COMPONENT` — node `601:173` — key `224c5da6ed6ab28a924151e6716d7849f4404b5f`
- **Shopping/Interest square** — `COMPONENT` — node `601:162` — key `dd5b2ee0be1edfbda1136037399f452de2848c35`
- **Shopping/Logistic box** — `COMPONENT` — node `601:168` — key `c0d589fed1f7a7923acc9d593bfda170236f6370`
- **Shopping/Miscellaneous** — `COMPONENT` — node `601:170` — key `bcc826a762b511edc61803cbdba8b509604732ee`
- **Shopping/Shopping bag** — `COMPONENT` — node `601:167` — key `97dd8e0c5d8d97ad7c488f7fa13c2975fe569c1a`
- **Shopping/Shopping cart** — `COMPONENT` — node `601:172` — key `bebf6621e949d4e69a01a259b8746a3284a21e38`
- **Shopping/Suitcase** — `COMPONENT` — node `601:169` — key `3b2be1f4761887b2b4b2bd7ae1922f7a545d2f32`
- **Shopping/Tag** — `COMPONENT` — node `601:174` — key `292521f1b0035a2ee12aa0fbfad64cf75932c97d`
- **Shopping/Wallet** — `COMPONENT_SET` — node `6641:14724` — key `91cb2fc2f6cd90999450f26e83741d7cfe2371ad` — variants: Type=Wallet_surcharge, Wallet_reversal, Wallet

### Messaging/*
- **Messaging/Mail** — `COMPONENT_SET` — node `594:372` — key `b9b062534df83d797d212e1727d4f1234e50660f` — variants: Type=Default, Type=Open, Type=Cross
- **Messaging/Message** — `COMPONENT` — node `582:1884` — key `112c3a615c68d8dca8627b8474bdec6f2cf26d4a`
- **Messaging/WhatsApp** — `COMPONENT` — node `2940:1544` — key `30eeaaa3bf2203e739bb95d844d74c6642e64c30`

### Documents/*
- **Documents/Application issue** — `COMPONENT` — node `595:362` — key `3662d2d0a499cd49a2f6e3ca1c16aec51905485b`
- **Documents/Bill** — `COMPONENT` — node `595:349` — key `91c0841e4fe9a5f67eea18e6756f9012281734f6`
- **Documents/Cancelled-cheque** — `COMPONENT` — node `4747:65212` — key `f788760fdacefe5454f2feae4bf2fd28d3f9d0ee`
- **Documents/Certificate** — `COMPONENT` — node `595:355` — key `2e920083ba0399ad5ba5dc5c4d17b24d74124c70`
- **Documents/Cheque_status** — `COMPONENT` — node `595:358` — key `bcc8dde5c51e04a696d131e1c50e2117b5b8bef0`
- **Documents/Contacts** — `COMPONENT` — node `595:353` — key `f8779a957af43ac7450ed67a05b9eb9bc00815c4`
- **Documents/Edit** — `COMPONENT` — node `595:357` — key `f257b64a9d9868ce927dc4d3149e418dac8fa740`
- **Documents/File closed** — `COMPONENT` — node `595:351` — key `4fb1401730b851e37d301802c20a78c05ad30799`
- **Documents/File filled** — `COMPONENT` — node `595:350` — key `f20f091f715684056f37c7da1b7f7d3c4f7d7387`
- **Documents/File signed** — `COMPONENT` — node `595:356` — key `f3ec14c885023f1549fdcf97297ddfc5a4bc7810`
- **Documents/File signed** (alt) — `COMPONENT` — node `595:348` — key `fb0841fb880d7a3bfa95f8f9efb613663ec43b79`
- **Documents/File time** — `COMPONENT` — node `595:354` — key `8e2587ed18f40272f8616f406de4dbf16aef244f`
- **Documents/File_edit** — `COMPONENT` — node `595:361` — key `bd47e34f487fee1d91acf44f5e6b642eb8a59e15`
- **Documents/Grievience** — `COMPONENT` — node `595:359` — key `eb7b2b433aa998e5594521a1f98cae12ad0959f7`
- **Documents/Order_chequebook** — `COMPONENT` — node `595:360` — key `2f71f1ad76805d10ac21c4211198ae6c772826a2`
- **Documents/PAN** — `COMPONENT` — node `595:352` — key `267c2a8a2d99bbe8b5d1e4688af3e94d0bd3c121`
- **Documents/Save** — `COMPONENT_SET` — node `3640:1310` — key `db767db583af6de2783516fb2435d21be27a9d38` — variants: Type=Save, Type=Unsaved
- **Documents/Terms** — `COMPONENT` — node `595:364` — key `c2e3316c4ffa1e521213b8db0523652fc4f61757`

### Buildings/*
- **Buildings/Bank** — `COMPONENT` — node `595:381` — key `a848d9d7b38c46da24d475ee1cec11892c29ab27`
- **Buildings/Bank-transfer** — `COMPONENT` — node `595:385` — key `027666d28153b38a0b2b1b2592f0ef3961de6829`
- **Buildings/Building** — `COMPONENT` — node `595:380` — key `7fb45902dde08ebfd622f4f09c51f05c4f935fc4`
- **Buildings/Domestic** — `COMPONENT_SET` — node `6638:68693` — key `747807ba53c08ffc27bdf47573adad65bfabd9b6` — variants: Domestic=Rent_reversal, Rent_surcharge, Domestic
- **Buildings/House** — `COMPONENT` — node `595:379` — key `b7d9d548675289231bcec4c016bcad18b671ad5f`
- **Buildings/Office** — `COMPONENT` — node `595:383` — key `ac0c0f71fc2a10435f7ef8fe69ffff40aa59868f`
- **Buildings/Shop** — `COMPONENT` — node `595:382` — key `e2be72d69959ae0c8305bef91c3b6f0d1870dd7d`

### Cards/* (icon glyphs)
- **Cards/Add money on card** — `COMPONENT` — node `601:161` — key `6375eaafb66a11646c5bba0dc75b1297f098c317`
- **Cards/Book physical card** — `COMPONENT` — node `601:160` — key `cd2f9a21e1f7f9060e70947c8663e0237e42bbbf`
- **Cards/Card** — `COMPONENT` — node `601:157` — key `b614d8f6998730a260321ea01f6679c4142a8a5d`
- **Cards/Card delivery** — `COMPONENT` — node `601:159` — key `08529197a2d50f64964766225ed1ed33fa3c9abe`
- **Cards/Card status** — `COMPONENT` — node `601:158` — key `fe60afa67a8d2ee04bdfd9bb286c8ee00c4264d9`

### Cashback/* (icon glyphs)
- **Cashback/Card cashback** — `COMPONENT` — node `601:118` — key `e33574038f62dc738fe282e55fb05650f2062c68`
- **Cashback/Card cashback reversed** — `COMPONENT` — node `601:119` — key `2d165a903d60fa46ca5732146ec512cdd5bee316`
- **Cashback/Cash** — `COMPONENT` — node `601:122` — key `d9baae62ffbff81b2a1eb212f7148af0259eda1f`
- **Cashback/Cashback** — `COMPONENT` — node `601:116` — key `1eddc5fe9882d2e29350542674e638d8fa1b49be`
- **Cashback/Cashback reverse** — `COMPONENT` — node `601:117` — key `29e19fd343d5bf75401e0c494dfa73db0d198b47`
- **Cashback/Friends** — `COMPONENT` — node `601:125` — key `4cb9f9f95cc8222c852b8da8cabb0a7e0c7fa154`
- **Cashback/Invite-and-earn** — `COMPONENT` — node `601:121` — key `2944e3b79602e37295cc3b1d94b8aafc3c7adec0`
- **Cashback/monies** — `COMPONENT_SET` — node `1848:109` — key `7e3f903052e9794b8bf2f11102d4f7afec642c5d` — variants: Type=reversed, Type=earned, Type=redeemed
- **Cashback/Past cashback** — `COMPONENT` — node `601:120` — key `9a9a35c1e036ad8adf5b663fdcadec5b7702fc97`
- **Cashback/Scratch card** — `COMPONENT` — node `601:123` — key `dc01290e40d14bee4ef82501b46623698d0d98f0`
- **Cashback/Shimmer** — `COMPONENT` — node `601:124` — key `37cc7742402c0361653d9c4bc4c65e5974ef2056`

### Devices/* (icon glyphs)
- **Devices/About** — `COMPONENT` — node `595:367` — key `405dd746631e6ca18a0e9e05d976059ae2d54505`
- **Devices/Cable dish** — `COMPONENT` — node `595:377` — key `3c2b52b0a2102974950c7f0230c374f88aa802d2`
- **Devices/Camera** — `COMPONENT_SET` — node `2922:1353` — key `e23b3f501c56ff93ac26275458d00857df1dd36e` — variants: Type=Fill, Type=Line
- **Devices/Electricity meter** — `COMPONENT` — node `2109:12242` — key `014999d3dd8f2b5714c0d1d004d8096be277883d`
- **Devices/Gear** — `COMPONENT_SET` — node `6641:14701` — key `b11e7bcfe3a1dc13a02dda2395446015ef2e2e2f` — variants: Gear=Utilities_surcharge, Utilities_reversal, Gear settings
- **Devices/Mobile phone** — `COMPONENT` — node `595:372` — key `60e5bde7da9e48ba09e7c33e7c8462bd4a8658d8`
- **Devices/Mobile postpaid** — `COMPONENT` — node `595:371` — key `8daba7ad5e671ee69d01e3ce9c0f4dc39664c3c7`
- **Devices/Mobile prepaid** — `COMPONENT` — node `595:366` — key `4f82a8aa11e572603b1feeb625f462e3cc976f2b`
- **Devices/Ott** — `COMPONENT` — node `595:373` — key `0c6a6da6c309ace86868d06e287b706b24b4ae5c`
- **Devices/Speaker** — `COMPONENT` — node `595:376` — key `39b88257909a62b5106d42540f7e51d2ccaf32b5`
- **Devices/Storage** — `COMPONENT` — node `595:378` — key `52a2ddc214a29b4ada3eff17ee6218c934b8a169`
- **Devices/Telephone** — `COMPONENT` — node `595:375` — key `ccf4ceb83f17854b409bf198d768d32cb30e7eb6`
- **Devices/Tv** — `COMPONENT` — node `595:370` — key `3a363c1d27b207c0afb73d7d44ba08ea840bff32`
- **Devices/Wifi network** — `COMPONENT` — node `595:374` — key `b1bfa2768af70f2ee416418d3e3dc38231915cce`

## Illustrations & misc

- **1** — `COMPONENT` — node `2017:217` — key `b3a5815710c209197cefedabdebe2b2b7ef80b47`
- **1** — `COMPONENT` — node `2017:145` — key `29370799bb56619a12b43586cfd29c79830aee46`
- **1** — `COMPONENT` — node `2017:136` — key `e721704aaba9f4bd5c03d1ed2e38d0b5e807cc36`
- **2** — `COMPONENT` — node `2017:215` — key `0d1c1ddd5bfdf3406ff19abd960e464e0b409d0c`
- **2** — `COMPONENT` — node `2017:144` — key `c1ca1ba392679141876aacfe434127c9294ea5c8`
- **2** — `COMPONENT` — node `2017:138` — key `f29329da4df1aa53017540e18a7d69570a2a8c6d`
- **3** — `COMPONENT` — node `2017:137` — key `0a25c41616415880cb426049baeadfbd516bd19a`
- **3** — `COMPONENT` — node `2017:216` — key `6c1f6022528e4fbbb9711bde35662356ecd4c791`
- **3** — `COMPONENT` — node `2017:143` — key `f156f908655901675c0a08f1cba69aa8a8e54e9f`
- **API** — `COMPONENT` — node `884:12254` — key `26900f450cfb46170c3b4df10834a058fc5ea9fa`
- **Autopay** — `COMPONENT` — node `886:30965` — key `56a00c1c18b3e9089c80f7251052b5fa4a5da858`
- **BBPS** — `COMPONENT` — node `886:30964` — key `078fb13c4751896ecb08756fd4f405070c54badc`
- **Agents busy** — `COMPONENT` — node `2002:75291` — key `0fec1aad1b1343921b3c68cb6438c251c2614180`
- **Credit** — `COMPONENT` — node `884:11976` — key `699841ed0d2b214682a7a7b20036138efb139448`
- **Credit card benefits** — `COMPONENT` — node `884:9148` — key `c670e3883abdffcfa34583910aebb06f9aeb8290`
- **Credit ladder** — `COMPONENT` — node `884:12017` — key `9c1ce81905605d3519f77279522069eaae92a4f7`
- **Credit waitlist** — `COMPONENT` — node `884:10290` — key `4b783192d99f3c938def2497649e0106758c249f`
- **Deposit 1** — `COMPONENT` — node `884:11977` — key `3fe5f1a6cb5c92aa24a52e13295dc4d45c424143`
- **Deposit 2** — `COMPONENT` — node `884:12062` — key `205706eccf9f72f0fdefabcf70e88bf1887bbcbe`
- **Deposit stages** — `COMPONENT_SET` — node `331:518` — key `caaf29026149331e90863f890b5bb8c334000145` — variants: Stage=Pre-closed, Active, Matured
- **Dev note** — `COMPONENT` — node `1391:2683` — key `f3d835ebda8d0008833e02a45a8b4731c401fb59`
- **Dialer/monies** — `COMPONENT_SET` — node `2938:1313` — key `16f5551db37e04361b1116fa6b7b1e37859c93b3` — variants: Progress=0%, 100%, 70%
- **Down** — `COMPONENT` — node `2863:2952` — key `08021842eb57efe2b7bc87807aaa26804e81696f`
- **Earn with FD** — `COMPONENT` — node `884:9150` — key `0df44f0078c89cde88c9bf4bcb8df51bd9000236`
- **FD** — `COMPONENT` — node `2487:4297` — key `4bbde1d8744984af3884afed5c6077088d361080`
- **FD at 8.5** — `COMPONENT` — node `886:28920` — key `b6d13fd0b69fff6af34c30dbc733f5b3a64b84b4`
- **Fire** — `COMPONENT` — node `886:30961` — key `8666b770a6bb88c06a83af5270bdd3ad9a056d25`
- **Frame** — `COMPONENT` — node `2510:12288` — key `0d4a566cbd298753589403e04c66bffb2eb5ffa2`
- **Game** — `COMPONENT` — node `2855:3247` — key `34886b5f98c366ab9057e32283fb82c174e11fbe`
- **Invite** — `COMPONENT` — node `886:30962` — key `f2976ac2a5428131c2a3629de83d83b2d97190e6`
- **Invite & earn** — `COMPONENT` — node `2940:1445` — key `21cd21b303e330bcff0c176978c72ed28dbe34cc`
- **Live deposit** — `COMPONENT` — node `884:12248` — key `38db2cce5a13884a88139e6234436b2c6df2d5f5`
- **Loan upto 5 lakhs** — `COMPONENT` — node `884:9149` — key `c76d365fd83faf1f33ca2ac94cb04e15ab818bfe`
- **Local component** — `COMPONENT` — node `905:50888` — key `5166aa006d2dc1bd1a4758f7d148396eefe0e241`
- **Monies** — `COMPONENT` — node `2017:21` — key `d367c78d2ea2d5a9c5af889caa4d42dd76ed9756`
- **Monies** (alt) — `COMPONENT` — node `2909:5341` — key `924ba9f6ad2325179a13bad354ba26c6628f76d0`
- **Network** — `COMPONENT` — node `884:12255` — key `8fa4bcd5a2e2bdd35c3abbaa7fc06e3b0e8d0ec1`
- **No autopay** — `COMPONENT` — node `2002:75292` — key `65f468388126f73cc80192ce7c484e69459144af`
- **No fire left** — `COMPONENT` — node `2912:16803` — key `e7d6250da689f25b5e90c7ebfe765b1c4338b5be`
- **Spaceship** — `COMPONENT` — node `2855:3246` — key `37c817d74b4b7d9dfd402db586deeb0626db157a`
- **Spends** — `COMPONENT` — node `886:30963` — key `1c672e4b26141d28c9ace3effeb0da41825cb728`
- **stack** — `COMPONENT` — node `2002:75293` — key `b62b2c5e819adf8934630835b9112aecdf73bdb3`

---

*Counts verified: pagination total=380 on all 4 sub-page reads; offset 360 returned hasMore=false. Library summary reports totalComponentSets=115, totalStandaloneComponents=265.*
