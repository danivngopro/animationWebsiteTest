"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ChatSource = "faq" | "llm" | "fallback" | "safety" | "error";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: ChatSource;
  intent?: string;
};

type ChatApiResponse = {
  answer: string;
  source: ChatSource;
  intent?: string;
};

const STARTER_QUESTIONS = [
  "What does Daniel do?",
  "What is Ventura's AI?",
  "What is Daniel's flagship project?",
  "What technologies does Daniel use?",
  "How does Daniel use AI tools?",
] as const;

const INITIAL_MESSAGE: ChatMessage = {
  id: "initial-assistant-message",
  role: "assistant",
  content:
    "Hi, I'm Ventura's AI. Ask me about Daniel's experience, projects, skills, or AI workflow.",
};

const ERROR_MESSAGE = "Ventura's AI is temporarily unavailable. Please try again.";
const MAX_MESSAGE_LENGTH = 500;

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function sourceLabel(source?: ChatSource) {
  if (!source) {
    return null;
  }

  const labels: Record<ChatSource, string> = {
    faq: "Portfolio",
    llm: "AI",
    fallback: "Scope",
    safety: "Verified",
    error: "Offline",
  };

  return labels[source];
}

export function VenturaAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmedInput = input.trim();
  const canSend = trimmedInput.length > 0 && !isLoading;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120);

    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  async function sendMessage(messageText: string) {
    const message = messageText.trim().slice(0, MAX_MESSAGE_LENGTH);

    if (!message || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ventura-ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed.");
      }

      const data = (await response.json()) as ChatApiResponse;

      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content: data.answer || ERROR_MESSAGE,
          source: data.source,
          intent: data.intent,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content: ERROR_MESSAGE,
          source: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(trimmedInput);
  }

  return (
    <section
      aria-label="Ventura's AI chat"
      className="fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      {isOpen ? (
      <div
        id="ventura-ai-chat-panel"
        className="flex h-[min(600px,calc(100dvh-6.5rem))] w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#080814]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-xl transition-all duration-200"
      >
        <div className="shrink-0 border-b border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.18)]">
                <Bot className="size-4" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-100">Ventura&apos;s AI</h2>
                <p className="mt-1 max-w-[280px] text-xs leading-5 text-slate-400">
                  Ask about Daniel&apos;s experience, projects, skills, or AI workflow.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              aria-label="Close Ventura's AI chat"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-white/10 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {STARTER_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void sendMessage(question)}
                  disabled={isLoading}
                  aria-label={`Ask Ventura's AI: ${question}`}
                  className="shrink-0 rounded-full border border-indigo-300/20 bg-indigo-300/10 px-3 py-1.5 text-xs text-indigo-100 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-label="Ventura's AI conversation">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const label = sourceLabel(message.source);

              return (
                <article
                  key={message.id}
                  className={cn("flex", isUser ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 shadow-lg",
                      isUser
                        ? "rounded-br-md bg-cyan-300 text-slate-950 shadow-cyan-950/20"
                        : "rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-100 shadow-black/20",
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    {!isUser && label ? (
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">
                        <span>{label}</span>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-sm text-slate-300" role="status">
                  <Loader2 className="size-4 animate-spin text-cyan-200" aria-hidden="true" />
                  <span>Thinking...</span>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="shrink-0 border-t border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 focus-within:border-cyan-300/45 focus-within:ring-2 focus-within:ring-cyan-300/20">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Ask about Daniel..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                aria-label="Message for Ventura's AI"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!canSend}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                aria-label="Send message to Ventura's AI"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2 flex justify-end text-[10px] tabular-nums text-slate-600">
              {input.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </form>
        </div>
      </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group flex h-12 items-center gap-3 rounded-2xl border border-cyan-300/25 bg-[#0b1020]/90 px-4 text-sm font-medium text-slate-100 shadow-[0_16px_50px_rgba(0,0,0,0.45),0_0_26px_rgba(34,211,238,0.16)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-[#10172a]/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        aria-label={isOpen ? "Minimize Ventura's AI chat" : "Open Ventura's AI chat"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "ventura-ai-chat-panel" : undefined}
      >
        <span className="flex size-8 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-200 transition group-hover:bg-cyan-300/18">
          {isOpen ? (
            <X className="size-4" aria-hidden="true" />
          ) : (
            <MessageCircle className="size-4" aria-hidden="true" />
          )}
        </span>
        <span className="hidden sm:inline">Ventura&apos;s AI</span>
      </button>
    </section>
  );
}
