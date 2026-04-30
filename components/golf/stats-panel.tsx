"use client";

import { useMemo } from "react";
import type { Shot, StrokesGained } from "@/lib/types";

export default function StatsPanel({
  sg,
  shots,
}: {
  sg: StrokesGained;
  shots: Shot[];
}) {
  const breakdown = useMemo(() => {
    const total = shots.length || 1;
    const count = (k: Shot["outcome"]) => shots.filter((s) => s.outcome === k).length;
    return {
      birdie: count("birdie") / total,
      par: count("par") / total,
      bogey: count("bogey") / total,
      doublePlus: count("double+") / total,
      water: count("water") / total,
    };
  }, [shots]);

  const avgCarry = useMemo(
    () => Math.round(shots.reduce((a, s) => a + s.carryYds, 0) / (shots.length || 1)),
    [shots]
  );

  return (
    <div className="rounded-xl border border-border bg-bg-soft p-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">
        Field strokes gained · vs. tour avg
      </div>

      <div className="space-y-3">
        <SGRow label="Approach" value={sg.approach} />
        <SGRow label="Around-Green" value={sg.aroundGreen} />
        <SGRow label="Putting" value={sg.putting} />
      </div>

      <div className="border-t border-border my-5" />

      <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
        Outcome distribution
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-bg">
        <Seg w={breakdown.birdie} c="#10b981" />
        <Seg w={breakdown.par} c="#a3a3a3" />
        <Seg w={breakdown.bogey} c="#fbbf24" />
        <Seg w={breakdown.doublePlus} c="#ef4444" />
        <Seg w={breakdown.water} c="#3b82f6" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-y-1 text-xs font-mono text-muted">
        <span>Birdie</span><span className="text-right text-text">{(breakdown.birdie * 100).toFixed(0)}%</span>
        <span>Par</span><span className="text-right text-text">{(breakdown.par * 100).toFixed(0)}%</span>
        <span>Bogey</span><span className="text-right text-text">{(breakdown.bogey * 100).toFixed(0)}%</span>
        <span>Double+</span><span className="text-right text-text">{(breakdown.doublePlus * 100).toFixed(0)}%</span>
        <span>Water</span><span className="text-right text-text">{(breakdown.water * 100).toFixed(0)}%</span>
      </div>

      <div className="border-t border-border my-5" />

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Stat label="Avg carry" value={`${avgCarry} yds`} />
        <Stat label="Sample" value={`${shots.length} shots`} />
      </div>
    </div>
  );
}

function SGRow({ label, value }: { label: string; value: number }) {
  const pct = Math.min(1, Math.abs(value) / 0.5);
  const positive = value >= 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-mono mb-1">
        <span className="text-muted uppercase tracking-wider">{label}</span>
        <span className={positive ? "text-emerald-400" : "text-accent"}>
          {positive ? "+" : ""}
          {value.toFixed(2)}
        </span>
      </div>
      <div className="relative h-1.5 bg-bg rounded-full overflow-hidden">
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
        <div
          className={`absolute top-0 bottom-0 ${positive ? "left-1/2 bg-emerald-400" : "right-1/2 bg-accent"}`}
          style={{ width: `${pct * 50}%` }}
        />
      </div>
    </div>
  );
}

function Seg({ w, c }: { w: number; c: string }) {
  if (w <= 0) return null;
  return <div style={{ width: `${w * 100}%`, background: c }} />;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </div>
      <div className="text-text mt-1">{value}</div>
    </div>
  );
}
