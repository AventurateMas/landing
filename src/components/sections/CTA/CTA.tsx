import Image from 'next/image';
import styles from './CTA.module.css';
import { Reveal } from '@/components/animations/Reveal';

export function CTA() {
  const options = [
    { title: 'Coaching Individual 1:1', href: '#agendar-1-1', styleClass: styles.cardRosa },
    { title: 'Programa Vocacional', href: '#agendar-vocacional', styleClass: styles.cardVerde },
    { title: 'Propuestas para equipos', href: '#agendar-equipos', styleClass: styles.cardAmarillo },
  ];

  return (
    <section id="contacto" className={styles.ctaSection}>
      <div className={styles.bgDeco} aria-hidden="true"></div>
      <Image src="/assets/ondas-claras.png" alt="" width={1000} height={70} className={styles.waves} style={{ height: 'auto' }} />
      
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
                <h3 className={styles.cardTitle}>{opt.title}</h3>
                <span className={styles.arrow}>→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
