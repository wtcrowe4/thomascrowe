"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Project {
  num: string;
  status?: "live" | "default";
  category: string;
  name: string;
  desc: string;
  tags: string[];
  link: string;
  linkText: string;
  size: "featured" | "medium" | "small";
  mock?: boolean;
}

const projects: Project[] = [
  {
    num: "01",
    status: "live",
    category: "Production · Live Site",
    name: "Calibration Wands",
    desc: "Production e-commerce and product platform powering precision calibration equipment sales. End-to-end ownership: frontend, backend API, infrastructure, and the operations dashboard behind it all.",
    tags: ["Production", "Full Stack", "E-commerce", "React", "Node"],
    link: "https://calibrationwands.com",
    linkText: "Visit Production Site",
    size: "featured",
    mock: true,
  },
  {
    num: "02",
    category: "Open Source",
    name: "RiskRadar AI",
    desc: "AI-powered risk analysis tool that surfaces data-driven signals from noisy inputs. LLM-assisted classification + structured output.",
    tags: ["AI/ML", "Python", "Analytics"],
    link: "https://github.com/wtcrowe4",
    linkText: "View Repo",
    size: "medium",
  },
  {
    num: "03",
    category: "Lab",
    name: "Sports Analytics Engine",
    desc: "Statistical deep-dives into sports data. Combining APIs, ML, and visualization.",
    tags: ["Python", "Stats"],
    link: "https://github.com/wtcrowe4",
    linkText: "View Repo",
    size: "small",
  },
  {
    num: "04",
    category: "Tooling",
    name: "LLM Toolchain",
    desc: "Utilities for embedding LLMs in real apps. RAG, prompt patterns, agentic flows.",
    tags: ["LangChain", "RAG"],
    link: "https://github.com/wtcrowe4",
    linkText: "View Repo",
    size: "small",
  },
  {
    num: "05",
    category: "Infra",
    name: "DevOps Automation",
    desc: "IaC scripts and CI/CD pipelines for AWS-native deployments.",
    tags: ["AWS", "CI/CD"],
    link: "https://github.com/wtcrowe4",
    linkText: "View Repo",
    size: "small",
  },
];

const sizeMap: Record<Project["size"], string> = {
  featured: "lg:col-span-7 lg:min-h-[380px] lg:p-11",
  medium: "lg:col-span-5",
  small: "lg:col-span-4",
};

function MockTile() {
  return (
    <div
      className="absolute -right-[10%] -top-[10%] w-[60%] h-[80%] bg-[var(--color-bg2)] border border-[var(--color-border2)] overflow-hidden opacity-50 group-hover:opacity-80 transition-opacity"
      style={{ transform: "rotate(8deg)" }}
    >
      <div className="h-7 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center gap-1.5 px-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border2)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border2)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border2)]" />
      </div>
      <div className="h-1 bg-[var(--color-border2)] m-2 w-[70%]" />
      <div className="h-1 bg-[var(--color-accent)] opacity-40 m-2 w-[40%]" />
      <div className="h-1 bg-[var(--color-border2)] m-2 w-[70%]" />
      <div className="h-1 bg-[var(--color-border2)] m-2 w-[40%]" />
      <div className="h-1 bg-[var(--color-accent)] opacity-40 m-2 w-[70%]" />
    </div>
  );
}

function ProjectCard({ project, children }: { project: Project; children?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative col-span-12 ${sizeMap[project.size]} bg-[var(--color-surface)] border border-[var(--color-border)] p-8 overflow-hidden cursor-pointer flex flex-col min-h-[260px] hover:border-[var(--color-border2)] hover:-translate-y-1 transition-all duration-300`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse at top right, var(--accent-glow) 0%, transparent 60%)",
        }}
      />
      {project.mock && <MockTile />}
      <div className="font-mono text-[11px] text-[var(--color-muted)] mb-4 tracking-[0.1em] uppercase flex items-center gap-2 relative z-[2]">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            project.status === "live"
              ? "bg-[#4ade80] shadow-[0_0_6px_#4ade80]"
              : "bg-[var(--color-accent)]"
          }`}
        />
        {project.num} / {project.category}
      </div>
      <div
        className={`font-semibold tracking-[-0.02em] leading-[1.1] mb-3.5 relative z-[2] ${
          project.size === "featured" ? "text-[38px]" : "text-[26px]"
        }`}
      >
        {project.name}
      </div>
      <div
        className={`text-[var(--color-muted2)] leading-[1.65] mb-auto max-w-[480px] relative z-[2] ${
          project.size === "featured" ? "text-[16px]" : "text-[14px]"
        }`}
      >
        {project.desc}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-5 relative z-[2]">
        {project.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-[11px] text-[var(--color-accent)] tracking-[0.1em] uppercase inline-flex items-center gap-2 mt-6 hover:gap-3.5 transition-all relative z-[2]"
      >
        {project.linkText} <span>→</span>
      </a>
      {children}
    </motion.div>
  );
}

export function Projects() {
  return (
    <div className="py-[140px] relative z-[2]">
      <section id="projects" className="max-w-[1280px] mx-auto px-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-14 gap-10">
          <div>
            <div className="eyebrow">
              <span className="num">02 /</span> Selected Work
            </div>
            <h2 className="font-semibold tracking-[-0.02em] leading-[0.98]" style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}>
              Builds &amp; <span className="serif-accent">experiments</span>
            </h2>
          </div>
          <a href="https://github.com/wtcrowe4" target="_blank" rel="noreferrer" className="btn btn-outline self-start md:self-auto">
            All on GitHub <span className="arrow">→</span>
          </a>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.num} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
