// Debug panel — the proto's "second view": a design-review column beside the phone
// that is HIDDEN by default so the app view stays clean. Opened via the corner
// toggle (or the `d` key) on desktop; on a phone (full-bleed device mode) the SAME
// panel opens as a bottom sheet on a three-finger tap-and-hold (`sheet` prop,
// cal:2026-10-06, aibanker-design's pattern) — one component, so the two views
// can't drift apart. It's a review tool, not part of the shipped app (same spirit
// as agentation).
//
// Styling is deliberately theme-INDEPENDENT (explicit light colours, not DLS
// tokens): it must stay readable whether the app stage is in light or dark mode,
// and nesting data-theme here would inherit the dark cascade. Keep it plain.
//
// Content is a FRAMEWORK, not Explore-specific: global controls (theme / reload /
// pod / persona / device) plus a `children` slot a derived project injects its
// own exploration controls into (section-variant pickers, presets, etc.) — see
// reference_project_workflow.md §5.

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStatusDim } from './StatusTint.jsx';
// Shared dev-chrome control primitives (Group/Chip/palette) live in
// ControlPanel.jsx — single source for the debug panel + playground.
import { C, Group, Chip } from './ControlPanel.jsx';

const POD_LABELS = {
  banking: 'Banking',
  explore: 'Explore',
  pay: 'Pay',
  credit: 'Credit',
  activity: 'Activity',
};

// cal:2026-10-06 (user): the panel sits as a COLUMN beside the phone — AI Banker's
// control column — not docked to the page's right edge. App.jsx lays the phone
// and this panel out in one centred row and passes the phone's on-screen height.
export const DEBUG_PANEL_WIDTH = 300;
export const DEBUG_PANEL_GAP = 40;

const ROW = { display: 'flex', flexWrap: 'wrap', gap: 8 };

export default function DebugPanel({
  sheet = false,
  width = DEBUG_PANEL_WIDTH,
  height,
  pods = [],
  active,
  onJumpPod,
  theme = 'light',
  onToggleTheme,
  personas = [],
  activePersona,
  onPersonaChange,
  phoneInfo,
  onClose,
  children,
}) {
  useStatusDim(sheet ? 'rgba(0, 0, 0, 0.4)' : null); // dls-lint-ok: dev-chrome scrim, below — the status bar dims with it
  // sheet: the opening lift's stray click must not shut it (belt and braces —
  // useThreeFingerHold already preventDefaults that touchend)
  const armed = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      armed.current = true;
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const header = (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px', borderBottom: `1px solid ${C.border}`, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: 100, background: C.accent }} />
        <span style={{ fontSize: 15, fontWeight: 600 }}>Debug</span>
      </div>
      <button onClick={onClose} aria-label="close debug panel" style={{
        border: 'none', background: 'transparent', cursor: 'pointer',
        fontSize: 20, lineHeight: 1, color: C.textDim, padding: 4,
      }}>×</button>
    </header>
  );

  // theme + reload first: on a phone they must sit where the thumb is, not under
  // a long sheet (aibanker: "the theme couldn't be changed on a phone")
  const themeGroup = (
    <Group title="Theme">
      <div style={ROW}>
        <Chip active={theme === 'light'} onClick={() => theme !== 'light' && onToggleTheme?.()}>Light</Chip>
        <Chip active={theme === 'dark'} onClick={() => theme !== 'dark' && onToggleTheme?.()}>Dark</Chip>
        <Chip onClick={() => window.location.reload()}>Reload</Chip>
      </div>
    </Group>
  );

  const podGroup = (
    <Group title="Pod">
      <div style={ROW}>
        {pods.map((p) => (
          <Chip key={p} active={p === active} onClick={() => onJumpPod?.(p)}>
            {POD_LABELS[p] || p}
          </Chip>
        ))}
      </div>
    </Group>
  );

  const personaGroup = personas.length > 0 && (
    <Group title="Persona">
      <div style={ROW}>
        {personas.map((p) => (
          <Chip key={p.id} active={p.id === activePersona} onClick={() => onPersonaChange?.(p.id)}>
            {p.label}
          </Chip>
        ))}
      </div>
      {(() => {
        const p = personas.find((x) => x.id === activePersona);
        return p?.description ? (
          <div style={{ fontSize: 12, color: C.textDim, marginTop: 8, lineHeight: '16px' }}>
            {p.description}
          </div>
        ) : null;
      })()}
    </Group>
  );

  const projectGroup = children && (
    <>
      <div style={{ height: 1, background: C.border, margin: '4px 0 20px' }} />
      <Group title="Project">{children}</Group>
    </>
  );

  const shell = { fontFamily: 'Rubik, system-ui, sans-serif', color: C.text };

  if (sheet) {
    // Phone: a bottom sheet over the app. Any button press closes it so the result
    // shows (theme reveal, pod jump, a project control playing its moment).
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => armed.current && onClose?.()}
        style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(0,0,0,0.4)', // dls-lint-ok: dev-chrome scrim
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          ...shell,
        }}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => {
            e.stopPropagation();
            if (e.target.closest('button')) onClose?.();
          }}
          style={{
            background: C.bg, borderRadius: '24px 24px 0 0',
            maxHeight: '80dvh', overflowY: 'auto', overscrollBehavior: 'contain',
            paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
            touchAction: 'pan-y',
          }}
        >
          <div aria-hidden="true" style={{ width: 36, height: 4, borderRadius: 100, background: C.border, margin: '8px auto 0' }} />
          {header}
          <div style={{ padding: 20 }}>
            {themeGroup}
            {projectGroup}
            {podGroup}
            {personaGroup}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative', width, height, flexShrink: 0, zIndex: 1000,
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16,
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        ...shell,
      }}
    >
      {header}
      <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
        {themeGroup}
        {podGroup}
        {personaGroup}
        {phoneInfo && (
          <Group title="Device">
            <div style={{ fontSize: 13, color: C.textDim }}>{phoneInfo}</div>
          </Group>
        )}
        {projectGroup}
      </div>
    </motion.aside>
  );
}
