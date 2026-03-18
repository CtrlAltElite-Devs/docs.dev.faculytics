"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full py-6 pr-4 pl-1">
      <div className="space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h4 className="mb-1 px-2 text-sm font-semibold tracking-tight text-brand-blue">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    pathname === link.href
                      ? "bg-brand-blue/10 font-medium text-brand-blue"
                      : "text-muted-foreground hover:bg-brand-blue/5 hover:text-foreground"
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
