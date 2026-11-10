export default function About() {
  return (
    <section id="about" className="py-32 border-t border-border">
      <div className="site-container">
        <div className="eyebrow">About</div>
        <h2 className="section-title max-w-3xl">
          Software that runs a <span className="serif-accent">real business</span>
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-12 text-lg text-muted2">
          <p>
            I&apos;m a senior software engineer at CalibrationWands.com, a
            division of Fastec Services LLC selling NIST-traceable test
            standards for metal detectors and X-ray systems. I work alongside
            the people who use what I build, find where their day gets stuck,
            and turn that into tools they rely on: the storefront, the
            order-to-manufacturing platform, the accounting and inventory
            integrations, and the infrastructure underneath them.
          </p>
          <p>
            I wear many hats, moving between product, integrations,
            infrastructure and AI agents as the work needs, and I build lean:
            few dependencies, automation wherever it pays for itself. Lately most of that
            leverage comes from LLMs: production agents parsing purchase
            orders, open models fine-tuned and served on self-hosted hardware, and
            enough observability to actually trust the output.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-px bg-border border border-border">
          {[
            ["3,800+", "NIST-traceable certificates auto-generated"],
            ["500+ hrs", "of manual work eliminated per year"],
            ["Zero", "downtime on a live production store migration"],
          ].map(([n, label]) => (
            <div key={n} className="bg-bg p-8">
              <div className="text-3xl md:text-4xl font-semibold tracking-tight text-accent">{n}</div>
              <div className="mt-2 text-sm text-muted2">{label}</div>
            </div>
          ))}
        </div>

        <p className="mt-12 font-mono text-xs tracking-widest text-muted2">
          EDUCATION: NC State University, Software Development (2022) ·
          Clemson University, Computer Engineering · College of Charleston,
          Honors College
        </p>
      </div>
    </section>
  );
}
