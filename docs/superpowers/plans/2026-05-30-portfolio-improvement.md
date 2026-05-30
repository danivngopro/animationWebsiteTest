# Portfolio Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three new sections (Classified Work, Case Studies, Build Log), rename Security to Security & Reliability, rewrite the AI Workflow data shape, upgrade the Projects section, improve VenturaAIChat with recruiter prompts, and update AI knowledge — resulting in a portfolio that honestly communicates senior full-stack experience from classified/internal work.

**Architecture:** All changes follow the existing cinematic slide-section pattern. New sections are standard React client components using `useInView` + `motion/react`. Data changes in `src/lib/data.ts` are the foundation; components are updated or created on top. Navigation in `SlideSidebar.tsx` is updated last, before wiring everything in `page.tsx`.

**Tech Stack:** Next.js 15, TypeScript 5 strict, Tailwind CSS v4, Motion for React (`motion/react`), lucide-react icons, `src/lib/data.ts` as data source.

**Type-check command (use throughout):** `npx tsc --noEmit`

---

## File Map

**Modified:**
- `src/lib/data.ts` — aiWorkflow shape, Project type, caseStudies data, wording fixes
- `src/lib/ventura-ai/knowledge.ts` — new FAQ entries, updated intent contexts
- `src/app/api/ventura-ai/chat/route.ts` — updated safeIntentAnswers
- `src/components/layout/SlideSidebar.tsx` — 3 new SLIDE_IDS + SLIDE_LABELS, security rename
- `src/components/sections/Security.tsx` — id + heading rename
- `src/components/sections/AIWorkflow.tsx` — new step-based iconMap + rendering
- `src/components/sections/Projects.tsx` — eyebrow label, badge + status display
- `src/components/ventura-ai/VenturaAIChat.tsx` — recruiter prompts + description text
- `src/app/page.tsx` — import + render 3 new sections

**Created:**
- `src/components/sections/ClassifiedWork.tsx`
- `src/components/sections/CaseStudies.tsx`
- `src/components/sections/BuildLog.tsx`

---

## Task 1: `data.ts` — rewrite `aiWorkflow` + fix wording

**Files:**
- Modify: `src/lib/data.ts:165-229` (aiWorkflow array)
- Modify: `src/lib/data.ts:302` (project description)
- Modify: `src/lib/data.ts:510-511` (prompt engineering skill)

- [ ] **Step 1: Replace the `aiWorkflow` array**

Replace lines 165–229 in `src/lib/data.ts`. The entire `aiWorkflow` export changes from `{ tool, role, description, icon }` to `{ step, title, description, icon }`:

```ts
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
      "Prompt AI with explicit context, constraints, and expected output format. Use it for architecture options, scaffolding, debugging, and test scaffolds.",
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
```

- [ ] **Step 2: Fix Operational Command Dashboard description (line ~302)**

Find and replace in `src/lib/data.ts`:

Old:
```ts
"Mission-critical real-time monitoring platform serving internal command teams at IDF. Full TypeScript stack with live WebSocket feeds, RBAC, and <1s latency requirements. Handled 1,000+ concurrent users with zero downtime SLA.",
```

New:
```ts
"Mission-critical real-time monitoring platform serving internal command teams at IDF. Full TypeScript stack with live WebSocket feeds, RBAC, and <1s latency requirements. Designed for high availability, low-latency operational usage, and safe release validation. Served 1,000+ operational users.",
```

- [ ] **Step 3: Fix prompt engineering skill wording (line ~511)**

Find and replace in `src/lib/data.ts`:

Old `experience` value:
```ts
"The ability to phrase prompts in a way that gets the most out of LLMs — clearer reasoning, more precise outputs, and navigating model guardrails through careful framing and reframing. Techniques include role+task+constraint structuring, chain-of-thought elicitation, and reformulating restricted subjects in ways that yield actionable responses without triggering refusals. Applied as a first-class engineering skill across all AI-assisted workflows.",
```

New:
```ts
"Using clear role/task/context structuring, constraints, examples, output schemas, and iterative refinement to produce accurate, reviewable engineering outputs. Techniques include chain-of-thought elicitation, few-shot examples, and explicit output format constraints. Applied as a first-class engineering skill across all AI-assisted workflows.",
```

- [ ] **Step 4: Type-check**

