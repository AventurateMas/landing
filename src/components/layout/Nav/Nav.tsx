'use client';
import { useState, useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Nav.module.css';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { NAV_SECTIONS } from '../navSections';
import { CONTACT } from '@/lib/contact';

type Ruta = { punto: number; inicio: number; fin: number } | null;

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [ruta, setRuta] = useState<Ruta>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll: fondo propio al bajar, y el progreso de lectura va directo a una
  // variable CSS (sin re-render en cada frame). El nav queda siempre visible.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      navRef.current?.style.setProperty('--progreso', String(max > 0 ? Math.min(y / max, 1) : 0));
      setScrolled(y > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  // La ruta: de dónde a dónde va la línea y hasta qué enlace llega el círculo
  useEffect(() => {
    const medir = () => {
      const links = [...(linksRef.current?.querySelectorAll<HTMLElement>('a') ?? [])];
      if (links.length === 0) return;
      const centro = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
      const activo = links.find(l => l.getAttribute('aria-current') === 'true');
      setRuta({
        inicio: centro(links[0]),
        fin: centro(links[links.length - 1]),
        punto: activo ? centro(activo) : -1,
      });
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [activeId]);

  const rutaVars = ruta
    ? ({
        '--inicio': `${ruta.inicio}px`,
        '--fin': `${ruta.fin}px`,
        '--punto-x': `${Math.max(ruta.punto, ruta.inicio)}px`,
      } as CSSProperties)
    : undefined;

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      aria-label="Principal"
    >
      <div className={styles.bar}>
        <Link href="/" className={styles.logoGroup} aria-label="Aventúrate Más, ir al inicio">
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

        {/* Los enlaces son paradas de una ruta: el tramo recorrido se rellena */}
        <div ref={linksRef} className={styles.desktopLinks} style={rutaVars} data-activo={ruta !== null && ruta.punto >= 0}>
          <span className={styles.rutaLinea} aria-hidden="true" />
          <span className={styles.rutaRecorrido} aria-hidden="true" />
          <span className={styles.punto} aria-hidden="true" />
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
        </div>

        <a href={CONTACT.primeraSesion} className={styles.cta} target="_blank" rel="noopener noreferrer">
          1ª sesión sin costo
          <span className="sr-only">(formulario, se abre en una pestaña nueva)</span>
        </a>

        {/* Móvil: el anillo del botón se llena con lo recorrido de la página */}
        <button
          className={styles.hamburgerBtn}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className={styles.anillo} viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" />
            <circle className={styles.anilloLleno} cx="24" cy="24" r="22" pathLength="100" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 8H20M4 16H14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} activeId={activeId} />
    </nav>
  );
}
