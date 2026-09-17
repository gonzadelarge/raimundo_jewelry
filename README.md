# Raimundo web

Website for Raimundo, contemporary jewelry made in El Baixo, Valencia.

Built with Astro 7, React (one island) and plain CSS. Static output.

## Run

Needs Node `>= 24` and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site in dist/
pnpm preview    # serve dist/
pnpm check      # type check
```

## Docs

- [docs/plan-web-v1.md](docs/plan-web-v1.md) - analysis, decisions, structure, visual identity, open items.
- [docs/draft-v0.md](docs/draft-v0.md) - the current draft: views, navigation, transitions, code map, placeholders.

## Layout

- `src/pages` - routes only (Spanish at root, English under `/en`)
- `src/views` - one template per view, shared by both languages
- `src/components` - header, footer, gallery blocks, brand SVGs, React lightbox
- `src/data` - pieces, photo sets, contact channels
- `src/i18n` - routes, interface strings, page texts
- `src/scripts` - scroll effects, mobile menu, back link
- `src/styles/global.css` - tokens, fonts, marble background, view transitions
