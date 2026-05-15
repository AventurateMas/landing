import React from 'react';
import styles from './Services.module.css';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Reveal } from '@/components/animations/Reveal';

const services = [
  {
    title: 'Coaching individual',
    desc: 'Sesiones 1:1 para potenciar tu liderazgo y descubrir tu talento.',
    points: ['8 sesiones', 'Plan personalizado', 'Acompañamiento continuo'],
    bg: 'var(--color-navy)', fg: 'var(--color-text-light)', accent: 'var(--color-amarillo)',
    descColor: 'rgba(255, 255, 255, 0.8)',
    tag: '01',
  },
  {
    title: 'Talleres de equipo',
    desc: 'Dinámicas colaborativas para construir cultura laboral.',
    points: ['Hasta 20 personas', 'Presencial · Online', 'Materiales incluidos'],
    bg: 'var(--color-verde)', fg: 'var(--color-navy)', accent: 'var(--color-amarillo)',
    descColor: 'rgba(51, 56, 109, 0.8)',
    tag: '02',
  },
  {
    title: 'Conferencias',
    desc: 'Charlas inspiradoras sobre talento humano y cultura.',
    points: ['45–90 min', 'Q&A incluido', 'Eventos abiertos'],
    bg: 'var(--color-amarillo)', fg: 'var(--color-navy)', accent: 'var(--color-rosa)',
    descColor: 'rgba(51, 56, 109, 0.8)',
    tag: '03',
  },
];

export function Services() {
  return (
    <section id="Servicios" className={styles.servicesSection}>
      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>
                ¿Cómo puedo<br />
                <em className={styles.italic}>acompañarte</em>?
              </h2>
            </div>
            <p className={styles.subtitle}>
              Tres maneras de trabajar juntos para potenciar tu liderazgo y el de tu equipo.
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 150} className={styles.cardWrapper}>
              <div className={styles.card} style={{ background: s.bg, color: s.fg }}>
                <div className={styles.cardTop}>
                  <span className={styles.tag} style={{ color: s.accent }}>{s.tag}</span>
                  <div className={styles.arrow} style={{ background: s.accent, color: s.bg }}>↗</div>
                </div>

                <div>
                  <div className={styles.cardTitle}>{s.title}</div>
                  <p
                    className={styles.cardDesc}
                    style={{ color: s.descColor || 'inherit' }}
                  >
                    {s.desc}
                  </p>

                  <div className={styles.pointsList} style={{ borderTopColor: `rgba(255, 255, 255, 0.15)` }}>
                    {s.points.map(p => (
                      <div key={p} className={styles.point}>
                        <span className={styles.dash} style={{ color: s.accent }}>—</span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
