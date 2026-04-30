"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { sawgrass17 } from "@/data/sawgrass-17";
import StatsPanel from "./stats-panel";
import OverheadMap from "./overhead-map";
import type { Shot } from "@/lib/types";

const Sawgrass3D = dynamic(() => import("./sawgrass-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center text-muted text-sm font-mono">
      loading 3d scene…
    </div>
  ),
});

const PINS = ["all", "sunday", "thursday", "friday", "saturday"] as const;
type Pin = (typeof PINS)[number];

export default function GolfShowcase() {
  const [pin, setPin] = useState<Pin>("all");
  const [hovered, setHovered] = useState<Shot | null>(null);

  const shots = useMemo(
    () => (pin === "all" ? sawgrass17.shots : sawgrass17.shots.filter((s) => s.pin === pin)),
    [pin]
  );

  return (
    <section id="golf" className="py-32 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent mb-6">
              ◉ SIGNATURE PIECE — v1
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
              The 17th at TPC Sawgrass.
              <br />
              <span className="text-muted">Every shot, in 3D.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-muted text-lg">
              Broadcast-style shot tracers in a live 3D scene, paired with a
              Gaussian-heatmap overhead and the field&apos;s strokes-gained
              breakdown. Built with React Three Fiber. v2 will swap the
              stylized hole for a Gaussian splat capture.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PINS.map((p) => (
              <button
                key={p}
                onClick={() => setPin(p)}
                className={`font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-full border transition-colors ${
                  pin === p
                    ? "bg-accent text-black border-accent"
                    : "border-border text-muted hover:text-text hover:border-text"
                }`}
              >
                {p === "all" ? "All pins" : `${p} pin`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-bg-soft">
            <Sawgrass3D shots={shots} onHover={setHovered} />

            <div className="absolute top-4 left-4 px-3 py-2 rounded-lg bg-bg/80 backdrop-blur border border-border font-mono text-[10px] uppercase tracking-widest text-muted">
              {sawgrass17.course} · Hole {sawgrass17.holeNumber} · Par{" "}
              {sawgrass17.par} · {sawgrass17.yardage} yds
            </div>

            {hovered && (
              <div className="absolute bottom-4 left-4 px-4 py-3 rounded-lg bg-bg/90 backdrop-blur border border-border max-w-xs">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">
                  {hovered.player} · {hovered.year}
                </div>
                <div className="text-sm">
                  {hovered.club} · {hovered.carryYds} yds carry ·{" "}
                  <span
                    className={
                      hovered.outcome === "birdie"
                        ? "text-emerald-400"
                        : hovered.outcome === "water" || hovered.outcome === "double+"
                        ? "text-red-400"
                        : "text-muted"
                    }
                  >
                    {hovered.outcome}
                  </span>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-muted">
              drag · scroll · pinch
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <OverheadMap shots={shots} hole={sawgrass17} onHover={setHovered} />
            <StatsPanel sg={sawgrass17.fieldStrokesGained} shots={shots} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-muted">
          <div className="flex items-center gap-4">
            <Legend color="#10b981" label="birdie" />
            <Legend color="#a3a3a3" label="par" />
            <Legend color="#fbbf24" label="bogey" />
            <Legend color="#ef4444" label="double+" />
            <Legend color="#3b82f6" label="water" />
          </div>
          <div className="text-[10px] uppercase tracking-widest">
            data: illustrative · v2: DataGolf API + 3DGS capture
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
