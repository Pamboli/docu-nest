import { Domine, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
});
