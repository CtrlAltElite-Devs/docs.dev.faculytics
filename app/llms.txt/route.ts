import { getAllDocs } from "@/lib/mdx"
import { navigation } from "@/lib/navigation"

export const dynamic = "force-static"

function slugToPath(slug: string[]): string {
  return slug.length === 0 ? "/docs" : `/docs/${slug.join("/")}`
}

export function GET() {
  const docs = getAllDocs()

  const lines: string[] = [
    "# Faculytics Dev Docs",
    "",
    "> Developer documentation for the Faculytics analytics platform.",
    "> Faculytics integrates with Moodle LMS to collect and analyze multilingual student feedback",
    "> using AI (embeddings, sentiment analysis, topic modeling) for a Philippine university.",
    "",
    "## Docs",
    "",
  ]

  for (const section of navigation) {
    lines.push(`### ${section.title}`)
    lines.push("")
    for (const link of section.links) {
      const doc = docs.find((d) => slugToPath(d.slug) === link.href)
      const desc = doc?.description ? `: ${doc.description}` : ""
      lines.push(`- [${link.title}](${link.href})${desc}`)
    }
    lines.push("")
  }

  lines.push("## Optional")
  lines.push("")
  lines.push("- [Full documentation (single file)](/llms-full.txt): All documentation concatenated as plain markdown")
  lines.push("")

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
