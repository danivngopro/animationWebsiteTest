---
name: portfolio-setup
description: Daniel Ventura portfolio project — built from scratch, build and lint passing
metadata:
  type: project
---

Full portfolio site built in `d:\Program Files\Typescript\animation-website-test`.

**Why:** Personal portfolio for Daniel Ventura showcasing AI-native senior full-stack engineering.

**Stack:** Next.js 15, TypeScript 5, Tailwind CSS v4, shadcn/ui (base-nova), Motion for React, Lenis, React Three Fiber.

**Key gotchas to remember:**
- `lucide-react@1.x` removed `Github` and `Linkedin` icons → use `BrandIcons.tsx` custom SVGs at `src/components/ui/BrandIcons.tsx`
- TypeScript 6 breaks CSS side-effect imports → keep TypeScript on `^5.x`
- Motion `ease` array must be typed as `[number, number, number, number]`, not `number[]`
- Lucide icon component props need explicit `React.FC<{className?: string; style?: CSSProperties}>` casting in iconMaps
- ESLint: `next lint` deprecated in Next.js 15 → use `eslint src --ext .ts,.tsx` with `typescript-eslint` flat config
- 21st.dev MCP registry (`https://21st.dev/r/{name}`) did not resolve search in this environment — components inspired by patterns but custom-built

**How to apply:** When resuming work on this project, don't reinstall TypeScript 6 or add Github/Linkedin from lucide-react.
