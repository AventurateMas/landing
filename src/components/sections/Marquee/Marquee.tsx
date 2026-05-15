import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';
import styles from './Marquee.module.css';

export function Marquee() {
  const items = [
    'Liderazgo facilitador',
    'Cultura colaborativa',
    'Talento humano',
    'Relaciones horizontales',
    'Trabajo en equipo',
    'Valor humano'
  ];
  const items2 = [...items, ...items];

  return (
    <div className={styles.marqueeSection} aria-hidden="true">
      <SectionDivider
        src="/assets/ondas-rosadas.png"
        variant="end"
        className={styles.dividerTop}
      />
      <div className={styles.marqueeTrack}>
        {items2.map((it, i) => (
          <div key={i} className={styles.marqueeItem}>
            <span className={`${styles.text} ${i % 2 === 0 ? styles.textAmarillo : styles.textCream}`}>
              {it}
            </span>
            <span className={styles.star}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
