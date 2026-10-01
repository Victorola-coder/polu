"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/become-a-host", label: "Become a host" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/90 backdrop-blur transition-shadow",
        scrolled && "shadow-[0_1px_0_0_var(--color-neutral-100)]",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-6 lg:h-25">
        <Link href="/" aria-label="Polu home">
          <Image src="/images/polu-logo-purple.svg" alt="Polu" width={73} height={39} priority />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-body font-bold transition-colors hover:text-primary",
                  pathname === l.href ? "text-primary" : "text-ink",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="px-4 text-body font-bold text-ink hover:text-primary">
            Log in
          </Link>
          <ButtonLink href="/signup" className="px-6 py-3">
            Sign up
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={cn("h-0.5 w-6 bg-ink transition-transform", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-ink transition-opacity", open && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-ink transition-transform", open && "-translate-y-2 -rotate-45")} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-neutral-100 bg-white px-6 pt-4 pb-6 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-bold text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <ButtonLink href="/login" variant="ghost">
              Log in
            </ButtonLink>
            <ButtonLink href="/signup" className="px-4">
              Sign up
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
