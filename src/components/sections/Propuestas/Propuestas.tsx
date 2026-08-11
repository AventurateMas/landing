'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './Propuestas.module.css';
import { PropuestaCard } from './PropuestaCard';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Reveal } from '@/components/animations/Reveal';
import { circuloAmarillo, puntosClaros } from '@/lib/decor';
import type { Audiencia, Propuesta } from '@/lib/propuestas';

type Props = {
  personas: Propuesta[];
  empresas: Propuesta[];
};

const AUDIENCIAS: Audiencia[] = ['personas', 'empresas'];

const COPY: Record<Audiencia, { kicker: string; titulo: string; resumen: string; bajada: string }> = {
  personas: {
    kicker: 'Para ti',
    titulo: 'Acompañamiento individual',
    resumen: 'Procesos 1:1 para decidir con más claridad y liderar sin dejar de ser vos.',
    bajada: 'Trabajamos sobre objetivos que definimos juntos en la primera sesión.',
  },
  empresas: {
    kicker: 'Para tu organización',
    titulo: 'Equipos y cultura',
    resumen: 'Programas armados sobre el contexto real del equipo, no sobre una plantilla.',
    bajada: 'Diseñados sobre cómo trabaja hoy tu organización, no sobre una plantilla.',
  },
};

const esAudiencia = (value: string): value is Audiencia =>
  value === 'personas' || value === 'empresas';

export function Propuestas({ personas, empresas }: Props) {
  const [activa, setActiva] = useState<Audiencia>('personas');
  const tabsRef = useRef<Record<Audiencia, HTMLButtonElement | null>>({
    personas: null,
    empresas: null,
  });

  const listas: Record<Audiencia, Propuesta[]> = { personas, empresas };

  // Los enlaces /#personas y /#empresas siguen funcionando: abren la pestaña
  useEffect(() => {
    const desdeHash = () => {
      const hash = window.location.hash.slice(1);
      if (esAudiencia(hash)) setActiva(hash);
    };

    desdeHash();
    window.addEventListener('hashchange', desdeHash);
    return () => window.removeEventListener('hashchange', desdeHash);
  }, []);

  const elegir = useCallback((audiencia: Audiencia, mueveFoco = false) => {
    setActiva(audiencia);
    // replaceState y no push: la URL queda compartible sin llenar el historial
    window.history.replaceState(null, '', `#${audiencia}`);
    if (mueveFoco) tabsRef.current[audiencia]?.focus();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const teclas = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!teclas.includes(event.key)) return;

    event.preventDefault();
    const actual = AUDIENCIAS.indexOf(activa);
    const siguiente =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? AUDIENCIAS.length - 1
          : (actual + (event.key === 'ArrowRight' ? 1 : -1) + AUDIENCIAS.length) % AUDIENCIAS.length;

    elegir(AUDIENCIAS[siguiente], true);
  };

  return (
    <section id="propuestas" className={styles.section}>
      <Image src={puntosClaros} alt="" className={styles.puntosClaros} />
      <Image src={circuloAmarillo} alt="" className={styles.circuloAmarillo} />

      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <h2 className={styles.title}>
              ¿Para ti o para<br />
              <em className={styles.italic}>tu equipo</em>?
            </h2>
            <p className={styles.subtitle}>
              Elige un camino y te muestro solo las propuestas que aplican a tu caso.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Tipo de propuesta"
            onKeyDown={onKeyDown}
          >
            {AUDIENCIAS.map(audiencia => {
              const activo = audiencia === activa;
              const copy = COPY[audiencia];
              const cantidad = listas[audiencia].length;

              return (
                <button
                  key={audiencia}
                  id={audiencia}
                  ref={node => {
                    tabsRef.current[audiencia] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={activo}
                  aria-controls={`panel-${audiencia}`}
                  tabIndex={activo ? 0 : -1}
                  className={`${styles.tab} ${styles[audiencia]}`}
                  onClick={() => elegir(audiencia)}
                >
                  <span className={styles.tabKicker}>{copy.kicker}</span>
                  <span className={styles.tabTitle}>{copy.titulo}</span>
                  <span className={styles.tabResumen}>{copy.resumen}</span>
                  <span className={styles.tabMeta}>
                    <Pill color={audiencia === 'personas' ? 'cream' : 'dark'}>
                      {`${cantidad} ${cantidad === 1 ? 'propuesta' : 'propuestas'}`}
                    </Pill>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {AUDIENCIAS.map(audiencia => {
          const items = listas[audiencia];
          const otra: Audiencia = audiencia === 'personas' ? 'empresas' : 'personas';
          const conImagenes = items.some(item => item.imagen);

          return (
            <div
              key={audiencia}
              id={`panel-${audiencia}`}
              role="tabpanel"
              aria-labelledby={audiencia}
              hidden={audiencia !== activa}
              className={styles.panel}
            >
              <p className={styles.panelBajada}>{COPY[audiencia].bajada}</p>

              {items.length === 0 ? (
                <p className={styles.vacio}>
                  Estoy actualizando las propuestas de esta sección.{' '}
                  <a className={styles.vacioLink} href="#contacto">
                    Escribime y lo vemos en una llamada
                  </a>
                  .
                </p>
              ) : (
                <div
                  className={`${audiencia === 'personas' ? styles.grid : styles.rows} ${
                    conImagenes ? styles.conImagenes : ''
                  }`}
                >
                  {items.map((item, i) => (
                    <PropuestaCard
                      key={item.titulo}
                      propuesta={item}
                      index={i}
                      reservaMedia={audiencia === 'empresas' && conImagenes}
                    />
                  ))}
                </div>
              )}

              <button type="button" className={styles.cruce} onClick={() => elegir(otra)}>
                {otra === 'empresas'
                  ? '¿Buscabas algo para tu equipo? Ver propuestas para empresas'
                  : '¿Buscabas algo para ti? Ver propuestas para personas'}
                <span className={styles.cruceArrow} aria-hidden="true">→</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
