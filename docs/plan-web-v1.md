# Raimundo web - plan v1

Analysis and decisions before writing any code. Date: 2026-09-17. Revision 2.

Sources:

- `texts/raimundo_web_v1.md` - web structure brief (Markdown copy of `Raimundo_Estructura_Web_v1.docx`).
- `texts/raimundo_texts.md` - copy for every section.
- `texts/RAIMUNDO DIAGNOSTICO.pdf` - 46-page brand diagnosis, identity and communication plan.
- `C:\Users\34617\Desktop\code\ponytojas.dev` - reference for the way of working (code).
- https://www.danielaristizabal.net/ and https://www.williamlachance.com/ - references for the structure (site).

The texts are a reference, not a contract. Section 7 lists what we drop or change from them.

**Change from revision 1.** The brief proposed 7 menu sections and a Home with 9 blocks. That is too much for a catalogue. Revision 2 reduces the site to 5 views, and the gallery of pieces is the Home.

---

## 1. Decisions taken

| Topic | Decision |
|---|---|
| Structure | 5 views: Home (gallery), Piece, Info, El Baixo, Contacto |
| Gallery | Photo pair per piece (product + worn), Aristizabal style |
| Collaborations | Not in v1 |
| Mobile menu | `R` seal + `MENU` word that opens a full-screen overlay |
| Las 4 C | A slogan (`Carácter · Curiosidad · Cuidado · Cercanía`), no icons |
| Draft | Built: see `docs/draft-v0.md` |
| Framework | Astro, same setup as ponytojas.dev (Astro 7, Node >= 24, pnpm) |
| Content model | ponytojas pattern: MDX files imported by hand into TypeScript data files |
| Content format | `.mdx` |
| Languages | Spanish and English at launch |
| Translated content | One folder per piece: data and photos once, `es.mdx` and `en.mdx` for the text |
| URLs | Spanish at root, English under `/en` |
| React | Yes, like ponytojas (React 19 + `@mdx-js/rollup`) |
| Styling | Scoped CSS in `.astro` files + CSS Modules for React components + one `global.css`. No Tailwind, no Sass |
| Fonts | Carla Sans (headings, menu, labels) + Montserrat (body text) |
| Page transitions | Astro `ClientRouter` (View Transitions), with the piece photo moving from the gallery into the piece page |
| Forms | Open (section 9) |
| CMS | None. Content lives in the repo |
| Shop | None in v1 |

---

## 2. Reference sites

Both sites are built with Wix. We take the structure and the way they show work, not the code.

### 2.1 danielaristizabal.net (art director, 3D)

**Structure.** The Home is the portfolio. There is no separate "Work" page.

- Logo top left, a small menu icon top right. The menu opens as an overlay with only **Info.** and **Contact.**
- First screen: a loose collage of 7 images at different sizes and positions. There is no headline and no intro text.
- Then one block per project, about 25 in total, each separated by a lot of empty space. Each block has:
  - 2 images that overlap with an offset, one behind and one in front.
  - A vertical label on the left side, rotated 90 degrees: `Project / The Countdown. Samsung.`
  - A small `View Project →` link on the right.
- The footer has only Instagram and Behance, fixed at the bottom corners.
- The background is one flat color for the whole site.

**Project page** (`/samsung`, `/the-pool` and so on, flat URLs):

- A dark header with the title, 2 or 3 lines of text and a `← Go back` link.
- After that, only images and videos: full width, or in pairs with no gaps. No more text.

**Contact.** A short form: name, email, phone, message. Links to Instagram and Behance under it.

**What works for Raimundo:** the Home is the catalogue, each piece shows as a pair of photos, the labels are small and the photos are large, and the project page is almost all images.
**What does not:** the mobile version is broken (images cut and misplaced), the menu is hidden behind an icon with only 2 items, and the Info page is empty.

### 2.2 williamlachance.com (painter)

