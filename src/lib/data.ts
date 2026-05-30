// Single source of truth for all portfolio content.
// Derived from Daniel Ventura's CV — do not invent facts.

export const personal = {
  name: "Daniel Ventura",
  title: "Senior Full-Stack Developer",
  tagline: "Full Stack Engineer · Team Lead · AI-Assisted Engineering · Architecture & Design",
  location: "Israel",
  email: "danivngopro@gmail.com",
  linkedin: "https://www.linkedin.com/in/daniel-v-03b663152/",
  github: "https://github.com/danivngopro",
  bio: [
    "Senior full-stack engineer with production experience across military-grade internal systems and commercial web platforms. I design, build, and ship end-to-end systems — from API architecture and database modeling to polished, performant frontends.",
    "I lead teams, drive code quality through review culture, and integrate AI-assisted workflows (Claude, GPT-4, GitHub Copilot, MCP) as first-class engineering practices — not novelties.",
    "My background in Mathematics & Computer Science with a Cybersecurity major means I think about correctness, security, and system invariants from the ground up.",
  ],
} as const;

export const experience = [
  {
    id: "idf-lead",
    role: "Full-Stack Team Lead",
    company: "IDF (Israel Defense Forces)",
    period: "2024 – 2026",
    type: "Full-time",
    description:
      "Led a cross-functional full-stack team building mission-critical operational platforms. Owned architecture, sprint planning, code quality, and AI integration strategy across the team.",
    highlights: [
      "Architected and delivered high-availability production systems used daily by operational teams",
      "Drove team-wide adoption of AI-assisted development — LLMs, local Ollama models, and MCP tooling",
      "Managed sprint planning, code reviews, and onboarding; grew engineers from junior to mid/senior",
      "Designed event-driven pipelines using RabbitMQ, Redis caching layers, and k8s-orchestrated services",
    ],
    tech: ["TypeScript", "Python", "React", "Node.js", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Docker", "Kubernetes", "AWS", "Linux", "LLM"],
  },
  {
    id: "idf-engineer",
    role: "Full-Stack Engineer",
    company: "IDF (Israel Defense Forces)",
    period: "2020 – 2024",
    type: "Full-time",
    description:
      "Developed full-stack features on internal platforms handling real-time data at scale. Built APIs, queue-driven services, and containerized deployments on AWS infrastructure.",
    highlights: [
      "Built RESTful APIs and real-time WebSocket services for live operational data feeds",
      "Implemented message-queue driven microservices using RabbitMQ and Redis pub/sub",
      "Deployed and maintained containerized services on Kubernetes clusters in AWS",
      "Contributed to MongoDB and Redis schema design and query optimization",
    ],
    tech: ["TypeScript", "Python", "React", "Node.js", "MongoDB", "Git", "REST APIs", "Redis", "RabbitMQ", "Docker", "Kubernetes"],
  },
  {
    id: "dynamic-web",
    role: "Full-Stack Developer",
    company: "Dynamic Web",
    period: "2021 – 2022",
    type: "Full-time",
    description:
      "Delivered full-stack web solutions for commercial clients across multiple tech stacks including .NET/C#, Node.js, and multiple frontend frameworks.",
    highlights: [
      "Built client applications using React and Angular with TypeScript; backend services in Node.js and C#",
      "Developed REST APIs and integrated third-party services for client business logic",
      "Managed SQL and MongoDB databases — schema design, migrations, and query tuning",
      "Collaborated directly with clients from requirements through deployment and iteration",
    ],
    tech: ["TypeScript", "C#", "Python", "React", "Angular", "Node.js", "SQL", "MongoDB", "REST APIs"],
  },
] as const;

export type ExperienceItem = (typeof experience)[number];

export const skills = [
  {
    category: "Backend & Architecture",
    icon: "Server",
    items: [
      "Node.js",
      "TypeScript",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "System Design",
      "PostgreSQL",
      "MySQL",
      "Redis",
    ],
  },
  {
    category: "Frontend",
    icon: "Monitor",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion",
      "Responsive Design",
      "Accessibility",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: "Cloud",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "Nginx",
      "Linux",
      "Terraform",
    ],
  },
  {
    category: "Data & Performance",
    icon: "Database",
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "MongoDB",
      "Query Optimization",
      "Indexing",
      "Caching Strategies",
      "Real-time Data",
    ],
  },
  {
    category: "AI-Assisted Development",
    icon: "Bot",
    items: [
      "Claude",
      "GPT-4",
      "GitHub Copilot",
      "MCP Servers",
      "Prompt Engineering",
      "AI Code Review",
      "Test Generation",
      "Cursor",
      "Claude Code",
      "Continue.dev",
      "Windsurf",
      "Ollama",
    ],
  },
  {
    category: "Leadership",
    icon: "Users",
    items: [
      "Team Leadership",
      "Code Review",
      "Architecture Design",
      "Mentoring",
      "Sprint Planning",
      "Technical Specs",
      "Stakeholder Communication",
    ],
  },
] as const;

