import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import spaceImg from '../assets/images/space.jpg'
import styles from './Space.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Space() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const labelRef = useRef(null)
  const textRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wide parallax
      gsap.to(imgRef.current, {
        y: '-12%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Label reveal
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Text
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="space" ref={sectionRef} className={styles.space}>
      <div className={styles.imageFrame}>
        <img
          ref={imgRef}
          src={spaceImg}
          alt="Intimate café interior with wooden stools, a low table with coffee and a magazine"
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />
        <span ref={labelRef} className={styles.imageLabel} aria-hidden="true">
          The Space
        </span>
      </div>

      <div className={styles.textRow}>
        <div ref={textRef} className={styles.textBlock}>
          <h2 className={styles.heading}>
            A room for<br />
            <em>unhurried hours.</em>
          </h2>
          <p className={styles.body}>
            Tucked away from the morning rush. Low light, warm wood, and the right kind of quiet. Designed to make you forget what time it is — and not mind.
          </p>
        </div>

        <blockquote ref={quoteRef} className={styles.quote}>
          <p>"The best cafés have always been libraries with better coffee."</p>
        </blockquote>
      </div>
    </section>
  )
}
