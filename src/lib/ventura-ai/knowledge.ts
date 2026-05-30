export type VenturaIntent =
  | "greeting"
  | "about"
  | "experience"
  | "skills"
  | "backend"
  | "frontend"
  | "cloud"
  | "aiWorkflow"
  | "flagshipProject"
  | "education"
  | "portfolioWebsite"
  | "contact"
  | "venturaAI";

export type IntentConfig = {
  id: VenturaIntent;
  label: string;
  keywords: string[];
  context: string;
};

export type FaqItem = {
  id: string;
  questions: string[];
  answer: string;
  intent?: VenturaIntent;
};

export const VENTURA_AI_CONFIG = {
  assistantName: "Ventura's AI",
  model: "qwen2.5:0.5b",
  maxAnswerSentences: 3,
  fallbackAnswer:
    "I'm Ventura's AI, so I can only answer questions about Daniel Ventura's portfolio, projects, experience, skills, and contact information.",
  missingInfoAnswer: "I don't have that information in Daniel's portfolio yet.",
} as const;

export const forbiddenClaims = [
  "University of Southern California",
  "USC",
  "M.S. in Software Engineering",
  "Django",
  "Flask",
  "SQLAlchemy",
  "Prometheus",
  "Grafana",
  "Couchbase",
  "Jenkins",
  "GitLab CI",
  "Elastic Beanstalk",
  "Joe Biden",
  "pasta recipe",
] as const;

export const fallbackVariants: string[] = [
  "That's outside what I know — I'm focused on Daniel's portfolio, experience, projects, and skills. What would you like to know?",
  "I can't help with that one, but ask me anything about Daniel's background, tech stack, or projects.",
  "Not my area, I'm afraid. I'm Ventura's AI — ask me about Daniel's work and I'm all yours.",
  "I'm only set up to talk about Daniel Ventura's portfolio. What would you like to know about him?",
  "That one's out of my lane. Fire away with anything about Daniel's experience, skills, or projects though.",
];

export const greetingVariants: string[] = [
  "Hey! I'm Ventura's AI — Daniel's portfolio assistant. What would you like to know?",
  "Hi! Ask me anything about Daniel's experience, projects, or tech stack.",
  "Hello! What can I tell you about Daniel Ventura?",
  "Hey there! Curious about Daniel's background, skills, or projects?",
  "Hi! I'm here to help. What would you like to know about Daniel?",
  "Hello! I'm Ventura's AI. Ask me about Daniel's work, AI workflow, or how this was built.",
  "Hey! What's on your mind? I can cover Daniel's experience, skills, flagship project, and more.",
  "Hi there! Feel free to ask about Daniel's background, tech stack, or contact details.",
];

