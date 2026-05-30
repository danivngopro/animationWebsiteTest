import { NextResponse } from "next/server";
import { z } from "zod";

import {
  VENTURA_AI_CONFIG,
  fallbackVariants,
  greetingVariants,
  type VenturaIntent,
} from "@/lib/ventura-ai/knowledge";
import {
  buildGroundedRewritePrompt,
  containsForbiddenClaim,
  routeVenturaQuestion,
} from "@/lib/ventura-ai/router";

const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
});

type ChatSource = "faq" | "llm" | "fallback" | "safety" | "error";

type ChatResponse = {
  answer: string;
  source: ChatSource;
  intent?: string;
};

const OLLAMA_TIMEOUT_MS = 15_000;
const MAX_MODEL_ANSWER_CHARACTERS = 600;
const OLLAMA_REWRITE_NUM_PREDICT = 180;
const OLLAMA_REWRITE_TEMPERATURE = 0.65;

const suspiciousModelClaims = [
  "azure functions",
  "google cloud",
  "gcp",
  "firebase",
  "supabase",
] as const;

const unsafeBotInfoClaims = [
  "always online",
  "fully private",
  "always private",
  "fully secure",
  "guaranteed secure",
  "100% private",
  "100% secure",
] as const;

const promptLeakClaims = [
  "canonical answer",
  "provided context",
  "grounded context",
  "these instructions",
  "the prompt",
] as const;

const unsupportedEducationClaims = [
  "graduated",
  "graduating",
  "completed his bachelor's",
  "completed his bachelor",
  "completed a bachelor's",
  "completed a bachelor",
  "completed an mba",
  "earned a bachelor's",
  "earned a bachelor",
  "earned an mba",
] as const;

const highPrecisionTerms = [
  "Ventura's AI",
  "Ariel University",
  "The Open University of Israel",
  "danivngopro@gmail.com",
  "https://github.com/danivngopro",
  "https://www.linkedin.com/in/daniel-v-03b663152/",
  "qwen2.5:0.5b",
  "Ollama",
  "Next.js",
] as const;

const rewriteStyleInstructions = [
  "Be warm and direct. Lead with the strongest point.",
  "Sound like someone who genuinely knows this person's work well.",
  "Open with a short confident statement, then back it up with one specific detail.",
  "Mix sentence lengths — one short, punchy sentence followed by a fuller one.",
  "Speak conversationally, like a knowledgeable colleague rather than a CV.",
  "Lead with what makes this interesting or impressive, then give the grounded detail.",
  "Use an active voice. No filler. Every word should earn its place.",
  "Be slightly enthusiastic — you know this person's work and it's worth talking about.",
  "Get to the point fast, but give it warmth.",
  "Vary your opener — don't start with 'Daniel' every time.",
] as const;

