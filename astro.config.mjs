import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // Needed for canonical URLs, hreflang, Open Graph and the sitemap.
  site: "https://raimundojewelry.com",
  // Cloudflare Pages redirects /info to /info/, so every URL we publish carries
  // the trailing slash. Otherwise canonical and sitemap point at a 307.
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({
      // Spanish lives at the root, English under /en. The sitemap i18n block
      // writes the hreflang pairs into the XML.
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-ES", en: "en" },
      },
      // Legal pages add nothing to search.
      filter: (page) =>
        !/\/(aviso-legal|privacidad|legal-notice|privacy)\/?$/.test(page),
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
