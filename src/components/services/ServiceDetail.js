import { Check } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";

/** Detailed service row for the Services page. */
export function ServiceDetail({ service, index }) {
  const headingId = `${service.slug}-title`;
  return (
    <section
      id={service.slug}
      aria-labelledby={headingId}
      className="grid scroll-mt-24 gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-12 md:py-16"
    >
      <div className="md:col-span-5">
        <div className="flex items-center gap-4">
          <ServiceIcon name={service.icon} />
          <span className="font-display text-sm font-semibold text-subtle tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h2 id={headingId} className="text-h3 mt-6 md:text-[1.75rem] md:leading-tight">
          {service.title}
        </h2>
      </div>
      <div className="md:col-span-7">
        <p className="text-lead text-navy-800">{service.summary}</p>
        <p className="mt-4 leading-relaxed text-muted">{service.detail}</p>
        <h3 className="mt-8 mb-4 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-navy-900">
          A good fit for
        </h3>
        <ul className="space-y-2.5">
          {service.suitedFor.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.9375rem]">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
