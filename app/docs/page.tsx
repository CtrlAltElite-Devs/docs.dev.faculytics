import { getDocBySlug } from "@/lib/mdx"
import { getDocBySlugRaw } from "@/lib/mdx"
import { extractToc } from "@/lib/toc"
import { Toc } from "@/components/layout/toc"
import { notFound } from "next/navigation"

export default async function DocsIndex() {
  const doc = await getDocBySlug([])
  if (!doc) notFound()

  const raw = getDocBySlugRaw([])
  const toc = raw ? extractToc(raw.content) : []

  return (
    <div className="flex">
      <article className="min-w-0 flex-1 px-8 py-6">
        <div className="prose prose-neutral dark:prose-invert max-w-3xl">
          {doc.content}
        </div>
      </article>
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 px-4 py-6 xl:block">
        <Toc entries={toc} />
      </aside>
    </div>
  )
}
