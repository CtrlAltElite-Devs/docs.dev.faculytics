"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchButton } from "./search"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5 pb-6">
        <SearchButton />
      </div>
      <ScrollArea className="flex-1 pr-3 pl-4 pb-5">
        <div className="space-y-5">
          {navigation.map((section) => (
            <div key={section.title}>
              <h4 className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wider text-brand-blue/80">
                {section.title}
              </h4>
              <div className="relative space-y-px">
                {section.links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative block rounded-md px-3 py-1.5 text-[13px] transition-all duration-150",
                        isActive
                          ? "bg-brand-blue/10 font-medium text-brand-blue"
                          : "text-muted-foreground hover:bg-surface-alt hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <span className="absolute top-1 left-0 h-[calc(100%-0.5rem)] w-[2px] rounded-full bg-brand-blue" />
                      )}
                      {link.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
