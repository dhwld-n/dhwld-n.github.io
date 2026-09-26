# design_2 — UI Design Record (Pixel/Space variant)

Archived reference for the experimental design that was compared against `design_1`.
**`design_1` was chosen as the final site.** This document preserves `design_2`'s
design decisions in case any of it is worth reusing later. The live folder at
`/design_2/` is left in place as a working demo of everything described below.

**Figma reference:** https://www.figma.com/design/mn7CJrWY7j2i2ntchvLpys — a static
visual mockup (site layout, color/type tokens, speech-bubble + burst detail, pixel
corner samples) built from this record, for browsing without spinning up the site.

## Concept

Same structural layout as `design_1` (sidebar / main grid / right rail), restyled as:
- **Pixel art**: hard-edged panels with a 2-step pixel "staircase" corner instead of
  rounded corners, plus a 1px diagonal chamfer at the inner joint of each step.
- **Space**: black background with a static multi-color starfield plus two additional
  animated overlay layers for a twinkle effect.
- **Accent**: black + indigo/purple-leaning blue (not the orange/pink used elsewhere).

## Color tokens

| Token | Light | Dark |
|---|---|---|
| `--page` | `#060606` | `#000000` |
| `--surface` | `#0b0b0b` | `#050505` |
| `--sidebar` | `#0e0e0e` | `#080808` |
| `--card` | `#121212` | `#0d0d0d` |
| `--card-tint` | `#191919` | `#141414` |
| `--ink` | `#f5f5f5` | `#f5f5f5` |
| `--ink-soft` | `#bababa` | `#b0b0b0` |
| `--ink-mute` | `#7c7c7c` | `#707070` |
| `--border` | `#eaeaea` | `#ffffff` |
| `--accent` | `#6366f1` | `#6c63ff` |
| `--accent-deep` | `#a5b4fc` | `#b3aeff` |
| `--accent-soft` | `#201f3d` | `#1c1a3a` |
| `--seg-1/2/3` (donut chart) | indigo / teal `#3fd0c9` / gold `#ffd23f` | indigo / cyan `#08d9d6` / gold `#ffd23f` |

Corner radii are all `0px` (`--r-lg/md/sm`) — every rounded corner from `design_1` is
replaced by the clip-path staircase below.

## Typography

Three typefaces, no bitmap/pixel font used for body text (kept legible):

- **OkDandan** (`https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/OkDanDan-Bold.woff2`) —
  headings (`h1, h2, h3, .brand, .hello-kicker`), used as fallback under DungGeunMo.
- **MitmiFont** (오뮤 예쁨체, local `omyu-pretty-subset.woff2`) — body text default,
  same font as `design_1`.
