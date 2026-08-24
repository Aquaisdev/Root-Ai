"use client";

import { useLanguage } from "@/context/LanguageContext";
import { languageLabels } from "@/lib/translations";
import { Language } from "@/types";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Choose language</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="cursor-pointer appearance-none rounded-full border border-gold/25 bg-ink-raised px-3 py-1.5 pr-7 text-xs font-medium text-sandstone-dim transition-colors hover:border-gold/50 hover:text-sandstone focus-visible:outline-none"
      >
        {(Object.keys(languageLabels) as Language[]).map((code) => (
          <option key={code} value={code} className="bg-ink-raised">
            {languageLabels[code]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-2 h-3 w-3 text-gold"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
