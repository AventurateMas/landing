'use client';
import { useState, useEffect } from 'react';
import styles from './Nav.module.css';
import { Button } from '@/components/primitives/Button/Button';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoGroup}>
        <div className={styles.logoMark}>a+</div>
        <span className={styles.logoText}>aventúrate más</span>
      </div>

      {/* Desktop Links */}
      <div className={styles.desktopLinks}>
        {[
          { label: 'Servicios', href: '#servicios' },
          { label: 'Valores', href: '#valores' },
          { label: 'Equipo', href: '#equipo' }
        ].map(item => (
          <a key={item.label} href={item.href} className={styles.link}>{item.label}</a>
        ))}
        <Button as="a" href="#contacto" variant="primary" className={styles.navBtn}>Agendar →</Button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className={styles.mobileToggle}>
        <button 
          className={styles.hamburgerBtn} 
          onClick={() => setIsMobileMenuOpen(true)} 
          aria-label="Abrir menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </nav>
  );
}
