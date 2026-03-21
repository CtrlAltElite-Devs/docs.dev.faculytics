"use client"

import { useState, useEffect, useCallback } from "react"

const COLLAPSED_KEY = "docs-sidebar-collapsed"
const SECTIONS_KEY = "docs-sidebar-sections"

export interface SidebarState {
  collapsed: boolean
  toggleCollapsed: () => void
  expandedSections: Record<string, boolean>
  toggleSection: (title: string) => void
  expandSection: (title: string) => void
}

function readLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function useSidebarState(): SidebarState {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({})
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage after mount
  useEffect(() => {
    setCollapsed(readLocalStorage(COLLAPSED_KEY, false))
    setExpandedSections(readLocalStorage(SECTIONS_KEY, {}))
    setMounted(true)
  }, [])

  // Persist collapsed state
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(COLLAPSED_KEY, JSON.stringify(collapsed))
  }, [collapsed, mounted])

  // Persist expanded sections
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(SECTIONS_KEY, JSON.stringify(expandedSections))
  }, [expandedSections, mounted])

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  const toggleSection = useCallback((title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }, [])

  const expandSection = useCallback((title: string) => {
    setExpandedSections((prev) => {
      if (prev[title]) return prev
      return { ...prev, [title]: true }
    })
  }, [])

  return {
    collapsed,
    toggleCollapsed,
    expandedSections,
    toggleSection,
    expandSection,
  }
}
