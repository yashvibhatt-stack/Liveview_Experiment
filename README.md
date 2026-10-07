# Live View experiment

React + TypeScript + Vite implementation of the **J6-1 · Critical alarm arrives** flow from the
Figma file *Live View – Playback Exploration*. Styling is plain CSS driven by design tokens
(`src/styles/tokens.css`, mirrored from the Figma variables); components follow the design-system
names and props (Badge, IconButton, Toggle, Tabs, NavRail, Topbar, LiveViewToolbar, VideoTile, EventToast…).

```
npm install
npm run dev
```

## Assets
Icons and camera feeds are exported from Figma into `public/assets/icons` and `public/assets/images`
(file names are listed in `src/assets.ts`).