**Structure.** A fixed menu on the left side, always visible: `HOME · WORKS · SPECIAL PROJECTS · EXHIBITS · NEWS · ABOUT · CONTACT · SHOP`. Social icons at the bottom of that column.

- Home: a large name, then one block per section. Each block has a huge title (`WORKS`, `EXHIBITS`) over one image, a thin vertical label and a `MORE →` link. The background is a full-page photo.
- Works: a dense grid of paintings, with no text.
- About: one photo and one paragraph of bio, side by side.
- Contact: a form.

**What works for Raimundo:** the menu is always visible and short, and the About page is one photo with one text.
**What does not:** the Home is only an index of other pages, so it has 8 sections and no work on the first screen. This is the opposite of what we want.

### 2.3 What we take

| Idea | From |
|---|---|
| The Home is the gallery. Pieces appear on the first scroll | Aristizabal |
| Each piece is a pair of photos with an offset, a vertical label and a "view" link | Aristizabal |
| The piece page is a short text at the top, then only photos and video | Aristizabal |
| A very short menu, always visible (no hidden menu on desktop) | LaChance |
| Info as one image and one text, not many blocks | LaChance |
| One background for each view, lots of empty space (for Raimundo: calmed marble, see 5.4) | Both |
| Footer with only the essentials | Both |

---

## 3. Site structure

### 3.1 Views

| View | ES | EN | Content |
|---|---|---|---|
| Home | `/` | `/en` | Short opening + gallery of all pieces |
| Piece | `/piezas/[slug]` | `/en/pieces/[slug]` | One piece: data, story, photos, consult button |
| Info | `/info` | `/en/info` | What Raimundo is, process, 4 C |
| El Baixo | `/el-baixo` | `/en/el-baixo` | Place, history, people, Rudi |
| Contacto | `/contacto` | `/en/contact` | Commissions + contact reasons + channels |
| Legal | `/aviso-legal`, `/privacidad` | `/en/legal-notice`, `/en/privacy` | Footer links only |
| 404 | `/404` | - | Link back to the gallery |

Assumption: a piece keeps the same slug in both languages.

### 3.2 What merges into what

| Brief section | Goes to |
|---|---|
| Inicio | Home (opening) |
| Piezas (list) | Home (gallery) |
| Piezas destacadas | Removed. The gallery order does this job: the first pieces are the featured ones |
| Ficha de pieza | Piece |
| Qué es Raimundo | Info |
| Proceso | Info |
| Las 4 C | Info |
| Colaboraciones (list and detail pages) | Not in v1. Can come back later as a block in Info |
| El Baixo + Historia + Rudi | El Baixo |
| Encargos | Contacto |
| Contacto | Contacto |

The brief had 7 sections + 9 Home blocks + list and detail pages. The new site has 5 views.

### 3.3 Menu and footer

**Header**, the same in every view:

```
RAIMUNDO                              INFO   EL BAIXO   CONTACTO   ES/EN
```

- The wordmark links to the Home.
- Desktop: the 3 links and the language switch are always visible.
- Mobile:

  ```
  (R)                                                    MENU
  ```

  The `R` seal links to the Home. The `MENU` word (not an icon) opens a full-screen overlay on carbón: `INFO`, `EL BAIXO`, `CONTACTO` in large Carla Sans, `ES / EN`, and Instagram and email at the bottom. `CERRAR` or `Esc` closes it. The overlay fades in, and each link moves up a little, one after the other.
- The header stays in place during page transitions (see section 4).

**Footer**, the same in every view:

```
Hecho en El Baixo · Valencia        Instagram   Email        Aviso legal · Privacidad
```

### 3.4 Home

**Opening (first screen).**

- A loose collage of 3 to 5 photos: macro, on body, workshop. It works like the Aristizabal opening.
- `Luxury jewelry with an underground spirit.` and `Hecho en El Baixo.` in small type. No big intro paragraph and no buttons.
- The first piece of the gallery starts to show at the bottom of the screen, so people know to scroll.

