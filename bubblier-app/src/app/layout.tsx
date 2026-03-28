import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bubblier — Premium Bubble Tea Experience",
  description:
    "Discover the art of bubble tea. Handcrafted with premium ingredients, every sip tells a story of flavor, freshness, and fun.",
  keywords: [
    "bubble tea",
    "boba",
    "milk tea",
    "premium drinks",
    "bubblier",
    "café",
  ],
  openGraph: {
    title: "Bubblier — Premium Bubble Tea Experience",
    description:
      "Discover the art of bubble tea. Handcrafted with premium ingredients.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-brand-dark text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
