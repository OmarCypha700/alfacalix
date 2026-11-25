import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/data/company";

export const alt = `${company.brandName}: ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The logo for dark backgrounds (white symbol and wordmark), 1200 x 298 px.
const logoData = await readFile(join(process.cwd(), "public/logos/alfa-calix-logo-dark-1200.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

/** Site-wide social sharing image (Open Graph and Twitter/X). */
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
          padding: "80px 88px",
          background: "#0b1b33",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> only */}
        <img src={logoSrc} width={520} height={129} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
            Building Intelligent Software.
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, color: "#5fd3df" }}>
            Empowering Institutions.
          </div>
          <div style={{ fontSize: 26, color: "#b3c2db", marginTop: 26 }}>
            Software development &amp; technology solutions · Ghana
          </div>
        </div>
      </div>
    ),
    size,
  );
}
