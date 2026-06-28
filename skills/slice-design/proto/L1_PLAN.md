# L1 screen plan — slice-app-proto R24

**Goal**: build the most-used L1 surfaces that come AFTER tapping CTAs on the L0 pages. Canonical-first: every L1 starts with `get_design_context` on its Figma node.

## L1 screens ranked by priority

### Priority 1 — global / cross-pod

1. **Profile L1** (Figma `2486:75064`) — opened from avatar tap on every L0. Canonical anatomy: 128px avatar + name + phone + V-500 "Invite & earn ₹150" CTA + menu list (Action Centre, UPI settings, Pricing, App Settings, Help & support, About) + version footer.

### Priority 2 — Activity-driven (most frequent flow)

2. **Transaction Detail L1 — Sent** — opened by tapping a `sent` txn row in Activity. Canonical anatomy: app bar (back + share + 3-dot menu) + recipient avatar + name + amount + UPI / bank reference + timestamp + "View receipt" link + "Repeat / Split / Report" actions.

3. **Transaction Detail L1 — Received** — same shell as sent but green amount + "Sender details" section.

4. **Transaction Detail L1 — Failed** — sent shell + red "Failed" status banner + "Retry" CTA + failure reason.

5. **Transaction Detail L1 — Pending** — sent shell + amber "Pending" status banner + "Cancel request" or "Awaiting confirmation" copy.

### Priority 3 — Valentino-driven (payment flow)

6. **Send Money confirm L1** — after entering amount + tapping Transfer. Canonical anatomy: app bar (back + UPI ID pill carrying selected payee) + recipient card + amount display + "Add note" field + V-500 "Pay ₹XXX" CTA.

7. **Request Money confirm L1** — after entering amount + tapping Request. Similar shell with "Request from" picker.

8. **Check balance L1** — Valentino Check-balance pill tap. Compact card list of accounts + balances.

### Priority 4 — Banking-driven (deposit / growth flow)

9. **Add Money to Savings L1** — Banking "Add money" CTA. Amount entry + UPI account picker + V-500 "Add money" CTA.

10. **Open FD L1** — Banking FD card tap. FD landing with mascot + amount entry + tenor picker + "Open FD" CTA.

11. **monies wallet L1** — Banking monies card tap. monies balance + recent transactions + "Spend / Withdraw" actions.

### Priority 5 — Explore-driven (utilities + rewards)

12. **Bill Pay - Electricity L1** — Explore bill icon tap. Provider picker + customer ID input + fetch bill flow.

13. **Rewards Hub L1** — Explore "Rewards" card tap. Available rewards + claimed rewards + game/earn actions.

14. **Invite & Earn L1** — Explore Invite card tap. Share link / phone picker + reward state.

### Priority 6 — Profile menu sub-screens

15. **Action Centre L1** — Profile menu / Activity action centre. List of pending user-action requests (KYC reminders, OTPs, document uploads).

16. **UPI Settings L1** — Profile menu. List of UPI accounts + default-account picker + bank links.

17. **App Settings L1** — Profile menu. Notifications + biometric + theme + language toggles.

## Routing scaffold

Single L1 STACK at App.jsx level. Each L1 = `{ key, screen, props }`. L0s call `pushL1(name, props)` to open. L1 components call `popL1()` (or back gesture) to close. Animation: slide-in from right via framer-motion, ~280ms ease-out. Multiple L1s can stack — each new push slides over the previous.

```jsx
// App.jsx — global stack
const [l1Stack, setL1Stack] = useState([]);
const pushL1 = (name, props) => setL1Stack((s) => [...s, { name, props, key: Date.now() }]);
const popL1 = () => setL1Stack((s) => s.slice(0, -1));

// Render L1 overlay above the pager:
{l1Stack.map((entry, i) => (
  <L1Slide key={entry.key}>
    {L1_REGISTRY[entry.name]({ ...entry.props, onClose: popL1 })}
  </L1Slide>
))}
```

`L1_REGISTRY` maps name → component:
```jsx
const L1_REGISTRY = {
  profile: ProfileL1,
  txnDetail: TransactionDetailL1,
  send: SendMoneyL1,
  request: RequestMoneyL1,
  addMoney: AddMoneyL1,
  openFD: OpenFDL1,
  // ...
};
```

L0 components receive `pushL1` via context (`L1Context`) so they don't need to drill props.

## Execution order

1. **Routing scaffold** — `L1Context`, `useL1`, `L1Slide` component, registry wiring in App.jsx.
2. **Priority 1 — Profile L1** (canonical assets already fetched).
3. **Priority 2 — Transaction Detail L1** (fetch 4 state Figma canonicals).
4. **Priority 3 — Send Money + Request Money L1s** (fetch Valentino-pay-confirm canonical).
5. **Priority 4 — Add Money to Savings L1** (fetch Banking add-money canonical).
6. **Priority 5+** — as time permits or user prioritizes.

## Anti-patterns to avoid (from R23 fix-it learnings)

- ❌ Don't approximate icons with inline SVG. Always fetch from Figma.
- ❌ Don't hardcode page bg on L1 components — use `transparent` so the overlay layering works.
- ❌ Don't use slate-10 bg "to make shadows pop" — pure white only.
- ❌ Don't reinvent the AppBar — use the shared `AppBar` component with `variant="standard"` for L1s.
- ❌ Don't skip the canonical Figma fetch. The mistakes in R23 round 1 were ALL from "I'll just build it from memory" decisions.

## Refresh trigger

When each L1 lands and looks right per user, append to the calibration log.

---

Draft author: Claude. R23 cont-24 → R24 plan, 2026-05-29.
