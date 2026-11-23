import Image from "next/image";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CtaBand } from "@/components/shared/CtaBand";
import { Approach } from "@/components/home/HomeSections";

export const metadata = buildMetadata({
  title: "About Alfa Calix Technologies | Our Mission and Approach",
  description:
    "Learn about Alfa Calix Technologies, a software development and technology solutions brand focused on building practical digital solutions for institutions and businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Alfa Calix Technologies"
        title="Building Technology That Solves Real Problems"
        lead={
          <>
            <p>
              Alfa Calix Technologies is a software development and technology solutions brand
              based in Ghana, focused on building practical digital solutions for institutions,
              businesses and organisations.
            </p>
            <p>
              We believe effective technology should make work easier, improve access to services
              and support better organisational outcomes. Through our proprietary software products
              and tailored development services, we aim to help organisations embrace digital
              solutions that are useful, accessible and sustainable.
            </p>
          </>
        }
      />

      {/* Mission & vision */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: "Our Mission", text: company.mission },
            { label: "Our Vision", text: company.vision },
          ].map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.08}
              className="rounded-[var(--radius-card)] border border-line bg-surface p-8 md:p-10"
            >
              <h2 className="eyebrow">{item.label}</h2>
              <p className="mt-6 font-display text-xl leading-snug font-semibold text-navy-900 md:text-2xl">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section tone="surface" className="border-y border-line">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Our values"
              title="What Guides Our Work"
              lead="The principles behind how we design, build and support software."
            />
          </Reveal>
          <dl className="divide-y divide-line border-y border-line lg:col-span-8">
            {company.values.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 0.05}
                className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8"
              >
                <dt className="font-display text-lg font-bold text-navy-900">{value.title}</dt>
                <dd className="leading-relaxed text-muted">{value.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>

      {/* Philosophy */}
      <Section>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="eyebrow justify-center">Our Philosophy</h2>
          <blockquote className="mt-8">
            <p className="text-h2 font-display text-navy-900">“{company.philosophy}”</p>
          </blockquote>
        </Reveal>
      </Section>

      {/* Optional leadership — renders only when verified profiles are added in company.js */}
      {company.leadership.length ? (
        <Section tone="surface" className="border-y border-line">
          <SectionHeading eyebrow="Leadership" title="The People Behind Alfa Calix" />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {company.leadership.map((person) => (
              <li key={person.name}>
                {person.image ? (
                  <Image
                    src={person.image}
                    alt={`Portrait of ${person.name}`}
                    width={480}
                    height={560}
                    className="aspect-[6/7] w-full rounded-[var(--radius-card)] object-cover"
                  />
                ) : null}
                <h3 className="mt-5 text-lg font-semibold">{person.name}</h3>
                <p className="text-sm text-accent-700">{person.role}</p>
                {person.bio ? <p className="mt-3 leading-relaxed text-muted">{person.bio}</p> : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Approach tone="surface" />

      <CtaBand
        title="Let's Talk About What Your Organisation Needs."
        text="Tell us about the processes you want to improve. We would be glad to explore how our products or a tailored solution could help."
        secondary={{ label: "View Our Services", href: "/services" }}
      />
    </>
  );
}