const safeIntentAnswers: Record<VenturaIntent, string> = {
  greeting:
    "Hi, I'm Ventura's AI. Ask me about Daniel's experience, projects, skills, AI workflow, or portfolio website.",
  about:
    "Daniel Ventura is a Senior Full-Stack Developer and team lead specializing in Node.js, TypeScript, React, cloud-native systems, real-time monitoring platforms, and AI-assisted engineering. He has 7+ years of experience building production systems and leading delivery for mission-critical products used by 1,000+ users.",
  experience:
    "Daniel worked as a Full-Stack Team Lead in the IDF from 2024-2026, leading a 6-developer team across feature planning, backend architecture, frontend integration, code reviews, releases, and post-deployment validation. Before that, he worked as a Full-Stack Engineer in the IDF from 2020-2024 and as a Full-Stack Developer at Dynamic Web from 2021-2022.",
  skills:
    "Daniel's core skills include Node.js, TypeScript, Express, NestJS, REST APIs, React, Next.js, Tailwind CSS, SQL/MySQL, PostgreSQL, MongoDB, Redis, RabbitMQ, Docker, Kubernetes, AWS, GitHub Actions, Nginx, Linux, Python, WebSockets, AI-assisted development, code reviews, mentoring, system design, and technical planning.",
  backend:
    "Daniel builds backend systems with Node.js, TypeScript, Express, NestJS, REST APIs, RabbitMQ, Redis, SQL/MySQL-compatible databases, MongoDB, Docker, Kubernetes, and production release workflows. His backend work covers validation, service boundaries, data flows, caching, API optimization, and real-time operational pipelines.",
  frontend:
    "Daniel builds frontend systems with React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Motion, responsive UI patterns, API integration, and real-time UI updates. His portfolio is a cinematic fullscreen snap-scroll site using Next.js, TypeScript, Tailwind, Motion, React Three Fiber, and Three.js.",
  cloud:
    "Daniel works with AWS, Docker, Kubernetes, CI/CD, GitHub Actions, Nginx, Linux, Windows environments, release management, and production deployment. He has supported containerized services, Kubernetes-based environments, Docker deployments, and Nginx reverse proxy setups.",
  aiWorkflow:
    "Daniel uses a seven-step process: understand requirements manually, break work into architecture and implementation layers, use AI for alternatives/scaffolding/debugging/test generation, review generated code manually, add validation and tests, refactor for maintainability, then deploy and verify. Tools include Claude, Claude Code, ChatGPT, Codex, GitHub Copilot, MCP servers, and a local Ollama integration. Architecture, review, and accountability remain his — AI accelerates the work.",
  flagshipProject:
    "Daniel's Operational Command Dashboard is a real-time monitoring, alerting, analytics, and AI-assisted investigation platform built in the IDF. It collects monitoring data from servers, databases, scripts, Docker services, Kubernetes services, and application components, processes it through RabbitMQ and backend services, stores it in SQL/MongoDB, applies custom alert rules, and updates the UI through WebSockets. Daniel later designed and implemented analytics dashboards, outlier detection, pattern recognition, ARIMA forecasting, and local Ollama LLM integration for error investigation.",
  education:
    "Daniel studied B.Sc. Mathematics & Computer Science with a Cybersecurity major at Ariel University from 2018-2021. He is also completing an MBA in Economics at The Open University of Israel from 2024-2026.",
  portfolioWebsite:
    "Daniel's portfolio is a cinematic fullscreen snap-scroll experience and a small production-style product. Built with Next.js 15, TypeScript 5 strict mode, Tailwind CSS v4, Motion for React, React Three Fiber, Three.js, Zod, and react-hook-form. Deployed via Docker and Nginx. Features include security headers, CSP, Zod validation, Ventura's AI (local Ollama, qwen2.5:0.5b), and a Build Log section that documents the full stack and deployment approach.",
  contact:
    "The best way to contact Daniel is by email at danivngopro@gmail.com. You can also view his GitHub at https://github.com/danivngopro or LinkedIn at https://www.linkedin.com/in/daniel-v-03b663152/.",
  venturaAI:
    "Ventura's AI is Daniel Ventura's lightweight self-hosted portfolio assistant. It uses a local Ollama model, currently configured as qwen2.5:0.5b, and runs through Daniel's Next.js portfolio backend with FAQ routing, intent detection, safety checks, and small context prompts.",
};

function jsonResponse(body: ChatResponse, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

function pickRandom<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getOllamaConfig() {
  return {
    baseUrl: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
    model: process.env.OLLAMA_MODEL ?? VENTURA_AI_CONFIG.model,
  };
}

function normalizeModelAnswer(answer: string): string {
  return answer.replace(/\s+/g, " ").trim();
}

function getRequiredTerms(canonicalAnswer: string): string[] {
  return highPrecisionTerms.filter((term) => canonicalAnswer.includes(term));
}

function missesRequiredTerms(answer: string, requiredTerms: string[]): boolean {
  return requiredTerms.some((term) => !answer.includes(term));
}

function includesUnsafeBotInfoClaim(answer: string): boolean {
  const normalizedAnswer = answer.toLowerCase();

  return unsafeBotInfoClaims.some((claim) => normalizedAnswer.includes(claim));
}

function includesAnyClaim(answer: string, claims: readonly string[]): boolean {
  const normalizedAnswer = answer.toLowerCase();

  return claims.some((claim) => normalizedAnswer.includes(claim));
}

function isUnsafeModelAnswer(
  answer: string,
  canonicalAnswer: string,
  intent?: VenturaIntent,
): boolean {
  const normalizedAnswer = answer.toLowerCase();
  const requiredTerms = getRequiredTerms(canonicalAnswer);

  return (
    answer.length > MAX_MODEL_ANSWER_CHARACTERS ||
    containsForbiddenClaim(answer) ||
    missesRequiredTerms(answer, requiredTerms) ||
    suspiciousModelClaims.some((claim) => normalizedAnswer.includes(claim)) ||
    includesAnyClaim(answer, promptLeakClaims) ||
    (intent === "education" &&
      includesAnyClaim(answer, unsupportedEducationClaims)) ||
    (intent === "venturaAI" && includesUnsafeBotInfoClaim(answer))
  );
}

function getSafeIntentAnswer(intentId: VenturaIntent): string {
  return safeIntentAnswers[intentId];
}

function pickRewriteStyleInstruction(): string {
  return pickRandom(rewriteStyleInstructions);
}

type OllamaCallOptions = {
  numPredict?: number;
  temperature?: number;
};

async function callOllama(
  prompt: string,
  options: OllamaCallOptions = {},
): Promise<string> {
  const { baseUrl, model } = getOllamaConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: {
          num_predict: options.numPredict ?? 140,
          temperature: options.temperature ?? 0.1,
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Ollama returned an unsuccessful response.");
    }

    const data: unknown = await response.json();
    const parsed = z.object({ response: z.string() }).safeParse(data);

    if (!parsed.success) {
      throw new Error("Ollama returned an invalid response shape.");
    }

    const answer = normalizeModelAnswer(parsed.data.response);

    if (!answer) {
      throw new Error("Ollama returned an empty response.");
    }

    return answer;
  } finally {
    clearTimeout(timeout);
  }
}

