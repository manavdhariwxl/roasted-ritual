import styles from './Footer.module.scss'

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.brandName}>Roasted &amp; Ritual</p>
            <p className={styles.brandSub}>Coffee Café</p>
          </div>

          <nav className={styles.footerNav} aria-label="Footer navigation">
            <ul className={styles.navList} role="list">
              {[
                { label: 'Menu', id: 'menu' },
                { label: 'About', id: 'about' },
                { label: 'Space', id: 'space' },
                { label: 'Visit', id: 'visit' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    className={styles.navLink}
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <a href="mailto:hello@roastedritual.com" className={styles.contactLink}>
              hello@roastedritual.com
            </a>
            <a href="tel:+442071234567" className={styles.contactLink}>
              +44 207 123 4567
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.address}>
            12 Narrow Street, Limehouse, London E14 8DP
          </p>
          <p className={styles.credit}>
            Designed &amp; Developed by Manav
          </p>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Roasted &amp; Ritual
          </p>
        </div>
      </div>
    </footer>
  )
}
