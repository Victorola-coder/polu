import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  caption,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  caption?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "flex max-w-[715px] flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <span className="rounded-full bg-secondary-200 px-3 py-1 text-body-sm font-bold text-ink">
          {eyebrow}
        </span>
      )}
      <h2 className="text-[28px] leading-[1.15] font-extrabold tracking-tight text-balance text-ink sm:text-[36px] lg:text-[44px]">
        {title}
      </h2>
      {caption && <p className="text-body text-neutral-700 sm:text-lg sm:leading-7">{caption}</p>}
    </div>
  );
}
