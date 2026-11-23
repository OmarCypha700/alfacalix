import { cn } from "@/lib/utils";

export function Label({ className, htmlFor, children, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-2 block text-sm font-semibold text-navy-900", className)}
      {...props}
    >
      {children}
    </label>
  );
}
