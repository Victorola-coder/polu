import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/cn";

const features = [
  {
    title: "Upload any design",
    body: "Drop in a PDF, PNG, AI or Canva export. We check resolution and bleed for you before anything goes to print.",
    visual: <UploadMock />,
  },
  {
    title: "Customise every detail",
    body: "Pick a preset size or set your own, then choose the material and finish. Prices update as you go, no surprises.",
    visual: <CustomiseMock />,
  },
  {
    title: "Real printers check your work",
    body: "A vetted printer reviews your file and messages you if anything needs a tweak. You approve before a single sheet runs.",
    visual: <ChatMock />,
  },
  {
    title: "Track it to your door",
    body: "Choose Polu delivery, standard in 2–3 days or express in 24 hours, or arrange your own pickup. Follow every stage live.",
    visual: <TrackMock />,
  },
];

export function Features() {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading
          eyebrow="Features"
          title="Printing without the back and forth"
          caption="Everything you’d normally chase a print shop for, in one place."
        />
        <div className="mt-16 flex flex-col gap-16 lg:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-20",
                i % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="flex aspect-[1.6] items-center justify-center overflow-hidden rounded-2xl bg-primary p-8">
                {f.visual}
              </div>
              <div className="flex max-w-[460px] flex-col gap-3">
                <span className="text-body font-bold text-primary">0{i + 1}</span>
                <h3 className="text-[28px] leading-9 font-extrabold text-ink">{f.title}</h3>
                <p className="text-lg leading-7 text-neutral-700">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const card = "w-full max-w-[380px] rounded-xl bg-white p-6 shadow-card";

function UploadMock() {
  return (
    <div className={cn(card, "-rotate-2")}>
      <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-primary/50 bg-primary-50 px-4 py-8 text-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9f79ff" strokeWidth="1.8" aria-hidden>
          <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-body font-bold text-ink">Drop your design here</p>
        <p className="text-xs text-neutral-600">PDF, PNG, AI, SVG up to 50MB</p>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-neutral-50 p-3">
        <div className="size-9 rounded bg-secondary" />
        <div className="flex-1">
          <p className="text-body-sm font-bold text-ink">launch-poster.pdf</p>
          <div className="mt-1.5 h-1.5 rounded bg-neutral-100">
            <div className="h-full w-3/4 rounded bg-success" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomiseMock() {
  const row = (label: string, options: string[], active: number) => (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold text-neutral-700 uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <span
            key={o}
            className={cn(
              "rounded-full border px-3 py-1.5 text-body-sm",
              i === active ? "border-primary bg-primary text-white" : "border-neutral-100 text-ink",
            )}
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className={cn(card, "flex rotate-1 flex-col gap-4")}>
      {row("Size", ["A4", "A3", "A2", "Custom"], 1)}
      {row("Material", ["Paper", "Vinyl", "Card"], 0)}
      {row("Finish", ["Matte", "Glossy"], 0)}
      <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-body-sm text-neutral-700">x 50 copies</span>
        <span className="text-xl font-extrabold text-ink">₦18,500</span>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className={cn(card, "flex -rotate-1 flex-col gap-3")}>
      <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-body-sm font-bold">
          IP
        </div>
        <div>
          <p className="text-body-sm font-bold text-ink">Ikeja Prints</p>
          <p className="text-xs text-success">Reviewing your file</p>
        </div>
      </div>
      <p className="max-w-[85%] rounded-xl rounded-tl-sm bg-neutral-50 px-3 py-2 text-body-sm text-ink">
        Your text is a little close to the edge. Want us to add 3mm bleed?
      </p>
      <p className="max-w-[70%] self-end rounded-xl rounded-tr-sm bg-primary px-3 py-2 text-body-sm text-white">
        Yes please, go ahead!
      </p>
      <span className="self-center rounded-full bg-success-50 px-3 py-1 text-xs font-bold text-success">
        ✓ Design approved
      </span>
    </div>
  );
}

function TrackMock() {
  const stages = ["Received", "On it", "Done", "Out for delivery", "Delivered"];
  const current = 3;
  return (
    <div className={cn(card, "rotate-2")}>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-body font-bold text-ink">Order #PL-2041</p>
        <span className="rounded-full bg-secondary-200 px-2.5 py-1 text-xs font-bold">Express</span>
      </div>
      <ol className="flex flex-col gap-0">
        {stages.map((s, i) => (
          <li key={s} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "size-3.5 rounded-full border-2",
                  i < current && "border-primary bg-primary",
                  i === current && "border-primary bg-white ring-4 ring-primary/20",
                  i > current && "border-neutral-300 bg-white",
                )}
              />
              {i < stages.length - 1 && (
                <span className={cn("h-5 w-0.5", i < current ? "bg-primary" : "bg-neutral-100")} />
              )}
            </div>
            <span
              className={cn(
                "-mt-1 text-body-sm",
                i <= current ? "font-bold text-ink" : "text-neutral-600",
              )}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
