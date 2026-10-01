"use client";

import Image from "next/image";
import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

const field =
  "h-15 w-full rounded-lg border border-transparent bg-neutral-50 px-4 text-body text-ink placeholder:text-neutral-600 outline-none transition-colors focus:border-primary-600 aria-invalid:border-red-400";

type InputProps = ComponentProps<"input"> & { label: string; error?: string };

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <label className={cn("flex w-full flex-col gap-2", className)}>
      <span className="sr-only">{label}</span>
      <input
        className={field}
        placeholder={label}
        aria-invalid={!!error || undefined}
        {...props}
      />
      {error && <span className="text-body-sm text-red-500">{error}</span>}
    </label>
  );
}

type PasswordInputProps = Omit<InputProps, "type"> & { hint?: string };

export function PasswordInput({ label, error, hint, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn("flex w-full flex-col gap-5", className)}>
      <label className="relative block">
        <span className="sr-only">{label}</span>
        <input
          type={visible ? "text" : "password"}
          className={cn(field, "pr-14")}
          placeholder={label}
          aria-invalid={!!error || undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer opacity-100 transition-opacity hover:opacity-70"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <Image src="/icons/eye.svg" alt="" width={24} height={24} />
        </button>
      </label>
      {error ? (
        <p className="text-body-sm text-red-500">{error}</p>
      ) : (
        hint && <p className="max-w-[310px] text-[13px] leading-5 tracking-[0.13px] text-neutral-700">{hint}</p>
      )}
    </div>
  );
}
