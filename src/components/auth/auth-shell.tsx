import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Props = {
  /* prompt on the top right, e.g. "Already have an account ?" + "Sign in" */
  prompt?: { text: string; cta: string; href: string };
  /* show the "join polu today" sticker beside the card (large screens) */
  illustration?: boolean;
  children: ReactNode;
};

export function AuthShell({ prompt, illustration, children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-primary">
      <header className="mx-auto flex w-full max-w-[1328px] items-center justify-between px-6 pt-6">
        <Link href="/" aria-label="Polu home">
          <Image src="/images/polu-logo.svg" alt="Polu" width={73} height={39} priority />
        </Link>
        {prompt && (
          <div className="flex items-center gap-5">
            <p className="hidden text-body font-bold text-white sm:block">{prompt.text}</p>
            <span className="hidden h-[15px] w-px bg-white/60 sm:block" />
            <ButtonLink href={prompt.href} variant="outline">
              {prompt.cta}
            </ButtonLink>
          </div>
        )}
      </header>

      <main
        className={cn(
          "mx-auto flex w-full max-w-[1288px] flex-1 items-center px-6 py-12",
          illustration ? "justify-center lg:justify-between lg:gap-12" : "justify-center",
        )}
      >
        {illustration && (
          <div className="hidden w-[524px] shrink-0 lg:block">
            <Image
              src="/images/join-polu.svg"
              alt="Join Polu today - Event brochure, 500 pcs, place order"
              width={524}
              height={364}
              priority
              className="animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

export function AuthCard({
  children,
  className,
  center,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-[530px] rounded-xl bg-white px-6 pt-10 pb-12 shadow-card sm:px-10",
        center && "text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AuthHeading({ title, caption }: { title: string; caption?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-h5 text-ink">{title}</h1>
      {caption && <p className="text-body text-neutral-600">{caption}</p>}
    </div>
  );
}
