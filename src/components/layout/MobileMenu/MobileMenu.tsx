'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      dialogRef.current?.showModal();
    } else {
      document.body.style.overflow = '';
      dialogRef.current?.close();
    }
  }, [isOpen]);

  // Cerrar si se clickea fuera (backdrop)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog 
      ref={dialogRef}
      id="mobile-menu"
      className={styles.dialog}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <span className="label text-rosa">Menú</span>
          <button 
            className={styles.closeBtn} 
            onClick={onClose} 
            aria-label="Cerrar menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className={styles.nav} aria-label="Navegación móvil">
          <Link href="#Servicios" className={styles.navLink} onClick={onClose}>Servicios</Link>
          <Link href="#Equipo" className={styles.navLink} onClick={onClose}>Equipo</Link>
          <Link href="#Casos" className={styles.navLink} onClick={onClose}>Casos</Link>
          <Link href="#Recursos" className={styles.navLink} onClick={onClose}>Recursos</Link>
        </nav>
      </div>
    </dialog>
  );
}
