import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { company, missingCompanyDetails } from "@/data/company";
import { organizationSchema, siteUrl, socialImage, websiteSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/shared/JsonLd";
import { MotionProvider } from "@/components/shared/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const defaultTitle =
  "Alfa Calix Technologies | Software Development & Technology Solutions in Ghana";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: company.description,
  applicationName: company.brandName,
  authors: [{ name: company.brandName }],
  creator: company.brandName,
  publisher: company.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: company.brandName,
    title: defaultTitle,
    description: company.description,
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", images: [socialImage.url] },
  robots: { index: true, follow: true },
  // Add verification tokens after creating Search Console / Bing properties:
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport = {
  themeColor: "#0b1b33",
  width: "device-width",
  initialScale: 1,
};

if (process.env.NODE_ENV === "development") {
  const missing = missingCompanyDetails();
  if (missing.length) {
    console.info(`[alfa-calix] Not configured yet (hidden on the site): ${missing.join(", ")}`);
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
