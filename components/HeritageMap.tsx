"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { HeritageSite } from "@/types";
import { heritageSites, haversineDistanceKm } from "@/lib/heritageSites";
import { useXP } from "@/context/XPContext";

const SUCCESS_RADIUS_KM = 120;

function guessIcon(state: "idle" | "correct" | "wrong") {
  const color = state === "correct" ? "#4FD1C5" : state === "wrong" ? "#B5502F" : "#D4A24C";
  return L.divIcon({
    className: "",
    html: `<div style="width:18px;height:18px;border-radius:9999px;background:${color};border:2px solid #F3E9DA;box-shadow:0 0 12px ${color};"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function siteIcon(discovered: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="font-size:20px; filter:drop-shadow(0 0 6px rgba(212,162,76,0.6));">${
      discovered ? "🏛️" : "❔"
    }</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 20],
  });
}

function ClickCapture({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => onClick(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

export default function HeritageMap() {
  const { addXp, hasCompleted } = useXP();
  const [targetIndex, setTargetIndex] = useState(() =>
    heritageSites.findIndex((s) => !hasCompleted(s.id)) ?? 0
  );
  const [guess, setGuess] = useState<{ lat: number; lng: number } | null>(null);
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  const target: HeritageSite | undefined = heritageSites[targetIndex];
  const allDone = targetIndex === -1 || targetIndex >= heritageSites.length;

  const center = useMemo<[number, number]>(() => [22.5, 79], []);

  function handleMapClick(lat: number, lng: number) {
    if (!target || hasCompleted(target.id)) return;
    setGuess({ lat, lng });
    const dist = haversineDistanceKm(lat, lng, target.lat, target.lng);
    setDistanceKm(dist);

    if (dist <= SUCCESS_RADIUS_KM) {
      setResult("correct");
      addXp(target.xp, target.id);
    } else {
      setResult("wrong");
    }
  }

  function nextSite() {
    const nextIdx = heritageSites.findIndex(
      (s, i) => i > targetIndex && !hasCompleted(s.id)
    );
    setTargetIndex(nextIdx === -1 ? heritageSites.length : nextIdx);
    setGuess(null);
    setResult("idle");
    setDistanceKm(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="glass-panel h-[480px] overflow-hidden rounded-2xl sm:h-[560px]">
        <MapContainer
          center={center}
          zoom={5}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickCapture onClick={handleMapClick} />

          {heritageSites.map((site) => {
            const discovered = hasCompleted(site.id);
            if (!discovered) return null;
            return (
              <Marker
                key={site.id}
                position={[site.lat, site.lng]}
                icon={siteIcon(true)}
              />
            );
          })}

          {guess && <Marker position={[guess.lat, guess.lng]} icon={guessIcon(result)} />}
        </MapContainer>
      </div>

      <div className="glass-panel flex flex-col gap-4 rounded-2xl p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-circuit-bright">
            Heritage Hunt
          </p>
          <h3 className="mt-1 font-display text-lg text-sandstone">
            {allDone ? "All sites discovered!" : "Find this place"}
          </h3>
        </div>

        {allDone ? (
          <p className="text-sm text-sandstone-dim">
            You&apos;ve located every heritage site on the map. Nice work,
            explorer — more sites can be added to lib/heritageSites.ts
            anytime.
          </p>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-sandstone-dim">
              {target?.hint}
            </p>
            <p className="text-xs text-sandstone-muted">
              Click anywhere on the map to drop your guess pin.
            </p>

            {distanceKm !== null && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  result === "correct"
                    ? "border-circuit/50 bg-circuit/10 text-circuit-bright"
                    : "border-terracotta/50 bg-terracotta/10 text-terracotta"
                }`}
              >
                {result === "correct" ? (
                  <>
                    ✅ Found it! You were {distanceKm.toFixed(0)} km off. +
                    {target?.xp} XP
                  </>
                ) : (
                  <>📍 {distanceKm.toFixed(0)} km away — try again, or use the hint.</>
                )}
              </div>
            )}

            {result === "correct" && (
              <button
                onClick={nextSite}
                className="mt-1 rounded-full bg-gradient-to-r from-gold to-terracotta px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
              >
                Next Site →
              </button>
            )}
          </>
        )}

        <div className="mt-auto border-t border-gold/10 pt-4">
          <p className="mb-2 text-xs uppercase tracking-widest text-sandstone-muted">
            Progress
          </p>
          <div className="flex flex-wrap gap-1.5">
            {heritageSites.map((s) => (
              <span
                key={s.id}
                title={s.name}
                className={`h-2.5 w-2.5 rounded-full ${
                  hasCompleted(s.id) ? "bg-circuit shadow-glow-circuit" : "bg-ink-raised"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
