import type { LucideIcon } from "lucide-react"
import {
  Rocket,
  Blocks,
  Scale,
  Workflow,
  FileCode,
  MessageSquareText,
  Heart,
  Box,
  Layout,
  Map,
  GraduationCap,
} from "lucide-react"

export interface DocLink {
  title: string
  href: string
}

export interface DocSection {
  title: string
  icon: LucideIcon
  links: DocLink[]
}

/** Flatten the navigation tree into an ordered list of links. */
export function flattenNavigation(): DocLink[] {
  return navigation.flatMap((section) => section.links)
}

/** Get the previous and next doc links relative to a given href. */
export function getPagerLinks(href: string): {
  prev: DocLink | null
  next: DocLink | null
} {
  const flat = flattenNavigation()
  const index = flat.findIndex((link) => link.href === href)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  }
}

export const navigation: DocSection[] = [
  {
    title: "Getting Started",
    icon: Rocket,
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Local Dev Setup", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Architecture",
    icon: Blocks,
    links: [
      { title: "Overview", href: "/docs/architecture/overview" },
      { title: "Core Components", href: "/docs/architecture/core-components" },
      { title: "Data Model", href: "/docs/architecture/data-model" },
      { title: "AI Inference Pipeline", href: "/docs/architecture/ai-inference-pipeline" },
      { title: "Caching", href: "/docs/architecture/caching" },
      { title: "Questionnaire Management", href: "/docs/architecture/questionnaire-management" },
      { title: "Universal Ingestion", href: "/docs/architecture/universal-ingestion" },
      { title: "Analytics", href: "/docs/architecture/analytics" },
      { title: "Scope Resolution", href: "/docs/architecture/scope-resolution" },
      { title: "Audit Trail", href: "/docs/architecture/audit-trail" },
    ],
  },
  {
    title: "Decisions",
    icon: Scale,
    links: [
      { title: "Architectural Decisions", href: "/docs/decisions" },
    ],
  },
  {
    title: "Workflows",
    icon: Workflow,
    links: [
      { title: "Analysis Pipeline", href: "/docs/workflows/analysis-pipeline" },
      { title: "Analysis Job Processing", href: "/docs/workflows/analysis-job-processing" },
      { title: "Auth & Hydration", href: "/docs/workflows/auth-hydration" },
      { title: "Institutional Sync", href: "/docs/workflows/institutional-sync" },
      { title: "Questionnaire Submission", href: "/docs/workflows/questionnaire-submission" },
      { title: "Report Generation", href: "/docs/workflows/report-generation" },
      { title: "Dean Promotion", href: "/docs/workflows/dean-promotion" },
    ],
  },
  {
    title: "Moodle",
    icon: GraduationCap,
    links: [
      { title: "Provisioning", href: "/docs/moodle/provisioning" },
      { title: "API Function Index", href: "/docs/moodle/api-index" },
    ],
  },
  {
    title: "Worker Contracts",
    icon: FileCode,
    links: [
      { title: "Overview", href: "/docs/worker-contracts/overview" },
      { title: "Sentiment Worker", href: "/docs/worker-contracts/sentiment-worker" },
      { title: "Topic Modeling Worker", href: "/docs/worker-contracts/topic-modeling-worker" },
      { title: "Recommendations", href: "/docs/worker-contracts/recommendations" },
    ],
  },
  {
    title: "Topic Worker",
    icon: MessageSquareText,
    links: [
      { title: "Overview", href: "/docs/workers/topic-worker/overview" },
      { title: "Architecture", href: "/docs/workers/topic-worker/architecture" },
      { title: "BERTopic Pipeline", href: "/docs/workers/topic-worker/pipeline" },
      { title: "Quality Metrics", href: "/docs/workers/topic-worker/metrics" },
      { title: "Multilingual Support", href: "/docs/workers/topic-worker/multilingual" },
      { title: "Error Handling", href: "/docs/workers/topic-worker/error-handling" },
      { title: "API Contract", href: "/docs/workers/topic-worker/contract" },
      { title: "Deployment", href: "/docs/workers/topic-worker/deployment" },
      { title: "Development", href: "/docs/workers/topic-worker/development" },
    ],
  },
  {
    title: "Sentiment Worker",
    icon: Heart,
    links: [
      { title: "Contract", href: "/docs/workers/sentiment-worker/contract" },
      { title: "Internals", href: "/docs/workers/sentiment-worker/internals" },
    ],
  },
  {
    title: "Embedding Worker",
    icon: Box,
    links: [
      { title: "Overview", href: "/docs/workers/embedding-worker/overview" },
      { title: "Architecture", href: "/docs/workers/embedding-worker/architecture" },
      { title: "Deployment", href: "/docs/workers/embedding-worker/deployment" },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    links: [
      { title: "Architecture", href: "/docs/frontend/architecture" },
      { title: "Conventions", href: "/docs/frontend/conventions" },
      { title: "Questionnaire Form Renderer", href: "/docs/frontend/questionnaire-form-renderer" },
    ],
  },
  {
    title: "Roadmap",
    icon: Map,
    links: [
      { title: "Roadmap", href: "/docs/roadmap" },
    ],
  },
]
