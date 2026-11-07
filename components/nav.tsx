"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#casebook", label: "Casebook" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "backdrop-blur-md bg-bg/90 border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="site-container h-16 flex items-center justify-between gap-4">
        <a href="/" className="font-mono text-sm tracking-tight whitespace-nowrap">
          <span className="text-accent">&lt;thomas</span>
          <span className="text-muted">.</span>
          <span>crowe</span>
          <span className="text-muted"> /&gt;</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm text-muted2">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/Thomas_Crowe_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium bg-accent text-bg rounded-full px-4 py-2 whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            Resume ↓
          </a>
          <button
            type="button"
            className="lg:hidden p-2 text-text"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="lg:hidden border-t border-border">
          <div className="site-container flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-text"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
