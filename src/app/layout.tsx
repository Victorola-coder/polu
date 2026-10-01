import type { Metadata } from "next";
import { athletics, kelpo } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  // swap for the real domain once there is one (or set NEXT_PUBLIC_SITE_URL)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://polu-rho.vercel.app"),
  title: {
    default: "Polu - One destination for all prints",
    template: "%s - Polu",
  },
  description:
    "Order custom posters, stickers and branded prints, track every stage and get them delivered to your doorstep.",
  keywords: ["polu", "printing", "stickers", "posters", "branding", "nigeria"],
  applicationName: "Polu",
  authors: [{ name: "Polu Technology Limited" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Polu",
    title: "Polu - One destination for all prints",
    description:
      "Order custom posters, stickers and branded prints, track every stage and get them delivered to your doorstep.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polu - One destination for all prints",
    description:
      "Order custom posters, stickers and branded prints, track every stage and get them delivered to your doorstep.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${athletics.variable} ${kelpo.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
