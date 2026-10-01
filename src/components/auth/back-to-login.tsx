import Image from "next/image";
import Link from "next/link";

export function BackToLogin() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center gap-2 text-body-sm text-ink hover:underline"
    >
      <Image src="/icons/arrow-left-dark.svg" alt="" width={16} height={16} />
      Return to login
    </Link>
  );
}
