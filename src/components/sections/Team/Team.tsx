'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Team.module.css';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Reveal } from '@/components/animations/Reveal';

const team = [
  {
    name: 'Maritza Rodríguez',
    role: 'Fundadora · Coach de talento humano',
    bio: 'Más de 6 años acompañando personas y equipos a descubrir su talento. Promotora de una nueva cultura social y laboral basada en el liderazgo facilitador y las relaciones horizontales.',
    tags: ['Coaching 1:1', 'Liderazgo', 'Cultura', 'Talleres'],
    color: '#FF585E', accent: '#FFDD78', label: 'Fundadora', years: '+6 años',
  },
  {
    name: 'Melissa Rodríguez',
    role: 'Encargada de Marketing',
    bio: 'Estratega de marca y contenidos. Diseña la voz y presencia digital de Aventúrate Más, conectando el mensaje del programa con cada persona que lo necesita.',
    tags: ['Marca', 'Estrategia digital', 'Contenidos', 'Comunidad'],
    color: '#7ED463', accent: '#FF585E', label: 'Marketing', years: 'Marketing',
  },
];

export function Team() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };
  const next = () => go((active + 1) % team.length);
  const prev = () => go((active - 1 + team.length) % team.length);

  const t = team[active];

  return (
    <section id="equipo" className={styles.teamSection}>
      <Image src="/assets/forma-mancha-verde.png" alt="" width={220} height={220} className={styles.blobVerde} />
      <Image src="/assets/puntos-rosados.png" alt="" width={90} height={90} className={styles.puntosRosados} />

      <div className={`container ${styles.container}`}>
        <Reveal>
          <div className={styles.header}>
            <div>
              <Pill color="azul">Equipo</Pill>
              <h2 className={styles.title}>
                Conoce al equipo<br />
                de <em className={styles.italic}>Aventúrate Más</em>.
              </h2>
            </div>
            <p className={styles.subtitle}>
              Dos personas, una misión: potenciar el talento humano y construir cultura colaborativa.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div key={active} className={styles.carouselContainer}>
            <div className={styles.visualContent}>
              <div className={styles.card} style={{ backgroundColor: t.color, animation: dir === 1 ? 'slideInRight 0.5s ease' : 'slideInLeft 0.5s ease' }}>
                <div className={styles.cardGradient}></div>
                <div className={styles.cardIllustration}>
                  <svg viewBox="0 0 200 280" className={styles.svg}>
                    <ellipse cx="100" cy="75" rx="42" ry="50" fill="rgba(255,255,255,0.95)" />
                    <path d="M30 280 Q30 165 100 155 Q170 165 170 280 Z" fill="rgba(255,255,255,0.95)" />
                    <ellipse cx="100" cy="82" rx="32" ry="38" fill={t.accent} opacity="0.4" />
                  </svg>
                </div>
                <div className={styles.cardTop}>
                  <div className={styles.labelBadge} style={{ color: t.color }}>● {t.label}</div>
                  <div className={styles.yearsText}>{t.years}</div>
                </div>
              </div>

              <div className={styles.floatingBadge}>
                <div className={styles.floatingTop}>{active === 0 ? 'Coaching' : 'Marketing'}</div>
                <div className={styles.floatingBottom}>{active === 0 ? 'Certificada' : 'Estratega'}</div>
              </div>
            </div>

            <div className={styles.textContent} style={{ animation: dir === 1 ? 'slideInRight 0.6s ease 0.1s backwards' : 'slideInLeft 0.6s ease 0.1s backwards' }}>
              <div className={styles.counter} style={{ color: t.color }}>
                0{active + 1} / 0{team.length}
              </div>
              <h3 className={styles.name}>{t.name}</h3>
              <div className={styles.role} style={{ color: t.color }}>{t.role}</div>
              <p className={styles.bio}>{t.bio}</p>

              <div className={styles.tags}>
                {t.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.controls}>
                <button onClick={prev} className={styles.controlBtn} aria-label="Anterior">←</button>
                <button onClick={next} className={`${styles.controlBtn} ${styles.controlBtnDark}`} aria-label="Siguiente">→</button>
                <div className={styles.indicators}>
                  {team.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={`${styles.indicator} ${i === active ? styles.indicatorActive : ''}`}
                      aria-label={`Ir a persona ${i + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <Image src="/assets/ondas-rosadas.png" alt="" width={1440} height={60} className={styles.waves} style={{ height: 'auto' }} />
    </section>
  );
}
