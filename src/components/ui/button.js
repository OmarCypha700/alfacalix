import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** shadcn/ui-style button variants, shared by <Button> and <ButtonLink>. */
export const buttonVariants = cva(
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-navy-900 text-white shadow-[0_1px_0_rgb(255_255_255/0.08)_inset] hover:bg-navy-700",
        accent: "bg-accent-300 text-navy-950 hover:bg-accent-200",
        outline:
          "border border-line-strong bg-surface text-navy-900 hover:border-navy-900",
        "outline-dark":
          "border border-white/25 text-white hover:border-white hover:bg-white/5",
        ghost: "text-navy-900 hover:bg-navy-50",
        link: "min-h-0 rounded-none px-0 text-navy-900 underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-4 text-sm",
        md: "px-6 text-[0.9375rem]",
        lg: "min-h-13 px-7 text-base",
      },
    },
    compoundVariants: [{ variant: "link", className: "px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({ className, variant, size, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/** Internal links use next/link; external links open in a new tab safely. */
export function ButtonLink({ href, className, variant, size, external, children, ...props }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
