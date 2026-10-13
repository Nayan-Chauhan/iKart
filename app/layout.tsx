import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iKart — Digital products, thoughtfully made",
  description: "A portfolio presented like your favourite marketplace."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
