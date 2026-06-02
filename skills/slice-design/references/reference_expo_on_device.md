---
name: Expo on-device — a slice web proto on a real phone (Path A WebView wrapper)
description: How to view any slice web proto edge-to-edge on a real phone via Expo Go, with the ready App.js template and every gotcha already solved (SDK-match, LAN, status-bar sync, edge-to-edge, safe-areas, overscroll, nav shadow). Read when the user wants the proto "on my phone" / "in Expo Go" / on-device. Working example: ~/claude/slice/projects/slice-expo.
type: reference
---

# Expo on-device — slice proto on a real phone

The fastest way to *feel* a slice web proto on a real phone, edge-to-edge, with no native rewrite. This is **Path A: a tiny Expo app whose only screen is a full-bleed WebView** pointing at the running web proto over the LAN. (**Path B** = a true React Native rewrite — native gestures + native safe areas; do that when the wrapper's limits bite.)

## The model
- **Two dev servers on the Mac:**
  - Proto (Vite), LAN-exposed: `npm run dev -- --host --port 8788` → reachable at `http://<mac-lan-ip>:8788` (`ipconfig getifaddr en0`).
  - Metro (Expo): `npx expo start` (:8081). This serves the *app shell*; the proto server serves the *content* the WebView loads. **Both must be running.**
- Phone + Mac on the **same wifi**. iOS: scan the QR (`exp://<lan-ip>:8081`) with the **Camera app** — logged-out Expo Go on iOS has no in-app scanner or manual-URL entry; the Camera is the way (or generate a QR: `npx qrcode "exp://<ip>:8081" -o qr.png -w 600`).
- Working reference: `~/claude/slice/projects/slice-expo`.

## Scaffold
```bash
cd ~/claude/slice/projects
npx --yes create-expo-app@latest slice-expo --template blank
cd slice-expo
npx expo install react-native-webview
# THEN pin the SDK to match Expo Go — see gotcha #1
```

## App.js (the template — drop-in)
Update `PROTO_URL` to your Mac's LAN IP. Everything else is the solved version.
```jsx
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const PROTO_URL = 'http://192.168.1.7:8788'; // proto over LAN (npm run dev -- --host)

// Injected into the page: (1) viewport-fit=cover so env(safe-area-*) resolves;
// (2) kill overscroll; (3) lift the bottom nav off the edge + clip ONLY horizontally
// so the button shadow shows; (4) sample the top bg every 250ms and tell native
// whether the iOS status-bar icons should be dark (light pods) or light (V-500).
const INJECT = `
(function(){
  try {
    var vp = document.querySelector('meta[name=viewport]');
    if (vp && vp.content.indexOf('viewport-fit') === -1) vp.content += ', viewport-fit=cover';
    var st = document.createElement('style');
    st.textContent =
      'html,body{overscroll-behavior:none!important;}' +
      '*{overscroll-behavior:none!important;}' +
      '.slice-bnav{bottom:16px!important;}' +
      '.slice-bnav-viewport{overflow-x:clip!important;overflow-y:visible!important;}';
    document.head.appendChild(st);
  } catch(e){}
  function lum(c){
    var m = c && c.match(/rgba?\\(([^)]+)\\)/); if(!m) return null;
    var p = m[1].split(',').map(function(s){return parseFloat(s);});
    if(p.length >= 4 && p[3] === 0) return null;
    return (0.299*p[0] + 0.587*p[1] + 0.114*p[2]) / 255;
  }
  function topLum(){
    var x = Math.floor(window.innerWidth/2);
    for (var y=6; y<64; y+=8){
      var el = document.elementFromPoint(x,y);
      while(el){ var L = lum(getComputedStyle(el).backgroundColor); if(L!==null) return L; el = el.parentElement; }
    }
    return 1;
  }
  var last='';
  function tick(){ var w = topLum() < 0.5 ? 'dark' : 'light'; if(w!==last){ last=w; window.ReactNativeWebView.postMessage(w); } }
  setInterval(tick, 250); tick();
})();
true;
`;

export default function App() {
  const [barStyle, setBarStyle] = useState('light'); // 'light' = white icons, 'dark' = black
  return (
    <View style={styles.root}>
      <StatusBar style={barStyle} />
      <WebView
        source={{ uri: PROTO_URL }}
        style={styles.web}
        originWhitelist={['*']}
        startInLoadingState
        renderLoading={() => (<View style={styles.loading}><ActivityIndicator size="large" color="#FFFFFF" /></View>)}
        injectedJavaScript={INJECT}
        onMessage={(e) => { const d = e.nativeEvent.data; if (d === 'dark') setBarStyle('light'); else if (d === 'light') setBarStyle('dark'); }}
        scrollEnabled bounces={false} overScrollMode="never"
        contentInsetAdjustmentBehavior="never" automaticallyAdjustContentInsets={false}
        mixedContentMode="always" allowsInlineMediaPlayback setSupportMultipleWindows={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#D30AD7' },
  web: { flex: 1, backgroundColor: '#D30AD7' },
  loading: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D30AD7' },
});
```

