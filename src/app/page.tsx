import { Hero } from '@/components/sections/Hero/Hero';
import { Propuestas } from '@/components/sections/Propuestas/Propuestas';
import { Marquee } from '@/components/sections/Marquee/Marquee';
import { Team } from '@/components/sections/Team/Team';
import { Values } from '@/components/sections/Values/Values';
import { CTA } from '@/components/sections/CTA/CTA';
import { getPropuestas } from '@/lib/getPropuestas';

export default function Home() {
  return (
    <>
      <Hero />
      <Propuestas personas={getPropuestas('personas')} empresas={getPropuestas('empresas')} />
      <Marquee />
      <CTA />
      <Values />
      <Team />
    </>
  );
}
