import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "./Container";

/** Inner-page header: breadcrumbs, eyebrow, the page's single H1 and a lead. */
export function PageHero({ breadcrumbs, eyebrow, title, lead, children }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-surface pt-10 pb-16 md:pt-14 md:pb-24">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
          <h1 className="text-h1">{title}</h1>
          {lead ? <div className="text-lead mt-6 space-y-4 text-muted">{lead}</div> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
