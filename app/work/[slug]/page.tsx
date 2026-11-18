import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { CaseStudyArticle } from "@/components/CaseStudyArticle";
import { caseStudies, getCaseStudy } from "@/data/casebook";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.title} | Thomas Crowe`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title, description: study.summary, url: `/work/${study.slug}`, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <Nav />
      <main className="relative z-[2] pt-32 pb-24">
        <CaseStudyArticle study={study} next={next} basePath="/work" backHref="/#casebook" backLabel="Work casebook" />
      </main>
      <Footer />
    </>
  );
}
