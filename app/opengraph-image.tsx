import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AutomationsLudwig | Smarta AI-system för B2B-bolag";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "rgba(139,92,246,0.9)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          AutomationsLudwig
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 32,
          }}
        >
          AI-agenter & automatisering för B2B-bolag
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            fontWeight: 300,
          }}
        >
          Från koncept till resultat på 4–6 veckor.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 16,
            color: "rgba(139,92,246,0.7)",
          }}
        >
          automationsludwig.se
        </div>
      </div>
    ),
    { ...size }
  );
}
