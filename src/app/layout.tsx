import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polu.ng"),
  title: {
    default: "Polu - One destination for all prints",
    template: "%s - Polu",
  },
  description:
    "Order custom posters, stickers and branded prints, track every stage and get them delivered to your doorstep.",
  keywords: ["polu", "printing", "stickers", "posters", "branding", "nigeria"],
  openGraph: {
    type: "website",
    siteName: "Polu",
    title: "Polu - One destination for all prints",
    description:
      "Order custom posters, stickers and branded prints, track every stage and get them delivered to your doorstep.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
