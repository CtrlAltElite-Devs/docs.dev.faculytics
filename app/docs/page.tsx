import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { navigation } from "@/lib/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Introduction",
  description: "Developer documentation for the Faculytics analytics platform.",
}

const sectionMeta: Record<string, string> = {
  Architecture:
    "System components, data model, AI pipeline, and caching strategies.",
  Decisions: "33 architectural decisions with rationale and trade-offs.",
  Workflows:
    "Analysis pipeline, auth flow, institutional sync, and submission steps.",
  "Worker Contracts":
    "Typed HTTP contracts for sentiment, topic, and recommendation workers.",
  "Topic Worker":
    "BERTopic-based multilingual topic modeling with quality metrics.",
  "Sentiment Worker":
    "Sentiment classification internals and API contract.",
  "Embedding Worker": "LaBSE 768-dim embedding generation service.",
  Frontend: "Feature-sliced architecture, conventions, and form rendering.",
  Roadmap: "Development progress from foundation through governance.",
}

export default function DocsIndex() {
  const sections = navigation.filter((s) => s.title !== "Getting Started")

  return (
    <div className="relative">
      {/* Dot-grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.025] dark:opacity-[0.05]" />

      {/* Hero */}
      <section className="relative px-6 pt-16 pb-12 sm:px-10 sm:pt-24 sm:pb-16 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Developer Documentation
          </p>

          <h1 className="animate-fade-up [animation-delay:80ms] mt-5 font-playfair text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            Faculytics
          </h1>

          <p className="animate-fade-up [animation-delay:160ms] mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Analytics platform integrating with Moodle&nbsp;LMS to collect and
            analyze multilingual student feedback through AI&#8209;powered
            sentiment analysis, topic modeling, and embeddings.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up [animation-delay:240ms] mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/getting-started"
              className="group inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-brand-blue/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-blue/30"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs/architecture/overview"
              className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-sm"
            >
              <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
              System Overview
            </Link>
          </div>

          {/* Gradient divider */}
          <div className="animate-fade-up [animation-delay:320ms] mt-14 h-px bg-gradient-to-r from-brand-blue/30 via-border to-transparent" />
        </div>
      </section>

      {/* Section grid */}
      <section className="relative px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, i) => {
              const Icon = section.icon
              const desc = sectionMeta[section.title] ?? ""
              return (
                <Link
                  key={section.title}
                  href={section.links[0].href}
                  className="group animate-fade-up relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/[0.04]"
                  style={{ animationDelay: `${380 + i * 50}ms` }}
                >
                  {/* Hover gradient wash */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/10 transition-all duration-300 group-hover:bg-brand-blue/15 group-hover:ring-brand-blue/25">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold tracking-tight transition-colors duration-200 group-hover:text-brand-blue">
                        {section.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                        {desc}
                      </p>
                      <span className="mt-2 inline-block text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
                        {section.links.length}{" "}
                        {section.links.length === 1 ? "page" : "pages"}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
