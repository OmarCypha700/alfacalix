import { cn } from "@/lib/utils";
import { fieldClasses } from "./input";

export function Textarea({ className, ...props }) {
  return (
    <textarea className={cn(fieldClasses, "min-h-40 py-3 leading-relaxed", className)} {...props} />
  );
}
