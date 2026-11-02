"use client";

// PORTFOLIO-OWNED wrapper around the synced <Sawgrass17> scene (not touched by
// scripts/sync-sawgrass.sh). Replaces the standalone repo's dev HUD
// (SAT / TRACE / SPLAT / PROPS) with a visitor HUD: pin selector, outcome
// legend, hovered-shot card.
//
// Also owns the frame loop: <Sawgrass17> creates its own <Canvas> and takes no
// children, so the loop is driven from outside through R3F's root registry
// (_roots, keyed by canvas element). Off-screen => frameloop "never".

import { useCallback, useEffect, useRef, useState } from "react";
import { _roots, addAfterEffect } from "@react-three/fiber";
import { Sawgrass17 } from "./Sawgrass17";
import { PIN_COLORS } from "./parts/Pin";
import { SAMPLE_SHOTS } from "@/data/sawgrass17-sample-shots";
import { OUTCOME_COLOR } from "@/lib/golf/types";
import type { Shot, PinPosition } from "@/lib/golf/types";

const PINS: PinPosition[] = ["sunday", "thursday", "friday", "saturday"];
const OUTCOMES = ["birdie", "par", "bogey", "double+", "water"] as const;

function rootFor(host: HTMLElement | null) {
  const canvas = host?.querySelector("canvas");
  return canvas ? _roots.get(canvas) : undefined;
}

export interface Sawgrass17EmbedProps {
  /** Play the cinematic camera sweep on first render. */
  intro?: boolean;
  /** Fires once the scene's suspense (HDR, textures) has resolved and it has drawn. */
  onReady?: () => void;
}

export default function Sawgrass17Embed({ intro = true, onReady }: Sawgrass17EmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState<PinPosition>("sunday");
  const [hovered, setHovered] = useState<Shot | null>(null);
  const onHover = useCallback((s: Shot | null) => setHovered(s), []);
  const shots = SAMPLE_SHOTS.filter((s) => s.pin === pin);

  // Ready = the Scene subtree has committed (it sets scene.background), plus a
  // few frames so the first visible frame is not a half-uploaded one.
  useEffect(() => {
    let frames = 0;
    let done = false;
    const unsub = addAfterEffect(() => {
      if (done) return;
      const root = rootFor(hostRef.current);
      if (!root || !root.store.getState().scene.background) return;
      if (++frames >= 3) {
        done = true;
        onReady?.();
      }
    });
    return () => unsub();
  }, [onReady]);

  // Pause rendering while off-screen; resume when visible again.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const root = rootFor(host);
        if (!root) return;
        root.store.getState().setFrameloop(entry.isIntersecting ? "always" : "never");
      },
      { threshold: 0 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  // Let the mouse wheel scroll the page instead of zooming the camera: stop the
  // event in the capture phase before OrbitControls (listening on the canvas)
  // sees it. Default is not prevented, so the page still scrolls.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const stop = (e: WheelEvent) => e.stopPropagation();
    host.addEventListener("wheel", stop, { capture: true });
    return () => host.removeEventListener("wheel", stop, { capture: true });
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      <Sawgrass17 shots={shots} pin={pin} onHoverShot={onHover} intro={intro} />

      <div className="absolute top-3 right-3 z-10 flex flex-wrap justify-end gap-1.5">
        {PINS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPin(p)}
            aria-pressed={pin === p}
            className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm transition-colors ${
              pin === p
                ? "border-accent bg-black/60 text-accent"
                : "border-white/15 bg-black/50 text-white/60 hover:text-white"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: PIN_COLORS[p] }} />
            {p}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 z-10 hidden flex-wrap gap-3 border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-sm sm:flex">
        {OUTCOMES.map((o) => (
          <span key={o} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/65">
            <span className="h-2 w-2 rounded-full" style={{ background: OUTCOME_COLOR[o] }} />
            {o}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-10 font-mono text-[9px] uppercase tracking-widest text-white/50">
        {hovered ? (
          <div className="border bg-black/70 px-3 py-2 text-left normal-case tracking-normal" style={{ borderColor: `${OUTCOME_COLOR[hovered.outcome]}66` }}>
            <div className="font-semibold uppercase tracking-widest" style={{ color: OUTCOME_COLOR[hovered.outcome] }}>
              {hovered.outcome}
            </div>
            <div className="mt-0.5 text-[11px] text-white/75">
              {hovered.player} &middot; {hovered.carryYds} yds{hovered.club ? ` · ${hovered.club}` : ""}
            </div>
          </div>
        ) : (
          <span className="hidden sm:inline">{shots.length} shots &middot; {pin} pin &middot; drag to orbit</span>
        )}
      </div>
    </div>
  );
}
