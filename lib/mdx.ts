import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import { remarkMermaid } from "./remark-mermaid"
import { mdxComponents } from "@/components/mdx/mdx-components"

const CONTENT_DIR = path.join(process.cwd(), "content/docs")

export interface DocMeta {
  title: string
  description: string
  slug: string[]
}

export function getDocSlugs(): string[][] {
  const slugs: string[][] = []

  function walk(dir: string, prefix: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...prefix, entry.name])
      } else if (entry.name.endsWith(".mdx")) {
        const name = entry.name.replace(/\.mdx$/, "")
        if (name === "index") {
          if (prefix.length > 0) {
            slugs.push(prefix)
          }
        } else {
          slugs.push([...prefix, name])
        }
      }
    }
  }

  walk(CONTENT_DIR)
  return slugs
}

function resolveFilePath(slug: string[]): string | null {
  // Try direct file: content/docs/[slug].mdx
  const directPath = path.join(CONTENT_DIR, ...slug) + ".mdx"
  if (fs.existsSync(directPath)) return directPath

  // Try index: content/docs/[slug]/index.mdx
  const indexPath = path.join(CONTENT_DIR, ...slug, "index.mdx")
  if (fs.existsSync(indexPath)) return indexPath

  return null
}

export function getDocBySlugRaw(slug: string[]): { content: string; meta: DocMeta } | null {
  const filePath = resolveFilePath(slug)
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    content,
    meta: {
      title: data.title || slug[slug.length - 1],
      description: data.description || "",
      slug,
    },
  }
}

export async function getDocBySlug(slug: string[]) {
  const doc = getDocBySlugRaw(slug)
  if (!doc) return null

  const { content } = await compileMDX<DocMeta>({
    source: doc.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMermaid],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark",
                light: "github-light",
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  })

  return {
    content,
    meta: doc.meta,
  }
}

export function getAllDocs(): DocMeta[] {
  const slugs = getDocSlugs()
  const docs: DocMeta[] = []

  // Also include the root index
  const rootIndex = path.join(CONTENT_DIR, "index.mdx")
  if (fs.existsSync(rootIndex)) {
    const raw = fs.readFileSync(rootIndex, "utf-8")
    const { data } = matter(raw)
    docs.push({
      title: data.title || "Introduction",
      description: data.description || "",
      slug: [],
    })
  }

  for (const slug of slugs) {
    const doc = getDocBySlugRaw(slug)
    if (doc) docs.push(doc.meta)
  }

  return docs
}
