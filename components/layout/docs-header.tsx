"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { MobileNav } from "./mobile-nav"
import { SearchIconButton } from "./search"

const quickNav = [
  { title: "Architecture", href: "/docs/architecture/overview" },
  { title: "Workflows", href: "/docs/workflows/analysis-pipeline" },
  { title: "Workers", href: "/docs/worker-contracts/overview" },
  { title: "Frontend", href: "/docs/frontend/architecture" },
  { title: "Decisions", href: "/docs/decisions" },
]

export function DocsHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[border-color,box-shadow,background-color] duration-200",
        scrolled
          ? "border-border/60 bg-background/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background/80 backdrop-blur-sm"
      )}
    >
      {/* Brand accent gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-brand-blue/80 via-brand-blue/40 to-transparent" />
      <div className="flex h-14 items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <MobileNav />
        <Link
          href="/docs"
          className="shrink-0 font-playfair text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="text-brand-blue">Faculytics</span>{" "}
          <span className="text-foreground">Docs</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {quickNav.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[13px] transition-colors",
                  isActive
                    ? "bg-brand-blue/10 font-medium text-brand-blue"
                    : "text-muted-foreground hover:bg-surface-alt hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-1 md:flex-none">
          <span className="lg:hidden">
            <SearchIconButton />
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
