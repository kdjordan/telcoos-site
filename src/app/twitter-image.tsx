import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TelcoOS - One App. Every Carrier. Total Control.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(13, 148, 136, 0.3), transparent)",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 16,
            background: "linear-gradient(135deg, #14b8a6, #0d9488)",
            marginBottom: 32,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <path d="M9 1v3" />
            <path d="M15 1v3" />
            <path d="M9 20v3" />
            <path d="M15 20v3" />
            <path d="M20 9h3" />
            <path d="M20 14h3" />
            <path d="M1 9h3" />
            <path d="M1 14h3" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fafafa",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            TelcoOS
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 24,
            }}
          >
            One App. Every Carrier. Total Control.
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: "#71717a",
              maxWidth: 600,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            AI-powered desktop application for unified telecom operations
          </div>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 999,
            backgroundColor: "rgba(13, 148, 136, 0.1)",
            border: "1px solid rgba(13, 148, 136, 0.2)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#14b8a6",
            }}
          />
          <span style={{ color: "#14b8a6", fontSize: 14 }}>
            Now in Private Beta
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
