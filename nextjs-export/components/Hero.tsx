"use client";

import { motion } from "framer-motion";
import { NeuralCanvas } from "./NeuralCanvas";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <NeuralCanvas nodeCount={112} />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, var(--color-bg) 95%), radial-gradient(ellipse 80% 70% at 50% 100%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 60%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[3] max-w-[1100px] px-12 text-center flex flex-col items-center gap-7"
      >
        <div className="font-mono text-[12px] text-[var(--color-accent)] tracking-[0.22em] uppercase flex items-center gap-3.5">
          <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full shadow-[0_0_10px_var(--color-accent)]" />
          Available for select projects · 2026
        </div>
        <h1
          className="font-semibold leading-[1.05] tracking-[-0.04em]"
          style={{ fontSize: "clamp(56px, 9vw, 132px)", paddingBottom: "0.12em" }}
        >
          Thomas{" "}
          <span className="serif-accent inline-block pr-[0.06em]">Crowe</span>
        </h1>
        <p
          className="text-[var(--color-muted2)] max-w-[580px] leading-[1.5]"
          style={{ fontSize: "clamp(15px, 1.6vw, 19px)" }}
        >
          Full Stack Developer &amp; AI Engineer building intelligent systems where
          software, data, and machine learning meet.
        </p>
        <div className="flex gap-3.5 mt-3 flex-wrap justify-center">
          <a href="#projects" className="btn btn-primary">
            View Selected Work <span className="arrow">→</span>
          </a>
          <a href="#contact-section" className="btn btn-outline">
            Start a Project
          </a>
        </div>
      </motion.div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-end px-12 z-[3] font-mono text-[10px] text-[var(--color-muted)] tracking-[0.15em] uppercase">
        <div className="flex flex-col gap-1.5">
          <div>Location</div>
          <div className="text-[var(--color-text)] text-[12px] tracking-[0.05em] normal-case font-sans font-medium">
            Greenville, SC
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-9 bg-gradient-to-b from-[var(--color-accent)] to-transparent animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--color-muted)] tracking-[0.2em] uppercase">
            scroll
          </span>
        </div>
        <div className="flex flex-col gap-1.5 text-right">
          <div>Status</div>
          <div className="text-[var(--color-text)] text-[12px] tracking-[0.05em] normal-case font-sans font-medium">
            Open to Work
          </div>
        </div>
      </div>
    </section>
  );
}