**Gallery.** One block per piece, in the order of `src/data/piezas.ts`.

```
 PIEZA / ANILLO SOMBRA. LA SOMBRA X RAIMUNDO.         (vertical label, left)

        +--------------+
        |   photo 1    |
        |   (product)  |  +---------------+
        +--------------+  |    photo 2    |
                          |   (on body)   |          VER PIEZA ->
                          |               |
                          +---------------+
                                                     LIMITADA · 2026
```

- **Photos.** Photo 1 is the product and photo 2 is the piece worn. For jewelry this pair explains the piece better than any text.
- **Layouts.** 3 layout variants rotate (product left or right, different overlap and size), so the scroll does not repeat itself.
- **Label.** The vertical label shows `Pieza`, the name and the collection. It is written in Carla Sans.
- **Status and year.** Small, next to the link.
- **Link.** The whole block is a link. The `VER PIEZA ->` text only makes that clear.
- **Filters.** None in v1. If the catalogue grows past about 30 pieces, we can add a small filter by status.
- **Mobile.** The 2 photos stack with a small offset, and the vertical label becomes a normal line above them. We design this layout on purpose, because Aristizabal's mobile view is broken.

### 3.5 Piece

Aristizabal pattern: short text first, then images.

1. **Header** (carbón background):
   - `← Volver` (back to the gallery, at the same scroll position).
   - Name in Carla Sans, large.
   - A data line: `Colección · Año · Materiales · Estado · Edición 3/12`.
   - The story: the MDX body, 2 to 5 lines.
   - `CONSULTAR ESTA PIEZA` button and a `Quiero algo similar` link. Both go to Contacto with the piece name filled in.
2. **Photos and video**: full width or in pairs, no gaps, no text. Click opens a lightbox (ponytojas has one we can adapt). On mobile you swipe through the photos.
3. **Next piece**: a full-width block with the next piece's name and first photo.

The MDX body can use components (a video, a photo pair) when a piece needs more than the default layout.

### 3.6 Info

One page, read top to bottom. Short sections with a small title each. The page menu does not need anchors.

1. **Raimundo.** One strong photo + "UNA FORMA PROPIA DE ENTENDER LA JOYERÍA." and the presentation text (LaChance About pattern).
2. **Proceso.** "DEL DISEÑO AL TALLER." A short intro, then the 5 steps in a row (Idea, Diseño, Prototipo, Taller, Acabado). Each step has one photo or short clip and one line of text. On mobile it becomes a row you swipe sideways.
3. **Las 4 C.** Treated as a slogan, not as 4 blocks with icons: `Carácter · Curiosidad · Cuidado · Cercanía` in large Carla Sans, with one line about the 4 C of the diamond. The same slogan also sits in the footer.

### 3.7 El Baixo

The place and the people, with more photos than text. Carbón background, like a workshop.

1. **Entra en El Baixo.** A full-width workshop photo and the opening text.
2. **La historia.** "UN PROYECTO EN EVOLUCIÓN." Text next to photos.
3. **La gente.** Jesús, his brothers, partners, friends and artists. Photos with first names only, not an org chart.
4. **Rudi.** One photo and a short paragraph.
5. **Hecho en El Baixo.** The stamp graphic and the closing line.

### 3.8 Contacto

Encargos and Contacto become one view.

1. **Acércate.** One line of intro.
2. **Encargos.** "PIEZAS QUE EMPIEZAN CON UNA IDEA." A short text, then the 5 steps in one line: Idea, Conversación, Diseño y pruebas, Taller, Entrega y postventa.
3. **Reasons.** 3 blocks: Piezas, Encargos, Otros proyectos. Collaboration proposals go under Otros proyectos. Each block opens the contact channel with the subject filled in. When the reader comes from a piece page, the piece name is already there.
4. **Channels.** Email, Instagram, WhatsApp (if the team wants it), "Hecho en El Baixo · Valencia".

