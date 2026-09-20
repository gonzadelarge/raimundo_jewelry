# Design system

Load this to change colors, type, spacing, components, motion or accessibility behaviour.

Everything shared lives in `src/styles/global.css`. Everything specific to one view or component
lives in a scoped `<style>` block in that `.astro` file. React uses CSS Modules
(`PieceMedia.module.css`). No Tailwind, no Sass, no utility classes beyond the few helpers below.

## Tokens

Never write a literal hex value in a component. Use the token.

```css
--carbon: #111111;   --marfil: #f3efe7;   --gris: #7a7a76;
--blanco: #ffffff;   --ambar: #d79b24;    --burdeos: #5c1f2a;
```

Theme tokens change with `data-theme` on `<html>`:

| Token | light (marfil) | dark (carbón) |
|---|---|---|
| `--bg` | marfil | carbón |
| `--fg` | carbón | marfil |
| `--muted` | `#5e5c56` | `#a9a7a0` |
| `--line` | carbón at 18% | marfil at 20% |
| `--veil` | marfil at 72% | carbón at 60% |
| `--accent` | carbón | ámbar |

`data-veil="soft"` lowers the dark veil to 42%, so more gold veins show. Only El Baixo uses it.

`--shadow-photo` is the drop shadow of a photo that sits in front of another one: the gallery
product photo and the piece cover photo. It is stronger in the dark theme.

`--scroll-thumb` and `--scroll-thumb-hover` paint the page scrollbar: a 4 px line in the text
colour at 30%, with no rounding, on a transparent track. It follows the theme. The zoom view hides
its own scrollbar instead, because the photo already fills the screen.

**One backdrop per view**, set with the `backdrop` prop of `BaseLayout`. `marmol_negro` is
reserved for El Baixo (`negro-soft`). Piece pages use `blanco` (`marmol_blanco.png`, light theme).
Home, Info, Contact and the legal pages use `marfil`. The 404 page uses `burdeos`. The mobile menu
dialog paints `marmol_negro` on every page, because the menu is always dark.

Layout and motion tokens: `--gutter` (`clamp(1rem, 4vw, 3.5rem)`), `--header-h` (`4.5rem`),
`--ease-out` and `--ease-move`.

**Contrast, measured.** marfil on carbón 16.47. ámbar on carbón 7.74. gris on carbón 4.38 and on
marfil 3.76, so gris is for large text and borders only. **ámbar on marfil is 2.13: never use it
for text.** Ámbar on marfil works only as a button background with carbón text, or as a line or
mark.

## Type

Two fonts. **Carla Sans** for display: names, menu, buttons, labels, status. It has no lowercase,
so every letter renders as a capital. **Montserrat Variable** for body text, self-hosted through
`@fontsource-variable/montserrat`. Body weight is 350.

Helper classes in `global.css`:

| Class | Use |
|---|---|
| `.title` | Page and section headings. `clamp(2rem, 5vw, 4.25rem)`, uppercase, `text-wrap: balance`. |
| `.title-sm` | Smaller headings. `clamp(1.4rem, 2.6vw, 2.1rem)`. |
| `.label` | Small uppercase Carla Sans, `0.75rem`, letter-spacing `0.16em`. Menu, status, vertical labels. |
| `.lead` | Intro paragraph, max width `38rem`. |
| `.prose` | Multi-paragraph text, spacing between paragraphs. |
| `.muted` | Secondary text, uses `--muted`. |
| `.shell` | Page container: `min(100%, 1440px)`, centred, padded with `--gutter`. |

## Components

- `.button` - ámbar background, carbón text, Carla Sans, `min-height: 3rem`. The only filled
  button. Used for `Consultar esta pieza`.
- `.button-ghost` - transparent with a 1 px inset line. Secondary actions.
- `.arrow-link` - text with an underline and an arrow that slides 0.3em on hover. The default link
  style for navigation between views.
