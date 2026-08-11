import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/page.module.css';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Privacidad y términos',
  description:
    'Cómo se tratan los datos de quienes visitan aventuratemas.com y bajo qué condiciones se prestan los servicios.',
};

export default function LegalPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Privacidad y términos</h1>
        <p className={styles.lead}>
          Última actualización: 10 de agosto de 2026.
        </p>

        <article id="privacidad" className={`${styles.section} ${styles.prose}`}>
          <h2 className={styles.sectionTitle}>Privacidad</h2>
          <p>
            Este sitio es una página informativa. No incluye formularios, no instala cookies
            propias y no ejecuta herramientas de analítica ni de publicidad. Navegar por aquí
            no crea ningún registro asociado a vos.
          </p>
          <p>
            El único dato que se recibe es el que envías por tu cuenta al escribir a{' '}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> o por mensaje en Instagram:
            tu nombre, tu forma de contacto y lo que quieras contar. Esa información se usa solo para
            responderte y coordinar las sesiones, no se comparte con terceros y no se usa para
            enviarte comunicaciones que no hayas pedido.
          </p>
          <p>
            Puedes pedir en cualquier momento que se borre tu conversación y tus datos
            escribiendo a la misma dirección. El proveedor de correo e Instagram aplican
            además sus propias políticas.
          </p>
        </article>

        <article id="terminos" className={`${styles.section} ${styles.prose}`}>
          <h2 className={styles.sectionTitle}>Términos</h2>
          <p>
            Los contenidos de este sitio son informativos y pueden cambiar sin aviso. Las
            descripciones de los programas no constituyen una oferta cerrada: el alcance, la
            duración y el precio de cada acompañamiento se acuerdan por escrito antes de empezar.
          </p>
          <p>
            El coaching y los talleres son procesos de desarrollo profesional y personal. No
            sustituyen atención psicológica, médica ni asesoría legal o financiera.
          </p>
          <p>
            Los textos, las ilustraciones y la identidad visual de Aventúrate Más son de su
            autoría. Puedes citarlos mencionando la fuente; reproducirlos con fines comerciales
            requiere autorización previa.
          </p>
        </article>

        <p className={styles.note}>
          Borrador pendiente de revisión legal. Ajustar antes del lanzamiento según la
          jurisdicción donde opere el proyecto y las herramientas que se terminen usando.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.action}>
            Volver al inicio
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
