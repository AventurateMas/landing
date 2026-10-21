import type { Metadata } from "next";
import { Nunito, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { SkipLink } from "@/components/layout/SkipLink/SkipLink";
import { Nav } from "@/components/layout/Nav/Nav";
import { Footer } from "@/components/layout/Footer/Footer";

// Cuerpo: Nunito, terminaciones redondeadas que acompañan el tono cálido y cercano
// de un proceso de coaching; se lee bien en párrafos largos.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

// Títulos: Space Grotesk, geométrica con formas algo irregulares (la a, la g):
// le da el punto lúdico a los titulares y contrasta con la suavidad de Nunito.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aventuratemas.com";
const description =
  "Coaching y aprendizaje lúdico con Maritza Rodríguez. Para personas: liderazgo, orientación vocacional y coaching individual. Para organizaciones: coaching de equipos, capacitación y selección de talento.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aventúrate Más · Maritza Rodríguez, coach de talento humano",
    template: "%s · Aventúrate Más",
  },
  description,
  keywords: ["coaching", "liderazgo", "orientación vocacional", "coaching de equipos", "capacitación", "selección de talento", "talento humano"],
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
    title: "Aventúrate Más · Maritza Rodríguez",
    description,
    images: [
      {
        // Vista previa al compartir (WhatsApp, redes): logo sobre el rosa claro de la marca
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Logo de Aventúrate Más",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aventúrate Más · Maritza Rodríguez",
    description,
    images: ["/og.png"],
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
