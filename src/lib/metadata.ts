import type { Metadata } from "next";

/*
 * next replaces (not merges) openGraph/twitter objects per page, so a page
 * that sets its own og title would lose the shared image and card type.
 * build page metadata through here to keep them.
 */
export function pageMetadata(title: string, description: string): Metadata {
  const full = `${title} - Polu`;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Polu",
      locale: "en_NG",
      title: full,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Polu - One destination for all prints" }],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: ["/twitter-image"],
    },
  };
}
