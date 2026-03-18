import GithubSlugger from "github-slugger"

export interface TocEntry {
  title: string
  slug: string
  depth: number
}

export function extractToc(rawContent: string): TocEntry[] {
  const slugger = new GithubSlugger()
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []
  let match

  while ((match = headingRegex.exec(rawContent)) !== null) {
    const depth = match[1].length
    const title = match[2].replace(/\*\*(.+?)\*\*/g, "$1").replace(/`(.+?)`/g, "$1").trim()
    entries.push({
      title,
      slug: slugger.slug(title),
      depth,
    })
  }

  return entries
}
