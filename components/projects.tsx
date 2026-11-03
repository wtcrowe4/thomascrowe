type ProjectLink = { label: string; href: string };

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: ProjectLink[];
  note?: string;
  flagship: boolean;
};

const CASEBOOK = "https://github.com/wtcrowe4/work-casebook";

const projects: Project[] = [
  {
    title: "Test Standards Hub — Order-to-Manufacturing Platform",
    blurb:
      "Internal full-stack platform that turns WooCommerce orders into manufacturing outputs: 3,800+ auto-generated NIST-traceable certificates (~450 hours of manual document work eliminated), engraving SVGs, and STL files for the CNC. Certificates are generated through Adobe PDF Services, AES-256 locked, and signed with pyHanko for tamper-evident verification. Tested with Vitest and Supertest, deployed through GitLab CI.",
    tags: ["React/Vite", "Express", "Prisma/PostgreSQL", "Adobe PDF Services", "GitLab CI"],
    links: [
      { label: "Case study", href: `${CASEBOOK}#2-test-standards-hub--order-certificate--production-platform` },
    ],
    note: "Internal · in production",
    flagship: true,
  },
  {
    title: "CalibrationWands.com",
    blurb:
      "B2B storefront for NIST-traceable metal detector and X-ray test standards — a division of Fastec Services LLC. Full-stack development and technical operations: 50+ custom WooCommerce plugins, a real-time SKU configurator across 10 product lines, QuickBooks Desktop and Zoho Inventory integration, Bedrock WordPress with Git-deployed staging, and a zero-downtime migration to DigitalOcean behind Cloudflare.",
    tags: ["WordPress / Bedrock", "WooCommerce", "PHP", "QuickBooks", "Infra"],
    links: [
      { label: "Live site", href: "https://calibrationwands.com" },
      { label: "Case study", href: `${CASEBOOK}#3-production-migration--infrastructure-hardening` },
    ],
    flagship: false,
  },
  {
    title: "FlowLocal — Local Voice Dictation",
    blurb:
      "Open-source voice-dictation stack for Windows that never leaves the machine: GPU faster-whisper transcription, Ollama text cleanup, retrieval over personal notes, and streamed Kokoro TTS replies, served from FastAPI.",
    tags: ["Python", "FastAPI", "faster-whisper", "Ollama", "Kokoro TTS"],
    links: [{ label: "Code", href: "https://github.com/wtcrowe4/FlowLocal" }],
    note: "Open source",
    flagship: false,
  },
  {
    title: "Agent Workstation — Daily-Driver Tooling",
    blurb:
      "The tools I use every workday to direct AI coding agents from the terminal: DialDeck turns a Surface Dial into a mode-based control surface for herdr agent orchestration, permission approvals, and CAD/CAM modeling (AutoHotkey v2, keyless F13–F24 triggers); a local Kokoro TTS daemon (FastAPI) reads agent output aloud; and a herdr plugin brings a unified message inbox, toasts, and unread badges into the terminal.",
    tags: ["AutoHotkey v2", "Python", "FastAPI", "Kokoro TTS", "herdr"],
    links: [{ label: "DialDeck code", href: "https://github.com/wtcrowe4/DialDeck" }],
    note: "Daily driver",
    flagship: false,
  },
  {
    title: "Self-Hosted AI Lab",
    blurb:
      "Local LLM inference and agent pipelines on RTX 5080/4070 GPUs (vLLM, Ollama, LangGraph), pgvector RAG and Unsloth fine-tuning, a Tailscale mesh across five machines, and a Git-synced knowledge base across Windows, Linux, and Android. The proving ground for the production agents at work.",
    tags: ["vLLM", "Ollama", "LangGraph", "pgvector", "Tailscale", "Docker"],
    links: [
      { label: "Case study", href: `${CASEBOOK}#1-self-hosted-ai-automation--a-fleet-of-production-agents` },
    ],
    note: "Home lab",
    flagship: false,
  },
  {
    title: "Sawgrass 17 — 3D Shot Tracers",
    blurb:
      "Broadcast-style shot tracers over the island-green 17th at TPC Sawgrass — a React Three Fiber scene with a 2D overhead heatmap and per-shot stats panel, all in the browser. No game engine. Section preview below; interactive scene landing next.",
    tags: ["Three.js", "React Three Fiber", "Next.js 16", "WebGL"],
    links: [
      { label: "See it", href: "#golf" },
      { label: "Code", href: "https://github.com/wtcrowe4/sawgrass_17" },
    ],
    note: "In progress",
    flagship: true,
  },
];

function Card({ p }: { p: Project }) {
  return (
    <div
      className={`group bg-bg hover:bg-surface transition-colors p-8 flex flex-col gap-4 min-h-[240px] ${
        p.flagship ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
        {p.note && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted whitespace-nowrap mt-1.5">
            {p.note}
          </span>
        )}
      </div>
      <p className="text-muted text-sm leading-relaxed flex-1">{p.blurb}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-surface border border-border text-muted"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 mt-auto pt-2 font-mono text-[11px] uppercase tracking-wider">
        {p.links.map((l) => {
          const external = l.href.startsWith("http");
          return (
            <a
              key={l.label}
              href={l.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="text-accent hover:opacity-80 transition-opacity"
            >
              {l.label} {external ? "↗" : "→"}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-6">
          ◉ SELECTED WORK
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
          Real systems, in production.
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {projects.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </div>

        <a
          href={CASEBOOK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-accent hover:opacity-80 transition-opacity"
        >
          All six case studies in the work casebook <span>→</span>
        </a>
      </div>
    </section>
  );
}
