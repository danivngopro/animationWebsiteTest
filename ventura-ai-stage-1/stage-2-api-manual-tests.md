# Stage 2 API Manual Tests

Run while local services are active:

```powershell
ollama serve
npm run dev
```

## Monitoring dashboard architecture safety fallback

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/ventura-ai/chat" -Method POST -ContentType "application/json" -Body '{"message":"Explain Daniel monitoring dashboard architecture"}' | Format-List *
```

Expected:

- `source` may be `"llm"` or `"safety"`.
- `intent` should be `"flagshipProject"`.
- `answer` should explain the Operational Command Dashboard architecture.
- `answer` must not say `"I don't have that information in Daniel's portfolio yet."`
