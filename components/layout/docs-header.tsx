"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { MobileNav } from "./mobile-nav"
import { SearchButton } from "./search"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-6">
        <MobileNav />
        <Link href="/docs" className="font-semibold">
          Faculytics <span className="text-muted-foreground font-normal">Docs</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
