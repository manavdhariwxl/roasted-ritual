import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ritualImg from '../assets/images/ritual.jpg'
import styles from './Ritual.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Ritual() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const imgWrapRef = useRef(null)
  const headingRef = useRef(null)
  const bodyRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      gsap.fromTo(imgWrapRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Subtle parallax inside image
      gsap.to(imgRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5,
        },
      })

      // Text reveals
      gsap.fromTo(markerRef.current,
        { width: 0 },
        {
          width: '2.5rem',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 78%',
          },
        }
      )

      gsap.fromTo(bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className={styles.ritual}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div ref={imgWrapRef} className={styles.imageWrap}>
            <img
              ref={imgRef}
              src={ritualImg}
              alt="Three latte art cups with plants on a wooden table"
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.textCol}>
          <div className={styles.eyebrow}>
            <span ref={markerRef} className={styles.marker} aria-hidden="true" />
            <span className={styles.eyebrowText}>The Ritual</span>
          </div>

          <h2 ref={headingRef} className={styles.heading}>
            Coffee as a<br />
            <em>daily ceremony.</em>
          </h2>

          <div ref={bodyRef} className={styles.body}>
            <p>
              We believe the cup in your hands deserves more than a rushed transaction. Every ritual begins before the first sip — in the deliberate grind, the measured pour, the quiet moment of waiting.
            </p>
            <p>
              Roasted &amp; Ritual exists for people who still make time for that pause. Come as you are. Stay as long as you need.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
