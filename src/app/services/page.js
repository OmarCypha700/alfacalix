import Link from "next/link";
import { services } from "@/data/services";
import { buildMetadata, servicesSchema } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { Approach } from "@/components/home/HomeSections";

export const metadata = buildMetadata({
  title: "Software Development Services in Ghana | Alfa Calix Technologies",
  description:
    "Discover software development, web application development, institutional systems, website development, systems integration and technical support services from Alfa Calix Technologies.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Software development services in Ghana"
        title="Digital Solutions Designed Around Your Needs"
        lead={
          <>
            <p>
              Every organisation has unique operational requirements. Alfa Calix Technologies
              provides software development and technology services designed to help organisations
              in Ghana and beyond adopt effective digital solutions.
            </p>
            <p>
              Whether you need a professional website, a custom software application or a platform
              to streamline institutional processes, we work towards delivering solutions that align
              with your objectives.
            </p>
          </>
        }
      >
        <nav aria-label="Services on this page" className="mt-10">
          <ul className="grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`#${service.slug}`}
                  className="flex min-h-11 items-center gap-3 font-medium text-navy-900 underline-offset-4 hover:underline"
                >
                  <span className="font-display text-xs text-subtle tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Container className="py-8 md:py-12">
        {services.map((service, index) => (
          <ServiceDetail key={service.slug} service={service} index={index} />
        ))}
      </Container>

      <Approach tone="surface" />

      <CtaBand
        title="Have a Project in Mind?"
        text="Tell us about your organisation and what you want to achieve. We will be glad to discuss how we can help."
        primary={{ label: "Discuss Your Project", href: "/contact" }}
        secondary={{ label: "Explore Our Products", href: "/products" }}
      />

      <JsonLd data={servicesSchema(services)} />
    </>
  );
}
