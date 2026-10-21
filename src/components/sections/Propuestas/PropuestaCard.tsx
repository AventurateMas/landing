import type { CSSProperties } from 'react';
import Image from 'next/image';

import styles from './Propuestas.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { PALETTE, type Propuesta } from '@/lib/propuestas';

const esExterno = (href: string) => /^https?:/i.test(href);

function cardVars(propuesta: Propuesta): CSSProperties {
  const palette = PALETTE[propuesta.color];
  return {
    '--card-bg': palette.bg,
    '--card-fg': palette.fg,
    '--card-accent': palette.accent,
    '--card-rule': palette.rule,
  } as CSSProperties;
}

const ola = (y: number) => `M0 ${y}` + ' q25 -16 50 0 t50 0'.repeat(6);

/** Ilustraciones animadas: rotan por posición para que cada servicio se vea distinto. */
const ILUSTRACIONES = [
  // Órbita: un planeta y un satélite que gira alrededor
  <svg key="orbita" viewBox="0 0 300 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle className={styles.ilFlota} cx="215" cy="70" r="34" fill="var(--card-accent)" />
    <g className={styles.ilOrbita}>
      <circle cx="215" cy="70" r="56" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 9" opacity="0.5" />
      <circle cx="271" cy="70" r="9" fill="currentColor" />
    </g>
    <circle cx="60" cy="40" r="5" fill="currentColor" />
    <circle cx="100" cy="100" r="4" fill="var(--card-accent)" />
  </svg>,
  // Olas: tres líneas que avanzan a distinto ritmo
  <svg key="olas" viewBox="0 0 300 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <path className={styles.ilOla} d={ola(45)} stroke="var(--card-accent)" />
    <path className={`${styles.ilOla} ${styles.ilLenta}`} d={ola(75)} stroke="currentColor" opacity="0.6" />
    <path className={`${styles.ilOla} ${styles.ilRapida}`} d={ola(105)} stroke="var(--card-accent)" opacity="0.7" />
  </svg>,
  // Escalones: círculos que suben uno tras otro, como avanzar paso a paso
  <svg key="escalones" viewBox="0 0 300 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle className={styles.ilPaso} cx="150" cy="105" r="12" fill="currentColor" opacity="0.5" />
    <circle className={`${styles.ilPaso} ${styles.ilPaso2}`} cx="195" cy="80" r="16" fill="currentColor" opacity="0.75" />
    <circle className={`${styles.ilPaso} ${styles.ilPaso3}`} cx="245" cy="50" r="22" fill="var(--card-accent)" />
  </svg>,
];

type Props = {
  propuesta: Propuesta;
  index: number;
};

/** Un servicio de la ruta: pin sobre la línea, tarjeta y número grande al otro lado. */
export function PropuestaCard({ propuesta, index }: Props) {
  const { imagen, cta } = propuesta;
  const numero = String(index + 1).padStart(2, '0');

  return (
    <Reveal className={styles.parada}>
      <div className={styles.paradaInner} style={cardVars(propuesta)}>
        <span className={styles.pin} aria-hidden="true">
          {numero}
        </span>

        <span className={styles.numeroGrande} aria-hidden="true">
          {numero}
        </span>

        <article className={styles.card}>
          <div className={styles.visual}>
            {imagen ? (
              <Image
                src={imagen.src}
                alt={imagen.alt}
                fill
                sizes="(max-width: 900px) 100vw, 460px"
                className={styles.mediaImg}
              />
            ) : (
              ILUSTRACIONES[index % ILUSTRACIONES.length]
            )}
          </div>

          <h3 className={styles.cardTitle}>{propuesta.titulo}</h3>
          {propuesta.descripcion && <p className={styles.cardDesc}>{propuesta.descripcion}</p>}

          {propuesta.puntos.length > 0 && (
            <ul className={styles.puntos}>
              {propuesta.puntos.map(punto => (
                <li key={punto} className={styles.punto}>
                  <span className={styles.dash} aria-hidden="true" />
                  {punto}
                </li>
              ))}
            </ul>
          )}

          <a
            className={styles.cta}
            href={cta.href}
            {...(esExterno(cta.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {cta.texto}
            <span className={styles.ctaArrow} aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </Reveal>
  );
}
