# SEO

Load this before touching meta tags, URLs, alt text, or anything related to launch.

## State today

The site is a draft. **Every page carries `<meta name="robots" content="noindex">`**, set in
`src/layouts/BaseLayout.astro`. That is deliberate: the content is placeholder, and indexing it
now would waste crawl budget on text that will change.

**Do not remove `noindex` unless the task is explicitly "launch the site".** When you do remove
it, the whole checklist below has to be done in the same change.

What exists:

| Tag | Where |
|---|---|
| `<title>` | `{title} · Raimundo`, or the brand title on the Home |
| `<meta name="description">` | From `copy[locale].meta.*`, or the piece story |
| `<link rel="alternate" hreflang>` | One link to the other language |
| `<meta name="theme-color">` | Matches the view background |
| `lang` on `<html>` | `es-ES` or `en` |

What does not exist yet: canonical URLs, Open Graph and Twitter cards, a sitemap, `robots.txt`,
structured data, a self-referencing `hreflang`, and an `x-default`.

## Rules that must not break

These hold now and after launch.

1. **URL patterns are fixed.** Spanish at the root, English under `/en`. A piece keeps the same
   slug in both languages; only the segment changes (`/piezas/x` and `/en/pieces/x`). Changing a
   published slug breaks links and loses ranking, so do not rename a slug casually.
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

Nothing here is built. Do it in one change, together with removing `noindex`.

- [ ] Set `site` in `astro.config.mjs` to the real domain. Astro needs it for absolute URLs.
- [ ] Add `<link rel="canonical">` to `BaseLayout`, built from `Astro.url` and `site`.
- [ ] Make `hreflang` complete: a self-referencing link, the other language, and `x-default`
      pointing at the Spanish version.
- [ ] Add Open Graph and Twitter card tags: `og:title`, `og:description`, `og:image`, `og:type`,
      `og:url`, `og:locale` and `og:locale:alternate`.
- [ ] Create an OG image. A per-piece image is better than one default, and the piece pages
      already generate WebP files that could feed it.
- [ ] Add `@astrojs/sitemap` with `i18n` configured for `es` and `en`.
- [ ] Add `public/robots.txt` with the sitemap URL.
- [ ] Add structured data: `Organization` (or `LocalBusiness`) on the Home, `Product` or
      `CreativeWork` on a piece page, `BreadcrumbList` where it helps.
- [ ] Remove `<meta name="robots" content="noindex">`.
- [ ] Replace placeholder photos, the sample story shared by the 8 draft pieces, and the draft English
      translation. Duplicate stories across pages are a real ranking problem.
- [ ] Write the legal pages properly.

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
