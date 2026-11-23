import { ClipboardCheck, FileText, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = { ClipboardCheck, FileText, GraduationCap };

/** Small product identity mark, kept visually distinct from the corporate wordmark. */
export function ProductIcon({ product, className }) {
  const Icon = icons[product.icon] ?? FileText;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl border border-accent-200 bg-accent-50 text-accent-700",
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}
