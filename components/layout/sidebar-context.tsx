"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useSidebarState, type SidebarState } from "@/hooks/use-sidebar-state"

const SidebarContext = createContext<SidebarState | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const state = useSidebarState()
  return (
    <SidebarContext.Provider value={state}>{children}</SidebarContext.Provider>
  )
}

export function useSidebar(): SidebarState {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return ctx
}
