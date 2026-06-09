// Playground — canonical-URL gallery for DLS tokens, components, and screens
// (aibanker-design playground pattern). Dev chrome: NOT part of the shipped
// app, opened via the ?playground URL param (main.jsx routes it).
//
//   /?playground                 → first entry (colors)
//   /?playground=<entry>         → that entry (canonical screenshot URL)
//   /?playground=screen:<pod>    → the FULL app at that pod (main.jsx renders
//                                  <App initialPod={pod}/> directly — the
//                                  canonical per-screen URL)
//
// Layout: left rail (entry list) + themed stage. The stage is a 402px-wide
// surface that carries data-theme, so every entry is verifiable in light AND
// dark without touching the app. Component entries use useControlPanel —
// states are orthogonal controls, never variant chips
// (reference_state_exploration.md).

import React, { useState } from 'react';
import { C, Group, Chip, useControlPanel } from '../components/ControlPanel.jsx';
import Avatar from '../components/Avatar.jsx';
import { AppBar, EyeOpenGlyph } from '../components/AppBar.jsx';
import formatINR from '../utils/formatINR.js';
import { TRANSACTIONS } from '../data/fixtures.js';

const PODS = ['banking', 'explore', 'pay', 'credit', 'activity'];

// Themed CSS variables (light/dark) — names match index.css :root.
const VAR_TOKENS = [
  'page-bg', 'surface', 'brand-bg',
  'text-primary', 'text-secondary', 'text-tertiary',
  'outline-subtle', 'outline-bold',
  'v-100', 'v-50',
  'positive', 'positive-50', 'negative', 'negative-50',
  'amber', 'amber-50', 'amber-700',
  'slate-10', 'slate-30', 'slate-100', 'slate-400', 'slate-900',
  'blue-500',
];

// Rubik scale — the styles every screen composes from (reference_dls_* specs).
const TYPE_SCALE = [
  { name: 'Display Small', size: 48, lh: 56, w: 500, ls: '-0.48px' },
  { name: 'Header H2', size: 24, lh: 32, w: 500, ls: '0.48px' },
  { name: 'Header H3', size: 20, lh: 24, w: 500, ls: '0.4px' },
  { name: 'Header H4', size: 16, lh: 20, w: 500, ls: '0.32px' },
  { name: 'Body', size: 16, lh: 24, w: 400, ls: '0.32px' },
  { name: 'Button Small', size: 14, lh: 20, w: 500, ls: '0.28px' },
  { name: 'Caption', size: 12, lh: 16, w: 400, ls: '0.24px' },
  { name: 'Metadata', size: 10, lh: 12, w: 400, ls: '0.4px', upper: true },
];

function Swatch({ name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8, flexShrink: 0,
        background: `var(--${name})`,
        border: '1px solid var(--outline-bold)',
      }} />
      <div style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--text-primary)' }}>
        --{name}
      </div>
    </div>
  );
}

function ColorsEntry() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 24 }}>
      {VAR_TOKENS.map((t) => <Swatch key={t} name={t} />)}
    </div>
  );
}

function TypeEntry() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24 }}>
      {TYPE_SCALE.map((t) => (
        <div key={t.name}>
          <div style={{
            fontFamily: 'Rubik, sans-serif', fontWeight: t.w, fontSize: t.size,
            lineHeight: `${t.lh}px`, letterSpacing: t.ls, color: 'var(--text-primary)',
            textTransform: t.upper ? 'uppercase' : 'none', whiteSpace: 'nowrap',
          }}>
            Add money
          </div>
          <div style={{
            fontFamily: 'Rubik, sans-serif', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2,
          }}>
            {t.name} · {t.size}/{t.lh} {t.w === 500 ? 'Medium' : 'Regular'}
          </div>
        </div>
      ))}
    </div>
  );
}

function AvatarEntry() {
  const [state, panel] = useControlPanel({
    size: { kind: 'select', label: 'Size', options: ['32', '40', '44', '64', '128'], default: '40' },
    tone: { kind: 'select', label: 'Tone', options: ['plain', 'subtle', 'chip'], default: 'chip' },
    content: { kind: 'select', label: 'Content', options: ['monogram', 'photo'], default: 'monogram' },
    initial: { kind: 'input', label: 'Monogram', default: 'R' },
  });
  return {
    panel,
    node: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <Avatar
          size={Number(state.size)}
          tone={state.tone}
          photo={state.content === 'photo' ? '/assets/avatar_only.png' : undefined}
          initial={state.content === 'monogram' ? (state.initial || 'R').slice(0, 1).toUpperCase() : undefined}
        />
      </div>
    ),
  };
}

