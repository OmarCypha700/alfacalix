import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

export const metadata = {
  title: { absolute: "Page Not Found | Alfa Calix Technologies" },
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-36">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
      <Container className="text-center">
        <p className="font-display text-sm font-bold tracking-[0.3em] text-accent-700">ERROR 404</p>
        <h1 className="text-h1 mx-auto mt-6 max-w-2xl">We couldn&apos;t find that page.</h1>
        <p className="text-lead mx-auto mt-6 max-w-xl text-muted">
          The page may have moved or no longer exists. Try one of these instead:
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface px-5 text-sm font-semibold text-navy-900 hover:border-navy-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" size="lg" className="mt-10">
          Back to the homepage
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}
