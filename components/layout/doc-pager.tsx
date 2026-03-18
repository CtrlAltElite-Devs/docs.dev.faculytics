import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPagerLinks } from "@/lib/navigation"

interface DocPagerProps {
  href: string
}

export function DocPager({ href }: DocPagerProps) {
  const { prev, next } = getPagerLinks(href)

  if (!prev && !next) return null

  return (
    <nav className="mt-12 flex items-stretch gap-4 border-t border-border pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 flex-col items-start gap-1 rounded-lg border border-border px-4 py-3 transition-colors hover:border-brand-blue/40 hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="size-3" />
            Previous
          </span>
          <span className="text-sm font-medium group-hover:text-brand-blue">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 flex-col items-end gap-1 rounded-lg border border-border px-4 py-3 transition-colors hover:border-brand-blue/40 hover:bg-muted/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next
            <ChevronRight className="size-3" />
          </span>
          <span className="text-sm font-medium group-hover:text-brand-blue">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
