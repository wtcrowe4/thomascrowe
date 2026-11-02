"use client";

// PORTFOLIO OVERRIDE -- next.config.ts aliases "@react-three/postprocessing"
// here (Turbopack resolveAlias). The scene imports the composer but ships with
// post = false (EffectComposer breaks MeshReflectorMaterial), so the real
// library is dead weight in the scene chunk. If the scene starts importing
// other names from the package, the build fails on the missing export --
// add a stub below or drop the alias.
// The real package stays installed so `tsc` resolves its types.

type AnyProps = { children?: unknown } & Record<string, unknown>;

export function EffectComposer(_props: AnyProps) {
  return null;
}
export function Bloom(_props: AnyProps) {
  return null;
}
export function SMAA(_props: AnyProps) {
  return null;
}
export function Vignette(_props: AnyProps) {
  return null;
}
