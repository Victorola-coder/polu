import type { Metadata } from "next";
import { Cta } from "@/components/site/cta";
import { SectionHeading } from "@/components/site/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Scallop } from "@/components/home/hero";
import { HostStories } from "./host-stories";

export const metadata: Metadata = {
  title: "Become a host",
  description:
    "Own a print shop or ride for deliveries? Join Polu as a host and get a steady stream of print orders.",
  openGraph: { title: "Become a host - Polu", description: "Own a print shop or ride for deliveries? Join Polu as a host and get a steady stream of print orders." },
  twitter: { title: "Become a host - Polu", description: "Own a print shop or ride for deliveries? Join Polu as a host and get a steady stream of print orders." },
};

const benefits = [
  {
    title: "Steady orders",
    body: "Customers near you send jobs straight to your queue. No cold calls, no chasing.",
    icon: "M4 6h16M4 12h16M4 18h10",
  },
  {
    title: "Get paid fast",
    body: "Payments are secured upfront through Paystack or Flutterwave and settled to your account.",
    icon: "M3 7h18v10H3zM3 11h18M7 15h3",
  },
  {
    title: "Set your schedule",
    body: "Accept the jobs and delivery slots that fit your capacity. Pause anytime.",
    icon: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  },
  {
    title: "Tools that help",
    body: "Built-in file checks, customer chat and order tracking keep every job moving.",
    icon: "m4 20 4-1 11-11-3-3L5 16l-1 4ZM14 7l3 3",
  },
];

const faqs = [
  {
    q: "Who can become a host?",
    a: "Print shops and studios with their own equipment can join as merchants. Riders with a bike or car can join to deliver orders.",
  },
  {
    q: "How much does it cost to join?",
    a: "Joining is free. Polu takes a small commission on each completed order, shown clearly before you accept a job.",
  },
  {
    q: "How and when do I get paid?",
    a: "Customers pay upfront. Once an order is marked delivered and confirmed, your earnings are settled to your bank account.",
  },
  {
    q: "What if a customer’s file has a problem?",
    a: "Message the customer from the order page. They approve changes before you print, so nothing runs without a yes.",
  },
];

export default function BecomeAHostPage() {
  return (
    <>
      <section className="px-3 sm:px-6">
        <div className="relative mx-auto grid max-w-[1392px] items-center gap-10 overflow-hidden rounded-[28px] bg-primary p-3 sm:px-12 sm:py-16 lg:py-20 xl:grid-cols-[1fr_1.1fr] xl:py-24">
          <Scallop className="absolute -right-24 -bottom-40 size-[460px] text-white/10" />

          <div className="relative flex max-w-[680px] flex-col gap-6 rounded-[20px] bg-white p-6 shadow-card sm:p-10 xl:max-w-none">
            <span className="self-start rounded-full bg-secondary-200 px-3 py-1 text-body-sm font-bold">
              For printers & riders
            </span>
            <h1 className="text-[34px] leading-[1.08] font-extrabold tracking-tight text-ink sm:text-[48px] lg:text-[56px]">
              Turn your press into a busy one
            </h1>
            <p className="text-body text-neutral-700 sm:text-lg sm:leading-7">
              Join Polu as a merchant or delivery rider. We bring the customers, the payments and
              the tracking. You do what you do best.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" icon="arrow-right">
                Become a host
              </ButtonLink>
              <ButtonLink href="#faq" variant="ghost" className="px-10">
                Read the FAQs
              </ButtonLink>
            </div>
          </div>

          <div className="relative hidden xl:block">
            <QueueMock />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Why host with Polu"
          title="Everything you need to grow"
        />
        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {benefits.map((b) => (
            <li key={b.title} className="flex flex-col gap-4 rounded-2xl border border-neutral-100 p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={b.icon} />
                </svg>
              </span>
              <h3 className="text-xl leading-7 font-bold text-ink">{b.title}</h3>
              <p className="text-body text-neutral-700">{b.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <HostStories />

      <section id="faq" className="mx-auto max-w-[1240px] scroll-mt-28 px-6 py-16 sm:py-24">
        <SectionHeading align="left" eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-neutral-100 border-l-4 border-l-ink bg-white open:border-l-primary"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-body font-bold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl leading-none font-normal transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-body text-neutral-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Cta
        title="Ready to become a host?"
        caption="Sign up, pick merchant or delivery rider, and start taking orders this week."
        cta="Become a host"
        href="/signup"
      />
    </>
  );
}

function QueueMock() {
  const jobs = [
    { name: "Event brochure", qty: "500 pcs", price: "₦62,000", tag: "New", tone: "bg-secondary" },
    { name: "Die-cut stickers", qty: "1,000 pcs", price: "₦45,500", tag: "Approved", tone: "bg-success-50 text-success" },
    { name: "A2 posters", qty: "40 pcs", price: "₦28,000", tag: "Printing", tone: "bg-primary-50 text-primary" },
  ];
  return (
    <div className="ml-auto w-full max-w-[460px] rotate-2 rounded-2xl bg-white p-6 shadow-card">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-body-sm text-neutral-600">This week</p>
          <p className="text-[32px] leading-10 font-extrabold text-ink">₦135,500</p>
        </div>
        <span className="rounded-full bg-success-50 px-3 py-1 text-body-sm font-bold text-success">+24%</span>
      </div>
      <ul className="flex flex-col gap-3">
        {jobs.map((j) => (
          <li key={j.name} className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3">
            <div className="size-10 rounded-lg bg-secondary-200" />
            <div className="flex-1">
              <p className="text-body font-bold text-ink">{j.name}</p>
              <p className="text-body-sm text-neutral-600">
                {j.qty} · {j.price}
              </p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${j.tone}`}>{j.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
