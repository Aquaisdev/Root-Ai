"use client";

import { useState } from "react";
import { mazeSteps } from "@/lib/missions";

interface MazeTerminalProps {
  completed: boolean;
  onComplete: () => void;
}

export default function MazeTerminal({ completed, onComplete }: MazeTerminalProps) {
  const [stepIndex, setStepIndex] = useState(completed ? mazeSteps.length : 0);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const finished = stepIndex >= mazeSteps.length;
  const step = mazeSteps[stepIndex];

  function submit() {
    if (!step) return;
    const normalized = input.trim().toLowerCase();
    if (normalized === step.answer) {
      const next = stepIndex + 1;
      setStepIndex(next);
      setInput("");
      setShowHint(false);
      if (next >= mazeSteps.length) onComplete();
    } else {
      setShake(true);
      window.setTimeout(() => setShake(false), 400);
    }
  }

  return (
    <div className="glass-panel overflow-hidden rounded-2xl border-circuit/20">
      <div className="flex items-center gap-2 border-b border-circuit/20 bg-ink-raised/60 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-circuit" />
        <span className="ml-2 font-mono text-xs text-sandstone-muted">
          root@archive:~/circuit-10/deep-vault
        </span>
      </div>

      <div className="p-6 font-mono text-sm sm:p-8">
        {finished ? (
          <div className="space-y-2 text-circuit-bright">
            <p>&gt; All nodes decrypted.</p>
            <p>&gt; ROOT ARCHIVE fully synchronized.</p>
            <p className="mt-3 text-gold">✦ Mission complete. +150 XP</p>
          </div>
        ) : (
          <>
            <pre className="whitespace-pre-wrap text-sandstone-dim">
{step.terminalText}
            </pre>
            <div
              className={`mt-4 flex items-center gap-2 ${
                shake ? "animate-[shakeX_0.4s_ease]" : ""
              }`}
            >
              <span className="text-circuit-bright">&gt;</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="type your answer…"
                className="flex-1 bg-transparent text-sandstone placeholder:text-sandstone-muted focus-visible:outline-none"
              />
              <button
                onClick={submit}
                className="rounded-md border border-circuit/40 px-3 py-1 text-xs text-circuit-bright hover:bg-circuit/10"
              >
                enter
              </button>
            </div>
            <button
              onClick={() => setShowHint((s) => !s)}
              className="mt-3 text-xs text-sandstone-muted underline decoration-dotted hover:text-gold"
            >
              {showHint ? step.hint : "need a hint?"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
