import { notFound } from "next/navigation"
import { getDocBySlug, getDocBySlugRaw, getDocSlugs } from "@/lib/mdx"
import { extractToc } from "@/lib/toc"
import { Toc } from "@/components/layout/toc"
import { DocPager } from "@/components/layout/doc-pager"
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
      <article className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-16">
        <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
          <div className="mb-8 not-prose">
            <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
              {doc.meta.title}
            </h1>
            {doc.meta.description && (
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {doc.meta.description}
              </p>
            )}
            <div className="mt-6 h-px bg-gradient-to-r from-brand-blue/30 via-border to-transparent" />
          </div>
          {doc.content}
          <DocPager href={`/docs/${slug.join("/")}`} />
        </div>
      </article>
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 pr-4 pl-2 xl:block">
        <Toc entries={toc} />
      </aside>
    </div>
  )
}
