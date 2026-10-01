"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * declarative scroll animations, driven by data attributes so server
 * components can opt in without becoming client components:
 *
 *   data-reveal            fade + rise when it scrolls into view
 *   data-stagger           same, but for each direct child in turn
 *   data-pop               children scale/rotate in like stickers being slapped down
 *   data-parallax="0.2"    drift vertically while scrolling (scrubbed)
 *   data-spin="90"         rotate while scrolling (scrubbed)
 *   data-tilt              rotate in from a tilt as it enters
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 56,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-pop]").forEach((el) => {
          gsap.from(el.children, {
            scale: 0.6,
            rotate: () => gsap.utils.random(-14, 14),
            autoAlpha: 0,
            duration: 0.8,
            ease: "back.out(2.2)",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          gsap.from(el, {
            rotate: -8,
            y: 80,
            scale: 0.9,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax) || 0.2;
          gsap.to(el, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
          gsap.to(el, {
            rotate: Number(el.dataset.spin) || 90,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
