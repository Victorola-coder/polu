import { Scallop } from "@/components/site/scallop";
import { ButtonLink } from "@/components/ui/button";

export function Cta({
  title,
  caption,
  cta,
  href,
}: {
  title: string;
  caption: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="px-3 py-16 sm:py-24 sm:px-6">
      <div data-tilt className="relative mx-auto flex max-w-[1240px] flex-col items-center gap-6 overflow-hidden rounded-[28px] bg-secondary px-6 py-14 text-center sm:py-20">
        <div data-spin="180" className="absolute -top-16 -right-10"><Scallop className="size-60 text-white/30" /></div>
        <div data-spin="-150" className="absolute -bottom-20 -left-12"><Scallop className="size-72 text-white/30" /></div>
        <h2 className="relative max-w-[640px] text-[32px] leading-[1.1] font-extrabold tracking-tight text-balance text-ink sm:text-[44px] lg:text-[52px]">
          {title}
        </h2>
        <p className="relative max-w-[480px] text-body text-ink/80 sm:text-lg sm:leading-7">{caption}</p>
        <ButtonLink href={href} variant="dark" icon="arrow-right" className="relative mt-2">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
