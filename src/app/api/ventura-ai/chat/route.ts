import { NextResponse } from "next/server";
import { z } from "zod";

import {
  VENTURA_AI_CONFIG,
  type VenturaIntent,
} from "@/lib/ventura-ai/knowledge";
import {
  buildOllamaPrompt,
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

const suspiciousModelClaims = [
  "azure functions",
  "google cloud",
  "gcp",
  "firebase",
  "supabase",
] as const;

const safeIntentAnswers: Record<VenturaIntent, string> = {
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
    "Daniel uses AI tools as part of a controlled engineering workflow, including Claude Agent, Claude Code, ChatGPT, OpenAI Codex, GitHub Copilot, MCP servers, developer plugins, and local Ollama models. He uses them for planning, implementation, debugging, refactoring, reviews, tests, and UI checks, then reviews and validates AI-assisted work before production use.",
  flagshipProject:
    "Daniel's Operational Command Dashboard is a real-time monitoring, alerting, analytics, and AI-assisted investigation platform built in the IDF. It collects monitoring data from servers, databases, scripts, Docker services, Kubernetes services, and application components, processes it through RabbitMQ and backend services, stores it in SQL/MongoDB, applies custom alert rules, and updates the UI through WebSockets. Daniel later designed and implemented analytics dashboards, outlier detection, pattern recognition, ARIMA forecasting, and local Ollama LLM integration for error investigation.",
  education:
    "Daniel studied B.Sc. Mathematics & Computer Science with a Cybersecurity major at Ariel University from 2018-2021. He is also completing an MBA in Economics at The Open University of Israel from 2024-2026.",
  portfolioWebsite:
    "Daniel's portfolio is a cinematic fullscreen snap-scroll experience built with Next.js 15 App Router, TypeScript 5 strict mode, Tailwind CSS v4, shadcn/ui, Motion for React, React Three Fiber, Drei, Three.js, Zod, react-hook-form, Docker, and Nginx reverse proxy. It includes security headers, CSP, validation, anti-spam concepts, and AI-aware security practices.",
  contact:
    "The best way to contact Daniel is by email at danivngopro@gmail.com. You can also view his GitHub at https://github.com/danivngopro or LinkedIn at https://www.linkedin.com/in/daniel-v-03b663152/.",
};

function jsonResponse(body: ChatResponse, init?: ResponseInit) {
  return NextResponse.json(body, init);
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

function isUnsafeModelAnswer(answer: string): boolean {
  const normalizedAnswer = answer.toLowerCase();

  return (
    answer.length > MAX_MODEL_ANSWER_CHARACTERS ||
    containsForbiddenClaim(answer) ||
    suspiciousModelClaims.some((claim) => normalizedAnswer.includes(claim))
  );
}

function getSafeIntentAnswer(intentId: VenturaIntent): string {
  return safeIntentAnswers[intentId];
}

async function callOllama(prompt: string): Promise<string> {
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
          num_predict: 140,
          temperature: 0.1,
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

  if (routed.type === "faq") {
    return jsonResponse({
      answer: routed.answer,
      source: "faq",
      intent: routed.intent,
    });
  }

  if (routed.type === "fallback") {
    return jsonResponse({
      answer: routed.answer,
      source: "fallback",
    });
  }

  const prompt = buildOllamaPrompt(message, routed.context);

  try {
    const answer = await callOllama(prompt);

    if (isUnsafeModelAnswer(answer)) {
      return jsonResponse({
        answer: getSafeIntentAnswer(routed.intent.id),
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
      answer: getSafeIntentAnswer(routed.intent.id),
      source: "error",
      intent: routed.intent.id,
    });
  }
}
