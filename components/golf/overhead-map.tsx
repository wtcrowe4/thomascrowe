"use client";

import { useEffect, useRef } from "react";
import type { HoleData, Shot, ShotOutcome } from "@/lib/types";

const OUTCOME_COLOR: Record<ShotOutcome, string> = {
  birdie: "#10b981",
  par: "#a3a3a3",
  bogey: "#fbbf24",
  "double+": "#ef4444",
  water: "#3b82f6",
};

export default function OverheadMap({
  shots,
  hole,
  onHover,
}: {
  shots: Shot[];
  hole: HoleData;
  onHover: (s: Shot | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shotPositionsRef = useRef<Array<{ shot: Shot; x: number; y: number; r: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // World extent in yards: x ±25, y -8 to 38 (back of green + buffer)
    const minX = -25, maxX = 25;
    const minY = -10, maxY = 38;
    const sx = (x: number) => ((x - minX) / (maxX - minX)) * W;
    const sy = (y: number) => H - ((y - minY) / (maxY - minY)) * H;

    // Background — water
    ctx.fillStyle = "#0f2742";
    ctx.fillRect(0, 0, W, H);

    // Faint ripple grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let y = minY; y <= maxY; y += 5) {
      ctx.beginPath();
      ctx.moveTo(0, sy(y));
      ctx.lineTo(W, sy(y));
      ctx.stroke();
    }
    for (let x = minX; x <= maxX; x += 5) {
      ctx.beginPath();
      ctx.moveTo(sx(x), 0);
      ctx.lineTo(sx(x), H);
      ctx.stroke();
    }

    // Green shape (perturbed ellipse, top-down)
    ctx.beginPath();
    const cx = sx(0), cy = sy(7);
    const rx = (sx(13) - sx(-13)) / 2;
    const ry = (sy(-7) - sy(21)) / 2;
    const segs = 64;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const r = 1 + Math.sin(a * 3) * 0.08 + Math.cos(a * 2) * 0.05;
      const px = cx + Math.cos(a) * rx * r;
      const py = cy + Math.sin(a) * ry * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = "#5d8b4c";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Walkway
    ctx.fillStyle = "#c9b386";
    ctx.fillRect(sx(-3), sy(-7), sx(3) - sx(-3), 8);

    // Heatmap (Gaussian blobs around landing positions)
    const heat = ctx.createImageData(W, H);
    const sigma = 22;
    const data = heat.data;
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        let intensity = 0;
        for (const s of shots) {
          const dx = px - sx(s.landing.x);
          const dy = py - sy(s.landing.y);
          intensity += Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        }
        const a = Math.min(1, intensity * 0.45);
        if (a > 0.02) {
          const idx = (py * W + px) * 4;
          // hot color: orange -> yellow -> white
          const r = Math.min(255, 255 * a + 50);
          const g = Math.min(255, 140 * a + 20);
          const b = Math.min(255, 40 * a);
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = a * 200;
        }
      }
    }
    ctx.putImageData(heat, 0, 0);

    // Pin
    ctx.beginPath();
    ctx.arc(sx(2), sy(6), 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6b1a";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Shot dots
    shotPositionsRef.current = [];
    for (const s of shots) {
      const x = sx(s.landing.x);
      const y = sy(s.landing.y);
      const r = 3.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = OUTCOME_COLOR[s.outcome];
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
      shotPositionsRef.current.push({ shot: s, x, y, r: r + 4 });
    }

    // Tee marker (bottom)
    ctx.fillStyle = "#3d5a3f";
    ctx.fillRect(sx(-2), H - 8, sx(2) - sx(-2), 6);
    ctx.font = "10px ui-monospace, Menlo, monospace";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("TEE · 137 yds →", 8, H - 12);
  }, [shots, hole]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-bg-soft">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Overhead · landing dispersion
        </span>
        <span className="font-mono text-[10px] text-accent">{shots.length} shots</span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full aspect-square block"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;
          let found: Shot | null = null;
          for (const p of shotPositionsRef.current) {
            const d = Math.hypot(p.x - mx, p.y - my);
            if (d < p.r) {
              found = p.shot;
              break;
            }
          }
          onHover(found);
        }}
        onMouseLeave={() => onHover(null)}
      />
    </div>
  );
}
