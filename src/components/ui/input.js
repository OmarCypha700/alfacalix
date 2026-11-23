import { cn } from "@/lib/utils";

export const fieldClasses =
  "block w-full rounded-xl border border-line-strong bg-surface px-4 text-[0.9375rem] text-ink placeholder:text-subtle/80 transition-colors hover:border-navy-300 focus-visible:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent-500/40 aria-[invalid=true]:border-red-600 disabled:opacity-60";

export function Input({ className, ...props }) {
  return <input className={cn(fieldClasses, "h-12", className)} {...props} />;
}
