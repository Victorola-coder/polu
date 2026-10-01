import localFont from "next/font/local";

export const athletics = localFont({
  variable: "--font-athletics",
  display: "swap",
  src: [
    { path: "./athletics/athletics-light.otf", weight: "300", style: "normal" },
    { path: "./athletics/athletics-light-italic.otf", weight: "300", style: "italic" },
    { path: "./athletics/athletics-regular.otf", weight: "400", style: "normal" },
    { path: "./athletics/athletics-regular-italic.otf", weight: "400", style: "italic" },
    { path: "./athletics/athletics-medium.otf", weight: "500", style: "normal" },
    { path: "./athletics/athletics-medium-italic.otf", weight: "500", style: "italic" },
    { path: "./athletics/athletics-bold.otf", weight: "700", style: "normal" },
    { path: "./athletics/athletics-bold-italic.otf", weight: "700", style: "italic" },
    { path: "./athletics/athletics-extrabold.otf", weight: "800", style: "normal" },
    { path: "./athletics/athletics-extrabold-italic.otf", weight: "800", style: "italic" },
    { path: "./athletics/athletics-black.otf", weight: "900", style: "normal" },
    { path: "./athletics/athletics-black-italic.otf", weight: "900", style: "italic" },
  ],
});

export const kelpo = localFont({
  variable: "--font-kelpo",
  display: "swap",
  src: "./kelpo/kelpo.otf",
});
