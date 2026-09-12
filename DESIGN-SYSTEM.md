# Drew Neros Visuals — Design System

Complete design tokens and component styles. **This is your single source of truth.** Edit this file, run `npm run sync-design`, commit, push to main, and it auto-deploys.

---

## Colors

### Light Mode

White background, dark foreground, film-inspired accents.

```css
:root {
  --bg: #FFFFFF;
  --fg: #111110;
  --fg-soft: #6B6863;
  --fg-faint: #ADADAD;
  --line: rgba(17,17,16,.07);
  --line-strong: rgba(17,17,16,.16);
  --film-red: oklch(0.58 0.10 28);
  --film-ochre: oklch(0.74 0.08 75);
  --film-teal: oklch(0.55 0.05 205);
  --film-olive: oklch(0.62 0.05 110);
  --frame-base: #e9e5dd;
}
```

### Dark Mode

Inverted light palette. Applied when `[data-theme="dark"]` is set.

```css
html[data-theme="dark"] {
  --bg: #0E0E0C;
  --fg: #EDEAE2;
  --fg-soft: #9A958B;
  --fg-faint: #605C55;
  --line: rgba(237,234,226,.06);
  --line-strong: rgba(237,234,226,.14);
  --frame-base: #1a1816;
}
```

---

## Typography

Load fonts from Google:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,500&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Font Families

```css
:root {
  --serif: "DM Sans", Helvetica, Arial, sans-serif;
  --sans: "DM Sans", Helvetica, Arial, sans-serif;
  --mono: "Geist Mono", ui-monospace, Menlo, monospace;
}
```

### Type Scale

Six steps. Display sizes are fluid (clamp); text sizes are fixed for readability.

```css
:root {
  --t-display: clamp(64px, 11vw, 168px);
  --t-title: clamp(38px, 5.2vw, 76px);
  --t-sub: clamp(24px, 2.6vw, 34px);
  --t-lead: 18px;
  --t-body: 15px;
  --t-fine: 11px;
}
```

### Type Classes

Apply via `.t-display`, `.t-title`, `.t-sub`, `.t-lead`, `.t-body`:

```css
.t-display { font-size: var(--t-display); line-height: .86; letter-spacing: -0.05em; font-weight: 500; }
.t-title { font-size: var(--t-title); line-height: .92; letter-spacing: -0.042em; font-weight: 500; }
.t-sub { font-size: var(--t-sub); line-height: 1.12; letter-spacing: -0.03em; font-weight: 500; }
.t-lead { font-size: var(--t-lead); line-height: 1.5; letter-spacing: -0.011em; }
.t-body { font-size: var(--t-body); line-height: 1.62; letter-spacing: -0.005em; }
.t-display, .t-title, .t-sub { text-wrap: balance; }
```

Meta and utility classes:

```css
.meta { font-family: var(--mono); font-size: var(--t-fine); letter-spacing: .06em; text-transform: uppercase; color: var(--fg-soft); }
.display { font-family: var(--sans); font-weight: 500; letter-spacing: -0.035em; line-height: .92; }
.italic { font-style: italic; font-weight: 400; }
.measure { max-width: var(--measure); }
```

---

## Space Scale

Eighth-based rhythm, seven steps.

```css
:root {
  --s-1: 8px;
  --s-2: 16px;
  --s-3: 24px;
  --s-4: 40px;
  --s-5: 64px;
  --s-6: 96px;
  --s-7: 140px;
  --measure: 62ch;
}
```

---

## Layout

Responsive rail (sidebar), gutters, content column.

```css
:root {
  --rail-w: clamp(256px, 20vw, 380px);
  --pad: clamp(20px, 4.5vw, 104px);
  --content-max: 1500px;
}
```

### Responsive Overrides

Narrower rail above 1100px:

```css
@media (max-width: 1100px) {
  :root { --rail-w: clamp(216px, 22vw, 256px); }
}
```

Mobile drawer below 860px:

```css
@media (max-width: 860px) {
  :root { --rail-w: 0px; }
  main { margin-left: 0 !important; margin-right: 0 !important; padding-top: 64px; }
  .mobile-menu-btn { display: flex !important; }
  .sidebar-desktop { width: min(322px, 84vw) !important; padding: 30px 26px 26px !important; transition: transform .38s cubic-bezier(.2,.7,.2,1) !important; }
  html:not(.nav-open) .sidebar-desktop { transform: translateX(-102%) !important; }
  html.nav-open .sidebar-desktop { transform: translateX(0) !important; }
}
```

