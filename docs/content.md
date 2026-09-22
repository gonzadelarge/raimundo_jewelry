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
   The pattern is the piece name plus a number: `wired-01.jpg` to `wired-06.jpg`.
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
crop, or the photo stretches mid-flight. A centre crop is what the browser does, so check that the
jewel survives it before you pick the pair.

**`media` needs no layout choice.** The grid reads each photo's own width and height and gives it
a shape: landscape photos get a wide frame, portrait ones a tall frame, and every third landscape
photo runs full width. Order the array by what you want read first. On desktop the same photos
also form the mosaic that breaks apart on scroll, so every one of them should still read at about
a third of the screen.

| `status` | ES | EN |
|---|---|---|
| `available` | Disponible | Available |
| `limited` | Edición limitada | Limited edition |
| `unique` | Pieza única | One of a kind |
| `commission` | Por encargo | Made to order |
| `archive` | Archivo | Archive |
| `sold` | Vendida | Sold |

Adding a status value means editing the `PieceStatus` union in `pieces.ts` **and** both `status`
objects in `src/i18n/ui.ts`.

`sold` also changes the piece page: `PieceView.astro` drops the `Consultar esta pieza` button and
leaves `Quiero algo similar` as the only action.

After any change: `pnpm check` must report 0 errors, then `pnpm build`.

## Writing a piece story

2 to 5 lines. Where the idea comes from, the references behind it, what makes it particular. No
sales language, no price, no call to buy: the page already has `Consultar esta pieza`. Tone rules
in [brand.md](brand.md).

The story is also used as the page meta description, so the first sentence should make sense on
its own. See [seo.md](seo.md).

## Photos

- `src/assets/` for anything the build should process. `public/` only for files that must keep
  their exact path (favicon, the Carla Sans woff2, the El Baixo video at
  `public/video/baixo.mp4`). Astro does not process video, so the file ships as it is: 22 MB
  today, worth compressing before launch.
- The gallery pair: one product photo, one worn photo. For jewelry that pair explains the piece
  better than any text.
- Alt text rules are in [seo.md](seo.md). Short version: decorative photos in a collage get
  `alt=""`, a photo that identifies a piece gets the piece name.

## What is still a placeholder

| Item | Now | Needs |
|---|---|---|
| Piece photos | All real: Wired 7, Dijo Sí 5, Trinacria 7, Buda & Eva 8, La Famiglia 6 | Nothing, until new pieces arrive |
| Pieces | 5 real pieces in the gallery. The 8 invented placeholders were deleted | Rest of the catalogue from the team |
| Opening (home hero) | Real piece photos, 9 overlapping tiles, 1 or 2 per piece | Nothing |
| Info photos | Mixed moodboard and picsum placeholders | Workshop and process photos |
| El Baixo photos and video | All real: 5 workshop photos and the header video | Nothing |
| English copy | Draft translation | Review by a person |
| Legal pages | One sentence | Real legal texts |

`images/` is an untracked drop folder for new piece material. Nothing in the build reads it.
Copying the photos into `src/assets/photos/` and writing the entry in `src/data/pieces.ts` is the
normal path for real content. `piece_1` (Wired), `piece_2` (Dijo Sí), `piece_3` (Trinacria),
`piece_4` (Buda & Eva) and `piece_5` (La Famiglia) went through it already.

The `description.md` the client writes in that folder is source material, not site copy. Condense
it into 2 to 5 lines for the `story` field and drop the markdown marks; the field is plain text.

## Planned content model, not built

[plan-web-v1.md section 6.3](plan-web-v1.md) describes the target: one folder per piece with
`es.mdx` and `en.mdx` for the story, imported into the data file. The draft skipped it because
eight sample stories did not need it.

Until somebody builds that, **do not write documentation or code as if MDX existed**. If a story
grows past a few paragraphs, that is the signal to build the MDX model.
