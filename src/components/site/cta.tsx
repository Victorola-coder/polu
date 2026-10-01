import { Scallop } from "@/components/home/hero";
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
    <section className="px-3 py-24 sm:px-6">
      <div className="relative mx-auto flex max-w-[1240px] flex-col items-center gap-6 overflow-hidden rounded-[28px] bg-secondary px-6 py-20 text-center">
        <Scallop className="absolute -top-16 -right-10 size-60 text-white/30" />
        <Scallop className="absolute -bottom-20 -left-12 size-72 text-white/30" />
        <h2 className="relative max-w-[640px] text-[36px] leading-[1.1] font-extrabold tracking-tight text-ink sm:text-[52px]">
          {title}
        </h2>
        <p className="relative max-w-[480px] text-lg leading-7 text-ink/80">{caption}</p>
        <ButtonLink href={href} variant="dark" icon="arrow-right" className="relative mt-2">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
