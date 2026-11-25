import { Mail, Phone } from "lucide-react";
import { company } from "@/data/company";
import { productList } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = buildMetadata({
  title: "Contact Alfa Calix Technologies | Software Solutions and Development",
  description:
    "Contact Alfa Calix Technologies to discuss custom software development, institutional software solutions, website development and technology projects.",
  path: "/contact",
});

const topics = [
  `Our software products: ${productList()}`,
  "Custom software and web application development",
  "Institutional systems and website projects",
  "Technical support and partnerships",
];

export default function ContactPage() {
  const { email, phone } = company.contact;
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact us"
        title="Let's Discuss Your Project"
        lead={
          <>
            <p>
              Have a project in mind, need a software solution or want to explore how technology
              can improve your organisation&apos;s operations?
            </p>
            <p>
              Get in touch with Alfa Calix Technologies. We would be glad to learn about your
              requirements and discuss possible solutions.
            </p>
          </>
        }
      />

      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ContactForm fallbackEmail={email} />
        </div>

        <aside aria-labelledby="contact-aside-title" className="lg:col-span-5">
          <h2 id="contact-aside-title" className="text-h3">
            How we can help
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Whether you are an institution, a business or a potential partner, you can reach us
            about:
          </p>
          <ul className="mt-6 space-y-3">
            {topics.map((topic) => (
              <li key={topic} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent-600" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>

          {email || phone ? (
            <div className="mt-10 rounded-[var(--radius-card)] border border-line bg-surface p-7">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-navy-900">
                Contact details
              </h3>
              <ul className="mt-5 space-y-4">
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className="flex items-center gap-3 font-medium text-navy-900 hover:text-accent-700">
                      <span className="grid size-10 place-items-center rounded-full bg-navy-50">
                        <Mail aria-hidden="true" className="size-4" />
                      </span>
                      {email}
                    </a>
                  </li>
                ) : null}
                {phone ? (
                  <li>
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-3 font-medium text-navy-900 hover:text-accent-700"
                    >
                      <span className="grid size-10 place-items-center rounded-full bg-navy-50">
                        <Phone aria-hidden="true" className="size-4" />
                      </span>
                      {phone}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}

          {company.social.length ? (
            <div className="mt-8">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-navy-900">
                Follow us
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {company.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium hover:border-navy-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </Container>
    </>
  );
}