The form question stays open (section 9). This layout works with a form or with direct links.

---

## 4. Transitions between views

We use Astro's `ClientRouter` (from `astro:transitions`), which ponytojas already uses. It turns normal links into animated page changes with the browser's View Transitions API. Browsers without support load the page normally, with no animation.

| From -> to | Transition |
|---|---|
| Gallery -> Piece | **Shared photo.** The piece's first photo moves and grows from its place in the gallery into the header of the piece page. The rest of the page fades in. Done with the same `transition:name={`pieza-${slug}`}` on both photos |
| Piece -> Gallery (`Volver` or browser back) | The same movement in reverse. The gallery comes back at the scroll position where the reader left it |
| Piece -> Next piece | The next-piece photo grows to become the new header |
| Any view -> Info, El Baixo, Contacto | Short crossfade (about 250 ms). The header does not move or blink, because it uses `transition:persist` |
| Mobile menu -> any view | The overlay closes with a fade, then the normal crossfade runs |
| Language switch | No animation. Same view, other language, top of page |
| Background color change (marfil <-> carbón) | The color fades together with the page, so there is no white flash |

Inside a view:

- **Gallery scroll.** Each piece block fades in and moves up a little when it enters the screen. The two photos in a pair can move at slightly different speeds (light parallax) to show the depth of the overlap. ponytojas has the `data-reveal` pattern for this.
- **Hover on desktop.** Photo 2 of the pair moves a few pixels and the `VER PIEZA ->` arrow moves. Nothing else.
- **Lightbox.** Opens with a quick fade and closes with `Esc`, a click outside, or a swipe down on mobile.
- **Reduced motion.** With `prefers-reduced-motion`, every transition becomes an instant change and parallax is off.

---

## 5. Visual identity

### 5.1 Palette

From PDF page 25. Page 24 shows only black and white. We take page 25 as the final version.

| Token | Name | Hex | Use share |
|---|---|---|---|
| `--carbon` | Negro carbón | `#111111` | 40% |
| `--marfil` | Marfil cálido | `#F3EFE7` | 30% |
| `--gris` | Gris metal | `#7A7A76` | 12% |
| `--blanco` | Blanco puro | `#FFFFFF` | 8% |
| `--ambar` | Ámbar / oro quemado | `#D79B24` | 6% |
| `--burdeos` | Burdeos oscuro | `#5C1F2A` | 4%, optional |

Background per view: see 5.4. Each view uses a marble texture calmed with a layer of its base color (marfil or carbón).

Contrast check (WCAG, 4.5 is the minimum for body text, 3 for large text):

| Pair | Ratio | Rule |
|---|---|---|
| marfil on carbón | 16.47 | Any text |
| carbón on marfil | 16.47 | Any text |
| ámbar on carbón | 7.74 | Any text. Accent text on dark views |
| burdeos on marfil | 10.87 | Any text |
| gris on carbón | 4.38 | Large text and borders only |
| gris on marfil | 3.76 | Large text and borders only |
| ámbar on marfil | 2.13 | **Never for text.** Button backgrounds with carbón text, lines, icons |
| burdeos on carbón | 1.51 | Never for text |

For muted text we need a darker gray on marfil and a lighter gray on carbón. The exact values get fixed when we build the tokens.

### 5.2 Fonts

- **Carla Sans** (`fonts/carla-sans.ttf`). This is the logo font. It has no lowercase: lowercase letters come out as capitals. Use it for names, menu, buttons, vertical labels and status. It has the Spanish accents and `ñ`. We convert it to `woff2`.
- **Montserrat** (Google Fonts, OFL licence). Body text and piece stories. Self-hosted `woff2`, weights 300, 400 and 600 only.
- **To check:** the web licence of Carla Sans. The file does not say whether web embedding is allowed.

