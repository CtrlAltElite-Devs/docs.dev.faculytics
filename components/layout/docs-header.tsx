"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { MobileNav } from "./mobile-nav"

const quickNav = [
  { title: "Architecture", href: "/docs/architecture/overview" },
  { title: "Workflows", href: "/docs/workflows/analysis-pipeline" },
  { title: "Workers", href: "/docs/worker-contracts/overview" },
  { title: "Frontend", href: "/docs/frontend/architecture" },
  { title: "Decisions", href: "/docs/decisions" },
]

export function DocsHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 shadow-[0_1px_3px_0_rgb(0_0_0/0.05)] backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <MobileNav />
        <Link
          href="/docs"
          className="flex shrink-0 items-center gap-2.5 font-semibold font-playfair transition-opacity hover:opacity-80"
        >
          <Image
            src="/faculytics_logo.png"
            alt="Faculytics"
            width={26}
            height={26}
            className="rounded-md"
          />
          <span>
            <span className="text-brand-blue">Faculytics</span>{" "}
            <span className="text-muted-foreground font-normal text-sm">
              Docs
            </span>
          </span>
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
        <div className="flex flex-1 items-center justify-end gap-1.5 md:flex-none">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
