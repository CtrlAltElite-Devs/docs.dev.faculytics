"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { navigation } from "@/lib/navigation"

interface SearchResult {
  title: string
  href: string
  section: string
}

function buildIndex(): SearchResult[] {
  return navigation.flatMap((section) =>
    section.links.map((link) => ({
      title: link.title,
      href: link.href,
      section: section.title,
    }))
  )
}

export function SearchButton() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const index = buildIndex()
  const results = query.trim()
    ? index.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.section.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      setQuery("")
      router.push(href)
    },
    [router]
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 w-full justify-start rounded-lg bg-surface-alt/50 text-sm text-muted-foreground shadow-none transition-colors hover:bg-surface-alt"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-3.5 w-3.5 opacity-50" />
        Search docs...
        <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[20%] translate-y-0 gap-0 overflow-hidden p-0">
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <div className="flex items-center border-b px-4">
            <Search className="mr-3 h-4 w-4 shrink-0 text-brand-blue" />
            <Input
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-12 w-full rounded-md border-0 bg-transparent py-3 text-sm shadow-none outline-none ring-0 placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>
          {query.trim() && (
            <div className="max-h-[300px] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              ) : (
                results.map((result) => (
                  <button
                    key={result.href}
                    className="flex w-full flex-col rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-brand-blue/10"
                    onClick={() => handleSelect(result.href)}
                  >
                    <span className="text-sm font-medium">{result.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {result.section}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
