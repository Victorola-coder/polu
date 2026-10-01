"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const words = ["Stickers", "Posters", "Brochures", "Flyers", "T-shirts", "Labels", "Banners", "Business cards"];

function Row({ reverse, className }: { reverse?: boolean; className?: string }) {
  // two copies side by side so a -50% shift loops seamlessly
  return (
    <div className={cn("flex w-max py-4 sm:py-5", className)} data-marquee-row data-reverse={reverse || undefined}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
          {words.map((w) => (
            <span key={w} className="flex items-center font-display text-[34px] leading-none sm:text-[56px]">
              <span className="px-5 sm:px-8">{w}</span>
              <svg viewBox="0 0 24 24" className="size-6 sm:size-9" fill="currentColor" aria-hidden>
                <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
              </svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-marquee-row]");
      const loops = rows.map((row) => {
        const reverse = row.dataset.reverse !== undefined;
        return gsap.fromTo(
          row,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: 28, ease: "none", repeat: -1 },
        );
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        loops.forEach((l) => l.pause());
        return;
      }

      // scroll speed kicks the marquee faster, then it settles back
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
          loops.forEach((l) => {
            gsap.to(l, { timeScale: boost * self.direction, duration: 0.2, overwrite: true });
            gsap.to(l, { timeScale: self.direction, duration: 1.2, delay: 0.2 });
          });
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-10 sm:py-16" aria-label="Things you can print">
      <div className="-rotate-2">
        <Row className="bg-ink text-secondary" />
      </div>
      <div className="mt-[-6px] rotate-1">
        <Row reverse className="bg-secondary text-ink" />
      </div>
    </section>
  );
}
