import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_70%)]"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-6">Software products &amp; solutions · Ghana</p>
          <h1 className="text-display">
            Intelligent Software.{" "}
            <span className="text-accent-700">Meaningful Impact.</span>
          </h1>
          <p className="text-lead mt-7 max-w-xl text-muted">
            At Alfa Calix Technologies, we design and develop practical software solutions that help
            institutions and businesses simplify operations, improve efficiency and embrace digital
            transformation.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/products" size="lg">
              Explore Our Solutions
              <ArrowRight aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Work With Us
            </ButtonLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
