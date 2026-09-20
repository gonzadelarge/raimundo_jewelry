# AGENTS.md

Entry point for AI agents. Read this first, then load only the documents your task needs.

## What this is

Static website for **Raimundo**, contemporary jewelry made in El Baixo, Valencia. It is a catalogue
and a contact channel, not a shop. Two languages: Spanish at the root, English under `/en`.

State: **draft v0, five real pieces in**. Structure, navigation and transitions are built and
reviewed. `Wired`, `Dijo Sí`, `Trinacria`, `Buda & Eva` and `La Famiglia` are real, with their own
photos and stories, and the home hero uses their photos. The 8 invented placeholder pieces were deleted. The
Info and El Baixo photos and the English copy are still placeholders. Every page carries
`noindex`. The site is not launched.

Brand line: `Luxury jewelry with an underground spirit.` / `Hecho en El Baixo.`

## Stack

Astro 7.3.2, static output. React 19 for one island (the piece photo grid and its zoom view). Plain CSS, no Tailwind, no
Sass. TypeScript strict, `@/*` maps to `src/*`. Node >= 24, pnpm. Deploys to Cloudflare from
`dist/`.

```bash
pnpm dev      # localhost:4321
pnpm build    # static site in dist/
pnpm check    # astro check, must stay at 0 errors
```

## Where things live

| Path | Holds |
|---|---|
| `src/pages/` | Routes only. Each file is 5-16 lines and passes `locale` to a view. Never put markup here. |
| `src/views/` | One template per view. Spanish and English share the same template. |
| `src/components/` | Header, Footer, brand SVGs, gallery blocks, the React photo grid. |
| `src/data/pieces.ts` | The catalogue. One array, in gallery order. |
| `src/data/photos.ts` | Photo imports and the photo sets used by views. |
| `src/data/site.ts` | Email, Instagram, WhatsApp. |
| `src/i18n/ui.ts` | Short interface strings (menu, buttons, labels, status names). |
| `src/i18n/copy.ts` | Page texts and meta descriptions, per language. |
| `src/i18n/index.ts` | Route map ES/EN, `routePath()`, `piecePath()`. |
| `src/styles/global.css` | Tokens, fonts, reset, marble layer, reveal, view transitions. |
| `src/assets/` | Photos and marble backgrounds processed by Astro at build time. |
| `public/` | Files served as they are: favicon, Carla Sans woff2. |
| `texts/` | Brand source documents from the client. Read-only input, not site content. |
| `images/` | Untracked drop folder for new piece material. Not used by the build. `piece_1` to `piece_5` are already in the site. |

Content rule: text goes in `src/i18n/copy.ts` or `src/data/pieces.ts`, never hardcoded in a view.
Style tokens go in `global.css`, never as literal hex values in a component.

## Which document to load

| Task | Load |
|---|---|
| Write or change any visible text | [docs/brand.md](docs/brand.md) |
| Add or edit a piece, edit page copy, add photos | [docs/content.md](docs/content.md) |
| Change pages, routes, navigation, header, footer | [docs/structure.md](docs/structure.md) |
| Change colors, type, spacing, motion, components | [docs/design.md](docs/design.md) |
| Touch meta tags, URLs, alt text, sitemap, launch | [docs/seo.md](docs/seo.md) |
| Build, preview, deploy, dependencies, tooling | [docs/development.md](docs/development.md) |
| Change anything structural, or wonder "why is it like this" | [docs/decisions.md](docs/decisions.md) |

Most tasks need one or two of these. Do not read them all.

Background, only when the reason behind a decision is missing:
[docs/plan-web-v1.md](docs/plan-web-v1.md) (why the site is shaped this way) and
[docs/draft-v0.md](docs/draft-v0.md) (what the draft does and what was tested). Both are long and
historical. `docs/decisions.md` summarises what matters from them.

## Rules that break things silently

1. **Never remove `noindex`** from `BaseLayout.astro` unless the task is "launch". See
   [docs/seo.md](docs/seo.md).
2. **The gallery product photo** (`photo-a` in `PieceSpread.astro`) must not get `data-reveal` or
   `data-parallax`, and must keep the 4:5 ratio in the gallery, the piece header and the
   next-piece block. Break either and the shared-photo transition lands on a hidden or stretched
   image. On the piece page the ratio is held by `--hero-w`, which sizes the photo from the height
   left on screen. Do not swap it for a `max-height`, because that breaks the ratio.
3. **`marmol_negro` belongs to El Baixo only.** Piece pages use `blanco`. See
   [docs/design.md](docs/design.md).
4. **Both languages, always.** A new text field needs `es` and `en`. A new route needs an entry in
   the route map and a page under both `src/pages/` and `src/pages/en/`.
5. **TypeScript stays on 6.x.** `astro check` does not work with TypeScript 7 yet.
6. Run `pnpm check` after any change to `src/`. It must report 0 errors.

## Open questions

Contact form vs email links, analytics, domain, Carla Sans web licence. See
[docs/decisions.md](docs/decisions.md#open).
