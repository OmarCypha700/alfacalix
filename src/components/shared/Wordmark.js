import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * The Alfa Calix Technologies logo (horizontal lockup). `tone="light"` is for navy
 * surfaces and uses the dark-background version. Masters: /brand/logo.
 * Falls back to a typographic treatment if no logo file is configured.
 */
export function Wordmark({ tone = "dark", className, preload = false }) {
  const light = tone === "light";
  const logo = light ? company.logoDark || company.logo : company.logo;

  if (logo) {
    return (
      <Image
        src={logo}
        alt={company.brandName}
        width={company.logoSize.width}
        height={company.logoSize.height}
        preload={preload}
        className={cn("h-10 w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className={cn("font-display text-[1.05rem] font-bold tracking-tight", light ? "text-white" : "text-navy-900")}>
        Alfa Calix
      </span>
      <span className={cn("mt-1 text-[0.62rem] font-semibold", light ? "text-accent-300" : "text-accent-700")}>
        Technologies
      </span>
    </span>
  );
}
