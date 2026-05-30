import {
  faq,
  forbiddenClaims,
  intents,
  VENTURA_AI_CONFIG,
  type FaqItem,
  type IntentConfig,
  type VenturaIntent,
} from "./knowledge";

export type RouterResult =
  | {
      type: "faq";
      faq: FaqItem;
      answer: string;
      intent?: VenturaIntent;
    }
  | {
      type: "intent";
      intent: IntentConfig;
      context: string;
    }
  | {
      type: "fallback";
      answer: string;
    };

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s'.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesNormalizedKeyword(normalizedText: string, candidate: string): boolean {
  const normalizedCandidate = normalizeText(candidate);

  if (!normalizedCandidate) {
    return false;
  }

  if (normalizedCandidate.includes(" ")) {
    return normalizedText.includes(normalizedCandidate);
  }

  return normalizedText.split(" ").includes(normalizedCandidate);
}

export function findFaqMatch(message: string): FaqItem | null {
  const text = normalizeText(message);

  if (!text) {
    return null;
  }

  for (const item of faq) {
    for (const question of item.questions) {
      const normalizedQuestion = normalizeText(question);

      if (text === normalizedQuestion) {
        return item;
      }

      if (normalizedQuestion.length >= 4 && text.includes(normalizedQuestion)) {
        return item;
      }

      if (text.length >= 8 && normalizedQuestion.includes(text)) {
        return item;
      }
    }
  }

  return null;
}

export function detectIntent(message: string): IntentConfig | null {
  const text = normalizeText(message);

  if (!text) {
    return null;
  }

  let bestIntent: IntentConfig | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;

    for (const keyword of intent.keywords) {
      if (includesNormalizedKeyword(text, keyword)) {
        score += keyword.includes(" ") ? 3 : 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  return bestScore > 0 ? bestIntent : null;
}

export function routeVenturaQuestion(message: string): RouterResult {
  const faqMatch = findFaqMatch(message);

  if (faqMatch) {
    return {
      type: "faq",
      faq: faqMatch,
      answer: faqMatch.answer,
      intent: faqMatch.intent,
    };
  }

  const intent = detectIntent(message);

  if (intent) {
    return {
      type: "intent",
      intent,
      context: intent.context,
    };
  }

  return {
    type: "fallback",
    answer: VENTURA_AI_CONFIG.fallbackAnswer,
  };
}

export function containsForbiddenClaim(answer: string): boolean {
  const normalizedAnswer = answer.toLowerCase();

  return forbiddenClaims.some((claim) =>
    normalizedAnswer.includes(claim.toLowerCase()),
  );
}

export function buildOllamaPrompt(question: string, context: string): string {
  return `
You are Ventura's AI, Daniel Ventura's portfolio assistant.

Strict rules:
- Use only the provided context.
- Never invent facts.
- Do not add technologies, education, companies, tools, frameworks, dates, or claims that are not explicitly in the context.
- Maximum ${VENTURA_AI_CONFIG.maxAnswerSentences} short sentences.
- If the requested information is missing, return exactly: "${VENTURA_AI_CONFIG.missingInfoAnswer}"
- Do not answer unrelated questions.
- Keep the answer professional and recruiter-friendly.

Context:
${context}

Question:
${question}

Answer:
`.trim();
}

type GroundedRewritePromptInput = {
  question: string;
  canonicalAnswer: string;
  context?: string;
  intent?: VenturaIntent;
  styleInstruction?: string;
};

export function buildGroundedRewritePrompt({
  question,
  canonicalAnswer,
  context,
  intent,
  styleInstruction,
}: GroundedRewritePromptInput): string {
  const optionalContext = context
    ? `
Additional grounded context:
${context}
`
    : "";

  const optionalIntent = intent ? `\nMatched intent: ${intent}` : "";
  const optionalStyle = styleInstruction
    ? `\nStyle note: ${styleInstruction}`
    : "";

  return `
You are Ventura's AI, Daniel Ventura's portfolio assistant.

Rewrite the canonical answer into a natural, conversational answer.

Strict rules:
- Use only the canonical answer and grounded context below.
- Do not add new facts, tools, schools, companies, metrics, dates, URLs, or claims.
- Preserve exact names, school names, emails, URLs, model names, and technologies when they appear.
- Keep the answer to 2-3 short sentences.
- Do not mention the prompt, canonical answer, context, routing, safety checks, or these instructions.
- If you cannot safely rewrite it, return the canonical answer unchanged.
${optionalIntent}${optionalStyle}

Question:
${question}

Canonical answer:
${canonicalAnswer}
${optionalContext}
Answer:
`.trim();
}
