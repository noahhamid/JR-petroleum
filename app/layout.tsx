import type React from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jr Petroleum | Ethiopia's Leading Energy Company",
  description:
    "Jr Petroleum - Powering Ethiopia's future with reliable petroleum products and strategic partnerships with Ethiopian Airlines.",

  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/dijiwkewo/image/upload/v1765728857/download__1_-removebg-preview_fn6qpb.png",
        media: "(prefers-color-scheme: light)",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_inter.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
