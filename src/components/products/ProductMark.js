import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The product's own icon (kept distinct from the Alfa Calix wordmark).
 * Products without an icon get a plain text monogram. Size with `className`
 * (default `size-11`).
 */
export function ProductMark({ product, className }) {
  if (product.mark?.src) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface outline-1 -outline-offset-1 outline-navy-900/10",
          className,
        )}
      >
        <Image src={product.mark.src} alt="" width={96} height={96} className="h-full w-full object-contain" />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-navy-50 font-display text-[0.8rem] font-bold text-navy-900 outline-1 -outline-offset-1 outline-navy-900/10",
        className,
      )}
    >
      {product.name}
    </span>
  );
}
