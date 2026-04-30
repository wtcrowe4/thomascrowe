export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-muted">
        <div>© {new Date().getFullYear()} Thomas Crowe · Built w/ Next.js + R3F</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>v0.1 — design prototype</span>
        </div>
      </div>
    </footer>
  );
}
