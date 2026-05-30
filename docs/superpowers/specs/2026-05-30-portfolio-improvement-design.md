# Portfolio Improvement — Design Spec
**Date:** 2026-05-30
**Status:** Approved

---

## Goal

Improve the portfolio so it clearly communicates that Daniel is a strong senior full-stack engineer in the modern AI era, while honestly explaining that most real production work comes from military/internal systems that cannot be shared publicly.

---

## Final Section Order

```
Hero → About → Classified Work → Experience → Case Studies → Skills
  → AI Workflow → Security & Reliability → Public Proof & Systems
  → Education → Build Log → Contact
```

12 sections total (up from 9). New sections: **Classified Work**, **Case Studies**, **Build Log**.
Renamed sections: **Security** → **Security & Reliability** (DOM id changes from `security` to `security-reliability`; update everywhere: DOM, `SLIDE_IDS`, `SLIDE_LABELS`, Intersection Observer, any anchor links), **Projects** → **Public Proof & Systems** (label/header rename only; DOM id stays `projects`).

---

## 1. New Section: Classified Work

**File:** `src/components/sections/ClassifiedWork.tsx`
**DOM id:** `classified-work`
**Sidebar label:** `"Classified Work"`
**Position:** After About, before Experience.

### Purpose
Addresses the elephant in the room: no live demos or source code from primary production work.

### Copy (use verbatim)
> "Most of my production work was built for internal military environments, so I cannot publish source code, screenshots, infrastructure details, or live demos. Instead, this portfolio exposes the parts that matter to recruiters and engineering managers: sanitized architecture decisions, system design thinking, AI-assisted development workflow, security mindset, and public reference implementations."

### Three Cards
| Icon | Title | Body |
|------|-------|------|
| Lock | Sanitized architecture, not classified details | Architecture decisions and tradeoffs are described generically — no classified system details, internal tooling names, or infrastructure specifics are included. |
| GitBranch | Engineering decisions and tradeoffs | System design thinking, technology selection rationale, delivery approach, and production lessons — described at a level safe for public discussion. |
| Code2 | Public proof through reference implementations | Where possible, public reference implementations demonstrate the same skills: this portfolio site, open-source tooling, and AI workflow examples. |

### Design
- Standard `slide-section` with `id="classified-work"`.
- Same cinematic motion pattern as other sections (fade-in-up, `useInView`, `once: true`).
- Cyan accent label, large heading, paragraph copy, then three cards in a horizontal row (desktop) / stacked (mobile).
- Card style: dark glass card matching `var(--bg-card)`, subtle border, icon in accent-colored box.

---

## 2. New Section: Architecture Case Studies

**File:** `src/components/sections/CaseStudies.tsx`
**DOM id:** `case-studies`
**Sidebar label:** `"Case Studies"`
**Position:** After Experience, before Skills.

### Data model — add to `src/lib/data.ts`

```ts
export type CaseStudy = {
  id: string;
  title: string;
  label: string;
  problem: string;
  approach: string[];
  role: string;
  result: string;
  note: string;
};

export const caseStudies: CaseStudy[] = [ ... ];
```

### Three Case Studies

**Case Study 1: Real-Time Operational Dashboard**
- label: `"Sanitized Architecture"`
- problem: Internal teams needed fast, reliable access to operational data.
- approach: Security, reliability, role-based access, low-latency UI, no public exposure. React/TypeScript frontend, Node.js API layer, database-backed services, Redis caching, event-driven real-time update layer.
- role: Architecture, backend/API design, frontend integration, code reviews, release validation.
- result: Production-grade internal system used by operational users.
- note: `"Sanitized summary — no classified details included."`

**Case Study 2: AI-Assisted Engineering Workflow**
- label: `"Modern Development"`
- problem: Improve development speed without lowering code quality.
- approach: Use Claude/GPT/Codex/Ollama/MCP for architecture exploration, scaffolding, debugging, test generation, and refactoring. Every output is reviewed, tested, and adjusted before shipping.
- role: Engineering judgment, integration design, workflow ownership.
- result: Faster iteration with senior-level accountability.
- note: `"AI accelerates the workflow; engineering judgment owns the result."`

**Case Study 3: Secure Full-Stack Delivery**
- label: `"Security & Reliability"`
- problem: Ship full-stack systems that are maintainable, secure, and production-ready.
- approach: Validation at boundaries, RBAC mindset, API error hygiene, Docker-based deployment, health checks, logging, and release validation.
- role: Design, implementation, reviews, deployment readiness.
- result: Safer delivery of production features.
- note: `"Security decisions are described generically to avoid exposing internal implementation details."`

### UI pattern
Tab/card switcher: clicking a tab label animates the content in. Default to first case study active.
Each card shows: label badge (cyan), title (large), problem / approach list / role / result / note.
Motion: content fade-in with slight x-slide on tab change.

---

## 3. New Section: Build Log

**File:** `src/components/sections/BuildLog.tsx`
**DOM id:** `build-log`
**Sidebar label:** `"Build Log"`
**Position:** After Education, before Contact.

