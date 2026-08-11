import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/page.module.css';
import { mailtoHref } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className={`${styles.page}`}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Error 404</p>
        <h1 className={styles.title}>
          Esta página se fue de <em className={styles.italic}>aventura</em> sin avisar.
        </h1>
        <p className={styles.lead}>
          El enlace que seguiste no existe o cambió de lugar. Desde el inicio puedes ver los
          programas, los valores del proyecto y agendar una primera conversación.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.action}>
            Volver al inicio
            <span aria-hidden="true">→</span>
          </Link>
          <a href={mailtoHref} className={styles.actionGhost}>
            o escríbeme directamente
          </a>
        </div>
      </div>
    </section>
  );
}
