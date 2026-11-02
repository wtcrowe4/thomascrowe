"use client";

// PORTFOLIO-OWNED. Decides whether and when the 3D scene loads:
// - Server render + first paint: static poster only (no three.js on the page).
// - Desktop with WebGL and no reduced-motion preference: the scene chunk is
//   fetched when the section nears the viewport, and the poster fades out once
//   the scene has drawn.
// - Small screens / prefers-reduced-motion: poster + "Load 3D" tap.
// - No WebGL: poster only.

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Sawgrass17Embed = dynamic(() => import("./Sawgrass17Embed"), { ssr: false });

const POSTER = "/sawgrass17/poster.jpg";

type Gate = "pending" | "auto" | "tap" | "nowebgl";

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function SawgrassStage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [gate, setGate] = useState<Gate>("pending");
  const [reduced, setReduced] = useState(false);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    setReduced(reduce);
    if (!hasWebGL()) setGate("nowebgl");
    else setGate(reduce || small ? "tap" : "auto");
  }, []);

  useEffect(() => {
    if (gate !== "auto" || mount) return;
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [gate, mount]);

  return (
    <div ref={hostRef} className="absolute inset-0 bg-[#0a0a0a]">
      {mount && <Sawgrass17Embed intro={!reduced} onReady={onReady} />}

      {/* Poster: shown until the scene has drawn, and as the fallback. */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-hidden={ready}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={POSTER}
          alt="3D render of the island green at TPC Sawgrass hole 17 with shot tracers"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {gate === "tap" && !mount && (
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-5">
            <button
              type="button"
              onClick={() => setMount(true)}
              className="border border-accent bg-black/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent backdrop-blur-sm hover:bg-accent hover:text-black"
            >
              Load 3D scene
            </button>
          </div>
        )}
        {mount && !ready && (
          <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            Loading scene&hellip;
          </div>
        )}
        {gate === "nowebgl" && (
          <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            Static preview &middot; 3D needs WebGL
          </div>
        )}
      </div>
    </div>
  );
}