### Intro copy (use verbatim)
> "This portfolio is not only a resume page — it is a small production-style product built to demonstrate modern full-stack development, AI-assisted workflows, deployment awareness, and security-minded implementation."

### Five Cards
| Title | Content |
|-------|---------|
| Stack | Next.js 15 App Router, TypeScript 5 strict mode, Tailwind CSS v4, Motion for React, React Three Fiber / Three.js, Zod, react-hook-form |
| AI | Ventura's AI assistant — local Ollama integration (qwen2.5:0.5b, self-hosted), deterministic FAQ router, intent detection, safety checks, grounded rewrite prompts, fallback behavior for safe/offline responses |
| Deployment | Docker, Nginx reverse proxy, production build, security headers, CSP |
| Security | Security headers (CSP, X-Frame-Options, HSTS, Permissions-Policy), Zod validation at boundaries, no `dangerouslySetInnerHTML`, no secrets committed, honeypot anti-spam |
| Future | Public OpsBoard Lite demo, analytics dashboard, contact API rate limiting (Upstash Redis), Turnstile/hCaptcha integration |

### Design
Bento-grid layout: 2-3 columns desktop, single column mobile. Each card: icon, title, bullet list or short paragraph, same glass-card style as other sections.

---

## 4. Data Changes (`src/lib/data.ts`)

### 4a. `aiWorkflow` — shape change
**Old shape:** `{ tool, role, description, icon }`
**New shape:** `{ step: number, title, description, icon }`

Seven steps:

| step | title | icon |
|------|-------|------|
| 1 | Understand requirements manually | Brain |
| 2 | Break into architecture, data model, API, UI, and deployment tasks | Network |
| 3 | Use AI for alternatives, scaffolding, debugging, and test generation | Zap |
| 4 | Review generated code manually | Code |
| 5 | Add validation, edge cases, and tests | TestTube |
| 6 | Refactor for maintainability | Bug |
| 7 | Deploy, verify, and document | Server |

Footer banner copy: **"I use AI to move faster, but architecture, review, and accountability remain mine."**

Every file that imports or references `aiWorkflow` must be updated for the new shape. Files to check: `AIWorkflow.tsx`, any knowledge.ts references.

### 4b. `projects` — type update
Add optional fields to the `Project` type:
```ts
status: "live" | "sanitized" | "internal" | "public" | "coming-soon"
badge?: string
```

Update projects:
- **Operational Command Dashboard:** `status: "sanitized"`, `badge: "Sanitized Case Study"`. Description change: remove "zero downtime SLA", replace with "Designed for high availability, low-latency operational usage, and safe release validation." Change "1,000+ concurrent users" → "1,000+ operational users".
- **AI-Augmented Dev Pipeline:** `status: "internal"`.
- **Cloud-Native Microservices Platform:** `status: "internal"`.
- **B2B Client Engagement Platform:** Fix "white-label white-label" → "white-label". `status: "sanitized"`, `badge: "Sanitized Case Study"` (built for a private client at Dynamic Web — no public repo or live demo available).

### 4c. Wording fixes
- `data.ts` line ~511: Replace "navigating model guardrails through careful framing and reframing. Techniques include role+task+constraint structuring, chain-of-thought elicitation, and reformulating restricted subjects in ways that yield actionable responses without triggering refusals." with: "using clear role/task/context structuring, constraints, examples, output schemas, and iterative refinement to produce accurate, reviewable engineering outputs."
- Remove "zero downtime SLA" everywhere in `data.ts`.
- Change "1,000+ concurrent users" → "1,000+ operational users" everywhere in `data.ts`.

### 4d. Add `caseStudies` array (see §2 above)

---

## 5. Component: Security → Security & Reliability

- **`Security.tsx`:** Change `id="security"` → `id="security-reliability"`. Change the section eyebrow label from "Security & Countermeasures" to "Security & Reliability". Change the heading to reflect expanded scope: validation, API protection, safe deployments, monitoring/logging, reliability.
- **`SlideSidebar.tsx`:** Update the entry from `"security"` → `"security-reliability"` in `SLIDE_IDS` and `SLIDE_LABELS["security-reliability"]` → `"Security & Reliability"`.
- **`page.tsx`:** No id change needed here since the section renders its own id.

---

## 6. Component: Projects rename

- **`Projects.tsx`:** Change the eyebrow label string "Projects" → "Public Proof & Systems". The DOM `id="projects"` stays the same. Sidebar label changes to "Public Proof & Systems" (may truncate on mobile — acceptable).
- Show `project.badge` as a small pill chip when present (cyan border, small font, positioned near the year).
- Status display: show `project.status` as a secondary label near the year. Map: `sanitized` → "Sanitized Case Study", `internal` → "Internal / Classified", `public` → "Public", `coming-soon` → "Coming Soon".

---

## 7. VenturaAIChat improvements

### Suggested prompt chips
- Render 6 clickable chips **above the input area** when the chat panel is open.
- Chip labels (exact):
  1. "Why should we hire Daniel?"
  2. "What senior full-stack experience does Daniel have?"
  3. "How does Daniel use AI in development?"
  4. "Explain Daniel's architecture experience."
  5. "What can Daniel build in the first 30 days?"
  6. "Why are there no live classified projects?"
