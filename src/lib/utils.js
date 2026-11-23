import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom type-scale utilities in globals.css,
// so `text-h2` is treated as a font size and not as a text colour.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "lead"] }],
    },
  },
});

/** Merge Tailwind class names (shadcn/ui convention). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
