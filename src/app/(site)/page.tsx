import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PrintTypes } from "@/components/home/print-types";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/site/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PrintTypes />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Cta
        title="Ready to print something great?"
        caption="Create a free account and place your first order in minutes."
        cta="Get started"
        href="/signup"
      />
    </>
  );
}