- Clicking a chip: sets input text to the chip label AND immediately submits (calls `sendMessage`).
- While `isLoading` is true, chips are `pointer-events-none` and visually dimmed.

### Description text
Add a small `<p>` block visible inside the chat panel (below the header, above messages):
> "Ventura's AI is a lightweight portfolio assistant designed to answer questions about Daniel's experience, technical background, projects, architecture decisions, and AI-assisted workflow. It is resume-grounded, restricted to portfolio-relevant topics, and built with fallback behavior for safe/offline responses."

Show this text only when `messages.length === 1` (i.e., only the initial greeting is shown, no conversation yet). Hide it once the user starts a conversation.

### Hero button
The existing `"Ask my AI assistant about my experience"` button in `Hero.tsx` dispatches `ventura-ai:open` and `VenturaAIChat` listens for it. **Do not change this mechanism.**

---

## 8. AI Workflow section rewrite (`AIWorkflow.tsx`)

Grid of 7 step-cards, same visual pattern as now.
Each card shows: step number (large watermark), icon, step title, description.
Footer banner: **"I use AI to move faster, but architecture, review, and accountability remain mine."**
Remove tool-name-first framing. Focus on process and judgment.

---

## 9. Ventura AI knowledge updates (`knowledge.ts` and `route.ts`)

Add FAQ entries / intent answers covering the new site content:

| Question keywords | Answer |
|---|---|
| classified work, can't share, no public code, military work | Why most production work cannot be shown publicly: built for internal military environments — source code, screenshots, infrastructure details, and live demos cannot be published. The portfolio demonstrates engineering ability through sanitized architecture, design thinking, and public reference implementations instead. |
| case studies, architecture case study | The Architecture Case Studies section presents three sanitized case studies: Real-Time Operational Dashboard (architecture and system design), AI-Assisted Engineering Workflow (modern development process), and Secure Full-Stack Delivery (security and reliability). No classified details are included. |
| AI responsibly, AI workflow, how uses AI | Seven-step engineering process: understand requirements manually, break into tasks, use AI for alternatives/scaffolding/debugging/tests, review all generated code, add validation and edge cases, refactor, deploy and verify. AI accelerates; engineering judgment owns the result. |
| public proof, systems, public projects | The Public Proof & Systems section presents four sanitized or public projects. Internal/military projects are presented as sanitized case studies. The B2B platform is a public reference. This portfolio site itself is a public proof of full-stack delivery. |
| build log, portfolio tech, how portfolio built | The Build Log section explains that the portfolio is a small production-style product: Next.js 15, TypeScript, Tailwind, Motion, React Three Fiber, Ollama-powered AI assistant, Docker/Nginx deployment, security headers, Zod validation. |
| no live projects, no demos, why no github | Most of Daniel's production experience is from military/internal systems. Source code, screenshots, and live demos cannot be published. The portfolio demonstrates the same skills through sanitized architecture, this portfolio site, and public reference implementations. |

These should be added as new FAQ entries in `knowledge.ts` (using the existing keyword + answer pattern) and/or as new `safeIntentAnswers` entries in `route.ts` if new intent IDs are warranted.

---

## 10. Navigation (`SlideSidebar.tsx`)

Updated `SLIDE_IDS`:
```ts
export const SLIDE_IDS = [
  "hero", "about", "classified-work", "experience", "case-studies",
  "skills", "ai-workflow", "security-reliability", "projects",
  "education", "build-log", "contact",
] as const;
```

Updated `SLIDE_LABELS`:
```ts
const SLIDE_LABELS: Record<SlideId, string> = {
  hero: "Home",
  about: "About",
  "classified-work": "Classified Work",
  experience: "Experience",
  "case-studies": "Case Studies",
  skills: "Skills",
  "ai-workflow": "AI Workflow",
  "security-reliability": "Security & Reliability",
  projects: "Public Proof",
  education: "Education",
  "build-log": "Build Log",
  contact: "Contact",
};
```

Note: `projects` sidebar label is shortened to "Public Proof" to fit the dot nav without overflow.

---

## 11. Page composition (`page.tsx`)

Add imports and section placements:
```tsx
import { ClassifiedWork } from "@/components/sections/ClassifiedWork";
import { CaseStudies }     from "@/components/sections/CaseStudies";
import { BuildLog }         from "@/components/sections/BuildLog";
```

Section order in JSX:
```tsx
<Hero />
<About />
<ClassifiedWork />
<Experience />
<CaseStudies />
<Skills />
<AIWorkflow />
<Security />       {/* id now "security-reliability" */}
<Projects />
<Education />
<BuildLog />
<Contact />
```

---

## 12. Final validation

Run after all changes:
```
npm run lint
npm run build
```

All TypeScript errors, lint errors, missing imports, and type mismatches must be resolved before considering the task complete. No TODO comments should remain unless they are intentional future roadmap items already present in the codebase.

---

## Out of scope

- Redesigning the visual style, color palette, or motion system.
- Adding new external integrations or APIs.
- Changing the Ollama/AI backend implementation.
- Adding analytics or tracking.
