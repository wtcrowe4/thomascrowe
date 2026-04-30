"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <div
      id="contact-section"
      className="py-[140px] relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg2)]"
    >
      <div
        aria-hidden
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 240,
          color: "var(--color-accent)",
          opacity: 0.04,
        }}
      >
        crowe.
      </div>
      <section className="relative z-[2] max-w-[1280px] mx-auto px-12">
        <div className="grid lg:grid-cols-[6fr_5fr] gap-20 items-start relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow"><span className="num">06 /</span> Connect</div>
            <h1 className="font-semibold leading-[0.96] tracking-[-0.03em] mb-7" style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}>
              Let's build<br />something <span className="serif-accent">great</span>.
            </h1>
            <p className="text-[17px] leading-[1.7] text-[var(--color-muted2)] max-w-[640px]">
              Open to interesting projects, AI engineering work, sports-data collaborations, or just a good conversation about golf handicaps and chess endgames.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              {[
                {
                  href: "https://github.com/wtcrowe4",
                  label: "GitHub",
                  value: "github.com/wtcrowe4",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[var(--color-accent)]"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/wthomascrowe",
                  label: "LinkedIn",
                  value: "in/wthomascrowe",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[var(--color-accent)]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  ),
                },
              ].map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center gap-[18px] py-5 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border2)] hover:translate-x-1.5 transition-all overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--color-accent)] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform" />
                  <div className="w-10 h-10 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--accent-glow)] transition-all">
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[10px] text-[var(--color-muted)] tracking-[0.12em] uppercase mb-1">{c.label}</div>
                    <div className="text-[14px] font-medium">{c.value}</div>
                  </div>
                  <div className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all">→</div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            onSubmit={(e) => e.preventDefault()}
            className="bg-[var(--color-bg)] border border-[var(--color-border)] p-9 flex flex-col gap-5"
          >
            <div className="font-mono text-[11px] text-[var(--color-accent)] tracking-[0.2em] uppercase pb-4 border-b border-[var(--color-border)] mb-2">
              → Send a message
            </div>
            {[
              { label: "Name", input: <input type="text" placeholder="Your name" className="bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text)] px-3.5 py-3 font-sans text-[14px] outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-surface)] transition-all" /> },
              { label: "Email", input: <input type="email" placeholder="your@email.com" className="bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text)] px-3.5 py-3 font-sans text-[14px] outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-surface)] transition-all" /> },
              { label: "Message", input: <textarea rows={5} placeholder="What are we building?" className="bg-[var(--color-bg2)] border border-[var(--color-border)] text-[var(--color-text)] px-3.5 py-3 font-sans text-[14px] outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-surface)] transition-all resize-y" /> },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-[var(--color-muted)] tracking-[0.15em] uppercase">{f.label}</label>
                {f.input}
              </div>
            ))}
            <button type="submit" className="btn btn-primary self-start mt-2">
              Send Message <span className="arrow">→</span>
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
