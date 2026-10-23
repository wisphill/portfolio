# Phi Nguyen — The Engineer's Archive

A static React + TypeScript portfolio with a mysterious, anime-inspired feel: a flat SVG night town beneath an all-seeing eye with drifting swirl clouds, a tarot card of The Fool, rounded cards, and SVG energy trails. It has a warm parchment light theme and a dark theme that fades from wine-black into crimson and ember orange. All text uses one serif family (Lora).

## Develop locally

Use Node.js 22.12 or later (Node 22 is specified in `.nvmrc`).

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. No API keys, accounts, databases, or environment variables are required.

## Build and preview

```bash
npm run build
npm run preview
```

The build runs TypeScript checks and produces a complete static website in `dist/`. Serve the directory over HTTP; opening `index.html` directly with a `file://` URL is not supported by the module bundle.

## Deploy to Cloudflare Pages

The site is prepared for deployment; it has not been published.

For a Git-connected Cloudflare Pages project:

| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | React (Vite)    |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Root directory         | Repository root |
| Node.js                | 22.12+          |

Alternatively, run `npm ci && npm run build` locally and upload the **contents of `dist/`** through Cloudflare Pages Direct Upload. No Worker or server is needed. The site uses in-page hash navigation, so there are no server routes to configure. `public/_headers` is copied into the build for basic response headers and caching of fingerprinted assets.

Official reference: [Deploy a React site to Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/).

## Edit the content

- `src/data.ts`: contact links, employment history, seven detailed projects, and technical skills.
- `src/App.tsx`: introduction copy, section layout, and the `NightScene` hero background.
- `src/styles.css`: light and dark theme colors (including the scene colors), layout, responsive rules, and animation.
- `public/Phi-Nguyen-CV.pdf`: the supplied CV, available as a download.
- `public/images/fool-tarot.jpg`: the hero tarot card illustration.
- `docs/ASSETS.md`: artwork prompt and generation details.

The portfolio content is based on the supplied CV. Dates labeled “present” reflect that document. Update those dates as your experience changes. The AWS credential is shown with its 2023 award year, without making a claim about current certification validity. The full original CV is included in the public download.

For how the hero scene, animations, random eye placement, and GPU performance work, see `docs/NOTES.md`.

## Interaction and accessibility

- Navigation, project cards, and the journey timeline send an energy trail from the previous interaction (or the header seal) to the selected element.
- Project cards stay short; each opens a native modal dialog with full contribution details and technologies, keyboard focus trapping, Escape-to-close, and focus restoration.
- The work section expands from three featured projects to all seven.
- The theme follows the system color scheme until the visitor picks one, and that choice is saved locally.
- Contact links open email, GitHub, and LinkedIn; the copy control copies the email address, with a mail link fallback if clipboard access is unavailable.
- A motion control defaults to the system's `prefers-reduced-motion` setting. Visitors can explicitly opt in or out, and that choice is saved locally.
- Keyboard focus indicators, a skip link, semantic sections, and a mobile menu support navigation.
- Fonts and artwork are local assets. There are no tracking scripts, remote font calls, or runtime API requests.

## Stack

React 19, TypeScript, Vite, plain CSS, native SVG, and self-hosted Fontsource fonts. The CV data remains separate from presentation components so the archive can be updated without a CMS.
