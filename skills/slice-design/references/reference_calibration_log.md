# Calibration log

Append-only audit trail. Maintained by `/update-slice-design`. Each row records a calibration session, what was learned, and where the learning was promoted.

Format: `YYYY-MM-DD · rule_key · N picks · agreement% · action · target file`

## History

### 2026-05-17 · batch-722 (27 picks)

**Promoted to anti-patterns** (`reference_anti_patterns.md`)
- `reward_strip_composition` — 2 picks rejecting button+chevron · "Chevron on reward/info/list-style rows" ✅
- `cashback_no_rainbow` (reframed) — 1 pick neither + reason · "Cashback on subtle-bg" ✅
- `illustration_not_in_avatar` — 0 picks, reason only · "Standalone illustration where Avatar should be" ✅
- `list_header_not_after_appbar` — 1 pick reason · "List section header directly after App bar" ✅

**Promoted to layout / component rules**
- `balance_hero_alignment` → `reference_dls_screen_layouts.md` (L0 left vs L1 centred)
- `list_header_not_after_appbar` → `reference_dls_screen_layouts.md` (composition rules section)
- `avatar_glyph_rubik_20` → `reference_dls_avatar.md` + `dls-calibration/primitives.jsx` (fontSize: size/2)

**Tentative confirmations** (1 pick each, kept for future quorum)
- `txn_debit_neutral_vs_red` (1/1) · `txn_credit_plus_prefix` (1/1) · `insight_uses_avatar` (1/1) · `insight_trend_caption_not_meta` (1/1) · `divider_inset_offset_76` (1/1) · `quick_action_icon_48` (1/1) · `balance_uses_display_small` (1/1) · `list_item_avatar_height_72` (1/1) · `quick_action_tile_flat` (1/1)

**Parked** (1 pick neither — mockup quality issues or low signal)
- `fire_is_valentino_not_orange` · `spark_framing` · `spark_rate_h2` · `balance_mask_dots` · `reward_strip_avatar_subtle` · `cashback_amount_h3_vs_display` · `cashback_gradient_when` · `reward_strip_button_small_trailing`

**Dropped** (broken pairs — A == B placeholders)
- `atom-button-radius-001` · `atom-chip-radius-004`

**Needs user clarification** (next round)
- `avatar_emphasis_default` — pick A (subtle V-50) with reason "we have moved to white" — ambiguous whether slice has moved to pure-white avatar bg in some contexts

### 2026-05-17 · batch-561 (7 picks, round 2)

**Strengthened anti-patterns** (now at multi-signal quorum)
- `chevron_in_non_nav` · 3 signals (R1: 101 + 101b, R2: 203) · `reference_anti_patterns.md` ✅
- `cashback_white_card` · 2 signals (R1: reason, R2: 205 pick) · `reference_anti_patterns.md` ✅

**Promoted new rule**
- `avatar_emphasis_default` · 2 picks (200: subtle ≈ white = `both_fine`, 201: subtle > bold-inverse) → `reference_dls_avatar.md` ✅

**Softened AP → preference**
- `illustration_in_avatar` · R1 reason "usually inside avatars" + R2 `both_fine` → moved from anti-patterns to preference note in `reference_dls_avatar.md`

**Reconfirmed (citation strengthened, no new write)**
- `balance_hero_alignment` · 3rd signal added (R2 pair 202 off-topic reason re-confirmed L0=left, L1=centered)

**Parked again** (need cleaner mockup in R3)
- `list_header_not_after_appbar` · pair 202 → `neither`. User reason was off-topic. Mockup didn't read.
- `fire_is_valentino_not_orange` · pair 206 → B with reason "yellow title is wrong". Confusion comes from purple hue-rotate filter on the 🔥 emoji. Rule stays as-is in `slice-dls L356`; rebuild the FireCard mockup without the filter for R3.

