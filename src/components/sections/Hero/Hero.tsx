'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

import { Button } from '@/components/primitives/Button/Button';
import { Pill } from '@/components/primitives/Pill/Pill';
import { Reveal } from '@/components/animations/Reveal';
import { SectionDivider } from '@/components/decor/SectionDivider/SectionDivider';

// Lista de palabras para la animación de escritura (fácil de modificar)
const ANIMATED_WORDS = ['liderar', 'inspirar', 'transformar', 'crecer', 'jugar', 'más'];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(ANIMATED_WORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = ANIMATED_WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === fullWord) {
      // Pausa cuando la palabra está completa antes de empezar a borrar
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && currentText === '') {
      // Cuando se termina de borrar, pasamos a la siguiente palabra
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ANIMATED_WORDS.length);
    } else {
      // Proceso de escritura / borrado
      const speed = isDeleting ? 75 : 150;
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.bgGradient} aria-hidden="true"></div>

      <Image src="/assets/circulo-amarillo.png" alt="" width={120} height={120} className={styles.shapeAmarillo} />
      <Image src="/assets/puntos-rosados.png" alt="" width={90} height={90} className={styles.shapeRosado} />

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
              Acompaño a personas y equipos a descubrir su talento, construir relaciones horizontales y crear una cultura laboral más humana.
            </p>
          </Reveal>

          <Reveal delay={300} className={styles.actions}>
            <Button as="a" href="#contacto" variant="primary">Agendar sesión</Button>
            <Button as="a" href="#servicios" variant="ghost">Conoce mis programas</Button>
          </Reveal>
        </div>

        <div className={styles.visualCluster}>
          <Reveal delay={200} className={styles.largeCardWrapper}>
            <a href="#servicios" className={styles.largeCard}>
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
      <SectionDivider src="/assets/ondas-rosadas.png" variant="start" />
    </section>
  );
}
