# Prompt 1 for Claude - Create Ventura's AI Knowledge Base and Router

You are working in my existing portfolio repository:
https://github.com/danivngopro/animationWebsiteTest

I want to add a lightweight portfolio chatbot called "Ventura's AI".

Do only Stage 1 in this prompt. Do not build the UI yet. Do not build the API route yet.

## Goal

Create the deterministic knowledge base and router that will later power the chat.

The bot should be designed for a tiny local Ollama model, likely `qwen2.5:0.5b`, so we should not give the full context file to the model every time. Instead:

1. First try to match common FAQ questions and return fixed answers.
2. If no FAQ matches, detect the user's intent using simple keyword scoring.
3. Return only the small relevant context section for that intent.
4. If no intent matches, return the fallback answer:
   "I'm Ventura's AI, so I can only answer questions about Daniel Ventura's portfolio, projects, experience, skills, and contact information."

## Files to create

Create:

- `src/lib/ventura-ai/knowledge.ts`
- `src/lib/ventura-ai/router.ts`

If the project already has a better structure, keep it clean and consistent, but do not over-engineer.

## knowledge.ts requirements

Create strongly typed data for:

- `VenturaIntent`
- `IntentConfig`
- `FaqItem`
- `VENTURA_AI_CONFIG`
- `forbiddenClaims`
- `faq`
- `intents`

The knowledge should include these topics:

- about Daniel
- experience
- skills
- backend
- frontend
- cloud/infrastructure
- AI-assisted engineering workflow
- flagship project: Operational Command Dashboard
- education
- portfolio website
- contact

Use the following facts exactly and do not invent facts:

Daniel Ventura:
- Senior Full-Stack Developer
- 7+ years of experience
- Israel
- Email: danivngopro@gmail.com
- GitHub: https://github.com/danivngopro
- LinkedIn: https://www.linkedin.com/in/daniel-v-03b663152/
- Portfolio repo: https://github.com/danivngopro/animationWebsiteTest
- Portfolio live domain: https://portfolio.emperordanivn.com

Education:
- B.Sc. Mathematics & Computer Science, Cybersecurity major, Ariel University, 2018-2021
- MBA in Economics, The Open University of Israel, 2024-2026

Experience:
- IDF Full-Stack Team Lead, 2024-2026
- IDF Full-Stack Engineer, 2020-2024
- Dynamic Web Full-Stack Developer, 2021-2022

Core technologies:
- TypeScript
- Node.js
- Express
- NestJS
- Next.js
- React
- REST APIs
- RabbitMQ
- Zod
- Redis
- SQL
- MySQL
- PostgreSQL
- MongoDB
- Docker
- Kubernetes
- AWS
- GitHub Actions
- Nginx
- Linux
- Windows
- Python
- WebSockets
- Ollama
- ARIMA

AI-assisted development:
Daniel uses Claude Agent for code generation; Claude and Claude Code for deeper implementation help and code reasoning; ChatGPT for design thinking, architecture exploration, technology search, implementation planning, and technical research; OpenAI Codex for coding assistance; developer plugins for Git management, tests, UI tests, and code reviews; GitHub Copilot for in-editor productivity; MCP servers for context-aware AI tooling; and Ollama/local LLMs for privacy-first local inference. Daniel reviews, adapts, tests, and validates AI-assisted outputs before production use.

Flagship project:
The Operational Command Dashboard is a large-scale real-time monitoring, alerting, analytics, and AI-assisted investigation platform built in the IDF.

It monitors:
- servers
- hardware resources
- CPU
- RAM
- storage
- databases
- custom scripts
- Kubernetes services
- Docker services
- application components
- custom operational values

Data flow:
1. Monitoring scripts collect data.
2. Data passes through a security platform.
3. Data is validated, enriched, and combined into large bulk posts.
4. RabbitMQ receives the incoming data.
5. Backend services process and validate the data.
6. Data is saved to SQL and MongoDB.
7. Redis is used for caching and performance.
8. Custom rules are executed.
9. Alerts and notifications are triggered when needed.
10. Real-time UI updates are sent through sockets/WebSockets.
11. Python statistical and AI models analyze the data.
12. A local Ollama LLM helps users investigate incidents and understand system behavior.

Rules engine:
Service owners can define custom rules, for example:
- CPU below 85% = healthy / green
- CPU 85%-95% = warning / orange
- CPU above 95% = critical / red

Alerts can be:
- immediate
- delayed, for example only after 10 minutes
- triggered after X repeated values
- UI-only
- SMS
- internal email
- UI notification

AI/analytics upgrade:
After becoming team lead, Daniel designed and implemented:
- analytics dashboards per monitored component/service
- outlier detection
- pattern recognition for repeating outliers, recurring error times, repeated value sequences, and suspicious behavior patterns
- ARIMA forecasting
- local Ollama LLM integration for error analysis, possible causes, suggested solutions, and source-of-error investigation

Impact:
After the AI and analytics models were completed, the platform achieved approximately 4.5x growth in adoption.

Portfolio website:
- Next.js 15 App Router
- TypeScript 5 strict mode
- Tailwind CSS v4
- shadcn/ui
- Motion for React
- React Three Fiber
- Drei
- Three.js
- Zod
- react-hook-form
- Docker
- Nginx reverse proxy
- cinematic fullscreen snap-scroll portfolio
- security headers, CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS, Referrer-Policy, Permissions-Policy
- Zod validation
- honeypot field
- no dangerouslySetInnerHTML
- no committed secrets

## router.ts requirements

Implement:

- `findFaqMatch(message: string): FaqItem | null`
- `detectIntent(message: string): IntentConfig | null`
- `routeVenturaQuestion(message: string): RouterResult`
- `containsForbiddenClaim(answer: string): boolean`
- `buildOllamaPrompt(question: string, context: string): string`

Router behavior:
1. Normalize text to lowercase and simple spacing.
2. FAQ exact/similar match returns the fixed FAQ answer.
3. If no FAQ match, keyword-score each intent.
4. Return the highest scoring intent if score > 0.
5. If no intent, return fallback answer.
6. `buildOllamaPrompt` should produce a strict prompt that tells the model:
   - Use only the provided context.
   - Never invent facts.
   - Maximum 3 short sentences.
   - If missing, return the missing info sentence.
   - Do not answer unrelated questions.

## Add forbidden claims

Include common hallucinations to block later:
- University of Southern California
- USC
- M.S. in Software Engineering
- Django
- Flask
- SQLAlchemy
- Prometheus
- Grafana
- Couchbase
- Jenkins
- GitLab CI
- Elastic Beanstalk
- Joe Biden
- pasta recipe

## Testing

After implementing, run the existing lint/typecheck if available.

Also add a small manual test script or simple notes showing expected routing for:

- "What does Daniel do?"
- "What is Daniel's flagship project?"
- "What technologies did Daniel use in the Operational Command Dashboard?"
- "How does Daniel use AI tools?"
- "Can Daniel build backend systems?"
- "What did Daniel study?"
- "How can I contact Daniel?"
- "Who is the president of the United States?"
- "Write me a recipe for pasta."

Expected:
- Portfolio questions route to FAQ or correct intent.
- Unrelated questions return the exact fallback.
- No UI or API should be created in this stage.

Before changing files, inspect the project structure so the new files fit the existing code style.