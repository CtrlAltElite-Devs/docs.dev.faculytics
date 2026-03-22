"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible } from "radix-ui"
import { ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { SearchButton, SearchIconButton } from "./search"
import { useSidebar } from "./sidebar-context"

interface DocsSidebarProps {
  forceExpanded?: boolean
}

export function DocsSidebar({ forceExpanded }: DocsSidebarProps) {
  const pathname = usePathname()
  const sidebar = useSidebar()
  const collapsed = forceExpanded ? false : sidebar.collapsed
  const { expandedSections, toggleSection, expandSection, toggleCollapsed } =
    sidebar

  // Auto-expand the section that contains the active page
  useEffect(() => {
    const activeSection = navigation.find((section) =>
      section.links.some((link) => link.href === pathname)
    )
    if (activeSection) {
      expandSection(activeSection.title)
    }
  }, [pathname, expandSection])

  // Determine if a section is expanded (default to true if not explicitly set)
  const isSectionOpen = (title: string) => expandedSections[title] !== false

  if (collapsed) {
    return (
      <div className="flex h-full flex-col items-center py-3">
        <div className="mb-3">
          <SearchIconButton />
        </div>
        <ScrollArea className="min-h-0 flex-1 w-full">
          <div className="flex flex-col items-center gap-1 px-1.5">
            {navigation.map((section) => {
              const SectionIcon = section.icon
              const isActiveSection = section.links.some(
                (link) => link.href === pathname
              )
              return (
                <Tooltip key={section.title}>
                  <TooltipTrigger asChild>
                    <Link href={section.links[0].href}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-9 w-9 shrink-0",
                          isActiveSection
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "text-muted-foreground hover:bg-surface-alt hover:text-foreground"
                        )}
                      >
                        <SectionIcon className="h-4 w-4" />
                        <span className="sr-only">{section.title}</span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {section.title}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </ScrollArea>
        <div className="mt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                onClick={toggleCollapsed}
              >
                <PanelLeftOpen className="h-4 w-4" />
                <span className="sr-only">Expand sidebar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              Expand sidebar
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5 pb-4">
        <SearchButton />
      </div>
      <ScrollArea className="min-h-0 flex-1 pr-3 pl-4 pb-3">
        <div className="space-y-1">
          {navigation.map((section) => {
            const SectionIcon = section.icon
            const open = isSectionOpen(section.title)

            return (
              <Collapsible.Root
                key={section.title}
                open={open}
                onOpenChange={() => toggleSection(section.title)}
              >
                <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-blue/80 transition-colors hover:bg-surface-alt">
                  <SectionIcon className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 text-left">{section.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                      open && "rotate-90"
                    )}
                  />
                </Collapsible.Trigger>
                <Collapsible.Content forceMount className="collapsible-content">
                  <div>
                    <div className="mt-0.5 space-y-px pl-2">
                      {section.links.map((link) => {
                        const isActive = pathname === link.href
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                              "block rounded-lg py-1.5 text-[13px] transition-all duration-150",
                              isActive
                                ? "border-l-2 border-brand-blue bg-brand-blue/10 pl-2.5 font-medium text-brand-blue"
                                : "border-l-2 border-transparent pl-3 text-muted-foreground hover:border-border hover:bg-surface-alt hover:pl-4 hover:text-foreground"
                            )}
                          >
                            {link.title}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            )
          })}
        </div>
      </ScrollArea>
      {!forceExpanded && (
        <div className="border-t border-border/50 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={toggleCollapsed}
          >
            <PanelLeftClose className="h-4 w-4" />
            <span className="text-xs">Collapse</span>
          </Button>
        </div>
      )}
    </div>
  )
}
