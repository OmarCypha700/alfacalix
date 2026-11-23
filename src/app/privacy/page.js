import Link from "next/link";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";

/*
 * REVIEW BEFORE PUBLICATION
 * This is a general-purpose starting policy, not legal advice. Have it reviewed
 * (for example against Ghana's Data Protection Act, 2012 (Act 843)) and update
 * `effectiveDate` before launch. If analytics or other cookies are added later,
 * update the "Cookies and analytics" section and add a consent mechanism.
 */
const effectiveDate = "23 November 2026";

export const metadata = buildMetadata({
  title: "Privacy Policy | Alfa Calix Technologies",
  description:
    "Read the Alfa Calix Technologies privacy policy to understand how information submitted through our website is handled.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const { email } = company.contact;
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Privacy Policy", path: "/privacy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        lead={<p>Effective date: {effectiveDate}</p>}
      />

      <Container className="py-16 md:py-24">
        <article className="prose-legal">
          <p>
            This Privacy Policy explains how {company.brandName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) handles information submitted through this website.{" "}
            {company.legalDisclosure}
          </p>

          <h2>Information we collect</h2>
          <p>
            We collect the information you choose to give us when you use the contact form on this
            website:
          </p>
          <ul>
            <li>Your full name and email address</li>
            <li>Your organisation and phone number, if you provide them</li>
            <li>The type of enquiry you select and the content of your message</li>
          </ul>
          <p>
            Like most websites, our hosting provider may also process basic technical information,
            such as IP addresses and browser details, in server logs to deliver and protect the
            website.
          </p>

          <h2>How we use your information</h2>
          <p>We use the information you submit to:</p>
          <ul>
            <li>Respond to your enquiry and communicate with you about it</li>
            <li>Discuss our products, services or a potential project you have asked about</li>
            <li>Keep a record of our correspondence with you</li>
            <li>Protect the website against spam and misuse</li>
          </ul>
          <p>We do not sell your personal information or use it for unrelated marketing.</p>

          <h2>Sharing with third parties</h2>
          <p>
            We share information only with service providers that help us operate this website and
            deliver your messages to us. These include our website hosting provider and our email
            delivery provider (Brevo), which processes contact-form submissions on our behalf so
            they can be delivered to our inbox. We may also disclose information where required by
            law.
          </p>

          <h2>Data security</h2>
          <p>
            We take reasonable technical and organisational measures to protect the information you
            send us, including encrypted (HTTPS) connections to this website and restricted access
            to our email accounts. However, no method of transmission or storage is completely
            secure, and we cannot guarantee absolute security.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep enquiry information for as long as needed to respond to you and manage any
            resulting relationship or project, and for a reasonable period afterwards for record
            keeping. When it is no longer needed, we delete it.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This website does not currently use analytics, advertising or tracking cookies. If we
            introduce such tools in future, we will update this policy and, where required, ask for
            your consent.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You may ask us what personal information we hold about you, ask us to correct it, or
            ask us to delete it. We will respond to reasonable requests in line with applicable law.
          </p>

          <h2>Contact us about your information</h2>
          {email ? (
            <p>
              For any questions or requests about your information, email us at{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ) : (
            <p>
              For any questions or requests about your information, please contact us through our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          )}

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The effective date at the top of
            this page shows when it was last revised.
          </p>
        </article>
      </Container>
    </>
  );
}