export type SkillCategory = (typeof skills)[number];

export const aiWorkflow = [
  {
    step: 1,
    title: "Understand requirements manually",
    description:
      "Read the spec, ask questions, identify edge cases, and understand system boundaries before writing any code or prompting an AI.",
    icon: "Brain",
  },
  {
    step: 2,
    title: "Break into architecture, data model, API, UI, and deployment tasks",
    description:
      "Decompose the work into implementation layers: data model, API contract, business logic, frontend integration, and deployment considerations.",
    icon: "Network",
  },
  {
    step: 3,
    title: "Use AI for alternatives, scaffolding, debugging, and test generation",
    description:
      "Prompt AI with explicit context, constraints, and expected output format. Use it for architecture options, scaffolding, debugging assistance, and test scaffolds.",
    icon: "Zap",
  },
  {
    step: 4,
    title: "Review generated code manually",
    description:
      "Every AI-generated output is read line by line. Logic, security assumptions, and edge cases are verified before the code reaches staging.",
    icon: "Code",
  },
  {
    step: 5,
    title: "Add validation, edge cases, and tests",
    description:
      "Add Zod validation at system boundaries, write tests for edge cases, and ensure error paths are handled — AI scaffolds rarely cover these fully.",
    icon: "TestTube",
  },
  {
    step: 6,
    title: "Refactor for maintainability",
    description:
      "Improve naming, reduce duplication, split oversized functions, and ensure the code reads clearly to a future reviewer unfamiliar with the AI session.",
    icon: "Wrench",
  },
  {
    step: 7,
    title: "Deploy, verify, and document",
    description:
      "Release with health checks, monitor logs, validate in production, and document architecture decisions and non-obvious tradeoffs.",
    icon: "Server",
  },
] as const;

export const securityMeasures = [
  {
    title: "Strict Input Validation",
    description:
      "All user-facing data validated with Zod schemas at system boundaries. No untrusted input reaches business logic or databases.",
    icon: "Shield",
    tag: "Zod",
  },
  {
    title: "Security HTTP Headers",
    description:
      "Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, and Permissions-Policy configured in next.config.ts.",
    icon: "Lock",
    tag: "next.config.ts",
  },
  {
    title: "XSS Prevention",
    description:
      "No dangerouslySetInnerHTML without DOMPurify sanitization. React's JSX escaping as default defense. CSP blocks inline script injection.",
    icon: "ShieldAlert",
    tag: "React + DOMPurify",
  },
  {
    title: "Rate Limiting Concept",
    description:
      "Contact form and API routes designed for rate-limiting middleware (e.g. Upstash Redis). Prevents brute-force and spam abuse.",
    icon: "Timer",
    tag: "API Design",
  },
  {
    title: "Bot & Spam Protection",
    description:
      "Honeypot fields and server-side validation as first line. Cloudflare Turnstile or hCaptcha as second line for public contact forms.",
    icon: "Bot",
    tag: "Anti-spam",
  },
  {
    title: "Safe Error Handling",
    description:
      "Never expose internal errors, stack traces, or system paths to clients. Structured error responses with sanitized messages only.",
    icon: "AlertCircle",
    tag: "Error Hygiene",
  },
  {
    title: "Content Security Policy",
    description:
      "CSP headers restrict script, style, and resource origins. Blocks unauthorized third-party code injection and data exfiltration.",
    icon: "FileCode",
    tag: "CSP",
  },
  {
    title: "Dependency Awareness",
    description:
      "Regular npm audit runs. Pinned dependency versions in production. Supply-chain risk awareness — no blind package installs.",
    icon: "Package",
    tag: "Supply Chain",
  },
  {
    title: "Prompt-Injection Awareness",
    description:
      "When integrating LLMs, user inputs are never concatenated directly into system prompts. Structured message formatting prevents prompt-injection attacks.",
    icon: "Brain",
    tag: "AI Security",
  },
] as const;

