import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Print",
    links: [
      { href: "/signup", label: "Stickers" },
      { href: "/signup", label: "Posters" },
      { href: "/signup", label: "Flyers & brochures" },
      { href: "/signup", label: "Branded merch" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/become-a-host", label: "Become a host" },
      { href: "https://polu.ng/build", label: "Careers" },
      { href: "/#how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/login", label: "Track an order" },
      { href: "/become-a-host#faq", label: "FAQs" },
      { href: "mailto:hello@polu.ng", label: "Contact us" },
      { href: "/forgot-password", label: "Reset password" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.3 8c-.1-1.5-.4-2.8-1.5-3.8C18.8 3.1 17.5 2.8 16 2.7c-1.6-.1-6.4-.1-8 0-1.5.1-2.8.4-3.8 1.5C3.1 5.2 2.8 6.5 2.7 8c-.1 1.6-.1 6.4 0 8 .1 1.5.4 2.8 1.5 3.8 1 1.1 2.3 1.4 3.8 1.5 1.6.1 6.4.1 8 0 1.5-.1 2.8-.4 3.8-1.5 1.1-1 1.4-2.3 1.5-3.8.1-1.6.1-6.4 0-8Zm-2 9.7a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.5.4s-4.3.1-5.5-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7a3.2 3.2 0 0 1 1.8-1.8C7.7 4 10.7 4.1 12 4.1s4.3-.1 5.5.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M17.8 3h3.1l-6.7 7.6L22 21h-6.2l-4.8-6.3L5.5 21H2.4l7.1-8.2L2 3h6.3l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.9 21H3.2V9h3.7v12ZM5 7.4a2.2 2.2 0 1 1 0-4.3 2.2 2.2 0 0 1 0 4.3ZM21 21h-3.7v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9.4V9h3.5v1.6h.1c.5-.9 1.7-2 3.5-2 3.8 0 4.5 2.5 4.5 5.7V21Z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: "M16.6 5.8A4.3 4.3 0 0 1 15.6 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.8a5.7 5.7 0 1 0 4.9 5.6V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4s-1.9.1-3.3-1.6Z",
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 pt-16 pb-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Image src="/images/polu-logo.svg" alt="Polu" width={73} height={39} />
          <p className="max-w-[260px] text-body text-white/60">One destination for all prints.</p>
          <div className="mt-2 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-body font-bold">{col.title}</p>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-body text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1320px] flex-col gap-2 border-t border-white/10 px-6 py-6 text-body-sm text-white/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Polu Technology Limited. All rights reserved.</p>
        <p>RC 7947387</p>
      </div>
    </footer>
  );
}
