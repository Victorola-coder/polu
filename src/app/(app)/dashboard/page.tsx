import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { ButtonLink } from "@/components/ui/button";
import type { Role } from "@/db/schema";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

// placeholder home for signed-in users until the app screens are designed
const next: Record<Role, { label: string; title: string; body: string; cta: string; href: string }> = {
  user: {
    label: "User",
    title: "Start your first order",
    body: "Pick a product, upload your design and choose how you want it delivered.",
    cta: "Start an order",
    href: "/#try-it",
  },
  merchant: {
    label: "Merchant",
    title: "Get your shop ready",
    body: "We’ll review your account shortly. Soon you’ll see incoming print jobs here.",
    cta: "Read the host FAQs",
    href: "/become-a-host#faq",
  },
  rider: {
    label: "Delivery rider",
    title: "Get ready to ride",
    body: "We’ll review your account shortly. Soon you’ll see pickups near you here.",
    cta: "Read the host FAQs",
    href: "/become-a-host#faq",
  },
};

export default async function DashboardPage() {
  const { user } = await requireSession();
  const role = (user.role as Role) ?? "user";
  const card = next[role] ?? next.user;

  return (
    <div className="min-h-dvh bg-neutral-50">
      <header className="border-b border-neutral-100 bg-white">
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="Polu home">
            <Image src="/images/polu-logo-purple.svg" alt="Polu" width={73} height={39} priority />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-body-sm text-neutral-700 sm:block">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-2">
          <span className="self-start rounded-full bg-secondary-200 px-3 py-1 text-body-sm font-bold">
            {card.label}
          </span>
          <h1 className="text-[32px] leading-[1.15] font-extrabold tracking-tight text-ink sm:text-[40px]">
            Hi {user.firstName || user.name.split(" ")[0]}, welcome to Polu
          </h1>
        </div>

        <div className="flex max-w-[560px] flex-col gap-4 rounded-2xl bg-primary p-6 text-white sm:p-8">
          <h2 className="text-2xl font-extrabold">{card.title}</h2>
          <p className="text-body text-white/85">{card.body}</p>
          <ButtonLink href={card.href} variant="light" icon="arrow-right" className="self-start">
            {card.cta}
          </ButtonLink>
        </div>
      </main>
    </div>
  );
}
