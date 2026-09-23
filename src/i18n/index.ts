export type Locale = "es" | "en";

export type Localized<T> = Record<Locale, T>;

export type RouteKey = "home" | "info" | "baixo" | "contact" | "legal" | "privacy";

// Every path ends with "/". Cloudflare Pages redirects the slashless form with a
// 307, so the trailing slash is the real URL. Canonical, hreflang and the sitemap
// all read from here, and astro.config.mjs sets trailingSlash: "always" to match.
const routes: Record<RouteKey, Localized<string>> = {
  home: { es: "/", en: "/en/" },
  info: { es: "/info/", en: "/en/info/" },
  baixo: { es: "/el-baixo/", en: "/en/el-baixo/" },
  contact: { es: "/contacto/", en: "/en/contact/" },
  legal: { es: "/aviso-legal/", en: "/en/legal-notice/" },
  privacy: { es: "/privacidad/", en: "/en/privacy/" },
};

export const otherLocale = (locale: Locale): Locale => (locale === "es" ? "en" : "es");

export const routePath = (key: RouteKey, locale: Locale) => routes[key][locale];

export const piecePath = (slug: string, locale: Locale) =>
  locale === "es" ? `/piezas/${slug}/` : `/en/pieces/${slug}/`;

export const htmlLang: Localized<string> = { es: "es-ES", en: "en" };

export { ui } from "./ui";
export { copy } from "./copy";
