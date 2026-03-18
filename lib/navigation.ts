export interface DocLink {
  title: string
  href: string
}

export interface DocSection {
  title: string
  links: DocLink[]
}

export const navigation: DocSection[] = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Local Dev Setup", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Architecture",
    links: [
      { title: "Overview", href: "/docs/architecture/overview" },
      { title: "Core Components", href: "/docs/architecture/core-components" },
      { title: "Data Model", href: "/docs/architecture/data-model" },
      { title: "AI Inference Pipeline", href: "/docs/architecture/ai-inference-pipeline" },
      { title: "Caching", href: "/docs/architecture/caching" },
      { title: "Questionnaire Management", href: "/docs/architecture/questionnaire-management" },
      { title: "Universal Ingestion", href: "/docs/architecture/universal-ingestion" },
    ],
  },
  {
    title: "Decisions",
    links: [
      { title: "Architectural Decisions", href: "/docs/decisions" },
    ],
  },
  {
    title: "Workflows",
    links: [
      { title: "Analysis Pipeline", href: "/docs/workflows/analysis-pipeline" },
      { title: "Analysis Job Processing", href: "/docs/workflows/analysis-job-processing" },
      { title: "Auth & Hydration", href: "/docs/workflows/auth-hydration" },
      { title: "Institutional Sync", href: "/docs/workflows/institutional-sync" },
      { title: "Questionnaire Submission", href: "/docs/workflows/questionnaire-submission" },
    ],
  },
  {
    title: "Worker Contracts",
    links: [
      { title: "Overview", href: "/docs/worker-contracts/overview" },
      { title: "Sentiment Worker", href: "/docs/worker-contracts/sentiment-worker" },
      { title: "Topic Modeling Worker", href: "/docs/worker-contracts/topic-modeling-worker" },
      { title: "Recommendations", href: "/docs/worker-contracts/recommendations" },
    ],
  },
  {
    title: "Frontend",
    links: [
      { title: "Architecture", href: "/docs/frontend/architecture" },
      { title: "Conventions", href: "/docs/frontend/conventions" },
    ],
  },
  {
    title: "Roadmap",
    links: [
      { title: "Roadmap", href: "/docs/roadmap" },
    ],
  },
]
