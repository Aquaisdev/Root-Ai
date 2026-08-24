"use client";

import Link from "next/link";
import BackgroundPattern from "@/components/BackgroundPattern";
import XPBadge from "@/components/XPBadge";
import { useLanguage } from "@/context/LanguageContext";

const experiences = [
  {
    href: "/mission",
    icon: "🎮",
    title: "Mission Mode",
    description:
      "Ten circuits of heritage puzzles guarding a fictional deep archive. Answer, decode, earn XP.",
    accent: "from-gold/20 to-transparent",
  },
  {
    href: "/story",
    icon: "📖",
    title: "Story / Comic Mode",
    description:
      "Live Hampi's rise and fall through animated comic panels — narrated, Gen-Z, still accurate.",
    accent: "from-terracotta/25 to-transparent",
  },
  {
    href: "/map",
    icon: "🗺️",
    title: "Heritage Map",
    description:
      "Play Heritage Hunt — track down real monuments on an interactive map and claim the XP.",
    accent: "from-circuit/20 to-transparent",
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      <section className="relative isolate flex min-h-[92vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <BackgroundPattern className="opacity-60" />
        <div className="absolute inset-0 -z-10 bg-radial-glow" />

        <div className="mb-6 animate-float">
          <XPBadge />
        </div>

        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-circuit-bright">
          Heritage GPT · PS6 Interactive Guide
        </p>

        <h1 className="font-display text-5xl font-semibold leading-tight text-sandstone sm:text-7xl">
          ROOT <span className="text-gradient-gold">AI</span>
        </h1>

        <p className="mt-5 max-w-xl font-display text-lg text-gold-bright/90 sm:text-xl">
          {t("tagline")}
        </p>

        <p className="mt-6 max-w-2xl text-balance text-sm leading-relaxed text-sandstone-dim sm:text-base">
          {t("heroDescription")}
        </p>

        <Link
          href="/chat"
          className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/40 bg-gradient-to-r from-gold-deep/40 to-terracotta/30 px-8 py-3.5 font-semibold text-sandstone shadow-glow transition-transform duration-300 hover:scale-105"
        >
          <span className="relative z-10">💬 {t("ctaTalk")}</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

        <div className="mt-24 grid w-full max-w-5xl gap-5 sm:grid-cols-3">
          {experiences.map((exp) => (
            <Link
              key={exp.href}
              href={exp.href}
              className="group glass-panel relative flex flex-col items-start gap-3 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-glow"
            >
              <div
                className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${exp.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <span className="text-3xl">{exp.icon}</span>
              <h3 className="font-display text-xl text-sandstone">
                {exp.title}
              </h3>
              <p className="text-sm leading-relaxed text-sandstone-dim">
                {exp.description}
              </p>
              <span className="mt-auto pt-2 text-sm font-medium text-gold transition-transform duration-300 group-hover:translate-x-1">
                Enter →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
