// Full-page loading shimmer (cal:2026-10-06, user: "run a full-page shimmer if
// it's loading"). Shown by App.jsx while boot.js waits for Rubik + the images.
// It is drawn in the LANDING pod's own shape so the reveal is continuous: the
// Pay home (immersive V-500 page, white-alpha blocks) or a standard white L0
// (slate blocks). One soft band sweeps the whole screen; tokens theme it.
import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_BG, PAGE_BG, SLATE_10, WHITE_10 } from '../tokens.js';

function Block({ w, h, r = 8, fill, style }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: fill, flexShrink: 0, ...style }} />;
}

function PayHome({ fill }) {
  const row = { display: 'flex', alignItems: 'center' };
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingBottom: 140 }}>
      <div style={{ ...row, justifyContent: 'space-between', padding: '12px 24px 12px 16px' }}>
        <Block w={124} h={36} r={100} fill={fill} />
        <div style={{ ...row, gap: 16 }}>
          <Block w={40} h={40} r={100} fill={fill} />
          <Block w={44} h={44} r={100} fill={fill} />
        </div>
      </div>
      <div style={{ ...row, gap: 12, padding: '16px 24px 12px' }}>
        <Block w={106} h={36} r={100} fill={fill} />
        <Block w={94} h={36} r={100} fill={fill} />
        <Block w={160} h={36} r={100} fill={fill} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Block w={128} h={72} r={16} fill={fill} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '0 48px 28px' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ ...row, justifyContent: 'space-between' }}>
            {[0, 1, 2].map((j) => <Block key={j} w={24} h={24} r={8} fill={fill} />)}
          </div>
        ))}
      </div>
      <div style={{ ...row, gap: 16, padding: '0 24px 8px' }}>
        <Block w="100%" h={48} r={100} fill={fill} style={{ flex: 1 }} />
        <Block w="100%" h={48} r={100} fill={fill} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

function StandardL0({ fill }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Block w={112} h={28} fill={fill} />
        <Block w={40} h={40} r={100} fill={fill} />
      </div>
      <Block w="100%" h={260} r={16} fill={fill} />
      <Block w="100%" h={136} r={16} fill={fill} />
      <Block w="100%" h={150} r={16} fill={fill} />
    </div>
  );
}

export default function BootShimmer({ immersive }) {
  const fill = immersive ? WHITE_10 : SLATE_10;
  return (
    <motion.div
      aria-busy="true"
      aria-label="Loading"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ position: 'absolute', inset: 0, zIndex: 3000, overflow: 'hidden', background: immersive ? BRAND_BG : PAGE_BG, paddingTop: 'var(--status-reserve, 54px)' }}
    >
      {immersive ? <PayHome fill={fill} /> : <StandardL0 fill={fill} />}
      {/* the sweep: a soft band of the page's own light passing over the blocks */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '55%',
          background: `linear-gradient(100deg, transparent, ${immersive ? WHITE_10 : PAGE_BG}, transparent)`,
          opacity: immersive ? 1 : 0.8,
        }}
        initial={{ x: '-110%' }}
        animate={{ x: '210%' }}
        transition={{ duration: 1.25, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}
