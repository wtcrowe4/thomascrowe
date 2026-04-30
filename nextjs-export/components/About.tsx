"use client";

import { motion } from "framer-motion";

const interests = [
  { icon: "⛳", title: "Golf", desc: "Stats-obsessed weekend hacker. SG: Putting is the friend I never asked for." },
  { icon: "♟", title: "Chess", desc: "Endgame studies and pattern recognition — the underrated programming exercise." },
  { icon: "🎣", title: "Fishing", desc: "A reminder that not every problem has a stack trace." },
  { icon: "📊", title: "Sports Stats", desc: "If there's a number behind it, I want to chart it. Especially golf." },
];

const stats = [
  { num: "7+", label: "Years Building" },
  { num: "∞", label: "Curious By Default" },
  { num: "AI", label: "Focused Stack" },
  { num: "SC", label: "Based In Greenville" },
];

export function About() {
  return (
    <div className="py-[140px] relative z-[2]">
      <section
        id="about"
        className="grid lg:grid-cols-[5fr_7fr] gap-[100px] max-w-[1280px] mx-auto px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-[120px] lg:self-start"
        >
          <div className="eyebrow"><span className="num">01 /</span> About</div>
          <h2 className="font-semibold tracking-[-0.02em] leading-[0.98] mb-7" style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}>
            Code, curiosity,<br />
            and <span className="serif-accent">craft</span>.
          </h2>
          <p className="text-[14px] leading-[1.7] text-[var(--color-muted2)] max-w-[640px]">
            Greenville, SC. 37. Husband, dad, builder. The kind of engineer that ships.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8 }}>
            <p className="text-[19px] leading-[1.65] text-[var(--color-text)] font-light">
              Full stack developer and AI engineer building production systems that bridge modern software engineering with machine learning —{" "}
              <span className="text-[var(--color-accent)]">scalable backends, intelligent interfaces, and the data plumbing that connects them.</span>
            </p>
            <p className="text-[16px] leading-[1.65] text-[var(--color-muted2)] font-light mt-6">
              When I'm off the keyboard you'll find me on the golf course, deep in a chess endgame, or out fishing. I'm a firm believer that the best insights come from data — whether it's a codebase, a box score, or a strokes-gained breakdown.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8 }}>
            <div className="eyebrow !mb-4" style={{ fontSize: "10px" }}>
              <span className="num">→</span> Off the keyboard
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
              {interests.map((i) => (
                <div key={i.title} className="bg-[var(--color-bg)] p-7 hover:bg-[var(--color-surface)] transition-colors">
                  <div className="w-8 h-8 border border-[var(--color-accent)] flex items-center justify-center mb-[18px] text-[var(--color-accent)] font-mono text-[14px]">
                    {i.icon}
                  </div>
                  <div className="text-[14px] font-semibold mb-1.5 tracking-[-0.01em]">{i.title}</div>
                  <div className="text-[12px] text-[var(--color-muted2)] leading-[1.6]">{i.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8 }} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
            {stats.map((s) => (
              <div key={s.label} className="bg-[var(--color-bg)] p-6">
                <div className="font-mono text-[32px] font-semibold text-[var(--color-accent)] leading-none mb-2">{s.num}</div>
                <div className="text-[11px] text-[var(--color-muted)] tracking-[0.1em] uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
