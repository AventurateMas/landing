'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';

import { NAV_SECTIONS } from '../navSections';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeId?: string;
}

export function MobileMenu({ isOpen, onClose, activeId }: MobileMenuProps) {
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
          {NAV_SECTIONS.map(item => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={`${styles.navLink} ${activeId === item.id ? styles.navLinkActive : ''}`}
              aria-current={activeId === item.id ? 'true' : undefined}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contacto" className={styles.navLink} onClick={onClose}>Agendar</Link>
        </nav>
      </div>
    </dialog>
  );
}
