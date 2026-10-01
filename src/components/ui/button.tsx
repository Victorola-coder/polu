import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-primary text-white rounded-lg px-10 py-4 hover:bg-primary-600 disabled:opacity-60",
  outline:
    "border border-white text-white rounded-md px-6 py-2.5 hover:bg-white hover:text-primary",
  ghost:
    "border border-neutral-300 text-ink rounded-lg p-4 hover:bg-neutral-50",
  dark: "bg-ink text-white rounded-lg px-10 py-4 hover:bg-black",
  light: "bg-white text-primary rounded-lg px-10 py-4 hover:bg-primary-50",
} as const;

type Variant = keyof typeof variants;

type Common = {
  variant?: Variant;
  icon?: "arrow-right" | "arrow-left" | "google";
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "group inline-flex items-center justify-center gap-2 font-bold text-body transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function Content({ icon, loading, children }: Omit<Common, "variant" | "className">) {
  if (loading) {
    return (
      <span className="flex gap-1 py-1.75" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 animate-pulse rounded-full bg-current"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </span>
    );
  }
  return (
    <>
      {icon === "arrow-left" && <Arrow flip />}
      {icon === "google" && <Image src="/icons/google.svg" alt="" width={16} height={16} />}
      {children}
      {icon === "arrow-right" && <Arrow />}
    </>
  );
}

// same path as public/icons/arrow-right.svg, drawn in currentColor so it follows the text
function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("transition-transform group-hover:translate-x-0.5", flip && "rotate-180")}
    >
      <path
        d="M2.66667 8H13.3333M9.33333 12L13.3333 8L9.33333 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  icon,
  loading,
  className,
  children,
  disabled,
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      <Content icon={icon} loading={loading}>
        {children}
      </Content>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      <Content icon={icon}>{children}</Content>
    </Link>
  );
}
