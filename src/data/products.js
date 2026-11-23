/**
 * Central product configuration.
 *
 * Landing-page URLs come from environment variables so they can be changed
 * without touching any component. While a URL is empty the site shows a
 * "landing page coming soon" state instead of a link.
 *
 * `image`: leave null to show the illustrative interface sketch. When a real
 * screenshot is available, add it under /public/images/products/<slug>/ and
 * set the path (plus `imageAlt`) here.
 */

const clean = (value) => (typeof value === "string" ? value.trim() : "");

export const products = [
  {
    slug: "clinova",
    name: "ClinOva",
    fullName: "ClinOva",
    category: "Clinical Assessment and Examination Management",
    shortLabel: "Clinical assessment",
    tagline: "Clinical practical examinations, organised end to end.",
    summary:
      "ClinOva is a digital clinical practical assessment and examination management solution designed for nursing and midwifery training institutions. It helps streamline practical examinations, manage assessment workflows, record examiner scores and support a more organised assessment process.",
    description: [
      "Clinical practical examinations involve many moving parts: candidates, stations, procedures, examiners and score sheets that all need to come together accurately. ClinOva brings these into a single digital workflow designed around how nursing and midwifery training institutions run their practical assessments.",
      "Examiners record structured scores digitally, multiple examiners can assess the same candidate, and their scores can be reconciled within the system. Assessment records are kept in one central place, making the examination process easier to coordinate, review and report on.",
    ],
    features: [
      "Digital clinical practical assessments",
      "Structured examiner scoring",
      "Support for multiple examiners",
      "Assessment reconciliation",
      "Centralised assessment records",
      "Improved examination workflow management",
    ],
    highlights: [
      "Digital clinical practical assessments",
      "Structured examiner scoring",
      "Multiple examiners per candidate",
      "Assessment reconciliation",
    ],
    audience: [
      "Nursing and midwifery training institutions",
      "Examination and assessment coordinators",
      "Clinical examiners and assessors",
      "Academic administrators",
    ],
    icon: "ClipboardCheck",
    image: null,
    imageAlt: "",
    url: clean(process.env.NEXT_PUBLIC_CLINOVA_URL),
    ctaLabel: "Explore ClinOva",
  },
  {
    slug: "sis",
    name: "SIS",
    fullName: "Student Information System (SIS)",
    category: "Student and Academic Information Management",
    shortLabel: "Student information",
    tagline: "One place for student records, registration and results.",
    summary:
      "SIS is a student information management platform that helps educational institutions manage essential academic and administrative processes from a centralised digital environment, with dedicated interfaces for students, lecturers and administrators.",
    description: [
      "Student records, course registration and academic results are at the heart of every institution's administration. SIS, our student information system, brings these processes into one centralised platform so information is easier to manage, access and keep consistent.",
      "Students, lecturers and administrators each work through a dedicated portal suited to their role, from registering for courses and viewing results to managing records and overseeing academic information through administrative dashboards.",
    ],
    features: [
      "Student records management",
      "Online course registration",
      "Academic results management",
      "Student and lecturer portals",
      "Administrative dashboards",
      "Institutional academic information management",
    ],
    highlights: [
      "Student records management",
      "Online course registration",
      "Academic results management",
      "Student and lecturer portals",
    ],
    audience: [
      "Universities, colleges and tertiary institutions",
      "Registry and academic affairs offices",
      "Lecturers and heads of department",
      "Students",
    ],
    icon: "GraduationCap",
    image: null,
    imageAlt: "",
    url: clean(process.env.NEXT_PUBLIC_SIS_URL),
    ctaLabel: "Discover SIS",
  },
  {
    slug: "drs",
    name: "DRS",
    fullName: "Document Request System (DRS)",
    category: "Academic Document Request and Processing",
    shortLabel: "Document requests",
    tagline: "Academic document requests, without the queue.",
    summary:
      "DRS is a digital document request platform that enables students and alumni to request academic documents remotely, while helping institutions organise requests, manage processing and facilitate payment through a structured digital workflow.",
    description: [
      "Requesting transcripts, certificates and other academic documents often means travelling to campus, filling in paper forms and following up in person. DRS moves the whole process online, so students and alumni can submit requests remotely, wherever they are.",
      "For institutions, DRS organises incoming requests in one place, supports payment for requested documents and makes it easier to track each request through processing, bringing more structure and visibility to document administration.",
    ],
    features: [
      "Online document requests",
      "Remote application submission",
      "Payment integration",
      "Request tracking and processing",
      "Improved document request administration",
      "Convenient access for students and alumni",
    ],
    highlights: [
      "Online document requests",
      "Remote application submission",
      "Payment integration",
      "Request tracking and processing",
    ],
    audience: [
      "Universities, colleges and training institutions",
      "Registry and records offices",
      "Current students",
      "Alumni",
    ],
    icon: "FileText",
    image: null,
    imageAlt: "",
    url: clean(process.env.NEXT_PUBLIC_DRS_URL),
    ctaLabel: "Explore DRS",
  },
];

/** Returns link state for a product; never returns a broken href. */
export function getProductLink(product) {
  const href = product.url;
  const available = /^https?:\/\//i.test(href);
  return { href: available ? href : null, available };
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
