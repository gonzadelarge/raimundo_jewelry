# Decisions

Choices that were made on purpose. Do not undo them without asking. The reasoning behind most of
them is in [plan-web-v1.md](plan-web-v1.md); this file is the short version plus the consequence
of changing it.

## Structure

| Decision | Why | If you change it |
|---|---|---|
| **The Home is the gallery.** No separate "Piezas" page | A catalogue site should show work on the first scroll | You add a page nobody needs and push the pieces one click away |
| **5 views, 3 menu items** | The client brief asked for 7 sections and a Home with 9 blocks. Too much for this catalogue | The menu stops being scannable |
| **Pieces are ordered by array position** | No featured flag, no sort field, no filters | More code for something a reorder already does |
| **Collaborations are not in v1** | They were in the brief; they can come back as a block in Info | - |
| **No shop, no prices, no cart** | Contact-driven sales. `Consultar esta pieza` opens email | A shop is a different project |
| **No newsletter** | Dropped from the brief | - |
| **Both languages share one view template** | A change lands in both languages at once | Two templates drift apart within a month |

## Content

| Decision | Why | If you change it |
|---|---|---|
| **No CMS. Content lives in the repo** | A small catalogue edited by one person. A CMS is cost without benefit at this size | - |
| **Content as TypeScript, not MDX** | The draft did not need long stories. MDX is planned, not built | Read [content.md](content.md) before starting |
| **Every text field carries `es` and `en`** | TypeScript catches a missing translation at build time | Missing translations reach production |
| **One data file, not two** | The reference project duplicated metadata across `projects.ts` and `site.ts` | The copies drift |

## Visual and motion

| Decision | Why | If you change it |
|---|---|---|
| **Marble backgrounds, always with a colour veil** | At full strength the veins compete with the jewels and cross the text. Measured contrast improves from 1.03 to 4.81 on the dark view | Text becomes unreadable over the veins |
| **`marmol_negro` belongs to El Baixo only** | One marble per meaning. The workshop is the dark view; a piece is shown on light `marmol_blanco`, which lets the jewel carry the contrast | Two views compete for the same identity |
| **The piece cover fills the first screen, sized by the photo** | The photo drives the layout through `--hero-w`, so the 4:5 stays exact and nothing is cut. A `max-height` would break the ratio and the shared-photo transition | The transition stretches the photo |
| **The piece photos break apart from a mosaic on scroll** | The whole set reads at once, then each photo gets its own room. Desktop only, off under reduced motion, and only transforms, so the real layout never moves | The lightbox and the click targets drift from what is drawn |
| **The front photo of a spread drops a shadow** | The two photos overlap. Without a shadow the front one reads as a flat cut, not as a photo in front | The overlap looks like a mistake |
| **The 4 C are a slogan, not four icon blocks** | The brief wanted icons; the identity is better served by one line | - |
| **No Tailwind, no Sass** | Scoped CSS in Astro plus one `global.css` covers it | A new dependency and two ways to write styles |
| **One React island only** | The photo block needs client state. Nothing else does | Shipping a React runtime for static markup |
| **The zoom view locks the page scroll** | Two scrollbars at once, one of them moving the page behind, is not a modal | The reader loses their place on the page |
| **The gallery product photo gets no reveal and no parallax, and keeps 4:5 everywhere** | The shared-photo transition lands on it. Hidden or shifted, the animation breaks | The main transition of the site breaks |
| **`prefers-reduced-motion` turns everything off** | The site is motion-heavy | - |
| **Marble is a fixed `.backdrop` layer, not `background-attachment: fixed`** | iOS Safari does not support it | Broken backgrounds on iPhone |

## Technical

| Decision | Why |
|---|---|
| **TypeScript 6.x** | `astro check` does not work with TypeScript 7 yet |
| **`allowBuilds: esbuild: false` in `pnpm-workspace.yaml`** | Without it the install stops |
| **`noindex` on every page** | Draft content. Removing it is part of launch. See [seo.md](seo.md) |
| **Astro `<Image>` with originals in `src/assets/`** | WebP in several sizes generated at build time, at the cost of one import line per photo |
| **Route helpers, never hardcoded paths** | The language switch and `hreflang` depend on them |

## Removed

| What | When | Why |
|---|---|---|
| The `Fondo_Sello_bajorelieve.png` photo in the El Baixo closing block | 2026-09-19 | It is a background asset, used as if it were a piece photo. The file stays in `src/assets/backgrounds/`, referenced by nothing |
| The four-point star next to the status on a piece page | 2026-09-19 | It read as a decoration on a data line. The star still opens the origin line on the Home |

## Open

Still undecided. Ask before choosing one.

- **Contact form.** Direct email links now, or an external service (Formspree, Web3Forms). Image
  upload usually needs a paid plan.
- **WhatsApp.** Currently marked as a draft channel. The team has to confirm it as a sales
  channel.
- **Analytics.** None, or a privacy-friendly tool that needs no cookie banner.
- **Domain.** Not chosen. Hosting is Cloudflare.
- **Carla Sans web licence.** Not confirmed. A blocker for launch.
- **Marble at high resolution.** The PNGs are 1024x1536 and go soft above about 1600 px wide.
  Landscape versions or seamless tiles would fix it.
- **Gallery length.** 9 pieces make the Home about 10,000 px tall. Past roughly 30 pieces, a
  filter or tighter spacing may be needed.
- **Source documents in git.** `texts/` holds a 3.8 MB PDF. Whether it belongs in the repo is
  unresolved.
