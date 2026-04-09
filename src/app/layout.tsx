import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Shopify - Your Premium E-Commerce Store",
    template: "%s | Shopify",
  },
  description: "Discover quality products at affordable prices. Fast shipping, easy returns, and 24/7 customer support.",
  keywords: ["e-commerce", "online shopping", "products", "electronics", "fashion", "accessories"],
  authors: [{ name: "Shopify Store" }],
  creator: "Shopify",
  publisher: "Shopify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shopify.com",
    siteName: "Shopify",
    title: "Shopify - Your Premium E-Commerce Store",
    description: "Discover quality products at affordable prices. Fast shipping, easy returns, and 24/7 customer support.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shopify - Premium E-Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify - Your Premium E-Commerce Store",
    description: "Discover quality products at affordable prices. Fast shipping, easy returns, and 24/7 customer support.",
    images: ["/og-image.jpg"],
    creator: "@shopify",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
