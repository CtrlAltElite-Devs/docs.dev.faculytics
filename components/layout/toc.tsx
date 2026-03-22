"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { TocEntry } from "@/lib/toc"

interface TocProps {
  entries: TocEntry[]
}

export function Toc({ entries }: TocProps) {
  const [activeSlug, setActiveSlug] = useState<string>("")

  useEffect(() => {
    if (entries.length === 0) return

    const observer = new IntersectionObserver(
      (intersections) => {
        for (const entry of intersections) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id)
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
    )

    const headings = entries
      .map((e) => document.getElementById(e.slug))
      .filter(Boolean) as HTMLElement[]

    for (const heading of headings) {
      observer.observe(heading)
    }

    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav className="relative">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <div className="relative border-l border-border/60">
        {entries.map((entry) => {
          const isActive = activeSlug === entry.slug
          return (
            <a
              key={entry.slug}
              href={`#${entry.slug}`}
              className={cn(
                "relative -ml-px block border-l-2 py-1 pl-3 text-[13px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                entry.depth === 3 && "pl-6",
                isActive
                  ? "border-brand-blue font-medium text-brand-blue"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {entry.title}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
