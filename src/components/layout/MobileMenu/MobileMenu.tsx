'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';

import { NAV_SECTIONS } from '../navSections';
import { CONTACT } from '@/lib/contact';

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

  return (
    <dialog ref={dialogRef} id="mobile-menu" className={styles.dialog} onClose={onClose} aria-label="Menú">
      {/* Se abre como un círculo que crece desde el botón del menú */}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.titulo}>Menú</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar menú">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Navegación móvil">
          <ol className={styles.nav}>
            {NAV_SECTIONS.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as CSSProperties}>
                <Link
                  href={`/#${item.id}`}
                  className={`${styles.navLink} ${activeId === item.id ? styles.navLinkActive : ''}`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  onClick={onClose}
                >
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.pie}>
          <Link href="/#propuestas" className={styles.cta} onClick={onClose}>
            ¿Por dónde empiezo?
          </Link>
          <div className={styles.redes}>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
              Instagram <span aria-hidden="true">↗</span>
            </a>
            <a href={CONTACT.linkedinPrograma} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
