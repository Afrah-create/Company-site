import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SlimCyberTech - Building the Future With Code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,198,255,0.15) 0%, transparent 70%)",
            top: -100,
            left: -100,
          }}
        />
        <div
          style={{
            fontSize: 28,
            color: "#888",
            letterSpacing: 6,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          {"</>"}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 900, marginBottom: 16 }}>
          <span style={{ color: "#ffffff" }}>Slim</span>
          <span style={{ color: "#00c6ff" }}>Cyber</span>
          <span style={{ color: "#ffffff" }}>Tech</span>
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#888888",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Building the Future With Code
        </div>
        <div
          style={{
            width: 120,
            height: 3,
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            borderRadius: 2,
            marginBottom: 32,
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 16,
            color: "#555",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Software</span>
          <span style={{ color: "#00c6ff" }}>•</span>
          <span>Development</span>
          <span style={{ color: "#00c6ff" }}>•</span>
          <span>Technology</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "#333",
            letterSpacing: 1,
          }}
        >
          slimcybertech.com
        </div>
      </div>
    ),
    { ...size },
  );
}
