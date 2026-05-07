import Image from 'next/image';
import styles from './CTA.module.css';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Button } from '@/components/primitives/Button/Button';

export function CTA() {
  const stats = [
    { k: 'Respuesta en', v: '< 24h' },
    { k: 'Primera sesión', v: 'Gratuita' },
    { k: 'Modalidad', v: 'Online · Presencial' },
  ];

  return (
    <section id="contacto" className={styles.ctaSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.card}>
          <div className={styles.bgDeco} aria-hidden="true"></div>
          <Image src="/assets/ondas-claras.png" alt="" width={1000} height={70} className={styles.waves} />
          
          <div className={styles.content}>
            <Pill color="dark">¿Listo para empezar?</Pill>
            <h2 className={styles.title}>
              Da el primer paso hacia una cultura más <em className={styles.italic}>colaborativa</em>.
            </h2>
            <p className={styles.paragraph}>
              Tu primera sesión de descubrimiento es gratuita. Conversemos sobre lo que necesitas.
            </p>
            <div className={styles.actions}>
              <Button as="a" href="#agendar" variant="amarillo">Agendar sesión gratis →</Button>
              <Button as="a" href="#contacto" variant="ghost" className={styles.ghostBtn}>Enviar mensaje</Button>
            </div>
          </div>

          <div className={styles.stats}>
            {stats.map(it => (
              <div key={it.k} className={styles.statItem}>
                <span className={styles.statLabel}>{it.k}</span>
                <span className={styles.statValue}>{it.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
