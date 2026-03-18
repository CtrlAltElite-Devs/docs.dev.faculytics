import { DocsHeader } from "@/components/layout/docs-header"
import { DocsSidebar } from "@/components/layout/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DocsHeader />
      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 bg-surface lg:block">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1 border-x border-border/50">
          {children}
        </main>
      </div>
    </div>
  )
}
