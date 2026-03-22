import { getDocBySlug } from "@/lib/mdx"
import { getDocBySlugRaw } from "@/lib/mdx"
import { extractToc } from "@/lib/toc"
import { Toc } from "@/components/layout/toc"
import { DocPager } from "@/components/layout/doc-pager"
import { notFound } from "next/navigation"

export default async function DocsIndex() {
  const doc = await getDocBySlug([])
  if (!doc) notFound()

  const raw = getDocBySlugRaw([])
  const toc = raw ? extractToc(raw.content) : []

  return (
    <div className="flex">
      <article className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-16">
        <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
          <div className="animate-fade-in-subtle">
            {doc.content}
          </div>
          <DocPager href="/docs" />
        </div>
      </article>
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 py-10 pr-4 pl-2 xl:block">
        <Toc entries={toc} />
      </aside>
    </div>
  )
}
