---
name: Design mode workflow
description: "design mode" restricts work to frontend-only — components, preview, CSS. "finalize X" promotes a variant.
type: feedback
---
When the user says **"design mode"**:
- Only modify `app/components/`, `app/preview/`, and CSS/token files
- Never touch `page.tsx`, `app/api/`, `app/lib/` (except colors/typography), hooks, or state logic
- Hardcode data in preview fixtures — no API calls
- Use `app/preview/registry.ts` for variant exploration
- Screenshot-verify every visual change

When the user says **"finalize [Component/variant]"**:
- Copy winning variant into the real component
- Remove all variant entries for that component from registry
- Delete variant-specific files and dead code

**Why:** Prevents scope creep during visual iteration. The user was repeatedly forced to remind Claude to only change frontend code.