- **DungGeunMo** (둥근모꼴+ Fixedsys, `https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff`,
  chosen from https://noonnu.cc/font_page/250) — sidebar nav items (`.nav-item`) and
  section headings (`.block-heading`), for a chunkier pixel look on short labels.

## Pixel corner clip-path system

Two reusable clip-path shapes give a 2-step staircase corner with a 1px diagonal
chamfer softening the inner joint. Applied via literal clip-path strings (not CSS
custom properties, to avoid `var()`-in-`polygon()` portability issues).

**"Large" corner** (4px border) — used on `.app`, `.card`, `.projects-section`,
`.project-card`, `.rail-panel`, `.rail-card`, `.modal`:
```css
clip-path: polygon(12px 0,calc(100% - 12px) 0,calc(100% - 6px) 0,calc(100% - 6px) 4px,calc(100% - 4px) 6px,100% 6px,100% 12px,100% calc(100% - 12px),100% calc(100% - 6px),calc(100% - 4px) calc(100% - 6px),calc(100% - 6px) calc(100% - 4px),calc(100% - 6px) 100%,calc(100% - 12px) 100%,12px 100%,6px 100%,6px calc(100% - 4px),4px calc(100% - 6px),0 calc(100% - 6px),0 calc(100% - 12px),0 12px,6px 12px,6px 8px,8px 6px,12px 6px);
```

**"Small" corner** (3px border) — used on `.chips li`, `.contact-links a`,
`.lang-switch`, `.nav-item.is-active`, `.modal-icon`, `.modal-meta`, `.modal-close`,
`.modal-figure img`, `.modal-links a`:
```css
clip-path: polygon(6px 0,calc(100% - 6px) 0,calc(100% - 3px) 0,calc(100% - 3px) 2px,calc(100% - 2px) 3px,100% 3px,100% 6px,100% calc(100% - 6px),100% calc(100% - 3px),calc(100% - 2px) calc(100% - 3px),calc(100% - 3px) calc(100% - 2px),calc(100% - 3px) 100%,calc(100% - 6px) 100%,6px 100%,3px 100%,3px calc(100% - 2px),2px calc(100% - 3px),0 calc(100% - 3px),0 calc(100% - 6px),0 6px,3px 6px,3px 4px,4px 3px,6px 3px);
```

**Key lesson learned**: `border` doesn't bend to follow `clip-path` — it's always
painted as a rectangular band. These two shapes work because the cut size is close
to the border width, so most of the border band survives visually. For a shape
where that doesn't hold (see speech-bubble tail below), don't use `clip-path` at all
— stack plain rectangular bordered elements instead.

Every clipped element also swaps `box-shadow` for `filter: drop-shadow(Npx Npx 0
var(--border))`, since `box-shadow` gets clipped away by `clip-path` on the same
element but `drop-shadow` correctly follows the post-clip silhouette.

## Starfield background

`body` has a static tiled starfield (15 `radial-gradient` dot stops in pink `#ff6ba8`,
cyan `#6ee7ff`, yellow `#ffd23f`, lime `#9dff5c`, white; `background-size: 260px
260px`). Two extra `body::before`/`::after` layers (fixed, `z-index:-1`,
`pointer-events:none`) with fewer stops each, cross-fading via `twinkle-a`/`twinkle-b`
keyframes at slightly offset durations (3.4s / 4.6s, one delayed 1.1s) for a
non-uniform twinkle. Respects `prefers-reduced-motion: reduce`.

## Avatar

`avatar-space.png` (486×700, transparent background via flood-fill removal from a
user-supplied photo) used for both light/dark theme avatar slots. Gently floats via
`avatar-float` keyframes (`translateY(0) → translateY(-3px)`, 3s ease-in-out
infinite; amplitude was halved once from an original -6px after user feedback that
it was too strong). Respects `prefers-reduced-motion: reduce`.

## Brand mark: pixel Saturn logo

`.brand-mark` (24×24px) is `saturn-logo.svg` — a hand-built pixel-art Saturn
(generated procedurally: a distance-based shaded sphere + an anti-diagonal ring band
crossing it, plus one darker rim tone), recolored to the indigo palette
(`#b3aeff`/`#6c63ff`/`#4338ca` core/mid/ring) instead of the pink reference image
it was modeled after.

## Speech bubble system

Structure (`index.html`):
```html
<div class="speech-bubble">                 <!-- always-visible positioning container -->
  <img class="pop-burst" .../>              <!-- click-only starburst flash -->
  <span class="spark spark-N spark--star|dot [spark--white]"></span>  <!-- x12 -->
  <div class="speech-visual">               <!-- the part that actually pops in -->
    <div class="speech-body">...</div>
    <span class="speech-tail"></span>
  </div>
</div>
```

- **`.speech-visual`** plays `bubble-pop` (scale 0.3 → 1.14 overshoot → 1, opacity
  0→1, `cubic-bezier(0.34, 1.56, 0.64, 1)`, 0.5s) automatically once on every page
  load — a calm entrance so the greeting text is never hidden behind an interaction.
- **`.pop-burst`** (`pop-burst.svg`, 168px, a hand-drawn 8-point pixel starburst in
  indigo tones) and 12 **`.spark`** particles (mix of gold pixel stars
  `clip-path` diamonds, indigo dots, white dots; 105px travel radius) start at
  `opacity: 0` with no animation by default — they are a **click-only easter egg**.
  Clicking `.topbar-avatar` (light or dark) calls `replayBubblePop()` in
  `script.js`, which sets `element.style.animation = 'none'`, forces a reflow, then
  sets the real animation string inline — restarting all three layers
  (`.speech-visual`, `.pop-burst`, every `.spark`) together, fully in sync (no delay
  between burst and bubble).
- **`.speech-tail`**: intentionally **not** built with `clip-path` — a small blob +
  `::after` shows better here; `clip-path` and `border` don't compose well (see
  lesson above), and a wrapper with a `clip-path` also clips absolutely-positioned
  descendants outside its box, which is why `.speech-bubble` itself carries none.

A smoke/fog puff sprite (`pop-smoke.svg`) that used to play before the burst was
tried and then removed entirely per user request — the burst+bubble alone read
better without it.

## Interaction notes

- Theme toggle button removed from `.rail-controls` (kept only the language switch)
  — a deliberate design_2-only deviation from `design_1`.
- `robots: noindex` meta tag present (comparison page, not meant to be indexed).
- Bottom-left fixed Design 1 / Design 2 switcher links for side-by-side comparison
  during the decision process.

## Assets specific to design_2

- `avatar-space.png` — background-removed avatar art.
- `saturn-logo.svg` — pixel Saturn brand mark.
- `pop-burst.svg` — pixel starburst flash sprite.
- `DESIGN.md` — this file.

Everything else (`favicon.png`, `agent_with_gpt.html`, `beyond-busan-diagram.jpg`,
`omyu-pretty-subset.woff2`) is shared with the root site / `design_1` via `../`
relative paths.
