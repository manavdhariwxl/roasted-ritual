import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Nav.module.scss'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' }
      )
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.' + styles.mobileLink),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out', delay: 0.25 }
      )
      document.body.style.overflow = 'hidden'
    } else {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'power3.inOut',
        })
      }
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  const navLinks = [
    { label: 'Menu', id: 'menu' },
    { label: 'About', id: 'about' },
    { label: 'Space', id: 'space' },
    { label: 'Visit', id: 'visit' },
  ]

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Main navigation">
        <button
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Roasted & Ritual — back to top"
        >
          <span className={styles.logoMark}>R&amp;R</span>
        </button>

        <ul className={styles.links} role="list">
          {navLinks.map(link => (
            <li key={link.id}>
              <button className={styles.link} onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className={`${styles.mobileOverlay} ${menuOpen ? styles.active : ''}`}
        aria-hidden={!menuOpen}
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <div ref={mobileMenuRef} className={styles.mobileNav}>
          <div className={styles.mobileHeader}>
            <span className={styles.mobileBrand}>Roasted<br />&amp; Ritual</span>
          </div>
          <ul className={styles.mobileLinks} role="list">
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  className={styles.mobileLink}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.mobileFooter}>
            <p>A slower way to drink coffee.</p>
          </div>
        </div>
      </div>
    </>
  )
}
