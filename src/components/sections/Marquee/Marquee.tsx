import styles from './Marquee.module.css';
import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';

export function Marquee() {
  const items = [
    'Valor humano',
    'Cercanía',
    'Aprendizaje lúdico',
    'Impacto con propósito',
    'Autenticidad',
    'Acción consciente'
  ];
  const items2 = [...items, ...items];

  return (
    <div className={styles.marqueeSection} aria-hidden="true">
      {/* Olas arriba y abajo: el rosa de servicios baja y el fondo claro sube, sin cortes rectos */}
      <SectionDivider src="/assets/ondas-rosadas.png" variant="end" />
      <div className={styles.marqueeTrack}>
        {items2.map((it, i) => (
          <div key={i} className={styles.marqueeItem}>
            <span className={`${styles.text} ${i % 2 === 0 ? styles.textAmarillo : styles.textCream}`}>
              {it}
            </span>
            <span className={styles.star} aria-hidden="true" />
          </div>
        ))}
      </div>
      <SectionDivider src="/assets/ondas-claras.png" variant="start" />
    </div>
  );
}
