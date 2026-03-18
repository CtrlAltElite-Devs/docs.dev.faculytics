import { cn } from "@/lib/utils"
import { AlertCircle, Info, AlertTriangle } from "lucide-react"

const variants = {
  info: {
    container: "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30",
    icon: <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  warning: {
    container: "border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-950/30",
    icon: <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
  },
  danger: {
    container: "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30",
    icon: <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />,
  },
}

interface CalloutProps {
  type?: keyof typeof variants
  title?: string
  children: React.ReactNode
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const variant = variants[type]

  return (
    <div className={cn("my-6 rounded-lg border p-4", variant.container)}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">{variant.icon}</span>
        <div className="min-w-0">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-sm [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
