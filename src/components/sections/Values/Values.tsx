'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './Values.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';
import { circuloVerde, puntosRosados } from '@/lib/decor';

const VALORES = [
  {
    titulo: 'Valor humano',
    desc: 'Las personas en el centro: historias, talentos y posibilidades, no solo resultados.',
    color: styles.navy,
    slot: styles.slotHero,
  },
  {
    titulo: 'Cercanía',
    desc: 'Espacios cálidos y genuinos donde podés mostrarte tal como sos.',
    color: styles.rosa,
    slot: styles.slotWide,
  },
  {
    titulo: 'Aprendizaje lúdico',
    desc: 'El juego como herramienta para conectar, aprender y transformar.',
    color: styles.amarillo,
    slot: styles.slotWide,
  },
  {
    titulo: 'Impacto con propósito',
    desc: 'Cada espacio busca aportar valor humano real, no solo cumplir un objetivo.',
    color: styles.verde,
    slot: styles.slotSmall,
  },
  {
    titulo: 'Autenticidad',
    desc: 'Crecer desde lo que realmente sos y querés.',
    color: styles.azul,
    slot: styles.slotSmall,
  },
  {
    titulo: 'Acción consciente',
    desc: 'La transformación sucede cuando la reflexión se vuelve movimiento.',
    color: styles.navy,
    slot: styles.slotSmall,
  },
];

export function Values() {
  // Solo cuenta en móvil: en escritorio la descripción se revela al pasar el cursor
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

        <div className={styles.bentoGrid}>
          {VALORES.map((valor, i) => {
            const activo = abierto === valor.titulo;

            return (
              <Reveal key={valor.titulo} delay={i * 80} className={`${styles.cell} ${valor.slot}`}>
                <button
                  type="button"
                  className={`${styles.item} ${valor.color}`}
                  data-open={activo}
                  aria-expanded={activo}
                  onClick={() => setAbierto(activo ? null : valor.titulo)}
                >
                  <span className={styles.tag}>{String(i + 1).padStart(2, '0')}</span>

                  <span className={styles.itemTitle}>{valor.titulo}</span>
                  <span className={styles.itemDesc}>{valor.desc}</span>

                  <span className={styles.cue} aria-hidden="true">
                    {activo ? '−' : '+'}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
