import { Hero } from '@/components/sections/Hero/Hero';
import { Marquee } from '@/components/sections/Marquee/Marquee';
import { Team } from '@/components/sections/Team/Team';
import { Services } from '@/components/sections/Services/Services';
import { Values } from '@/components/sections/Values/Values';
import { Testimonial } from '@/components/sections/Testimonial/Testimonial';
import { CTA } from '@/components/sections/CTA/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Team />
      <Services />
      <Values />
      <Testimonial />
      <CTA />
    </>
  );
}
