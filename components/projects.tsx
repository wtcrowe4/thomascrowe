const projects = [
  {
    title: "Sawgrass 17 — Shot Tracer Viz",
    blurb:
      "Browser-native broadcast-style shot tracers + Gaussian-heatmap minimap over the 17th at TPC Sawgrass. The piece you just scrolled past.",
    tags: ["Three.js", "R3F", "DataGolf", "Canvas"],
    link: "#golf",
  },
  {
    title: "Unity Golf — YouTube Build",
    blurb:
      "Ongoing Unity project pairing Google Maps Photorealistic 3D Tiles with playable hole logic for a YouTube series.",
    tags: ["Unity", "Google Maps API", "C#"],
    link: "#",
  },
  {
    title: "Calibration Workflow Tools",
    blurb:
      "Internal pipelines that turn raw metrology logs into cert-ready reports — shaving hours off every batch.",
    tags: ["Python", "Pandas", "Automation"],
    link: "#",
  },
  {
    title: "AI Caddie (planned)",
    blurb:
      "Claude-powered club-selection caddie. Ingests lie, distance, wind, personal dispersion — returns a recommendation and a reason.",
    tags: ["Claude API", "Next.js", "Edge"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-6">
          ◉ SELECTED WORK
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
          A few things worth pointing at.
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.link}
              className="group bg-bg hover:bg-surface transition-colors p-8 flex flex-col gap-4 min-h-[240px]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight">
                  {p.title}
                </h3>
                <span className="text-muted group-hover:text-accent transition-colors">
                  ↗
                </span>
              </div>
              <p className="text-muted text-sm leading-relaxed flex-1">
                {p.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-surface border border-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
