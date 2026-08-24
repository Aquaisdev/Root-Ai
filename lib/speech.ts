"use client";

import { Language } from "@/types";

/**
 * VOICE LAYER
 * -----------
 * Speech-to-text and text-to-speech, powered by the browser's built-in Web
 * Speech API (SpeechRecognition + SpeechSynthesis). This needs no API key,
 * no server round-trip, and no extra cost — it runs entirely client-side.
 * It's well supported in Chrome, Edge, and Safari (desktop + mobile).
 *
 * Recognition/synthesis language automatically follows the app's selected
 * language (en / hi / kn) via the LanguageContext.
 */

const RECOGNITION_LANG: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

const SYNTH_LANG: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
};

// ---------------------------------------------------------------------------
// Minimal typings for the Web Speech API (not in the default TS DOM lib).
// ---------------------------------------------------------------------------

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionCtor() !== null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// ---------------------------------------------------------------------------
// Speech -> text
// ---------------------------------------------------------------------------

export interface ListenController {
  /** Manually stop listening (also happens automatically after a pause). */
  stop: () => void;
}

export interface ListenCallbacks {
  /** Fired repeatedly with the best-guess transcript while the user talks. */
  onInterim?: (text: string) => void;
  /** Fired once with the final transcript when the mic stops listening. */
  onFinal: (text: string) => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
}

/**
 * Starts live microphone transcription. Returns a controller you can call
 * .stop() on; recognition also stops itself after a pause in speech.
 */
export function startListening(
  language: Language,
  callbacks: ListenCallbacks
): ListenController {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) {
    callbacks.onError?.(
      "Voice input isn't supported in this browser — try Chrome or Edge."
    );
    return { stop: () => {} };
  }

  const recognition = new Ctor();
  recognition.lang = RECOGNITION_LANG[language] ?? "en-IN";
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let finalTranscript = "";

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;
      if (result.isFinal) {
        finalTranscript += transcript;
      } else {
        interim += transcript;
      }
    }
    if (interim) callbacks.onInterim?.(`${finalTranscript} ${interim}`.trim());
  };

  recognition.onerror = (event) => {
    // Log the raw error code for debugging — the UI message is deliberately
    // vague, but this tells you exactly which case fired.
    console.warn("[speech] recognition error:", event?.error);

    const message = (() => {
      switch (event?.error) {
        case "not-allowed":
        case "service-not-allowed":
          return "Mic access was blocked — allow microphone permissions and try again.";
        case "no-speech":
          return "Didn't catch that — try speaking again.";
        case "audio-capture":
          return "No microphone was found — check that one is connected and not in use by another app.";
        case "network":
          return "Voice input needs an internet connection to reach the speech service.";
        case "aborted":
          return "Voice input was cancelled.";
        case "language-not-supported":
          return "This language isn't supported for voice input in your browser yet.";
        default:
          return `Voice input hit a snag (${event?.error || "unknown error"}). Please try again.`;
      }
    })();
    callbacks.onError?.(message);
  };

  recognition.onend = () => {
    if (finalTranscript.trim()) callbacks.onFinal(finalTranscript.trim());
    callbacks.onEnd?.();
  };

  try {
    recognition.start();
  } catch (err) {
    console.warn("[speech] recognition.start() threw:", err);
    callbacks.onError?.("Couldn't start the microphone. Please try again.");
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch {
        // ignore — recognition may already have ended
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Text -> speech
// ---------------------------------------------------------------------------

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.startsWith(lang.split("-")[0]))
  );
}

/**
 * Speaks text aloud. Cancels any speech already in progress. Resolves when
 * speaking finishes, rejects if speech synthesis isn't supported or errors.
 */
export function speakText(
  text: string,
  language: Language = "en"
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      reject(new Error("Text-to-speech isn't supported in this browser."));
      return;
    }
    if (!text.trim()) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const lang = SYNTH_LANG[language] ?? "en-IN";
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;

    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;

    utterance.onend = () => resolve();
    utterance.onerror = () =>
      reject(new Error("Text-to-speech hit a snag."));

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeaking(): boolean {
  return isSpeechSynthesisSupported() && window.speechSynthesis.speaking;
}
