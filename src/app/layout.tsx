import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Great_Vibes,
  Tangerine,
  Alex_Brush,
  Pinyon_Script,
  Josefin_Sans,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#faf8f5",
  colorScheme: "only light" as any,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://all.weddinginvite.dotpunksolutions.com"),
  title: "Ahsan Ali & Saman Shehzadi — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding festivities of Ahsan Ali and Saman Shehzadi.",
  keywords: [
    "wedding",
    "invitation",
    "Ahsan",
    "Saman",
    "Mehndi",
    "Barat",
    "Valima",
  ],
  openGraph: {
    title: "Ahsan Ali & Saman Shehzadi — Wedding Invitation",
    description:
      "You are cordially invited to celebrate the wedding festivities of Ahsan Ali and Saman Shehzadi. Crafted with ♥ by dotpunksolutions.com",
    url: "https://all.weddinginvite.dotpunksolutions.com",
    siteName: "Ahsan & Saman Wedding",
    images: [
      {
        url: "/assets/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Ahsan & Saman Wedding Invitation Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahsan Ali & Saman Shehzadi — Wedding Invitation",
    description:
      "You are cordially invited to celebrate the wedding festivities of Ahsan Ali and Saman Shehzadi. Crafted with ♥ by dotpunksolutions.com",
    images: [
      {
        url: "/assets/thumbnail.jpg",
        alt: "Ahsan & Saman Wedding Invitation Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${cormorant.variable}
        ${playfair.variable}
        ${greatVibes.variable}
        ${tangerine.variable}
        ${alexBrush.variable}
        ${pinyonScript.variable}
        ${josefinSans.variable}
        antialiased
      `}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