**Calibrated this round** (added `calibrated: true` to `pairs.json`)
- 200, 201, 202, 203, 204, 205, 206

### 2026-05-17 · batch-544 (6 picks, round 3)

**Promoted new rule**
- `avatar_icon_line_not_emoji` · 1 pick + decisive reason ("line icons in avatars, not emojis") → `reference_dls_avatar.md` ✅

**Reconfirmed / strengthened citations**
- `fire_is_valentino_not_orange` · R3 pair 301 (clean FireCard re-pair, filter removed) → A ✅ — empirical citation added to slice-dls L356 entry
- `list_header_not_after_appbar` · R3 pair 300 (full Activity-feed mockup) → A ✅ — 2-signal quorum citation

**Quorum builders (still tentative, need 3rd pick)**
- `txn_debit_neutral_vs_red` — 2/2 ✅ — re-pair in R4
- `insight_uses_avatar` — 2/2 ✅ — re-pair in R4

**Compound-mockup quality issues** (rule unchanged, mockup parked for fixes)
- `chevron_in_non_nav` pair 302 (CompoundExploreHome) → neither + "lot of issues". Rule already at 3-signal AP quorum from R1+R2. Compound mockup needs emoji→line-icon swap.
- `cashback_white_card` pair 303 (CompoundCreditPod) → neither (same root cause).

**Tool-quality observation**
Many "neither" picks across rounds correlate with emoji-proxy icons in mockups. Proto can't ship slice's proprietary icon set, but it should use neutral line-stroke SVG placeholders instead of emojis for the next round.

**Calibrated this round**
- 300, 301, 302, 303, 304, 305

### 2026-05-17 · batch-584 (5 picks, round 4)

**🎯 Promoted (locked)**
- `txn_debit_neutral_vs_red` — 3/3 100% (R1 001, R3 304, R4 401) → `reference_dls_list_items.md` Transaction section. Final lock.

**🆕 New rules from reasons**
- `insight_amount_weight_body` — pair 402 reason "right number font is too bond" → `reference_dls_list_items.md` Insight section. Amount = Body Normal, not H4.
- `quick_action_uniform_label_lines` — pair 403 reason "all in 2 lines or all in 1, can't truncate" → `reference_dls_screen_layouts.md` Quick-action grid section.

**Citation strengthened**
- `avatar_icon_line_not_emoji` — pair 400 pick A (2nd signal after R3 305 reason)

**Dropped**
- `r4-screen-explore-rhythm-403` placeholder pair (A == B)
- `r4-screen-activity-yesterday-404` placeholder pair (A == B)

**Process change applied this round**
Dropped the "≥3 picks for high tier" gate. Going forward: one clean pick + reason = promote. "Neither" with mockup-quality reason = fix mockup, don't re-pair. Already-settled rules don't get re-tested unless contradicted. Updated `/update-slice-design` skill file to reflect.

**Calibrated this round**
- 400, 401, 402, 403, 404

### 2026-05-17 · batch-826 (20 picks, round 5 — atom-first)

**🚨 Major rule discovered**
- `tabs_pill_not_tab` — slice doesn't use Tabs as a pattern; uses pills (segmented control). New file: `reference_dls_pills.md`. Anti-pattern entry added.
- Citation: pair 504 reason "no tabs in slice, we only have pills, but if it did have tabs they would look something like the right one"

**🆕 New rules promoted**
- `top_header_alignment_context` → `reference_dls_screen_layouts.md` — app bar left, in-card hero right
- `empty_state_cta_anchoring` → `reference_dls_screen_layouts.md` — bottom-anchored Primary OR centred Small; never centred full-width Primary
- `section_header_cta_auto_flex` → `reference_dls_section_header.md` — middle space auto-flexes between header and CTA
- `pin_field_circular_boxes` → new file `reference_dls_pin_field.md` — circular slots, not square, not dots-on-underline
- `toggle_default_ios_switch` → `reference_dls_controls.md` — iOS switch is the default for on/off
- `progress_default_circular` → `reference_dls_progress.md` — circular for indeterminate
- `input_style_default` + `form_screen_input_stack` → `reference_dls_input_field.md` — underlined with 24px gap stacked

