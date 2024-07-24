import type { Metadata } from "next";
import { Outfit, Kalnia } from "next/font/google";
import { Providers } from "../components/providers";
import "./globals.css";
import AppNav from "@/components/navbar/AppNav";

// Fonts
const kalnia = Kalnia({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kalnia",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "gRabbit",
  description: "A fake e-commerce site for learning Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${kalnia.variable}`}>
        <body>
          <Providers>
            <AppNav />
            <main className="container mx-auto">
              {children}
            </main>
          </Providers>
        </body>
    </html>
  );
}
