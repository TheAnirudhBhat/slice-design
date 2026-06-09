// Control panel — dev-chrome state controls for the debug panel + playground.
// Ported from the aibanker-design playground pattern (useControlPanel hook):
// a component's STATES (any prop it already exposes — disabled, tone, size,
// scrolled) are flipped via orthogonal controls, never enumerated as variant
// chips. See reference_state_exploration.md for the variant-vs-state doctrine.
//
// Styling is deliberately theme-INDEPENDENT (explicit light colours, not DLS
// tokens) for the same reason as DebugPanel: review tooling must stay readable
// whether the app stage is light or dark. Group/Chip here are the SHARED
// primitives — DebugPanel imports them (single source for dev-chrome controls).
//
// Two ways to use:
//   1. Primitives:  <Group title="Tone"><Chip active onClick={…}>plain</Chip></Group>
//   2. Declarative: const [state, panel] = useControlPanel({
//        tone: { kind: 'select', label: 'Tone', options: ['plain','subtle','chip'], default: 'plain' },
//        hit:  { kind: 'switch', label: 'Hit area', default: false },
//        name: { kind: 'input',  label: 'Monogram', default: 'R' },
//      });  // render {panel}, read state.tone / state.hit / state.name

import React, { useMemo, useState } from 'react';

export const C = {
  bg: '#FFFFFF',
  border: '#E6E9ED',
  text: '#171A1F',
  textDim: '#6B7280',
  chipBg: '#F2F4F7',
  chipActiveBg: '#171A1F',
  chipActiveText: '#FFFFFF',
  accent: '#D30AD7',
};

export function Group({ title, children }) {
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

export function Chip({ active, onClick, children }) {
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

function SwitchRow({ label, on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: 0, border: 'none', background: 'transparent',
        cursor: 'pointer', font: 'inherit', fontSize: 13, color: C.text, minHeight: 28,
      }}
    >
      <span>{label}</span>
      <span style={{
        position: 'relative', width: 36, height: 20, borderRadius: 100, flexShrink: 0,
        background: on ? C.chipActiveBg : C.chipBg,
        transition: 'background 150ms ease',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: on ? 19 : 3, width: 14, height: 14,
          borderRadius: 100, background: C.bg, boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          transition: 'left 150ms ease',
        }} />
      </span>
    </button>
  );
}

function InputRow({ label, value, onChange }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 12, fontSize: 13, color: C.text, minHeight: 28,
    }}>
      <span style={{ flexShrink: 0 }}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 140, padding: '5px 8px', borderRadius: 6, fontSize: 13,
          border: `1px solid ${C.border}`, background: C.bg, color: C.text,
          outline: 'none', font: 'inherit',
        }}
      />
    </label>
  );
}

// Declarative hook. Schema: { key: { kind: 'select'|'switch'|'input', label,
// options? (select), default } }. Returns [state, panelNode]. Schema is
// captured on first render — declare it inline as a literal.
export function useControlPanel(schema) {
  const stableSchema = useMemo(() => schema, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [state, setState] = useState(() => {
    const s = {};
    for (const k in stableSchema) s[k] = stableSchema[k].default;
    return s;
  });

  const panel = useMemo(() => (
    <div>
      {Object.entries(stableSchema).map(([key, field]) => {
        if (field.kind === 'select') {
          return (
            <Group key={key} title={field.label}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {field.options.map((o) => {
                  const opt = typeof o === 'string' ? { label: o, value: o } : o;
                  return (
                    <Chip
                      key={opt.value}
                      active={state[key] === opt.value}
                      onClick={() => setState((s) => ({ ...s, [key]: opt.value }))}
                    >
                      {opt.label}
                    </Chip>
                  );
                })}
              </div>
            </Group>
          );
        }
        if (field.kind === 'switch') {
          return (
            <Group key={key} title={field.label}>
              <SwitchRow
                label={state[key] ? 'On' : 'Off'}
                on={state[key]}
                onToggle={() => setState((s) => ({ ...s, [key]: !s[key] }))}
              />
            </Group>
          );
        }
        if (field.kind === 'input') {
          return (
            <Group key={key} title={field.label}>
              <InputRow
                label=""
                value={state[key]}
                onChange={(v) => setState((s) => ({ ...s, [key]: v }))}
              />
            </Group>
          );
        }
        return null;
      })}
    </div>
  ), [state, stableSchema]);

  return [state, panel];
}
