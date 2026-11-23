import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, Phone } from "lucide-react";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { mainNav, legalNav } from "@/data/navigation";
import { Container } from "@/components/shared/Container";
import { Wordmark } from "@/components/shared/Wordmark";

/** Cached so the static shell can include it; refreshed daily for the new year. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-navy-300">
        {title}
      </h2>
      <ul className="space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

const linkClass = "text-navy-100 transition-colors hover:text-white";

export function Footer() {
  const { email, phone } = company.contact;
  return (
    <footer className="bg-navy-950 text-navy-100">
      <Container className="pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${company.brandName} home`} className="inline-block rounded-lg">
              <Wordmark tone="light" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-navy-200">{company.description}</p>

            {email || phone ? (
              <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                      <Mail aria-hidden="true" className="size-4 text-accent-300" />
                      {email}
                    </a>
                  </li>
                ) : null}
                {phone ? (
                  <li>
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className={`${linkClass} inline-flex items-center gap-2.5`}
                    >
                      <Phone aria-hidden="true" className="size-4 text-accent-300" />
                      {phone}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title="Company">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Products">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={`/products#${product.slug}`} className={linkClass}>
                    {product.fullName}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Services">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        {company.social.length ? (
          <ul aria-label="Social media" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {company.social.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener" className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-navy-300 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              © <CurrentYear /> {company.brandName}. All rights reserved.
            </p>
            <p>{company.legalDisclosure}</p>
          </div>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
