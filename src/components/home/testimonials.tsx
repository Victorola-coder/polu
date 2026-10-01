import { SectionHeading } from "@/components/site/section-heading";

// placeholder copy: swap in real customer quotes before launch
const quotes = [
  {
    name: "Customer name",
    role: "Event planner",
    rating: 5,
    quote: "Placeholder testimonial. Replace with a real quote from an early Polu customer.",
    color: "bg-secondary",
  },
  {
    name: "Customer name",
    role: "Small business owner",
    rating: 5,
    quote: "Placeholder testimonial. Replace with a real quote about stickers or packaging.",
    color: "bg-primary",
  },
  {
    name: "Customer name",
    role: "Student",
    rating: 4,
    quote: "Placeholder testimonial. Replace with a real quote about posters or delivery speed.",
    color: "bg-[#ff6b3d]",
  },
];

export function Testimonials() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[920px] px-6">
        <SectionHeading eyebrow="Testimonials" title="People love printing with Polu" />
        <ul data-stagger className="mt-10 flex flex-col gap-4 sm:mt-14 sm:gap-6">
          {quotes.map((q, i) => (
            <li key={i} className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-card sm:flex-row sm:gap-5 sm:p-8">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white sm:size-14 sm:text-lg ${q.color}`}
                aria-hidden
              >
                {q.name.split(" ").map((n) => n[0].toUpperCase()).join("")}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-body font-bold text-ink">{q.name}</p>
                  <span className="text-body-sm text-neutral-600">{q.role}</span>
                  <span className="text-secondary" aria-label={`${q.rating} out of 5 stars`}>
                    {"★".repeat(q.rating)}
                    <span className="text-neutral-100">{"★".repeat(5 - q.rating)}</span>
                  </span>
                </div>
                <p className="text-body text-neutral-700 sm:text-lg sm:leading-7">“{q.quote}”</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
