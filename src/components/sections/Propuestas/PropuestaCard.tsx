import type { CSSProperties } from 'react';
import Image from 'next/image';

import styles from './Propuestas.module.css';
import { PALETTE, type Propuesta } from '@/lib/propuestas';

const esExterno = (href: string) => /^https?:/i.test(href);

function cardVars(propuesta: Propuesta): CSSProperties {
  const palette = PALETTE[propuesta.color];
  return {
    '--card-bg': palette.bg,
    '--card-fg': palette.fg,
    '--card-accent': palette.accent,
    '--card-accent-dark': palette.accentDark,
    '--card-rule': palette.rule,
  } as CSSProperties;
}

type Props = {
  propuesta: Propuesta;
  index: number;
  /** true = reserva la celda de imagen aunque esta propuesta no tenga foto */
  reservaMedia?: boolean;
};

export function PropuestaCard({ propuesta, index, reservaMedia = false }: Props) {
  const { imagen, cta } = propuesta;

  return (
    <article className={styles.card} style={cardVars(propuesta)}>
      <span className={styles.numero}>{String(index + 1).padStart(2, '0')}</span>

      {(imagen || reservaMedia) && (
        <div className={styles.media}>
          {imagen && (
            <Image
              src={imagen.src}
              alt={imagen.alt}
              fill
              sizes="(max-width: 900px) 100vw, 380px"
              className={styles.mediaImg}
            />
          )}
        </div>
      )}

      <div className={styles.body}>
        <h3 className={styles.cardTitle}>{propuesta.titulo}</h3>
        {propuesta.descripcion && <p className={styles.cardDesc}>{propuesta.descripcion}</p>}
      </div>

      {propuesta.puntos.length > 0 && (
        <ul className={styles.puntos}>
          {propuesta.puntos.map(punto => (
            <li key={punto} className={styles.punto}>
              <span className={styles.dash} aria-hidden="true">—</span>
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
        <span className={styles.ctaArrow} aria-hidden="true">→</span>
      </a>
    </article>
  );
}
