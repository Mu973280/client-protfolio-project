# Client Portfolio Project

A Vite + React portfolio website for an independent video editor.

## Local development

```bash
npm ci
npm run web:dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run web:build
npm run web:preview
```

The Vercel configuration builds the site with `npm run web:build`, serves the
`dist` directory, and rewrites client-side routes to `index.html` so direct
navigation and refreshes work on pages such as `/work/after-hours` and
`/skills`.

## Deploying to Vercel

Import this repository into Vercel, keep the detected Vite settings, and
deploy. The project is configured for a private GitHub repository and contains
the client-facing placeholder identity used for sharing.