```
npx tsc --noEmit
```

Expected: errors in `AIWorkflow.tsx` (references `item.tool` and `item.role` which no longer exist). That is correct — they will be fixed in Task 5.

- [ ] **Step 5: Commit**

```
git add src/lib/data.ts
git commit -m "refactor: rewrite aiWorkflow shape to step-based process, fix wording"
```

---

## Task 2: `data.ts` — Project type + caseStudies data

**Files:**
- Modify: `src/lib/data.ts` (Project type, projects array, add caseStudies)

- [ ] **Step 1: Update `Project` type and add `ProjectStatus` (line ~336)**

Replace:
```ts
export type Project = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
  status: "live" | "TODO";
  year: string;
};
```

With:
```ts
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
```

- [ ] **Step 2: Replace the `projects` array declaration to use `Project[]`**

Replace the entire `projects` export (lines ~297–334):

```ts
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
```

- [ ] **Step 3: Add `CaseStudy` type and `caseStudies` array after the `projects` section**

Insert after the `Project` type block:

```ts
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
```

- [ ] **Step 4: Type-check**

```
npx tsc --noEmit
```

Expected: `AIWorkflow.tsx` still errors (not fixed yet). No new errors from data.ts changes.

- [ ] **Step 5: Commit**

```
git add src/lib/data.ts
git commit -m "feat(data): add ProjectStatus/CaseStudy types, caseStudies array, fix project entries"
```

---

## Task 3: `SlideSidebar.tsx` — navigation update

**Files:**
- Modify: `src/components/layout/SlideSidebar.tsx:6-30`

- [ ] **Step 1: Replace `SLIDE_IDS` and `SLIDE_LABELS`**

Replace lines 6–30 in `SlideSidebar.tsx`:

```ts
export const SLIDE_IDS = [
  "hero",
  "about",
  "classified-work",
  "experience",
  "case-studies",
  "skills",
  "ai-workflow",
  "security-reliability",
  "projects",
  "education",
  "build-log",
  "contact",
] as const;

export type SlideId = (typeof SLIDE_IDS)[number];

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

- [ ] **Step 2: Type-check**

```
npx tsc --noEmit
```

Expected: clean (new IDs are not yet used by any component, so no errors from unused ids).

- [ ] **Step 3: Commit**

```
git add src/components/layout/SlideSidebar.tsx
git commit -m "feat(nav): add 3 new sections, rename security to security-reliability"
```

---

## Task 4: `Security.tsx` — rename id + heading

**Files:**
- Modify: `src/components/sections/Security.tsx`

- [ ] **Step 1: Change the section id**

Find:
```tsx
<div id="security" className="slide-section hex-bg" ref={ref} style={{ background: "transparent" }}>
```

Replace with:
```tsx
<div id="security-reliability" className="slide-section hex-bg" ref={ref} style={{ background: "transparent" }}>
```

- [ ] **Step 2: Change eyebrow label**

Find:
```tsx
              Security & Countermeasures
```

Replace with:
```tsx
              Security & Reliability
```

- [ ] **Step 3: Change the heading text**

Find:
```tsx
              <span className="text-gradient-subtle">Defense </span>
              <span className="text-gradient-indigo">as a default.</span>
```

Replace with:
```tsx
              <span className="text-gradient-subtle">Reliable </span>
              <span className="text-gradient-indigo">by design.</span>
```

- [ ] **Step 4: Type-check**

```
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 5: Commit**

```
git add src/components/sections/Security.tsx
git commit -m "feat(security): rename section to Security & Reliability, update id and headings"
```

---

## Task 5: `AIWorkflow.tsx` — render new step-based shape

**Files:**
- Modify: `src/components/sections/AIWorkflow.tsx`

- [ ] **Step 1: Replace imports and iconMap**

Replace the import line and iconMap at the top of `AIWorkflow.tsx`:

```tsx
import { Brain, Code, Network, Server, TestTube, Wrench, Zap } from "lucide-react";
import { aiWorkflow } from "@/lib/data";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const iconMap: Record<string, LucideIcon> = {
  Brain:    Brain    as LucideIcon,
  Code:     Code     as LucideIcon,
  Network:  Network  as LucideIcon,
  Server:   Server   as LucideIcon,
  TestTube: TestTube as LucideIcon,
  Wrench:   Wrench   as LucideIcon,
  Zap:      Zap      as LucideIcon,
};
```

