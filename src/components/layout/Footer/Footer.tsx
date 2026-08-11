import Image from 'next/image';
import Link from 'next/link';

import styles from './Footer.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';
import { CONTACT, mailtoHref } from '@/lib/contact';

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; items: FooterLink[] }[] = [
  {
    title: 'Navegación',
    items: [
      { label: 'Para personas', href: '/#personas' },
      { label: 'Para empresas', href: '/#empresas' },
      { label: 'Valores', href: '/#valores' },
      { label: 'Sobre Maritza', href: '/#equipo' },
      { label: 'Agendar', href: '/#contacto' },
    ],
  },
  {
    title: 'Contacto',
    items: [
      { label: CONTACT.email, href: mailtoHref },
      { label: `Instagram ${CONTACT.instagramHandle}`, href: CONTACT.instagram, external: true },
      { label: 'LinkedIn de Maritza', href: CONTACT.linkedin, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <SectionDivider src="/assets/ondas-claras.png" variant="end" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <Reveal className={styles.brand}>
            <Link href="/" className={styles.logoGroup} aria-label="Aventúrate Más — inicio">
              <Image
                src="/logo/amarillo.svg"
                alt="Aventúrate Más"
                width={522}
                height={91}
                className={styles.logo}
                unoptimized
              />
            </Link>
            <p className={styles.description}>
              Programa de talento humano y cultura colaborativa fundado por Maritza Rodríguez.
            </p>
          </Reveal>

          {columns.map((col, i) => (
            <Reveal key={col.title} delay={120 * (i + 1)} className={styles.column}>
              <nav aria-label={col.title}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul className={styles.list}>
                  {col.items.map(item => (
                    <li key={item.label}>
                      <a
                        className={styles.listLink}
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {item.label}
                        <span className={styles.linkArrow} aria-hidden="true">
                          {item.external ? '↗' : '→'}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Aventúrate Más · Todos los derechos reservados</span>

          <span className={styles.bottomLinks}>
            <a className={styles.link} href="/legal#privacidad">Privacidad</a>
            <a className={styles.link} href="/legal#terminos">Términos</a>
            <a className={styles.link} href="https://nosterlabs.com" target="_blank" rel="noopener noreferrer">
              Powered by NosterLabs <span className={styles.externalArrow}>↗</span>
            </a>
          </span>

          <a className={styles.top} href="#inicio">
            Volver arriba
            <span className={styles.topArrow} aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
