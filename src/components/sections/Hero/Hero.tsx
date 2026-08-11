'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

import { Button } from '@/components/primitives/Button/Button';
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
      <div className={styles.bgGradient} aria-hidden="true"></div>

      <Image src={circuloAmarillo} alt="" className={styles.shapeAmarillo} priority />
      <Image src={puntosRosados} alt="" className={styles.shapeRosado} priority />

      <div className={`container ${styles.grid}`}>
        <div className={styles.textContent}>

          <Reveal delay={100} className={styles.titleWrapper}>
            <h1 className={styles.title}>
              Aventúrate a <em className={styles.italic}>
                {currentText}
                <span className={styles.cursor}>|</span>
              </em>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className={styles.paragraph}>
              <mark className={styles.mark}>Aprendizaje lúdico</mark>, coaching y desarrollo humano
              para que personas y equipos ganen claridad y se animen a avanzar. Porque crecer
              también puede ser <mark className={`${styles.mark} ${styles.markLate}`}>una aventura</mark>.
            </p>
          </Reveal>

          <Reveal delay={300} className={styles.actions}>
            <Button as="a" href="#contacto" variant="primary">Agendar sesión</Button>
            <Button as="a" href="#propuestas" variant="ghost">Conoce mis programas</Button>
          </Reveal>
        </div>

        <div className={styles.visualCluster}>
          <Reveal delay={200} className={styles.largeCardWrapper}>
            <a href="#personas" className={styles.largeCard}>
              <div className={styles.cardGradient} aria-hidden="true"></div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>Programa<br />vocacional<span className={styles.dot}>.</span></div>
                <div className={styles.cardCenter}>Más<br />info</div>
                <div className={styles.cardFooter}>
                  <div>
                    <div className={styles.specialtyLabel}>Temas destacados:</div>
                    <div className={styles.specialtyValue}>Confianza, propósito y desarrollo</div>
                  </div>
                  <div className={styles.arrowIcon}>↗</div>
                </div>
              </div>
            </a>

          </Reveal>
        </div>
      </div>
      {showScroll && (
        <a href="#propuestas" className={`${styles.scrollIndicator} ${styles.scrollVisible}`} aria-label="Scroll hacia abajo">
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot}></div>
          </div>
          <span className={styles.scrollLabel}>Scroll</span>
        </a>
      )}
      <SectionDivider src="/assets/ondas-rosadas.png" variant="start" />
    </section>
  );
}