async function rewriteGroundedAnswer({
  message,
  canonicalAnswer,
  context,
  intent,
}: {
  message: string;
  canonicalAnswer: string;
  context?: string;
  intent?: VenturaIntent;
}): Promise<string> {
  const prompt = buildGroundedRewritePrompt({
    question: message,
    canonicalAnswer,
    context,
    intent,
    styleInstruction: pickRewriteStyleInstruction(),
  });

  return callOllama(prompt, {
    numPredict: OLLAMA_REWRITE_NUM_PREDICT,
    temperature: OLLAMA_REWRITE_TEMPERATURE,
  });
}

export async function POST(request: Request) {
  // TODO: Add rate limiting before exposing this route beyond local/demo usage.
  // TODO: Add production logging/analytics for routing outcomes and failures.
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      {
        answer: "Invalid request body.",
        source: "error",
      },
      { status: 400 },
    );
  }

  const parsedRequest = chatRequestSchema.safeParse(payload);

  if (!parsedRequest.success) {
    return jsonResponse(
      {
        answer: "Please send a message between 1 and 500 characters.",
        source: "error",
      },
      { status: 400 },
    );
  }

  const { message } = parsedRequest.data;
  const routed = routeVenturaQuestion(message);

  if (routed.type === "faq" && routed.intent === "greeting") {
    return jsonResponse({
      answer: pickRandom(greetingVariants),
      source: "faq",
      intent: "greeting",
    });
  }

  if (routed.type === "faq") {
    try {
      const answer = await rewriteGroundedAnswer({
        message,
        canonicalAnswer: routed.answer,
        intent: routed.intent,
      });

      if (isUnsafeModelAnswer(answer, routed.answer, routed.intent)) {
        return jsonResponse({
          answer: routed.answer,
          source: "safety",
          intent: routed.intent,
        });
      }

      return jsonResponse({
        answer,
        source: "llm",
        intent: routed.intent,
      });
    } catch {
      return jsonResponse({
        answer: routed.answer,
        source: "faq",
        intent: routed.intent,
      });
    }
  }

  if (routed.type === "fallback") {
    return jsonResponse({
      answer: pickRandom(fallbackVariants),
      source: "fallback",
    });
  }

  const canonicalAnswer = getSafeIntentAnswer(routed.intent.id);

  try {
    const answer = await rewriteGroundedAnswer({
      message,
      canonicalAnswer,
      context: routed.context,
      intent: routed.intent.id,
    });

    if (isUnsafeModelAnswer(answer, canonicalAnswer, routed.intent.id)) {
      return jsonResponse({
        answer: canonicalAnswer,
        source: "safety",
        intent: routed.intent.id,
      });
    }

    return jsonResponse({
      answer,
      source: "llm",
      intent: routed.intent.id,
    });
  } catch {
    return jsonResponse({
      answer: canonicalAnswer,
      source: "error",
      intent: routed.intent.id,
    });
  }
}
