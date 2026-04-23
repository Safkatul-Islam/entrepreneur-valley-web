import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Entrepreneur's Valley — Where Future Founders Meet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(90deg, #003d4d 0%, #0c5a6e 45%, #00c996 100%)",
          color: "#eef7f8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#00c996",
              color: "#002530",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontFamily: "Georgia, serif",
              fontSize: 30,
            }}
          >
            E
          </div>
          <div style={{ fontSize: 22, letterSpacing: 2, opacity: 0.85 }}>
            ENTREPRENEUR&rsquo;S VALLEY · SMC
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 124,
              lineHeight: 0.92,
              letterSpacing: -4,
              fontWeight: 400,
              fontFamily: "Georgia, serif",
            }}
          >
            Where future
            <br />
            founders{" "}
            <span style={{ color: "#eef7f8", fontStyle: "italic" }}>
              meet.
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#eef7f8cc",
              maxWidth: 820,
            }}
          >
            Student-led home for builders. Weekly meetings, workshops, and
            our flagship pitch night — Sharks&rsquo; Valley.
          </div>
        </div>
      </div>
    ),
    size
  );
}
