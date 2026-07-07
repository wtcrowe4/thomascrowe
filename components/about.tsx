export default function About() {
  return (
    <section id="about" className="py-32 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-6">
          ◉ ABOUT
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
          One engineer, the whole stack — from the storefront to the GPU.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-12 text-lg text-muted">
          <p>
            I&apos;m the sole technical operator behind CalibrationWands.com, a
            division of Fastec Services LLC selling NIST-traceable test
            standards for metal detectors and X-ray systems. Storefront,
            shipping and pricing logic, ERP, certificate automation,
            infrastructure — if it&apos;s technical, I built it and I keep it
            running.
          </p>
          <p>
            Working solo shapes how I build: small systems, few dependencies,
            automation wherever it pays for itself. Lately most of that
            leverage comes from LLMs — production agents parsing purchase
            orders, open models fine-tuned and served on my own hardware, and
            enough observability to actually trust the output.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-surface/60 p-8 md:p-10">
          <p className="font-mono text-xs tracking-widest text-accent mb-4">
            ◉ AI WORKFLOWS FOR SMALL BUSINESS
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
            I help small and mid-size businesses in Upstate SC adopt practical
            AI workflows.
          </h3>
          <p className="mt-4 text-lg text-muted max-w-3xl">
            The idea is simple: use agentic tools, automation, and AI systems
            to remove repetitive work, speed up decisions, and give smaller
            teams leverage they usually only get from much larger orgs.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-6 text-accent hover:opacity-80 transition-opacity"
          >
            Talk through a workflow idea <span>→</span>
          </a>
        </div>

        <p className="mt-12 font-mono text-xs tracking-widest text-muted">
          BACKGROUND — Full-Stack Web Development, NC State University (2022) ·
          College of Charleston · Clemson University, 2007–2012
        </p>
      </div>
    </section>
  );
}
