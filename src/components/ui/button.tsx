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
  "inline-flex items-center justify-center gap-2 font-bold text-body transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function Content({ icon, loading, children }: Omit<Common, "variant" | "className">) {
  if (loading) {
    return (
      <span className="flex gap-1 py-[7px]" aria-label="Loading">
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
      {icon === "arrow-left" && <Image src="/icons/arrow-left.svg" alt="" width={16} height={16} />}
      {icon === "google" && <Image src="/icons/google.svg" alt="" width={16} height={16} />}
      {children}
      {icon === "arrow-right" && <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />}
    </>
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
