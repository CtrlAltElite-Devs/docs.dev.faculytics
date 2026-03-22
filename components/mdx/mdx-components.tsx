import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { CopyButton } from "./copy-button"
import { Callout as CalloutBase } from "./callout"
import { Mermaid } from "./mermaid"

function Callout(props: React.ComponentProps<typeof CalloutBase>) {
  return (
    <AnimateOnScroll animation="animate-slide-in-left">
      <CalloutBase {...props} />
    </AnimateOnScroll>
  )
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (Array.isArray(children)) return children.map(extractText).join("")
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as React.ReactElement<{ children?: React.ReactNode }>).props.children)
  }
  return ""
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-2 scroll-m-20 font-playfair text-3xl font-bold tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <AnimateOnScroll>
      <h2
        className="mt-10 scroll-m-20 font-playfair border-b border-brand-blue/20 pb-2 text-2xl font-semibold tracking-tight first:mt-0"
        {...props}
      >
        {children}
      </h2>
    </AnimateOnScroll>
  ),
  h3: ({ children, ...props }) => (
    <AnimateOnScroll>
      <h3
        className="mt-8 scroll-m-20 font-playfair text-xl font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h3>
    </AnimateOnScroll>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mt-6 scroll-m-20 font-playfair text-lg font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-brand-blue underline underline-offset-4 hover:text-brand-blue/80"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <AnimateOnScroll>
      <blockquote
        className="mt-6 border-l-2 border-brand-blue/40 pl-6 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    </AnimateOnScroll>
  ),
  hr: (props) => <hr className="my-8" {...props} />,
  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b" {...props}>{children}</thead>
  ),
  tr: ({ children, ...props }) => (
    <tr className="m-0 border-t p-0 even:bg-surface" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </td>
  ),
  pre: ({ children, ...props }) => {
    const text = extractText(children)
    return (
      <AnimateOnScroll>
        <div className="group relative my-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <pre
            className={cn(
              "overflow-x-auto rounded-lg border bg-muted p-4 text-sm",
              "[&>code]:bg-transparent [&>code]:p-0"
            )}
            {...props}
          >
            {children}
          </pre>
          <CopyButton text={text} />
        </div>
      </AnimateOnScroll>
    )
  },
  code: ({ children, ...props }) => {
    const isInline = typeof children === "string"
    if (isInline) {
      return (
        <code
          className="relative rounded bg-brand-blue/10 px-[0.3rem] py-[0.2rem] font-mono text-sm text-brand-blue break-all"
          {...props}
        >
          {children}
        </code>
      )
    }
    return <code {...props}>{children}</code>
  },
  Callout,
  Mermaid,
}
