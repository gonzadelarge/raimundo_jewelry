# Site structure

Load this to change pages, routes, navigation, the header or the footer.

## The three layers

```
src/pages/    route + locale only        5-16 lines, no markup
src/views/    one template per view      all the markup and scoped CSS
src/layouts/  BaseLayout.astro           <head>, backdrop, header, footer, router
```

A page file imports a view and passes `locale` (and, for a piece, the piece object). Spanish and
English share the same view, so a change to a view lands in both languages at once. Keep it that
way: never copy a view to make an English variant.

## Views and routes

| View | ES | EN | Template | Backdrop |
|---|---|---|---|---|
| Home | `/` | `/en` | `HomeView.astro` | marfil |
| Piece | `/piezas/[slug]` | `/en/pieces/[slug]` | `PieceView.astro` | blanco |
| Info | `/info` | `/en/info` | `InfoView.astro` | marfil |
| El Baixo | `/el-baixo` | `/en/el-baixo` | `BaixoView.astro` | negro-soft |
| Contacto | `/contacto` | `/en/contact` | `ContactView.astro` | marfil |
| Legal | `/aviso-legal`, `/privacidad` | `/en/legal-notice`, `/en/privacy` | `SimpleView.astro` | marfil |
| 404 | `/404` | - | `SimpleView.astro` | burdeos |

A piece keeps the **same slug in both languages**. Only the path segment changes
(`piezas` / `pieces`).

31 pages build today: 9 pieces x 2 languages, plus 12 fixed pages and the 404.

## i18n

`src/i18n/index.ts` is the single source of truth for routes.

```ts
routePath("contact", "en")        // "/en/contact"
piecePath("anillo-sombra", "es")  // "/piezas/anillo-sombra"
otherLocale("es")                 // "en"
```

Adding a route means four things: a key in `RouteKey`, both paths in the `routes` map, a page file
under `src/pages/` and one under `src/pages/en/`, and the labels in `src/i18n/ui.ts`.

Never build a path by string concatenation in a view. Always call `routePath` or `piecePath`,
because the language switch and the `hreflang` link depend on them.

## BaseLayout

Every view wraps its content in `BaseLayout`. Props:

| Prop | Purpose |
|---|---|
| `title` | Page title. Rendered as `{title} · Raimundo`. Empty string gives the brand title. |
| `description` | Meta description. Comes from `copy[locale].meta.*` or a piece story. |
| `locale` | `"es"` or `"en"`. |
| `alternateHref` | The same view in the other language. Feeds the `hreflang` link and the switch. |
| `current` | Which nav link is marked as the current page. |
| `backdrop` | `marfil`, `blanco`, `negro`, `negro-soft` or `burdeos`. Picks the marble and the theme. `negro` is reserved for El Baixo. |

The layout converts the marble PNG to WebP at build time and passes the URL as a CSS variable on
`<html>`. `data-theme="light|dark"` switches the colour tokens. Details in [design.md](design.md).

`<body>` carries `data-page`, the same value as `current`. It is the hook for a rule that only one
kind of page needs. Today it drops the footer top margin on a piece page, because the page already
ends with the next-piece band.

## Header

`src/components/Header.astro`, one component for both breakpoints.

- Desktop: wordmark, then `INFO · EL BAIXO · CONTACTO · ES / EN`. The current view is marked with
  `aria-current="page"`.
- Mobile (under 760 px): the `R` seal and the word `MENÚ`. A native `<dialog>` opens full screen,
  which gives the focus trap and `Esc` for free. It closes by itself if the window grows past
  761 px.
- Fixed. Transparent at the top, translucent with blur after 24 px of scroll (`data-scrolled`, set
  in `src/scripts/motion.ts`).
- It does not move or blink during a page change: `transition:name="site-header"` plus
  `transition:animate="none"`.
- The language link uses `data-astro-history="replace"`, so the browser back button does not jump
  between languages.

## Footer

