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
    <section id="how-it-works" className="mx-auto max-w-[1240px] scroll-mt-28 px-6 py-24">
      <SectionHeading
        eyebrow="How it works"
        title="From file to doorstep in five steps"
      />
      <ol className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-14">
        {steps.map((s, i) => (
          <li key={s.title} className="flex w-full flex-col items-center gap-5 text-center sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
            <div className="relative">
              <div className="flex size-24 items-center justify-center rounded-full bg-primary-50 text-[40px] font-extrabold text-primary">
                {i + 1}
              </div>
              <span className="absolute -top-2 -left-3 size-7 rounded-full bg-secondary" />
            </div>
            <div className="flex max-w-[300px] flex-col gap-2">
              <h3 className="text-xl leading-7 font-bold text-ink">{s.title}</h3>
              <p className="text-body text-neutral-700">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
