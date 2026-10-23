'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';

import styles from './Values.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';
import { circuloVerde, puntosRosados } from '@/lib/decor';

const v = (vars: Record<string, string>) => vars as CSSProperties;

// Una ilustración por valor, hecha con el círculo de la marca. Quietas por
// defecto; se animan al pasar el cursor, al enfocar con teclado o al tocar.
const ILUS: Record<string, ReactNode> = {
  // Personas (círculos) que se acercan y forman un grupo
  humano: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <circle className={styles.reunir} style={v({ '--dx': '22px', '--dy': '10px' })} cx="40" cy="40" r="16" fill="var(--tile-accent)" />
      <circle className={styles.reunir} style={v({ '--dx': '-20px', '--dy': '14px' })} cx="160" cy="34" r="12" fill="currentColor" />
      <circle className={styles.reunir} style={v({ '--dx': '18px', '--dy': '-16px' })} cx="58" cy="100" r="10" fill="currentColor" />
      <circle className={styles.reunir} style={v({ '--dx': '-16px', '--dy': '-12px' })} cx="150" cy="96" r="18" fill="var(--tile-accent)" />
      <circle cx="100" cy="66" r="22" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 6" />
    </svg>
  ),
  // Dos círculos que se acercan hasta tocarse
  cercania: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <circle className={styles.acercarIzq} cx="60" cy="60" r="26" fill="currentColor" />
      <circle className={styles.acercarDer} cx="140" cy="60" r="26" fill="var(--tile-accent)" />
    </svg>
  ),
  // Una pelota que rebota: el juego
  ludico: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <ellipse className={styles.sombra} cx="100" cy="108" rx="22" ry="5" fill="currentColor" opacity="0.25" />
      <circle className={styles.rebote} cx="100" cy="40" r="20" fill="var(--tile-accent)" />
      <line x1="30" y1="114" x2="170" y2="114" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  // Un punto que llega al centro de la diana: propósito
  impacto: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <circle cx="130" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
      <circle cx="130" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
      <circle cx="130" cy="60" r="12" fill="var(--tile-accent)" />
      <circle className={styles.disparo} cx="20" cy="60" r="7" fill="currentColor" />
    </svg>
  ),
  // El contorno se alinea con su forma: ser quien eres
  autenticidad: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <circle cx="100" cy="64" r="32" fill="var(--tile-accent)" />
      <circle className={styles.alinear} cx="124" cy="46" r="32" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 6" />
    </svg>
  ),
  // Una onda (reflexión) que se vuelve trazo hacia adelante (movimiento)
  accion: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <path className={styles.trazo} d="M20 70 q20 -30 40 0 t40 0 t40 0 L176 60" fill="none" stroke="var(--tile-accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M164 48 L180 60 L164 72" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const VALORES = [
  {
    titulo: 'Valor humano',
    desc: 'Las personas en el centro: historias, talentos y posibilidades, no solo resultados.',
    ilus: 'humano',
    color: styles.navy,
    slot: styles.slotHero,
  },
  {
    titulo: 'Cercanía',
    desc: 'Espacios cálidos y genuinos donde puedes mostrarte tal como eres.',
    ilus: 'cercania',
    color: styles.rosa,
    slot: styles.slotWide,
  },
  {
    titulo: 'Aprendizaje lúdico',
    desc: 'El juego como herramienta para conectar, aprender y transformar.',
    ilus: 'ludico',
    color: styles.amarillo,
    slot: styles.slotWide,
  },
  {
    titulo: 'Impacto con propósito',
    desc: 'Cada espacio busca aportar valor humano real, no solo cumplir un objetivo.',
    ilus: 'impacto',
    color: styles.amarillo,
    slot: styles.slotSmall,
  },
  {
    titulo: 'Autenticidad',
    desc: 'Crecer desde lo que realmente eres y quieres.',
    ilus: 'autenticidad',
    color: styles.navy,
    slot: styles.slotSmall,
  },
  {
    titulo: 'Acción consciente',
    desc: 'La transformación sucede cuando la reflexión se vuelve movimiento.',
    ilus: 'accion',
    color: styles.rosa,
    slot: styles.slotSmall,
  },
];

export function Values() {
  // En móvil la descripción se ve completa; tocar la tarjeta solo anima la ilustración
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <section id="valores" className={styles.valuesSection}>
      <Image src={puntosRosados} alt="" className={styles.puntosAmarillos} />
      <Image src={circuloVerde} alt="" className={styles.circuloVerde} />

      <SectionDivider src="/assets/ondas-claras.png" variant="end" />

      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <h2 className={styles.title}>
              6 valores que <em className={styles.italic}>guían</em> el trabajo.
            </h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {VALORES.map((valor, i) => {
            const activo = abierto === valor.titulo;

            return (
              <Reveal key={valor.titulo} delay={i * 80} className={`${styles.cell} ${valor.slot}`}>
                <button
                  type="button"
                  className={`${styles.item} ${valor.color}`}
                  data-open={activo}
                  onClick={() => setAbierto(activo ? null : valor.titulo)}
                >
                  <span className={styles.ilus}>{ILUS[valor.ilus]}</span>

                  <span className={styles.tag}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.itemTitle}>{valor.titulo}</span>
                  <span className={styles.itemDesc}>{valor.desc}</span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
