## Tooling & Process (2026-06-10, ported from the aibanker-design workflow)
- [reference_lint.md](reference_lint.md) — `lint` sub-command: mechanical DLS sweep (`scripts/lint.mjs`, token map generated from tokens.js/index.css at runtime); mechanical-vs-judgment doctrine; judge/audit run it first on code targets
- [reference_cascade.md](reference_cascade.md) — `cascade` sub-command: propagate a confirmed change through reference → digest → log → proto → snapshot → seam projects, blast-radius confirmed first, verify trio after
- [reference_state_exploration.md](reference_state_exploration.md) — ControlPanel/useControlPanel, user-state presets (canonical/new-user/high-balance/behind), playground canonical URLs, variant-vs-state doctrine, browser-tool choice

## Design Rules
- [reference_canonical_fetch.md](reference_canonical_fetch.md) — **R24 meta-rule** Before claiming any spec matches DLS, fetch the published variant via `search_design_system` + `figma_get_library_component_by_key`. No guessing from screenshots.
- [feedback_dls_design.md](feedback_dls_design.md) — Always use DLS 2.0 tokens, never raw hex
- [feedback_figma_first.md](feedback_figma_first.md) — Match Figma specs 1:1, never improvise
- [feedback_reuse_existing.md](feedback_reuse_existing.md) — Never recreate components, always reuse
- [feedback_design_mode.md](feedback_design_mode.md) — "design mode" = frontend-only, preview route for variants
- [feedback_transitions.md](feedback_transitions.md) — Push left/right for nav, slide up/down for overlays
- [feedback_assets.md](feedback_assets.md) — Never substitute user-provided assets

## Patterns
- [reference_dls_screen_layouts.md](reference_dls_screen_layouts.md) — L0/L1/L2/Form/Confirmation/Activity recipes, composition rules, HTML scaffold
- [reference_explore_proto_patterns.md](reference_explore_proto_patterns.md) — Explore-page web proto patterns (defaults only): card recipe, caption+h3, `.tap` press state, smart scroll-on-change (anchor + skip-if-comfortable rules), SparkHeroCard + SparkBrandStack choreography, continuous text-roll strip, SparkBubbleCloud, anti-patterns

## Foundation Tokens
- [reference_dls_colors.md](reference_dls_colors.md) — Primitives, semantic, extended, component color tokens
- [reference_dls_spacing.md](reference_dls_spacing.md) — Padding scale: 2px to 64px
- [reference_dls_corner_radius.md](reference_dls_corner_radius.md) — S(8), M(16), L(24), Circle(100)
- [reference_dls_elevation.md](reference_dls_elevation.md) — Card, Above, Below shadow tokens
- [reference_dls_dividers.md](reference_dls_dividers.md) — Default (solid/dashed) and Big (8px section break)
- [reference_dls_iconography.md](reference_dls_iconography.md) — Icon grid (24px/56px), 15 categories, ~236 icons

## Components
- [reference_dls_appbar.md](reference_dls_appbar.md) — Standard and L0 app bars
- [reference_dls_buttons.md](reference_dls_buttons.md) — Primary/Secondary/Tertiary/Grey, Regular/Small
- [reference_dls_button_group.md](reference_dls_button_group.md) — Footer action container
- [reference_dls_bottomsheet.md](reference_dls_bottomsheet.md) — Modal overlay from bottom
- [reference_dls_input_field.md](reference_dls_input_field.md) — Underlined input with states
- [reference_dls_cards.md](reference_dls_cards.md) — L0 Large/Medium/Small, Explore cards
- [reference_dls_list_items.md](reference_dls_list_items.md) — Standard/Deposit/Setup/Transaction/Selection
- [reference_dls_section_header.md](reference_dls_section_header.md) — List, Bold, Bold+CTA, Pay with UPI
- [reference_dls_chips.md](reference_dls_chips.md) — Filter/selection pills
- [reference_dls_tabs.md](reference_dls_tabs.md) — 2 or 3 tab pill switcher
- [reference_dls_tags.md](reference_dls_tags.md) — Intent x Emphasis status pills
- [reference_dls_controls.md](reference_dls_controls.md) — Checkbox, Radio, Switch
- [reference_dls_progress.md](reference_dls_progress.md) — Linear progress bar
- [reference_dls_tooltip.md](reference_dls_tooltip.md) — Black tooltip with pointer
- [reference_dls_badge.md](reference_dls_badge.md) — Dot and Count badges
- [reference_dls_avatar.md](reference_dls_avatar.md) — Circular, 6 sizes, 4 types
- [reference_dls_dot_indicator.md](reference_dls_dot_indicator.md) — Carousel pagination dots
- [reference_dls_carousel.md](reference_dls_carousel.md) — Horizontal scrollable card container
- [reference_dls_bottom_nav.md](reference_dls_bottom_nav.md) — Pod-based app navigation
- [reference_dls_accordion.md](reference_dls_accordion.md) — Collapsible FAQ sections
- [reference_dls_dialer.md](reference_dls_dialer.md) — Circular radial slider (Monies + Repayment)
- [reference_dls_file_upload.md](reference_dls_file_upload.md) — Upload: Default/Loading/Image/PDF
- [reference_dls_footer_header.md](reference_dls_footer_header.md) — Footer (payment logos) + Header (trust/T&C)
- [reference_dls_search.md](reference_dls_search.md) — Pill search bar, 4 states, optional filter
- [reference_dls_slider.md](reference_dls_slider.md) — Horizontal range slider with thumb
- [reference_dls_snackbar.md](reference_dls_snackbar.md) — Toast bar: Default (dark) / Negative (red)
