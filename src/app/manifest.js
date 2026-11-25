import { company } from "@/data/company";

/** Web app manifest: name, theme colour and the brand icons (served at /manifest.webmanifest). */
export default function manifest() {
  return {
    name: company.brandName,
    short_name: company.shortName,
    description: company.description,
    start_url: "/",
    display: "browser",
    theme_color: "#0b1b33",
    background_color: "#0b1b33",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
