"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import SuggestedPrompts from "./SuggestedPrompts";
import { ChatMessage as ChatMessageType } from "@/types";
import {
  isSpeechRecognitionSupported,
  startListening,
  ListenController,
} from "@/lib/speech";
import { useLanguage } from "@/context/LanguageContext";

const WELCOME: ChatMessageType = {
  id: "welcome",
  role: "assistant",
  content:
    "Yo, I'm ROOT AI 🪷 — your guide to India's heritage, one story at a time. Ask me about a monument, a myth, or just hit a suggested prompt below to get going.",
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChatWidget() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [micSupported, setMicSupported] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const listenControllerRef = useRef<ListenController | null>(null);

  useEffect(() => {
    setMicSupported(isSpeechRecognitionSupported());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessageType = {
      id: makeId(),
      role: "user",
      content: trimmed,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const responseText = await res.text();
      let data: { reply?: string; error?: string } = {};

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          res.ok
            ? "ROOT AI returned an invalid response. Please try again."
            : `ROOT AI is unavailable right now (request failed with ${res.status}).`
        );
      }

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: data.reply || "ROOT AI did not return a reply. Please try again.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content:
            err instanceof Error
              ? `⚠️ ${err.message}`
              : "⚠️ ROOT AI hit a snag. Try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleMicClick() {
    // Already listening — treat click as "stop and use what I said".
    if (isListening) {
      listenControllerRef.current?.stop();
      return;
    }

    if (!micSupported) {
      setMicError("Voice input isn't supported in this browser — try Chrome or Edge.");
      window.setTimeout(() => setMicError(null), 3200);
      return;
    }

    setMicError(null);
    setIsListening(true);

    listenControllerRef.current = startListening(language, {
      onInterim: (text) => setInput(text),
      onFinal: (text) => setInput(text),
      onEnd: () => {
        setIsListening(false);
        listenControllerRef.current = null;
      },
      onError: (message) => {
        setMicError(message);
        setIsListening(false);
        listenControllerRef.current = null;
        window.setTimeout(() => setMicError(null), 3200);
      },
    });
  }

  return (
    <div className="glass-panel flex h-[75vh] max-h-[820px] w-full flex-col overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-terracotta text-lg">
            🪷
          </span>
          <div>
            <p className="font-display text-sm text-sandstone">ROOT AI</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-circuit-bright">
              {isLoading ? "thinking…" : "online"}
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="glass-panel flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-gold [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-gold [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-gold" />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-gold/10 px-5 py-4">
        <SuggestedPrompts onSelect={sendMessage} disabled={isLoading} />

        {isListening && (
          <p className="font-mono text-[11px] text-circuit-bright">
            🎙️ Listening… tap the mic again to stop.
          </p>
        )}
        {micError && (
          <p className="font-mono text-[11px] text-terracotta">⚠️ {micError}</p>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMicClick}
            aria-label={isListening ? "Stop voice input" : "Voice input"}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg transition-colors ${
              isListening
                ? "animate-pulseGlow border-circuit bg-circuit/10 text-circuit-bright"
                : "border-gold/25 text-sandstone-dim hover:border-circuit/50 hover:text-circuit-bright"
            }`}
          >
            {isListening ? "⏺️" : "🎤"}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ROOT AI about a monument, myth or era…"
            className="h-11 flex-1 rounded-full border border-gold/20 bg-ink-raised px-4 text-sm text-sandstone placeholder:text-sandstone-muted focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold to-terracotta px-5 text-sm font-semibold text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
