"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Language } from "@/types";
import { translations, TranslationKey } from "@/lib/translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LANGUAGE_STORAGE_KEY = "heritage-gpt:language";

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(
        LANGUAGE_STORAGE_KEY
      ) as Language | null;
      if (stored && stored in translations) setLanguageState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
