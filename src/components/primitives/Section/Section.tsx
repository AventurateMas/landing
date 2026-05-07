import React from 'react';
import styles from './Section.module.css';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  tone?: 'bg' | 'cream' | 'navy' | 'rosa' | 'amarillo';
  children: React.ReactNode;
}

export function Section({ id, tone = 'bg', className = '', children, ...props }: SectionProps) {
  return (
    <section 
      id={id} 
      aria-labelledby={`${id}-heading`}
      className={`${styles.section} ${className}`}
      data-tone={tone}
      {...props}
    >
      {children}
    </section>
  );
}
