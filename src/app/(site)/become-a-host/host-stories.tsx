"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/cn";

// placeholder copy: swap in real host stories before launch
const stories = [
  { name: "Host name", role: "Print shop, Lagos", quote: "Placeholder story. Replace with a real quote from a merchant host.", tone: "bg-secondary" },
  { name: "Host name", role: "Delivery rider, Abuja", quote: "Placeholder story. Replace with a real quote from a delivery rider.", tone: "bg-[#ff6b3d]" },
  { name: "Host name", role: "Design studio, Ibadan", quote: "Placeholder story. Replace with a real quote from a studio host.", tone: "bg-primary" },
  { name: "Host name", role: "Print shop, Port Harcourt", quote: "Placeholder story. Replace with a real quote from a merchant host.", tone: "bg-[#4fc458]" },
];

export function HostStories() {
  const track = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
      setPage(Math.round(el.scrollLeft / el.clientWidth));
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const go = (i: number) => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" });

  return (
    <section className="bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading eyebrow="Host stories" title="Hosts growing with Polu" />
        <ul
          ref={track}
          className="mt-10 flex snap-x sm:mt-14 snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s, i) => (
            <li
              key={i}
              className="flex w-full shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-card md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="relative flex flex-1 flex-col gap-4 p-6">
                <p className="text-body text-neutral-700">“{s.quote}”</p>
                <div className="mt-auto border-t border-neutral-100 pt-4">
                  <p className="text-body font-bold text-ink">{s.name}</p>
                  <p className="text-body-sm text-neutral-600">{s.role}</p>
                </div>
              </div>
              <div className={cn("w-3 shrink-0 sm:w-16 lg:w-24", s.tone)} aria-hidden />
            </li>
          ))}
        </ul>
        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show page ${i + 1}`}
                className={cn(
                  "h-2.5 cursor-pointer rounded-full transition-all",
                  i === page ? "w-8 bg-primary" : "w-2.5 bg-neutral-300",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
