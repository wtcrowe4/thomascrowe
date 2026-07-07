type Project = {
  title: string;
  blurb: string;
  tags: string[];
  link: string | null;
  note?: string;
  flagship: boolean;
};

const projects: Project[] = [
  {
    title: "Sawgrass 17 — 3D Shot Tracers",
    blurb:
      "Broadcast-style shot tracers over the island-green 17th at TPC Sawgrass — a React Three Fiber scene with a 2D overhead heatmap and per-shot stats panel, all in the browser. No game engine. Section preview below; interactive scene landing next.",
    tags: ["Three.js", "React Three Fiber", "Next.js 16", "WebGL"],
    link: "#golf",
    flagship: true,
  },
  {
    title: "TSH — Certificate & Engraving Automation",
    blurb:
      "Node.js/Express automation system built for CalibrationWands: calibration-certificate PDFs with pyHanko cryptographic signing (tamper-evident), engraving SVG automation, and invoice templates. Eliminated ~260 hours of manual certificate production. Runs on Oracle Cloud A1 (ARM) behind a Cloudflare Tunnel.",
    tags: ["Node.js", "Express", "pyHanko", "Oracle Cloud", "Cloudflare"],
    link: null,
    note: "Internal · in production",
    flagship: false,
  },
  {
    title: "CalibrationWands.com",
    blurb:
      "B2B storefront for NIST-traceable metal detector and X-ray test standards — a division of Fastec Services LLC. Full-stack development and technical operations: custom UPS shipping plugin, SKU configurator engine, EPO pricing, Bedrock WordPress, ERPNext v16, and a zero-downtime host migration across Cloudways, DigitalOcean, and Cloudflare.",
    tags: ["WordPress / Bedrock", "WooCommerce", "ERPNext", "PHP", "Infra"],
    link: "https://calibrationwands.com",
    flagship: false,
  },
];

function Card({ p }: { p: Project }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
        {p.link ? (
          <span className="text-muted group-hover:text-accent transition-colors">
            ↗
          </span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted whitespace-nowrap mt-1.5">
            {p.note}
          </span>
        )}
      </div>
      <p className="text-muted text-sm leading-relaxed flex-1">{p.blurb}</p>
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
    </>
  );

  const className = `group bg-bg hover:bg-surface transition-colors p-8 flex flex-col gap-4 min-h-[240px] ${
    p.flagship ? "md:col-span-2" : ""
  }`;

  if (!p.link) {
    return <div className={className}>{inner}</div>;
  }
  return (
    <a
      href={p.link}
      target={p.link.startsWith("http") ? "_blank" : undefined}
      rel={p.link.startsWith("http") ? "noreferrer" : undefined}
      className={className}
    >
      {inner}
    </a>
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
      </div>
    </section>
  );
}
