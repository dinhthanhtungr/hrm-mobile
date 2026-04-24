import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import "./globals.css";

const openSans = localFont({
  src: [
    {
      path: "./fonts/open-sans/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/open-sans/OpenSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/open-sans/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/open-sans/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VAE HRM",
  description: "Mobile-first HRM app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn("h-full antialiased", "font-sans", openSans.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
