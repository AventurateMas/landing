import styles from './Testimonial.module.css';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Reveal } from '@/components/animations/Reveal';

const testimonials = [
  { name: 'Ana García', role: 'Directora RRHH · Bogotá', q: 'Maritza tiene una capacidad única de hacer que te sientas vista y escuchada.', color: 'var(--color-amarillo)' },
  { name: 'Carlos Méndez', role: 'CEO · Medellín', q: 'Las sesiones transformaron mi manera de liderar. Ahora mi equipo respira diferente.', color: '#7ED463' },
  { name: 'Laura Soto', role: 'Founder · Lima', q: 'Aprendí a escuchar antes de decidir. Es lo más valioso que me llevo.', color: 'var(--color-rosa)' },
];

export function Testimonial() {
  return (
    <section id="testimonio" className={styles.testimonialSection}>
      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <div>
              <Pill color="cream">Testimonios</Pill>
              <h2 className={styles.title}>
                Lo que dicen<br/>
                quienes han <em className={styles.italic}>caminado</em>.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 150} className={styles.cardWrapper}>
              <div className={styles.card}>
                <div className={styles.quoteMark} style={{ color: t.color }}>&quot;</div>
                <p className={styles.quote}>{t.q}</p>
                
                <div className={styles.author}>
                  <div className={styles.avatar} style={{ background: t.color }}></div>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>{t.role}</div>
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
