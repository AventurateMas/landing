'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

import { Reveal } from '@/components/animations/Reveal';
import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';
import { circuloAmarillo, puntosRosados } from '@/lib/decor';

// Lista de palabras para la animación de escritura (fácil de modificar)
const ANIMATED_WORDS = ['aprender', 'transformar', 'liderar', 'crecer', 'decidir', 'jugar en equipo', 'reinventarte', 'conocerte', 'cambiar', 'explorar', 'avanzar', 'descubrir', 'conectar', 'más'];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(ANIMATED_WORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const fullWord = ANIMATED_WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === fullWord) {
      // Pausa cuando la palabra está completa antes de empezar a borrar
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && currentText === '') {
      // Cuando se termina de borrar, pasamos a la siguiente palabra
      timer = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % ANIMATED_WORDS.length);
      }, 50);
    } else {
      // Proceso de escritura / borrado
      const speed = isDeleting ? 75 : 150;
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  // Muestra el scroll indicator solo si el usuario no scrolea en 5s.
  // Una vez que scrollea, se oculta definitivamente.
  useEffect(() => {
    let hasScrolled = false;

    const onScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        setShowScroll(false);
      }
    };

    const timer = setTimeout(() => {
      if (!hasScrolled) {
        setShowScroll(true);
      }
    }, 5000);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="inicio" className={styles.hero}>

      <Image src={circuloAmarillo} alt="" className={styles.shapeAmarillo} priority />
      <Image src={puntosRosados} alt="" className={styles.shapeRosado} priority />

      <div className={`container ${styles.grid}`}>
        <div className={styles.textContent}>

          <Reveal delay={100} className={styles.titleWrapper}>
            <h1 className={styles.title}>
              {/* El lector de pantalla oye la frase entera, no cada letra que se escribe */}
              <span className="sr-only">Aventúrate a {ANIMATED_WORDS.slice(0, 3).join(', ')} y más</span>
              <span aria-hidden="true">
                <span className={styles.titleLead}>
                  {'Aventúrate a'.split('').map((letra, i) => (
                    <span key={i} className={styles.letra} style={{ '--l': i } as React.CSSProperties}>
                      {letra === ' ' ? ' ' : letra}
                    </span>
                  ))}
                </span>
                <span className={styles.wordRow}>
                  {/* La cápsula crece con cada letra que se escribe */}
                  <em className={styles.capsula}>
                    {currentText || ' '}
                    <span className={styles.cursor} />
                  </em>
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className={styles.paragraph}>
              Coaching y <mark className={styles.mark}>aprendizaje lúdico</mark> para que personas y
              equipos pasen de
              {/* Mini motion graphic: la duda tambalea, un punto viaja y la acción late al llegar */}
              <span className={styles.trayecto}>
                <span className={styles.duda}>
                  la duda<span className={styles.dudaSigno} aria-hidden="true">?</span>
                </span>
                <span className={styles.camino} aria-hidden="true" />
                <span className={styles.accion}>a la acción</span>
              </span>
            </p>
          </Reveal>

          <Reveal delay={300} className={styles.actions}>
            {/* Si no hay scroll en 5s, el botón se transforma en el ícono de scroll
                (un mouse con la rueda que baja); al primer scroll vuelve a ser botón */}
            <a href="#propuestas" className={styles.servicios} data-invita={showScroll}>
              <span className={styles.serviciosTexto}>Conoce todos los servicios</span>
              <span className={styles.serviciosIcono} aria-hidden="true">
                <span className={styles.serviciosFlecha}>↓</span>
              </span>
              <span className={styles.raton} aria-hidden="true">
                <span className={styles.rueda} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
      <SectionDivider src="/assets/ondas-rosadas.png" variant="start" />
    </section>
  );
}
