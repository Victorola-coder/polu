"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Scallop } from "@/components/site/scallop";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP);

/*
 * a no-signup playground: pick a product, drop in a design, tweak it,
 * watch the price + preview update, then "order" and follow it to the door.
 * prices are illustrative only.
 */

type ProductId = "sticker" | "poster" | "flyer" | "tee";

const products: Record<
  ProductId,
  {
    name: string;
    emoji: string;
    base: number;
    sizes: { id: string; label: string; mult: number }[];
    materials: { id: string; label: string; mult: number }[];
    finishes: string[];
    qty: { min: number; max: number; step: number; start: number };
  }
> = {
  sticker: {
    name: "Stickers",
    emoji: "⭐",
    base: 120,
    sizes: [
      { id: "s", label: "5cm", mult: 1 },
      { id: "m", label: "8cm", mult: 1.5 },
      { id: "l", label: "12cm", mult: 2.2 },
    ],
    materials: [
      { id: "vinyl", label: "Vinyl", mult: 1 },
      { id: "paper", label: "Paper", mult: 0.7 },
      { id: "holo", label: "Holographic", mult: 1.8 },
    ],
    finishes: ["Glossy", "Matte"],
    qty: { min: 50, max: 2000, step: 50, start: 200 },
  },
  poster: {
    name: "Posters",
    emoji: "🖼️",
    base: 900,
    sizes: [
      { id: "a3", label: "A3", mult: 1 },
      { id: "a2", label: "A2", mult: 1.8 },
      { id: "a1", label: "A1", mult: 3 },
    ],
    materials: [
      { id: "paper", label: "Paper", mult: 1 },
      { id: "card", label: "Card", mult: 1.4 },
      { id: "canvas", label: "Canvas", mult: 3.5 },
    ],
    finishes: ["Matte", "Glossy"],
    qty: { min: 1, max: 200, step: 1, start: 20 },
  },
  flyer: {
    name: "Brochures",
    emoji: "🗺️",
    base: 150,
    sizes: [
      { id: "a5", label: "A5", mult: 1 },
      { id: "a4", label: "A4 tri-fold", mult: 1.6 },
    ],
    materials: [
      { id: "130", label: "130gsm", mult: 1 },
      { id: "250", label: "250gsm", mult: 1.5 },
    ],
    finishes: ["Glossy", "Matte"],
    qty: { min: 50, max: 5000, step: 50, start: 500 },
  },
  tee: {
    name: "T-shirts",
    emoji: "👕",
    base: 6500,
    sizes: [
      { id: "s", label: "S", mult: 1 },
      { id: "m", label: "M", mult: 1 },
      { id: "l", label: "L", mult: 1.05 },
      { id: "xl", label: "XL", mult: 1.1 },
    ],
    materials: [
      { id: "black", label: "Black", mult: 1 },
      { id: "white", label: "White", mult: 1 },
      { id: "purple", label: "Purple", mult: 1.1 },
    ],
    finishes: ["Screen print", "DTF"],
    qty: { min: 1, max: 300, step: 1, start: 15 },
  },
};

const delivery = [
  { id: "standard", label: "Standard", eta: "2–3 days", fee: 2500 },
  { id: "express", label: "Express", eta: "24 hours", fee: 6000 },
  { id: "pickup", label: "Pick up", eta: "Arrange your own", fee: 0 },
] as const;

const stages = ["Received", "On it", "Done", "Out for delivery", "Delivered"];

