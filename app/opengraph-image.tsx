import { ImageResponse } from "next/og";

// Route segment config
export const alt =
  "Right Assets Management — Financial, Real Estate & Legal Services in Bangalore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "10px",
            background: "#C9A84C",
            display: "flex",
          }}
        />

        {/* Top: brand mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "20px",
              background: "#C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: 800,
              color: "#0D2347",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "34px", fontWeight: 800, color: "#FFFFFF" }}>
              Right Assets Management
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "4px",
                color: "#C9A84C",
              }}
            >
              WHERE ASSETS MEET ASSURANCE
            </div>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            Financial, Real Estate &amp; Legal Services in Bangalore
          </div>
          <div style={{ fontSize: "30px", color: "rgba(255,255,255,0.72)" }}>
            48+ expert services — investments, property &amp; legal help under one roof.
          </div>
        </div>

        {/* Bottom: stat chips */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["500+ Clients Served", "10+ Years Experience", "Pan-Bangalore"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#C9A84C",
                  background: "rgba(201,168,76,0.14)",
                  border: "1px solid rgba(201,168,76,0.35)",
                  borderRadius: "999px",
                  padding: "12px 26px",
                }}
              >
                {chip}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
