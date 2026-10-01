# bllog

A minimal monochrome Astro editorial journal for GitHub Pages.

## Stack

- Astro 7 + Vite
- TypeScript
- Astro Content Layer with Markdown
- static GitHub Pages deployment
- light / dark mode
- lightweight client-side search over a build-generated JSON index
- RSS + sitemap + SEO metadata
- Google Sans + Google Sans Text

## Local development

```bash
npm install
npm run dev
```

Build and validate:

```bash
npm run check
npm run build
```

For this repository the local development path is:

```
http://localhost:4321/bllog/
```

Add posts under `src/content/blog/`. The filename becomes the article slug unless the content model is later extended with an explicit slug field.

## Content model

Each post supports:

- title
- description
- category
- tags
- coverImage
- pubDate
- updatedDate
- readTimeMinutes
- author
- featured
- draft

The homepage uses the first post with `featured: true` and falls back to the newest post.

## Composition

The UI intentionally stays restrained:

- real three-column desktop navigation
- single shell / surface system
- glass only for navigation and transient controls
- flat editorial cards instead of stacked blur effects
- grayscale imagery
- large typography with a fixed reading measure
- minimal client-side JavaScript
- reduced-motion support

CSS is split into focused files:

```
src/styles/
├─ tokens.css
├─ layout.css
├─ components.css
├─ prose.css
└─ global.css
```

## Routes

```
/
/journal/
/journal/<slug>/
/categories/
/categories/<category>/
/tags/
/tags/<tag>/
/search/
/about/
/rss.xml
/search-index.json
```

## GitHub Pages

The workflow runs on every push to `main`, validates the Astro project, builds static output and deploys it to GitHub Pages.

The Astro config derives the repository base automatically from `GITHUB_REPOSITORY`.

For a custom domain set `SITE` and `BASE=/`, then add `public/CNAME` when required.