function AppBarEntry() {
  const [state, panel] = useControlPanel({
    variant: { kind: 'select', label: 'Variant', options: ['l0', 'standard'], default: 'l0' },
    title: { kind: 'input', label: 'Title', default: 'Banking' },
    scroll: { kind: 'switch', label: 'Scrolled (elevation)', default: false },
    eye: { kind: 'switch', label: 'Eye toggle (L0)', default: true },
  });
  return {
    panel,
    node: (
      <div style={{ paddingTop: 24 }}>
        <AppBar
          variant={state.variant}
          title={state.title}
          scroll={state.scroll}
          actions={state.variant === 'l0' && state.eye ? [<EyeOpenGlyph key="eye" />] : []}
          avatar={state.variant === 'l0' ? <img src="/assets/avatar_only.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : undefined}
          onBack={() => {}}
        />
        <div style={{ padding: 24, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: 'var(--text-tertiary)' }}>
          content scrolls under the bar — toggle "Scrolled" for the elevation state
        </div>
      </div>
    ),
  };
}

function TxnRowsEntry() {
  // Transaction list rows from shared fixtures — credit rows are Positive
  // Green with NO + prefix (HARD rule), debits stay neutral.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 24px' }}>
      {TRANSACTIONS.slice(0, 6).map((t) => (
        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 76 }}>
          <Avatar size={40} tone="chip" initial={t.payee[0]} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'Rubik, sans-serif', fontSize: 16, lineHeight: '20px', fontWeight: 500,
              letterSpacing: '0.32px', color: 'var(--text-primary)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {t.payee}
            </div>
            <div style={{
              fontFamily: 'Rubik, sans-serif', fontSize: 12, lineHeight: '16px',
              letterSpacing: '0.24px', color: 'var(--text-tertiary)', marginTop: 2,
            }}>
              {t.date} · {t.method}
            </div>
          </div>
          <div style={{
            fontFamily: 'Rubik, sans-serif', fontSize: 16, lineHeight: '20px', fontWeight: 500,
            letterSpacing: '0.32px', flexShrink: 0,
            color: t.kind === 'credit' ? 'var(--positive)' : 'var(--text-primary)',
          }}>
            ₹{formatINR(t.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}

const ENTRIES = [
  { id: 'colors', label: 'Colors', render: () => ({ node: <ColorsEntry /> }) },
  { id: 'type', label: 'Typography', render: () => ({ node: <TypeEntry /> }) },
  { id: 'avatar', label: 'Avatar', render: AvatarEntry },
  { id: 'appbar', label: 'App bar', render: AppBarEntry },
  { id: 'txn-rows', label: 'Transaction rows', render: TxnRowsEntry },
];

export default function Playground({ initialEntry }) {
  const [entryId, setEntryId] = useState(
    ENTRIES.some((e) => e.id === initialEntry) ? initialEntry : ENTRIES[0].id
  );
  const [stageTheme, setStageTheme] = useState('light');
  const entry = ENTRIES.find((e) => e.id === entryId);
  const { node, panel } = entry.render();

  const selectEntry = (id) => {
    setEntryId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('playground', id);
    window.history.replaceState(null, '', url); // canonical URL without remount
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex',
      fontFamily: 'Rubik, system-ui, sans-serif', background: '#FAFBFC',
    }}>
      {/* rail */}
      <aside style={{
        width: 280, flexShrink: 0, background: C.bg, borderRight: `1px solid ${C.border}`,
        padding: 20, overflowY: 'auto', color: C.text,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: 100, background: C.accent }} />
          <span style={{ fontSize: 15, fontWeight: 600 }}>slice playground</span>
        </div>

        <Group title="Tokens & components">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            {ENTRIES.map((e) => (
              <Chip key={e.id} active={e.id === entryId} onClick={() => selectEntry(e.id)}>
                {e.label}
              </Chip>
            ))}
          </div>
        </Group>

        <Group title="Screens (full app)">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PODS.map((p) => (
              <Chip key={p} active={false} onClick={() => { window.location.search = `?playground=screen:${p}`; }}>
                {p}
              </Chip>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.textDim, marginTop: 8, lineHeight: '16px' }}>
            opens the real app at that pod — the canonical screenshot URL
          </div>
        </Group>

        <Group title="Stage theme">
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip active={stageTheme === 'light'} onClick={() => setStageTheme('light')}>Light</Chip>
            <Chip active={stageTheme === 'dark'} onClick={() => setStageTheme('dark')}>Dark</Chip>
          </div>
        </Group>

        {panel && <Group title="States">{panel}</Group>}
      </aside>

      {/* stage */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 40, overflowY: 'auto',
      }}>
        <div
          data-theme={stageTheme}
          style={{
            width: 402, minHeight: 200, borderRadius: 16,
            background: 'var(--page-bg)',
            border: `1px solid ${C.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          {node}
        </div>
      </main>
    </div>
  );
}