`src/components/Footer.astro`: one row on desktop. The seal with `Hecho en El Baixo · Valencia` on
the left, the 4 C slogan centred, Instagram and email on the right. The grid is `1fr auto 1fr`, so
the 4 C sit in the middle of the page and not in the middle of the space left over. The 4 C never
wrap: `white-space: nowrap` plus `font-size: clamp(0.6rem, 0.95vw, 1rem)`, because they are the
widest of the three blocks. The footer is one row or one column and nothing in between, so below
900 px the three blocks stack, centred. That 900 px is the only breakpoint in the site that is not
760 px.

**On Info the middle block is a contact link, not the 4 C.** That page prints the four words and
their four lines in full, so the footer would repeat them. `BaseLayout.astro` passes `current` to
the footer, and `current === "info"` swaps the slogan for `t.nav.contact`, linked to
`routePath("contact", locale)`. Every other page keeps the slogan.

**The legal links are gone from the footer.** `/aviso-legal/`, `/privacidad/`,
`/en/legal-notice/` and `/en/privacy/` still build, but nothing links to them and the sitemap
filters them out, so Google will not find them. The strings
`t.footer.legal` and `t.footer.privacy` stay in `src/i18n/ui.ts` for whoever puts the links back.
Real legal texts are a launch item; see [seo.md](seo.md).

## Gallery blocks

- `gallery/Opening.astro` - the first screen of the Home. A collage of 5 photos (3 on mobile), the
  slogan, the origin line and one intro sentence. No buttons.
- `gallery/PieceSpread.astro` - one block per piece. Three layout variants rotate by
  `index % 3`, so the scroll does not repeat. The whole block is one link. It holds the product
  photo (the one that flies into the piece page), the worn photo, a vertical label, `VER PIEZA →`
  and the status line.

## The piece page

Three blocks, in this order:

1. **Cover.** Fills the first screen. Text on the left, the 4:5 photo on the right. The photo
   drives the size through `--hero-w`; see [design.md](design.md).
2. **Photo block.** The React island. On desktop the photos start packed in one screen and break
   apart into a column as you scroll. On mobile it is one column, full width.
3. **Next piece.** A band with a top line. The footer joins it with no gap.

## The React island

`src/components/react/PieceMedia.tsx` is the only React component: the photo block and the zoom
view on a piece page. `mosaic.ts` next to it packs the mosaic; it is plain TypeScript with no
React, so it can be read and tested on its own. Everything else is Astro. Keep it that way unless
a feature really needs client state.

The zoom view is a native `<dialog>` opened with `showModal()`. It locks the page scroll while it
is open, so there is one scrollbar and not two. A photo taller than the screen scrolls inside the
dialog.

## How the views connect

```
Home ──click a spread──▶ Piece ──"Volver" / browser back──▶ Home, same scroll position
                           ├─ "Siguiente pieza" ──▶ next Piece (wraps around the array)
                           ├─ "Consultar esta pieza" ──▶ /contacto?pieza=slug
                           └─ "Quiero algo similar" ──▶ /contacto?pieza=slug&motivo=commission
Header ──▶ Info, El Baixo, Contacto, other language
Footer ──▶ Instagram, email
```

`Volver` logic lives in `src/scripts/menu.ts`. If the reader came from the gallery in the same
language, it calls `history.back()` so the router restores the scroll position and the photo
returns to its place. If the piece was opened directly, the link goes to `/#slug`.

`ContactView.astro` has four text sections and no photos: the `Acércate` opening, the three
reasons to write, `Encargos`, and the five steps of `El proceso`. **There is no form.** Every
action is a `mailto:` link that opens the mail app with the subject already written, so answers
land in the same inbox as the footer link.

It reads `?pieza=` and `?motivo=` on the client, shows the piece name and adds it to every email
subject. The matching reason block gets an ámbar highlight.

Motion and transition details: [design.md](design.md). Why the structure is 5 views and not the 7
sections of the client brief: [decisions.md](decisions.md).
