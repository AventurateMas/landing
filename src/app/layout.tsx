import type { Metadata } from "next";
import { Nunito, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { SkipLink } from "@/components/layout/SkipLink/SkipLink";
import { Nav } from "@/components/layout/Nav/Nav";
import { Footer } from "@/components/layout/Footer/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aventuratemas.com";
const description =
  "Coaching individual, talleres de equipo y conferencias con Maritza Rodríguez. Liderazgo facilitador, relaciones horizontales y una cultura laboral más humana.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aventúrate Más — Maritza Rodríguez, coach de talento humano",
    template: "%s · Aventúrate Más",
  },
  description,
  keywords: ["coaching", "liderazgo", "cultura laboral", "talleres de equipo", "talento humano"],
  authors: [{ name: "Maritza Rodríguez" }],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Aventúrate Más",
    title: "Aventúrate Más — Maritza Rodríguez",
    description,
    images: [
      {
        url: "/assets/itza.webp",
        width: 1024,
        height: 1024,
        alt: "Maritza Rodríguez, fundadora de Aventúrate Más",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aventúrate Más — Maritza Rodríguez",
    description,
    images: ["/assets/itza.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SkipLink />
        <Nav />
        <main id="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
