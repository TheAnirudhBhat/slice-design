---
name: DLS 2.0 Dates & Time
description: Date label conventions and time format for transaction lists
type: reference
calibrated: 2026-05-17
---

## Date labels for grouped lists
For day-grouped lists (Activity feed, transactions), use **relative labels** for recent days: `TODAY`, `YESTERDAY` (uppercase Metadata, List section header style).

For older days, switch to absolute: `20 Nov '25` format (Caption style). The cut-over is at ~2 days back.

Source: cal:2026-05-17 — pair 707 A ✅

## Time format on list-item subtitles
Use **absolute time** for transaction subtitles: `UPI · 3:42 PM`, `Card · 14 Nov '25`. Don't use relative ("2 min ago", "1 hr ago") in the persistent list — relative goes stale quickly and feels imprecise in a financial record.

Relative time is OK for **notifications** (toast, in-app alerts) where the moment-of-receipt is what matters.

Source: cal:2026-05-17 — pair 708 B ✅
