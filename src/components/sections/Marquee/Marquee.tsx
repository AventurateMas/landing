import styles from './Marquee.module.css';

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
