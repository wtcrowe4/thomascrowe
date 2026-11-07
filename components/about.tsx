export default function About() {
  return (
    <section id="about" className="py-32 border-t border-border">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="font-mono text-xs tracking-widest text-accent mb-6">
          ◉ ABOUT
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
          Software that runs a real business.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-12 text-lg text-muted">
          <p>
            I&apos;m the full-stack developer and technical operations lead
            for CalibrationWands.com, a division of Fastec Services LLC selling
            NIST-traceable test standards for metal detectors and X-ray
            systems. I build and run the storefront, the order-to-manufacturing
            platform, the accounting and inventory integrations, and the
            infrastructure underneath them.
          </p>
          <p>
            Before engineering I spent eight years running a high-volume
            business, so I build with the operator&apos;s problem in mind: lean systems,
            few dependencies, automation wherever it pays for itself. Lately most of that
            leverage comes from LLMs — production agents parsing purchase
            orders, open models fine-tuned and served on self-hosted hardware, and
            enough observability to actually trust the output.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {[
            ["3,800+", "NIST-traceable certificates auto-generated"],
            ["~450 hrs", "of manual document work eliminated"],
            ["Zero", "downtime on a live production store migration"],
          ].map(([n, label]) => (
            <div key={n} className="bg-bg p-8">
              <div className="text-3xl md:text-4xl font-semibold tracking-tight text-accent">{n}</div>
              <div className="mt-2 text-sm text-muted">{label}</div>
            </div>
          ))}
        </div>

        <p className="mt-12 font-mono text-xs tracking-widest text-muted">
          EDUCATION — NC State University, Software Development (2022) ·
          Clemson University, Computer Engineering · College of Charleston,
          Honors College
        </p>
      </div>
    </section>
  );
}
