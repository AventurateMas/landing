import Image from 'next/image';
import styles from './Values.module.css';
import { Pill } from '@/components/primitives/Pill/Pill';

export function Values() {
  return (
    <section className={styles.valuesSection}>
      <Image src="/assets/puntos-amarillos.png" alt="" width={100} height={100} className={styles.puntosAmarillos} />
      <Image src="/assets/circulo-verde.png" alt="" width={110} height={110} className={styles.circuloVerde} />
      
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <Pill color="verde">Filosofía</Pill>
          <h2 className={styles.title}>
            5 valores que <em className={styles.italic}>guían</em> el trabajo.
          </h2>
        </div>

        <div className={styles.bentoGrid}>
          {/* Item 01 */}
          <div className={`${styles.bentoItem} ${styles.itemNavy}`}>
            <span className={styles.itemTagAmarillo}>01 · Núcleo</span>
            <div>
              <div className={styles.itemTitleLarge}>Valor humano</div>
              <p className={styles.itemDescLarge}>El centro de todo lo que hacemos: las personas, sus historias y su potencial único.</p>
            </div>
          </div>

          {/* Item 02 */}
          <div className={`${styles.bentoItem} ${styles.itemRosa}`}>
            <span className={styles.itemTagLight}>02</span>
            <div className={styles.itemTitle}>Conocimiento compartido</div>
          </div>

          {/* Item 03 */}
          <div className={`${styles.bentoItem} ${styles.itemVerde}`}>
            <span className={styles.itemTagDark}>03</span>
            <div className={styles.itemTitleSmall}>Relaciones horizontales</div>
          </div>

          {/* Item 04 */}
          <div className={`${styles.bentoItem} ${styles.itemAmarillo}`}>
            <span className={styles.itemTagDark}>04</span>
            <div className={styles.itemTitleSmall}>Trabajo colaborativo</div>
          </div>

          {/* Item 05 */}
          <div className={`${styles.bentoItem} ${styles.itemAzul}`}>
            <span className={styles.itemTagLight}>05</span>
            <div className={styles.itemTitleSmall}>Liderazgo facilitador</div>
          </div>
        </div>
      </div>
    </section>
  );
}
