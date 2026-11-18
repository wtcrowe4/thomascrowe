import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/casebook";
import { builds } from "@/data/builds";

const base = "https://thomascrowe.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base },
    ...caseStudies.map((c) => ({ url: `${base}/work/${c.slug}` })),
    ...builds.map((b) => ({ url: `${base}/projects/${b.slug}` })),
  ];
}
