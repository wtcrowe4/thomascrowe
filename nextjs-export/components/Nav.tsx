"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about", num: "01" },
  { label: "Work", href: "#projects", num: "02" },
  { label: "Golf Lab", href: "#golf-section", num: "03" },
  { label: "Stack", href: "#skills-section", num: "04" },
  { label: "Experience", href: "#experience", num: "05" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "py-3.5 px-12 bg-[rgba(5,8,17,0.78)] backdrop-blur-xl border-b border-[var(--color-border)]"
          : "py-[18px] px-12"
      }`}
      style={{ zIndex: 100 }}
    >
      <a href="#hero" className="font-mono text-[13px] flex items-center gap-2.5 tracking-wide">
        <span className="text-[var(--color-accent)]">&lt;</span>
        thomas.crowe
        <span className="text-[var(--color-accent)]">/&gt;</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80] animate-pulse" />
      </a>
      <ul className="hidden md:flex items-center gap-1 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-[12px] text-[var(--color-muted2)] hover:text-[var(--color-accent)] tracking-wide transition-colors px-3.5 py-2"
            >
              <span className="text-[var(--color-accent)] opacity-60 mr-1.5">{l.num}</span>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact-section"
            className="ml-4 px-[18px] py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase border border-[var(--color-border2)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--accent-glow)] transition-all"
          >
            Get In Touch
          </a>
        </li>
      </ul>
    </nav>
  );
}
