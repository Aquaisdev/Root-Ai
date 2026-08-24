"use client";

import { useState } from "react";
import { ChatMessage as ChatMessageType } from "@/types";
import {
  isSpeechSynthesisSupported,
  speakText,
  stopSpeaking,
} from "@/lib/speech";
import { useLanguage } from "@/context/LanguageContext";

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(false);

  async function handleSpeak() {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    if (!isSpeechSynthesisSupported()) {
      setSpeechError(true);
      window.setTimeout(() => setSpeechError(false), 2600);
      return;
    }

    setIsSpeaking(true);
    try {
      await speakText(message.content, language);
    } catch {
      setSpeechError(true);
      window.setTimeout(() => setSpeechError(false), 2600);
    } finally {
      setIsSpeaking(false);
    }
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-gold-deep to-terracotta-deep text-sandstone"
            : "glass-panel rounded-bl-sm text-sandstone"
        }`}
      >
        {!isUser && (
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-circuit-bright">
              ROOT AI
            </span>
            <button
              type="button"
              onClick={handleSpeak}
              aria-label={isSpeaking ? "Stop reading aloud" : "Read message aloud"}
              className={`shrink-0 rounded-full px-1.5 text-xs transition-colors ${
                isSpeaking
                  ? "text-circuit-bright"
                  : "text-sandstone-muted hover:text-circuit-bright"
              }`}
            >
              {isSpeaking ? "⏹️" : "🔊"}
            </button>
          </div>
        )}
        {message.content}
        {speechError && (
          <p className="mt-1 font-mono text-[10px] text-terracotta">
            Voice playback isn&apos;t supported in this browser.
          </p>
        )}
      </div>
    </div>
  );
}
