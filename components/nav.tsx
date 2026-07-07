"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#golf", label: "Golf" },
  { href: "#projects", label: "Projects" },
  { href: "#llm", label: "AI / LLM" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-tight">
          <span className="text-accent">&lt;thomas</span>
          <span className="text-muted">.</span>
          <span>crowe</span>
          <span className="text-muted"> /&gt;</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-block text-sm px-4 py-2 rounded-full bg-accent text-black font-medium hover:bg-accent-soft transition-colors"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
