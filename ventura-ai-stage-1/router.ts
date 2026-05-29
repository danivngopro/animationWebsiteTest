// Ventura's AI router helpers
// Recommended path:
// src/lib/ventura-ai/router.ts

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

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s'.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesLoose(text: string, candidate: string) {
  const normalizedText = normalize(text);
  const normalizedCandidate = normalize(candidate);
  return normalizedText.includes(normalizedCandidate);
}

export function findFaqMatch(message: string): FaqItem | null {
  const text = normalize(message);

  for (const item of faq) {
    for (const q of item.questions) {
      const question = normalize(q);

      if (text === question) return item;
      if (text.includes(question)) return item;
      if (question.includes(text) && text.length >= 8) return item;
    }
  }

  return null;
}

export function detectIntent(message: string): IntentConfig | null {
  const text = normalize(message);

  let bestIntent: IntentConfig | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;

    for (const keyword of intent.keywords) {
      if (includesLoose(text, keyword)) {
        // Longer phrases are more meaningful than single generic words.
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

export function containsForbiddenClaim(answer: string) {
  const lower = answer.toLowerCase();
  return forbiddenClaims.some((term) => lower.includes(term.toLowerCase()));
}

export function buildOllamaPrompt(question: string, context: string) {
  return `
You are Ventura's AI, Daniel Ventura's portfolio assistant.

CRITICAL RULES:
- Answer using ONLY the provided context.
- Do not add technologies, education, companies, tools, frameworks, dates, or facts that are not explicitly written in the context.
- If the answer is not in the context, say exactly: "${VENTURA_AI_CONFIG.missingInfoAnswer}"
- Maximum answer length: ${VENTURA_AI_CONFIG.maxAnswerSentences} short sentences.
- Do not explain general technologies.
- Do not answer unrelated questions.
- Keep the answer professional and recruiter-friendly.

CONTEXT:
${context}

QUESTION:
${question}

ANSWER:
`.trim();
}