"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden noise">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 70% 20%, rgba(255,107,26,0.18) 0%, transparent 60%), radial-gradient(60% 60% at 10% 90%, rgba(34,211,238,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-24">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-widest text-accent mb-6"
        >
          ◉ AVAILABLE FOR WORK — Q2 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] text-balance"
        >
          Thomas Crowe.
          <br />
          <span className="text-muted">I turn data into </span>
          <span className="text-accent">decisions</span>
          <span className="text-muted">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-muted text-balance"
        >
          Metrology & calibration engineer by day. Building 3D golf analytics,
          data pipelines, and cinematic web experiences in between rounds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <a
            href="#golf"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-black font-medium hover:bg-accent-soft transition-colors"
          >
            See the golf viz
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-text hover:bg-surface transition-colors"
          >
            Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl font-mono text-sm"
        >
          {[
            ["07", "years in metrology"],
            ["3DGS", "splat curious"],
            ["∞", "rounds played"],
            ["+1", "handicap goal"],
          ].map(([stat, label]) => (
            <div key={label} className="border-l border-border pl-4">
              <div className="text-2xl text-text">{stat}</div>
              <div className="text-muted text-xs uppercase tracking-wider mt-1">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