The PDF also names Gotham Light (paid licence, not used). It asks for an "underground" font for special titles, and page 28 uses a typewriter mono for stamps. Both stay out of v1.

### 5.3 Logo and graphic elements

- Wordmark `RAIMUNDO` and the `R` seal in an oval (PDF page 23). Both exist as SVG, AI, EPS and PNG in `raimundo_google_drive/branding/logotipo` and `branding/sello`. The draft uses the SVGs.
- Graphic elements (PDF page 28): stamps ("Hecho en El Baixo" round and square), the `R/EB` mark, ink strokes and textures, and the four-point star. The 4 C do not get icons. The PDF says "Mike" will design them. We need them as SVG or transparent PNG.
- Where they go in the new structure: the stamp in El Baixo and in the footer, the ámbar star as a small mark next to the status label. The draft draws the star in CSS until the file exists.

### 5.4 Background templates (marble)

Source: `raimundo_google_drive/branding/Plantillas`. 9 PNG files, all 1024x1536 (portrait), 1.8 to 3.4 MB each.

| File | Average color | Palette match |
|---|---|---|
| `marmol_marfil.png` | `#DFD7CC` | Marfil |
| `marmol_negro.png` | `#11150F`, green and gold veins | Carbón + ámbar |
| `marmo_perlado.png` | `#9F9FA0` | Gris metal |
| `marmol_blanco.png` | `#E5E6EB`, blue-gray veins | Blanco |
| `marmol_ambar.png` | `#DC8A1A` | Ámbar |
| `marmol_burdeos.png` | `#5D211F` | Burdeos |
| `marmol_jade.png` | `#315D49` | Not in the palette |
| `marmol_indigo.png` | `#172351` | Not in the palette |
| `Fondo_Sello_bajorelieve.png` | `#385A4B` | Jade with an embossed `R` seal, top left |

**Verdict: yes, as view backgrounds, with 4 conditions.** A test mock with a gallery spread and real photos from the PDF moodboard shows the reasons.

1. **Calm them with a color layer.** At full strength the veins compete with the photos and cross the text. With a semi-transparent layer of the view color on top, the marble reads as texture and the jewel stays in front. Worst-pixel contrast for text:

   | Background | No layer | With layer |
   |---|---|---|
   | `marmol_marfil` + carbón text | 5.07 | 12.40 (marfil at 72%) |
   | `marmol_negro` + marfil text | 1.03 | 4.81 (carbón at 60%) |
   | `marmo_perlado` + carbón text | 3.66 | 8.54 (marfil at 50%) |
   | `marmol_burdeos` + marfil text | 1.56 | 4.78 (carbón at 50%) |
   | `marmol_jade` + marfil text | 1.11 | 3.73 (carbón at 50%) |

   The exact layer strength gets tuned with real photos. Small text also gets a plain color block behind it where needed.

2. **Use `cover`, never tile.** The files are not seamless. Opposite edges differ 2 to 4 times more than neighbouring columns, so a repeated tile shows a line. One image per view, scaled to cover the screen.

3. **Resolution.** 1024x1536 fits mobile well, because the image and the screen are both portrait. On a 1440 px desktop the image scales up about 1.4x, and with the color layer the softness does not show in the mock. On 2560 px screens it scales up 2.5x and loses detail. Better: ask the designer for landscape versions (2560x1600) or seamless tiles.

4. **Weight.** Converted to WebP they weigh 39 to 361 KB (marfil 97 KB, negro 171 KB, perlado 143 KB). One background per view is fine. Astro creates the WebP/AVIF files from the PNG at build time.

**Proposed use per view:**

| View | Background |
|---|---|
| Home | `marmol_marfil` + marfil layer |
| Piece | `marmol_negro` + carbón layer |
| Info | `marmol_marfil` + marfil layer, or `marmo_perlado` |
| El Baixo | `marmol_negro` with a lighter layer, so more gold veins show (workshop feeling) |
| Contacto | `marmol_marfil` + marfil layer |
| Mobile menu overlay | `marmol_negro` + carbón layer |

