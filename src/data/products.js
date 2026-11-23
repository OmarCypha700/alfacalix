/**
 * Central product configuration.
 *
 * Landing-page URLs come from environment variables so they can be changed
 * without touching any component. While a URL is empty the site shows a
 * "landing page coming soon" state instead of a link.
 *
 * `mark`: the product's own icon (null shows a text monogram).
 * `screens`: real screenshots of each product, taken with sample data, in
 * /public/images/products/<slug>/. `card` is a square crop for the homepage;
 * `desktop` and `phone` appear together on the Products page. To replace one,
 * overwrite the file (same size) or change the path, width and height here.
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
    mark: { src: "/images/products/clinova/clinova-mark.png" },
    screens: {
      card: {
        src: "/images/products/clinova/clinova-scoring-card.webp",
        alt: "ClinOva on a phone: an examiner scoring a student's intramuscular medication procedure, 9 of 23 steps saved",
        width: 780,
        height: 780,
      },
      desktop: {
        src: "/images/products/clinova/clinova-student-procedures.webp",
        alt: "ClinOva's Student Procedures view: each assessment with both examiners' scores, status and reconciliation",
        width: 2000,
        height: 1250,
      },
      phone: {
        src: "/images/products/clinova/clinova-reconciliation-phone.webp",
        alt: "ClinOva's score reconciliation screen on a phone, showing Examiner A and Examiner B side by side",
        width: 780,
        height: 1507,
      },
    },
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
    mark: null,
    screens: {
      card: {
        src: "/images/products/sis/sis-student-results-card.webp",
        alt: "SIS student portal on a phone: cumulative GPA, credits earned and academic standing",
        width: 780,
        height: 780,
      },
      desktop: {
        src: "/images/products/sis/sis-admin-dashboard.webp",
        alt: "SIS administrator dashboard: active students, registrations, course offerings, students by programme and outstanding work",
        width: 2000,
        height: 1250,
      },
      phone: {
        src: "/images/products/sis/sis-course-registration-phone.webp",
        alt: "SIS course registration on a phone, with compulsory courses selected and the credit total",
        width: 780,
        height: 1688,
      },
    },
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
    mark: { src: "/images/products/drs/drs-mark.png" },
    screens: {
      card: {
        src: "/images/products/drs/drs-applicant-requests-card.webp",
        alt: "DRS on a phone: an applicant's document requests marked Submitted, Under Review and Ready",
        width: 780,
        height: 780,
      },
      desktop: {
        src: "/images/products/drs/drs-registry-queue.webp",
        alt: "DRS registry queue: document requests with applicant, status, payment, delivery method and total",
        width: 2000,
        height: 1250,
      },
      phone: {
        src: "/images/products/drs/drs-applicant-requests-phone.webp",
        alt: "DRS applicant view on a phone, listing requests and their status",
        width: 780,
        height: 1688,
      },
    },
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
