# Ventura's AI - Claude Implementation Plan

## Goal

Add a lightweight portfolio chat widget called "Ventura's AI" to the existing Next.js portfolio.

The bot should:
- Answer questions about Daniel Ventura only.
- Use FAQ and keyword intent routing before calling the LLM.
- Use Ollama with `qwen2.5:0.5b` for short rephrased answers.
- Avoid hallucinations by sending only a small relevant context section to the model.
- Block unrelated questions before calling Ollama.
- Be safe for a public portfolio website.
- Work locally first, then be deployable to the home server.

---

## Stage 1 - Knowledge Base and Router

Create:
- `src/lib/ventura-ai/knowledge.ts`
- `src/lib/ventura-ai/router.ts`
- Optional tests for FAQ matching, intent detection, fallback, and forbidden claim detection.

Behavior:
1. Exact/similar FAQ match returns a fixed answer without calling Ollama.
2. If no FAQ matches, detect intent using keyword scoring.
3. If an intent is found, return the small context section for that intent.
4. If no intent is found, return the portfolio-only fallback.
5. Add forbidden-claim detection for common hallucinations.

Expected output:
- A clean, typed knowledge base.
- Deterministic routing behavior.
- No UI and no API yet.

---

## Stage 2 - API Route for Chat

Create a Next.js API route, for example:
- `src/app/api/ventura-ai/chat/route.ts`

Behavior:
1. Accept `{ message: string }`.
2. Validate input with Zod.
3. Run `routeVenturaQuestion(message)`.
4. If result is FAQ, return the fixed answer.
5. If result is fallback, return the fallback answer.
6. If result is intent, build the Ollama prompt using `buildOllamaPrompt`.
7. Call Ollama at `process.env.OLLAMA_BASE_URL || "http://localhost:11434"`.
8. Use model `process.env.OLLAMA_MODEL || "qwen2.5:0.5b"`.
9. Keep answer short.
10. If Ollama fails, return a safe fallback based on the selected context or say the assistant is temporarily unavailable.
11. If output includes forbidden claims, return the missing-information answer or the fixed FAQ answer.

Important:
- Do not expose system prompts to the client.
- Do not let the user provide custom system prompts.
- Add basic request length limits.
- Add TODO for rate limiting.

---

## Stage 3 - Chat UI Component

Create a compact portfolio chat widget:
- `src/components/ventura-ai/VenturaAIChat.tsx`

Behavior:
- Floating button or section card.
- Opens a small chat panel.
- Shows assistant name: "Ventura's AI".
- Shows starter questions:
  - "What does Daniel do?"
  - "What is Daniel's flagship project?"
  - "What technologies does Daniel use?"
  - "How does Daniel use AI tools?"
  - "How can I contact Daniel?"
- Sends user messages to `/api/ventura-ai/chat`.
- Handles loading, errors, and disabled state.
- Keeps answers concise.
- Matches the existing portfolio design style.
- Respect reduced motion where relevant.

---

## Stage 4 - Integrate Into Portfolio

Options:
1. Add floating chat widget globally in `layout.tsx`.
2. Add it only to the Contact section.
3. Add it to the AI Workflow section and Contact section.

Recommended:
Start with a floating button visible on all sections, but make it subtle.

---

## Stage 5 - Local Testing With Ollama

Test locally:
```bash
ollama pull qwen2.5:0.5b
ollama serve
npm run dev
```

Test questions:
- What does Daniel do?
- What is Daniel's flagship project?
- What technologies did Daniel use in the Operational Command Dashboard?
- How does Daniel use AI tools in development?
- Can Daniel build backend systems?
- What did Daniel study?
- How can I contact Daniel?
- Who is the president of the United States?
- Write me a recipe for pasta.

Expected:
- Portfolio questions get short grounded answers.
- Unrelated questions get the exact portfolio-only fallback.
- No invented education, frameworks, or tools.

---

## Stage 6 - Deployment

Add environment variables:
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

For Docker on Linux host, if the app container needs to call Ollama on the host:
```env
OLLAMA_BASE_URL=http://host.docker.internal:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

Add Docker compose `extra_hosts` if needed:
```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

Add later:
- Rate limiting.
- Basic analytics for common questions.
- Admin-editable FAQ/context.