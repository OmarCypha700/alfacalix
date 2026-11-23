import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldClasses } from "./input";

/** Styled native <select>: accessible, keyboard- and mobile-friendly by default. */
export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select className={cn(fieldClasses, "h-12 appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-subtle"
      />
    </div>
  );
}
