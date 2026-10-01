import { SectionHeading } from "@/components/site/section-heading";

const steps = [
  { title: "Choose a product", body: "Stickers, posters, brochures or merch. Pick what you need." },
  { title: "Upload your design", body: "Add your artwork, or start from one of our templates." },
  { title: "Customise it", body: "Set the size, material, finish and how many copies." },
  { title: "Approve & pay", body: "Your printer checks the file, you confirm and pay with Paystack or Flutterwave." },
  { title: "Track & receive", body: "Follow each stage live, then confirm delivery and rate your printer." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1240px] scroll-mt-28 px-6 py-16 sm:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="From file to doorstep in five steps"
      />
      <ol data-pop className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-14">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex w-full items-start gap-5 sm:w-[calc(50%-1rem)] sm:flex-col sm:items-center sm:text-center lg:w-[calc(33.333%-1.5rem)]"
          >
            <div className="relative shrink-0">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary-50 text-[28px] font-extrabold text-primary sm:size-24 sm:text-[40px]">
                {i + 1}
              </div>
              <span className="absolute -top-1 -left-2 size-5 rounded-full bg-secondary sm:-top-2 sm:-left-3 sm:size-7" />
            </div>
            <div className="flex max-w-[300px] flex-col gap-1 pt-2 sm:gap-2 sm:pt-0">
              <h3 className="text-xl leading-7 font-bold text-ink">{s.title}</h3>
              <p className="text-body text-neutral-700">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
