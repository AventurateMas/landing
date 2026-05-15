import React from 'react';
import Image from 'next/image';
import styles from './SectionDivider.module.css';

interface SectionDividerProps {
  src: string;
  variant?: 'start' | 'end';
  opacity?: number;
  className?: string;
}

/**
 * Componente para crear divisiones visuales (como ondas o formas) entre secciones.
 * @param src - Ruta de la imagen (ej: '/assets/ondas-rosadas.png')
 * @param variant - 'start' (arriba) o 'end' (abajo)
 * @param opacity - Opacidad de la imagen (por defecto 0.35)
 */
export function SectionDivider({
  src,
  variant = 'start',
  opacity = 1,
  className = ''
}: SectionDividerProps) {
  return (
    <div
      className={`${styles.dividerWrapper} ${className}`}
      data-variant={variant}
      style={{ opacity }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        width={1440}
        height={60}
        className={styles.dividerImg}
        priority={variant === 'start'}
      />
    </div>
  );
}
