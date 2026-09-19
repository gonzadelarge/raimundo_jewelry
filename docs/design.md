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
  `<img>` with a `src` from `src/assets/`.

## Motion

`src/scripts/motion.ts` handles three effects, re-initialised after every router swap:

| Effect | Trigger | Detail |
|---|---|---|
| Reveal | `data-reveal` | Fade in and move up 1.75rem when the element enters the viewport. `IntersectionObserver`, threshold 0.05. |
| Parallax | `data-parallax` | Moves at 8% of the distance to the viewport centre. Uses the `translate` property, kept separate from the reveal `transform`. |
| Header state | scroll | `data-scrolled` after 24 px. |

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
