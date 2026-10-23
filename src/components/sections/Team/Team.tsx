import Image from 'next/image';
import type { CSSProperties } from 'react';

import styles from './Team.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { formaManchaVerde, puntosRosados } from '@/lib/decor';
import { CONTACT } from '@/lib/contact';

const profile = {
  name: 'Maritza Rodríguez',
  role: 'Fundadora de Aventúrate más',
  quote:
    'Detrás de cada equipo y de cada proceso hay personas: con historias, talentos y posibilidades. Y ahí es donde me gusta estar.',
  tags: ['Coach Ontológica profesional', 'Licenciada en Psicología', 'Scrum Master', 'Aprendizaje Lúdico'],
  years: '+10 años',
  image: '/assets/itza.webp',
};

// Las cuatro disciplinas que integra (el segundo párrafo de su bio, hecho visual)
const DISCIPLINAS = ['Psicología organizacional', 'Coaching ontológico', 'Aprendizaje lúdico', 'Marcos de agilidad'];

const IconoEquipo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <circle cx="17" cy="9" r="2.8" />
    <path d="M17.5 14.2A5.5 5.5 0 0 1 22 20" />
  </svg>
);

const IconoPersona = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

// Sello circular: versión corta de las especialidades para que entre en el círculo
const SELLO = 'Coach ontológica · Psicología · Scrum Master · Aprendizaje lúdico · ';

export function Team() {
  return (
    <section id="equipo" className={styles.teamSection}>
      <Image src={formaManchaVerde} alt="" className={styles.blobVerde} />
      <Image src={puntosRosados} alt="" className={styles.puntosRosados} />

      <div className={`container ${styles.container}`}>
        {/* Título y sello en la misma fila: el sello ya no tapa la foto */}
        <Reveal className={styles.cabecera}>
          <h2 className={styles.title}>
            Conoce a <em className={styles.italic}>Maritza</em>, tu guía en esta aventura.
          </h2>
          <div className={styles.sello} aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="team-sello" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#team-sello" textLength="488">
                  {SELLO}
                </textPath>
              </text>
            </svg>
            <span className={styles.selloCentro} />
          </div>
        </Reveal>

        <div className={styles.perfil}>
          {/* Foto en arco: se descubre de abajo hacia arriba al entrar */}
          <Reveal delay={100} className={styles.visual}>
            <div className={styles.arco}>
              <Image
                src={profile.image}
                alt={`Retrato de ${profile.name}`}
                fill
                sizes="(max-width: 900px) 90vw, 440px"
                className={styles.foto}
              />
            </div>

            <span className={styles.anios}>{profile.years}</span>
          </Reveal>

          {/* Debajo de la foto: llena la columna y deja el texto de la derecha más liviano */}
          <Reveal delay={250} className={styles.extras}>
            <h4 className={styles.tagsLabel}>Especialidades y herramientas</h4>
            <ul className={styles.tags}>
              {profile.tags.map((tag, i) => (
                <li key={tag} className={styles.tag} style={{ '--i': i } as CSSProperties}>
                  {tag}
                </li>
              ))}
            </ul>

            <a href={CONTACT.linkedin} className={styles.linkedin} target="_blank" rel="noopener noreferrer">
              Conecta conmigo en LinkedIn
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </Reveal>

          <div className={styles.texto}>
            <Reveal delay={150}>
              <h3 className={styles.name}>{profile.name}</h3>
              <p className={styles.role}>{profile.role}</p>
            </Reveal>

            <Reveal delay={250} className={styles.cita}>
              <span className={styles.comillas} aria-hidden="true">“</span>
              <p className={styles.citaTexto}>{profile.quote}</p>
            </Reveal>

            <Reveal delay={350}>
              <p className={styles.lead}>
                Hace <mark className={styles.mark}>más de diez años</mark> acompaño a personas y equipos a
                crecer, comunicarse mejor y dar lo mejor de sí: a reconocer sus talentos, a animarse a los
                cambios y a construir <mark className={styles.mark}>vínculos más sanos y colaborativos</mark>.
              </p>
            </Reveal>

            <Reveal delay={420} className={styles.mezcla}>
              <p className={styles.bio}>
                Trabajo desde una mirada profesional pero profundamente humana, integrando:
              </p>
              <ul className={styles.disciplinas}>
                {DISCIPLINAS.map((d, i) => (
                  <li key={d} className={styles.disciplina} style={{ '--i': i } as CSSProperties}>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={500}>
              <p className={styles.bio}>Esa combinación me permite acompañar tanto a</p>
              <div className={styles.paraQuien}>
                <div className={`${styles.quien} ${styles.quienEmpresa}`}>
                  <span className={styles.quienIcono}>
                    <IconoEquipo />
                  </span>
                  un equipo que quiere fortalecer sus dinámicas,
                </div>
                <div className={`${styles.quien} ${styles.quienPersona}`}>
                  <span className={styles.quienIcono}>
                    <IconoPersona />
                  </span>
                  como a una persona que busca reencontrarse, decidir o reinventarse.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
