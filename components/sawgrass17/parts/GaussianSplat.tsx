"use client";

// PORTFOLIO OVERRIDE -- copied over the synced parts/GaussianSplat.tsx by
// scripts/sync-sawgrass.sh. The standalone repo's version pulls in
// @mkkellogg/gaussian-splats-3d for an experimental splat toggle that the
// portfolio embed never turns on, so it is stubbed here to keep that library
// out of the bundle. Same export + props contract as upstream.

export interface GaussianSplatProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  visible?: boolean;
  alphaThreshold?: number;
}

export function GaussianSplat(_props: GaussianSplatProps) {
  return null;
}
