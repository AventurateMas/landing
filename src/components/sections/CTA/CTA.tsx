import styles from './CTA.module.css';
import { Reveal } from '@/components/animations/Reveal';
import { CONTACT, mailtoHref } from '@/lib/contact';

const steps = [
  {
    n: '01',
    title: 'Me escribes',
    desc: 'Cuéntame qué está pasando contigo, con tu equipo o con tu carrera. Un párrafo alcanza.',
  },
  {
    n: '02',
    title: 'Charlamos 45 minutos',
    desc: 'Una videollamada sin costo para entender el contexto y ver si soy la persona indicada.',
  },
  {
    n: '03',
    title: 'Te mando una propuesta',
    desc: 'Objetivos, cantidad de sesiones, fechas y precio. Sin letra chica.',
  },
];

export function CTA() {
  return (
    <section id="contacto" className={styles.ctaSection}>
      <div className={styles.bgDeco} aria-hidden="true"></div>

      <div className={`container ${styles.container}`}>
        <Reveal className={styles.intro}>
          <p className={styles.eyebrow}>Siguiente paso</p>
          <h2 className={styles.title}>
            Da el primer paso y <em className={styles.italic}>agenda</em> un espacio
          </h2>
          <p className={styles.lead}>
            La primera conversación es gratuita y dura 45 minutos. Sales de ahí con una
            lectura clara de tu situación, trabajemos juntos después o no.
          </p>

          <div className={styles.actions}>
            <a href={mailtoHref} className={styles.primaryAction}>
              Escríbeme un correo
              <span className={styles.actionArrow} aria-hidden="true">→</span>
            </a>
            <a
              href={CONTACT.instagram}
              className={styles.secondaryAction}
              target="_blank"
              rel="noopener noreferrer"
            >
              o por Instagram
            </a>
          </div>

          <p className={styles.meta}>
            Respondo en menos de 48 horas hábiles ·{' '}
            <a className={styles.metaLink} href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={150} className={styles.stepsWrapper}>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.n} className={styles.step}>
                <span className={styles.stepNumber}>{step.n}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
