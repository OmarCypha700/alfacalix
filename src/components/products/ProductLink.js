import { ArrowUpRight, Clock } from "lucide-react";
import { getProductLink } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * CTA to a product's independently hosted landing page. When no URL is
 * configured it renders a non-interactive "coming soon" state, never a broken link.
 */
export function ProductLink({ product, variant = "primary", size = "md", className, note = true }) {
  const { href, available } = getProductLink(product);

  if (available) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {product.ctaLabel}
        <span className="sr-only"> (opens the {product.name} website in a new tab)</span>
        <ArrowUpRight
          aria-hidden="true"
          className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      </a>
    );
  }

  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <span
        className={cn(
          buttonVariants({ variant: "outline", size }),
          "cursor-default border-dashed text-subtle hover:border-line-strong",
        )}
      >
        <Clock aria-hidden="true" />
        {product.name} site coming soon
      </span>
      {note ? (
        <span className="text-xs text-subtle">
          The {product.name} product page is being prepared. Contact us for details in the meantime.
        </span>
      ) : null}
    </div>
  );
}
