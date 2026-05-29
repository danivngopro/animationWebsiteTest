# Daniel Ventura — Portfolio

Premium personal portfolio for **Daniel Ventura**, Senior Full-Stack Developer with AI-native engineering expertise.

---

## Project Concept

Not a CV on a page — an interactive product experience. The site communicates technical depth, leadership credibility, and AI-native engineering as a professional differentiator. Each section is a story beat, not a data dump.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Components | shadcn/ui (base-nova style) |
| Animation | Motion for React (scroll reveals, entrance, hover) |
| Smooth scroll | Lenis v1 |
| 3D / WebGL | React Three Fiber + Drei (hero particle field) |
| Form validation | Zod + react-hook-form + @hookform/resolvers |
| Icons | lucide-react |

---

## Animation Strategy

### Philosophy
Premium motion — purposeful, not decorative. Every animation communicates state or hierarchy, never distracts.

### Implementation
- **Entrance reveals**: `whileInView` + `once: true` on all section content. Fade + `translateY(32px → 0)`.
- **Hero stagger**: `variants` stagger container with `delayChildren` and `staggerChildren` for the headline, title, and CTAs.
- **Timeline**: Sequential dot + line-draw animations triggered by `useInView` with per-item delays.
- **Skill + security cards**: Staggered grid pop-in with `delay: index * 0.07`.
- **Hover**: `whileHover: { y: -4 }` spring on all cards; glow box-shadow transitions in CSS.
- **HeroCanvas**: React Three Fiber particle sphere with dual-axis rotation via `useFrame`.
- **Smooth scroll**: Lenis wraps the full app, skipped automatically when `prefers-reduced-motion` is set.
- **Reduced motion**: `useReducedMotion` hook reads the OS media query; passes `false` to Motion `initial` to skip all transforms.

---

## Security Strategy

Security is implemented as a default, not a feature flag. Key measures:

### HTTP Headers (`next.config.ts`)
- `Content-Security-Policy` — restricts script, style, and resource origins
- `X-Frame-Options: DENY` — blocks clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Strict-Transport-Security` — enforces HTTPS for 1 year
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disables camera, microphone, geolocation

### Contact Form (`lib/schemas.ts`)
- Zod schema validates name, email, subject, and message at type + value level
- Honeypot field (`_hp`) traps bot submissions
- Client-side validation only — backend re-validation required before any real sending
- No API keys or SMTP credentials committed anywhere (see `.env.local.example`)

### General
- No `dangerouslySetInnerHTML` anywhere — all content is typed static data
- DOMPurify imported as a dependency but only invoked if dynamic HTML rendering is ever needed
- No secrets committed — all env vars documented in `.env.local.example` only

---

## AI-Assisted Engineering

This project was itself built using AI-assisted engineering practices:

- **Architecture planning**: Claude used for section structure, component hierarchy, and security header decisions
- **Code generation**: Motion animation variants, Zod schemas, and Three.js particle logic
- **Human review checkpoint**: Every generated file was reviewed for correctness, security, and style before being committed

---

## Design System & Component Attribution

### Color Palette
| Token | Value | Role |
|---|---|---|
| `--bg-base` | `#07070f` | Page background |
| `--bg-surface` | `#0d0d1a` | Alternating sections |
| `--bg-card` | `#111122` | Card surfaces |
| `--accent-indigo` | `#6366f1` | Primary CTAs, highlights |
| `--accent-cyan` | `#22d3ee` | Secondary labels, AI section |
| `--text-primary` | `#f1f5f9` | Body text |
| `--text-secondary` | `#94a3b8` | Descriptions |
| `--text-muted` | `#4b5563` | Labels, metadata |

### Typography
- **Sans**: Geist Sans (variable, Google Fonts via `next/font`)
- **Mono**: Geist Mono (available for code-adjacent contexts)

### 21st.dev / Magic Component Inspiration
The following sections were designed with reference to 21st.dev component patterns:

| Section | Pattern Inspiration | Implementation |
|---|---|---|
| **Navbar** | `floating-nav` — transparent-to-blur on scroll | Custom implementation in `Navbar.tsx` |
| **Hero** | `hero-gradient-text` — gradient headline | Custom with R3F particle field background |
| **Skills** | `bento-grid` — feature card grid with icon + badge layout | Custom in `Skills.tsx` |
| **AI Workflow** | `spotlight-feature-card` — numbered cards with spotlight glow on hover | Custom in `AIWorkflow.tsx` |
| **Security** | `numbered-feature-grid` — icon + tag + description layout | Custom in `Security.tsx` |
| **Projects** | `project-card-hover-gradient` — gradient border reveal on hover | Custom in `ProjectCard.tsx` |

> Note: The 21st.dev MCP registry was queried during development. The registry search endpoint was not resolving in this environment, so all components are original implementations inspired by the visual patterns documented at 21st.dev.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000).

---

## Content Updates

All portfolio content lives in a single file: [`src/lib/data.ts`](src/lib/data.ts)

- Update `personal` for contact details
- Update `experience` for work history
- Update `projects` to replace TODO cards with real project data
- Update `skills` to add/remove technologies

---

## TODO

- [ ] Wire up contact form backend (Next.js Server Action + Resend or SMTP)
- [ ] Add rate-limiting middleware to contact API route (Upstash Redis)
- [ ] Replace project card TODOs with real project details in `lib/data.ts`
- [ ] Add OG image (`app/opengraph-image.tsx`)
- [ ] Configure real `metadataBase` URL in `layout.tsx`
- [ ] Add Cloudflare Turnstile or hCaptcha to contact form