- [ ] **Step 2: Update the card rendering inside the grid**

Find the card inner content block (the part that renders `item.tool`, `item.role`, `item.description`):

```tsx
                <div>
                  <p className="text-[11px] sm:text-sm font-bold leading-tight text-slate-100">{item.tool}</p>
                  <p className="hidden sm:block text-xs font-medium mt-0.5" style={{ color: "var(--accent-cyan)" }}>{item.role}</p>
                </div>
                <p className="hidden sm:block text-[11px] leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
```

Replace with:
```tsx
                <div>
                  <p className="text-[11px] sm:text-sm font-bold leading-tight text-slate-100">{item.title}</p>
                </div>
                <p className="hidden sm:block text-[11px] leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
```

- [ ] **Step 3: Update the footer banner text**

Find:
```tsx
          <span className="font-semibold text-slate-200">AI accelerates.</span>{" "}
          Engineering judgment decides. Every output reviewed before it ships.
```

Replace with:
```tsx
          <span className="font-semibold text-slate-200">I use AI to move faster,</span>{" "}
          but architecture, review, and accountability remain mine.
```

- [ ] **Step 4: Type-check**

```
npx tsc --noEmit
```

Expected: clean — `item.tool` and `item.role` are gone, `item.title` exists on the new shape.

- [ ] **Step 5: Commit**

```
git add src/components/sections/AIWorkflow.tsx
git commit -m "feat(ai-workflow): render step-based process, update iconMap and footer"
```

---

## Task 6: `Projects.tsx` — label rename + badge + status display

**Files:**
- Modify: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Rename the eyebrow label**

Find:
```tsx
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            Projects
```

Replace with:
```tsx
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            Public Proof & Systems
```

- [ ] **Step 2: Add status and badge display below the year label**

Find the year rendering block:
```tsx
              {/* Year */}
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--accent-indigo)" }}
              >
                {project.year}
              </p>
```

Replace with:
```tsx
              {/* Year + status + badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <p
                  className="text-xs font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "var(--accent-indigo)" }}
                >
                  {project.year}
                </p>
                {project.badge && (
                  <span
                    className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{
                      borderColor: "rgba(34,211,238,0.35)",
                      color: "var(--accent-cyan)",
                      background: "rgba(34,211,238,0.06)",
                    }}
                  >
                    {project.badge}
                  </span>
                )}
              </div>
```

- [ ] **Step 3: Type-check**

```
npx tsc --noEmit
```

Expected: clean. `project.badge` is `string | undefined`; the conditional render handles `undefined`.

- [ ] **Step 4: Commit**

```
git add src/components/sections/Projects.tsx
git commit -m "feat(projects): rename label to Public Proof & Systems, add badge display"
```

---

## Task 7: Create `ClassifiedWork.tsx`

**Files:**
- Create: `src/components/sections/ClassifiedWork.tsx`

- [ ] **Step 1: Create the file with the full component**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code2, GitBranch, Lock } from "lucide-react";

const CARDS = [
  {
    icon: Lock,
    title: "Sanitized architecture, not classified details",
    body: "Architecture decisions and tradeoffs are described generically — no classified system details, internal tooling names, or infrastructure specifics are included.",
  },
  {
    icon: GitBranch,
    title: "Engineering decisions and tradeoffs",
    body: "System design thinking, technology selection rationale, delivery approach, and production lessons — described at a level safe for public discussion.",
  },
  {
    icon: Code2,
    title: "Public proof through reference implementations",
    body: "Where possible, public reference implementations demonstrate the same skills: this portfolio site, open-source tooling, and AI workflow examples.",
  },
] as const;