**Reconfirmations**
- `button_press_opacity_dim` (already in motion.md) — confirmed pair 502
- `page_horizontal_padding_24` (already in slice-dls L302) — confirmed pair 519
- `confirmation_full_composition` — confirmed pair 514
- `chip_vs_tag_role` — confirmed pair 511 (already settled)

**Both fine — context-dependent, no single rule**
- `fab_default_variant` (circular OR extended)
- `tooltip_default_position` (above OR below)
- `default_cta_primary` (Primary OR Tertiary depending on context)

**Mockup-quality drops**
- `snackbar_positive_style` — neither (mockup didn't read)
- `search_default_position` — both_fine + "icons wrong"
- `bottom_nav_label_visibility` — neither no reason
- `stepper_default_dots` — A pick (kept, but mockup limited)

**Calibrated this round**
- 500–519 all marked calibrated:true

### 2026-05-17 · batch-192 (20 picks, round 6)

**🆕 New rules promoted**
- `back_nav_chevron_not_arrow` → `reference_anti_patterns.md` + `reference_dls_appbar.md` (slice back nav uses chevron ‹, not arrow ←)
- `tooltip_no_arrow` → `reference_anti_patterns.md` (slice tooltips don't have triangle arrows)
- `quick_action_icon_box_white_stroke` → `reference_anti_patterns.md` (quick-action icon containers are white-bg+stroke, NOT Avatar instances — Avatars carry identity, icon-boxes carry actions)
- `appbar_l0_avatar_required` → `reference_dls_appbar.md` (Avatar top-right is required on every L0 pod)
- `day_group_divider_hairline_not_big` → `reference_dls_screen_layouts.md` (hairline between List header day groups, not Big)
- `bottom_sheet_no_handle` → `reference_dls_bottomsheet.md` (no handle bar — corrected from initial A pick)
- `bottom_sheet_title_align_left` → `reference_dls_bottomsheet.md` (left-aligned, not centred)
- `input_error_style_underlined` → `reference_dls_input_field.md` (error = underlined + red border + red caption)
- `snackbar_with_action_for_failures` → `reference_dls_snackbar.md` (with-action variant for failure states)
- `carousel_pagination_dots` → `reference_dls_carousel.md` (dots, not counter chip)
- `settings_section_header_list` → `reference_dls_section_header.md` (settings groups use List headers)

**Reconfirms (no new write)**
- `avatar_palette_emphasis` — subtle default reconfirmed (pair 608)
- `section_gap_default` — 16px between L0 cards (pair 613, already in slice-dls L306)
- `empty_state_cta_anchor` — bottom-anchored Primary reconfirmed (pair 618)

**Dropped / no signal**
- `bottom_nav_badge`, `page_title_h2`, `banner_style` — silent neither
- `confirmation_state` — both_fine + "icons suck, will provide asset later"
- `brand_gradient_scope` — both_fine + "container doesn't make sense" (mockup quality)
- `marketing_card_treatment` — B pick with no reason; both are valid for their roles

**Calibrated this round**
- 600–619 all marked calibrated:true

### 2026-05-17 · batch-818 (20 picks, round 7)

**🚨 Major new anti-pattern**
- `destructive_cta_not_red_filled` → `reference_anti_patterns.md` — slice doesn't use red-fill Primary buttons. Destructive intent comes from container (alert dialog/sheet) + neutral Primary, or Tertiary outlined with red text label. (Pair 718 B + reason "we don't use this CTA colour".)

**🆕 New rules promoted (states + formatting + loading)**
- `button_disabled_opacity` + `list_item_disabled_opacity` (light ~0.7, not heavy 0.4) → `buttons.md` + `list_items.md` (pair 701 A, 704 A + reason "little fade is fine, this is too much fade")
- `button_loading_spinner_plus_label` → `buttons.md` (pair 700 B — label stays visible)
- `input_focused_caption_no_scale` → `input_field.md` (pair 702 A — no scale animation)
- `input_filled_value_dominant` → `input_field.md` (pair 703 A — value H4, label Caption)
- `date_relative_today_yesterday` → new `reference_dls_dates_time.md` (pair 707 A — TODAY/YESTERDAY for recent)
- `time_absolute_in_list` → `dates_time.md` (pair 708 B — absolute time, not relative, in persistent lists)
- `unread_marker_dot` → `list_items.md` (pair 713 A — V-500 trailing dot, not bold text)
- `validation_inline` → `list_items.md` (pair 717 A — inline caption below field)
- `screen_loading_centred_spinner` → `progress.md` (pair 710 A — full-screen = spinner, not skeleton)
- `skeleton_shimmer_animation` → `progress.md` (pair 712 A — shimmer, not static blocks)
- `pull_refresh_minimal` → `progress.md` (pair 711 B — system-default spinner, not branded pill)
- `list_load_more_auto` → `list_items.md` (pair 715 A — auto on scroll, not explicit button)
- `selection_list_radio` → `list_items.md` (pair 719 A — radio circles, not checkmarks)

**Dropped (silent neither or already-documented)**
- `currency_no_space` — already in slice-dls L358 (₹500 spec)
- `number_indian_grouping` — already in slice-dls L358 (Indian lakhs/crores)
- `bottom_nav_badge_style`, `list_item_selected_style`, `bottom_nav_scroll_edge` — silent neither, no reason

**Calibrated this round**
- 700–719 all marked calibrated:true

### 2026-05-17 · batch-751 (20 picks, round 8)

**🆕 New rules promoted**
- `amount_entry_big_centred` + sub-rule **₹ symbol matches amount font size** → `screen_layouts.md` (pair 800 A + reason)
- `toast_position_bottom` → `screen_layouts.md` (pair 806 B — bottom, not top)
- `keypad_keys_borderless` → `reference_dls_dialer.md` (pair 805 neither + "without stroke")
- `receipt_breakdown_table` → new `reference_dls_misc_patterns.md` (pair 807 B — bordered table, not list rows)
- `faq_question_body_weight` → `misc_patterns.md` (pair 808 B — Body, not H4)
- `permission_sheet_no_illustration_default` → `misc_patterns.md` (pair 809 B)
- `tag_on_card_use_chip` → `misc_patterns.md` (pair 818 A)
- `step_progress_dot_stepper` → `progress.md` (pair 812 B — dots, not segmented bar)
- `avatar_status_corner_dot` → `avatar.md` (pair 815 A — corner dot, not ring)
- `group_avatar_overlapping` → `list_items.md` (pair 817 A — overlapping stack with white borders)
- `list_item_compact_56` → `list_items.md` (pair 819 A — Standard-Empty 56 for settings/menus)
- `account_selector_full_width_row` → `list_items.md` (pair 801 A — dropdown row, not chip)

**Reconfirmed**
- `card_internal_padding_24` → already in slice-dls L302 (L token = 24px)

**Both fine / no rule**
- `image_card_overlay` (pair 813), `filter_pill_row_layout` (pair 816)

**Held — no reason**
- `button_on_color_style` (pair 803 B with no reason — ambiguous)
- `avatar_photo_default`, `welcome_hero_style`, `multi_select_chip_style`, `footnote_placement` — silent neither

**Calibrated this round**
- 800–819 all marked calibrated:true

### 2026-05-17 · batch-666 (partial — 11 of 30 picked, round 9)

**🆕 New rules promoted**
- `emi_plan_layout_list` → `misc_patterns.md` (pair 914 B — list rows, not table)
- `payee_confirmation_large` → `misc_patterns.md` (pair 908 B — large H3 name, not chip)
- `interest_display_running` → `misc_patterns.md` (pair 916 A — running tally, not projection)
- `loading_copy_system` → `misc_patterns.md` (pair 926 B — "Loading…", not fake-friendly)
- `cta_verb_action_value` → `misc_patterns.md` (pair 928 A after revision — verb + value, not verb + object)
- `upi_id_full_display` → `input_field.md` (pair 901 A — show in full, not masked)
- `card_expiry_short` → `input_field.md` (pair 903 A — 12/27, not Dec 2027)

**Reconfirms**
- `account_mask_format` — slice-dls L360 already specifies `xx1234`; pair 900 B confirms

**Both fine / no rule**
- `qr_scanner_trigger` (pair 911), `goal_progress_viz` (pair 917)

**Calibrated this round** (only touched pairs)
- 900, 901, 903, 908, 911, 914, 916, 917, 926, 928 — marked calibrated:true
- 19 R9 pairs untouched → remain active for next session

### 2026-05-17 · batch-522 (R9 continuation — 21 picks)

**🆕 New rules**
- `error_copy_tone_friendly` → `misc_patterns.md` (pair 927 A — calm/human, not technical)
- `empty_copy_explanatory` → `misc_patterns.md` (pair 929 B — explanation, not terse)
- `sparkline_smooth` → `misc_patterns.md` (pair 922 A — smooth, not stepped)
- `delta_arrow_only` → `misc_patterns.md` + `anti_patterns.md` (pair 923 — arrow OR sign, never both; arrow preferred)
- `maturity_date_primary` → `misc_patterns.md` (pair 915 B — date as headline)
- `txn_ref_full_display` → `misc_patterns.md` (pair 906 B — full ref, copyable)
- `help_icon_info_glyph` → `misc_patterns.md` (pair 919 B — "i", not "?")
- `verified_badge_tick` → `misc_patterns.md` (pair 905 A — inline ✓)
- `offline_minimal_indicator` → `misc_patterns.md` (pair 918 B — icon+label, not banner)
- `bank_logo_no_inline_glyph` → `misc_patterns.md` (pair 907 B + "no bank glyph")
- `chart_donut_not_pie` → `misc_patterns.md` (pair 925 B + "never seen pie chart in slice")
- `cvv_input_circular_boxes` → `reference_dls_pin_field.md` (pair 904 A + "circular input for CVV" — extends PIN rule to CVV)
- `bill_category_icon_grid` (pair 909 A — implicit confirm of quick-action grid pattern)

**🆕 New anti-patterns**
- `emoji_in_cta_button` → `anti_patterns.md` (pair 921 reason "no emoji in CTA, only icons" — extends line-icon rule to button leading-icon slot)
- `arrow_plus_together` → `anti_patterns.md` (pair 923)

**Reconfirms**
- `card_number_display` — slice-dls L360 spec `xx1234` reconfirmed by pair 902 B

**Both fine / dropped**
- `sync_status_style`, `credit_limit_viz`, `card_visual_bg`, `split_bill_status` — no rule extracted
- `stat_card_layout` — both_fine but reason notes "charts rare in slice"; covered by chart_donut_not_pie

**Calibrated this round**
- 902, 904, 905, 906, 907, 909, 910, 912, 913, 915, 918, 919, 920, 921, 922, 923, 924, 925, 927, 929 — marked calibrated:true

### 2026-05-17 · batch-839 (22 picks, round 10 — minimalism axis)

**🆕 New rules promoted**
- `empty_state_uses_illustration` → `misc_patterns.md` (pair 1003 reason "we usually have an illustration in nil states, not an avatar icon")
- `card_title_align_context` → `misc_patterns.md` (pair 1009 reason "when in card left, when not in card and top of page then center")
- `hero_number_with_context` → `misc_patterns.md` (pair 1004 B — Display + caption + delta, never alone)
- `cashback_density_minimal` → `misc_patterns.md` (pair 1017 A — label + amount only by default)
- `confirmation_density_full` → `misc_patterns.md` (pair 1012 B — Avatar + title + body + button)
- `form_input_label_above` → `misc_patterns.md` (pair 1015 A — Caption label above H4 value)
- `list_subtitle_keep_short` → `misc_patterns.md` (pair 1005 A — one unit of info per subtitle)
- `currency_no_decimals_on_surface` → `misc_patterns.md` (pair 1019 A — ₹482 not ₹482.00)
- `status_pill_trailing_edge` → `misc_patterns.md` (pair 1002 B — pill at right edge, not beside title)
- `status_badge_icon_plus_text` → `misc_patterns.md` (pair 1020 A — ✓ Delivered, not text alone)
- `avatar_size_dense_row_32` → `misc_patterns.md` (pair 1007 A — S-32 for settings/contacts/menus)
- `destructive_modal_copy_full` → `misc_patterns.md` (pair 1018 B — title + body + 2 CTAs)

**Reconfirms**
- `card_surface_chrome` — shadow as default (slice-dls)
- `section_gap_16` — 16px default (slice-dls L306)
- `button_label_length` — reconfirms R9 `cta_verb_action_value` ("pay 500" reason matches verb+value pattern)

**Both fine / dropped**
- `section_subtitle_default`, `notification_body_length`, `footer_info_layout`, `dual_cta_layout`, `list_secondary_line`, `toggle_row_description`, `card_leading_decoration` — all both_fine, no rule extracted

**Calibrated this round**
- 1000–1021 all marked calibrated:true

## Pending parking lot

Pairs flagged "needs elaboration". `/update-slice-design` walks these first on next run.

_(none yet)_

## Active overrides

Cases where user picks contradicted what another skill (impeccable, design-motion-principles, etc.) would have advised. slice-design wins; recorded here so the conflict is recoverable.

_(none yet)_

## 2026-05-17 · R11 review round 2 (with reference SVGs)

Source: review session batch-538 (post-polish, 13 reference SVGs attached). All 14 review screens picked "issues" except bottom-sheet-confirm ("not_slice") and emi-picker (mockup-spacing only).

- 2026-05-17 · review_activity_feed · 1 pick + ref · promoted to reference_dls_screen_layouts.md (Activity L0 recipe)
- 2026-05-17 · review_balance_l1 · 1 pick + ref · promoted to reference_dls_screen_layouts.md (Balance L1 recipe + 3 sub-rules)
- 2026-05-17 · review_confirm_success · 3 picks + ref · promoted to reference_dls_screen_layouts.md + reference_dls_appbar.md (X-close variant)
- 2026-05-17 · review_empty_rewards · 2 picks + ref · promoted to reference_dls_screen_layouts.md (leaderboard hero + currency pill in App bar)
- 2026-05-17 · review_recharge_bills · 2 picks + ref · promoted to reference_dls_screen_layouts.md + reference_dls_chips.md (solid-fill pill variant) + flipped chevron rule (chevron `›` valid for trailing-row callouts)
- 2026-05-17 · review_pin_entry · 2 picks + ref · promoted to reference_dls_pin_field.md (Display title, context subtitle, 64px slots, brief digit visibility, system keypad)
- 2026-05-17 · review_bottom_sheet_confirm · 2 picks + 1 not_slice · promoted to reference_dls_screen_layouts.md (no Cancel, single Primary)
- 2026-05-17 · review_emi_picker · 2 picks (mockup-spacing only) · dropped — no rule extracted
- 2026-05-17 · review_spark_fd_details · 1 pick + ref · promoted to reference_dls_dividers.md (dashed variant) + reference_dls_screen_layouts.md (left-aligned hero, no card)
- 2026-05-17 · review_send_money · 1 pick + 2 refs · promoted to reference_dls_screen_layouts.md (split into Add Money neutral + Pay Person brand-immersive recipes)
- 2026-05-17 · review_banking_home · 1 pick + ref · flipped to reference_dls_screen_layouts.md — Banking home = Balance L1, consolidated
- 2026-05-17 · review_credit_home · 3 picks + ref · flipped to reference_dls_screen_layouts.md (Credit home = bill summary view)
- 2026-05-17 · review_payments_home · 1 pick + ref · flipped to reference_dls_screen_layouts.md (Pay screen with dynamic amount title + form rows + QUICK PAY coloured circles)
- 2026-05-17 · review_notifications_feed · 1 pick + ref · promoted to reference_dls_screen_layouts.md (Action centre) + reference_dls_cards.md (outline-border card variant)
- 2026-05-17 · chevron_rule_refined · flipped in reference_calibrated_digest.md — right-chevron `›` valid on tap-row callouts
- 2026-05-17 · illustration_rule_refined · flipped in reference_calibrated_digest.md — slice uses real illustrations, generic line icons are prototyping placeholders
- 2026-05-17 · quick_action_icons_refined · refined in reference_calibrated_digest.md — V-500 for action tiles, slate for content-grid tiles inside Explore-style cards
- 2026-05-17 · credit_prefix_anti_pattern · added to reference_calibrated_digest.md — no `+` on credit amounts, use Positive Green colour alone
- 2026-05-17 · app_bar_variants_added · close-X, trailing utility icons, dynamic amount in title, slice currency pill trailing → reference_dls_appbar.md

## 2026-05-18 · R12 + R13 batch-493 triage (11 entries)

Source: session batch-493 (compare + tune mixed). 5 promotions, 2 flips, 8 new anti-patterns, 2 mockup-quality drops.

- 2026-05-18 · tune_avatar · 1 lock · promoted canonical spec to reference_dls_avatar.md (sizes, colors, emphases, fontFamily=Rubik, fontWeight=500, glyphScale=size/2, defaults M-40/valentino/subtle). User: "font weight should be medium in these".
- 2026-05-18 · tune_button · 1 lock · promoted spec to reference_dls_buttons.md with open question on Regular height (48 → 44?). User: "buttons look a little too big, idk" — queued A/B for next batch.
- 2026-05-18 · tune_listItem · 1 reject · flipped reference_dls_dividers.md (no divider between same-type avatar-leading rows). User: "we don't do divider between avatar list items".
- 2026-05-18 · action_centre_avatar_position · A pick · reconfirmed avatar TOP-RIGHT. Extracted 3 new APs: grey-bg cards, white-on-white without shadow, H3 card titles → reference_anti_patterns.md.
- 2026-05-18 · bottom_sheet_handle_visible · A pick · reconfirmed no-handle. Extracted 2 new APs: no confirm-payment sheet pattern, no drag-handle → reference_anti_patterns.md. Refined sheet interior padding-top = 24 → reference_dls_screen_layouts.md.
- 2026-05-18 · success_tick_grainy_vs_clean · B pick (single-green grainy) + stroke refine (6 → 8) → reference_dls_screen_layouts.md.
- 2026-05-18 · activity_l0_filter_affordance · A pick (icon button) + spacing refine (App-bar-to-search gap = 8px) → reference_anti_patterns.md (pills-under-search anti-pattern) + reference_dls_screen_layouts.md.
- 2026-05-18 · empty_state_cta_after_illustration · neither (mockup quality) · dropped pair. Extracted new rule: slice-currency pill = avatar inside pill, not separate badge → reference_dls_misc_patterns.md.
- 2026-05-18 · quick_pay_avatar_style · neither (mockup quality, both sizes wrong) · dropped pair. Re-pair with calibrated avatar size on next batch.
- 2026-05-18 · spark_fd_today_delta_chip · A pick (no chip) · promoted to reference_dls_screen_layouts.md (Spark FD hero clean).
