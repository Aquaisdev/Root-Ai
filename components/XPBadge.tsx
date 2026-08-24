"use client";

import { useXP } from "@/context/XPContext";
import { useLanguage } from "@/context/LanguageContext";

export default function XPBadge({ compact = false }: { compact?: boolean }) {
  const { xp, level, progressToNextLevel } = useXP();
  const { t } = useLanguage();

  return (
    <div
      className={`glass-panel flex items-center gap-3 rounded-full px-4 py-2 ${
        compact ? "text-xs" : "text-sm"
      }`}
      title={`${t("level")} ${level}`}
    >
      <span className="font-mono tracking-wide text-circuit-bright">
        {t("xpLabel")}: {xp}
      </span>
      <span className="hidden h-4 w-px bg-gold/30 sm:block" />
      <div className="hidden items-center gap-2 sm:flex">
        <span className="font-mono text-sandstone-dim">
          {t("level")} {level}
        </span>
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-raised">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-circuit transition-all duration-500"
            style={{ width: `${Math.min(progressToNextLevel * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
