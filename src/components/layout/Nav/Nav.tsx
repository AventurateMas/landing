'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Nav.module.css';
import { Button } from '@/components/primitives/Button/Button';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { NAV_SECTIONS } from '../navSections';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Marca la sección visible en el centro del viewport
  useEffect(() => {
    const sections = NAV_SECTIONS.map(s => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const current = entries.find(entry => entry.isIntersecting);
        if (current) setActiveId(current.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Principal">
      <Link href="/" className={styles.logoGroup} aria-label="Aventúrate Más — inicio">
        <Image
          src="/logo/rojo.svg"
          alt="Aventúrate Más"
          width={522}
          height={91}
          className={styles.logo}
          priority
          unoptimized
        />
      </Link>

      {/* Desktop Links */}
      <div className={styles.desktopLinks}>
        {NAV_SECTIONS.map(item => (
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={`${styles.link} ${activeId === item.id ? styles.linkActive : ''}`}
            aria-current={activeId === item.id ? 'true' : undefined}
          >
            {item.label}
          </a>
        ))}
        <Button as="a" href="/#contacto" variant="primary" className={styles.navBtn}>Agendar →</Button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className={styles.mobileToggle}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} activeId={activeId} />
      </div>
    </nav>
  );
}