- `.star` - the four-point brand star, drawn with `clip-path` until the real SVG exists.
- `.skip-link` - hidden until focused, first element in the body.

## Layout habits

- Generous empty space. The jewel is the subject; text is short and photos are large.
- One background per view, fixed behind the page. The marble is a `position: fixed` layer
  (`.backdrop`), not `background-attachment: fixed`, which iOS Safari does not support.
- The backdrop stacks three layers: the veil gradient, the marble image, the flat view colour as a
  fallback.
- Mobile breakpoint is **760 px**. The mobile menu closes itself above 761 px.
- Photos are always `<Image>` from `astro:assets` with explicit `widths` and `sizes`. Never a raw
  `<img>` with a `src` from `src/assets/`. The React island is the exception: it gets plain `src`
  and `srcSet` strings built with `getImage()` in `PieceView.astro`.
- **The piece cover sizes itself from the screen.** `--hero-w` in `PieceView.astro` is
  `min(calc((100svh - var(--header-h) - 7rem) * 0.8), 44vw)`. The photo takes that width and
  `width * 1.25` as its height, so the 4:5 ratio is exact and the photo can never be taller than
  the screen. The text column is `align-content: space-between`, so both columns start and end on
  the same line.
- **A grid item stretches.** A link with an underline inside a grid runs the line across the whole
  column unless it gets `justify-self: start`. That is why the `Volver` link carries it.
- **The home hero uses the gallery column, not `.shell`.** `--hero-col` in `Opening.astro` is
  `min(100%, 1280px)`, the same width as `.spread`. Both the collage and the claim take it, so the
  claim text starts on the gallery's left edge and lands on the photos. With `.shell` (1440px) the
  text sat further left than everything below it.
- **The home collage is 5 absolute tiles**, one per piece, the same five on desktop and mobile.
  Every tile overlaps its neighbour on both axes and carries `--shadow-collage`, so the block
  reads as one wall instead of a row of photos. `z-index` runs 1 to 5 and the claim sits at 10.
  Tile 3 is the large one in front and the only tile the title reaches, so it must stay a light
  photo: carbón type over a dark photo is unreadable. The dark ones go on the right.
- **The home hero has two separate layouts, not one that adapts.** `Opening.astro` holds a shared
  block with no sizes in it, then `@media (min-width: 761px)` and `@media (max-width: 760px)`,
  each with its own `--collage-w`, tile grid and overlap. They are independent on purpose: an
  earlier version drove both from one unit and every fix to one broke the other.
- **The hero collage has a parallax rate per tile**, set in `Opening.astro` as `tileParallax`.
  The rates are negative, from `-0.08` to `-0.30`, so every tile climbs as the page goes down and
  the wall pulls apart, the way the two photos of a gallery spread separate. The claim runs the
  other way at `0.06`, so the photos always move away from the text and the title is never
  buried. `0.06` also keeps the claim inside the hero's bottom padding, off the gallery below.
  All of them carry `data-parallax-zero`.
- **Each layout is three numbers.** `--collage-w` is how wide the wall is, the `aspect-ratio` on
  `.collage` is how tall, and the negative `margin-top` on `.claim` is how far the title rides
  into it. The collage sits in the flow and the claim follows it, so the overlap is a fixed
  distance and never drifts with the viewport height. Only the cap inside `--collage-w` reads
  `svh`, and only to stop the wall growing past a short screen. The title reaches the photos on
  its **first line only**, and only tile 3, which is why tile 3 must stay a light photo.
- **The home title breaks at most two words per line.** `.claim-main` is
  `clamp(2.4rem, 5.2vw, 4.4rem)` on desktop and `clamp(2rem, 9.5vw, 2.9rem)` on mobile, with
  `max-width: 9.5em`, which gives
  LUXURY JEWELRY / UNDERGROUND / SPIRIT. The width is in em, not percent, so the same break shape
  survives every screen size. Do not add `text-wrap: balance`: it undoes it.