### Sections

```css
.section {
  padding-block: var(--s-7) var(--s-6);
  padding-inline: var(--pad);
  max-width: calc(var(--content-max) + 2*var(--pad));
  margin-inline: auto;
}
.section + .section { padding-block-start: var(--s-6); }
main > .section:first-child { padding-block-start: var(--s-5); }

@media (max-width: 760px) {
  .section { padding-block: var(--s-5) var(--s-5); }
}
```

---

## Motion

Confident easing curve, no bounce. Used on all transitions and animations.

```css
:root {
  --ease-out: cubic-bezier(.16,1,.3,1);
}
```

### Frame Breathe (Scroll-Driven Animation)

Images resolve as they enter viewport, dim as they leave.

```css
@keyframes frameBreathe {
       0%{ opacity:.28; filter:blur(3px); transform:scale(.993) }
   7%, 80%{ opacity:1;   filter:blur(0);   transform:scale(1) }
     100%{ opacity:.16; filter:blur(5px); transform:scale(.984) }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .shot-img {
      animation: frameBreathe linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
    }
    .shot-img:not(.is-present) { opacity:inherit; filter:none; transform:none; }
  }
}
```

### Shimmer and Blink

```css
@keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
@keyframes blink { 50%{opacity:.25} }
.blink { animation: blink 1.4s steps(2) infinite; }
```

---

## Components

### Buttons

Single canonical size (44px), reused everywhere.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  background: var(--fg);
  color: var(--bg);
  font-family: var(--sans);
  font-size: 13px;
  letter-spacing: .02em;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  transition: transform .25s ease, background .25s ease, opacity .25s ease;
  border: 0;
  cursor: pointer;
}

.btn:hover { transform: translateY(-1px); }
.btn.ghost { background: transparent; color: var(--fg); border: 1px solid var(--line-strong); }
.btn.sm { height: 36px; padding: 0 14px; font-size: 12px; }
.btn.lg { height: 52px; padding: 0 24px; font-size: 14px; }
.btn:disabled, .btn[disabled] { opacity: .4; cursor: default; pointer-events: none; transform: none; }
```

### Chips

Tag or label pills.

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  border: 1px solid var(--line-strong);
  color: var(--fg);
  background: transparent;
}

.chip .dot { width: 6px; height: 6px; border-radius: 999px; background: var(--fg); }
```

### Image Frames

Photos load with blur-up effect. Baked 20px lqip data-URI from data.jsx.

```css
.shot-img {
  position: relative;
  overflow: hidden;
  background: var(--frame-base);
  transition: opacity .6s var(--ease-out), filter .6s var(--ease-out), transform .6s var(--ease-out);
}

.shot-lqip {
  position: absolute;
  inset: -2px;
  background-size: cover;
  background-position: center;
  filter: blur(16px) saturate(1.14);
  transform: scale(1.1);
  opacity: 1;
  transition: opacity .8s var(--ease-out);
}

.shot-img.is-loaded .shot-lqip { opacity: 0; }

.shot-img img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: 0;
  filter: blur(12px) contrast(1.04) saturate(.92);
  transform: scale(1.02);
  transition: opacity .7s var(--ease-out), filter 1s var(--ease-out), transform 1.2s var(--ease-out);
}

.shot-img.is-loaded img { opacity: 1; filter: blur(0) contrast(1.04) saturate(.92); transform: none; }

.shot-img:not(.is-present) { opacity: .16; filter: blur(4px); transform: scale(.988); }

@media (hover: hover) {
  .shot-img.is-loaded:hover img { transform: scale(1.032); filter: blur(0) contrast(1.08) saturate(1); }
}

.shot-accent { position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; border-radius: 999px; z-index: 2; }
```

### Image Placeholder

For prototyping without real photos.

