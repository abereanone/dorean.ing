# dorean.ing

Static Astro site for [dorean.ing](https://dorean.ing): questions and answers on the dorean principle, Jesus' command to give His ministry freely (Matthew 10:8). Ministry should be supported, not sold.

Every question has a short answer with its Scripture proofs listed underneath, and most have a fuller
explanation below that. Verse previews use the Berean Standard Bible (public domain).

## Stack

- [Astro](https://astro.build/) 7.x, built to static files in `dist/`
- Served by a **Cloudflare Worker with static assets** (no Worker code), deployed by Workers Builds
- Markdown content in `src/content/questions/`
- Generated question, search and Bible artifacts for fast page rendering

## Content model

Each question lives in one Markdown file in `src/content/questions/`. The filename is the slug.

```md
---
id: 1
title: What is the dorean principle?
categories:
  - principle
authorId: ai
relatedAnswers:
  - another-question-slug
---

The short answer, one paragraph.

## Proofs

- Matthew 10:8
- Romans 3:24

<!-- LONG_ANSWER -->

The fuller explanation in Markdown. It appears under "Read the full explanation".
```

- `categories` must be ids from `src/data/categories.json`; `authorId` must be an id from
  `src/data/resources.json`.
- Single-chapter books are written without a chapter: `3 John 5-8`, `Jude 11`.
- Quote Scripture from the BSB, word for word, so that quotations match the verse previews.
- `published: false` hides a question; `suppressAuthor: true` hides its author line.

## Scripts

- `npm run dev` - local dev server (rebuilds the generated files first).
- `npm run check:questions` - check the shared tooling is in step, then validate every question file.
- `npm run new:question -- "Title"` - scaffold a question file with the next free id.
- `npm run build` - production build into `dist/`.
- `npm run check:types` - rebuild the generated files, then `astro check`.
- `npm run format` / `npm run format:check` - Prettier.

## Deployment

The site is a **Worker with static assets**, configured in `wrangler.jsonc` (`assets.directory` is
`./dist`; `not_found_handling` serves `dist/404.html` with a 404 status). Workers Builds runs
`npm run build` and then `npx wrangler deploy` on every push to `main`. Pushing to `main` is what
makes a change live.

Redirects live in `public/_redirects`, which Astro copies into `dist/`; the build adds a 301 for
every numeric question URL (`/questions/12`) above the hand-written rules. Workers static assets
allow 2,000 static and 100 dynamic redirect rules, and any rule after a splat counts as dynamic.

To preview exactly as the Worker will serve it, including redirects and the 404 page:

```bash
npm run build
npx wrangler dev
```

Restart `wrangler dev` after each build: it reads the list of files in `dist/` when it starts.

## Shared question tooling

The question scripts are the same code in every question site (catechize.ing, abolition.ing,
suffering.catechize.ing, usa, dorean.ing, biblicalcounsel.ing): `scripts/lib/questions-core.mjs`,
`build-questions.mjs`, `check-questions.mjs`, `new-question.mjs`, `shared-tooling.mjs` and
`src/lib/question-schema.js`.

- **Change them in catechize.ing only**, then run `node scripts/shared-tooling.mjs sync` there and
  commit in each site it lists.
- `npm run check:questions` (also run by CI) fails if this site's copies differ from the shared
  version recorded in `scripts/shared-tooling.lock.json`.
- Anything that must differ for one site goes in `scripts/site.config.mjs`, which is never copied.
  This site sets `longAnswers: true`.

## Credits and license

The argument follows Conley Owens's _The Dorean Principle_ (thedoreanprinciple.org, public domain) and the articles at sellingjesus.org. The answers were drafted with AI (author id `ai`) for Michael Coughlin to review. The site is built and maintained by **Michael Coughlin**.

Everything in this repository, content and code, is dedicated to the public domain: CC0 1.0
Universal (see `LICENSE`).
