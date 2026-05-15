import styles from './Footer.module.css';

export function Footer() {
  const columns = [
    { title: 'Servicios', items: ['Coaching 1:1', 'Talleres', 'Conferencias', 'Mentoría'] },
    { title: 'Recursos', items: ['Blog', 'Podcast', 'Newsletter', 'Casos'] },
    { title: 'Contacto', items: ['LinkedIn', 'Instagram', 'Email', 'WhatsApp'] },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoGroup}>
              <div className={styles.logoMark}>a+</div>
              <span className={styles.logoText}>aventúrate más</span>
            </div>
            <p className={styles.description}>
              Programa de talento humano y cultura colaborativa fundado por Maritza Rodríguez.
            </p>
          </div>

          {columns.map(col => (
            <div key={col.title} className={styles.column}>
              <div className={styles.colTitle}>{col.title}</div>
              <ul className={styles.list}>
                {col.items.map(item => (
                  <li key={item} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Aventúrate Más · Todos los derechos reservados</span>
          <span><a className={styles.link} href="https://nosterlabs.com" target="_blank" rel="noopener noreferrer">Powered by NosterLabs <span className={styles.externalArrow}>↗</span></a></span>
        </div>
      </div>
    </footer>
  );
}
