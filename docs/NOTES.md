# Design and engineering notes

A record of how the portfolio's look, animation, and rendering performance work, and why they were built this way. For content edits and deployment, see `README.md`. For the artwork's origin, see `docs/ASSETS.md`.

## Visual direction

- **Mood:** _Lord of Mysteries_-inspired, flat and papercut-like rather than realistic. The hero shows a gothic town at dusk under a watching eye, with The Fool tarot card as the centerpiece.
- **Typography:** one serif family, Lora, in weights 500, 600, 700, and 600 italic. Nothing thinner than 500 is used. Body text is 17–20px.
- **Themes:** a warm parchment light theme, and a dark theme that fades from wine-black into crimson and ember orange. Neither uses green or blue. All colors are CSS custom properties on `:root` and `:root[data-theme='dark']` in `src/styles.css`, so every scene layer re-themes automatically.
- **Shape language:** everything is rounded. Buttons and tags are pills, and cards and panels have 22–40px radii. SVG shapes with straight edges (spires, roofs, the eye's horns and spikes, sparkles, the crescent tips) get a stroke in their own fill color with `stroke-linejoin: round`. This rounds every corner without redrawing the paths.
- **Readability:** the page shows only short summaries. Project details live in a dialog, and the journey descriptions sit behind a disclosure.

## Hero scene structure

The hero (`.hero-stage`) is built as stacked layers. Back to front:

| Layer | Element | Animation |
| --- | --- | --- |
| Sky | CSS gradient on `.hero-stage` | none (static) |
| Sparkles | `SparkleLayer` SVG (top half only) | opacity twinkle |
| Watching eye | `SkyEye` | appears, disappears, relocates, bobs; iris looks around; eyelid blinks |
| Crescent moon | `CrescentMoon` | slow sway and tilt near the rooftops |
| Crows | `BirdLayer` (small box) | glide |
| Back clouds | `CloudStrip.cloud-back` | loop left to right, 120s |
| Far town | `TownStrip kind="far"` | loop left to right, 150s |
| Near town | `TownStrip kind="near"` | loop left to right, 90s (parallax) |
| Front clouds | `CloudStrip.cloud-front` | loop left to right, 70s |
| Tarot card and mini cards | `.hero-art` | float and bob |

Text, the card, and the floating mini cards sit above all scene layers. The stage uses `isolation: isolate` and `contain: layout paint`, so the scene can never leak into, or invalidate, the rest of the page.

## Animation techniques

### Seamless infinite strips (town and clouds)

Each strip is one SVG twice as wide as a "tile". Its content is drawn twice, at `translate(0)` and `translate(1200)`. The CSS animation moves the whole element from `translate3d(-50%, 0, 0)` to `translate3d(0, 0, 0)` and loops linearly. At the loop point the second copy sits exactly where the first one started, so the jump is invisible.

Because the distance is a percentage of the element's own width, the same keyframes work at every strip size. On mobile the town strip is made smaller (`1800×225px`) with no new keyframes.

Different durations per strip give a parallax depth effect.

### The randomly reappearing eye

The eye is nested three layers deep, so that each property has exactly one owner:

```
.sky-eye        position — transform set from JavaScript once per cycle
  .sky-eye-fade   opacity — CSS keyframes `eye-appear` (11s loop)
    .sky-eye-bob    small up/down float — CSS keyframes `eye-bob`
      frame SVG, iris, eyelid
```

Relocation is driven by the fade animation itself; there are no timers:

1. `eye-appear` runs from opacity 0, up to 1, holds, then back to 0. Its loop boundary is the moment the eye is fully invisible.
2. `SkyEye` listens for the `animationiteration` event on `.sky-eye-fade`. It checks `event.target`, because the iris and eyelid animations bubble up the same event.
3. On each iteration it picks a random center: 10–90% of the stage width and 10–60% of its height. It also picks a random scale of 0.65–1.1×. It then writes a single `transform: translate3d(...) scale(...)` onto `.sky-eye`, offset by the element's CSS anchor (`offsetLeft` and `offsetTop`).
4. The jump happens while the eye is invisible, so no transition is needed, and the eye fades in at its new spot.

This design has a few useful side effects:

- When the animation pauses (off-screen, Motion off, or reduced motion), no iteration events fire, so relocation stops on its own.
- When animations are disabled, the eye simply stays visible at its CSS default position.
- The work per cycle is one layout read and one style write, every 11 seconds.

### Looking around and blinking

- **Iris:** an SVG disc with a slit-pupil hole (`fill-rule: evenodd`), animated with `transform` only (`look-around`, 16s). It stares left, then right, then rolls through all eight directions, then returns to center.
- **No clipping:** the iris is sized so it can never leave the outer eye shape. Any overflow lands on the eyelid ring, which is the same color, so it's invisible. This avoids a `clip-path`, which would cost an extra GPU pass per frame.
- **Eyelid:** an almond the size of the eye opening, scaled with `scaleY` from its top edge (`eyelid`, two blinks per 9s).
- **Bottom fade:** the fade toward the bottom of the eye is an SVG `<mask>` inside the static frame artwork. It's drawn once, not a CSS `mask-image` evaluated every frame.

### Cursor trail

`CursorTrail` is a fixed, full-viewport `<canvas>`:

- **Recording:** `pointermove` (mouse only, `passive: true`) records points with timestamps.
- **Drawing:** a `requestAnimationFrame` loop runs only while points exist. Each frame drops points older than 420ms, then draws three passes of round-capped segments that thin and fade with age: a wide faint glow, a mid glow, and a gold core, with a glowing head dot.
- **Idle:** when the last point expires, the loop stops and the canvas is set to `visibility: hidden`. The compositor then skips it entirely until the mouse moves again.
- **Colors:** read from `--accent` and `--gold` once at the start of each burst of movement, never per frame.
- **When it's off:** it's disabled on touch devices (`pointer: fine` check) and when Motion is off.

### Scroll reveals

Section headings, project cards, timeline items, skill cards, and the contact panel have a `.reveal` class. One `IntersectionObserver` adds `.is-visible` once, then stops observing that element. The transition animates only `opacity` and `transform`, with a small stagger via `nth-child` delays.

## Performance practices

The goal is that the GPU composites pre-rasterized layers, and nothing is redrawn while the hero animates.

1. **Animate only `transform` and `opacity`.** These are the two properties the browser compositor can animate without layout or paint. No animation touches `left`, `top`, `width`, colors, filters, or SVG attributes.
2. **One animated layer per moving thing.** Animating shapes *inside* a single SVG forces the browser to repaint the whole SVG every frame. Every moving part is therefore its own HTML-level element, animated as a whole.
3. **Static art is drawn once.** The sky is a CSS gradient. The town, clouds, and eye frame are rasterized once into their layers and then only moved.
4. **`will-change` only where it's needed.** It's set only on elements that animate continuously, to avoid wasting GPU memory on layers that never move.
5. **No per-frame masks, clips, filters, or blurs.** The bottom fade of the eye is baked into its SVG. The iris needs no clip-path. The click energy trail uses a wide, faint stroke instead of an SVG `feGaussianBlur` filter. The sticky header uses a near-opaque background instead of `backdrop-filter: blur()`, which would re-blur the moving hero underneath it on every frame.
6. **Keep layer area small.** Every animated layer is a texture the GPU blends each frame, including its transparent pixels. The crow layer is a small box rather than full-hero size, and the sparkle layer covers only the top of the sky.
7. **Pause off-screen.** An `IntersectionObserver` on the hero sets `data-paused` on `.hero-stage` once it leaves the viewport. A CSS rule then sets `animation-play-state: paused` on the stage and all its descendants.
8. **Canvas at 1× resolution and hidden when idle.** The cursor glow is soft, so 1× looks identical to Retina resolution at about four times fewer pixels.
9. **Motion preferences.** The header toggle and `prefers-reduced-motion` disable every animation, show all reveal content, hide the trails, and leave the eye visible in place.

### How performance was measured

Measurements used headless Chrome driven over the DevTools Protocol, at 1440×900 and 2× pixel density with the dark theme and Motion on. Each test was a three-second trace of the idle, animating hero:

| Metric | Result |
| --- | --- |
| `Paint`, `Layout`, `RecalculateStyles` | 0 (no main-thread frames at all) |
| GPU render passes (`FinishPaintRenderPass`), before the GPU pass | 724 (about 4 per frame) |
| GPU render passes, after the GPU pass | 360 (about 2 per frame) |

The halving came from removing the eye's CSS mask and clip-path. The one remaining extra pass is the eye's group opacity, which is what lets it fade in and out as a single piece.

To check this yourself: open Chrome DevTools, go to **Rendering**, and enable **Paint flashing**. While the hero animates, no green flashes should appear. In the **Performance** panel, a recording should show compositor frames only, with no Paint or Layout events.

## Where things live

- `src/App.tsx`
  - Scene components: `SkyEye`, `CrescentMoon`, `TownStrip`, `CloudStrip`, `SparkleLayer`, `BirdLayer`, and `MiniCard`.
  - `CursorTrail`.
  - The `channel` energy-trail helper.
  - Observers for the active nav link, hero pausing, and scroll reveals.
- `src/styles.css`
  - Theme variables at the top.
  - Hero layer rules in the "Hero" block.
  - Keyframes near the bottom.
  - Responsive overrides at 1024, 820, and 400px.
  - Motion-off and reduced-motion rules at the end.
- `public/images/fool-tarot.jpg`: the hero tarot card.
