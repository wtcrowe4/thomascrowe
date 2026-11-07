export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="site-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-muted2">
        <div>© {new Date().getFullYear()} Thomas Crowe · Built with Next.js</div>
        <div>Full-stack · Platform · AI · Greenville, SC</div>
      </div>
    </footer>
  );
}
