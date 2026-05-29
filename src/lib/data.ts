// Single source of truth for all portfolio content.
// Derived from Daniel Ventura's CV — do not invent facts.

export const personal = {
  name: "Daniel Ventura",
  title: "Senior Full-Stack Developer",
  tagline: "AI-Assisted Engineering · Architecture · Leadership",
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
    period: "2022 – Present",
    type: "Full-time",
    description:
      "Led a cross-functional full-stack team building mission-critical internal systems. Owned architecture decisions, sprint planning, code reviews, and mentoring. Drove adoption of modern tooling and AI-assisted development practices.",
    highlights: [
      "Architected and delivered multiple production full-stack systems under strict reliability requirements",
      "Led code review culture and enforced TypeScript-first, test-covered development standards",
      "Introduced AI-assisted workflows (prompt-assisted debugging, refactoring, test generation) across the team",
      "Collaborated with stakeholders to translate operational requirements into technical specs",
    ],
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "idf-engineer",
    role: "Full-Stack Engineer",
    company: "IDF (Israel Defense Forces)",
    period: "2020 – 2022",
    type: "Full-time",
    description:
      "Developed and maintained full-stack features across internal platforms. Contributed to system design, REST API development, frontend architecture, and CI/CD pipelines.",
    highlights: [
      "Built and maintained RESTful APIs serving real-time operational data",
      "Developed responsive React frontends consumed by internal operational teams",
      "Participated in architectural design sessions and contributed to technical documentation",
      "Integrated third-party services and internal microservices into unified platform surfaces",
    ],
    tech: ["JavaScript", "React", "Node.js", "SQL", "Git", "REST APIs"],
  },
  {
    id: "dynamic-web",
    role: "Full-Stack Developer",
    company: "Dynamic Web",
    period: "2018 – 2020",
    type: "Full-time",
    description:
      "Delivered full-stack web solutions for commercial clients. Worked across the full development lifecycle from requirements gathering through deployment.",
    highlights: [
      "Built client-facing web applications using modern JavaScript and CSS frameworks",
      "Implemented backend services and REST APIs consumed by frontend SPAs",
      "Managed deployments and handled production incident response",
      "Collaborated directly with clients to iterate on UX and feature requirements",
    ],
    tech: ["JavaScript", "React", "Node.js", "CSS", "MySQL", "REST APIs"],
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
    tool: "Claude",
    role: "Architecture advisor & deep reasoning",
    description:
      "Used for complex architectural decisions, code review analysis, and reasoning through multi-layered system design problems.",
    icon: "Brain",
  },
  {
    tool: "GPT-4 / OpenAI",
    role: "Rapid prototyping & exploration",
    description:
      "Fast iteration on feature ideas, API designs, and exploratory coding sessions to validate concepts before committing to implementation.",
    icon: "Zap",
  },
  {
    tool: "GitHub Copilot",
    role: "In-editor autocomplete & boilerplate",
    description:
      "Reduces friction on repetitive patterns, type signatures, test cases, and boilerplate — keeps focus on logic, not syntax.",
    icon: "Code",
  },
  {
    tool: "MCP Servers",
    role: "Context-aware AI tooling",
    description:
      "Model Context Protocol servers give AI agents direct access to codebases, databases, and APIs — turning LLMs into embedded team members.",
    icon: "Network",
  },
  {
    tool: "AI-Assisted Debugging",
    role: "Root-cause analysis",
    description:
      "Paste stack traces, error logs, and reproduction steps into AI context. Dramatically shortens time-to-diagnosis on hard bugs.",
    icon: "Bug",
  },
  {
    tool: "Test Generation",
    role: "Coverage at speed",
    description:
      "Generate unit and integration test scaffolds from implementation code. Human-reviewed and adjusted, then committed — not blindly accepted.",
    icon: "TestTube",
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

export const projects = [
  {
    id: "operational-dashboard",
    title: "Operational Command Dashboard",
    description:
      "Mission-critical real-time monitoring platform serving internal command teams at IDF. Full TypeScript stack with live WebSocket feeds, RBAC, and <1s latency requirements. Handled 1,000+ concurrent users with zero downtime SLA.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "WebSockets", "Docker"],
    status: "live" as const,
    year: "2022–2024",
  },
  {
    id: "ai-dev-pipeline",
    title: "AI-Augmented Dev Pipeline",
    description:
      "Internal developer tooling integrating Claude API + OpenAI for automated code review, test generation, and PR analysis. Reduced average review cycle time significantly and standardised quality gates across the engineering team.",
    tags: ["Claude API", "OpenAI", "MCP", "TypeScript", "Node.js", "GitHub Actions"],
    status: "live" as const,
    year: "2023–Present",
  },
  {
    id: "microservices-platform",
    title: "Cloud-Native Microservices Platform",
    description:
      "Containerised Node.js microservices on AWS ECS with GitHub Actions CI/CD, blue-green deployments, centralised structured logging, and auto-scaling. Infrastructure-as-code via Terraform. Serves internal teams across multiple environments.",
    tags: ["AWS ECS", "Docker", "Terraform", "GitHub Actions", "Node.js", "Redis"],
    status: "live" as const,
    year: "2021–2022",
  },
  {
    id: "client-platform",
    title: "B2B Client Engagement Platform",
    description:
      "Full-stack SaaS platform built at Dynamic Web for B2B clients. React SPA, Express REST API, MySQL. Features include CRM integration, automated email workflows, real-time analytics, and a white-label white-label multi-tenant architecture.",
    tags: ["React", "Node.js", "Express", "MySQL", "REST API", "AWS S3"],
    status: "live" as const,
    year: "2018–2020",
  },
] as const;

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
  status: "live" | "TODO";
  year: string;
};

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

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "AI Workflow", href: "#ai-workflow" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
