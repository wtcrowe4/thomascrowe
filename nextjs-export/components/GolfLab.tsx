"use client";

import { motion } from "framer-motion";

export function GolfLab() {
  return (
    <div
      id="golf-section"
      className="py-[140px] relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg2)]"
    >
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-accent) 4%, transparent) 0%, transparent 60%)",
        }}
      />
      <section className="relative z-[2] max-w-[1280px] mx-auto px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-[1fr_auto] gap-15 items-end mb-14"
        >
          <div>
            <div className="eyebrow"><span className="num">03 /</span> Golf Lab · Where data meets fairways</div>
            <h2 className="font-semibold tracking-[-0.02em] leading-[0.98] mb-7" style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}>
              The 17th at <span className="serif-accent">Sawgrass</span>.<br />
              Stats meet the splat.
            </h2>
            <p className="text-[17px] leading-[1.7] text-[var(--color-muted2)] max-w-[640px] mt-5">
              A live data canvas overlaying PGA Tour shot data on an ultra-realistic Gaussian splat of the most famous par-3 in golf. Heatmaps, shot tracers, strokes-gained breakdowns — and an AI caddie waiting in the wings.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 font-mono text-[11px] text-[var(--color-muted)] tracking-[0.1em] lg:text-right">
            <div>HOLE 17 · PAR 3 · 137 YDS</div>
            <div className="text-[var(--color-accent)] text-[14px]">TPC SAWGRASS</div>
            <div className="mt-3">Data: PGA Tour ShotLink</div>
            <div>Render: Three.js + 3DGS</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[7fr_5fr] gap-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="bg-[var(--color-bg)] border border-[var(--color-border)] aspect-[16/10] relative overflow-hidden"
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 50% 60%, rgba(34,197,94,0.08), transparent 70%), linear-gradient(180deg, #0a1822 0%, #050811 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(251,146,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.04) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <svg
                className="absolute inset-0 w-full h-full opacity-50"
                viewBox="0 0 800 500"
                preserveAspectRatio="none"
              >
                <path d="M 100 400 Q 350 80 600 280" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                <path d="M 110 400 Q 380 60 640 300" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.6" />
                <path d="M 90 400 Q 340 100 560 340" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.4" />
                <circle cx="600" cy="280" r="4" fill="var(--color-accent)" />
                <circle cx="640" cy="300" r="3" fill="var(--color-accent)" opacity="0.6" />
                <circle cx="560" cy="340" r="3" fill="var(--color-accent)" opacity="0.7" />
              </svg>
              <div className="relative text-center flex flex-col items-center gap-5 max-w-[420px] px-10">
                <div className="w-16 h-16 border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] font-mono text-[14px]">⛳</div>
                <div className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.25em] uppercase">Section · 3D Splat View</div>
                <div className="text-[24px] font-semibold tracking-[-0.02em]">
                  Gaussian splat of Hole 17<br />+ live shot tracers
                </div>
                <div className="text-[13px] text-[var(--color-muted2)] leading-[1.7]">
                  In-world fly-through with PGA Tour shot data layered as glowing arcs. Click any tracer to see the player, distance, and outcome. Coming with the splat capture.
                </div>
                <div className="flex gap-2 mt-2">
                  {["Three.js", "3DGS", "ShotLink", "v2"].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-[var(--color-bg)] border border-[var(--color-border)] aspect-square relative overflow-hidden"
            >
              <span className="absolute top-3.5 left-4 font-mono text-[10px] text-[var(--color-accent)] tracking-[0.15em] uppercase z-[3]">
                Overhead · Heatmap
              </span>
              <span className="absolute top-3.5 right-4 font-mono text-[9px] text-[var(--color-muted)] tracking-[0.1em] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 z-[3]">
                Google Maps API
              </span>
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                <rect width="400" height="400" fill="#0a1628" />
                <ellipse cx="240" cy="160" rx="78" ry="62" fill="#0f2a1a" stroke="#1f4a32" strokeWidth="1.5" />
                <ellipse cx="200" cy="195" rx="14" ry="8" fill="#3a3520" stroke="#5a4f30" strokeWidth="0.5" />
                <line x1="245" y1="148" x2="245" y2="125" stroke="var(--color-accent)" strokeWidth="1.2" />
                <polygon points="245,125 258,131 245,137" fill="var(--color-accent)" />
                <circle cx="245" cy="148" r="2" fill="#fff" />
                <rect x="80" y="295" width="36" height="14" fill="#0f2a1a" stroke="#1f4a32" strokeWidth="1" />
                <text x="98" y="320" fill="#5a7494" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1">TEE</text>
                <line x1="98" y1="295" x2="245" y2="148" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
                <text x="170" y="218" fill="var(--color-accent)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1">137 YDS</text>
                <g opacity="0.85">
                  <circle cx="245" cy="155" r="14" fill="var(--color-accent)" opacity="0.18" />
                  <circle cx="240" cy="160" r="22" fill="var(--color-accent)" opacity="0.10" />
                  <circle cx="248" cy="150" r="9" fill="var(--color-accent)" opacity="0.30" />
                </g>
                <circle cx="248" cy="150" r="2.5" fill="#4ade80" />
                <circle cx="245" cy="158" r="2" fill="#4ade80" />
                <circle cx="241" cy="160" r="2" fill="#38bdf8" />
                <circle cx="252" cy="162" r="2" fill="#38bdf8" />
                <circle cx="237" cy="155" r="2" fill="#38bdf8" />
                <circle cx="255" cy="148" r="2" fill="var(--color-accent)" />
                <circle cx="232" cy="171" r="2" fill="var(--color-accent)" />
                <circle cx="218" cy="180" r="2" fill="var(--color-accent)" />
                <circle cx="180" cy="220" r="2" fill="#f87171" opacity="0.6" />
                <circle cx="320" cy="170" r="2" fill="#f87171" opacity="0.6" />
                <circle cx="280" cy="100" r="2" fill="#f87171" opacity="0.6" />
                <circle cx="155" cy="170" r="2" fill="#f87171" opacity="0.6" />
                <g transform="translate(16, 360)">
                  <circle cx="6" cy="0" r="2.5" fill="#4ade80" />
                  <text x="14" y="3" fill="#5a7494" fontSize="7" fontFamily="JetBrains Mono">BIRDIE</text>
                  <circle cx="64" cy="0" r="2.5" fill="#38bdf8" />
                  <text x="72" y="3" fill="#5a7494" fontSize="7" fontFamily="JetBrains Mono">PAR</text>
                  <circle cx="106" cy="0" r="2.5" fill="var(--color-accent)" />
                  <text x="114" y="3" fill="#5a7494" fontSize="7" fontFamily="JetBrains Mono">BOGEY</text>
                  <circle cx="160" cy="0" r="2.5" fill="#f87171" />
                  <text x="168" y="3" fill="#5a7494" fontSize="7" fontFamily="JetBrains Mono">WATER</text>
                </g>
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[var(--color-bg)] border border-[var(--color-border)] p-6 flex-1 flex flex-col gap-4"
            >
              <div className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.15em] uppercase pb-3 border-b border-[var(--color-border)]">
                Strokes Gained · Hole 17
              </div>
              {[
                ["Field Avg Score", "3.18", ""],
                ["Birdie %", "12.4%", "text-[#4ade80]"],
                ["Water Balls", "7.1%", "text-[#f87171]"],
                ["SG: Approach", "−0.18", ""],
                ["Shot Attempts (sample)", "412", ""],
              ].map(([label, val, klass]) => (
                <div key={label} className="flex justify-between items-center py-1.5">
                  <span className="text-[12px] text-[var(--color-muted2)]">{label}</span>
                  <span className={`font-mono text-[13px] font-medium ${klass || "text-[var(--color-text)]"}`}>{val}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center px-6 py-5 bg-[var(--color-bg)] border border-[var(--color-border)]"
        >
          <div className="w-9 h-9 bg-[var(--accent-glow)] border border-[color:color-mix(in_srgb,var(--color-accent)_30%,transparent)] flex items-center justify-center text-[var(--color-accent)] font-mono text-[14px] flex-shrink-0">⌗</div>
          <div className="flex-1 text-[13px] text-[var(--color-muted2)] leading-[1.5]">
            <strong className="text-[var(--color-text)] font-semibold">Coming next:</strong> a "Play This Hole" mode — input your handicap, pick a club, get an AI-caddie recommendation, and see your simulated outcome against the field.
          </div>
          <a href="#contact-section" className="btn btn-outline flex-shrink-0">
            Follow Build <span className="arrow">→</span>
          </a>
        </motion.div>
      </section>
    </div>
  );
}
