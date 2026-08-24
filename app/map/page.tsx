"use client";

import dynamic from "next/dynamic";
import BackgroundPattern from "@/components/BackgroundPattern";
import "leaflet/dist/leaflet.css";

const HeritageMap = dynamic(() => import("@/components/HeritageMap"), {
  ssr: false,
  loading: () => (
    <div className="glass-panel flex h-[480px] items-center justify-center rounded-2xl text-sm text-sandstone-muted sm:h-[560px]">
      Loading map…
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="relative min-h-screen px-4 py-14 sm:px-6">
      <BackgroundPattern className="opacity-20" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-circuit-bright">
          Heritage Map
        </p>
        <h1 className="mt-2 font-display text-3xl text-sandstone sm:text-4xl">
          Heritage <span className="text-gradient-gold">Hunt</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-sandstone-dim">
          Read the clue, click your best guess on the map, and see how close
          you got. Land within range to claim the site and its XP.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-5xl">
        <HeritageMap />
      </div>
    </div>
  );
}
