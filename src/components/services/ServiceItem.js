import Link from "next/link";
import { ServiceIcon } from "./ServiceIcon";

/** Compact service entry for the homepage grid (no heavy card chrome). */
export function ServiceItem({ service }) {
  return (
    <article className="flex h-full flex-col border-t border-line pt-7">
      <ServiceIcon name={service.icon} />
      <h3 className="text-h3 mt-6">
        <Link
          href={`/services#${service.slug}`}
          className="rounded transition-colors hover:text-accent-700"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{service.summary}</p>
    </article>
  );
}