export type ProjectStatus = "live" | "sanitized" | "internal" | "public" | "coming-soon";

export type Project = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly status: ProjectStatus;
  readonly badge?: string;
  readonly year: string;
};

export type CaseStudy = {
  readonly id: string;
  readonly title: string;
  readonly label: string;
  readonly problem: string;
  readonly approach: readonly string[];
  readonly role: string;
  readonly result: string;
  readonly note: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    id: "operational-dashboard",
    title: "Real-Time Operational Dashboard",
    label: "Sanitized Architecture",
    problem: "Internal teams needed fast, reliable access to operational data.",
    approach: [
      "Security, reliability, role-based access, and no public exposure as hard constraints.",
      "React/TypeScript frontend with a Node.js API layer and database-backed services.",
      "Redis caching for low-latency reads and an event-driven real-time update layer.",
      "Low-latency UI designed for operational usage under real load.",
    ],
    role: "Architecture, backend/API design, frontend integration, code reviews, and release validation.",
    result: "Production-grade internal system used daily by operational users.",
    note: "Sanitized summary — no classified details included.",
  },
  {
    id: "ai-workflow",
    title: "AI-Assisted Engineering Workflow",
    label: "Modern Development",
    problem: "Improve development speed without lowering code quality.",
    approach: [
      "Use Claude, GPT, Codex, Ollama, and MCP for architecture exploration, scaffolding, debugging, test generation, and refactoring.",
      "Every AI output is reviewed, tested, and adjusted before shipping.",
      "Human control stays at architecture, review, and production decisions.",
    ],
    role: "Engineering judgment, integration design, and workflow ownership.",
    result: "Faster iteration with senior-level accountability.",
    note: "AI accelerates the workflow; engineering judgment owns the result.",
  },
  {
    id: "secure-delivery",
    title: "Secure Full-Stack Delivery",
    label: "Security & Reliability",
    problem: "Ship full-stack systems that are maintainable, secure, and production-ready.",
    approach: [
      "Validation at system boundaries, RBAC mindset, and API error hygiene.",
      "Docker-based deployment with health checks, logging, and release validation.",
      "Security-minded code review as a standard part of the delivery process.",
    ],
    role: "Design, implementation, code reviews, and deployment readiness.",
    result: "Safer delivery of production features.",
    note: "Security decisions are described generically to avoid exposing internal implementation details.",
  },
];