`marmol_ambar` and `marmol_burdeos` can work as small accent areas (the 404 page, a highlighted block), in line with the 6% and 4% palette shares. `marmol_jade` and `marmol_indigo` are not in the brand palette, so we leave them out unless the palette changes. `marmol_blanco` has blue veins that do not match the warm palette.

**`Fondo_Sello_bajorelieve.png`** does not work as a view background. The seal is part of the image at a fixed spot, so `cover` crops or moves it on every screen size, and it is on jade. It works as a single portrait image block, for example in El Baixo next to "Hecho en El Baixo". For a seal on any background we use `branding/sello/sello.svg`.

**How it is built.** The marble sits on a fixed layer behind the page (`body::before` with `position: fixed`), not as `background-attachment: fixed`, which iOS Safari does not support. The color layer is a CSS gradient on top. During page transitions the background layer fades from one marble to the other together with the page, so there is no flash.

**Brand note.** Marble reads as classic luxury, and the PDF says "no somos una joyería clásica ni una marca de lujo basada en la ostentación" (page 6). The calmed versions reduce this. The ink strokes, stamps and noise texture from the graphic elements keep the underground side.

### 5.5 Look and tone

- The jewel is the centre. Photos large, text short, lots of empty space.
- Underground touches: a very light noise texture over the page (ponytojas has one in `body::after`), ink strokes as dividers in Info and El Baixo, stamps near "Hecho en El Baixo".
- Photos: product, on body, macro, workshop, process (moodboard, PDF page 44). No stock images.
- Tone of copy: "Raimundo habla con rigor, pero no con distancia." Direct, close, technical words only when they help.

---

## 6. Way of working and code

### 6.1 From ponytojas.dev

We copy:

- Astro + React integration + MDX through `@mdx-js/rollup` with `remark-gfm` and `remark-frontmatter`.
- `@` alias to `src/`, strict TypeScript config.
- Folder layout: `pages`, `content`, `components`, `layouts`, `data`, `lib`, `styles`.
- MDX files hold the long text. TypeScript files in `src/data` hold the list and the metadata. Dynamic routes read the list in `getStaticPaths()`.
- `ClientRouter`, `data-reveal`, tokens as CSS variables, `.shell` container, self-hosted fonts.
- The image lightbox from `pages/work/[slug].astro`.
- The `.claude/commands/baseline-ui.md` command as a UI checklist.

We change:

- **No duplicated metadata.** ponytojas writes project data twice (`data/projects.ts` and `data/site.ts`). We keep one data file.
- **No Tailwind, no shadcn** (`components.json`, `clsx`, `tailwind-merge` are not needed).
- **Two languages.** Every text field has `es` and `en`. Every entry imports two MDX files.
- **Images optimised at build time** (see 9.4).

**Risk of the manual pattern.** Nothing checks the data. A missing field, a typo in `status`, or an MDX file that is never imported only shows up in the browser. To reduce this: strict TypeScript types (`status` as a union type), `astro check` in the build, and a small script that compares the folders in `src/content/piezas` with the entries in `src/data/piezas.ts`.

### 6.2 Project layout

