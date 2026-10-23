import Image from 'next/image';

import styles from './CTA.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { CONTACT, mailtoHref } from '@/lib/contact';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-3.88V9.75Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const redes = [
  {
    nombre: 'Instagram',
    detalle: CONTACT.instagramHandle,
    texto: 'Reflexiones, dinámicas y el detrás de escena de cada proceso.',
    href: CONTACT.instagram,
    Icon: InstagramIcon,
    color: styles.rosa,
  },
  {
    nombre: 'LinkedIn',
    detalle: 'Aventúrate Más',
    texto: 'Ideas para liderar equipos, cultura y conversaciones con impacto.',
    href: CONTACT.linkedinPrograma,
    Icon: LinkedinIcon,
    color: styles.azul,
  },
];

export function CTA() {
  return (
    <section id="contacto" className={styles.ctaSection}>

      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <Reveal>
            <p className={styles.eyebrow}>Sígueme en redes</p>
            <h2 className={styles.title}>
              Sigamos la conversación <em className={styles.italic}>afuera</em>
            </h2>
            <p className={styles.lead}>
              Comparto ideas, herramientas y pequeñas aventuras para liderar con más
              claridad. Elige dónde prefieres encontrarme.
            </p>
          </Reveal>

          <ul className={styles.redes}>
            {redes.map(({ nombre, detalle, texto, href, Icon, color }, i) => (
              <li key={nombre}>
                <Reveal delay={120 + i * 120}>
                  <a
                    href={href}
                    className={`${styles.red} ${color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.redIcon}>
                      <Icon />
                    </span>
                    <span className={styles.redBody}>
                      <span className={styles.redNombre}>{nombre}</span>
                      <span className={styles.redDetalle}>{detalle}</span>
                      <span className={styles.redTexto}>{texto}</span>
                    </span>
                    <span className={styles.redArrow} aria-hidden="true">↗</span>
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={360}>
            <p className={styles.meta}>
              ¿Prefieres algo más directo?{' '}
              <a className={styles.metaLink} href={mailtoHref}>
                <MailIcon />
                {CONTACT.email}
              </a>
            </p>
          </Reveal>
        </div>

        {/* Motion graphic: decorativo, los enlaces reales están en la lista */}
        <Reveal delay={200} className={styles.orbitWrapper}>
          <div className={styles.orbit} aria-hidden="true">
            <svg className={styles.ringText} viewBox="0 0 300 300">
              <defs>
                <path id="cta-ring" d="M150,150 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1 -236,0" />
              </defs>
              <text>
                <textPath href="#cta-ring" textLength="740">
                  SÍGUEME · APRENDE · AVENTÚRATE MÁS · CONECTA ·
                </textPath>
              </text>
            </svg>

            <div className={styles.ring}>
              <span className={`${styles.planet} ${styles.planetRosa}`}>
                <InstagramIcon />
              </span>
              <span className={`${styles.planet} ${styles.planetAzul}`}>
                <LinkedinIcon />
              </span>
              <span className={`${styles.planet} ${styles.planetAmarillo}`}>
                <MailIcon />
              </span>
            </div>

            <div className={styles.avatar}>
              <Image src="/assets/itza.webp" alt="" fill sizes="160px" className={styles.avatarImg} />
            </div>

            <span className={styles.handle}>{CONTACT.instagramHandle}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