export const faq: FaqItem[] = [
  {
    id: "greeting",
    intent: "greeting",
    questions: [
      "hi",
      "hello",
      "hey",
      "yo",
      "good morning",
      "good evening",
      "sup",
      "what's up",
      "whats up",
    ],
    answer:
      "Hi, I'm Ventura's AI. Ask me about Daniel's experience, projects, skills, AI workflow, or portfolio website.",
  },
  {
    id: "ventura-ai-overview",
    intent: "venturaAI",
    questions: [
      "what are you",
      "who are you",
      "what is ventura's ai",
      "what is ventura ai",
      "what model are you using",
      "are you using ollama",
      "is this chat using chatgpt",
      "what powers this ai",
    ],
    answer:
      "Ventura's AI is Daniel Ventura's lightweight self-hosted portfolio assistant. It uses a local Ollama model, currently configured as qwen2.5:0.5b, and runs through Daniel's Next.js portfolio backend with FAQ routing, intent detection, safety checks, and small context prompts.",
  },
  {
    id: "ventura-ai-runtime",
    intent: "venturaAI",
    questions: [
      "where are you running",
      "are you local",
      "are you running on ollama",
      "are you self hosted",
      "where does ventura's ai run",
      "where does ventura ai run",
    ],
    answer:
      "Ventura's AI is designed to run locally through Ollama on Daniel's own server/home-server setup, with the Next.js portfolio calling it through a protected backend API route.",
  },
  {
    id: "ventura-ai-built",
    intent: "venturaAI",
    questions: [
      "how were you built",
      "how was ventura's ai built",
      "how was ventura ai built",
      "how does this chat work",
      "how did daniel build this ai",
      "how did daniel build ventura's ai",
      "how did daniel build ventura ai",
    ],
    answer:
      "Daniel built Ventura's AI as a portfolio feature using Next.js, TypeScript, a deterministic FAQ/intent router, a safe API route, and a tiny local Ollama model. The goal is to demonstrate local LLM integration, prompt control, safety routing, and practical AI-assisted product development.",
  },
  {
    id: "technologies",
    intent: "skills",
    questions: [
      "what technologies does daniel use",
      "what is daniel's tech stack",
      "what tools does daniel use",
      "what programming languages does daniel know",
      "what frameworks does daniel use",
      "what are daniel's skills",
      "list daniel's technologies",
    ],
    answer:
      "Daniel works mainly with TypeScript, Node.js, React, Next.js, NestJS, Express, REST APIs, RabbitMQ, Zod, Redis, SQL/MySQL/PostgreSQL, MongoDB, Docker, Kubernetes, AWS, GitHub Actions, Nginx, Linux, Windows, Python, WebSockets, Ollama, and ARIMA. He also uses AI-assisted development tools such as Claude Agent, Claude Code, ChatGPT, OpenAI Codex, GitHub Copilot, MCP servers, and developer plugins for code generation, reviews, testing, debugging, and architecture planning.",
  },
  {
    id: "what-does-daniel-do",
    intent: "about",
    questions: [
      "what does daniel do",
      "who is daniel",
      "tell me about daniel",
      "what is daniel's role",
      "what kind of developer is daniel",
    ],
    answer:
      "Daniel Ventura is a Senior Full-Stack Developer and team lead specializing in Node.js, TypeScript, React, cloud-native systems, real-time monitoring platforms, and AI-assisted engineering.",
  },
  {
    id: "flagship-project",
    intent: "flagshipProject",
    questions: [
      "what is daniel's flagship project",
      "what is the operational command dashboard",
      "what is daniel's main project",
      "tell me about the operational command dashboard",
      "what project best shows daniel's abilities",
    ],
    answer:
      "Daniel's flagship project is the Operational Command Dashboard, a real-time monitoring and AI-assisted analytics platform built in the IDF. It monitors servers, databases, scripts, Docker and Kubernetes services, and operational components; processes data through RabbitMQ; applies custom alert rules; and uses analytics models plus a local Ollama LLM for error investigation.",
  },
  {
    id: "operational-dashboard-tech",
    intent: "flagshipProject",
    questions: [
      "what technologies did daniel use in the operational command dashboard",
      "what stack was used for the operational command dashboard",
      "what tech did the monitoring dashboard use",
    ],
    answer:
      "The Operational Command Dashboard used TypeScript, Node.js, NestJS, Next.js, React, RabbitMQ, Zod, Redis, SQL, MongoDB, Docker, Kubernetes, Linux, Windows, Python, WebSockets, ARIMA forecasting, and Ollama for local LLM integration.",
  },
  {
    id: "ai-tools",
    intent: "aiWorkflow",
    questions: [
      "how does daniel use ai tools",
      "does daniel use ai in development",
      "what ai tools does daniel use",
      "how does daniel use claude",
      "how does daniel use chatgpt",
    ],
    answer:
      "Daniel uses Claude Agent, Claude Code, ChatGPT, OpenAI Codex, GitHub Copilot, MCP servers, and developer plugins for code generation, architecture planning, technology research, debugging, refactoring, Git management, code reviews, tests, and UI tests. He reviews and validates AI-assisted work before production use.",
  },
  {
    id: "backend",
    intent: "backend",
    questions: [
      "can daniel build backend systems",
      "does daniel know backend",
      "what backend technologies does daniel use",
      "is daniel good at backend",
    ],
    answer:
      "Yes. Daniel has strong backend experience with Node.js, TypeScript, NestJS, Express, REST APIs, RabbitMQ, SQL/MySQL-compatible databases, MongoDB, Redis, Docker, Kubernetes, and production release workflows.",
  },
  {
    id: "education",
    intent: "education",
    questions: [
      "what did daniel study",
      "what is daniel's education",
      "does daniel have a degree",
      "where did daniel study",
    ],
    answer:
      "Daniel studied B.Sc. Mathematics & Computer Science with a Cybersecurity major at Ariel University. He is also completing an MBA in Economics at The Open University of Israel.",
  },
  {
    id: "contact",
    intent: "contact",
    questions: [
      "how can i contact daniel",
      "what is daniel's email",
      "where can i find daniel",
      "daniel linkedin",
      "daniel github",
    ],
    answer:
      "The best way to contact Daniel is by email at danivngopro@gmail.com. You can also view his GitHub at https://github.com/danivngopro or LinkedIn at https://www.linkedin.com/in/daniel-v-03b663152/.",
  },
  {
    id: "portfolio-website",
    intent: "portfolioWebsite",
    questions: [
      "what is special about this portfolio",
      "how was this portfolio built",
      "what technologies does the portfolio use",
      "tell me about this website",
    ],
    answer:
      "Daniel's portfolio is built as a cinematic fullscreen snap-scroll experience using Next.js, TypeScript, Tailwind CSS, Motion, React Three Fiber, and Docker/Nginx deployment. It also highlights security headers, validation, anti-spam concepts, and AI-aware security practices.",
  },
  {
    id: "classified-work-why",
    intent: "experience",
    questions: [
      "why are there no live classified projects",
      "why can't you share your work",
      "why no source code",
      "why no live demos",
      "why are projects classified",
      "why can't i see the code",
      "why no public projects",
      "military work classified",
      "why classified",
    ],
    answer:
      "Most of Daniel's strongest production work was built for internal military environments in the IDF, so source code, screenshots, infrastructure details, and live demos cannot be published. That is intentional and responsible. Instead, the portfolio demonstrates the same engineering ability through sanitized architecture case studies, system design decisions, AI-assisted workflow, and the portfolio itself as a public full-stack product.",
  },
  {
    id: "case-studies-what",
    questions: [
      "what are the case studies",
      "architecture case studies",
      "what is a sanitized case study",
      "case study",
      "what do the case studies show",
    ],
    answer:
      "The Architecture Case Studies section presents three sanitized case studies: Real-Time Operational Dashboard (architecture and system design), AI-Assisted Engineering Workflow (modern development process), and Secure Full-Stack Delivery (security and reliability mindset). No classified details are included.",
  },
  {
    id: "build-log-what",
    intent: "portfolioWebsite",
    questions: [
      "what is the build log",
      "how was this portfolio built",
      "portfolio build log",
      "what stack does this site use",
      "how did daniel build this site",
    ],
    answer:
      "The Build Log section explains that the portfolio itself is a small production-style product. It uses Next.js 15, TypeScript 5 strict mode, Tailwind CSS v4, Motion for React, React Three Fiber, Zod, and react-hook-form. It is deployed via Docker and Nginx, includes security headers, and features Ventura's AI — a local Ollama integration (qwen2.5:0.5b) with a deterministic FAQ router, safety checks, and fallback behavior.",
  },
  {
    id: "public-proof-what",
    questions: [
      "what is public proof",
      "public proof and systems",
      "what projects are public",
      "why no live project links",
      "why no demos",
    ],
    answer:
      "The Public Proof & Systems section presents Daniel's projects as sanitized or internal case studies. Most production work was classified military work and cannot be published publicly. The B2B platform is a sanitized client project. The portfolio site itself serves as the primary public proof of modern full-stack delivery.",
  },
  {
    id: "ai-responsible-use",
    intent: "aiWorkflow",
    questions: [
      "does daniel use ai responsibly",
      "how responsibly does daniel use ai",
      "ai ethics daniel",
      "does daniel just use ai to write code",
      "how does daniel control ai output",
    ],
    answer:
      "Daniel follows a seven-step process: understand requirements manually, break work into architecture and task layers, use AI for alternatives and scaffolding, review all generated code manually, add validation and tests, refactor for maintainability, then deploy and verify. AI accelerates; architecture, review, and accountability remain his.",
  },
  {
    id: "hire-daniel",
    intent: "about",
    questions: [
      "why should we hire daniel",
      "why hire daniel",
      "what makes daniel a good hire",
      "why is daniel a strong candidate",
      "should we hire daniel",
    ],
    answer:
      "Daniel is a strong senior full-stack candidate because he combines hands-on engineering, architecture ownership, production delivery, and team leadership. He has 7+ years of full-stack experience across Node.js, TypeScript, React, databases, Docker/Kubernetes, and cloud-native systems. What makes him especially relevant for modern teams is that he does not treat AI as a shortcut — he uses AI tools to move faster, but keeps architecture, code review, validation, testing, and production accountability under human control.",
  },
  {
    id: "senior-experience",
    intent: "experience",
    questions: [
      "what senior full-stack experience does daniel have",
      "what is daniel's senior experience",
      "how senior is daniel",
      "daniel's full-stack experience",
    ],
    answer:
      "Daniel has 7+ years of production full-stack experience across backend architecture, frontend integration, database design, API contracts, deployment workflows, and production support. In the IDF, he built mission-critical internal systems used by 1,000+ operational users and later led a 6-developer team as Team Lead from 2024–2026. His core stack includes Node.js, TypeScript, React, REST APIs, SQL/MySQL, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, and GitHub Actions.",
  },
  {
    id: "ai-in-development",
    intent: "aiWorkflow",
    questions: [
      "how does daniel use ai in development",
      "how does daniel use ai",
      "daniel ai development workflow",
      "how does daniel work with ai",
    ],
    answer:
      "Daniel uses AI as part of a controlled seven-step workflow: understand requirements manually, break work into architecture and implementation layers, use AI for alternatives/scaffolding/debugging/test generation, review all generated code manually, add validation and edge cases, refactor for maintainability, then deploy and verify. Tools include Claude, Claude Code, ChatGPT, Codex, GitHub Copilot, MCP servers, and a local Ollama integration. AI helps him move faster — but architecture, code review, security decisions, testing, and production accountability remain his.",
  },
  {
    id: "architecture-experience",
    intent: "experience",
    questions: [
      "explain daniel's architecture experience.",
      "explain daniel's architecture experience",
      "what is daniel's architecture experience",
      "daniel architecture",
      "daniel system design",
    ],
    answer:
      "Daniel's architecture experience comes from building and leading production full-stack systems rather than only writing isolated features. He has designed API boundaries, validation flows, database access patterns, caching layers, real-time update flows, and deployment-ready service structures. Because most of the work was internal military work, the portfolio presents sanitized architecture case studies that describe decisions and tradeoffs without exposing classified infrastructure details.",
  },
  {
    id: "first-30-days",
    intent: "about",
    questions: [
      "what can daniel build in the first 30 days",
      "what would daniel do in the first month",
      "first 30 days daniel",
      "how quickly can daniel contribute",
    ],
    answer:
      "In the first 30 days, Daniel can ramp up on an existing product, map the architecture and delivery risks, and contribute production-ready TypeScript, Node.js, or React code. A realistic first-month impact includes shipping scoped features, improving API or database flows, strengthening validation and error handling, and helping the team adopt AI tools more effectively. He is comfortable with code reviews, technical planning, and working across the full stack from day one.",
  },
];

