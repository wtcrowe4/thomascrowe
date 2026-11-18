import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/data/casebook";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Thomas Crowe work casebook";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const title = study?.title ?? "Work casebook";
  const kicker = study?.kicker ?? "";
  const summary = study?.summary ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          background: "radial-gradient(ellipse 100% 80% at 30% 110%, #0a1f3a 0%, #050f1f 60%, #03070f 100%)",
          color: "#e8eef8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#fb923c",
              fontSize: 22,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#fb923c" }} />
            Work casebook · {kicker}
          </div>
          <div style={{ fontSize: title.length > 32 ? 68 : 84, fontWeight: 700, letterSpacing: -3, marginTop: 28, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, color: "rgba(232,238,248,0.78)", marginTop: 26, maxWidth: 1000, lineHeight: 1.4 }}>
            {summary.length > 170 ? `${summary.slice(0, 167).trimEnd()}…` : summary}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(232,238,248,0.5)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div>Thomas Crowe · Senior Software Engineer</div>
          <div style={{ color: "#fb923c" }}>thomascrowe.netlify.app</div>
        </div>
      </div>
    ),
    size
  );
}
