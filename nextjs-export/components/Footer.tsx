export function Footer() {
  return (
    <footer className="px-12 py-8 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 bg-[var(--color-bg)] relative z-[2]">
      <div className="font-mono text-[11px] text-[var(--color-muted)] tracking-wide">
        © 2026 Thomas Crowe
      </div>
      <div className="font-mono text-[11px] text-[var(--color-muted)] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
        Site v2 · Built in Greenville, SC
      </div>
      <div className="flex gap-7">
        <a href="https://github.com/wtcrowe4" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-[var(--color-muted)] hover:text-[var(--color-accent)] tracking-wide transition-colors">GITHUB</a>
        <a href="https://www.linkedin.com/in/wthomascrowe" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-[var(--color-muted)] hover:text-[var(--color-accent)] tracking-wide transition-colors">LINKEDIN</a>
        <a href="#hero" className="font-mono text-[11px] text-[var(--color-muted)] hover:text-[var(--color-accent)] tracking-wide transition-colors">↑ TOP</a>
      </div>
    </footer>
  );
}