export function ClassifiedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      id="classified-work"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.50)" }}
    >
      <div className="h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[124px] sm:pb-14 max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-cyan)" }}
          >
            Classified Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="text-gradient-subtle">Built for</span>
            <br />
            <span className="text-gradient-indigo">internal teams.</span>
          </motion.h2>
        </div>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base leading-relaxed max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Most of my production work was built for internal military environments, so I cannot
          publish source code, screenshots, infrastructure details, or live demos. Instead, this
          portfolio exposes the parts that matter to recruiters and engineering managers: sanitized
          architecture decisions, system design thinking, AI-assisted development workflow, security
          mindset, and public reference implementations.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -4 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.35 + i * 0.1 },
                y: { type: "spring", stiffness: 600, damping: 30 },
              }}
              className="relative group p-5 rounded-2xl border flex flex-col gap-3"
              style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,211,238,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-cyan-dim)" }}
              >
                <Icon className="w-4 h-4" style={{ color: "var(--accent-cyan)" }} />
              </div>
              <p className="text-sm font-bold text-slate-100 leading-snug">{title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 3: Commit**

```
git add src/components/sections/ClassifiedWork.tsx
git commit -m "feat: add ClassifiedWork section"
```

---

## Task 8: Create `CaseStudies.tsx`

**Files:**
- Create: `src/components/sections/CaseStudies.tsx`

- [ ] **Step 1: Create the file with the full component**

```tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { caseStudies } from "@/lib/data";

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const study = caseStudies[active];

  return (
    <div
      id="case-studies"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.50)" }}
    >
      <div className="h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[124px] sm:pb-14 max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-cyan)" }}
          >
            Architecture Case Studies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            <span className="text-gradient-subtle">How I approached </span>
            <span className="text-gradient-indigo">hard problems.</span>
          </motion.h2>
        </div>

        {/* Tab row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 flex-wrap"
        >
          {caseStudies.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{
                background: active === i ? "var(--accent-indigo)" : "var(--bg-card)",
                color: active === i ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${active === i ? "transparent" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {s.title}
            </button>
          ))}
        </motion.div>

        {/* Case study content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={study.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col gap-4 min-h-0"
          >
            {/* Label + title */}
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border"
                style={{
                  borderColor: "rgba(34,211,238,0.35)",
                  color: "var(--accent-cyan)",
                  background: "rgba(34,211,238,0.06)",
                }}
              >
                {study.label}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Problem
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.problem}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Approach
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {study.approach.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent-cyan)" }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    My Role
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.role}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Result
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.result}
                  </p>
                </div>
                {/* Sanitized note */}
                <div
                  className="mt-auto px-3 py-2 rounded-lg text-xs"
                  style={{
                    background: "rgba(99,102,241,0.06)",
                    border: "1px solid rgba(99,102,241,0.18)",
                    color: "var(--text-muted)",
                  }}
                >
                  ⚠ {study.note}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 3: Commit**

```
git add src/components/sections/CaseStudies.tsx
git commit -m "feat: add CaseStudies section with tab switcher"
```

---

## Task 9: Create `BuildLog.tsx`

**Files:**
- Create: `src/components/sections/BuildLog.tsx`

- [ ] **Step 1: Create the file with the full component**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Bot, Layers, Server, Shield, Sparkles } from "lucide-react";

const BUILD_CARDS = [
  {
    icon: Layers,
    title: "Stack",
    items: [
      "Next.js 15 App Router",
      "TypeScript 5 strict mode",
      "Tailwind CSS v4",
      "Motion for React",
      "React Three Fiber / Three.js",
      "Zod + react-hook-form",
    ],
  },
  {
    icon: Bot,
    title: "AI",
    items: [
      "Ventura's AI — local Ollama integration (qwen2.5:0.5b, self-hosted)",
      "Deterministic FAQ router + intent detection",
      "Safety checks + grounded rewrite prompts",
      "Fallback behavior for safe/offline responses",
    ],
  },
  {
    icon: Server,
    title: "Deployment",
    items: [
      "Docker container",
      "Nginx reverse proxy",
      "Production Next.js build",
      "Security headers via next.config.ts",
    ],
  },
  {
    icon: Shield,
    title: "Security",
    items: [
      "CSP, X-Frame-Options, HSTS, Permissions-Policy",
      "Zod validation at all system boundaries",
      "No dangerouslySetInnerHTML",
      "No secrets committed",
      "Honeypot anti-spam on contact form",
    ],
  },
  {
    icon: Sparkles,
    title: "Planned improvements",
    items: [
      "Public OpsBoard Lite demo",
      "Analytics dashboard",
      "Contact API rate limiting (Upstash Redis)",
      "Turnstile / hCaptcha integration",
    ],
  },
] as const;

export function BuildLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      id="build-log"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.50)" }}
    >
      <div className="h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[124px] sm:pb-14 max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-cyan)" }}
          >
            Build Log
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            <span className="text-gradient-subtle">This portfolio</span>
            <br />
            <span className="text-gradient-indigo">is a product.</span>
          </motion.h2>
        </div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm leading-relaxed max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          This portfolio is not only a resume page — it is a small production-style product built
          to demonstrate modern full-stack development, AI-assisted workflows, deployment awareness,
          and security-minded implementation.
        </motion.p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BUILD_CARDS.map(({ icon: Icon, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -3 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.3 + i * 0.08 },
                y: { type: "spring", stiffness: 600, damping: 30 },
              }}
              className="p-4 rounded-2xl border flex flex-col gap-3"
              style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--accent-indigo-dim)" }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: "var(--accent-indigo)" }} />
                </div>
                <p className="text-sm font-bold text-slate-100">{title}</p>
              </div>
              <ul className="flex flex-col gap-1">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--accent-indigo)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 3: Commit**

```
git add src/components/sections/BuildLog.tsx
git commit -m "feat: add BuildLog section"
```

---

## Task 10: `VenturaAIChat.tsx` — recruiter prompts + description text

**Files:**
- Modify: `src/components/ventura-ai/VenturaAIChat.tsx`

- [ ] **Step 1: Replace `STARTER_QUESTIONS` with `RECRUITER_PROMPTS`**

Find:
```ts
const STARTER_QUESTIONS = [
  "What does Daniel do?",
  "What is Ventura's AI?",
  "What is Daniel's flagship project?",
  "What technologies does Daniel use?",
  "How does Daniel use AI tools?",
] as const;
```

Replace with:
```ts
const RECRUITER_PROMPTS = [
  "Why should we hire Daniel?",
  "What senior full-stack experience does Daniel have?",
  "How does Daniel use AI in development?",
  "Explain Daniel's architecture experience.",
  "What can Daniel build in the first 30 days?",
  "Why are there no live classified projects?",
] as const;
```

- [ ] **Step 2: Update the chip rendering to use `RECRUITER_PROMPTS`**

Find:
```tsx
              {STARTER_QUESTIONS.map((question) => (
```

Replace with:
```tsx
              {RECRUITER_PROMPTS.map((question) => (
```

- [ ] **Step 3: Add the description text block inside the messages area**

Find:
```tsx
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-label="Ventura's AI conversation">
            {messages.map((message) => {
```

Replace with:
```tsx
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-label="Ventura's AI conversation">
            {messages.length === 1 && (
              <p className="text-xs leading-relaxed text-slate-500 border-b border-white/6 pb-3 mb-1">
                Ventura&apos;s AI is a lightweight portfolio assistant designed to answer questions
                about Daniel&apos;s experience, technical background, projects, architecture
                decisions, and AI-assisted workflow. It is resume-grounded, restricted to
                portfolio-relevant topics, and built with fallback behavior for safe/offline
                responses.
              </p>
            )}
            {messages.map((message) => {
```

- [ ] **Step 4: Type-check**

```
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 5: Commit**

```
git add src/components/ventura-ai/VenturaAIChat.tsx
git commit -m "feat(chat): replace starter prompts with recruiter prompts, add description text"
```

---

## Task 11: `knowledge.ts` + `route.ts` — AI knowledge updates

**Files:**
- Modify: `src/lib/ventura-ai/knowledge.ts` (add FAQ entries, update intent contexts)
- Modify: `src/app/api/ventura-ai/chat/route.ts` (update safeIntentAnswers)

- [ ] **Step 1: Add 6 new FAQ entries to `knowledge.ts`**

In `knowledge.ts`, find the end of the `faq` array (just before the closing `];` of the `faq` export). Insert these new entries:

```ts
  {
    id: "classified-work-why",
    intent: "experience",
    questions: [
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
      "Most of Daniel's production work was built for internal military environments in the IDF. Source code, screenshots, infrastructure details, and live demos cannot be published. The portfolio demonstrates the same engineering ability through sanitized architecture decisions, system design thinking, AI-assisted workflow, and public reference implementations.",
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
      "Daniel brings 7+ years of production full-stack experience, including 4 years as a Full-Stack Engineer and 2 years as a Team Lead delivering mission-critical systems used by 1,000+ operational users. He combines TypeScript, Node.js, React, cloud-native infrastructure, and AI-assisted engineering into a senior-level delivery skillset. He codes, architects, reviews, and ships.",
  },
```

- [ ] **Step 2: Update `aiWorkflow` intent context in `knowledge.ts`**

Find the `aiWorkflow` intent's `context` field (around line ~373):

```ts
    context:
      "Daniel uses AI tools as part of a controlled engineering workflow. He uses Claude Agent for code generation; Claude and Claude Code for deeper implementation help and code reasoning; ChatGPT for design thinking, architecture exploration, technology search, implementation planning, and technical research; OpenAI Codex for coding assistance; developer plugins for Git management, tests, UI tests, and code reviews; GitHub Copilot for in-editor productivity; MCP servers for context-aware AI tooling; and Ollama/local LLMs for privacy-first local inference. Daniel reviews, adapts, tests, and validates AI-assisted outputs before production use.",
```

Replace with:
```ts
    context:
      "Daniel uses AI as part of a seven-step engineering process: understand requirements manually, break work into architecture and implementation layers, use AI for alternatives/scaffolding/debugging/test generation, review generated code manually, add validation and edge-case tests, refactor for maintainability, then deploy and verify. Tools include Claude, Claude Code, ChatGPT, Codex, GitHub Copilot, MCP servers, and Ollama for local LLM inference. Architecture, review, and accountability remain Daniel's — AI accelerates the work.",
```

- [ ] **Step 3: Update `safeIntentAnswers` for `aiWorkflow` in `route.ts`**

In `src/app/api/ventura-ai/chat/route.ts`, find:

```ts
  aiWorkflow:
    "Daniel uses AI tools as part of a controlled engineering workflow, including Claude Agent, Claude Code, ChatGPT, OpenAI Codex, GitHub Copilot, MCP servers, developer plugins, and local Ollama models. He uses them for planning, implementation, debugging, refactoring, reviews, tests, and UI checks, then reviews and validates AI-assisted work before production use.",
```

Replace with:
```ts
  aiWorkflow:
    "Daniel uses a seven-step process: understand requirements manually, break work into architecture and implementation layers, use AI for alternatives/scaffolding/debugging/test generation, review generated code manually, add validation and tests, refactor for maintainability, then deploy and verify. Tools include Claude, Claude Code, ChatGPT, Codex, GitHub Copilot, MCP servers, and a local Ollama integration. Architecture, review, and accountability remain his — AI accelerates the work.",
```

- [ ] **Step 4: Update `portfolioWebsite` safeIntentAnswer in `route.ts`**

Find:
```ts
  portfolioWebsite:
    "Daniel's portfolio is a cinematic fullscreen snap-scroll experience built with Next.js 15 App Router, TypeScript 5 strict mode, Tailwind CSS v4, shadcn/ui, Motion for React, React Three Fiber, Drei, Three.js, Zod, react-hook-form, Docker, and Nginx reverse proxy. It includes security headers, CSP, validation, anti-spam concepts, and AI-aware security practices.",
```

Replace with:
```ts
  portfolioWebsite:
    "Daniel's portfolio is a cinematic fullscreen snap-scroll experience and a small production-style product. Built with Next.js 15, TypeScript 5 strict mode, Tailwind CSS v4, Motion for React, React Three Fiber, Three.js, Zod, and react-hook-form. Deployed via Docker and Nginx. Features include security headers, CSP, Zod validation, Ventura's AI (local Ollama, qwen2.5:0.5b), and a Build Log section that documents the full stack and deployment approach.",
```

- [ ] **Step 5: Type-check**

```
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 6: Commit**

```
git add src/lib/ventura-ai/knowledge.ts src/app/api/ventura-ai/chat/route.ts
git commit -m "feat(ai): add recruiter FAQ entries, update aiWorkflow and portfolioWebsite answers"
```

---

## Task 12: `page.tsx` — wire up all sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add the three new imports**

Add after the existing import for `Contact`:

```tsx
import { ClassifiedWork } from "@/components/sections/ClassifiedWork";
import { CaseStudies }    from "@/components/sections/CaseStudies";
import { BuildLog }       from "@/components/sections/BuildLog";
```

- [ ] **Step 2: Place sections in the correct order**

Replace the section JSX block (lines ~36–44):

```tsx
      <Hero />
      <About />
      <ClassifiedWork />
      <Experience />
      <CaseStudies />
      <Skills />
      <AIWorkflow />
      <Security />
      <Projects />
      <Education />
      <BuildLog />
      <Contact />
```

- [ ] **Step 3: Type-check**

```
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 4: Commit**

```
git add src/app/page.tsx
git commit -m "feat: wire up ClassifiedWork, CaseStudies, BuildLog sections in page.tsx"
```

---

## Task 13: Final lint + build validation

**Files:** All modified files (no new changes — fix errors only).

- [ ] **Step 1: Run ESLint**

```
npm run lint
```

Review and fix any errors. Common issues to watch for:
- Unused imports in `AIWorkflow.tsx` (removed icons like `Bug`, `BarChart2`, `Cpu` that are no longer in iconMap)
- `as const` on object literals inside `readonly` typed arrays

- [ ] **Step 2: Run full build**

```
npm run build
```

Expected: exits 0 with no TypeScript or Next.js build errors.

- [ ] **Step 3: Fix any remaining errors**

Common build-time issues:
- `projects[active].badge` — TypeScript narrows it as `string | undefined`; the conditional `{project.badge && ...}` already handles this, but if TS complains, add an explicit check: `project.badge != null`
- Missing `"use client"` directive on any new section component — all three new sections use `useState`/`useRef`/`useInView` and already have it
- `CaseStudies.tsx` flex layout on the content area — if `flex-1` causes overflow in the slide, wrap the content grid in `overflow-hidden`

- [ ] **Step 4: Final commit**

```
git add -A
git commit -m "fix: resolve lint and build errors from portfolio improvement"
```

---

## Self-Review Against Spec

| Spec requirement | Covered by task |
|---|---|
| New section: Classified Work (after About, before Experience) | Task 7 + Task 12 |
| 3 Classified Work cards (Lock, GitBranch, Code2) | Task 7 |
| Classified Work copy (verbatim) | Task 7 |
| New section: Architecture Case Studies (after Experience, before Skills) | Task 8 + Task 12 |
| `caseStudies` array in `data.ts` | Task 2 |
| `CaseStudy` type | Task 2 |
| 3 case study tabs (Dashboard, AI Workflow, Secure Delivery) | Task 8 |
| New section: Build Log (before Contact) | Task 9 + Task 12 |
| Build Log intro copy (verbatim) | Task 9 |
| Build Log 5 cards (Stack, AI, Deployment, Security, Future) | Task 9 |
| Ollama wording confirmed accurate (qwen2.5:0.5b self-hosted) | Task 9 |
| Projects → "Public Proof & Systems" eyebrow label | Task 6 |
| `ProjectStatus` type + `badge?` on `Project` | Task 2 |
| Operational Dashboard: status sanitized, badge, description fix | Task 2 |
| B2B Platform: white-label fix, status sanitized, badge | Task 2 |
| AI Dev Pipeline + Microservices: status internal | Task 2 |
| aiWorkflow shape change: `{ step, title, description, icon }` | Task 1 |
| AIWorkflow.tsx updated to render new shape | Task 5 |
| Footer banner updated | Task 5 |
| Security id → `security-reliability` | Task 4 |
| Security eyebrow → "Security & Reliability" | Task 4 |
| Security heading → "Reliable by design." | Task 4 |
| SlideSidebar: 3 new IDs + labels, security renamed | Task 3 |
| VenturaAI: 6 recruiter prompt chips (auto-submit, disabled when loading) | Task 10 |
| VenturaAI: description text (shown when messages.length === 1) | Task 10 |
| Hero button (`ventura-ai:open`) unchanged | Not touched |
| AI knowledge: classified work, case studies, build log, public proof, hire Daniel, AI responsible use | Task 11 |
| aiWorkflow intent context updated to 7-step process | Task 11 |
| portfolioWebsite safeIntentAnswer updated with Build Log info | Task 11 |
| "navigating model guardrails" phrase removed | Task 1 |
| "zero downtime SLA" removed | Task 1 + Task 2 |
| "1,000+ concurrent users" → "1,000+ operational users" | Task 1 + Task 2 |
| `npm run lint` passes | Task 13 |
| `npm run build` passes | Task 13 |
