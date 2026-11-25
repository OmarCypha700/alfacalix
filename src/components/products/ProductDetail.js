import { Check } from "lucide-react";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";
import { ProductDetailScreens } from "./ProductScreens";
import { ProductMark } from "./ProductMark";
import { ProductLink } from "./ProductLink";

const listHeading = "mb-4 font-sans text-base font-semibold text-navy-900";

/** Detailed product section for the Products page. */
export function ProductDetail({ product, index }) {
  const reversed = index % 2 === 1;
  const headingId = `${product.slug}-title`;
  return (
    <section
      id={product.slug}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 py-16 md:py-24", index > 0 && "border-t border-line")}
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {index === 0 ? (
          <div className="lg:sticky lg:top-28">
            <ProductDetailScreens product={product} preload />
          </div>
        ) : (
          <Reveal className={cn("lg:sticky lg:top-28", reversed && "lg:order-2")}>
            <ProductDetailScreens product={product} />
          </Reveal>
        )}

        <div>
          <div className="flex items-center gap-3">
            <ProductMark product={product} />
            <p className="text-[0.9375rem] font-medium text-accent-700">{product.category}</p>
          </div>
          <h2 id={headingId} className="text-h2 mt-5">
            {product.fullName}
          </h2>
          <p className="text-lead mt-3 font-medium text-navy-700">{product.tagline}</p>

          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {product.description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className={listHeading}>
                Key features
              </h3>
              <ul className="space-y-2.5 text-[0.9375rem]">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={listHeading}>
                Designed for
              </h3>
              <ul className="space-y-2.5 text-[0.9375rem]">
                {product.audience.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-navy-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <ProductLink product={product} size="lg" />
          </div>
          <p className="mt-6 text-sm text-subtle">
            Developed and powered by {company.brandName}. Screens show sample data.
          </p>
        </div>
      </div>
    </section>
  );
}
