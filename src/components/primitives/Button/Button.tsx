import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'navy' | 'amarillo';
  as?: 'button' | 'a';
  href?: string;
}

export function Button({ variant = 'primary', as = 'button', href, className = '', children, ...props }: ButtonProps) {
  const Component = as as React.ElementType;
  return (
    <Component
      href={href}
      className={`${styles.button} ${className}`}
      data-variant={variant}
      {...(as === 'a' ? (props as React.AnchorHTMLAttributes<HTMLAnchorElement>) : props)}
    >
      {children}
    </Component>
  );
}
