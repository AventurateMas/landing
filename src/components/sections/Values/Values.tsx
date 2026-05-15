import Image from 'next/image';
import styles from './Values.module.css';
import { Reveal } from '@/components/animations/Reveal';

export function Values() {
  return (
    <section className={styles.valuesSection}>
      <Image src="/assets/puntos-rosados.png" alt="" width={100} height={100} className={styles.puntosAmarillos} />
      <Image src="/assets/circulo-verde.png" alt="" width={110} height={110} className={styles.circuloVerde} />

      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <h2 className={styles.title}>
              5 valores que <em className={styles.italic}>guían</em> el trabajo.
            </h2>
          </div>
        </Reveal>

        <div className={styles.bentoGrid}>
          {/* Item 01 */}
          <Reveal delay={0} className={`${styles.bentoItem} ${styles.itemNavy}`}>
            <span className={styles.itemTagAmarillo}>01 · Núcleo</span>
            <div>
              <div className={styles.itemTitleLarge}>Valor humano</div>
              <p className={styles.itemDescLarge}>El centro de todo lo que hacemos: las personas, sus historias y su potencial único.</p>
            </div>
          </Reveal>

          {/* Item 02 */}
          <Reveal delay={100} className={`${styles.bentoItem} ${styles.itemRosa}`}>
            <span className={styles.itemTagLight}>02</span>
            <div className={styles.itemTitle}>Conocimiento compartido</div>
          </Reveal>

          {/* Item 03 */}
          <Reveal delay={200} className={`${styles.bentoItem} ${styles.itemVerde}`}>
            <span className={styles.itemTagDark}>03</span>
            <div className={styles.itemTitleSmall}>Relaciones horizontales</div>
          </Reveal>

          {/* Item 04 */}
          <Reveal delay={300} className={`${styles.bentoItem} ${styles.itemAmarillo}`}>
            <span className={styles.itemTagDark}>04</span>
            <div className={styles.itemTitleSmall}>Trabajo colaborativo</div>
          </Reveal>

          {/* Item 05 */}
          <Reveal delay={400} className={`${styles.bentoItem} ${styles.itemAzul}`}>
            <span className={styles.itemTagLight}>05</span>
            <div className={styles.itemTitleSmall}>Liderazgo facilitador</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