const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`;

export function Sandbox() {
  const [productId, setProductId] = useState<ProductId>("sticker");
  const product = products[productId];
  const [size, setSize] = useState(product.sizes[0].id);
  const [material, setMaterial] = useState(product.materials[0].id);
  const [finish, setFinish] = useState(product.finishes[0]);
  const [qty, setQty] = useState(product.qty.start);
  const [ship, setShip] = useState<(typeof delivery)[number]["id"]>("standard");
  const [design, setDesign] = useState<string | null>(null);
  const [designName, setDesignName] = useState<string | null>(null);
  const [stage, setStage] = useState(-1);

  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const shownPrice = useRef({ value: 0 });

  const pickProduct = (id: ProductId) => {
    const p = products[id];
    setProductId(id);
    setSize(p.sizes[0].id);
    setMaterial(p.materials[0].id);
    setFinish(p.finishes[0]);
    setQty(p.qty.start);
  };

  const sizeMult = product.sizes.find((s) => s.id === size)?.mult ?? 1;
  const matMult = product.materials.find((m) => m.id === material)?.mult ?? 1;
  const bulk = qty >= product.qty.max / 4 ? 0.85 : qty >= product.qty.max / 10 ? 0.93 : 1;
  const unit = product.base * sizeMult * matMult * bulk;
  const shipFee = delivery.find((d) => d.id === ship)!.fee;
  const total = unit * qty + shipFee;

  // count the price up/down instead of snapping
  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    const tween = gsap.to(shownPrice.current, {
      value: total,
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = naira(shownPrice.current.value);
      },
    });
    return () => {
      tween.kill();
    };
  }, [total]);

  // bounce the mockup whenever the product or its look changes
  useGSAP(
    () => {
      gsap.fromTo(
        "[data-mockup]",
        { scale: 0.85, rotate: -6, autoAlpha: 0 },
        { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, ease: "back.out(2)" },
      );
    },
    { scope: preview, dependencies: [productId, design, material], revertOnUpdate: true },
  );

  // walk the order through each stage
  useEffect(() => {
    if (stage < 0 || stage >= stages.length - 1) return;
    const id = setTimeout(() => setStage((s) => s + 1), 1100);
    return () => clearTimeout(id);
  }, [stage]);

  useGSAP(
    () => {
      if (stage < 0) return;
      gsap.to("[data-progress]", {
        scaleX: stage / (stages.length - 1),
        duration: 0.9,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        `[data-stage="${stage}"]`,
        { scale: 0.4 },
        { scale: 1, duration: 0.6, ease: "back.out(3)" },
      );
      if (stage === stages.length - 1) {
        gsap.fromTo(
          "[data-confetti]",
          { y: 0, x: 0, autoAlpha: 1, rotate: 0 },
          {
            y: () => gsap.utils.random(-220, -60),
            x: () => gsap.utils.random(-220, 220),
            rotate: () => gsap.utils.random(-360, 360),
            autoAlpha: 0,
            duration: 1.6,
            ease: "power3.out",
            stagger: 0.01,
          },
        );
      }
    },
    { scope: root, dependencies: [stage] },
  );

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (design) URL.revokeObjectURL(design);
    setDesign(URL.createObjectURL(file));
    setDesignName(file.name);
  };

  const ordering = stage >= 0;

  return (
    <section id="try-it" className="scroll-mt-24 px-3 py-16 sm:px-6 sm:py-24">
      <div
        ref={root}
        className="relative mx-auto max-w-[1392px] overflow-hidden rounded-[28px] bg-ink px-5 py-12 text-white sm:px-10 sm:py-16 lg:px-16"
      >
        <div data-spin="120" className="pointer-events-none absolute -top-40 -right-40">
          <Scallop className="size-[480px] text-primary/25" />
        </div>

        <div data-reveal className="relative flex max-w-[640px] flex-col gap-3">
          <span className="self-start rounded-full bg-secondary px-3 py-1 text-body-sm font-bold text-ink">
            Try it, no account needed
          </span>
          <h2 className="text-[28px] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-[36px] lg:text-[44px]">
            Build a print order in 30 seconds
          </h2>
          <p className="text-body text-white/70 sm:text-lg sm:leading-7">
            Pick a product, drop in any image and play with the options. This is exactly how
            ordering on Polu works.
          </p>
        </div>

        <div className="relative mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* controls */}
          <div className="flex flex-col gap-6" data-reveal>
            <Group label="1. Product">
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(products) as ProductId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pickProduct(id)}
                    disabled={ordering}
                    className={cn(
                      "flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-1 py-3 text-body-sm font-bold transition-all disabled:cursor-not-allowed",
                      productId === id
                        ? "border-secondary bg-secondary text-ink"
                        : "border-white/15 hover:border-white/40",
                    )}
                  >
                    <span className="text-2xl">{products[id].emoji}</span>
                    {products[id].name}
                  </button>
                ))}
              </div>
            </Group>

            <Group label="2. Your design">
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-white/25 p-4 transition-colors hover:border-secondary",
                  ordering && "pointer-events-none opacity-60",
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-body font-bold">
                    {designName ?? "Upload an image"}
                  </span>
                  <span className="text-body-sm text-white/60">
                    {design ? "Looking good. Tap to swap it." : "PNG, JPG or SVG. It stays on your device."}
                  </span>
                </span>
                <input type="file" accept="image/*" className="sr-only" onChange={onUpload} />
              </label>
            </Group>

            <Group label="3. Customise">
              <div className="flex flex-col gap-3">
                <Chips options={product.sizes} value={size} onChange={setSize} disabled={ordering} />
                <Chips options={product.materials} value={material} onChange={setMaterial} disabled={ordering} />
                <Chips
                  options={product.finishes.map((f) => ({ id: f, label: f }))}
                  value={finish}
                  onChange={setFinish}
                  disabled={ordering}
                />
                <div className="flex items-center gap-4 pt-1">
                  <input
                    type="range"
                    min={product.qty.min}
                    max={product.qty.max}
                    step={product.qty.step}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    disabled={ordering}
                    aria-label="Quantity"
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-secondary"
                  />
                  <span className="w-24 text-right text-body font-bold">{qty.toLocaleString()} pcs</span>
                </div>
              </div>
            </Group>

            <Group label="4. Delivery">
              <div className="grid grid-cols-3 gap-2">
                {delivery.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setShip(d.id)}
                    disabled={ordering}
                    className={cn(
                      "flex cursor-pointer flex-col items-start gap-0.5 rounded-xl border-2 p-3 text-left transition-colors disabled:cursor-not-allowed",
                      ship === d.id ? "border-primary bg-primary/20" : "border-white/15 hover:border-white/40",
                    )}
                  >
                    <span className="text-body-sm font-bold">{d.label}</span>
                    <span className="text-xs text-white/60">{d.eta}</span>
                  </button>
                ))}
              </div>
            </Group>
          </div>

          {/* preview + checkout */}
          <div className="flex flex-col gap-4" data-tilt>
            <div
              ref={preview}
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-primary sm:aspect-[1.15]"
            >
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
              <div data-mockup className="relative">
                <div className="scale-[.72] sm:scale-100">
                <Mockup
                  product={productId}
                  design={design}
                  finish={finish}
                  material={material}
                  size={size}
                />
              </div>
              </div>
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink">
                Live preview
              </span>
            </div>

            <div className="relative rounded-2xl bg-white p-5 text-ink sm:p-6">
              {!ordering ? (
                <>
                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                    <div>
                      <p className="text-body-sm text-neutral-700">
                        {qty.toLocaleString()} × {product.name.toLowerCase()} · {naira(unit)} each
                      </p>
                      <p className="text-body-sm text-neutral-700">
                        Delivery {shipFee ? naira(shipFee) : "free"}
                        {bulk < 1 && <span className="ml-2 font-bold text-success">bulk discount applied</span>}
                      </p>
                    </div>
                    <span ref={priceRef} className="text-[28px] leading-none font-extrabold sm:text-[36px]">
                      {naira(total)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="primary"
                    icon="arrow-right"
                    className="mt-5 w-full"
                    onClick={() => setStage(0)}
                  >
                    Place test order
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <p className="text-body font-bold">Order #PL-{(qty * 7 + 1000).toString().slice(0, 4)}</p>
                    <span className="rounded-full bg-secondary-200 px-2.5 py-1 text-xs font-bold">
                      {delivery.find((d) => d.id === ship)!.label}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute top-3 right-3 left-3 h-1 rounded bg-neutral-100" />
                    <div
                      data-progress
                      className="absolute top-3 right-3 left-3 h-1 origin-left scale-x-0 rounded bg-primary"
                    />
                    <ol className="relative flex justify-between">
                      {stages.map((s, i) => (
                        <li key={s} className="flex w-14 flex-col items-center gap-2 text-center sm:w-20">
                          <span
                            data-stage={i}
                            className={cn(
                              "flex size-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                              i <= stage ? "border-primary bg-primary text-white" : "border-neutral-300 bg-white",
                            )}
                          >
                            {i < stage || stage === stages.length - 1 ? "✓" : i + 1}
                          </span>
                          <span className={cn("text-[11px] leading-tight sm:text-xs", i <= stage ? "font-bold" : "text-neutral-600")}>
                            {s}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  {stage === stages.length - 1 && (
                    <div className="relative flex flex-col gap-3 sm:flex-row">
                      {Array.from({ length: 24 }, (_, i) => (
                        <span
                          key={i}
                          data-confetti
                          className="pointer-events-none absolute top-1/2 left-1/2 size-2.5 rounded-sm opacity-0"
                          style={{ background: ["#9f79ff", "#ffbc01", "#4fc458", "#ff6b3d"][i % 4] }}
                        />
                      ))}
                      <ButtonLink href="/signup" icon="arrow-right" className="flex-1">
                        Order this for real
                      </ButtonLink>
                      <Button type="button" variant="ghost" onClick={() => setStage(-1)} className="flex-1">
                        Play again
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-sm font-bold tracking-wide text-white/60 uppercase">{label}</p>
      {children}
    </div>
  );
}

function Chips({
  options,
  value,
  onChange,
  disabled,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          disabled={disabled}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-body-sm font-bold transition-colors disabled:cursor-not-allowed",
            value === o.id ? "border-white bg-white text-ink" : "border-white/20 hover:border-white/50",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Art({ design, className }: { design: string | null; className?: string }) {
  if (design) {
    // eslint-disable-next-line @next/next/no-img-element -- blob url from the user's device
    return <img src={design} alt="Your design" className={cn("size-full object-cover", className)} />;
  }
  return (
    <div className={cn("flex size-full flex-col items-center justify-center bg-secondary text-ink", className)}>
      <span className="font-display text-[2.2em] leading-none">hey!</span>
      <span className="text-[0.55em] font-bold">your design here</span>
    </div>
  );
}

function Mockup({
  product,
  design,
  finish,
  material,
  size,
}: {
  product: ProductId;
  design: string | null;
  finish: string;
  material: string;
  size: string;
}) {
  const glossy = finish === "Glossy";
  const shine = glossy && (
    <span className="pointer-events-none absolute inset-0 animate-[shine_2.8s_ease-in-out_infinite] bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)] bg-[length:250%_100%]" />
  );

  if (product === "sticker") {
    const px = { s: 150, m: 190, l: 230 }[size] ?? 190;
    return (
      <div className="relative drop-shadow-[0_10px_0_rgba(30,30,30,0.9)]" style={{ width: px, height: px, fontSize: px / 6 }}>
        <div
          className={cn(
            "relative size-full overflow-hidden rounded-full border-[6px] border-white",
            material === "holo" && "after:absolute after:inset-0 after:bg-[conic-gradient(from_0deg,#ff6b3d55,#ffbc0155,#4fc45855,#9f79ff55,#ff6b3d55)] after:mix-blend-overlay",
          )}
        >
          <Art design={design} />
          {shine}
        </div>
      </div>
    );
  }

  if (product === "poster") {
    const w = { a3: 170, a2: 200, a1: 230 }[size] ?? 200;
    return (
      <div
        className={cn(
          "relative bg-white shadow-[10px_10px_0_#1e1e1e]",
          material === "canvas" ? "border-[10px] border-[#3b2a1a] p-0" : "p-3",
        )}
        style={{ width: w, height: w * 1.414, fontSize: w / 6 }}
      >
        <div className="relative size-full overflow-hidden">
          <Art design={design} />
          {shine}
        </div>
      </div>
    );
  }

  if (product === "flyer") {
    const h = size === "a4" ? 230 : 190;
    return (
      <div className="flex drop-shadow-[8px_8px_0_#1e1e1e]" style={{ height: h, fontSize: h / 5 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn("relative overflow-hidden border border-ink bg-white", i === 1 ? "-skew-y-3" : "skew-y-3")}
            style={{ width: h * 0.42 }}
          >
            <div
              className="absolute inset-y-0"
              style={{ width: h * 1.26, left: -i * h * 0.42 }}
            >
              <Art design={design} />
            </div>
            {shine}
          </div>
        ))}
      </div>
    );
  }

  const shirt = { black: "#1e1e1e", white: "#f7f7f7", purple: "#9f79ff" }[material] ?? "#1e1e1e";
  return (
    <div className="relative w-[260px] drop-shadow-[6px_6px_0_rgba(30,30,30,0.9)]">
      <svg viewBox="0 0 120 110" className="w-full" aria-hidden>
        <path
          d="M40 6 22 14 4 34l16 16 10-8v62h60V42l10 8 16-16-18-20-18-8c-2 8-10 14-20 14S42 14 40 6Z"
          fill={shirt}
          stroke="#1e1e1e"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute top-[30%] left-1/2 size-[30%] -translate-x-1/2 overflow-hidden rounded-sm text-[12px]">
        <Art design={design} />
      </div>
    </div>
  );
}
