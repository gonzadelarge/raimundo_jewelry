// Draft catalogue. Names, data and stories are placeholders.
// The real version will import one es.mdx and one en.mdx per piece (see docs/plan-web-v1.md 6.3).
import type { ImageMetadata } from "astro";
import type { Localized } from "@/i18n";
import { photos as p } from "@/data/photos";

export type PieceStatus = "available" | "limited" | "unique" | "commission" | "archive";

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

const silver = { es: ["Plata 925"], en: ["925 silver"] };
const enamel = { es: ["Plata 925", "Esmalte a fuego"], en: ["925 silver", "Vitreous enamel"] };
const gold = { es: ["Oro 750"], en: ["750 gold"] };

const story = {
  es: "Texto de ejemplo. Aquí va la historia breve de la pieza: de dónde sale la idea, qué referencias hay detrás y qué la hace particular.",
  en: "Sample text. The short story of the piece goes here: where the idea comes from, the references behind it and what makes it particular.",
};

export const pieces: Piece[] = [
  {
    slug: "colgante-luna",
    title: { es: "Colgante Luna", en: "Luna Pendant" },
    collection: "Signatura",
    year: 2026,
    materials: silver,
    status: "limited",
    edition: "3/12",
    spread: [p.real01, p.real06],
    media: [p.real06, p.real01, p.random01, p.random03, p.random04],
    story,
  },
  {
    slug: "pendiente-gota",
    title: { es: "Pendiente Gota", en: "Drop Earring" },
    collection: "Signatura",
    year: 2026,
    materials: enamel,
    status: "available",
    spread: [p.random04, p.real05],
    media: [p.real05, p.random04, p.random06, p.random08],
    story,
  },
  {
    slug: "anillo-sombra",
    title: { es: "Anillo Sombra", en: "Sombra Ring" },
    collection: "La Sombra",
    year: 2025,
    materials: enamel,
    status: "unique",
    spread: [p.random06, p.real08],
    media: [p.real08, p.random06, p.random10, p.random12, p.random16],
    story,
  },
  {
    slug: "collar-baixo",
    title: { es: "Collar Baixo", en: "Baixo Necklace" },
    collection: "Hecho en El Baixo",
    year: 2025,
    materials: silver,
    status: "commission",
    spread: [p.random08, p.real03],
    media: [p.real03, p.random08, p.random18],
    story,
  },
  {
    slug: "medallon-fuego",
    title: { es: "Medallón Fuego", en: "Fuego Medallion" },
    collection: "Esmaltes",
    year: 2025,
    materials: enamel,
    status: "limited",
    edition: "7/10",
    spread: [p.random10, p.real04],
    media: [p.real04, p.real02, p.random10, p.random14],
    story,
  },
  {
    slug: "sello-r",
    title: { es: "Sello R", en: "R Signet" },
    collection: "Signatura",
    year: 2024,
    materials: gold,
    status: "available",
    spread: [p.random12, p.random16],
    media: [p.random16, p.random12, p.random02, p.random05],
    story,
  },
  {
    slug: "pieza-archivo",
    title: { es: "Pieza de Archivo", en: "Archive Piece" },
    collection: "Primeras piezas",
    year: 2023,
    materials: silver,
    status: "archive",
    spread: [p.random14, p.real07],
    media: [p.real07, p.random14, p.random07],
    story,
  },
  {
    slug: "anillo-caballo",
    title: { es: "Anillo Caballo", en: "Caballo Ring" },
    collection: "Ajedrez",
    year: 2024,
    materials: silver,
    status: "unique",
    spread: [p.random18, p.random09],
    media: [p.random09, p.random18, p.random11, p.random13],
    story,
  },
];

export const getPiece = (slug: string) => pieces.find((piece) => piece.slug === slug);

export const getNextPiece = (slug: string) => {
  const index = pieces.findIndex((piece) => piece.slug === slug);
  return pieces[(index + 1) % pieces.length];
};
