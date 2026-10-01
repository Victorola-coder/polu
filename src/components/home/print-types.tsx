import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { Scallop } from "@/components/site/scallop";

const items = [
  {
    name: "Stickers",
    caption: "Die-cut, kiss-cut, sheets & labels",
    bg: "bg-secondary-200",
    art: (
      <div className="relative size-36">
        <Scallop className="absolute inset-0 size-full -rotate-6 text-secondary drop-shadow-[0_6px_0_#1e1e1e]" />
        <span className="absolute inset-0 flex -rotate-6 items-center justify-center text-2xl font-extrabold text-ink">
          hey!
        </span>
      </div>
    ),
  },
  {
    name: "Posters",
    caption: "A4 to A0, matte or glossy",
    bg: "bg-primary-50",
    art: (
      <div className="flex h-40 w-30 rotate-3 flex-col justify-between rounded-sm border border-ink bg-white p-3 shadow-[6px_6px_0_#1e1e1e]">
        <div className="flex h-20 items-end justify-center rounded-sm bg-primary">
          <div className="size-10 translate-y-3 rounded-full bg-secondary" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="h-1.5 w-16 rounded bg-ink" />
          <span className="h-1.5 w-10 rounded bg-neutral-300" />
        </div>
      </div>
    ),
  },
  {
    name: "Flyers & brochures",
    caption: "Folded, stapled, event ready",
    bg: "bg-[#ffe3d6]",
    art: (
      <div className="flex -rotate-3 shadow-[6px_6px_0_#1e1e1e]">
        {["bg-[#ff6b3d]", "bg-[#ff8a5c]", "bg-[#ff6b3d]"].map((c, i) => (
          <div key={i} className={`h-36 w-14 border border-ink ${c} ${i === 1 ? "-skew-y-6" : "skew-y-6"}`} />
        ))}
      </div>
    ),
  },
  {
    name: "Branded merch",
    caption: "Tees, totes and more",
    bg: "bg-[#dff3e1]",
    art: (
      <svg viewBox="0 0 120 110" className="w-36 rotate-2 drop-shadow-[6px_6px_0_#1e1e1e]" aria-hidden>
        <path
          d="M40 6 22 14 4 34l16 16 10-8v62h60V42l10 8 16-16-18-20-18-8c-2 8-10 14-20 14S42 14 40 6Z"
          fill="#1e1e1e"
          stroke="#1e1e1e"
          strokeLinejoin="round"
        />
        <text x="60" y="64" textAnchor="middle" fontSize="16" fontWeight="800" fill="#9f79ff">
          polu
        </text>
      </svg>
    ),
  },
];

export function PrintTypes() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 sm:py-24">
      <SectionHeading
        eyebrow="What you can print"
        title="If it can be printed, Polu can print it"
        caption="Start with the essentials. More products land every month."
      />
      <ul data-pop className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:gap-6 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.name}>
            <Link href="/signup" className="group flex flex-col gap-3 sm:gap-4">
              <div
                className={`flex aspect-square items-center justify-center overflow-hidden rounded-2xl ${item.bg} transition-transform duration-300 group-hover:-translate-y-1`}
              >
                <div className="scale-[.6] transition-transform duration-300 group-hover:scale-[.65] sm:scale-100 sm:group-hover:scale-105">
                  {item.art}
                </div>
              </div>
              <div>
                <p className="text-body font-bold text-ink sm:text-xl sm:leading-7">{item.name}</p>
                <p className="text-body-sm text-neutral-700 sm:text-body">{item.caption}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
