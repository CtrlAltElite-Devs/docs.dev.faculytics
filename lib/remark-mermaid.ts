import { visit } from "unist-util-visit"
import type { Plugin } from "unified"
import type { Root, Code } from "mdast"

export const remarkMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index === undefined) return

      parent.children[index] = {
        type: "mdxJsxFlowElement" as never,
        name: "Mermaid",
        attributes: [
          {
            type: "mdxJsxAttribute" as never,
            name: "chart",
            value: node.value,
          },
        ],
        children: [],
        data: { _mdxExplicitJsx: true },
      } as never
    })
  }
}
