import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const title = "Oot Weel Tattoo | Tattoo & Piercing Shop in Playa del Carmen";
const description =
  "Custom tattoos designed with time and care, at fair prices. Tattoo and piercing studio on Avenida 10, Playa del Carmen. Rated 4.9 on Google. Get your quote on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  keywords: [
    "tattoo shop Playa del Carmen",
    "tattoo and piercing Playa del Carmen",
    "affordable tattoo Playa del Carmen",
    "custom tattoo Playa del Carmen",
    "piercing Playa del Carmen",
    "Oot Weel Tattoo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#131512",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grain">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
