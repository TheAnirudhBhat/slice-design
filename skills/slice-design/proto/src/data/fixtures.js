// Shared realistic-INR fixture data for the proto (aibanker-design pattern:
// believable numbers beat placeholder ₹ amounts — screens get judged with the
// data they'd really carry). Single source — pods and presets import from
// here; never invent per-screen amounts inline for a stateful surface.
//
// All amounts are raw numbers (paise-free rupees); render through
// utils/formatINR.js for Indian grouping. Dates are fixed strings (the proto
// is a design artifact — stable dates keep screenshots reproducible).

export const ACCOUNT = {
  holder: 'Rajan',
  savingsMask: '••••5732',
  upiId: 'rajan@sliceaxis',
};

// Canonical balances (the values the calibrated screens were built with).
export const BALANCES = {
  savings: 45800,
  navChip: '₹3K',
};

export const FIXED_DEPOSITS = [
  { id: 'fd-1', amount: 100000, rate: 8.5, maturesOn: "14 Mar '27" },
  { id: 'fd-2', amount: 50000, rate: 8.0, maturesOn: "02 Nov '26" },
];

// Activity transactions — mixed payees, credit/debit, realistic UPI amounts.
// `kind: 'credit'` rows render in Positive Green WITHOUT a + prefix (HARD rule).
export const TRANSACTIONS = [
  { id: 't-1', payee: 'Zomato', kind: 'debit', amount: 482, date: "09 Jun '26", method: 'UPI' },
  { id: 't-2', payee: 'Ananya Sharma', kind: 'credit', amount: 1250, date: "09 Jun '26", method: 'UPI' },
  { id: 't-3', payee: 'Delhi Metro', kind: 'debit', amount: 60, date: "08 Jun '26", method: 'UPI' },
  { id: 't-4', payee: 'Netflix', kind: 'debit', amount: 649, date: "07 Jun '26", method: 'Autopay' },
  { id: 't-5', payee: 'Blinkit', kind: 'debit', amount: 873, date: "07 Jun '26", method: 'UPI' },
  { id: 't-6', payee: 'Venkataraghavan Subramanian', kind: 'credit', amount: 15000, date: "05 Jun '26", method: 'IMPS' },
  { id: 't-7', payee: 'Rent — Mahalaxmi Estates', kind: 'debit', amount: 21700, date: "01 Jun '26", method: 'UPI' },
];

// Credit pod numbers.
export const CREDIT = {
  spendsThisMonth: 18432,
  limit: 100000,
  dueAmount: 18432,
  dueDate: "18 Jun '26",
  overdueAmount: 6210, // used by the behind-on-repayment persona
  minDue: 1850,
};
