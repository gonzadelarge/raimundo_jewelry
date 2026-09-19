# Content

Load this to add or edit a piece, change page copy, or add photos. For the words themselves, load
[brand.md](brand.md) as well.

There is **no blog and no CMS**. All content lives in the repo as TypeScript. There is no MDX and
no Astro content collection yet; the plan for one is at the end of this file.

## Where each kind of text lives

| Kind | File | Example |
|---|---|---|
| Interface strings (menu, buttons, labels, status names) | `src/i18n/ui.ts` | `viewPiece`, `back`, `status.limited` |
| Page copy and meta descriptions | `src/i18n/copy.ts` | Info body, El Baixo history, contact reasons |
| Piece data and stories | `src/data/pieces.ts` | name, year, materials, status, story |
| Photo imports and photo sets | `src/data/photos.ts` | `openingPhotos`, `baixoPhotos` |
| Contact channels | `src/data/site.ts` | email, Instagram, WhatsApp |

Every field carries both languages: `{ es: "...", en: "..." }`. TypeScript fails the build if one
is missing, which is the point.

Never write a visible string directly into a view. If a view needs a new sentence, add it to
`copy.ts` in both languages and read it from there.

## Adding a piece

1. Put the photos in `src/assets/photos/`. Use real filenames, not `random-*`. Astro converts
   them to WebP in several sizes at build time, so commit the originals, not optimised copies.
2. Import them in `src/data/photos.ts` and add them to the `photos` object.
3. Add one entry to the `pieces` array in `src/data/pieces.ts`.

```ts
{
  slug: "anillo-sombra",              // same slug in both languages, kebab-case, no accents
  title: { es: "Anillo Sombra", en: "Sombra Ring" },
  collection: "La Sombra",
  year: 2025,
  materials: { es: ["Plata 925", "Esmalte a fuego"], en: ["925 silver", "Vitreous enamel"] },
  status: "unique",                   // see the table below
  edition: "3/12",                    // optional, only for limited editions
  spread: [product, worn],            // exactly 2 photos, the gallery pair
  media: [worn, product, detail],     // photos on the piece page, first one leads
  story: { es: "...", en: "..." },    // 2 to 5 lines
}
```

**The position in the array is the position in the gallery.** There is no featured flag and no
sort field. To feature a piece, move it up.

**`spread` must be `[product, worn]`.** The first photo is the one that flies into the piece page
during the transition, and the piece page shows it in the header. Both must be the same 4:5
crop, or the photo stretches mid-flight.

| `status` | ES | EN |
|---|---|---|
| `available` | Disponible | Available |
| `limited` | Edición limitada | Limited edition |
| `unique` | Pieza única | One of a kind |
| `commission` | Por encargo | Made to order |
| `archive` | Archivo | Archive |

Adding a status value means editing the `PieceStatus` union in `pieces.ts` **and** both `status`
objects in `src/i18n/ui.ts`.

After any change: `pnpm check` must report 0 errors, then `pnpm build`.

## Writing a piece story

2 to 5 lines. Where the idea comes from, the references behind it, what makes it particular. No
sales language, no price, no call to buy: the page already has `Consultar esta pieza`. Tone rules
in [brand.md](brand.md).

The story is also used as the page meta description, so the first sentence should make sense on
its own. See [seo.md](seo.md).

## Photos

- `src/assets/` for anything the build should process. `public/` only for files that must keep
  their exact path (favicon, the Carla Sans woff2).
- The gallery pair: one product photo, one worn photo. For jewelry that pair explains the piece
  better than any text.
- Alt text rules are in [seo.md](seo.md). Short version: decorative photos in a collage get
  `alt=""`, a photo that identifies a piece gets the piece name.

## What is still a placeholder

| Item | Now | Needs |
|---|---|---|
| Piece photos | 8 real moodboard photos mixed with 18 picsum placeholders | Product + worn photo per piece |
| Pieces | 8 invented names sharing one sample story | Real catalogue from the team |
| Opening, Info, El Baixo photos | Mixed real and random | Workshop, process and people photos |
| People names in El Baixo | "Nombre" | Real first names |
| English copy | Draft translation | Review by a person |
| Legal pages | One sentence | Real legal texts |
| El Baixo closing paragraph | Missing in the source copy | Client to write it |

`images/piece_1/` is an untracked drop folder with the first real piece (WIRED) and its photos.
Nothing in the build reads it. Moving it into `src/assets/photos/` and `src/data/pieces.ts` is the
normal path for real content.

## Planned content model, not built

[plan-web-v1.md section 6.3](plan-web-v1.md) describes the target: one folder per piece with
`es.mdx` and `en.mdx` for the story, imported into the data file. The draft skipped it because
eight sample stories did not need it.

Until somebody builds that, **do not write documentation or code as if MDX existed**. If a story
grows past a few paragraphs, that is the signal to build the MDX model.
