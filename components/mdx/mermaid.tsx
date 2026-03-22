"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Skeleton } from "@/components/ui/skeleton"

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, "-")
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let cancelled = false

    async function render() {
      setLoading(true)
      const mermaid = (await import("mermaid")).default
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "default",
        securityLevel: "loose",
      })

      try {
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, chart)
        if (!cancelled) {
          setSvg(rendered)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setSvg(`<pre class="text-destructive text-sm">${chart}</pre>`)
          setLoading(false)
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart, id, resolvedTheme])

  if (loading) {
    return <Skeleton className="my-6 h-48 w-full rounded-lg" />
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto animate-in fade-in duration-500 [&>svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
