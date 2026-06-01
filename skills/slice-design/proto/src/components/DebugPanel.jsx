// Debug panel — the proto's "second view": a right-docked design-review surface
// that is HIDDEN by default so the app view stays clean. Opened via the corner
// toggle (or the `d` key) on desktop only — it's a review tool, not part of the
// shipped app (same spirit as agentation being desktop-only).
//
// Styling is deliberately theme-INDEPENDENT (explicit light colours, not DLS
// tokens): it must stay readable whether the app stage is in light or dark mode,
// and nesting data-theme here would inherit the dark cascade. Keep it plain.
//
// Content is a FRAMEWORK, not Explore-specific: global controls (theme / pod /
// device) plus a `children` slot a derived project injects its own exploration
// controls into (section-variant pickers, presets, etc.) — see
// reference_project_workflow.md §5.

import React from 'react';
import { motion } from 'framer-motion';

const POD_LABELS = {
  banking: 'Banking',
  explore: 'Explore',
  pay: 'Pay',
  credit: 'Credit',
  activity: 'Activity',
};

const C = {
  bg: '#FFFFFF',
  border: '#E6E9ED',
  text: '#171A1F',
  textDim: '#6B7280',
  chipBg: '#F2F4F7',
  chipActiveBg: '#171A1F',
  chipActiveText: '#FFFFFF',
  accent: '#D30AD7',
};

function Group({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.6px',
        textTransform: 'uppercase', color: C.textDim, marginBottom: 8,
      }}>{title}</div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
      font: 'inherit', fontSize: 13, fontWeight: 500,
      background: active ? C.chipActiveBg : C.chipBg,
      color: active ? C.chipActiveText : C.text,
      transition: 'background 120ms ease, color 120ms ease',
    }}>{children}</button>
  );
}

export default function DebugPanel({
  width = 360,
  pods = [],
  active,
  onJumpPod,
  theme = 'light',
  onToggleTheme,
  phoneInfo,
  onClose,
  children,
}) {
  return (
    <motion.aside
      initial={{ x: width }}
      animate={{ x: 0 }}
      exit={{ x: width }}
      transition={{ type: 'spring', stiffness: 360, damping: 36, mass: 0.8 }}
      style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width, zIndex: 1000,
        background: C.bg, borderLeft: `1px solid ${C.border}`,
        boxShadow: '-8px 0 24px rgba(0,0,0,0.06)',
        fontFamily: 'Rubik, system-ui, sans-serif', color: C.text,
        display: 'flex', flexDirection: 'column',
      }}
    >
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

      <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
        <Group title="Theme">
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip active={theme === 'light'} onClick={() => theme !== 'light' && onToggleTheme?.()}>Light</Chip>
            <Chip active={theme === 'dark'} onClick={() => theme !== 'dark' && onToggleTheme?.()}>Dark</Chip>
          </div>
        </Group>

        <Group title="Pod">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {pods.map((p) => (
              <Chip key={p} active={p === active} onClick={() => onJumpPod?.(p)}>
                {POD_LABELS[p] || p}
              </Chip>
            ))}
          </div>
        </Group>

        {phoneInfo && (
          <Group title="Device">
            <div style={{ fontSize: 13, color: C.textDim }}>{phoneInfo}</div>
          </Group>
        )}

        {children && (
          <>
            <div style={{ height: 1, background: C.border, margin: '4px 0 20px' }} />
            <Group title="Project">{children}</Group>
          </>
        )}
      </div>
    </motion.aside>
  );
}
