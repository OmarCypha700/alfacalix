import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

/** Closing call-to-action band, shared across pages. */
export function CtaBand({
  title = "Let's Build Something That Makes a Difference.",
  text = "Whether you are looking for an existing software solution or need a custom digital platform for your organisation, Alfa Calix Technologies is ready to explore how technology can help.",
  primary = { label: "Start a Conversation", href: "/contact" },
  secondary = { label: "Explore Our Products", href: "/products" },
}) {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-navy-900 py-20 md:py-28">
        <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl"
        />
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="cta-title" className="text-h2 text-white">
              {title}
            </h2>
            <p className="text-lead mx-auto mt-6 max-w-2xl text-navy-100">{text}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={primary.href} variant="accent" size="lg">
                {primary.label}
                <ArrowRight aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5" />
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} variant="outline-dark" size="lg">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
