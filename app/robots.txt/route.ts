export const dynamic = "force-static"

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: /sitemap.xml
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