## Gotchas already solved (in the order they bite)
1. **Expo SDK MUST match the App Store Expo Go (it's now one-SDK-per-build).** `create-expo-app@latest` grabs the newest npm SDK (e.g. 56), often newer than the store Expo Go ships → *"Project is incompatible with this version of Expo Go."* Pin to the supported SDK: `npm i expo@~<sdk> && npx expo install --fix`. Find the SDK↔RN↔client map: `curl https://api.expo.dev/v2/versions/latest`. (Observed: user's Expo Go = **SDK 54** / RN 0.81.5.)
2. **Tunnel needs an account.** `npx expo start --tunnel` needs `@expo/ngrok` + an authtoken; anonymous tunnels time out. **Same-wifi (LAN) works with no account.** Off-network needs the **proto hosted publicly** (the WebView points at the LAN otherwise — tunnelling only moves the app shell, not the content).
3. **"do npx expo start" on the phone = Metro is down.** Metro (:8081) is separate from the proto server (:8788). Restart it.
4. **Edge-to-edge.** iOS WebView auto-insets for the status bar / home indicator (white bands). Kill with `contentInsetAdjustmentBehavior="never"` + `automaticallyAdjustContentInsets={false}`, and inject `viewport-fit=cover` so `env(safe-area-*)` resolves.
5. **Status-bar icon colour must track the pod** (HARD rule): black on white pods, white on the V-500 Valentino pod. The OS bar is RN-controlled, the pod is in the WebView → inject a luminance probe → `postMessage` → `expo-status-bar` `style`.
6. **Top gap / app bar too low.** The proto's mobile status reserve was over-padded (`max(88px, env+28)`). Use the real inset: **`max(44px, env(safe-area-inset-top, 0px))`** in the proto's `App.jsx` reserve (with viewport-fit=cover injected so env resolves).
7. **Bottom nav: shadow clipped + too much bottom space.** `.slice-bnav-viewport{overflow:hidden}` (horizontal dock clip) also cut the button shadow; an env-based lift over-raised it. Fix via injected CSS: `.slice-bnav{bottom:16px}` (buttons ~32px off the bottom) + `.slice-bnav-viewport{overflow-x:clip;overflow-y:visible}`.
8. **Overscroll.** `bounces={false}` (WebView prop) + injected `overscroll-behavior:none` kills vertical + horizontal rubber-band.

## Limits (when to graduate to Path B)
The WebView re-skins the web proto: gestures/motion are the web's, and safe-area handling is patched with injected CSS reaching into the proto's internals (fragile across proto changes). Off-network needs public hosting. **Path B (native RN rewrite)** owns the status bar, safe areas, and nav layout natively — no probes, no injected CSS.
