import { OrderTicket } from "@/components/site/order-ticket";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="px-3 sm:px-6">
      <div className="relative mx-auto max-w-[1392px] overflow-hidden rounded-[28px] bg-primary px-5 pt-14 pb-16 sm:px-6 sm:pt-28 sm:pb-32">
        {/* soft brand shapes */}
        <Scallop className="absolute -top-24 -left-20 size-[340px] text-white/10" />
        <Scallop className="absolute -right-24 -bottom-32 size-[420px] text-white/10" />

        <OrderTicket
          title="Event brochure"
          qty="500 pcs"
          icon="🗺️"
          className="absolute top-16 -left-10 hidden -rotate-6 animate-[float_7s_ease-in-out_infinite] xl:flex"
        />
        <OrderTicket
          title="Die-cut stickers"
          qty="1,000 pcs"
          icon="⭐"
          className="absolute -right-8 bottom-20 hidden rotate-[5deg] animate-[float_6s_ease-in-out_1s_infinite] xl:flex"
        />

        <div className="relative mx-auto flex max-w-[780px] flex-col items-center gap-6 text-center">
          <span className="rounded-full border border-white/40 px-4 py-1.5 text-body-sm font-bold text-white">
            Stickers · Posters · Brochures · Merch
          </span>
          <h1 className="text-[40px] leading-[1.04] font-extrabold tracking-tight text-balance text-white sm:text-[56px] lg:text-[72px]">
            One destination for all your prints
          </h1>
          <p className="max-w-[560px] text-body text-white/85 sm:text-lg sm:leading-7">
            Upload your design, pick your size and finish, and a vetted local printer brings it to
            life. Track every stage until it lands at your door.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/signup" variant="light" icon="arrow-right">
              Start an order
            </ButtonLink>
            <ButtonLink href="/become-a-host" variant="outline" className="px-10 py-4">
              Become a host
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Scallop({ className }: { className?: string }) {
  // the polu logo star, scaled up
  return (
    <svg viewBox="21 6.9 23 23" className={className} fill="currentColor" aria-hidden>
      <path d="M30.4416 7.72171C31.7294 6.73577 33.5183 6.73577 34.806 7.72171C35.457 8.22007 36.2588 8.48062 37.0784 8.46004C38.6997 8.41932 40.147 9.4708 40.6092 11.0254C40.8429 11.8111 41.3385 12.4933 42.0136 12.9583C43.3492 13.8784 43.902 15.5797 43.3623 17.1091C43.0895 17.8822 43.0895 18.7253 43.3623 19.4984C43.902 21.0278 43.3492 22.7291 42.0136 23.6492C41.3385 24.1142 40.8429 24.7964 40.6092 25.5821C40.147 27.1367 38.6997 28.1882 37.0784 28.1475C36.2588 28.1269 35.457 28.3874 34.806 28.8858C33.5183 29.8717 31.7294 29.8717 30.4416 28.8858C29.7907 28.3874 28.9888 28.1269 28.1693 28.1475C26.548 28.1882 25.1007 27.1367 24.6384 25.5821C24.4048 24.7964 23.9092 24.1142 23.2341 23.6492C21.8984 22.7291 21.3456 21.0278 21.8854 19.4984C22.1582 18.7253 22.1582 17.8822 21.8854 17.1091C21.3456 15.5797 21.8984 13.8784 23.2341 12.9583C23.9092 12.4933 24.4048 11.8111 24.6384 11.0254C25.1007 9.4708 26.548 8.41932 28.1693 8.46004C28.9888 8.48062 29.7907 8.22007 30.4416 7.72171Z" />
    </svg>
  );
}
