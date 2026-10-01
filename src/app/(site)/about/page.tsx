import type { Metadata } from "next";
import { Scallop } from "@/components/home/hero";
import { Cta } from "@/components/site/cta";
import { SectionHeading } from "@/components/site/section-heading";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Polu Technology Limited is revolutionising printing services in Nigeria.",
};

const sides = [
  {
    who: "Customers",
    body: "Students, creators, event planners and small businesses who need prints that look right and arrive on time.",
    tone: "bg-secondary",
  },
  {
    who: "Merchants",
    body: "Local print shops and studios who get a steady stream of well-prepared orders, paid upfront.",
    tone: "bg-primary text-white",
  },
  {
    who: "Delivery riders",
    body: "Riders who pick up finished jobs and get them to doorsteps, on schedules that work for them.",
    tone: "bg-ink text-white",
  },
];

const values = [
  { title: "Quality you can trust", body: "Every file is checked by a real printer before it runs." },
  { title: "Clear pricing", body: "You see the full price, delivery included, before you pay." },
  { title: "Local first", body: "We route orders to printers near you, keeping money in the community." },
  { title: "Always in the loop", body: "Received, on it, done, delivered. You always know where your order is." },
];

const roles = [
  "Product Manager",
  "Front-end Developer",
  "Back-end Engineer",
  "Product Designer",
  "Graphic Designer",
  "Marketing Manager",
  "Social Media Manager",
  "Data Analyst",
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-16 pb-20 sm:pt-24">
        <div className="flex max-w-[860px] flex-col gap-6">
          <span className="self-start rounded-full bg-secondary-200 px-3 py-1 text-body-sm font-bold">
            About Polu
          </span>
          <h1 className="text-[44px] leading-[1.04] font-extrabold tracking-tight text-ink sm:text-[68px]">
            We’re making printing as easy as{" "}
            <span className="relative inline-block text-primary">
              sending a message
              <svg viewBox="0 0 300 12" className="absolute -bottom-4 left-0 w-full" aria-hidden>
                <path d="M2 9c60-6 180-9 296-4" stroke="#ffbc01" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="max-w-[640px] text-lg leading-7 text-neutral-700">
            Polu Technology Limited is revolutionising printing services. One place to upload a
            design, get it checked by a real printer, pay securely and track it all the way to your
            door.
          </p>
        </div>
      </section>

      <section className="px-3 sm:px-6">
        <div className="relative mx-auto grid max-w-[1392px] gap-10 overflow-hidden rounded-[28px] bg-primary px-6 py-16 text-white sm:px-12 lg:grid-cols-2 lg:py-20">
          <Scallop className="absolute -top-20 -right-16 size-80 text-white/10" />
          <h2 className="relative text-[32px] leading-[1.15] font-extrabold sm:text-[44px]">
            Why we started Polu
          </h2>
          <div className="relative flex flex-col gap-4 text-lg leading-7 text-white/85">
            <p>
              Getting something printed usually means calling around, sending files over chat,
              guessing at prices and hoping it’s ready when they said it would be.
            </p>
            <p>
              We built Polu to fix that, by connecting people who need prints with the printers and
              riders who can deliver them, and giving everyone the same clear view of each order.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-24">
        <SectionHeading eyebrow="Who we serve" title="Built for every side of the print" />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {sides.map((s) => (
            <li key={s.who} className={`flex flex-col gap-3 rounded-2xl p-8 ${s.tone}`}>
              <h3 className="text-2xl font-extrabold">{s.who}</h3>
              <p className="text-body opacity-85">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading eyebrow="What we believe" title="Our values" />
          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="flex gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-xl font-extrabold text-primary shadow-card">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl leading-7 font-bold text-ink">{v.title}</h3>
                  <p className="text-body text-neutral-700">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="build" className="mx-auto max-w-[1240px] scroll-mt-28 px-6 py-24">
        <div className="grid items-center gap-10 rounded-[28px] border-2 border-ink p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-5">
            <span className="self-start rounded-full bg-ink px-3 py-1 text-body-sm font-bold text-white">
              Call for builders
            </span>
            <h2 className="text-[32px] leading-[1.15] font-extrabold text-ink sm:text-[44px]">
              Join the Polu <span className="whitespace-nowrap">Build-A-Thon</span>
            </h2>
            <p className="text-lg leading-7 text-neutral-700">
              We’re offering Build-A-Thon opportunities to people who want to help shape the
              future of printing. Full information and applications at polu.ng/build.
            </p>
            <ButtonLink href="https://polu.ng/build" variant="dark" icon="arrow-right" className="self-start">
              Apply now
            </ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <li key={r} className="rounded-full bg-primary-50 px-4 py-2 text-body-sm font-bold text-primary">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta
        title="Got something to print?"
        caption="Create an account and place your first order in minutes."
        cta="Get started"
        href="/signup"
      />
    </>
  );
}
