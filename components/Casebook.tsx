import Link from "next/link";
import { caseStudies } from "@/data/casebook";
import { Flow } from "./Flow";

export function Casebook() {
  const [lead, ...rest] = caseStudies;

  return (
    <section id="casebook" className="py-32 border-t border-border">
      <div className="site-container">
        <div className="eyebrow">Work casebook</div>
        <h2 className="section-title max-w-3xl">
          Real systems, <span className="serif-accent">in production</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted2">
          What I build and run at CalibrationWands.com: the problem, the approach
          and the outcome for each system.
        </p>

        <Link
          href={`/work/${lead.slug}`}
          className="group mt-14 block border border-border bg-bg hover:bg-surface transition-colors p-6 sm:p-10"
        >
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Flagship · {lead.kicker}
          </div>
          <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{lead.title}</h3>
          <p className="mt-4 max-w-3xl text-lg text-muted2">{lead.summary}</p>
          <div className="mt-8">
            <Flow stages={lead.flow} />
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text">{lead.outcome}</p>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-accent">
            Read the case study <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Link>

        <div className="mt-px grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-t-0 border-border">
          {rest.map((c, i) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className={`group min-w-0 bg-bg hover:bg-surface transition-colors p-6 sm:p-8 flex flex-col gap-3 ${
                rest.length % 2 === 1 && i === rest.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{c.kicker}</div>
              <h3 className="text-xl font-medium tracking-tight">{c.title}</h3>
              <p className="text-sm leading-relaxed text-muted2 flex-1">{c.summary}</p>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-accent">
                Read <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
