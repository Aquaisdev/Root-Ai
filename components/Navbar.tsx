"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import XPBadge from "./XPBadge";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const links = [
  { href: "/mission", labelKey: "navMission" as const, icon: "🎮" },
  { href: "/story", labelKey: "navStory" as const, icon: "📖" },
  { href: "/map", labelKey: "navMap" as const, icon: "🗺️" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-ink/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl transition-transform duration-300 group-hover:rotate-12">
            🪷
          </span>
          <span className="font-display text-lg tracking-wide text-sandstone">
            ROOT<span className="text-gold"> AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-sandstone-dim"
              }`}
            >
              {link.icon} {t(link.labelKey)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSelector />
          <XPBadge compact />
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 text-sandstone md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-gold/10 bg-ink px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-sandstone-dim hover:bg-ink-raised hover:text-gold"
              >
                {link.icon} {t(link.labelKey)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between">
              <LanguageSelector />
              <XPBadge compact />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
