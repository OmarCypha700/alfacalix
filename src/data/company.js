/**
 * Central company configuration.
 *
 * Contact details and social links come from environment variables and are
 * EMPTY by default. Anything left empty is simply not shown on the site and is
 * left out of structured data. Never hard-code unverified details here.
 * See .env.example for the full list.
 */

const clean = (value) => (typeof value === "string" ? value.trim() : "");

function resolveSiteUrl() {
  const fromEnv =
    clean(process.env.NEXT_PUBLIC_SITE_URL) ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "");
  return (fromEnv || "http://localhost:3000").replace(/\/+$/, "");
}

export const company = {
  brandName: "Alfa Calix Technologies",
  shortName: "Alfa Calix",
  legalName: "Alfa Calix Enterprise",
  legalDisclosure:
    "Alfa Calix Technologies is a technology brand operated by Alfa Calix Enterprise.",
  tagline: "Building Intelligent Software. Empowering Institutions.",
  supportingStatement:
    "Technology solutions designed to simplify processes, improve efficiency and support institutional growth.",
  description:
    "Alfa Calix Technologies develops practical software products and technology solutions that help institutions and businesses simplify operations, improve efficiency and embrace digital transformation.",
  country: "Ghana",
  siteUrl: resolveSiteUrl(),

  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  },

  /** Only links with a value are rendered. */
  social: [
    { label: "LinkedIn", href: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
    { label: "X (Twitter)", href: clean(process.env.NEXT_PUBLIC_SOCIAL_X) },
    { label: "Facebook", href: clean(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
    { label: "Instagram", href: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
    { label: "GitHub", href: clean(process.env.NEXT_PUBLIC_SOCIAL_GITHUB) },
  ].filter((item) => item.href),

  /**
   * Logo files. Leave as null to use the typographic wordmark.
   * To use a real logo, add it to /public/logos and set the path, e.g.
   * "/logos/alfa-calix-logo.svg". Set `logoDark` for use on navy surfaces.
   */
  logo: null,
  logoDark: null,

  /** Date the site content was last reviewed; used by the sitemap. */
  lastUpdated: "2026-11-23",

  mission:
    "To develop practical, innovative and accessible software solutions that empower institutions and businesses to improve efficiency, simplify processes and achieve their objectives.",
  vision:
    "To become a trusted technology solutions brand recognised for developing impactful software products and delivering dependable digital solutions across Africa and beyond.",
  philosophy:
    "Technology should be purposeful, accessible and useful. We are committed to creating solutions that simplify complex processes and help organisations work better.",

  values: [
    {
      title: "Innovation",
      text: "Continuously exploring better ways to solve problems.",
    },
    {
      title: "Integrity",
      text: "Building trust through professionalism, transparency and accountability.",
    },
    {
      title: "Excellence",
      text: "Maintaining high standards in design, development and service delivery.",
    },
    {
      title: "Practicality",
      text: "Prioritising solutions that address real-world needs.",
    },
    {
      title: "User Focus",
      text: "Designing technology around the people who use it.",
    },
  ],

  /**
   * Optional leadership profiles for the About page. The section is hidden
   * while this is empty. Only add verified information, for example:
   * { name: "", role: "", bio: "", image: "/images/team/name.webp" }
   */
  leadership: [],
};

/** Which contact details are still missing (used for a dev-only reminder). */
export function missingCompanyDetails() {
  const missing = [];
  if (!clean(process.env.NEXT_PUBLIC_SITE_URL)) missing.push("NEXT_PUBLIC_SITE_URL");
  if (!company.contact.email) missing.push("NEXT_PUBLIC_CONTACT_EMAIL");
  if (!company.contact.phone) missing.push("NEXT_PUBLIC_CONTACT_PHONE");
  if (company.social.length === 0) missing.push("NEXT_PUBLIC_SOCIAL_*");
  return missing;
}
