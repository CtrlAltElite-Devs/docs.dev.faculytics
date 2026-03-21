"use client"

import { cn } from "@/lib/utils"
import { DocsSidebar } from "./docs-sidebar"
import { useSidebar } from "./sidebar-context"

export function SidebarAside() {
  const { collapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 overflow-hidden bg-surface transition-[width] duration-200 ease-in-out lg:block",
        collapsed ? "w-14" : "w-64"
      )}
    >
      <DocsSidebar />
    </aside>
  )
}