- **The gallery spread has five variants**, picked by `index % 5`, so five pieces never repeat a
  composition. All five overlap the two photos by about one column. In v1, v3 and v4 the product
  photo starts **below the middle** of the worn photo. Keep it there: a portrait worn shot puts the
  face in the upper half, the product photo sits in front, and a high overlap cuts the face.

## Motion

`src/scripts/motion.ts` handles three effects, re-initialised after every router swap:

| Effect | Trigger | Detail |
|---|---|---|
| Reveal | `data-reveal` | Fade in and move up 1.75rem when the element enters the viewport. `IntersectionObserver`, threshold 0.05. |
| Parallax | `data-parallax` | Moves at 22% of the distance to the viewport centre. A number on the attribute, `data-parallax="0.07"`, sets its own rate, so several elements in one block read as near and far. Uses the `translate` property, kept separate from the reveal `transform`. |
| Parallax from rest | `data-parallax-zero` | Same, but the element starts exactly where CSS puts it and drifts by `scrollY * rate`. The home hero uses it, because the normal rule would pull the collage off its own layout before any scroll. |
| Header state | scroll | `data-scrolled` after 24 px. |

**The piece media mosaic.** On screens above 760 px the photo block starts packed into one
screen and breaks apart into its column as you scroll. `src/components/react/mosaic.ts` packs the
mosaic in justified rows, so every photo keeps its own ratio and the animation needs only one
uniform scale. The script writes `transform` on each item and `--break` on the grid, which is the
scroll distance the effect uses. Real layout never moves. It is off below 761 px and under
`prefers-reduced-motion: reduce`.

Page transitions use Astro's `ClientRouter`:

| Transition | Duration | How |
|---|---|---|
| View to view | 260 ms out, 360 ms in with 80 ms delay | `::view-transition-old/new(root)` crossfade |
| Gallery to piece, and back | 620 ms | `transition:name="piece-{slug}"` and `view-transition-class: piece-photo` on both photos |
| Header | 0 | `transition:animate="none"` |

**Two rules protect the photo flight.** The gallery product photo never gets `data-reveal` or
`data-parallax`, because the return animation would land on a hidden or shifted element. And the
photo keeps a 4:5 ratio in the gallery, the piece header and the next-piece block, so it does not
stretch while moving.

Browsers without the View Transitions API load pages normally, with no animation. Navigation
still works.

## The zoom view

The lightbox is a native `<dialog>` opened with `showModal()`, three rows: toolbar, photo, arrows.

- It locks the page scroll while it is open, and adds a `padding-right` the width of the
  scrollbar, so nothing jumps sideways. The lock is released on the dialog's `close` event, which
  also covers `Esc`.
- The photo keeps its height. One taller than the screen scrolls inside the dialog, with
  `overscroll-behavior: contain` and no visible scrollbar. `place-items: safe center` keeps the
  top of a tall photo reachable; plain `center` would cut it.
- A drag down closes the zoom only when the photo fits. On a photo that scrolls, a drag down
  scrolls.

## Accessibility

These are built in. Do not remove them.

- A skip link as the first focusable element on every page.
- `:focus-visible` gets a 2 px `--accent` outline with 4 px offset.
- The mobile menu is a native `<dialog>` opened with `showModal()`, which gives the focus trap and
  `Esc` for free.
- The current nav link carries `aria-current="page"`.
- Decorative images use `alt=""` and decorative wrappers use `aria-hidden="true"`.
- `prefers-reduced-motion: reduce` turns off view transitions, reveal and parallax, and clamps all
  transitions to 1 ms. Any new animation must respect it.
- Reveal only runs under `@media (scripting: enabled)`, so content is visible without JavaScript.

Why marble, why these veil strengths, and the full colour research: [plan-web-v1.md section
5](plan-web-v1.md).
