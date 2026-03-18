import { navigation } from "@/lib/navigation"

export const dynamic = "force-static"

export function GET() {
  const urls = navigation.flatMap((section) =>
    section.links.map((link) => link.href)
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
