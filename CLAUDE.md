# CLAUDE.md — docs.dev.faculytics

## Project Overview

Developer documentation site for the Faculytics platform. Built with Next.js 16, Tailwind CSS 4, and MDX. Shares the same design system (OKLch theme, shadcn/ui, fonts) as `app.faculytics`.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server (localhost:3100)
bun run build        # Production build
bun run lint         # Lint
npx tsc --noEmit     # Type check
```

## Architecture

- **MDX content** lives in `content/docs/` — each `.mdx` file has `title` and `description` frontmatter
- **Navigation** is statically defined in `lib/navigation.ts` (editorial ordering)
- **MDX compilation** uses `next-mdx-remote/rsc` with remark-gfm, rehype-pretty-code, rehype-slug, rehype-autolink-headings
- **Mermaid diagrams** are transformed by a custom remark plugin (`lib/remark-mermaid.ts`) and rendered client-side
- **Routing**: `app/docs/page.tsx` renders index, `app/docs/[...slug]/page.tsx` catches all other pages
- **Three-column layout**: sidebar (240px) | content (flex) | TOC (200px, hidden below xl)

## Adding a New Doc Page

1. Create `content/docs/<section>/<slug>.mdx` with frontmatter
2. Add the page to the navigation tree in `lib/navigation.ts`
3. Verify with `bun run dev`

## Conventions

- Mermaid diagrams work automatically in ` ```mermaid ` code fences
- Internal links use `/docs/` paths (e.g., `/docs/architecture/overview`)
- Code blocks get syntax highlighting and copy buttons automatically
- Use `<Callout type="info|warning|danger">` for admonitions
- Avoid `<` in prose text — MDX interprets it as JSX (rephrase `<= 0.01` as "0.01 or below")

## AI Agent Support

- `/llms.txt` — Machine-readable index of all docs with titles and descriptions
- `/llms-full.txt` — All documentation concatenated as plain markdown (single fetch)
- `/robots.txt` — Allows all crawlers
- `/sitemap.xml` — XML sitemap of all doc pages

## Content Sync

Source docs live in `api.faculytics/docs/`, `app.faculytics/docs/`, `topic.worker.faculytics/docs/`, `sentiment.worker.temp.faculytics/docs/`, and `embedding.worker.faculytics/docs/`. The API and app sources are `.md` files adapted for MDX; the worker sources are already `.mdx` with frontmatter. Use `/sync-docs` to detect and fix content drift between the source and the docs site.