```css
.ph {
  position: relative;
  background: repeating-linear-gradient(135deg, rgba(0,0,0,.05) 0 1px, transparent 1px 9px),
              linear-gradient(180deg, #d8d3c7 0%, #b9b2a3 100%);
  color: #3a352d;
  overflow: hidden;
  isolation: isolate;
}

html[data-theme="dark"] .ph {
  background: repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 1px, transparent 1px 9px),
              linear-gradient(180deg, #2a2723 0%, #1a1816 100%);
  color: #a6a098;
}

.ph .ph-label { position: absolute; inset: auto 10px 10px 10px; display: flex; justify-content: space-between; align-items: flex-end; font-family: var(--mono); font-size: 10px; letter-spacing: .06em; text-transform: uppercase; opacity: .85; }
.ph .ph-mark { position: absolute; top: 10px; left: 10px; font-family: var(--mono); font-size: 10px; letter-spacing: .08em; opacity: .7; }
.ph .ph-frame { position: absolute; inset: 6px; border: 1px solid rgba(0,0,0,.18); }
html[data-theme="dark"] .ph .ph-frame { border-color: rgba(255,255,255,.10); }
```

### Service Rows

Hover slides right, line darkens.

```css
.service-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: baseline;
  gap: var(--s-3);
  padding: var(--s-3) 0;
  border-top: 1px solid var(--line);
  transition: transform .3s var(--ease-out), border-color .3s var(--ease-out);
}

.service-row:last-child { border-bottom: 1px solid var(--line); }
.service-name { font-style: normal; transition: font-style .2s; }
.service-row-desc { color: var(--fg-soft); }

@media (hover: hover) {
  .service-row:hover { transform: translateX(10px); border-color: var(--line-strong); }
  .service-row:hover .service-name { font-style: italic; }
}
```

### Reveal Animations

Content fades in and slides up on mount.

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1);
}

[data-reveal].in { opacity: 1; transform: none; }

[data-reveal-slow] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 1s ease, transform 1s cubic-bezier(.2,.7,.2,1);
}

[data-reveal-slow].in { opacity: 1; transform: none; }
```

---

## Grain

Subtle film grain overlay across all pages.

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 200;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>");
  opacity: var(--grain-opacity);
  mix-blend-mode: multiply;
}

html[data-theme="dark"] body::after { mix-blend-mode: screen; opacity: .06; }
```

Define grain opacity:

```css
:root {
  --grain-opacity: .045;
}
```

---

## Scrollbar

Minimal, color-aware.

```css
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-thumb { background: var(--line-strong); border-radius: 8px; }
::-webkit-scrollbar-track { background: transparent; }
```

---

## Accessibility

### Reduced Motion

Content stays visible, animations stop.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  .shot-img, .shot-img:not(.is-present) { opacity: 1 !important; filter: none !important; transform: none !important; }
  .shot-img img { opacity: 1 !important; filter: contrast(1.04) saturate(.92) !important; transform: none !important; }
  .shot-lqip { opacity: 0 !important; }
}
```

### Hover Support

Hover effects only on devices that support it.

```css
@media (hover: hover) {
  /* hover effects in this block */
}
```

---

## Grid Stacking (Mobile)

2-column and 3-column grids stack to single column on mobile.

```css
@media (max-width: 760px) {
  .grid-2col { grid-template-columns: 1fr !important; }
  .grid-3col { grid-template-columns: 1fr !important; }
  .footer-grid { grid-template-columns: 1fr 1fr !important; row-gap: 28px !important; }
  .admin-2col { grid-template-columns: 1fr !important; gap: 32px !important; }
  .admin-buckets { grid-template-columns: 1fr !important; }
  .progress-pill { display: none !important; }
  .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
  .service-row { grid-template-columns: 1fr !important; gap: 4px !important; }
  .service-row:hover { transform: none !important; }
}

@media (max-width: 520px) {
  .footer-grid { grid-template-columns: 1fr !important; }
  .hero-h1 { font-size: clamp(48px, 14vw, 92px) !important; }
}
```

---

## Global Styles

Base element resets.

```css
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--bg); color: var(--fg); font-family: var(--sans); font-weight: 400; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
body { overflow-x: hidden; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }
img { display: block; max-width: 100%; }
::selection { background: var(--fg); color: var(--bg); }
.cursor-look { cursor: zoom-in; }
```

---

## Workflow

After editing this file:

```bash
npm run sync-design
git add DESIGN-SYSTEM.md index.html
git commit -m "chore: update design tokens"
git push origin main
```

The site auto-deploys from `main` within ~1 minute.

---

## Version

**v17** (September 2026)

- Blur-up loading ("the develop")
- Responsive rail sidebar
- Motion thesis: scroll/hover/load same material at three intensities
- Section rhythm via space scale
- Optical tracking on type scale
