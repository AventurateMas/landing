'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './Propuestas.module.css';
import { PropuestaCard } from './PropuestaCard';
import { Reveal } from '@/components/animations/Reveal';
import { circuloAmarillo, puntosClaros } from '@/lib/decor';
import { rutaPath, type Audiencia, type Propuesta } from '@/lib/propuestas';

type Props = {
  personas: Propuesta[];
  empresas: Propuesta[];
};

const AUDIENCIAS: Audiencia[] = ['empresas', 'personas'];

const PersonaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

const PersonasIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <circle cx="17" cy="9" r="2.8" />
    <path d="M17.5 14.2A5.5 5.5 0 0 1 22 20" />
  </svg>
);

const COPY: Record<Audiencia, { kicker: string; titulo: string; bajada: string; Icon: () => React.JSX.Element }> = {
  empresas: {
    kicker: 'Para tu equipo',
    titulo: 'Organizaciones y empresas',
    bajada: 'Diseñados sobre cómo trabaja hoy tu organización, no sobre una plantilla.',
    Icon: PersonasIcon,
  },
  personas: {
    kicker: 'Para ti',
    titulo: 'Acompañamiento individual',
    bajada: 'Trabajamos sobre objetivos que definimos juntos en la primera sesión.',
    Icon: PersonaIcon,
  },
};

const esAudiencia = (value: string): value is Audiencia =>
  value === 'personas' || value === 'empresas';

export function Propuestas({ personas, empresas }: Props) {
  // null = nada elegido: se ven las pestañas y ninguna lista hasta que haya clic o hash
  const [activa, setActiva] = useState<Audiencia | null>(null);
  // Móvil: la ruta es un carrusel horizontal; esto sigue qué tarjeta está a la vista
  const [slide, setSlide] = useState<Record<Audiencia, number>>({ personas: 0, empresas: 0 });
  const rutasRef = useRef<Record<Audiencia, HTMLDivElement | null>>({ personas: null, empresas: null });

  const tarjetas = (audiencia: Audiencia) =>
    [...(rutasRef.current[audiencia]?.querySelectorAll<HTMLElement>(':scope > div') ?? [])];

  const alDeslizar = (audiencia: Audiencia) => {
    const ruta = rutasRef.current[audiencia];
    if (!ruta) return;
    const centro = ruta.scrollLeft + ruta.clientWidth / 2;
    const cards = tarjetas(audiencia);
    const i = cards.findIndex(c => c.offsetLeft + c.offsetWidth > centro);
    setSlide(prev => (prev[audiencia] === i || i < 0 ? prev : { ...prev, [audiencia]: i }));
  };

  const irA = (audiencia: Audiencia, i: number) => {
    const ruta = rutasRef.current[audiencia];
    const card = tarjetas(audiencia)[i];
    if (ruta && card) ruta.scrollTo({ left: card.offsetLeft - (ruta.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };
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

  // Con clic (no con flechas) bajamos hasta las propuestas: en móvil quedan
  // fuera de pantalla debajo de las pestañas. rAF espera a que el panel deje de
  // estar `hidden`; el smooth y el offset del nav los pone el CSS de <html>.
  const elegirYVer = (audiencia: Audiencia) => {
    elegir(audiencia);
    requestAnimationFrame(() =>
      document.getElementById(`panel-${audiencia}`)?.scrollIntoView({ block: 'start' }),
    );
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const teclas = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!teclas.includes(event.key)) return;

    event.preventDefault();
    const actual = activa ? AUDIENCIAS.indexOf(activa) : -1;
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
              ¿Para tu equipo<br />
              o para <em className={styles.italic}>ti</em>?
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
            data-elegida={activa !== null}
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
                  // Sin elección, la primera pestaña sigue alcanzable con Tab
                  tabIndex={activo || (activa === null && audiencia === AUDIENCIAS[0]) ? 0 : -1}
                  className={`${styles.tab} ${styles[audiencia]}`}
                  onClick={() => elegirYVer(audiencia)}
                >
                  <span className={styles.tabIcon}>
                    <copy.Icon />
                  </span>
                  <span className={styles.tabText}>
                    <span className={styles.tabKicker}>
                      {`${copy.kicker} · ${cantidad} ${cantidad === 1 ? 'servicio' : 'servicios'}`}
                    </span>
                    <span className={styles.tabTitle}>{copy.titulo}</span>
                  </span>
                  <span className={styles.tabChevron} aria-hidden="true">↓</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {AUDIENCIAS.map(audiencia => {
          const items = listas[audiencia];
          const otra: Audiencia = audiencia === 'personas' ? 'empresas' : 'personas';

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
                    Escríbeme y lo vemos en una llamada
                  </a>
                  .
                </p>
              ) : (
                <>
                  <div
                    className={styles.ruta}
                    ref={node => {
                      rutasRef.current[audiencia] = node;
                    }}
                    onScroll={() => alDeslizar(audiencia)}
                  >
                    {/* Camino: base punteada + trazo que se completa con el scroll.
                      Dos svg porque el recorte animado va sobre el elemento entero */}
                    {[styles.caminoBase, styles.caminoTrazo].map(clase => (
                      <svg
                        key={clase}
                        className={`${styles.camino} ${clase}`}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d={rutaPath(items.length)} vectorEffect="non-scaling-stroke" />
                      </svg>
                    ))}

                    {items.map((item, i) => (
                      <PropuestaCard key={item.titulo} propuesta={item} index={i} />
                    ))}

                    <span className={styles.meta} aria-hidden="true" />
                  </div>

                  {/* Solo móvil: puntos del carrusel, también se pueden tocar */}
                  <div className={styles.puntosCarrusel}>
                    {items.map((item, i) => (
                      <button
                        key={item.titulo}
                        type="button"
                        className={styles.puntoCarrusel}
                        aria-label={`Ver servicio ${i + 1}: ${item.titulo}`}
                        aria-current={slide[audiencia] === i ? 'true' : undefined}
                        onClick={() => irA(audiencia, i)}
                      />
                    ))}
                  </div>
                </>
              )}

              <button type="button" className={styles.cruce} onClick={() => elegirYVer(otra)}>
                {otra === 'empresas'
                  ? '¿Buscabas algo para tu equipo? Ver servicios para organizaciones y empresas'
                  : '¿Buscabas algo para ti? Ver servicios para personas'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
