import { cn } from "@/lib/cn";

/* the yellow "event brochure / place order" sticker from the auth illustration, as html */
export function OrderTicket({
  title,
  qty,
  icon,
  className,
}: {
  title: string;
  qty: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-[330px] items-center gap-3 rounded-lg border-[0.5px] border-ink bg-secondary p-3 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)]",
        className,
      )}
    >
      <div className="flex size-14 shrink-0 items-center justify-center rounded bg-secondary-200 text-2xl">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-body font-bold whitespace-nowrap text-ink">{title}</p>
        <p className="text-xs font-bold text-ink">{qty}</p>
      </div>
      <span className="shrink-0 rounded-full border-[0.5px] border-ink bg-white px-4 py-2 text-sm font-bold whitespace-nowrap text-ink">
        Place order
      </span>
    </div>
  );
}
