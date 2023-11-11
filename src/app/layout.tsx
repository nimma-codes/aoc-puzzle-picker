import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";

const sourceCodeProFont = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Advent Of Code Puzzle Picker",
  description: "Select a random Advent of Code puzzle based on complexity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="favicon.png" />
      <body className={sourceCodeProFont.className}>{children}</body>
    </html>
  );
}
