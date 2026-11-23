import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Approach, Intro, ProductsShowcase, ServicesOverview, WhyUs } from "@/components/home/HomeSections";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata = buildMetadata({
  title: "Alfa Calix Technologies | Software Development & Technology Solutions in Ghana",
  description:
    "Alfa Calix Technologies develops practical software products and provides custom software development, web applications and technology solutions for institutions and businesses in Ghana.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ProductsShowcase />
      <ServicesOverview />
      <WhyUs />
      <Approach />
      <CtaBand />
    </>
  );
}
