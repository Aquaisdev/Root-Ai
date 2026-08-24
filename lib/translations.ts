import { Language } from "@/types";

// Small scaffold of UI strings. Extend this dictionary as more of the app
// gets translated — every component should pull strings from here rather
// than hardcoding English so new languages are a data change, not a code change.
export const translations = {
  en: {
    tagline: "Discover the stories that built us.",
    heroDescription:
      "ROOT AI is your AI-powered heritage guide — ask it anything about India's monuments, myths and history, then live it through missions, comics and maps.",
    ctaTalk: "Talk to ROOT AI",
    navMission: "Mission Mode",
    navStory: "Story Mode",
    navMap: "Heritage Map",
    xpLabel: "XP",
    level: "Level",
  },
  hi: {
    tagline: "उन कहानियों की खोज करें जिन्होंने हमें गढ़ा।",
    heroDescription:
      "ROOT AI आपका AI-संचालित हेरिटेज गाइड है — भारत के स्मारकों, मिथकों और इतिहास के बारे में कुछ भी पूछें, फिर मिशन, कॉमिक्स और मैप्स के ज़रिए उसे जिएं।",
    ctaTalk: "ROOT AI से बात करें",
    navMission: "मिशन मोड",
    navStory: "कहानी मोड",
    navMap: "हेरिटेज मैप",
    xpLabel: "XP",
    level: "स्तर",
  },
  kn: {
    tagline: "ನಮ್ಮನ್ನು ರೂಪಿಸಿದ ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    heroDescription:
      "ROOT AI ನಿಮ್ಮ AI-ಚಾಲಿತ ಪರಂಪರೆ ಮಾರ್ಗದರ್ಶಿ — ಭಾರತದ ಸ್ಮಾರಕಗಳು, ಪುರಾಣಗಳು ಮತ್ತು ಇತಿಹಾಸದ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ, ನಂತರ ಮಿಷನ್, ಕಾಮಿಕ್ಸ್ ಮತ್ತು ನಕ್ಷೆಗಳ ಮೂಲಕ ಅದನ್ನು ಅನುಭವಿಸಿ.",
    ctaTalk: "ROOT AI ಜೊತೆ ಮಾತನಾಡಿ",
    navMission: "ಮಿಷನ್ ಮೋಡ್",
    navStory: "ಕಥೆ ಮೋಡ್",
    navMap: "ಪರಂಪರೆ ನಕ್ಷೆ",
    xpLabel: "XP",
    level: "ಹಂತ",
  },
} satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof typeof translations.en;

export const languageLabels: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  kn: "ಕನ್ನಡ",
};
