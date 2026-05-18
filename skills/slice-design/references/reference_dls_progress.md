---
name: DLS 2.0 Progress Bar
description: Linear progress bar — 8px height, pill shape, brand color fill on subtle track
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `774:5461`, `1910:22200`

## Structure
- Height: 8px | Radius: 100px (pill) | Width: flexible

## Track (background)
- Color: #FAE2FA (Valentino/50)

## Fill (progress)
- Color: #D30AD7 (Valentino/500)
- Radius: 100px
- Decorative shadow: `0px 2px 4px rgba(211,10,215,0.2)` (non-DLS)
- Min size: 8x8 (circle dot at 0%)

## Skeleton loading — shimmer animation
Skeleton loading uses a **shimmer animation** (linear gradient across each block, 1.2s linear infinite) — not static slate-50 rectangles. Shimmer signals "actively loading"; static reads as a broken render.
Source: cal:2026-05-17 — pair 712 A ✅

## Pull-to-refresh — minimal, not branded
Pull-to-refresh uses a **minimal spinner** (slate-400) with a small caption ("Refreshing") — not a branded V-50 pill with a V-500 spinner inside. The refresh moment is chrome, not a brand moment.
Source: cal:2026-05-17 — pair 711 B ✅

## Screen loading — centred spinner
Full-screen loading uses a **centred V-500 spinner** with a small "Loading…" caption — not skeleton blocks at the full layout shape. Skeleton is for in-card / per-section loads, not full-screen waits.
Source: cal:2026-05-17 — pair 710 A ✅

## Step progress — dot stepper
Multi-step flows (onboarding, checkout) use a **dot stepper** at the top (animated active pill, 6×6 dots elsewhere). Not a segmented progress bar.

Why: dots feel lighter and don't compete with content; bars dominate the top of the screen.
Source: cal:2026-05-17 — pair 812 B ✅
