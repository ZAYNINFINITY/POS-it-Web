import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const BASE_URL = "https://pos-it.app";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "POS-it — Offline POS for Pakistani Shops", template: "%s | POS-it" },
  description: "Bill customers, manage inventory, and track credit sales — 100% offline. No monthly fee, no cloud, no internet required. Runs on Windows 7+. Buy once, own forever.",
  keywords: ["POS software Pakistan","offline billing software","dukan POS","pharmacy billing software","hardware shop POS","offline inventory management","point of sale Pakistan","udhar tracking software"],
  authors: [{ name: "POS-it", url: BASE_URL }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    title: "POS-it — Offline POS for Pakistani Shops",
    description: "Bill customers, manage stock, and track udhar — completely offline. One-time payment, runs on any Windows PC.",
    url: BASE_URL, siteName: "POS-it", type: "website", locale: "en_PK",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "POS-it" }],
  },
  twitter: { card: "summary_large_image", title: "POS-it — Offline POS", images: ["/og-image.png"] },
  icons: { icon: "/pos logo.png", shortcut: "/pos logo.png", apple: "/pos logo.png" },
  alternates: { canonical: BASE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "POS-it",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows 7, Windows 8, Windows 10, Windows 11",
  offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
  description: "Offline-first POS for Pakistani retail shops. Billing, inventory, udhar, staff, reports — no internet required.",
  url: BASE_URL,
};

export default function RootLayout({ children }) {
  return (
    /*
      suppressHydrationWarning on <html> is the correct Next.js pattern when
      a browser extension or inline script mutates html attributes after
      server render (e.g. data-theme). React will skip the attribute diff on
      this specific element rather than throwing a hydration mismatch warning.
      We also set data-theme="dark" statically so SSR and CSR always agree.
    */
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
