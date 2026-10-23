import Image from 'next/image';
import Link from 'next/link';

import styles from './Footer.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';
import { NAV_SECTIONS } from '../navSections';
import { CONTACT, mailtoHref } from '@/lib/contact';

const SECCIONES = [
  { label: 'Para empresas', href: '/#empresas' },
  { label: 'Para personas', href: '/#personas' },
  ...NAV_SECTIONS.filter(s => s.id !== 'propuestas').map(s => ({ label: s.label, href: `/#${s.id}` })),
];

const REDES = [
  { label: `Instagram ${CONTACT.instagramHandle}`, href: CONTACT.instagram },
  { label: 'LinkedIn de Aventúrate Más', href: CONTACT.linkedinPrograma },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <SectionDivider src="/assets/ondas-claras.png" variant="end" />

      <div className={`container ${styles.inner}`}>
        {/* Cierre: el lema del Hero con su palabra final, "más" */}
        <Reveal className={styles.cierre}>
          <p className={styles.lema}>
            Aventúrate a <span className={styles.capsula}>más</span>
          </p>
          <div className={styles.acciones}>
            {/* <a> y no <Link>: Link ignora el clic si la URL ya es la misma, y entonces no vuelve a bajar a la sección */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/#propuestas" className={styles.cta}>
              ¿Por dónde empiezo?
            </a>
            <a href={mailtoHref} className={styles.mail}>
              {CONTACT.email}
            </a>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.brand}>
            <Link href="/" className={styles.logoGroup} aria-label="Aventúrate Más, ir al inicio">
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

          <Reveal delay={120} className={styles.column}>
            <nav aria-label="Secciones">
              <h2 className={styles.colTitle}>Secciones</h2>
              <ul className={`${styles.list} ${styles.listDos}`}>
                {SECCIONES.map(item => (
                  <li key={item.label}>
                    <a className={styles.listLink} href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={240} className={styles.column}>
            <nav aria-label="Redes">
              <h2 className={styles.colTitle}>Redes</h2>
              <ul className={styles.list}>
                {REDES.map(item => (
                  <li key={item.label}>
                    <a className={styles.listLink} href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                      <span className={styles.linkArrow} aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Aventúrate Más</span>

          <span className={styles.bottomLinks}>
            <a className={styles.link} href="/legal#privacidad">Privacidad</a>
            <a className={styles.link} href="/legal#terminos">Términos</a>
            <a className={styles.link} href="https://nosterlabs.com" target="_blank" rel="noopener noreferrer">
              Powered by NosterLabs <span aria-hidden="true">↗</span>
            </a>
          </span>

          <a className={styles.top} href="#inicio" aria-label="Volver arriba">
            <span className={styles.topArrow} aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