```
raimundo_jewelry/
  astro.config.mjs
  package.json
  tsconfig.json
  public/
    fonts/
      carla-sans/carla-sans.woff2
      montserrat/montserrat-latin-*.woff2
    favicon.svg
    og/default.jpg
  src/
    assets/
      brand/                  logo.svg, sello-r.svg, estrella.svg, 4c/*.svg, stamps
      piezas/<slug>/          01.jpg, 02.jpg ...
      views/                  opening collage, info, el baixo photos
    content/
      piezas/<slug>/es.mdx
      piezas/<slug>/en.mdx
      views/                  info/es.mdx, info/en.mdx, el-baixo/es.mdx, contacto/es.mdx ...
    data/
      piezas.ts               the only content list
      site.ts                 contact channels, social links, menu
    i18n/
      es.ts  en.ts            UI strings: menu, buttons, labels, status names
      index.ts                t(), localized path helper, route map ES <-> EN
    components/
      Header.astro  MobileMenu.astro  Footer.astro  LangSwitch.astro
      gallery/                Opening.astro, PieceSpread.astro (3 layout variants)
      piece/                  PieceHeader.astro, PieceMedia.astro, NextPiece.astro
      info/                   ProcessSteps.astro, FourC.astro
      Lightbox/               Lightbox.tsx, Lightbox.module.css
    layouts/
      BaseLayout.astro        head, SEO, hreflang, fonts, ClientRouter, persistent header
    views/                    one template per view, used by ES and EN pages
      HomeView.astro  PieceView.astro  InfoView.astro  ElBaixoView.astro  ContactView.astro
    pages/
      index.astro  piezas/[slug].astro  info.astro  el-baixo.astro  contacto.astro
      aviso-legal.astro  privacidad.astro  404.astro
      en/
        index.astro  pieces/[slug].astro  info.astro  el-baixo.astro  contact.astro
        legal-notice.astro  privacy.astro
    styles/
      global.css              tokens, @font-face, reset, MDX prose styles
```

Each file in `pages/` is a few lines that pass the locale to its template in `views/`.

Revision 1 had `data/colaboraciones.ts`, collaboration pages, and list pages for pieces and collaborations. They are gone.

### 6.3 Piece entry (sketch)

```ts
// src/data/piezas.ts
import AnilloSombraEs from "@/content/piezas/anillo-sombra/es.mdx";
import AnilloSombraEn from "@/content/piezas/anillo-sombra/en.mdx";
import anilloSombra01 from "@/assets/piezas/anillo-sombra/01.jpg";
import anilloSombra02 from "@/assets/piezas/anillo-sombra/02.jpg";

export type Locale = "es" | "en";
export type Localized<T> = Record<Locale, T>;
export type PieceStatus = "available" | "limited" | "unique" | "commission" | "archive";

export type Piece = {
  slug: string;
  title: Localized<string>;
  collection?: string;
  year: number;
  materials: Localized<string[]>;
  status: PieceStatus;
  edition?: string;                  // "3/12"
  spread: [ImageMetadata, ImageMetadata]; // gallery pair: product, worn
  media: ImageMetadata[];            // photos on the piece page
  video?: string;
  Content: Localized<MdxComponent>;
};

export const piezas: Piece[] = [
  {
    slug: "anillo-sombra",
    title: { es: "Anillo Sombra", en: "Sombra Ring" },
    collection: "La Sombra x Raimundo",
    year: 2026,
    materials: { es: ["Plata 925", "Esmalte a fuego"], en: ["925 silver", "Vitreous enamel"] },
    status: "limited",
    edition: "12",
    spread: [anilloSombra01, anilloSombra02],
    media: [anilloSombra01, anilloSombra02],
    Content: { es: AnilloSombraEs, en: AnilloSombraEn },
  },
];
```

Adding a piece: create `src/assets/piezas/<slug>/` with photos, write `es.mdx` and `en.mdx`, add one entry to `piezas.ts`. Its place in the array is its place in the gallery.

**Status values:**

| Key | ES | EN |
|---|---|---|
| `available` | Disponible | Available |
| `limited` | Edición limitada | Limited edition |
| `unique` | Pieza única | One of a kind |
| `commission` | Por encargo | Made to order |
| `archive` | Archivo | Archive |

---

## 7. What we drop or change from the texts

