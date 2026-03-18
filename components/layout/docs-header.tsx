"use client"

import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { MobileNav } from "./mobile-nav"
import { SearchButton } from "./search"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <MobileNav />
        <Link href="/docs" className="flex shrink-0 items-center gap-2 font-semibold font-playfair">
          <Image src="/faculytics_logo.png" alt="Faculytics" width={24} height={24} className="rounded" />
          <span><span className="text-brand-blue">Faculytics</span> <span className="text-muted-foreground font-normal">Docs</span></span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
