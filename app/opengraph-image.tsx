import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Thomas Crowe — Full-Stack Developer & LLM Engineer";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background:
            "radial-gradient(ellipse 100% 80% at 30% 110%, #0a1f3a 0%, #050f1f 60%, #03070f 100%)",
          color: "#e8eef8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#fb923c",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#fb923c",
            }}
          />
          Full-Stack Developer · LLM &amp; Agent Engineering
        </div>
        <div
          style={{
            fontSize: 118,
            fontWeight: 700,
            letterSpacing: -4,
            marginTop: 28,
          }}
        >
          Thomas Crowe
        </div>
        <div
          style={{
            fontSize: 30,
            color: "rgba(232,238,248,0.78)",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Production LLM agents, e-commerce infrastructure, and browser-native
          3D — from the storefront to the GPU.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 72,
            fontSize: 20,
            color: "rgba(232,238,248,0.5)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div>Greenville, SC</div>
          <div style={{ color: "#fb923c" }}>34.8526° N · 82.3940° W</div>
        </div>
      </div>
    ),
    size
  );
}
