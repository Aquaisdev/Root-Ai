"use client";

import { useEffect, useState } from "react";
import ComicArt from "./ComicArt";
import { ComicPanel } from "@/types";
import { isSpeechSynthesisSupported, speakText, stopSpeaking } from "@/lib/speech";
import { useLanguage } from "@/context/LanguageContext";

export default function ComicPanelViewer({ panels }: { panels: ComicPanel[] }) {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [listenNotice, setListenNotice] = useState<string | null>(null);
  const panel = panels[index];

  // Stop narration if the reader flips to a different panel.
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [index]);

  async function handleListen() {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    if (!isSpeechSynthesisSupported()) {
      setListenNotice("Narration audio isn't supported in this browser.");
      window.setTimeout(() => setListenNotice(null), 2600);
      return;
    }

    setIsSpeaking(true);
    try {
      await speakText(panel.narration, language);
    } catch {
      setListenNotice("Narration hit a snag — please try again.");
      window.setTimeout(() => setListenNotice(null), 2600);
    } finally {
      setIsSpeaking(false);
    }
  }

  return (
    <div className="glass-panel overflow-hidden rounded-3xl">
      <div key={panel.id} className="animate-[fadeIn_0.4s_ease]">
        <div className="aspect-[16/9] w-full">
          <ComicArt artKey={panel.image} />
        </div>

        <div className="space-y-3 p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-circuit-bright">
            Panel {index + 1} of {panels.length}
          </p>
          <h3 className="font-display text-xl text-sandstone sm:text-2xl">
            {panel.caption}
          </h3>
          <p className="text-sm leading-relaxed text-sandstone-dim sm:text-base">
            {panel.narration}
          </p>

          {listenNotice && (
            <p className="font-mono text-[11px] text-terracotta">
              ⚠️ {listenNotice}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleListen}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                isSpeaking
                  ? "border-circuit bg-circuit/10 text-circuit-bright"
                  : "border-gold/25 text-sandstone-dim hover:border-circuit/50 hover:text-circuit-bright"
              }`}
            >
              {isSpeaking ? "⏹️ Stop narration" : "🔊 Listen to story"}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="rounded-full border border-gold/25 px-4 py-2 text-xs font-medium text-sandstone-dim transition-colors hover:border-gold/50 hover:text-sandstone disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                onClick={() =>
                  setIndex((i) => Math.min(panels.length - 1, i + 1))
                }
                disabled={index === panels.length - 1}
                className="rounded-full bg-gradient-to-r from-gold to-terracotta px-4 py-2 text-xs font-semibold text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 border-t border-gold/10 px-6 py-3 sm:px-8">
        {panels.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to panel ${i + 1}`}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i === index ? "bg-gold" : i < index ? "bg-circuit/50" : "bg-ink-raised"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
