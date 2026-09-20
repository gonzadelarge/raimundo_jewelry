// The five real pieces, in gallery order. The placeholder entries were removed once real material arrived.
// If a story grows past a few paragraphs, move to one es.mdx and one en.mdx per piece
// (see docs/plan-web-v1.md 6.3).
import type { ImageMetadata } from "astro";
import type { Localized } from "@/i18n";
import { photos as p } from "@/data/photos";

/** "sold" hides the "Consultar esta pieza" button in PieceView. */
export type PieceStatus =
  | "available"
  | "limited"
  | "unique"
  | "commission"
  | "archive"
  | "sold";

export type Piece = {
  slug: string;
  title: Localized<string>;
  collection: string;
  year: number;
  materials: Localized<string[]>;
  status: PieceStatus;
  edition?: string;
  /** Gallery pair: [product, worn]. The first photo moves into the piece page. */
  spread: [ImageMetadata, ImageMetadata];
  media: ImageMetadata[];
  story: Localized<string>;
};

export const pieces: Piece[] = [
  {
    slug: "wired",
    title: { es: "Wired", en: "Wired" },
    collection: "Hecho en El Baixo",
    year: 2026,
    materials: {
      es: ["Plata 925", "Diamantes Salt & Pepper", "Cristal de roca", "Cable de sonido"],
      en: ["925 silver", "Salt and pepper diamonds", "Rock crystal", "Audio cable"],
    },
    status: "unique",
    spread: [p.wired04, p.wired07],
    media: [p.wired04, p.wired07, p.wired01, p.wired02, p.wired05, p.wired03, p.wired06],
    story: {
      es: "Wired nace en El Baixo como una pieza compartida entre generaciones, diseñada junto a Rudi. En ella conviven plata, diamantes Salt & Pepper, cristal de roca y cable de sonido: lujo y materia cotidiana, oficio tradicional y lenguaje contemporáneo. Una mezcla poco probable, pero natural dentro del taller. Wired es conexión: entre materiales, entre personas y entre generaciones.",
      en: "Wired comes from El Baixo, a piece shared between generations and designed together with Rudi. Silver, salt and pepper diamonds, rock crystal and audio cable live together in it: luxury and everyday matter, traditional craft and contemporary language. An unlikely mix, and a natural one inside the workshop. Wired is connection: between materials, between people and between generations.",
    },
  },
  {
    slug: "dijo-si",
    title: { es: "Dijo Sí", en: "Dijo Sí" },
    collection: "Hecho en El Baixo",
    year: 2026,
    materials: {
      es: ["Oro blanco", "Diamantes Salt & Pepper", "Pavé de brillantes", "Cuarzo ahumado"],
      en: ["White gold", "Salt and pepper diamonds", "Brilliant pavé", "Smoky quartz"],
    },
    status: "sold",
    spread: [p.dijoSi01, p.dijoSi02],
    media: [p.dijoSi01, p.dijoSi02, p.dijoSi05, p.dijoSi03, p.dijoSi04],
    story: {
      es: "Dijo Sí recupera un diseño histórico de Rodolfo Navarro Bort y lo trae al presente desde El Baixo, reinterpretado junto a Rudi. Más que rescatar una forma, el proceso ha sido volver a mirar el trabajo de quien estuvo antes, entender cómo fue pensado y dejar que una nueva generación lo continúe en su propio lenguaje. Los adornos de oreja están hechos en oro blanco, con diamantes Salt & Pepper, pavé de brillantes y perillas de cuarzo ahumado. Materiales clásicos de alta joyería llevados a una silueta inesperada y casi escultórica. Dijo Sí habla de legado: de lo que se aprende, de lo que se hereda y de todo lo que queda por hacer con ello.",
      en: "Dijo Sí takes a historic design by Rodolfo Navarro Bort and brings it back to the present from El Baixo, reworked together with Rudi. More than rescuing a shape, the process meant looking again at the work of the person who came before, understanding how it was thought out and letting a new generation carry it on in its own language. The ear adornments are made in white gold, with salt and pepper diamonds, brilliant pavé and smoky quartz drops. Classic fine jewelry materials taken to an unexpected, almost sculptural silhouette. Dijo Sí speaks about legacy: what you learn, what you inherit and everything still left to do with it.",
    },
  },
  {
    slug: "trinacria",
    title: { es: "Trinacria", en: "Trinacria" },
    collection: "Hecho en El Baixo",
    year: 2025,
    materials: {
      es: ["Plata 925", "Minerales intercambiables"],
      en: ["925 silver", "Interchangeable minerals"],
    },
    status: "commission",
    spread: [p.trinacria03, p.trinacria07],
    media: [p.trinacria03, p.trinacria07, p.trinacria05, p.trinacria06, p.trinacria01, p.trinacria04, p.trinacria02],
    story: {
      es: "Trinacria nace en El Baixo de una idea sencilla: que una joya no tenga por qué ser siempre la misma. Sobre una estructura de plata 925, modelada e impresa en 3D, las cuentas y los minerales se cambian con un sistema de presión hecho para que la pieza se transforme. El nombre mira a Sicilia y a la Trinacria como símbolo, pero el anillo lo lleva al lenguaje de Raimundo: volumen, prueba y una forma poco convencional de entender la joyería. Cada piedra cambia el carácter del anillo sin tocar su estructura. No es una pieza cerrada, es un sistema para combinar y volver a elegir.",
      en: "Trinacria comes from El Baixo and from a simple idea: a piece of jewelry does not have to stay the same. On a 925 silver structure, modelled and 3D printed, the beads and minerals swap through a press-fit system made so the piece can change. The name looks at Sicily and at the Trinacria as a symbol, but the ring takes it into Raimundo's language: volume, testing and an unconventional way of understanding jewelry. Each stone changes the character of the ring without touching its structure. It is not a closed piece, it is a system to combine and choose again.",
    },
  },
  {
    slug: "buda-eva",
    title: { es: "Buda & Eva", en: "Buda & Eva" },
    collection: "Hecho en El Baixo",
    year: 2026,
    // Two rings, one list: Buda is enamel and onyx, Eva is sapphire and cubic zirconia.
    materials: {
      es: ["Oro 18k", "Esmalte a fuego", "Ónix", "Zafiro", "Zirconitas"],
      en: ["18k gold", "Vitreous enamel", "Onyx", "Sapphire", "Cubic zirconia"],
    },
    status: "sold",
    spread: [p.budaEva07, p.budaEva08],
    media: [p.budaEva07, p.budaEva08, p.budaEva01, p.budaEva03, p.budaEva04, p.budaEva05, p.budaEva06, p.budaEva02],
    story: {
      es: "Buda & Eva nace de una historia compartida que atraviesa años, música, amistad y familia. Sus alianzas toman la forma de sellos dorados con piedras, con una presencia fuerte y personal, lejos de la idea más clásica de alianza. Diseñadas en El Baixo, parten de todo lo que hay detrás de una pareja: el camino recorrido, los vínculos que permanecen y los proyectos compartidos. Buda es oro 18k con esmalte a fuego y ónix; Eva, oro 18k con zafiro y zirconitas. Más que dos anillos, son dos piezas pensadas para acompañar una historia que lleva tiempo construyéndose. Una forma de convertir en metal y piedra lo que hace única a una pareja.",
      en: "Buda & Eva comes from a shared story that runs through years, music, friendship and family. The wedding rings take the shape of gold signets with stones, with a strong and personal presence, far from the most classic idea of a wedding ring. Designed in El Baixo, they start from everything behind a couple: the road already walked, the ties that stay and the shared plans. Buda is 18k gold with vitreous enamel and onyx; Eva is 18k gold with sapphire and cubic zirconia. More than two rings, they are two pieces made to go with a story that has been building for a long time. A way to turn into metal and stone what makes a couple their own.",
    },
  },
  {
    slug: "la-famiglia",
    title: { es: "La Famiglia", en: "La Famiglia" },
    collection: "Hecho en El Baixo",
    year: 2025,
    materials: {
      es: ["Plata 925", "Diamantes Salt & Pepper", "Esmalte a fuego", "Ónix"],
      en: ["925 silver", "Salt and pepper diamonds", "Vitreous enamel", "Onyx"],
    },
    status: "unique",
    spread: [p.laFamiglia06, p.laFamiglia04],
    // laFamiglia02 is left out: the header already shows it, rotated, as laFamiglia06.
    media: [p.laFamiglia01, p.laFamiglia04, p.laFamiglia05, p.laFamiglia03],
    story: {
      es: "La Famiglia es un retrato de familia hecho joya, construido a partir de la historia de Jesús y de las personas que han formado parte de ella. Las tres golondrinas son los hermanos, los diamantes Salt & Pepper son los abuelos, y el cielo es el padre, presente como espacio y memoria. Rudi, maestro y transmisor del oficio, también forma parte de esa historia de aprendizaje. La aguja que sostiene la pieza es la madre: la figura que une y mantiene todo en su lugar. Está hecha en plata 925 y ónix, con las golondrinas modeladas e impresas en 3D y esmaltadas a fuego. Ganó el premio AVAJOYA en La Botiga de la EASD, y con él llega a Madrijoya 2026.",
      en: "La Famiglia is a family portrait made into jewelry, built from the story of Jesús and the people who have been part of it. The three swallows are the brothers, the salt and pepper diamonds are the grandparents, and the sky is the father, present as space and memory. Rudi, his master and the person who passed the craft on, is part of that story of learning too. The pin that holds the piece is the mother: the figure who joins everything and keeps it in place. It is made in 925 silver and onyx, with the swallows modelled, 3D printed and fired with enamel. It won the AVAJOYA prize at La Botiga de la EASD, which takes it to Madrijoya 2026.",
    },
  },
];

export const getPiece = (slug: string) => pieces.find((piece) => piece.slug === slug);

export const getNextPiece = (slug: string) => {
  const index = pieces.findIndex((piece) => piece.slug === slug);
  return pieces[(index + 1) % pieces.length];
};
