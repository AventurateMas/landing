'use client';

import Image from 'next/image';
import styles from './Team.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { formaManchaVerde, puntosRosados } from '@/lib/decor';

export function Team() {
  const profile = {
    name: 'Maritza Rodríguez',
    role: 'Fundadora de Aventúrate más',
    bio: 'Hace más de diez años acompaño a personas y equipos a crecer, comunicarse mejor y dar lo mejor de sí: a reconocer sus talentos, a animarse a los cambios y a construir vínculos más sanos y colaborativos.',
    tags: ['Coach Ontológica profesional', 'Licenciada en Psicología', 'Scrum Master', 'Aprendizaje Lúdico'],
    color: 'var(--color-rosa)',
    accent: 'var(--color-amarillo)',
    label: 'Fundadora',
    years: '+10 años',
    image: '/assets/itza.webp'
  };

  return (
    <section id="equipo" className={styles.teamSection}>
      <Image src={formaManchaVerde} alt="" className={styles.blobVerde} />
      <Image src={puntosRosados} alt="" className={styles.puntosRosados} />

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
                Trabajo desde una mirada profesional pero profundamente humana, integrando la psicología organizacional, el coaching ontológico, aprendizaje lúdico y los marcos de agilidad. Esa combinación me permite acompañar tanto a una empresa que quiere fortalecer a su equipo, como a una persona que busca reencontrarse, decidir o reinventarse.
              </p>
            </Reveal>

            <Reveal delay={400} className={styles.quoteBlock}>
              <span className={styles.quoteIcon}>“</span>
              <p className={styles.quoteText}>
                Detrás de cada equipo y de cada proceso hay personas: con historias, talentos y posibilidades. Y ahí es donde me gusta estar.
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
