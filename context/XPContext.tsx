"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface XPContextValue {
  xp: number;
  level: number;
  progressToNextLevel: number; // 0 - 1
  xpIntoLevel: number;
  xpForNextLevel: number;
  completedMissionIds: string[];
  addXp: (amount: number, missionId?: string) => void;
  hasCompleted: (missionId: string) => boolean;
  resetProgress: () => void;
}

const XP_STORAGE_KEY = "heritage-gpt:xp";
const COMPLETED_STORAGE_KEY = "heritage-gpt:completed";

// Simple escalating XP curve: level N requires N * 100 XP more than the last.
function levelFromXp(xp: number) {
  let level = 1;
  let remaining = xp;
  let needed = 100;
  while (remaining >= needed) {
    remaining -= needed;
    level += 1;
    needed += 50;
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: needed };
}

const XPContext = createContext<XPContextValue | undefined>(undefined);

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(0);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedXp = window.localStorage.getItem(XP_STORAGE_KEY);
      const storedCompleted = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
      if (storedXp) setXp(Number(storedXp) || 0);
      if (storedCompleted) setCompletedMissionIds(JSON.parse(storedCompleted));
    } catch {
      // localStorage unavailable (e.g. private browsing) — fall back to in-memory state.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(XP_STORAGE_KEY, String(xp));
      window.localStorage.setItem(
        COMPLETED_STORAGE_KEY,
        JSON.stringify(completedMissionIds)
      );
    } catch {
      // ignore write failures
    }
  }, [xp, completedMissionIds, hydrated]);

  const addXp = useCallback((amount: number, missionId?: string) => {
    setXp((prev) => prev + amount);
    if (missionId) {
      setCompletedMissionIds((prev) =>
        prev.includes(missionId) ? prev : [...prev, missionId]
      );
    }
  }, []);

  const hasCompleted = useCallback(
    (missionId: string) => completedMissionIds.includes(missionId),
    [completedMissionIds]
  );

  const resetProgress = useCallback(() => {
    setXp(0);
    setCompletedMissionIds([]);
  }, []);

  const { level, xpIntoLevel, xpForNextLevel } = useMemo(
    () => levelFromXp(xp),
    [xp]
  );

  const value: XPContextValue = {
    xp,
    level,
    xpIntoLevel,
    xpForNextLevel,
    progressToNextLevel: xpIntoLevel / xpForNextLevel,
    completedMissionIds,
    addXp,
    hasCompleted,
    resetProgress,
  };

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
}

export function useXP() {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXP must be used within an XPProvider");
  return ctx;
}
