import Link from "next/link";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { CtaBand } from "@/components/shared/CtaBand";
import { ProductDetail } from "@/components/products/ProductDetail";

export const metadata = buildMetadata({
  title: "Software Products | ClinOva, SIS and DRS | Alfa Calix",
  description:
    "Explore Alfa Calix Technologies software products, including ClinOva for clinical practical assessments, SIS for student information management and DRS for academic document requests.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Products", path: "/products" }]}
        eyebrow="Our software products"
        title="Purpose-Built Software for Modern Institutions"
        lead={
          <p>
            Explore our growing portfolio of software products developed to address specific
            operational and administrative needs. Our solutions focus on simplifying workflows,
            improving information management and supporting more efficient institutional processes.
          </p>
        }
      >
        <nav aria-label="Products on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`#${product.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface px-5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900"
                >
                  {product.name}
                  <span className="ml-2 hidden font-normal text-subtle sm:inline">
                    {product.shortLabel}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Container>
        {products.map((product, index) => (
          <ProductDetail key={product.slug} product={product} index={index} />
        ))}
      </Container>

      <CtaBand
        title="Interested in One of Our Products?"
        text="Get in touch to learn more about how ClinOva, SIS or DRS could support your institution, or to discuss a tailored solution."
        primary={{ label: "Make a Product Enquiry", href: "/contact" }}
        secondary={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
