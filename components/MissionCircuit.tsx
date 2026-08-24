"use client";

import { useState } from "react";
import { MissionQuestion } from "@/types";

interface MissionCircuitProps {
  question: MissionQuestion;
  completed: boolean;
  onCorrect: () => void;
}

export default function MissionCircuit({
  question,
  completed,
  onCorrect,
}: MissionCircuitProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">(
    completed ? "correct" : "idle"
  );

  function handleSelect(index: number) {
    if (status === "correct") return;
    setSelected(index);
    if (index === question.correctIndex) {
      setStatus("correct");
      onCorrect();
    } else {
      setStatus("wrong");
    }
  }

  return (
    <div className="glass-panel animate-[fadeIn_0.3s_ease] rounded-2xl p-6 sm:p-8">
      {question.flavor && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-circuit-bright">
          {question.flavor}
        </p>
      )}
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 font-mono text-sm text-gold">
          {String(question.circuit).padStart(2, "0")}
        </span>
        <h2 className="font-display text-lg text-sandstone sm:text-xl">
          {question.prompt}
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrectOption = index === question.correctIndex;
          const revealCorrect = status !== "idle" && isCorrectOption;
          const revealWrong = status === "wrong" && isSelected && !isCorrectOption;

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={status === "correct"}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                revealCorrect
                  ? "border-circuit bg-circuit/10 text-circuit-bright shadow-glow-circuit"
                  : revealWrong
                  ? "border-terracotta bg-terracotta/10 text-terracotta"
                  : "border-gold/15 bg-ink-raised text-sandstone-dim hover:border-gold/40 hover:text-sandstone"
              } ${status === "correct" ? "cursor-default" : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-5 min-h-[1.5rem] text-sm">
        {status === "correct" && (
          <p className="font-medium text-circuit-bright">
            ✅ Node unlocked. +{question.xp} XP
          </p>
        )}
        {status === "wrong" && (
          <p className="font-medium text-terracotta">
            ✕ Access denied — try another option.
          </p>
        )}
      </div>
    </div>
  );
}
