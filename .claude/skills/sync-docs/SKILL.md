---
name: sync-docs
description: Detect and fix content drift between docs.dev.faculytics and the source docs in api.faculytics, app.faculytics, and worker repos.
allowed-tools: Read, Grep, Glob, Bash, Edit, Write, Agent
---

# Sync Documentation

Compare the docs site content against the authoritative source files in `api.faculytics`, `app.faculytics`, and the worker repos, detect drift, and apply updates.

## Source Mapping

The docs site (`docs.dev.faculytics/content/docs/`) is derived from these sources:

### From `api.faculytics/docs/`

Source files are `.md` — require frontmatter addition and `.md` → `.mdx` conversion.

| Source | Docs site |
|---|---|
| `architecture/core-components.md` | `content/docs/architecture/core-components.mdx` |
| `architecture/data-model.md` | `content/docs/architecture/data-model.mdx` |
| `architecture/ai-inference-pipeline.md` | `content/docs/architecture/ai-inference-pipeline.mdx` |
| `architecture/caching.md` | `content/docs/architecture/caching.mdx` |
| `architecture/questionnaire-management.md` | `content/docs/architecture/questionnaire-management.mdx` |
| `architecture/universal-ingestion.md` | `content/docs/architecture/universal-ingestion.mdx` |
| `decisions/decisions.md` | `content/docs/decisions/index.mdx` |
| `workflows/analysis-pipeline.md` | `content/docs/workflows/analysis-pipeline.mdx` |
| `workflows/analysis-job-processing.md` | `content/docs/workflows/analysis-job-processing.mdx` |
| `workflows/auth-hydration.md` | `content/docs/workflows/auth-hydration.mdx` |
| `workflows/institutional-sync.md` | `content/docs/workflows/institutional-sync.mdx` |
| `workflows/questionnaire-submission.md` | `content/docs/workflows/questionnaire-submission.mdx` |
| `worker-contracts/sentiment-worker.md` | `content/docs/worker-contracts/sentiment-worker.mdx` |
| `worker-contracts/topic-modeling-worker.md` | `content/docs/worker-contracts/topic-modeling-worker.mdx` |
| `worker-contracts/recommendations-worker.md` | `content/docs/worker-contracts/recommendations.mdx` |
| `ROADMAP.md` | `content/docs/roadmap.mdx` |

### From `app.faculytics/docs/`

Source files are `.md` — require frontmatter addition and `.md` → `.mdx` conversion.

| Source | Docs site |
|---|---|
| `ARCHITECTURE.md` | `content/docs/frontend/architecture.mdx` |

### From `topic.worker.faculytics/docs/`

Source files are already `.mdx` with frontmatter — copy content directly, only adjust internal links to use `/docs/` paths.

| Source | Docs site |
|---|---|
| `overview.mdx` | `content/docs/workers/topic-worker/overview.mdx` |
| `architecture.mdx` | `content/docs/workers/topic-worker/architecture.mdx` |
| `pipeline.mdx` | `content/docs/workers/topic-worker/pipeline.mdx` |
| `metrics.mdx` | `content/docs/workers/topic-worker/metrics.mdx` |
| `multilingual.mdx` | `content/docs/workers/topic-worker/multilingual.mdx` |
| `error-handling.mdx` | `content/docs/workers/topic-worker/error-handling.mdx` |
| `deployment.mdx` | `content/docs/workers/topic-worker/deployment.mdx` |
| `development.mdx` | `content/docs/workers/topic-worker/development.mdx` |
| `contract.mdx` | `content/docs/workers/topic-worker/contract.mdx` |

### From `sentiment.worker.temp.faculytics/docs/`

Source files are already `.mdx` with frontmatter — copy content directly, only adjust internal links to use `/docs/` paths.

| Source | Docs site |
|---|---|
| `contract.mdx` | `content/docs/workers/sentiment-worker/contract.mdx` |
| `internals.mdx` | `content/docs/workers/sentiment-worker/internals.mdx` |

### From `embedding.worker.faculytics/docs/`

Source files are already `.mdx` with frontmatter — copy content directly, only adjust internal links to use `/docs/` paths.

| Source | Docs site |
|---|---|
| `embedding-worker.mdx` | `content/docs/workers/embedding-worker/overview.mdx` |
| `architecture.mdx` | `content/docs/workers/embedding-worker/architecture.mdx` |
| `deployment.mdx` | `content/docs/workers/embedding-worker/deployment.mdx` |

### Docs-only pages (no upstream source)

These are authored directly in the docs site:

- `content/docs/index.mdx` — Introduction
- `content/docs/getting-started.mdx` — Local dev setup (references all repos)
- `content/docs/architecture/overview.mdx` — System overview
- `content/docs/worker-contracts/overview.mdx` — Worker contracts overview
- `content/docs/frontend/conventions.mdx` — Frontend conventions

## Process

1. **Detect drift**: For each mapped pair, compare the source file against the docs site `.mdx`. Ignore frontmatter (the `---` block at the top of `.mdx` files) and minor formatting differences. Focus on:
   - New sections added to the source but missing from the docs site
   - Sections removed or rewritten in the source
   - Changed technical details (entity names, field names, API shapes, config values)
   - New mermaid diagrams or updated diagrams
   - Changed file paths, module names, or architectural patterns

2. **Check for new source files**: Look for unmapped files in all source directories:
   - `.md` files in `api.faculytics/docs/` and `app.faculytics/docs/`
   - `.mdx` files in `topic.worker.faculytics/docs/`, `sentiment.worker.temp.faculytics/docs/`, and `embedding.worker.faculytics/docs/`
   Flag these as candidates for new pages.

3. **Check code references**: For docs-only pages like `getting-started.mdx` and `overview.mdx`, verify key references:
   - Package names and versions in `getting-started.mdx` against actual `package.json` files
   - Commands in `getting-started.mdx` against actual project setups
   - The project table in `overview.mdx` against the actual repo structure

4. **Report findings**: Present a summary table showing:
   - Which files are in sync
   - Which files have drift (with a brief description of what changed)
   - Any new source files that need docs site pages

5. **Apply updates**: For each drifted file:
   - Read both the source and the docs site version
   - Update the docs site `.mdx` to reflect the source changes
   - For `.md` sources (api.faculytics, app.faculytics): add frontmatter, convert links, change extension
   - For `.mdx` sources (worker repos): content can be copied more directly since they already have frontmatter — only adjust internal links to use `/docs/` paths
   - Preserve any docs-site-specific formatting (MDX components like `<Callout>`, internal link adjustments using `/docs/` paths)
   - Watch for `<` characters in prose that could break MDX parsing — rephrase comparisons like `< 25%` or `<= 0.01` to avoid JSX interpretation

6. **Verify**: Run `bun run build` to ensure no MDX compilation errors after updates.

## If `$ARGUMENTS` is provided

Focus the sync on the specific section or file specified: `$ARGUMENTS`

For example:
- `/sync-docs workflows` — Only check workflow files
- `/sync-docs architecture/data-model` — Only check the data model page
- `/sync-docs workers/topic-worker` — Only check topic worker docs
- `/sync-docs workers/sentiment-worker` — Only check sentiment worker docs
- `/sync-docs workers/embedding-worker` — Only check embedding worker docs
- `/sync-docs workers` — Check all worker docs
- `/sync-docs new` — Only check for new source files without docs pages
