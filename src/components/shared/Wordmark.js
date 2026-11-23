import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Temporary typographic brand treatment. When `company.logo` / `company.logoDark`
 * is set, the real logo file is rendered instead.
 */
export function Wordmark({ tone = "dark", className }) {
  const logo = tone === "light" ? company.logoDark || company.logo : company.logo;

  if (logo) {
    return (
      <Image
        src={logo}
        alt={company.brandName}
        width={180}
        height={40}
        className={cn("h-9 w-auto", className)}
        priority
      />
    );
  }

  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-9 place-items-center rounded-[0.7rem] font-display text-[0.95rem] font-bold tracking-tight",
          light ? "bg-white text-navy-900" : "bg-navy-900 text-white",
        )}
      >
        AC
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-accent-400 ring-2",
            light ? "ring-navy-950" : "ring-canvas",
          )}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-bold tracking-tight",
            light ? "text-white" : "text-navy-900",
          )}
        >
          Alfa Calix
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em]",
            light ? "text-accent-300" : "text-accent-700",
          )}
        >
          Technologies
        </span>
      </span>
    </span>
  );
}
