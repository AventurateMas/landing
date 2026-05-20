import styles from './CTA.module.css';
import { Reveal } from '@/components/animations/Reveal';

export function CTA() {
  const options = [
    {
      title: 'Coaching individual',
      desc: 'Sesiones 1:1 para potenciar tu liderazgo y descubrir tu talento.',
      points: ['8 sesiones', 'Plan personalizado', 'Acompañamiento continuo'],
      href: '#agendar-individual',
      styleClass: styles.cardNavy,
      accent: 'var(--color-amarillo)',
      descColor: 'rgba(255, 255, 255, 0.8)',
    },
    {
      title: 'Talleres de equipo',
      desc: 'Dinámicas colaborativas para construir cultura laboral.',
      points: ['Hasta 20 personas', 'Presencial · Online', 'Materiales incluidos'],
      href: '#agendar-talleres',
      styleClass: styles.cardVerde,
      accent: 'var(--color-amarillo)',
      descColor: 'rgba(51, 56, 109, 0.8)',
    },
    {
      title: 'Conferencias',
      desc: 'Charlas inspiradoras sobre talento humano y cultura.',
      points: ['45–90 min', 'Q&A incluido', 'Eventos abiertos'],
      href: '#agendar-conferencias',
      styleClass: styles.cardAmarillo,
      accent: 'var(--color-rosa)',
      descColor: 'rgba(51, 56, 109, 0.8)',
    },
  ];

  return (
    <section id="contacto" className={styles.ctaSection}>
      <div className={styles.bgDeco} aria-hidden="true"></div>
      <div className={`container ${styles.container}`}>
        <Reveal delay={0} className={styles.header}>
          <h2 className={styles.title}>
            Da el primer paso y <em className={styles.italic}>agendá</em> un espacio
          </h2>
        </Reveal>

        <div className={styles.cardsGrid}>
          {options.map((opt, i) => (
            <Reveal key={opt.title} delay={100 * (i + 1)}>
              <a href={opt.href} className={`${styles.actionCard} ${opt.styleClass}`}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{opt.title}</h3>
                  
                  <div className={styles.cardDetails}>
                    <p className={styles.cardDesc} style={{ color: opt.descColor }}>
                      {opt.desc}
                    </p>
                    <div className={styles.pointsList}>
                      {opt.points.map((p) => (
                        <div key={p} className={styles.point}>
                          <span className={styles.dash} style={{ color: opt.accent }}>—</span>
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <span className={styles.arrow}>→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

