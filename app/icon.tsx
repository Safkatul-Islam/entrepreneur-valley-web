import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#003d4d",
          borderRadius: 6,
          color: "#00c996",
          fontFamily: "Georgia, serif",
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        E
      </div>
    ),
    size
  );
}
