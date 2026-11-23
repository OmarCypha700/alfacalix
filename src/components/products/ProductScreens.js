import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Real product screenshots, taken with sample data (see products.js).
 * Framed with the site's radius and a faint ink outline only: no drawn
 * browser bars or device frames.
 */

const frame =
  "overflow-hidden rounded-xl bg-surface outline-1 -outline-offset-1 outline-navy-900/10";

/** Square phone crop used on the homepage product cards. */
export function ProductCardScreen({ product, className }) {
  const shot = product.screens.card;
  return (
    <div className={cn(frame, "aspect-square bg-canvas", className)}>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, 90vw"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

/** Desktop screen with the phone screen set over its lower corner (Products page). */
export function ProductDetailScreens({ product, priority = false, className }) {
  const { desktop, phone } = product.screens;
  return (
    <div className={cn("relative pb-[12%] pr-[6%]", className)}>
      <div className={cn(frame, "shadow-card")}>
        <Image
          src={desktop.src}
          alt={desktop.alt}
          width={desktop.width}
          height={desktop.height}
          sizes="(min-width: 1200px) 560px, (min-width: 1024px) 46vw, 94vw"
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <div
        className={cn(
          frame,
          "absolute right-0 bottom-0 aspect-[9/16] w-[30%] rounded-2xl shadow-lift sm:w-[26%]",
        )}
      >
        <Image
          src={phone.src}
          alt={phone.alt}
          width={phone.width}
          height={phone.height}
          sizes="(min-width: 1024px) 160px, 30vw"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
