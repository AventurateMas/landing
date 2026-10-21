import Image from 'next/image';

import styles from './Partners.module.css';
import { Reveal } from '@/components/animations/Reveal';
import type { Partner } from '@/lib/getPartners';

// El color sale de la posición: el panel no tiene que pensar en paleta
const COLORES = [styles.rosa, styles.amarillo, styles.navy];

const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

export function Partners({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;

  return (
    <section id="partners" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Partners</p>
            <h2 className={styles.title}>
              Personas que <em className={styles.italic}>suman</em> a la aventura
            </h2>
          </div>
        </Reveal>

        {/* La línea punteada que corre detrás de las fotos dibuja la "red" */}
        <ul className={styles.red}>
          {partners.map((partner, i) => {
            const contenido = (
              <>
                <span className={styles.avatarWrap}>
                  <span className={styles.anillo} aria-hidden="true" />
                  <span className={styles.avatar}>
                    {partner.foto ? (
                      <Image src={partner.foto} alt="" fill sizes="128px" className={styles.foto} />
                    ) : (
                      <span aria-hidden="true">{iniciales(partner.nombre)}</span>
                    )}
                  </span>
                </span>
                <span className={styles.area}>{partner.area}</span>
                <span className={styles.nombre}>{partner.nombre}</span>
                {partner.descripcion && <span className={styles.desc}>{partner.descripcion}</span>}
                {partner.pie && (
                  <span className={styles.verPerfil}>
                    {partner.pie}
                    {partner.link && (
                      <>
                        {' '}
                        <span className={styles.flecha} aria-hidden="true">↗</span>
                      </>
                    )}
                  </span>
                )}
              </>
            );

            return (
              <li key={`${partner.nombre}-${i}`} className={COLORES[i % COLORES.length]}>
                <Reveal delay={i * 120} className={styles.revealCard}>
                  {partner.link ? (
                    <a
                      href={partner.link}
                      className={styles.card}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contenido}
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </a>
                  ) : (
                    <div className={styles.card}>{contenido}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
