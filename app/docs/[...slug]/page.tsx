import { notFound } from "next/navigation"
import { getDocBySlug, getDocBySlugRaw, getDocSlugs } from "@/lib/mdx"
import { extractToc } from "@/lib/toc"
import { Toc } from "@/components/layout/toc"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const raw = getDocBySlugRaw(slug)
  if (!raw) return {}

  return {
    title: raw.meta.title,
    description: raw.meta.description,
  }
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const doc = await getDocBySlug(slug)
  if (!doc) notFound()

  const raw = getDocBySlugRaw(slug)
  const toc = raw ? extractToc(raw.content) : []

  return (
    <div className="flex">
      <article className="min-w-0 flex-1 px-8 py-6">
        <div className="prose prose-neutral dark:prose-invert max-w-3xl">
          <h1>{doc.meta.title}</h1>
          {doc.meta.description && (
            <p className="mt-2 text-lg text-muted-foreground">
              {doc.meta.description}
            </p>
          )}
          {doc.content}
        </div>
      </article>
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 px-4 py-6 xl:block">
        <Toc entries={toc} />
      </aside>
    </div>
  )
}
