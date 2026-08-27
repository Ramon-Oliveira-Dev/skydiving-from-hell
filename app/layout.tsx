import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import { BAND_INFO, FEATURED_SHOW, MEMBERS } from "../lib/band-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BAND_INFO.url),
  title: "Skydiving From Hell — Metal moderno de Vila Velha / ES",
  description:
    "Guitarras de 8 cordas, bumbos duplos e breakdowns. Quatro singles, agenda de shows e loja oficial.",
  keywords: [
    "Skydiving From Hell",
    "SDFH",
    "Metal moderno",
    "Metal Vila Velha",
    "Metal ES",
    "Guitarras de 8 cordas",
    "Metalcore",
    "Deathcore",
  ],
  authors: [{ name: "Skydiving From Hell" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "S.D.F.H.",
    startupImage: ["/banner_sdfh_dark.png"],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BAND_INFO.url,
    title: "Skydiving From Hell — Metal moderno de Vila Velha / ES",
    description:
      "Guitarras de 8 cordas, bumbos duplos e breakdowns. Quatro singles, agenda de shows e loja oficial.",
    siteName: "Skydiving From Hell",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Skydiving From Hell — Metal Moderno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skydiving From Hell — Metal moderno de Vila Velha / ES",
    description:
      "Guitarras de 8 cordas, bumbos duplos e breakdowns. Quatro singles, agenda de shows e loja oficial.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdMusicGroup = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: BAND_INFO.name,
    alternateName: BAND_INFO.alternateName,
    genre: BAND_INFO.genre,
    foundingDate: BAND_INFO.foundingDate,
    foundingLocation: {
      "@type": "Place",
      name: BAND_INFO.location,
    },
    url: BAND_INFO.url,
    email: BAND_INFO.email,
    sameAs: [
      BAND_INFO.socials.instagram,
      BAND_INFO.socials.youtube,
      BAND_INFO.socials.facebook,
      BAND_INFO.socials.tiktok,
      BAND_INFO.socials.spotify,
    ],
    member: MEMBERS.map((m) => ({
      "@type": "Person",
      name: m.name,
      roleName: m.role.split("/")[0].trim(),
    })),
  };

  const jsonLdMusicEvent = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: FEATURED_SHOW.title,
    startDate: FEATURED_SHOW.isoStartDate,
    endDate: FEATURED_SHOW.isoEndDate,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "MusicVenue",
      name: FEATURED_SHOW.venueName,
      address: FEATURED_SHOW.address,
    },
    performer: [
      {
        "@type": "MusicGroup",
        name: BAND_INFO.name,
      },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="S.D.F.H." />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMusicGroup) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMusicEvent) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#08070a] text-[#e8e4dd]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
