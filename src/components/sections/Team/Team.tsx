'use client';

import Image from 'next/image';
import styles from './Team.module.css';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Reveal } from '@/components/animations/Reveal';

export function Team() {
  const profile = {
    name: 'Maritza Rodríguez',
    role: 'Fundadora · Coach de talento humano',
    bio: 'Más de 6 años acompañando personas y equipos a descubrir su talento. Promotora de una nueva cultura social y laboral basada en el liderazgo facilitador y las relaciones horizontales.',
    tags: ['Coaching 1:1', 'Liderazgo', 'Cultura', 'Talleres'],
    color: 'var(--color-rosa)',
    accent: 'var(--color-amarillo)',
    label: 'Fundadora',
    years: '+6 años',
    image: '/assets/itza.webp'
  };

  return (
    <section id="equipo" className={styles.teamSection}>
      <Image src="/assets/forma-mancha-verde.png" alt="" width={220} height={220} className={styles.blobVerde} />
      <Image src="/assets/puntos-rosados.png" alt="" width={90} height={90} className={styles.puntosRosados} />

      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>
                Conoce a <em className={styles.italic}>Maritza</em>, tu guía en esta aventura.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className={styles.profileContainer}>
          <Reveal delay={150} className={styles.visualContentWrapper}>
            <div className={styles.visualContent}>
              <div className={styles.card} style={{ backgroundColor: profile.color }}>
                <div className={styles.cardGradient}></div>
                <div className={styles.cardIllustration}>
                  <Image
                    src={profile.image}
                    alt={`Imagen de: ${profile.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardTop}>
                  <div className={styles.labelBadge} style={{ color: profile.color }}>
                    ● {profile.label}
                  </div>
                  <div className={styles.yearsText}>{profile.years}</div>
                </div>
              </div>

              <div className={styles.floatingBadge}>
                <div className={styles.floatingTop}>Coaching</div>
                <div className={styles.floatingBottom}>Certificada</div>
              </div>

              <div className={styles.floatingBadgeLeft}>
                <div className={styles.floatingTop}>Liderazgo</div>
                <div className={styles.floatingBottom}>Humano</div>
              </div>
            </div>
          </Reveal>
          <div className={styles.textContent}>
            <Reveal delay={200}>
              <h3 className={styles.name}>{profile.name}</h3>
              <div className={styles.role} style={{ color: profile.color }}>
                {profile.role}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className={styles.bio}>
                {profile.bio}
              </p>
              <p className={styles.bioSecondary}>
                Mi enfoque une herramientas de psicología positiva, dinámicas lúdicas y coaching ontológico para crear experiencias de aprendizaje que de verdad transforman la manera de liderar y convivir en los espacios de trabajo.
              </p>
            </Reveal>

            <Reveal delay={400} className={styles.quoteBlock}>
              <span className={styles.quoteIcon}>“</span>
              <p className={styles.quoteText}>
                Creo en un mundo laboral más humano, donde el talento individual brille y las relaciones se construyan con empatía y horizontalidad.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className={styles.tagsLabel}>Especialidades & Herramientas:</div>
              <div className={styles.tags}>
                {profile.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
