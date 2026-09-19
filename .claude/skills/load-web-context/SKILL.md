---
name: load-web-context
description: Load the minimum Raimundo website documentation needed for a task, following the AGENTS.md routing table instead of reading the doc tree. Use at the start of a session when asked to load/get the website or project context, get up to speed, orient, or prepare for a task in this repo — especially when asked to do it cheaply or with few tokens.
---

# Load website context

Load **only** the docs the task needs. The whole doc tree is ~22k tokens; a well-routed load is
**2-3k**. Reading more than the task requires is the failure mode this skill exists to prevent.

## The routing table is not in this file - on purpose

[AGENTS.md](../../../AGENTS.md) **is** the router. Copying its table here would create a second
version to drift, which is the problem the docs were restructured to fix. Read it and follow it.

## Procedure

### 1. Establish the task

If the user named a task ("add the WIRED piece", "change the mobile menu", "write the Info copy"),
use it.

If they did not, **ask one short question** - "What's the task?" - and stop. Do not load anything
on speculation. An unrouted load is the expensive case, and the router alone is useless without a
destination.

### 2. Read the router

Read `AGENTS.md` (~1.1k tokens). Nothing else yet. It carries the stack, the folder map, the task
table and the rules that break things silently.

### 3. Match one row and read its files

Find the row whose *task* matches and read **only** what it lists.

Rules:

- **One or two docs, not seven.** If two rows seem to fit, pick the one matching the *change you
  will make*, not the subject. Rewording a button is `brand.md` plus `src/i18n/ui.ts`, not the
  whole design system.
- **Text tasks always pair with `docs/brand.md`.** Any string a visitor reads is brand voice, and
  the tone rule and the "what Raimundo is not" list are only there.
- **Stop at the first sufficient read.** Leaf docs cross-link on purpose. Follow a link only when
  the doc defers a concrete question you actually hit ("see X for Y").
- **Then read the source files the task touches**, not the folder around them.

### 4. Report what you loaded

One or two lines, so a bad route is cheap to correct:

> Loaded `AGENTS.md` + `docs/content.md` + `docs/brand.md` (~3k tokens), then
> `src/data/pieces.ts`. Skipped structure, design, SEO and deployment - say the word if the task
> turns out to need them.

Then start the work.

## Before you finish any code change

- `pnpm check` must report 0 errors. It is the only automated check in the repo: no tests, no
  linter, no formatter.
- New visible text exists in **both** `es` and `en`.
- You did not remove `noindex` from `src/layouts/BaseLayout.astro`.

## Loading more later

If a leaf turns out to be thin, read the *specific* next file. Do not escalate to "read
everything". A second targeted read is cheap; a panic load is not.

## When a doc contradicts the code

Trust the code and say so. There is no generated documentation here, so every file is
hand-written and can go stale. Fix it in the file that owns that subject, never by adding a
second copy somewhere else, and mention the correction.

One known trap: `docs/plan-web-v1.md` describes a content model built on MDX files,
`src/content/` and `data/piezas.ts`. **None of it exists.** Content is plain TypeScript in
`src/data/pieces.ts`. `docs/content.md` is the current truth.

## Anti-patterns

| Don't | Do |
|---|---|
| Read all seven docs "to be safe" | Read the one row's files |
| Read `docs/plan-web-v1.md` or `docs/draft-v0.md` for current behaviour | They are historical, 47 KB together. Read them only when asked *why* a decision was made |
| Open `texts/RAIMUNDO DIAGNOSTICO.pdf` | `docs/brand.md` is the summary of it |
| Read `src/i18n/copy.ts` end to end to change one sentence | Grep it for the string |
| Read every file in `src/views/` | Read the one view the route table names |
| Read anything in `dist/` | It is build output |
| Change a string directly in a view | Strings live in `src/i18n/ui.ts` or `src/i18n/copy.ts` |
