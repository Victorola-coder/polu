"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { OrderTicket } from "@/components/site/order-ticket";
import { Scallop } from "@/components/site/scallop";
import { ButtonLink } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const headline = "One destination for all your prints";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.from("[data-hero-card]", { scale: 0.92, borderRadius: 64, duration: 1.4 })
          .from("[data-hero-blob]", { scale: 0, rotate: -120, duration: 1.6, stagger: 0.15 }, 0)
          .from("[data-hero-badge]", { y: -30, autoAlpha: 0, duration: 0.8 }, 0.3)
          .from(
            "[data-hero-word]",
            { yPercent: 120, rotate: 8, duration: 1.1, stagger: 0.06 },
            0.35,
          )
          .from("[data-hero-copy]", { y: 24, autoAlpha: 0, duration: 0.9 }, 0.8)
          .from("[data-hero-cta] > *", { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.9)
          .from(
            "[data-hero-sticker]",
            {
              scale: 0,
              rotate: () => gsap.utils.random(-60, 60),
              duration: 1,
              ease: "back.out(1.8)",
              stagger: 0.08,
            },
            0.7,
          );

        // idle bobbing, each sticker on its own rhythm
        gsap.utils.toArray<HTMLElement>("[data-hero-sticker] > *").forEach((el, i) => {
          gsap.to(el, {
            y: gsap.utils.random(-14, 14),
            rotate: gsap.utils.random(-5, 5),
            duration: gsap.utils.random(2.4, 3.6),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          });
        });

        // stickers lean towards the cursor
        const movers = gsap.utils.toArray<HTMLElement>("[data-hero-sticker]").map((el) => ({
          depth: Number(el.dataset.depth) || 1,
          x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * 40 * m.depth);
            m.y(ny * 30 * m.depth);
          });
        };
        window.addEventListener("pointermove", onMove);

        // scrolling away: card shrinks back, headline lifts
        gsap.to("[data-hero-card]", {
          scale: 0.94,
          borderRadius: 48,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-blob]", {
          rotate: 140,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
        });

        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-3 sm:px-6">
      <div
        data-hero-card
        className="relative mx-auto max-w-[1392px] overflow-hidden rounded-[28px] bg-primary px-5 pt-14 pb-16 will-change-transform sm:px-6 sm:pt-28 sm:pb-32"
      >
        <div data-hero-blob className="absolute -top-24 -left-20">
          <Scallop className="size-[340px] text-white/10" />
        </div>
        <div data-hero-blob className="absolute -right-24 -bottom-32">
          <Scallop className="size-[420px] text-white/10" />
        </div>

        {/* scattered stickers */}
        <div data-hero-sticker data-depth="1.4" className="absolute top-16 -left-10 hidden xl:block">
          <OrderTicket title="Event brochure" qty="500 pcs" icon="🗺️" className="-rotate-6" />
        </div>
        <div data-hero-sticker data-depth="1.1" className="absolute -right-8 bottom-20 hidden xl:block">
          <OrderTicket title="Die-cut stickers" qty="1,000 pcs" icon="⭐" className="rotate-[5deg]" />
        </div>
        <div data-hero-sticker data-depth="2" className="absolute top-12 right-[12%] hidden md:block">
          <div className="relative size-24 rotate-12">
            <Scallop className="absolute inset-0 size-full text-secondary drop-shadow-[0_4px_0_#1e1e1e]" />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-ink">
              hey!
            </span>
          </div>
        </div>
        <div data-hero-sticker data-depth="-1.2" className="absolute bottom-16 left-[10%] hidden md:block">
          <div className="flex h-24 w-[72px] -rotate-12 flex-col justify-between rounded-sm border border-ink bg-white p-2 shadow-[4px_4px_0_#1e1e1e]">
            <div className="flex h-12 items-end justify-center rounded-sm bg-ink">
              <div className="size-6 translate-y-2 rounded-full bg-secondary" />
            </div>
            <span className="h-1 w-10 rounded bg-ink" />
          </div>
        </div>
        <div data-hero-sticker data-depth="-1.8" className="absolute top-[42%] right-[6%] hidden lg:block">
          <span className="block rotate-6 rounded-full border border-ink bg-success px-4 py-2 text-body-sm font-bold text-ink shadow-[3px_3px_0_#1e1e1e]">
            ✓ Delivered
          </span>
        </div>

        <div data-hero-content className="relative mx-auto flex max-w-[780px] flex-col items-center gap-6 text-center">
          <span
            data-hero-badge
            className="rounded-full border border-white/40 px-4 py-1.5 text-body-sm font-bold text-white"
          >
            Stickers · Posters · Brochures · Merch
          </span>
          <h1
            className="text-[40px] leading-[1.04] font-extrabold tracking-tight text-balance text-white sm:text-[56px] lg:text-[72px]"
            aria-label={headline}
          >
            {headline.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
                <span data-hero-word className="inline-block">
                  {word}
                </span>
                {i < headline.split(" ").length - 1 && " "}
              </span>
            ))}
          </h1>
          <p data-hero-copy className="max-w-[560px] text-body text-white/85 sm:text-lg sm:leading-7">
            Upload your design, pick your size and finish, and a vetted local printer brings it to
            life. Track every stage until it lands at your door.
          </p>
          <div data-hero-cta className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="#try-it" variant="light" icon="arrow-right">
              Try it now
            </ButtonLink>
            <ButtonLink href="/signup" variant="outline" className="px-10 py-4">
              Start an order
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
