import Link from "next/link";
import { ArrowRight, Lightbulb, Puzzle, RefreshCw, Users } from "lucide-react";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { ServiceItem } from "@/components/services/ServiceItem";

const arrow = (
  <ArrowRight aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5" />
);

/* ----------------------------- 2. Who we are ----------------------------- */
export function Intro() {
  return (
    <Section tone="surface" className="border-y border-line">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading eyebrow="Who we are" title="Technology Built Around Real-World Needs" />
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
          <p>
            Alfa Calix Technologies is a software development and technology solutions brand in
            Ghana, committed to building practical digital tools that address real organisational
            challenges.
          </p>
          <p>
            We combine software engineering, problem-solving and a user-centred approach to create
            solutions that make everyday processes simpler, faster and more efficient.
          </p>
          <p>
            From specialised institutional software to tailored digital solutions, our focus is on
            building technology that delivers practical value.
          </p>
          <div className="pt-3">
            <ButtonLink href="/about" variant="outline">
              Learn More About Us
              {arrow}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------ 3. Products ------------------------------ */
export function ProductsShowcase() {
  return (
    <Section id="products">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Our products"
          title="Software Solutions Designed for Better Operations"
          lead="We develop purpose-built software products that help institutions modernise processes, improve service delivery and manage essential operations more effectively."
        />
        <Link
          href="/products"
          className="inline-flex shrink-0 items-center gap-2 font-semibold text-navy-900 underline-offset-4 hover:underline"
        >
          View all products
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={index * 0.08} className="h-full">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-subtle">Screens show sample data.</p>
    </Section>
  );
}

/* ------------------------------ 4. Services ------------------------------ */
export function ServicesOverview() {
  return (
    <Section tone="surface" className="border-y border-line">
      <Reveal>
        <SectionHeading
          eyebrow="Our services"
          title="Technology Services That Move Organisations Forward"
          lead="Beyond our proprietary software products, we provide technology services that help organisations identify opportunities, solve operational challenges and build effective digital systems."
        />
      </Reveal>
      <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={(index % 3) * 0.06}>
            <ServiceItem service={service} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14">
        <ButtonLink href="/contact">
          Discuss Your Project
          {arrow}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

/* --------------------------- 5. Why Alfa Calix --------------------------- */
const reasons = [
  {
    title: "Problem-Solving Approach",
    text: "We focus on understanding organisational challenges before designing solutions, ensuring that the technology addresses practical needs.",
    Icon: Lightbulb,
  },
  {
    title: "Purpose-Built Solutions",
    text: "Our products and services are developed with specific operational requirements and user needs in mind.",
    Icon: Puzzle,
  },
  {
    title: "User-Centred Design",
    text: "We prioritise simplicity, accessibility and ease of use so that technology works effectively for the people who depend on it.",
    Icon: Users,
  },
  {
    title: "Continuous Improvement",
    text: "We believe software should evolve with changing needs, and we value ongoing improvement, support and innovation.",
    Icon: RefreshCw,
  },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="px-3 py-3 sm:px-5 sm:py-5">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-navy-900 py-20 text-white md:py-28">
        <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <Reveal className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              id="why-title"
              tone="light"
              eyebrow="Why Alfa Calix Technologies?"
              title="Practical Technology. Purposeful Innovation."
            />
            <p className="text-lead self-end text-navy-100">
              We believe technology should solve problems, not create unnecessary complexity. Our
              approach combines practical thinking, thoughtful design and software engineering to
              deliver solutions that serve real organisational needs.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ title, text, Icon }, index) => (
              <Reveal key={title} delay={index * 0.06} className="bg-navy-900 p-7">
                <Icon aria-hidden="true" className="size-6 text-accent-300" />
                <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-200">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 6. Approach ------------------------------ */
export const approachSteps = [
  {
    title: "Understand",
    text: "We learn about your organisation, its needs and the challenges it wants to solve.",
  },
  {
    title: "Design",
    text: "We develop an appropriate solution concept and define the required functionality.",
  },
  {
    title: "Develop",
    text: "We build, test and refine the solution with attention to quality and usability.",
  },
  {
    title: "Support",
    text: "We provide ongoing technical support and improvements where required.",
  },
];

export function Approach({ tone = "canvas" }) {
  return (
    <Section tone={tone}>
      <Reveal>
        <SectionHeading
          eyebrow="Our approach"
          title="From Challenges to Practical Digital Solutions"
          align="center"
        />
      </Reveal>
      <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <span
          aria-hidden="true"
          className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-line-strong lg:block"
        />
        {approachSteps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 0.08} className="relative text-center">
            <span className="relative mx-auto grid size-12 place-items-center rounded-full border border-line-strong bg-surface font-display text-base font-bold text-navy-900 tabular-nums">
              {index + 1}
            </span>
            <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
            <p className="mx-auto mt-3 max-w-64 leading-relaxed text-muted">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
