# Development

Load this to install, run, build, preview, deploy, or change tooling.

## Requirements

Node `>= 24` (enforced by `engines` in `package.json`) and pnpm. Windows is the current dev
machine; nothing in the project is platform-specific.

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:4321, live reload
pnpm dev --host # reachable from a phone on the same network
pnpm build      # static site in dist/
pnpm preview    # serve dist/
pnpm check      # astro check: TypeScript and Astro diagnostics
```

`pnpm check` must stay at 0 errors, 0 warnings, 0 hints. Run it after every change to `src/`.

Astro 7 runs `preview` in the background. Stop it with `pnpm astro preview stop`.

There is **no test runner, no linter and no formatter**. Type checking is the only automated
check. If you add one, say so in this file.

## Build

`pnpm build` produces a fully static `dist/`. 29 pages today. `sharp` converts photos and the
marble backgrounds to WebP in several sizes at build time, which is why the build is slower than
a text-only Astro site and why `src/assets/` holds the originals.

## Deployment

Cloudflare, configured in `wrangler.jsonc`:

- build command `pnpm run build`
- assets directory `./dist`
- `not_found_handling: "404-page"`, so `/404.html` serves unknown URLs

The project name is `raimundo-jewelry`. The domain is not decided yet. No preview environment is
set up; `pnpm preview` is the local check.

## Environment variables

None. `.env*` is gitignored, but nothing reads one. The site has no backend, no API keys and no
analytics.

## External services

| Service | Role |
|---|---|
| Cloudflare | Static hosting |
| Google Fonts (Montserrat) | Self-hosted through `@fontsource-variable/montserrat`. No runtime request to Google. |
| `mailto:` links | The contact "form". No form service is connected. |
| Instagram, WhatsApp | Links only, in `src/data/site.ts` |

## Dependency notes

Three pins exist for a reason. Do not bump them without checking.

- **TypeScript stays on 6.x.** `astro check` does not work with TypeScript 7 yet.
- **`pnpm-workspace.yaml` needs `allowBuilds: esbuild: false`.** Without it the install stops.
- **Astro 7.3.2, not a newer patch**, because pnpm's release-age rule blocks packages younger
  than one day. Bumping is fine once the release has aged.

## Git

Work happens on `develop`; `main` is the default branch for pull requests. `dist/`, `node_modules/`,
`.astro/` and `.env*` are gitignored. `images/` is untracked on purpose: it is a drop folder for
raw material, not part of the build.

## Fonts

Carla Sans ships as `public/fonts/carla-sans/carla-sans.woff2` (25 KB), converted from
`fonts/carla-sans.ttf` (84 KB). It is preloaded in `BaseLayout`. **Its web licence is not
confirmed.** The file does not state whether web embedding is allowed. Flag this before launch.

## Not checked yet

Safari and Firefox, real phones, touch swipe in the lightbox, keyboard-only use of the whole
site, and reduced motion in a real browser setting. The draft was tested in headless Edge at
1440x900 and 390x844. Full test record in [draft-v0.md section 8](draft-v0.md).
