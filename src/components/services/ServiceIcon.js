import { AppWindow, Braces, Globe, GraduationCap, LifeBuoy, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = { AppWindow, Braces, Globe, GraduationCap, LifeBuoy, Workflow };

export function ServiceIcon({ name, className }) {
  const Icon = icons[name] ?? Braces;
  return (
    <span
      aria-hidden="true"
      className={cn("grid size-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-accent-300", className)}
    >
      <Icon className="size-5" />
    </span>
  );
}
