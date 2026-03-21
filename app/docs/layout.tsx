import { DocsHeader } from "@/components/layout/docs-header"
import { SidebarAside } from "@/components/layout/docs-layout-shell"
import { SidebarProvider } from "@/components/layout/sidebar-context"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <DocsHeader />
          <div className="flex">
            <SidebarAside />
            <main className="min-w-0 flex-1 border-x border-border/50">
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}
