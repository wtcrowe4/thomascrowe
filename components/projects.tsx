type ProjectLink = { label: string; href: string };

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: ProjectLink[];
  note?: string;
};

const projects: Project[] = [
  {
    title: "Claude Usage Meter",
    blurb:
      "Always-visible Claude plan usage in the terminal: 5-hour and weekly limits as progress bars with reset countdowns and a burn-rate projection, as a herdr/tmux status bar or a Textual dashboard. One systemd-timed fetcher writes a cache that any number of bars read for free, and the OAuth token is used for a single request header and never stored, logged or refreshed.",
    tags: ["Python", "Textual", "systemd", "herdr", "tmux"],
    links: [{ label: "Code", href: "https://github.com/wtcrowe4/claude-usage-meter" }],
    note: "Open source",
  },
  {
    title: "email-tui: Mail for Terminal Agents",
    blurb:
      "Gmail and Outlook from the terminal. A Thunderbird add-on and local bridge let terminal tools and Claude read and organise mail in the running client (folders, archiving, flags, tags, contacts, drafts), and a herdr plugin adds unread badges, new-mail alerts and a mail pane. No dependencies beyond Python and Thunderbird.",
    tags: ["Python", "Thunderbird add-on", "herdr", "Linux"],
    links: [{ label: "Code", href: "https://github.com/wtcrowe4/email-tui" }],
    note: "Open source",
  },
  {
    title: "Agent Workstation: Daily-Driver Tooling",
    blurb:
      "The tools I use every workday to direct AI coding agents from the terminal: DialDeck turns a Surface Dial into a mode-based control surface for herdr agent orchestration, permission approvals, and CAD/CAM modeling (AutoHotkey v2, keyless F13–F24 triggers); a local Kokoro TTS daemon (FastAPI) reads agent output aloud; and a herdr plugin brings a unified message inbox, toasts, and unread badges into the terminal.",
    tags: ["AutoHotkey v2", "Python", "FastAPI", "Kokoro TTS", "herdr"],
    links: [{ label: "DialDeck code", href: "https://github.com/wtcrowe4/DialDeck" }],
    note: "Daily driver",
  },
  {
    title: "Dev Environment as Code",
    blurb:
      "Shell, terminal, editor, tmux, git and AI-CLI configuration for Windows, WSL and Linux, kept in two Git repos with bootstrap scripts that install the tools and link the config on a fresh machine. The same setup follows me across a laptop, a desktop and a work rig.",
    tags: ["Bash", "PowerShell", "Neovim", "tmux", "Starship", "WSL"],
    links: [],
    note: "Daily driver",
  },
  {
    title: "FlowLocal: Local Voice Dictation",
    blurb:
      "Open-source voice-dictation stack for Windows that never leaves the machine: GPU faster-whisper transcription, Ollama text cleanup, retrieval over personal notes, and streamed Kokoro TTS replies, served from FastAPI.",
    tags: ["Python", "FastAPI", "faster-whisper", "Ollama", "Kokoro TTS"],
    links: [{ label: "Code", href: "https://github.com/wtcrowe4/FlowLocal" }],
    note: "Open source",
  },
  {
    title: "Self-Hosted AI Lab",
    blurb:
      "Local LLM inference and agent pipelines on RTX 5080/4070 GPUs (vLLM, Ollama, LangGraph), pgvector RAG and Unsloth fine-tuning, a Tailscale mesh across five machines, and a Git-synced knowledge base across Windows, Linux, and Android. The proving ground for the production agents at work.",
    tags: ["vLLM", "Ollama", "LangGraph", "pgvector", "Tailscale", "Docker"],
    links: [],
    note: "Home lab",
  },
  {
    title: "Sawgrass 17: 3D Shot Tracers",
    blurb:
      "A side project for fun: broadcast-style shot tracers over the island-green 17th at TPC Sawgrass, built with React Three Fiber in the browser. Coming when it's ready.",
    tags: ["Three.js", "React Three Fiber", "WebGL"],
    links: [{ label: "See it", href: "#golf" }],
    note: "In progress",
  },
];

function Card({ p, wide }: { p: Project; wide?: boolean }) {
  return (
    <div className={`group min-w-0 bg-bg hover:bg-surface transition-colors p-6 sm:p-8 flex flex-col gap-4 ${wide ? "md:col-span-2" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <h3 className="min-w-0 text-xl font-medium tracking-tight">{p.title}</h3>
        {p.note && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted2 whitespace-nowrap mt-1.5">
            {p.note}
          </span>
        )}
      </div>
      <p className="text-muted2 text-sm leading-relaxed flex-1">{p.blurb}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-surface border border-border text-muted2"
          >
            {t}
          </span>
        ))}
      </div>
      {p.links.length > 0 && (
        <div className="flex flex-wrap gap-5 pt-2 font-mono text-[11px] uppercase tracking-wider">
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
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 border-t border-border">
      <div className="site-container">
        <div className="eyebrow">Personal projects</div>
        <h2 className="section-title max-w-3xl">
          Built on <span className="serif-accent">my own time</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} wide={projects.length % 2 === 1 && i === projects.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