export const intents: IntentConfig[] = [
  {
    id: "about",
    label: "About Daniel",
    keywords: [
      "about",
      "daniel",
      "ventura",
      "role",
      "job",
      "title",
      "summary",
    ],
    context:
      "Daniel Ventura is a Senior Full-Stack Developer with 7+ years of experience building production Node.js, TypeScript, React, and cloud-native systems. He has led a 6-developer team delivering mission-critical products used by 1,000+ users. He specializes in backend architecture, frontend integration, code reviews, release planning, production deployment, REST APIs, distributed systems, Docker, Kubernetes, SQL/MySQL, MongoDB, Redis, and AI-assisted engineering workflows.",
  },
  {
    id: "experience",
    label: "Experience",
    keywords: [
      "experience",
      "work",
      "career",
      "job",
      "team lead",
      "idf",
      "dynamic web",
      "senior",
    ],
    context:
      "Daniel worked as a Full-Stack Team Lead in the IDF from 2024-2026, leading a 6-developer team and owning feature planning, backend architecture, frontend integration, code reviews, release coordination, and post-deployment validation. Before that, he worked as a Full-Stack Engineer in the IDF from 2020-2024, building production full-stack systems used by 1,000+ users. He also worked as a Full-Stack Developer at Dynamic Web from 2021-2022, delivering client-facing web applications with Node.js/Express APIs, React interfaces, database integrations, and deployment-ready flows.",
  },
  {
    id: "skills",
    label: "Skills",
    keywords: [
      "skills",
      "technologies",
      "tech stack",
      "tools",
      "programming",
      "stack",
      "frameworks",
      "languages",
    ],
    context:
      "Daniel's main skills include Node.js, TypeScript, Express, NestJS, REST APIs, React, Next.js, Tailwind CSS, SQL, MySQL, PostgreSQL, MongoDB, Redis, RabbitMQ, Docker, Kubernetes, AWS, GitHub Actions, Nginx, Linux, Python, WebSockets, AI-assisted development, code reviews, mentoring, system design, and technical planning.",
  },
  {
    id: "backend",
    label: "Backend",
    keywords: [
      "backend",
      "api",
      "server",
      "node",
      "nestjs",
      "express",
      "database",
      "rabbitmq",
      "redis",
      "sql",
      "mongodb",
    ],
    context:
      "Daniel builds backend systems using Node.js, TypeScript, Express, NestJS, REST APIs, RabbitMQ, Redis, SQL/MySQL-compatible databases, MongoDB, Docker, Kubernetes, and production release workflows. His backend experience includes service boundaries, validation logic, data flows, database access patterns, caching, API optimization, and real-time operational data pipelines.",
  },
  {
    id: "frontend",
    label: "Frontend",
    keywords: [
      "frontend",
      "react",
      "next",
      "next.js",
      "ui",
      "interface",
      "tailwind",
      "animation",
    ],
    context:
      "Daniel builds frontend systems using React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Motion, responsive UI patterns, API integration, and real-time UI updates. His portfolio itself is a cinematic fullscreen snap-scroll website using Next.js, TypeScript, Tailwind, Motion, React Three Fiber, and Three.js.",
  },
  {
    id: "cloud",
    label: "Cloud and Infrastructure",
    keywords: [
      "cloud",
      "aws",
      "docker",
      "kubernetes",
      "k8s",
      "ci",
      "cd",
      "deployment",
      "nginx",
      "linux",
    ],
    context:
      "Daniel works with AWS, Docker, Kubernetes, CI/CD, GitHub Actions, Nginx, Linux, Windows environments, release management, and production deployment. He has supported containerized services, Kubernetes-based environments, Docker deployments, and Nginx reverse proxy setups.",
  },
  {
    id: "aiWorkflow",
    label: "AI-Assisted Engineering",
    keywords: [
      "ai",
      "claude",
      "chatgpt",
      "codex",
      "copilot",
      "ollama",
      "agent",
      "mcp",
      "prompt",
      "code review",
      "tests",
      "ui tests",
    ],
    context:
      "Daniel uses AI as part of a seven-step engineering process: understand requirements manually, break work into architecture and implementation layers, use AI for alternatives/scaffolding/debugging/test generation, review generated code manually, add validation and edge-case tests, refactor for maintainability, then deploy and verify. Tools include Claude, Claude Code, ChatGPT, Codex, GitHub Copilot, MCP servers, and Ollama for local LLM inference. Architecture, review, and accountability remain Daniel's — AI accelerates the work.",
  },
  {
    id: "flagshipProject",
    label: "Operational Command Dashboard",
    keywords: [
      "flagship",
      "main project",
      "operational",
      "command",
      "dashboard",
      "monitoring",
      "rabbitmq",
      "ollama",
      "arima",
      "forecast",
      "outlier",
      "pattern",
      "rules",
    ],
    context:
      "Daniel's flagship project is the Operational Command Dashboard, a large-scale real-time monitoring, alerting, analytics, and AI-assisted investigation platform built in the IDF. It monitors servers, hardware resources, databases, custom scripts, Kubernetes services, Docker services, application components, and custom operational values. Monitoring scripts collect data, data is sent through a security platform, large bulk posts reach the Node.js backend, RabbitMQ queues the data, backend processors split and persist it into SQL and MongoDB, Redis caches current status, custom rules evaluate service state, and WebSockets update the UI. Service owners can define rules such as CPU below 85% equals green, 85%-95% equals warning, and above 95% equals critical error. Alerts can be immediate, delayed, repeated-value based, UI-only, SMS, or internal email. After becoming team lead, Daniel designed and implemented analytics dashboards, outlier detection, pattern recognition, ARIMA forecasting, and a local Ollama LLM that helps users analyze errors, suggest causes, and locate the likely source of operational issues. The project used TypeScript, Node.js, NestJS, Next.js, React, RabbitMQ, Zod, Redis, SQL, MongoDB, Docker, Kubernetes, Linux, Windows, Python, WebSockets, ARIMA, and Ollama. After the AI and analytics models were completed, the platform achieved approximately 4.5x growth in adoption.",
  },
  {
    id: "education",
    label: "Education",
    keywords: [
      "education",
      "degree",
      "university",
      "study",
      "studied",
      "bsc",
      "mba",
      "cybersecurity",
      "ariel",
      "open university",
    ],
    context:
      "Daniel studied B.Sc. Mathematics & Computer Science with a Cybersecurity major at Ariel University from 2018-2021. He is completing an MBA in Economics at The Open University of Israel from 2024-2026.",
  },
  {
    id: "portfolioWebsite",
    label: "Portfolio Website",
    keywords: [
      "portfolio",
      "website",
      "site",
      "animation",
      "3d",
      "three",
      "motion",
      "security",
      "headers",
      "snap",
    ],
    context:
      "Daniel's portfolio repository is https://github.com/danivngopro/Portfolio and the live domain is https://portfolio.emperordanivn.com. The portfolio is a premium cinematic personal website designed as a fullscreen snap-scroll experience, not a static CV page. It uses Next.js 15 App Router, TypeScript 5 strict mode, Tailwind CSS v4, shadcn/ui, Motion for React, React Three Fiber, Drei, Three.js, Zod, react-hook-form, Docker, and Nginx reverse proxy. It includes security headers, CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS, Referrer-Policy, Permissions-Policy, Zod validation, a honeypot field, no dangerouslySetInnerHTML, and no committed secrets.",
  },
  {
    id: "contact",
    label: "Contact",
    keywords: ["contact", "email", "linkedin", "github", "reach", "hire", "availability"],
    context:
      "Daniel's email is danivngopro@gmail.com. Daniel's GitHub is https://github.com/danivngopro. Daniel's LinkedIn is https://www.linkedin.com/in/daniel-v-03b663152/. For availability or opportunities, contact him directly by email.",
  },
];
