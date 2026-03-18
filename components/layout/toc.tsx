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
    <nav className="space-y-1">
      <p className="mb-2 text-sm font-semibold">On this page</p>
      {entries.map((entry) => (
        <a
          key={entry.slug}
          href={`#${entry.slug}`}
          className={cn(
            "block text-sm transition-colors",
            entry.depth === 3 && "pl-3",
            activeSlug === entry.slug
              ? "font-medium text-brand-blue"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {entry.title}
        </a>
      ))}
    </nav>
  )
}
