# Ventura's AI

Ventura's AI is the lightweight local portfolio chatbot used by this site. It routes portfolio questions deterministically first, only calls Ollama for matched portfolio intents, and falls back to safe deterministic answers when Ollama is unavailable or unsafe.

## Local Development

```bash
ollama pull qwen2.5:0.5b
ollama serve
npm run dev
```

The chat UI calls:

```text
POST /api/ventura-ai/chat
```

## Environment Variables

For normal local development:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

If the Next.js app runs inside Docker and Ollama runs on the host:

```env
OLLAMA_BASE_URL=http://host.docker.internal:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

On Linux Docker Compose hosts, this may also be needed:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

## Manual API Tests

Run these while `npm run dev` is active:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"What does Daniel do?"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"Explain Daniel monitoring dashboard architecture"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"Write me a recipe for pasta"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"What did Daniel study?"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"hi"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"what is ventura ai"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"what model are you using"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"are you running on ollama"}' | Format-List *

Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"how were you built"}' | Format-List *
```

Expected:

- Portfolio questions answer correctly.
- Greeting questions return a friendly Ventura's AI greeting.
- Ventura's AI self-info questions explain the local Ollama/Next.js/router setup.
- Unrelated questions return the portfolio-only scope fallback.
- Education mentions Ariel University and The Open University of Israel only.
- No USC hallucination.

## Production Notes

- The API route does not expose prompts, full context, stack traces, or raw Ollama errors to the client.
- FAQ and fallback routes return before calling Ollama.
- Intent routes return deterministic safe answers if Ollama is unavailable, times out, or fails safety checks.
- Rate limiting is still a TODO before exposing the route broadly.
