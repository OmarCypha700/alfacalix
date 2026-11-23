import Link from "next/link";
import { Check } from "lucide-react";
import { ProductPreview } from "./ProductPreview";
import { ProductIcon } from "./ProductIcon";
import { ProductLink } from "./ProductLink";

/** Homepage product card. */
export function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-card transition-[box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:p-6">
      <ProductPreview product={product} />

      <div className="mt-6 flex items-center gap-3">
        <ProductIcon product={product} />
        <div>
          <h3 className="text-h3">{product.name}</h3>
          <p className="text-sm text-subtle">{product.category}</p>
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-muted">{product.summary}</p>

      <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
        {product.highlights.slice(0, 4).map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
        <ProductLink product={product} note={false} />
        <Link
          href={`/products#${product.slug}`}
          className="text-sm font-semibold text-navy-900 underline-offset-4 hover:underline"
        >
          Product details<span className="sr-only"> for {product.fullName}</span>
        </Link>
      </div>
    </article>
  );
}
