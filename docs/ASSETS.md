# Artwork and typography

## Hero artwork

Final website asset: `public/images/arcane-architect.webp`.

Created with the built-in image generation tool. It is an original atmospheric illustration influenced by the user's Lord of Mysteries references, rather than a copy of the attached branded posters. The generated PNG was converted to WebP for delivery, with no compositional edits. The full-resolution original remains in the generation output directory.

### Final generation prompt

Use case: stylized-concept. Asset type: original full-bleed hero artwork for a Lord of Mysteries-inspired software engineer portfolio. Create a cinematic, intricate dark Victorian occult illustration, landscape 1536x1024. A mysterious solitary elegant figure in a long black coat and Victorian top hat, face hidden in shadow, stands at the center-right, framed by a huge celestial astrolabe of fine antique gold rings, subtle runes and alchemical lines. Behind him faint gothic spires dissolve into green-black fog. Warm muted gold light at his chest and fingertips, fine golden filaments drift through deep emerald mist, a few black ravens near the distant upper edge. Refined etching and painterly concept-art hybrid, textured almost-black ink, subtle patinated brass detail, sophisticated and very atmospheric, luxurious dark fantasy book illustration. Right two-thirds has artwork, left third is mostly very dark green-black empty fog for HTML title overlay. Bottom dissolves naturally into black-green. Limited palette near-black #0a100f, desaturated verdigris, antique gold #c6a76b, a tiny pale cream highlight. Strong silhouette, restrained glow, elegant negative space. No text, no lettering, no logos, no watermark, no UI, no frame. Inspired by tarot, Victorian mystery and The Fool pathway, not a modern superhero.

The site now uses `public/images/fool-tarot.jpg` as the hero illustration: an original flat, papercut-style tarot card of The Fool (a masked clown magician beneath an all-seeing eye, with swirl clouds, gothic spires, and a black cat), generated with the built-in image tool using the user's Lord of Mysteries covers as style references. `arcane-architect.webp`, `arcane-mage.webp`, and `tarot-engineer.webp` are no longer referenced.

## Code-native ornament

The hero background (a CSS sky gradient plus separate animated layers: a large horned Fool eye sigil in the far-town color that fades out toward the bottom, with an iris that looks left, right, and all around plus blinking eyelids, a drifting crimson crescent moon in front of it, two looping town strips and two swirl-cloud strips that slide left to right at different speeds, floating mini tarot cards, gliding crows, and twinkling sparkles). Filled shapes use a matching round-joined stroke so no corner is sharp. A canvas cursor trail draws only while the mouse moves, and page sections fade in as they scroll into view. Every animation changes only `transform` or `opacity` on its own layer, so the browser composites frames without repainting, and the hero animations pause while the hero is off-screen, the eye seal, project symbols, line icons, and energy paths are SVG components authored for this portfolio in `src/App.tsx`. Their colors come from CSS variables, so the scene changes with the light and dark themes. They stay crisp at any size and require no image downloads.

## Typography

- Lora (500, 600, 700, and 600 italic) for all text.

Fonts are distributed through Fontsource packages and bundled locally; see their package license files for the font licenses.
