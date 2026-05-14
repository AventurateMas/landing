import Image from 'next/image';
import styles from './Hero.module.css';

import { Button } from '@/components/primitives/Button/Button';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Reveal } from '@/components/animations/Reveal';

export function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.bgGradient} aria-hidden="true"></div>

      <Image src="/assets/circulo-amarillo.png" alt="" width={120} height={120} className={styles.shapeAmarillo} />
      <Image src="/assets/puntos-rosados.png" alt="" width={90} height={90} className={styles.shapeRosado} />

      <div className={`container ${styles.grid}`}>
        <div className={styles.textContent}>
          <Reveal delay={0}>
            <Pill color="rosa">Programa de cultura colaborativa · 2026</Pill>
          </Reveal>

          <Reveal delay={100} className={styles.titleWrapper}>
            <h1 className={styles.title}>
              Aventúrate<br />
              a <em className={styles.italic}>liderar</em><br />
              con propósito.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className={styles.paragraph}>
              Acompañamos a personas y equipos a descubrir su talento, construir relaciones horizontales y crear una cultura laboral más humana.
            </p>
          </Reveal>

          <Reveal delay={300} className={styles.actions}>
            <Button as="a" href="#contacto" variant="primary">Agendar sesión gratuita</Button>
            <Button as="a" href="#servicios" variant="ghost">Conocer servicios</Button>
          </Reveal>

          <Reveal delay={400} className={styles.trustStrip}>
            <div className={styles.trustCircles}>
              {['#FFDD78', '#FF585E', '#7ED463', '#2F36FF'].map((color, i) => (
                <div key={i} className={styles.trustCircle} style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <div>
              <div className={styles.trustTitle}>+200 personas en el programa</div>
              <div className={styles.trustSubtitle}>Equipos y líderes en Latam</div>
            </div>
          </Reveal>
        </div>

        <div className={styles.visualCluster}>
          <Reveal delay={200} className={styles.largeCardWrapper}>
            <div className={styles.largeCard}>
              <div className={styles.cardGradient} aria-hidden="true"></div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>aventúrate<br />más<span className={styles.dot}>.</span></div>
                <div className={styles.cardCenter}>+6<br />años</div>
                <div className={styles.cardFooter}>
                  <div>
                    <div className={styles.specialtyLabel}>Especialidad</div>
                    <div className={styles.specialtyValue}>Cultura colaborativa</div>
                  </div>
                  <div className={styles.arrowIcon}>↗</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400} className={styles.floatingCardAmarillaWrapper}>
            <div className={styles.floatingCardAmarilla}>
              <div className={styles.greenDot}></div>
              <div>
                <div className={styles.floatingLabel}>Próxima sesión</div>
                <div className={styles.floatingValue}>Mar 30 · 10:00 AM</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={600} className={styles.floatingCardNavyWrapper}>
            <div className={styles.floatingCardNavy}>
              <div className={styles.quoteIcon}>&quot;</div>
              <p className={styles.quoteText}>Tu talento es el motor del cambio.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