| From the brief | Decision |
|---|---|
| 6-item menu + Inicio | 3 items: Info, El Baixo, Contacto. The logo goes to the Home |
| Home with 9 blocks | Opening + gallery |
| Separate pages for Piezas, Encargos, Proceso, Colaboraciones | Merged (table 3.2) |
| Collaborations (section, pages, contact reason) | Not in v1 |
| "Organización: Colecciones, Piezas únicas, Series limitadas..." | One gallery. Collection and status show as labels |
| CMS for the team | Dropped. Content lives in the repo as MDX + TypeScript |
| Hidden shop fields (price, SKU, stock, size) | Dropped. The `Piece` type can grow later |
| Newsletter | Dropped |
| Analytics and conversion tracking | Open (section 9) |
| Encargos form with image upload | Open (section 9) |
| Process steps in the brief | We use the copy file version: Idea, Diseño, Prototipo, Taller, Acabado |
| Contact reasons (5 in the brief) | 3: Piezas, Encargos, Otros proyectos |
| SEO | Title and description per view and per piece, `hreflang`, sitemap, alt text, Open Graph image |

Unfinished copy: the El Baixo text ends with a note, "((Hablar del entorno del que salen las piezas...))". That paragraph still needs writing. The Info and Contacto texts also need shortening, because they now share a page with other blocks.

---

## 8. Phases

1. **Scaffold.** Astro project in this repo, config copied from ponytojas without Tailwind. Replace the current `index.html`. Fonts, tokens, `BaseLayout`, i18n helpers, Header, Footer, language switch.
2. **Home + Piece** in ES with 4 sample pieces and placeholder photos. Includes the shared-photo transition and the mobile layout of the gallery. This is the core of the site, so we test it first.
3. **Info, El Baixo, Contacto**, legal pages, 404.
4. **English.** `/en` routes, `en.ts` strings, `en.mdx` files.
5. **SEO and performance.** Meta tags, `hreflang`, sitemap, OG images, image sizes, Lighthouse pass on mobile.
6. **Real content** as it arrives, then deploy.

Each phase ends with a working build.

---

## 9. Open items

### 9.1 Decisions still open

- **Forms.** Direct links (email with subject, Instagram, WhatsApp) or an external form service (Formspree, Web3Forms). Image upload usually needs a paid plan.
- **WhatsApp.** Only if the team wants it as a sales channel. The PDF lists `673444779` as the contact phone.
- **Analytics.** None, or a privacy-friendly tool that needs no cookie banner.
- **Hosting and domain.** Any static host works (Netlify, Vercel, Cloudflare Pages). The domain is not decided.
- **Special title font and typewriter mono.** Left out of v1.

### 9.2 Content we need from the team

- Graphic elements (stamps, strokes, star) as SVG or transparent PNG. The `branding` folder does not have them yet.
- Marble backgrounds as landscape versions (2560x1600) or seamless tiles, at least `marfil` and `negro`.
- For each piece: **a product photo and a worn photo** (the gallery pair), extra photos or a short video, name, collection, year, materials, status, edition, short story.
- Photos for the opening collage, Info (process steps) and El Baixo (place, people, Rudi).
- English translation of all copy.
- The missing El Baixo paragraph.
- Legal texts (aviso legal, privacidad) and the business details for them.
- Confirmed contact channels: `raimundojewelry@gmail.com`, `@raimundojewelry`, phone.
- Web licence of Carla Sans.

### 9.3 Technical notes

- `pnpm-workspace.yaml` in ponytojas sets `esbuild: false` under `allowBuilds`. We check this during the scaffold so the build does not break.
- The repo has untracked `texts/` and `fonts/`. The PDF is 3.8 MB. We should decide whether source documents belong in git.

### 9.4 Images

Proposal: import photos from `src/assets` in the data file, as in the sketch in 6.3. Astro's `<Image>` and `<Picture>` then create WebP/AVIF files in several sizes. The cost is one import line per photo. The other option is ponytojas's way: convert by hand and put the files in `public/`.
