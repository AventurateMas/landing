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

export const metadata: Metadata = {
  title: "Aventúrate Más - Maritza Rodríguez",
  description: "Potencia tu liderazgo desde adentro con Maritza Rodríguez.",
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
