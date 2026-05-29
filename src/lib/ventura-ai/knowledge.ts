export type VenturaIntent =
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
  | "contact";

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

export const faq: FaqItem[] = [
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
      "Daniel uses AI tools as part of a controlled engineering workflow. He uses Claude Agent for code generation; Claude and Claude Code for deeper implementation help and code reasoning; ChatGPT for design thinking, architecture exploration, technology search, implementation planning, and technical research; OpenAI Codex for coding assistance; developer plugins for Git management, tests, UI tests, and code reviews; GitHub Copilot for in-editor productivity; MCP servers for context-aware AI tooling; and Ollama/local LLMs for privacy-first local inference. Daniel reviews, adapts, tests, and validates AI-assisted outputs before production use.",
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
      "Daniel's portfolio repository is https://github.com/danivngopro/animationWebsiteTest and the live domain is https://portfolio.emperordanivn.com. The portfolio is a premium cinematic personal website designed as a fullscreen snap-scroll experience, not a static CV page. It uses Next.js 15 App Router, TypeScript 5 strict mode, Tailwind CSS v4, shadcn/ui, Motion for React, React Three Fiber, Drei, Three.js, Zod, react-hook-form, Docker, and Nginx reverse proxy. It includes security headers, CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS, Referrer-Policy, Permissions-Policy, Zod validation, a honeypot field, no dangerouslySetInnerHTML, and no committed secrets.",
  },
  {
    id: "contact",
    label: "Contact",
    keywords: ["contact", "email", "linkedin", "github", "reach", "hire", "availability"],
    context:
      "Daniel's email is danivngopro@gmail.com. Daniel's GitHub is https://github.com/danivngopro. Daniel's LinkedIn is https://www.linkedin.com/in/daniel-v-03b663152/. For availability or opportunities, contact him directly by email.",
  },
];
