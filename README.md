# Raimundo web

Website for Raimundo, contemporary jewelry made in El Baixo, Valencia.

Built with Astro 7, React (one island) and plain CSS. Static output, deployed on Cloudflare.
Spanish at the root, English under `/en`.

Current state: **draft v0**. Structure, navigation and transitions work. Most photos, piece data
and English copy are placeholders, and every page carries `noindex`.

## Run

Needs Node `>= 24` and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site in dist/
pnpm preview    # serve dist/
pnpm check      # type check, must stay at 0 errors
```

## Layout

- `src/pages` - routes only (Spanish at root, English under `/en`)
- `src/views` - one template per view, shared by both languages
- `src/components` - header, footer, gallery blocks, brand SVGs, React lightbox
- `src/data` - pieces, photo sets, contact channels
- `src/i18n` - routes, interface strings, page texts
- `src/scripts` - scroll effects, mobile menu, back link
- `src/styles/global.css` - tokens, fonts, marble background, view transitions

## Docs

Start at [AGENTS.md](AGENTS.md). It is the map: stack, where things live, and which document to
read for which task. Written for AI agents, but it is also the fastest way for a person to get
oriented.

| Document | Covers |
|---|---|
| [docs/brand.md](docs/brand.md) | Purpose, audience, positioning, tone, terms, what the brand is not |
| [docs/structure.md](docs/structure.md) | Views, routes, layouts, components, navigation, i18n |
| [docs/content.md](docs/content.md) | How to add a piece, where each kind of text lives, photos |
| [docs/design.md](docs/design.md) | Tokens, type, components, motion, accessibility |
| [docs/seo.md](docs/seo.md) | What exists, launch checklist, rules that must not break |
| [docs/development.md](docs/development.md) | Commands, build, deploy, dependency pins |
| [docs/decisions.md](docs/decisions.md) | Intentional choices and open questions |

Background, longer and historical:

- [docs/plan-web-v1.md](docs/plan-web-v1.md) - analysis and decisions taken before any code.
- [docs/draft-v0.md](docs/draft-v0.md) - what the draft does and what was tested.
