# Brand

Load this before writing or changing any text a visitor reads.

Source: `texts/RAIMUNDO DIAGNOSTICO.pdf` (46-page brand diagnosis, July-September 2026) and
`texts/raimundo_texts.md` (approved copy and the tone rule). This file is a summary of those
documents. Nothing here is invented. If a question is not answered here, check the sources or ask.

## Purpose

Raimundo makes contemporary jewelry from a real workshop. The brand sells pieces, but the harder
job is explaining **why the way they are made has value**. The diagnosis states it plainly: the
challenge is not proving Jesús can make jewelry, it is getting more people to understand why his
way of making it matters.

The website is the centre of the brand online. Instagram is the daily channel.

## Positioning

`Luxury jewelry with an underground spirit` (`Joyería de lujo con espíritu underground`)

Contemporary handmade jewelry that combines workshop craft, 3D precision and an alternative,
cultural, limited-edition look. Made in Valencia, in a workshop called **El Baixo**.

`Hecho en El Baixo` works as a signature and an origin stamp. It does not only mean the place of
manufacture. It means the ideas, tests, people and collaborations that end up inside each piece.

## Audience

People who buy with intention. They prefer something special, well made and with a story behind
it over a generic piece. Interested in jewelry, art, design, fashion and contemporary culture.
Medium to medium-high spending power. They buy for themselves, as a gift, or as a commission.
Age is not the filter; intention is.

## The 4 C

A nod to the 4 C of the diamond, reinterpreted. They run through the site and the footer, and they
also work as a filter for any content.

| C | Meaning | As a content filter |
|---|---|---|
| Carácter | Pieces with their own identity, away from the generic | Does this have Raimundo identity? |
| Curiosidad | Investigate, test and mix techniques and references | Does it teach or show something? |
| Cuidado | Attention at every step, from idea to finish | Is it well made and well presented? |
| Cercanía | Direct, natural, human, no unnecessary distance | Does it bring us closer to people? |

Treated on the site as a slogan (`Carácter · Curiosidad · Cuidado · Cercanía`), not as four blocks
with icons. The icons were dropped on purpose.

## Tone of voice

The internal rule, from `texts/raimundo_texts.md`:

> **Raimundo habla con rigor, pero no con distancia.**

- Technical words are welcome when they add something: prototipo, desarrollo, materiales, acabado,
  fundición, diseño 3D, edición limitada, pieza por encargo. Not enough of them to turn the site
  into a lesson or a spec sheet.
- Two extremes to avoid: too casual ("nos flipa hacer cosas") and too corporate ("soluciones
  innovadoras de joyería de autor").
- The middle point: oficio, criterio, identidad, claridad, cercanía.
- Speak *de tú a tú*. First person plural ("trabajamos", "nos interesa").
- Short blocks on the site. Long explanations belong to a piece story or a collaboration, not to a
  page headline.

## What Raimundo is not

Do not write copy that drifts into these. They dilute the identity.

- Not a classic jewelry house, and not a luxury brand based on showing off or status.
- Not mass production, and not impersonal pieces designed to please everyone.
- Not a literal follower of trends. Trends get known, mixed and translated into Raimundo's own
  language.
- Not a tech brand dressed as jewelry. 3D and new tools serve the craft and the piece.
- Not distant or rigid. The work is serious; the way of telling it is close and current.

## Language and terms

| Use | Not |
|---|---|
| Pieza | Producto, artículo |
| El Baixo, taller | Fábrica, showroom |
| Encargo, pieza por encargo | Personalización, customización |
| Edición limitada, pieza única | Exclusivo, premium, de lujo (as a sales word) |
| Oficio | Artesanía (as decoration; the diagnosis uses it, the site prefers oficio) |
| Consultar esta pieza | Comprar, añadir al carrito (there is no shop) |

Fixed strings, do not paraphrase:

- `Luxury jewelry with an underground spirit` (stays in English in both languages). The home
  headline is cut to `Luxury jewelry underground spirit`, so it breaks into three short lines.
- `Hecho en El Baixo` / `Made in El Baixo`

Both lines are set without a full stop. They are headlines, not sentences.
- `Carácter · Curiosidad · Cuidado · Cercanía`

People named on the site: **Jesús** (founder, designer, jeweler) and **Rudi** (Rodolfo Navarro
Bort, his master, a personal and professional reference). Other people appear by first name only,
never as an org chart.

Metaphors from the diagnosis, useful for image and copy choices, never printed on the site: a
zebra (same code as the others, nobody has the same pattern), the knight in chess (moves in a way
no other piece does).

## Visual identity

Full token list and usage rules: [design.md](design.md).

- Colors: negro carbón, marfil cálido, gris metal, blanco, ámbar, burdeos. The palette page of the
  PDF shows only black and white; the working palette comes from the next page.
- Fonts: **Carla Sans** for names, menu, buttons and labels (it has no lowercase; everything comes
  out as capitals). **Montserrat** for body text.
- Logo: the `RAIMUNDO` wordmark and the `R` seal in an oval. In the repo as
  `src/components/brand/Logo.astro` and `Seal.astro`.
- Photos: product, on body, macro, workshop, process. **No stock images.** The moodboard asks for
  details of products, materials, designs, textures, people and processes.
- Marble backgrounds, one per view, always calmed with a colour veil. The brand is not classic
  luxury, so full-strength marble would say the wrong thing.

## Missing brand assets

The graphic elements exist as a plan, not as files: the round and square "Hecho en El Baixo"
stamps, the `R/EB` mark, ink strokes and textures, and the four-point star. The star is drawn in
CSS until the real file arrives.
