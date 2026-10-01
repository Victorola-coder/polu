import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-primary px-6">
      <header className="mx-auto w-full max-w-[1280px] pt-6">
        <Link href="/" aria-label="Polu home">
          <Image src="/images/polu-logo.svg" alt="Polu" width={73} height={39} />
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center text-white">
        <p className="text-[120px] leading-none font-extrabold tracking-tight sm:text-[180px]">404</p>
        <h1 className="text-h5">This page didn’t make it to print</h1>
        <p className="max-w-[420px] text-body text-white/80">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <ButtonLink href="/" variant="light">
          Back to home
        </ButtonLink>
      </main>
    </div>
  );
}
