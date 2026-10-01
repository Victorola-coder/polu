import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Polu - One destination for all prints";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const star =
  "M30.4416 7.72171C31.7294 6.73577 33.5183 6.73577 34.806 7.72171C35.457 8.22007 36.2588 8.48062 37.0784 8.46004C38.6997 8.41932 40.147 9.4708 40.6092 11.0254C40.8429 11.8111 41.3385 12.4933 42.0136 12.9583C43.3492 13.8784 43.902 15.5797 43.3623 17.1091C43.0895 17.8822 43.0895 18.7253 43.3623 19.4984C43.902 21.0278 43.3492 22.7291 42.0136 23.6492C41.3385 24.1142 40.8429 24.7964 40.6092 25.5821C40.147 27.1367 38.6997 28.1882 37.0784 28.1475C36.2588 28.1269 35.457 28.3874 34.806 28.8858C33.5183 29.8717 31.7294 29.8717 30.4416 28.8858C29.7907 28.3874 28.9888 28.1269 28.1693 28.1475C26.548 28.1882 25.1007 27.1367 24.6384 25.5821C24.4048 24.7964 23.9092 24.1142 23.2341 23.6492C21.8984 22.7291 21.3456 21.0278 21.8854 19.4984C22.1582 18.7253 22.1582 17.8822 21.8854 17.1091C21.3456 15.5797 21.8984 13.8784 23.2341 12.9583C23.9092 12.4933 24.4048 11.8111 24.6384 11.0254C25.1007 9.4708 26.548 8.41932 28.1693 8.46004C28.9888 8.48062 29.7907 8.22007 30.4416 7.72171Z";

export default async function OpengraphImage() {
  const dir = join(process.cwd(), "src/app/fonts/athletics");
  const [bold, extrabold, logo] = await Promise.all([
    readFile(join(dir, "athletics-bold.otf")),
    readFile(join(dir, "athletics-extrabold.otf")),
    readFile(join(process.cwd(), "public/images/polu-logo.svg"), "utf8"),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#9f79ff",
          padding: "64px 72px",
          fontFamily: "Athletics",
          position: "relative",
        }}
      >
        <svg
          viewBox="21 6.9 23 23"
          width="520"
          height="520"
          style={{ position: "absolute", right: -120, top: -140 }}
        >
          <path d={star} fill="rgba(255,255,255,0.12)" />
        </svg>
        <svg
          viewBox="21 6.9 23 23"
          width="380"
          height="380"
          style={{ position: "absolute", left: -110, bottom: -170 }}
        >
          <path d={star} fill="rgba(255,255,255,0.12)" />
        </svg>

        <img src={logoSrc} width={186} height={100} alt="" />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            One destination for all your prints
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
            Stickers · Posters · Brochures · Merch
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            top: 96,
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: "#ffbc01",
            border: "2px solid #1e1e1e",
            borderRadius: 16,
            padding: "16px 18px",
            transform: "rotate(6deg)",
            boxShadow: "0 18px 40px -16px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1e1e1e" }}>Event brochure</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1e1e1e" }}>500 pcs</div>
          </div>
          <div
            style={{
              background: "white",
              border: "2px solid #1e1e1e",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              fontWeight: 700,
              color: "#1e1e1e",
            }}
          >
            Place order
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Athletics", data: bold, weight: 700, style: "normal" },
        { name: "Athletics", data: extrabold, weight: 800, style: "normal" },
      ],
    },
  );
}
