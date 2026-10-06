import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from '../assets/images/hero.jpg'
import styles from './Hero.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const overlayRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const taglineRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Image scale-in entrance
      tl.fromTo(imgRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.04, opacity: 1, duration: 1.8, ease: 'power2.out' },
        0
      )

      // Overlay fade
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0.2
      )

      // Title lines reveal
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        { y: 90, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.1, stagger: 0.1 },
        0.6
      )

      tl.fromTo(line3Ref.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1.0
      )

      tl.fromTo(taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.3
      )

      tl.fromTo(scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.7
      )

      // Slow parallax on scroll
      gsap.to(imgRef.current, {
        y: '18%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Scroll hint fade out
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '15% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Hero">
      <div className={styles.imageWrapper}>
        <img
          ref={imgRef}
          src={heroImg}
          alt="Milk being poured into dark coffee in a dramatic light"
          className={styles.image}
          loading="eager"
        />
        <div ref={overlayRef} className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <div className={styles.lineWrap}>
            <h1 ref={line1Ref} className={styles.titleLine1}>Roasted</h1>
          </div>
          <div className={styles.lineWrap}>
            <h1 ref={line2Ref} className={styles.titleLine2}>&amp; Ritual</h1>
          </div>
          <div className={styles.lineWrap}>
            <p ref={line3Ref} className={styles.subtitle}>Coffee Café</p>
          </div>
        </div>

        <p ref={taglineRef} className={styles.tagline}>
          A slower way to drink coffee.
        </p>
      </div>

      <div ref={scrollHintRef} className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  )
}
