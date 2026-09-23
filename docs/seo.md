# SEO

Load this before touching meta tags, URLs, alt text, or anything related to launch.

## State today

**The site is indexable.** `noindex` was removed on 2026-09-23, with the whole launch set in the
same change. Before that, every page carried `<meta name="robots" content="noindex">`, and Google
kept showing the joke page from the very first commits, because a `noindex` page can never
replace what Google already stored.

What exists, all in `src/layouts/BaseLayout.astro` unless noted:

| Tag | Where it comes from |
|---|---|
| `<title>` | `{title} · Raimundo`, or the brand title on the Home |
| `<meta name="description">` | `copy[locale].meta.*` or the piece story, cut near 160 characters by `clamp()` |
| `<link rel="canonical">` | `Astro.url.pathname` plus `site` from `astro.config.mjs` |
| `hreflang` | Three links: self, the other language, and `x-default` pointing at Spanish |
| Open Graph and Twitter | Full set. `og:image` is 1200 x 630, built with `getImage()` |
| `<meta name="theme-color">` | Matches the view background |
| `lang` on `<html>` | `es-ES` or `en` |
| JSON-LD | Optional `schema` prop. `Organization` on the Home, `CreativeWork` plus `BreadcrumbList` on a piece |
| `sitemap-index.xml` | `@astrojs/sitemap`, legal pages filtered out |
| `robots.txt` | `public/robots.txt`, with the sitemap URL |

One gap: `@astrojs/sitemap` pairs languages only when the path after the locale matches. Our
slugs differ (`/contacto/` and `/en/contact/`, `/piezas/x/` and `/en/pieces/x/`), so those URLs
get no `xhtml:link` pair in the XML. The page `hreflang` tags are complete and correct, and
Google reads those first, so this is cosmetic.

What is still missing: a per-piece Open Graph image (every page falls back to `wired-04.jpg`),
real legal texts, and a reviewed English translation.

### Clearing the old joke page

Code alone does not remove a stored search result. In Google Search Console:

1. Claim `raimundojewelry.com` as a domain property.
2. Submit `https://raimundojewelry.com/sitemap-index.xml`.
3. URL Inspection on the Home, then **Request indexing**.
4. If the old snippet stays, use **Removals → Outdated content**.

Expect days, not hours.

## Rules that must not break

These hold now and after launch.

1. **URL patterns are fixed.** Spanish at the root, English under `/en/`. A piece keeps the same
   slug in both languages; only the segment changes (`/piezas/x/` and `/en/pieces/x/`). Changing
   a published slug breaks links and loses ranking, so do not rename a slug casually.
   **Every path ends with `/`.** Cloudflare Pages redirects the slashless form with a 307, so the
   slash is the real URL. `astro.config.mjs` sets `trailingSlash: "always"` to match.
2. **Every page needs a working `alternateHref`.** It feeds the `hreflang` link and the language
   switch. Build it with `routePath()` or `piecePath()`, never by hand.
3. **Slugs are kebab-case, lowercase, no accents.** `anillo-sombra`, not `anillo_sombra` or
   `anilloSombra`.
4. **Every page passes a real `description`.** It comes from `copy[locale].meta.*` for fixed
   pages and from the piece story for a piece. Keep it near 150 characters and make the first
   sentence stand alone.
5. **Titles stay short.** `BaseLayout` appends ` · Raimundo`, so a title should not repeat the
   brand name.
6. **Alt text.** A photo that identifies a piece gets the piece name. A photo in a collage or a
   background gets `alt=""` plus `aria-hidden="true"` on its wrapper. Never stuff keywords into
   alt text. Piece page photos are currently `${title} ${i + 1}`, which is weak: real alt text
   should describe the photo when the real photos arrive.
7. **Internal links go through the route helpers**, so a route change updates every link at once.

## Launch checklist

Done on 2026-09-23:

- [x] Set `site` in `astro.config.mjs` to `https://raimundojewelry.com`.
- [x] Add `<link rel="canonical">` to `BaseLayout`, built from `Astro.url` and `site`.
- [x] Make `hreflang` complete: self, the other language, and `x-default` pointing at Spanish.
- [x] Add Open Graph and Twitter card tags.
- [x] Create an OG image, 1200 x 630. `PieceView` passes `piece.spread[0]`; other views fall back
      to `wired-04.jpg`.
- [x] Add `@astrojs/sitemap` with `i18n` configured for `es` and `en`.
- [x] Add `public/robots.txt` with the sitemap URL.
- [x] Add structured data: `Organization` on the Home, `CreativeWork` plus `BreadcrumbList` on a
      piece page.
- [x] Remove `<meta name="robots" content="noindex">`.

Still open:

- [ ] Claim the domain in Google Search Console, submit the sitemap, request indexing.
- [ ] Replace the Info placeholder photos and review the draft English translation. Thin or
      duplicated text is a real ranking problem.
- [ ] Write the legal pages properly and put the footer links back.
- [ ] Give each non-piece view its own OG image instead of the `wired-04.jpg` fallback.

## Keywords

From the brand diagnosis. Use them as a check that the copy speaks the visitor's language, not as
a list to insert.

Core: joyería artesanal, joyería de autor, joyería contemporánea, joyería 3D, joyas en plata 925,
joyas con identidad, colecciones limitadas de joyería, joyería artesanal en Valencia.

Long tail: joyería artesanal con precisión 3D, joyas diseñadas en 3D y hechas a mano, anillos de
plata 925 personalizados, colgantes artesanales en plata 925, joyas únicas hechas por encargo,
proceso artesanal de joyería.

The diagnosis states the split plainly: SEO is how people find the brand, brand language is how
they remember it. Keyword pressure never overrides the tone rules in [brand.md](brand.md).
