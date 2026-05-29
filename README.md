# Daniel Ventura — Portfolio

**Live:** [portfolio.emperordanivn.com](https://portfolio.emperordanivn.com)

Premium, cinematic personal portfolio for **Daniel Ventura**, Senior Full-Stack Developer. Designed to feel like a high-end interactive product experience — not a CV on a page.

---

## Concept

A fullscreen snap-scroll site where every section is its own cinematic "slide". Content is revealed dramatically as each section enters the viewport. A right-side sidebar lets you jump between sections or enable **autoplay** — which advances through slides automatically with a circular progress indicator.

Inspired by [remix.run](https://remix.run) and high-end agency landing pages: huge typography, strong motion, deliberate whitespace, and distinctive per-section visual identity.

---

## Tech Stack

| Layer           | Technology                                                 |
| --------------- | ---------------------------------------------------------- |
| Framework       | Next.js 15 App Router + `output: standalone`               |
| Language        | TypeScript 5 (strict)                                      |
| Styling         | Tailwind CSS v4 + CSS custom properties                    |
| Components      | shadcn/ui (base-nova)                                      |
| Animation       | Motion for React (whileInView, AnimatePresence, useInView) |
| 3D / WebGL      | React Three Fiber + Drei (hero particle sphere)            |
| Form validation | Zod + react-hook-form                                      |
| Icons           | lucide-react + custom brand SVG icons                      |
| Deployment      | Docker (multi-stage) + Nginx reverse proxy                 |

---

## Animation System

### Layout Architecture

- **CSS `scroll-snap-type: y mandatory`** on `<html>` — each `.slide-section` is `height: 100dvh` and `scroll-snap-align: start`
- Sections snap into place on scroll. No JS scroll-hijacking, no Lenis needed.
- `scrollIntoView({ behavior: 'smooth' })` used for programmatic navigation from the sidebar and autoplay.

### Per-section Techniques

| Section         | Animation Technique                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**        | Character-scramble glitch text via `useGlitchText` hook, split name reveal (translateX from left/right), neon border trace via Motion `scaleX`, floating scroll badge |
| **About**       | Count-up stats via `useCountUp` hook with `easeOutExpo`, word-reveal heading, pillar card scale-in stagger                                                            |
| **Experience**  | Giant job title in `7vw` font, `AnimatePresence` blur+slide transitions between jobs, animated segment selector                                                       |
| **Skills**      | Bento grid scale-in, expand/collapse per-category with `AnimatePresence`, badge scatter-in with stagger                                                               |
| **AI Workflow** | Spotlight hover glow, watermark "AI" text, staggered card reveals                                                                                                     |
| **Security**    | Hexagonal CSS grid background, animated scan line, shield entrance spring animation                                                                                   |
| **Projects**    | Project number watermark, `AnimatePresence` blur+slide between projects, dot selector                                                                                 |
| **Education**   | Oversized degree names, hover lift on cards, gradient divider                                                                                                         |
| **Contact**     | Split-screen slide-in, Zod-validated form, animated submit button                                                                                                     |

### Sidebar & Autoplay

- **`SlideSidebar`** — fixed right-side dots. Hover expands to show section labels. `IntersectionObserver` tracks active section (≥45% in view).
- **Autoplay** — RAF-based circular SVG progress ring. Advances every 5 seconds. Click to play/pause. Manual dot click resets the timer.
- **Slide counter** — `01/09` style AnimatePresence counter at the bottom of the sidebar.

### Reduced Motion

- All `useInView`/`whileInView` transitions respect the user's OS `prefers-reduced-motion` setting via the `useReducedMotion` hook.

---

## Security

All security headers are applied in **`next.config.ts`** (not `layout.tsx`):

| Header                      | Value                                                          |
| --------------------------- | -------------------------------------------------------------- |
| `Content-Security-Policy`   | `default-src 'self'`, restricts scripts, styles, fonts, frames |
| `X-Frame-Options`           | `DENY` — blocks clickjacking                                   |
| `X-Content-Type-Options`    | `nosniff`                                                      |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains`                          |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                              |
| `Permissions-Policy`        | Disables camera, mic, geolocation, topics                      |

Contact form uses a **Zod schema** (`lib/schemas.ts`) with a honeypot field (`_hp`). Client-side validation only — a server action must be added before the form sends real email (see `TODO` in Contact section and `.env.local.example`).

No `dangerouslySetInnerHTML` anywhere. No secrets committed.

---

## 21st.dev Component Attribution

The following sections were designed with direct reference to 21st.dev component patterns:

| Section                   | Pattern Inspiration                                                  | File                             |
| ------------------------- | -------------------------------------------------------------------- | -------------------------------- |
| **Sidebar**               | `vertical-slide-nav` — floating dot nav with label reveal            | `SlideSidebar.tsx`               |
| **Hero**                  | `hero-split-text` — oversized split name layout                      | `Hero.tsx`                       |
| **Skills**                | `bento-grid-expand` — expandable icon-led bento grid                 | `Skills.tsx`                     |
| **AI Workflow**           | `spotlight-feature-card` — numbered cards with radial hover glow     | `AIWorkflow.tsx`                 |
| **Security**              | `numbered-feature-grid` — icon + tag card layout                     | `Security.tsx`                   |
| **Projects / Experience** | `animate-presence-carousel` — blur-slide AnimatePresence transitions | `Projects.tsx`, `Experience.tsx` |

> The 21st.dev MCP registry was queried during development. Search resolution was unavailable in this environment; components are original implementations inspired by the visual patterns.

---

## Running Locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

### Ventura's AI

Ventura's AI uses local Ollama for matched portfolio intents and deterministic safe answers for FAQ, fallback, safety, and offline cases.

```bash
ollama pull qwen2.5:0.5b
ollama serve
npm run dev
```

Configure local defaults in `.env.local`:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

For Docker/home-server notes and manual API checks, see [`docs/ventura-ai.md`](docs/ventura-ai.md).

---

## Docker Deployment (portfolio.emperordanivn.com)

### 1. Build and run on your home server

```bash
# Clone or copy the project to your server
git clone <repo> portfolio
cd portfolio

# Build and start
docker compose up -d --build

# Check health
docker compose ps
docker compose logs -f portfolio
```

The container listens on **port 3000**.

### 2. Nginx reverse proxy

Copy `nginx.conf.example` to `/etc/nginx/sites-available/portfolio`:

```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
```

Get a free SSL certificate:

```bash
sudo certbot --nginx -d portfolio.emperordanivn.com
sudo nginx -t && sudo systemctl reload nginx
```

### 3. Environment variables

```bash
cp .env.local.example .env.local
# Fill in values (RESEND_API_KEY etc.) before deploying
```

### 4. Updates

```bash
git pull
docker compose up -d --build
# Zero-downtime: compose keeps the old container running until new one is healthy
```

---

## Content Updates

All portfolio content lives in [`src/lib/data.ts`](src/lib/data.ts) — the single source of truth.

- `personal` — name, email, LinkedIn, GitHub
- `experience` — work history with highlights and tech
- `projects` — 4 project cards (currently filled with real descriptions)
- `skills` — 6 technology categories
- `aiWorkflow` — 6 AI workflow steps
- `securityMeasures` — 9 defensive practices
- `education` — 2 degrees

---

## TODO

- [ ] Wire up contact form (Next.js Server Action + Resend / SendGrid)
- [ ] Add rate-limiting to contact API (Upstash Redis)
- [ ] Add `public/` folder with OG image and favicons
- [ ] Configure real `metadataBase` in `layout.tsx` once domain is live
- [ ] Add Cloudflare Turnstile or hCaptcha to contact form
