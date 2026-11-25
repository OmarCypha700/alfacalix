import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mainNav, headerCta } from "@/data/navigation";
import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Wordmark } from "@/components/shared/Wordmark";
import { NavLink } from "./NavLink";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/75">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`${company.brandName} home`} className="rounded-lg">
          <Wordmark preload className="h-9 sm:h-10" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={headerCta.href} size="sm" className="hidden sm:inline-flex">
            {headerCta.label}
            <ArrowRight aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5" />
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
