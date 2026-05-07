import styles from './Pill.module.css';

interface PillProps {
  children: React.ReactNode;
  color?: 'cream' | 'rosa' | 'azul' | 'verde' | 'dark';
}

export function Pill({ children, color = 'cream' }: PillProps) {
  return (
    <span className={`${styles.pill} ${styles[color]}`}>
      <span className={styles.dot}></span>
      {children}
    </span>
  );
}
