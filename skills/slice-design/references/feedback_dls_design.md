---
name: Always use DLS 2.0 tokens
description: All frontend work must use DLS 2.0 design tokens — never hardcode hex values or guess styles
type: feedback
---
Before writing any styles, check the `reference_dls_*` memory files for correct tokens. Use `app/lib/colors.ts` exports — never hardcode hex values.

**Why:** All UI must match the DLS 2.0 system from Figma. Hardcoded or guessed values cause inconsistency.

**How to apply:** For every CSS property (color, spacing, radius, shadow), find the matching DLS token first. If no export exists in `colors.ts`, add it from the DLS spec — don't inline the raw value.
