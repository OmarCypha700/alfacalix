import { cn } from "@/lib/utils";

/**
 * Eyebrow + heading + lead paragraph. Use `as="h1"` for page heros so each
 * page keeps exactly one H1.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  align = "left",
  tone = "dark",
  size,
  className,
  id,
}) {
  const light = tone === "light";
  const sizeClass = size || (Heading === "h1" ? "text-h1" : "text-h2");
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-5", light && "text-accent-300", align === "center" && "justify-center")}>
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={cn(sizeClass, light && "text-white")}>
        {title}
      </Heading>
      {lead ? (
        <p className={cn("text-lead mt-6", light ? "text-navy-100" : "text-muted")}>{lead}</p>
      ) : null}
    </div>
  );
}
