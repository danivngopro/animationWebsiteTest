import {
  buildOllamaPrompt,
  containsForbiddenClaim,
  routeVenturaQuestion,
  type RouterResult,
} from "./router";
import { VENTURA_AI_CONFIG } from "./knowledge";

type ManualCase = {
  question: string;
  expectedType: RouterResult["type"];
  expectedId?: string;
};

const cases: ManualCase[] = [
  {
    question: "What does Daniel do?",
    expectedType: "faq",
    expectedId: "what-does-daniel-do",
  },
  {
    question: "What is Daniel's flagship project?",
    expectedType: "faq",
    expectedId: "flagship-project",
  },
  {
    question:
      "What technologies did Daniel use in the Operational Command Dashboard?",
    expectedType: "faq",
    expectedId: "operational-dashboard-tech",
  },
  {
    question: "How does Daniel use AI tools?",
    expectedType: "faq",
    expectedId: "ai-tools",
  },
  {
    question: "Can Daniel build backend systems?",
    expectedType: "faq",
    expectedId: "backend",
  },
  {
    question: "What did Daniel study?",
    expectedType: "faq",
    expectedId: "education",
  },
  {
    question: "How can I contact Daniel?",
    expectedType: "faq",
    expectedId: "contact",
  },
  {
    question: "Who is the president of the United States?",
    expectedType: "fallback",
  },
  {
    question: "Write me a recipe for pasta.",
    expectedType: "fallback",
  },
];

for (const item of cases) {
  const result = routeVenturaQuestion(item.question);
  const resultId =
    result.type === "faq"
      ? result.faq.id
      : result.type === "intent"
        ? result.intent.id
        : undefined;

  if (result.type !== item.expectedType || resultId !== item.expectedId) {
    throw new Error(
      `Unexpected route for "${item.question}". Expected ${item.expectedType}:${item.expectedId ?? ""}, got ${result.type}:${resultId ?? ""}`,
    );
  }

  if (
    result.type === "fallback" &&
    result.answer !== VENTURA_AI_CONFIG.fallbackAnswer
  ) {
    throw new Error(`Fallback answer changed for "${item.question}".`);
  }
}

if (!containsForbiddenClaim("Daniel studied at USC.")) {
  throw new Error("Expected forbidden claim detection for USC.");
}

if (containsForbiddenClaim("Daniel works with Node.js and React.")) {
  throw new Error("Unexpected forbidden claim detection for grounded answer.");
}

const prompt = buildOllamaPrompt("What does Daniel do?", "Daniel builds APIs.");

for (const required of [
  "Use only the provided context.",
  "Never invent facts.",
  "Maximum 3 short sentences.",
  VENTURA_AI_CONFIG.missingInfoAnswer,
  "Do not answer unrelated questions.",
]) {
  if (!prompt.includes(required)) {
    throw new Error(`Ollama prompt is missing: ${required}`);
  }
}

console.info("Ventura AI manual router cases passed.");
