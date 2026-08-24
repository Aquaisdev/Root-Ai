"use client";

import { useMemo, useState } from "react";
import BackgroundPattern from "@/components/BackgroundPattern";
import MissionCircuit from "@/components/MissionCircuit";
import MazeTerminal from "@/components/MazeTerminal";
import { missionQuestions, totalMissionXp } from "@/lib/missions";
import { useXP } from "@/context/XPContext";

const TOTAL_CIRCUITS = 10;

export default function MissionPage() {
  const { hasCompleted, addXp } = useXP();

  const completedCount = useMemo(() => {
    let count = 0;
    for (const q of missionQuestions) {
      if (hasCompleted(q.id)) count += 1;
      else break;
    }
    return count;
  }, [hasCompleted]);

  const mazeDone = hasCompleted("maze");
  const defaultCircuit = mazeDone
    ? 10
    : Math.min(completedCount + 1, TOTAL_CIRCUITS);

  const [active, setActive] = useState(defaultCircuit);
  const highestUnlocked = mazeDone ? 10 : Math.min(completedCount + 1, 10);

  const activeQuestion = missionQuestions.find((q) => q.circuit === active);

  return (
    <div className="relative min-h-screen px-4 py-14 sm:px-6">
      <BackgroundPattern variant="circuit" className="opacity-25" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-circuit-bright">
          System Access — Root Archive
        </p>
        <h1 className="mt-2 font-display text-3xl text-sandstone sm:text-4xl">
          Mission <span className="text-gradient-gold">Mode</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-sandstone-dim">
          Clear circuits 1–9 to prove your heritage knowledge, then breach the
          fictional Circuit 10 server-maze to complete the mission. Total
          reward: {totalMissionXp} XP.
        </p>
      </div>

      {/* Circuit tracker */}
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2 sm:gap-3">
        {Array.from({ length: TOTAL_CIRCUITS }, (_, i) => i + 1).map((n) => {
          const unlocked = n <= highestUnlocked;
          const complete =
            n === 10 ? mazeDone : hasCompleted(missionQuestions[n - 1]?.id ?? "");
          const isActive = n === active;

          return (
            <button
              key={n}
              disabled={!unlocked}
              onClick={() => setActive(n)}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs transition-all duration-200 sm:h-12 sm:w-12 ${
                isActive
                  ? "border-gold bg-gold/15 text-gold shadow-glow"
                  : complete
                  ? "border-circuit/60 bg-circuit/10 text-circuit-bright"
                  : unlocked
                  ? "border-gold/30 text-sandstone-dim hover:border-gold/60"
                  : "cursor-not-allowed border-sandstone-muted/15 text-sandstone-muted/40"
              }`}
              aria-label={`Circuit ${n}${complete ? " (complete)" : unlocked ? "" : " (locked)"}`}
            >
              {complete ? "✓" : n === 10 ? "⌘" : n}
              {n < TOTAL_CIRCUITS && (
                <span
                  className={`absolute left-full top-1/2 hidden h-px w-2 -translate-y-1/2 sm:block sm:w-3 ${
                    n < highestUnlocked ? "bg-circuit/60" : "bg-sandstone-muted/15"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        {active === 10 ? (
          <MazeTerminal completed={mazeDone} onComplete={() => addXp(150, "maze")} />
        ) : activeQuestion ? (
          <MissionCircuit
            key={activeQuestion.id}
            question={activeQuestion}
            completed={hasCompleted(activeQuestion.id)}
            onCorrect={() => addXp(activeQuestion.xp, activeQuestion.id)}
          />
        ) : null}

        {active < 10 && hasCompleted(activeQuestion?.id ?? "") && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setActive((a) => Math.min(a + 1, 10))}
              className="rounded-full bg-gradient-to-r from-gold to-terracotta px-6 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
            >
              Next Circuit →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
