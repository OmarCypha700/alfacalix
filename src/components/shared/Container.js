import { cn } from "@/lib/utils";

export function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)} {...props}>
      {children}
    </Tag>
  );
}

const tones = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  navy: "bg-navy-900 text-white",
};

export function Section({ id, tone = "canvas", className, containerClassName, children, ...props }) {
  return (
    <section id={id} className={cn("py-20 md:py-28", tones[tone], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
