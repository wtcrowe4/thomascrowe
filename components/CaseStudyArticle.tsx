import Image from "next/image";
import Link from "next/link";
import { Flow } from "@/components/Flow";
import type { CaseStudy } from "@/data/casebook";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-4">{label}</h2>
      {children}
    </section>
  );
}

type Props = {
  study: CaseStudy;
  next?: CaseStudy;
  basePath: string;
  backHref: string;
  backLabel: string;
};

export function CaseStudyArticle({ study, next, basePath, backHref, backLabel }: Props) {
  return (
    <article className="site-container">
      <Link href={backHref} className="font-mono text-[11px] uppercase tracking-wider text-muted2 hover:text-accent transition-colors">
        ← {backLabel}
      </Link>

      <div className="mt-10 font-mono text-[11px] uppercase tracking-widest text-accent">{study.kicker}</div>
      <h1 className="mt-3 section-title max-w-4xl">{study.title}</h1>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted2">{study.summary}</p>

      <div className="mt-10 border border-accent/40 bg-surface p-6">
        <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-2">Outcome</div>
        <p className="max-w-3xl leading-relaxed">{study.outcome}</p>
      </div>

      <div className="max-w-3xl">
        <Block label="Problem">
          <p className="text-lg leading-relaxed text-muted2">{study.problem}</p>
        </Block>
        <Block label="Approach">
          <p className="text-lg leading-relaxed text-muted2">{study.approach}</p>
        </Block>
      </div>

      <Block label="How it fits together">
        <Flow stages={study.flow} />
      </Block>

      {study.shots && study.shots.length > 0 && (
        <Block label="Screens">
          <p className="mb-6 text-sm text-muted2">The real interface, shown with invented demo data.</p>
          <div className="grid grid-cols-1 gap-8">
            {study.shots.map((s) => (
              <figure key={s.src}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1440}
                  height={900}
                  sizes="(max-width: 1280px) 100vw, 1184px"
                  className="w-full h-auto border border-border"
                />
                <figcaption className="mt-2 text-sm text-muted2">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Block>
      )}

      <div className="max-w-3xl">
        <Block label="What I built">
          <ul className="flex flex-col gap-3">
            {study.points.map((p) => (
              <li key={p} className="flex gap-3 leading-relaxed text-muted2">
                <span aria-hidden="true" className="text-accent">▸</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Block>
        <Block label="Stack">
          <div className="flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </Block>
        {study.liveUrl && (
          <p className="mt-10">
            <a href={study.liveUrl} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-wider text-accent hover:opacity-80">
              {study.liveLabel ?? "Live storefront"} ↗
            </a>
          </p>
        )}
      </div>

      {next && next.slug !== study.slug && (
        <div className="mt-16 pt-8 border-t border-border">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Next</div>
          <Link href={`${basePath}/${next.slug}`} className="mt-2 inline-block text-2xl font-medium tracking-tight hover:text-accent transition-colors">
            {next.title} →
          </Link>
        </div>
      )}
    </article>
  );
}