export const projects: readonly Project[] = [
  {
    id: "operational-dashboard",
    title: "Operational Command Dashboard",
    description:
      "Mission-critical real-time monitoring platform serving internal command teams at IDF. Full TypeScript stack with live WebSocket feeds, RBAC, and <1s latency requirements. Designed for high availability, low-latency operational usage, and safe release validation. Served 1,000+ operational users.",
    tags: ["TypeScript", "Python", "React", "Node.js", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Docker", "Kubernetes", "AWS", "Linux"] as const,
    status: "sanitized",
    badge: "Sanitized Case Study",
    year: "2024–2026",
  },
  {
    id: "ai-dev-pipeline",
    title: "AI-Augmented Dev Pipeline",
    description:
      "Internal developer tooling integrating Claude API + OpenAI for automated code review, test generation, and PR analysis. Reduced average review cycle time significantly and standardised quality gates across the engineering team.",
    tags: ["Claude API", "OpenAI", "MCP", "TypeScript", "Node.js", "GitHub Actions"] as const,
    status: "internal",
    year: "2023–Present",
  },
  {
    id: "microservices-platform",
    title: "Cloud-Native Microservices Platform",
    description:
      "Containerised Node.js microservices on AWS ECS with GitHub Actions CI/CD, blue-green deployments, centralised structured logging, and auto-scaling. Infrastructure-as-code via Terraform. Serves internal teams across multiple environments.",
    tags: ["AWS ECS", "Docker", "Terraform", "GitHub Actions", "Node.js", "Redis"] as const,
    status: "internal",
    year: "2021–2022",
  },
  {
    id: "client-platform",
    title: "B2B Client Engagement Platform",
    description:
      "Full-stack SaaS platform built at Dynamic Web for B2B clients. React SPA, Express REST API, MySQL. Features include CRM integration, automated email workflows, real-time analytics, and a white-label multi-tenant architecture.",
    tags: ["React", "Node.js", "Express", "MySQL", "REST API", "AWS S3"] as const,
    status: "sanitized",
    badge: "Sanitized Case Study",
    year: "2021–2022",
  },
];

export const education = [
  {
    id: "bsc",
    degree: "B.Sc. Mathematics & Computer Science",
    major: "Cybersecurity",
    institution: "Ariel University",
    period: "2018 – 2021",
    description:
      "Core focus on mathematical foundations of computing — algorithms, discrete math, probability — combined with applied computer science and a cybersecurity specialization covering cryptography, network security, and secure software development.",
  },
  {
    id: "mba",
    degree: "MBA in Economics",
    major: "Business Administration",
    institution: "The Open University of Israel",
    period: "2024 – 2026",
    description:
      "Business and economic strategy from an engineering leadership perspective. Covers organizational management, product economics, and decision-making frameworks for senior technical roles.",
  },
] as const;

export type EducationItem = (typeof education)[number];

// ─── Tech descriptions ─────────────────────────────────────────────
// Used by the Skills section to show contextual info when a tech is clicked.
// Each entry has a `what` (general definition) and `experience` (Daniel's use).
export const techDescriptions: Record<string, { what: string; experience: string }> = {
  // Backend & Architecture
  "Node.js": {
    what: "A JavaScript/TypeScript runtime built on V8 — runs server-side code, event-driven I/O, and powers the majority of JS backends.",
    experience: "Primary backend runtime across all roles. Built REST APIs, WebSocket servers, CLI tooling, and microservices. Comfortable with the event loop, streams, clustering, and production performance tuning.",
  },
  "TypeScript": {
    what: "A strongly-typed superset of JavaScript that catches errors at compile time, enables better tooling, and makes large codebases maintainable.",
    experience: "TypeScript-first for 7+ years across every layer — APIs, React components, database models, shared utilities. Introduced strict mode as a team standard at IDF. Strong with generics, discriminated unions, utility types, and `satisfies`.",
  },
  "REST APIs": {
    what: "Architectural style for distributed systems. Resources are exposed over HTTP with standard verbs (GET/POST/PUT/DELETE), enabling clean, cacheable, stateless interfaces.",
    experience: "Designed and maintained production REST APIs across all three roles. Consistent use of versioning, error envelopes, OpenAPI specs, and integration test coverage.",
  },
  "GraphQL": {
    what: "A query language for APIs that lets clients request exactly the data they need. Reduces over-fetching, enables declarative data requirements, and self-documents via introspection.",
    experience: "Used GraphQL on internal platforms at IDF where clients needed flexible query patterns. Familiar with Apollo Server, schema design, and DataLoader for N+1 prevention.",
  },
  "Microservices": {
    what: "An architectural pattern that structures an application as a collection of small, independently deployable services, each responsible for a specific business capability.",
    experience: "Designed and maintained microservice boundaries on the IDF cloud platform. Handled inter-service communication (REST + events), service discovery, and graceful degradation strategies.",
  },
  "System Design": {
    what: "The process of defining architecture, components, interfaces, and data flows for a system to satisfy specified requirements — covering scalability, reliability, and maintainability.",
    experience: "Led architectural decisions at IDF Team Lead level. Familiar with trade-offs between monoliths and microservices, CAP theorem, caching strategies, async processing, and distributed consistency.",
  },
  "PostgreSQL": {
    what: "A powerful open-source relational database with ACID compliance, advanced indexing, JSONB support, and a rich extension ecosystem.",
    experience: "Primary production database. Deep experience with schema design, EXPLAIN ANALYZE, partial indexes, CTEs, window functions, connection pooling (pg, pgBouncer), and controlled migrations.",
  },
  "MySQL": {
    what: "A widely-used relational database powering many web applications. Strong ecosystem, predictable performance, and excellent tooling.",
    experience: "Used at Dynamic Web for B2B client platforms. Familiar with query optimization, replication, and migration strategies on live production databases.",
  },
  "Redis": {
    what: "An in-memory data store used for caching, session storage, pub/sub messaging, and rate-limiting. Sub-millisecond latency and flexible data structures.",
    experience: "Used for API response caching, distributed session storage, and rate-limiting middleware across IDF services. Familiar with TTL strategies, eviction policies, and Lua scripts.",
  },
  "MongoDB": {
    what: "A document-oriented NoSQL database that stores data in flexible JSON-like BSON documents. Excellent for hierarchical data, rapid schema iteration, and horizontal scaling.",
    experience: "Used MongoDB for use cases requiring flexible document schemas and nested data hierarchies. Familiar with aggregation pipelines, compound indexing, Atlas managed deployments, and change streams for real-time data feeds.",
  },
  // Frontend
  "React": {
    what: "A JavaScript library for building component-based UIs with a virtual DOM, uni-directional data flow, and a rich hooks API.",
    experience: "7 years of production React. Built complex dashboards, real-time data UIs, and SPAs at IDF and Dynamic Web. Expert in hooks architecture, Context API, Suspense, performance profiling, and component library design.",
  },
  "Next.js": {
    what: "A React framework with App Router, Server Components, file-based routing, ISR/SSR, and built-in optimisations for production.",
    experience: "This portfolio is built with Next.js 15 App Router. Also used on commercial projects for SEO-critical pages requiring SSR and dynamic OG images.",
  },
  "Tailwind CSS": {
    what: "A utility-first CSS framework that composes design directly in markup — eliminates context-switching between HTML and CSS files.",
    experience: "Used on all frontend projects including this portfolio. Tailwind v4 with CSS custom properties for design tokens. Strong opinion: colocation of styles and markup is a productivity win on fast-moving teams.",
  },
  "shadcn/ui": {
    what: "A collection of beautifully designed, accessible React components built with Radix UI and Tailwind CSS — copy-paste, not an npm dependency.",
    experience: "Used across several projects including this portfolio. Prefer it over heavyweight component libraries because components are owned, typed, and customisable.",
  },
  "Motion": {
    what: "A production-ready animation library for React. Supports spring physics, scroll-linked animations, layout animations, and gesture recognition.",
    experience: "Used extensively in this portfolio for scroll reveals, glitch text, stagger animations, and the R3F galaxy background. `useInView`, `AnimatePresence`, and `useScroll` are daily tools.",
  },
  "Responsive Design": {
    what: "Designing interfaces that work well across viewport sizes — mobile phones to wide-screen monitors — using fluid layouts, breakpoints, and flexible media.",
    experience: "All production UIs built mobile-first. Comfortable with container queries, fluid typography (`clamp`), and visual regression testing across breakpoints.",
  },
  "Accessibility": {
    what: "Building UIs that work for all users, including those using screen readers, keyboard navigation, and other assistive technologies. WCAG AA compliance.",
    experience: "Applied systematically: correct semantic HTML, ARIA labels, focus management, `prefers-reduced-motion` support (see this portfolio), and color contrast audits.",
  },
  // Cloud
  "AWS": {
    what: "Amazon Web Services — the largest cloud platform. Hundreds of services for compute (ECS, EC2), storage (S3, RDS), networking, and more.",
    experience: "Used ECS for containerised microservices, S3 for static assets and backups, RDS for managed PostgreSQL, IAM for access policies, and CloudWatch for structured logging and alerting.",
  },
  "Docker": {
    what: "A containerisation platform that packages applications and their dependencies into portable, reproducible images runnable anywhere.",
    experience: "Used across all environments. Multi-stage Dockerfiles for minimal production images (see this portfolio's Dockerfile). Docker Compose for local dev. ECS for orchestration in production.",
  },
  "Kubernetes": {
    what: "An open-source container orchestration system for automating deployment, scaling, and management of containerised workloads.",
    experience: "Familiar with core concepts: Deployments, Services, Ingress, ConfigMaps, HPA, and Helm charts. Used on staging environments at IDF.",
  },
  "CI/CD": {
    what: "Continuous Integration / Continuous Deployment — automating test runs, builds, and deployments on every code push to shorten feedback loops and ship reliably.",
    experience: "Set up and maintained CI/CD pipelines at IDF (GitHub Actions). Coverage gates, lint checks, Docker builds, blue-green deploys, and rollback procedures.",
  },
  "GitHub Actions": {
    what: "GitHub's built-in CI/CD platform. Workflows defined as YAML files that run on push, PR, schedule, or manual trigger.",
    experience: "Primary CI tool. Workflows cover lint, type-check, test, build, Docker push, and deploy-to-ECS. Familiar with reusable workflows, secrets management, and matrix builds.",
  },
  "Nginx": {
    what: "A high-performance web server and reverse proxy. Handles TLS termination, load balancing, static file serving, and request routing.",
    experience: "Used as reverse proxy for all production deployments. Configured TLS with Let's Encrypt, HTTP→HTTPS redirects, proxy_pass to Node services, and cache headers for static assets.",
  },
  "Linux": {
    what: "The dominant OS for servers and containers. Essential for DevOps tasks, scripting, and understanding how your code actually runs in production.",
    experience: "Comfortable on the command line: shell scripting, systemd service management, log tailing, SSH, file permissions, cron, and process management.",
  },
  "Terraform": {
    what: "Infrastructure-as-code tool by HashiCorp. Define cloud resources in HCL, apply changes with a plan/apply cycle, and store state for reproducibility.",
    experience: "Used for AWS infrastructure: ECS clusters, RDS instances, VPC networking, IAM roles, and S3 buckets. State stored in S3 with DynamoDB locking.",
  },
  // Data
  "Query Optimization": {
    what: "The practice of rewriting or restructuring SQL queries to reduce execution time and resource usage — through index selection, join order, and avoiding full scans.",
    experience: "Used EXPLAIN ANALYZE extensively on production PostgreSQL. Resolved several N+1 patterns, added partial indexes, and rewrote subqueries as CTEs for planner-friendliness.",
  },
  "Indexing": {
    what: "Database indexes speed up query lookups by creating sorted data structures. Choosing the right index type (B-tree, GIN, partial) is critical for query performance.",
    experience: "Created targeted indexes based on actual query plans, not guesswork. Monitored index bloat, dead tuples, and index hit rates in production.",
  },
  "Caching Strategies": {
    what: "Techniques to store computed or fetched results in fast storage (memory, CDN) to reduce latency and database load. Key patterns: cache-aside, write-through, stale-while-revalidate.",
    experience: "Applied at multiple levels: Redis for API responses and session data, Next.js ISR for static page generation, HTTP Cache-Control headers for CDN caching.",
  },
  "Real-time Data": {
    what: "Delivering live data updates to clients without polling — using WebSockets, Server-Sent Events, or long-polling depending on the use case.",
    experience: "Built real-time operational dashboards at IDF using WebSocket connections with Node.js (ws library). Familiar with connection lifecycle management, reconnection logic, and load-balancing sticky sessions.",
  },
  // AI
  "Claude": {
    what: "Anthropic's AI assistant — known for strong reasoning, long context handling, and careful, thoughtful responses. Available via API and as Claude Code.",
    experience: "Primary AI for architecture advice, deep code review, and complex problem decomposition. Also using Claude Code (this portfolio was built with it) and the API for internal tooling integrations.",
  },
  "GPT-4": {
    what: "OpenAI's flagship LLM. Strong general coding capabilities, widely adopted, large ecosystem of tooling and integrations.",
    experience: "Used for rapid feature exploration, alternative design evaluation, and drafting PR descriptions. Integrated via OpenAI API into internal engineering tooling for automated review summaries.",
  },
  "GitHub Copilot": {
    what: "AI-powered code completion inside your editor. Suggests entire functions, test cases, and boilerplate based on context — powered by OpenAI Codex.",
    experience: "In-editor companion for 3+ years. Removes friction from repetitive patterns, test scaffolding, and type signatures. Always reviewed before accepting — not a rubber-stamp.",
  },
  "MCP Servers": {
    what: "Model Context Protocol — a standard that lets LLMs connect to external tools and data sources as structured context, turning AI into an embedded team member.",
    experience: "Running MCP servers for codebase access, database queries, and GitHub integration. This portfolio was built using Claude Code with MCP — the AI had direct access to files, tools, and search.",
  },
  "Prompt Engineering": {
    what: "The craft of phrasing inputs to LLMs so they produce maximally useful outputs — combining chain-of-thought, role framing, output constraints, and careful reframing to get past model limitations.",
    experience: "Using clear role/task/context structuring, constraints, examples, output schemas, and iterative refinement to produce accurate, reviewable engineering outputs. Techniques include chain-of-thought elicitation, few-shot examples, and explicit output format constraints. Applied as a first-class engineering skill across all AI-assisted workflows.",
  },
  "AI Code Review": {
    what: "Using LLMs to analyse pull requests for bugs, security issues, style violations, and architectural concerns — as a complement to human review, not a replacement.",
    experience: "Integrated AI code review into the IDF team's PR workflow. LLM reviews flag obvious issues before human reviewers see the diff, shortening review cycles.",
  },
  "Test Generation": {
    what: "Using AI to scaffold unit and integration tests from implementation code — generating edge cases, happy paths, and mock setups that a developer then reviews and adjusts.",
    experience: "Used to bootstrap test coverage on legacy code and new features. Human-reviewed every generated test. Caught several edge cases in generated tests that the AI included but the original implementation missed.",
  },
  "Cursor": {
    what: "An AI-native code editor forked from VS Code. Deeply integrates LLM completions, inline edits (Ctrl+K), and codebase-aware chat (Ctrl+L) into the editing experience.",
    experience: "Used for AI-accelerated development sessions — especially useful for refactoring across multiple files simultaneously using Cursor's composer mode.",
  },
  "Claude Code": {
    what: "Anthropic's CLI agent for software engineering. Reads and writes files, runs terminal commands, and reasons about codebases as an autonomous coding assistant.",
    experience: "This entire portfolio was built using Claude Code. Used for architecture planning, implementation, build error triage, and iterative refinement — all within the terminal.",
  },
  "Continue.dev": {
    what: "An open-source AI code assistant that integrates into VS Code and JetBrains. Supports any LLM backend — Ollama, OpenAI, Anthropic — for codebase-aware completions.",
    experience: "Used for local, privacy-preserving AI completions on sensitive codebases where cloud LLMs aren't appropriate. Works with Ollama + local models.",
  },
  "Windsurf": {
    what: "An AI-native IDE by Codeium with a 'flow state' paradigm — the AI proactively suggests code actions based on context, reducing prompt friction.",
    experience: "Evaluated as an alternative to Cursor. The Cascade multi-file agent is impressive for large refactors. Currently part of the AI tooling rotation alongside Cursor and Claude Code.",
  },
  "Ollama": {
    what: "An open-source local LLM inference server. Run models like Llama, Mistral, and Qwen locally with a simple API — no cloud, no data sharing, full privacy.",
    experience: "Hosted Ollama locally and integrated it into the development platform for AI-assisted workflows on sensitive codebases where cloud LLMs aren't appropriate. Runs quantized open-source models and powers Continue.dev for privacy-preserving in-editor completions.",
  },
  // Leadership
  "Team Leadership": {
    what: "Directing and motivating a technical team to deliver software — balancing technical quality, team health, delivery velocity, and individual growth.",
    experience: "3+ years as Full-Stack Team Lead at IDF. Ran sprint planning, architecture sessions, code reviews, and 1-on-1s. Reduced review cycle time and raised test coverage as team standards.",
  },
  "Code Review": {
    what: "The process of systematically examining another developer's code before merging — catching bugs, enforcing standards, sharing knowledge, and maintaining codebase health.",
    experience: "Reviewed hundreds of PRs. Strong reviewer: focus on correctness first, then clarity, then style. Built team review culture at IDF including AI-assisted pre-review and structured feedback norms.",
  },
  "Architecture Design": {
    what: "Defining the high-level structure of a software system — data flows, service boundaries, technology choices, and the trade-offs between them.",
    experience: "Led architecture design at IDF for multiple production systems. Comfortable with whiteboard sessions, ADRs (Architecture Decision Records), and documenting trade-offs for stakeholder review.",
  },
  "Mentoring": {
    what: "Developing junior and mid-level engineers through code review, pairing, technical guidance, and career development conversations.",
    experience: "Mentored 3 engineers at IDF from junior to mid/senior levels. Focused on ownership mindset, debugging methodology, and writing code for the reader not the compiler.",
  },
  "Sprint Planning": {
    what: "The Scrum ceremony where a team selects backlog items for the upcoming sprint, estimates effort, and commits to a delivery plan.",
    experience: "Ran sprint planning at IDF as Team Lead. Facilitated story estimation, broke down epics into sprint-sized chunks, and tracked velocity to improve forecasting accuracy.",
  },
  "Technical Specs": {
    what: "Written documents that describe how a feature or system will be built — covering architecture, API contracts, data models, edge cases, and open questions.",
    experience: "Authored technical specs for every significant feature at IDF. Specs reduced back-and-forth with stakeholders and gave the team a shared reference during implementation.",
  },
  "Stakeholder Communication": {
    what: "Translating technical constraints, timelines, and trade-offs into clear language for non-technical stakeholders — PMs, commanders, or clients.",
    experience: "Reported directly to operational stakeholders at IDF on system status, delivery timelines, and incident post-mortems. Comfortable presenting technical risk in business terms.",
  },
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "AI Workflow", href: "#ai-workflow" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
