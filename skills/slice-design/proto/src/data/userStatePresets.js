// User-state presets — flip the whole proto between user contexts from the
// debug panel (aibanker-design persona pattern, adapted to slice pods).
//
// A PRESET is a complete user-state snapshot; the canonical one reproduces the
// exact values every calibrated screen was built with, so the default proto is
// pixel-identical with presets wired in. Pods read state via useUserState()
// (src/user-state.js) and re-render on switch — no remount, no URL change.
//
// Edge-state coverage is the point: zero balances (new user), lakh+ amounts
// and long payee names (high balance), and credit overdue (behind) are the
// states static canonical frames never exercise. Validate any new screen
// against ALL presets before calling it done (reference_state_exploration.md).

import { ACCOUNT, BALANCES, FIXED_DEPOSITS, TRANSACTIONS, CREDIT } from './fixtures.js';

export const USER_STATE_PRESETS = [
  {
    id: 'canonical',
    label: 'Canonical',
    description: 'The calibrated default — exactly the values the reference screens were built with.',
    state: {
      account: ACCOUNT,
      savingsBalance: BALANCES.savings,
      navChip: BALANCES.navChip,
      fixedDeposits: FIXED_DEPOSITS,
      transactions: TRANSACTIONS,
      credit: { ...CREDIT, status: 'due' },
    },
  },
  {
    id: 'new-user',
    label: 'New user',
    description: 'Day-zero: ₹0 balance, no FDs, empty activity — exercises empty states.',
    state: {
      account: { ...ACCOUNT, holder: 'Rajan' },
      savingsBalance: 0,
      navChip: '₹0',
      fixedDeposits: [],
      transactions: [],
      credit: { ...CREDIT, spendsThisMonth: 0, dueAmount: 0, status: 'none' },
    },
  },
  {
    id: 'high-balance',
    label: 'High balance',
    description: 'Lakh+ amounts and long payee names — exercises width/wrap behaviour.',
    state: {
      account: ACCOUNT,
      savingsBalance: 1248500,
      navChip: '₹12L',
      fixedDeposits: [
        ...FIXED_DEPOSITS,
        { id: 'fd-3', amount: 500000, rate: 8.75, maturesOn: "21 Aug '28" },
      ],
      transactions: TRANSACTIONS,
      credit: { ...CREDIT, spendsThisMonth: 84320, dueAmount: 84320, status: 'due' },
    },
  },
  {
    id: 'behind',
    label: 'Behind on repayment',
    description: 'Credit overdue — exercises the negative/urgent treatments.',
    state: {
      account: ACCOUNT,
      savingsBalance: 4150,
      navChip: '₹4K',
      fixedDeposits: FIXED_DEPOSITS.slice(0, 1),
      transactions: TRANSACTIONS,
      credit: { ...CREDIT, status: 'overdue', dueAmount: CREDIT.overdueAmount },
    },
  },
];

export function getPreset(id) {
  return USER_STATE_PRESETS.find((p) => p.id === id) || USER_STATE_PRESETS[0];
}
