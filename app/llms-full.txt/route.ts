import { navigation } from "@/lib/navigation"
import { getDocBySlugRaw } from "@/lib/mdx"

export const dynamic = "force-static"

function hrefToSlug(href: string): string[] {
  const path = href.replace(/^\/docs\/?/, "")
  return path === "" ? [] : path.split("/")
}

function stripMdxComponents(content: string): string {
  // Remove JSX-style component tags like <Callout>, <Mermaid>, etc.
  return content
    .replace(/<Callout[^>]*>|<\/Callout>/g, "")
    .replace(/<Mermaid[^>]*\/>/g, "")
    .replace(/<Mermaid[^>]*>|<\/Mermaid>/g, "")
}

export function GET() {
  const lines: string[] = [
    "# Faculytics Dev Docs — Full Documentation",
    "",
    "> Developer documentation for the Faculytics analytics platform.",
    "> Faculytics integrates with Moodle LMS to collect and analyze multilingual student feedback",
    "> using AI (embeddings, sentiment analysis, topic modeling) for a Philippine university.",
    "",
    "---",
    "",
  ]

  for (const section of navigation) {
    for (const link of section.links) {
      const slug = hrefToSlug(link.href)
      const doc = getDocBySlugRaw(slug)
      if (!doc) continue

      lines.push(`# ${doc.meta.title}`)
      if (doc.meta.description) {
        lines.push("")
        lines.push(`> ${doc.meta.description}`)
      }
      lines.push("")
      lines.push(stripMdxComponents(doc.content).trim())
      lines.push("")
      lines.push("---")
      lines.push("")
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
