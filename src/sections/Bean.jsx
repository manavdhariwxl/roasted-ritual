import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import beansImg from '../assets/images/beans.jpg'
import styles from './Bean.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Bean() {
  const sectionRef = useRef(null)
  const imgWrapRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const statRefs = useRef([])
  const markerRef = useRef(null)

  const stats = [
    { value: '3', label: 'Origins' },
    { value: '72h', label: 'Rest period' },
    { value: '100%', label: 'Single-origin' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal reveal
      gsap.fromTo(imgWrapRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.6,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Parallax inside
      gsap.to(imgRef.current, {
        x: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5,
        },
      })

      // Marker grow
      gsap.fromTo(markerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      )

      // Text reveal
      gsap.fromTo(textRef.current.querySelectorAll('.' + styles.revealItem),
        { y: 45, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 76%',
          },
        }
      )

      // Stats
      statRefs.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.bean}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div ref={imgWrapRef} className={styles.imageWrap}>
            <img
              ref={imgRef}
              src={beansImg}
              alt="Coffee beans, ground coffee and an espresso cup viewed from above"
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>

        <div ref={textRef} className={styles.textCol}>
          <div className={styles.eyebrow}>
            <span ref={markerRef} className={styles.marker} aria-hidden="true" />
            <span className={`${styles.eyebrowText} ${styles.revealItem}`}>The Bean</span>
          </div>

          <h2 className={`${styles.heading} ${styles.revealItem}`}>
            Where every<br />
            <em>cup begins.</em>
          </h2>

          <p className={`${styles.body} ${styles.revealItem}`}>
            We work directly with growers who treat each lot as a singular expression of terroir. Handpicked at peak ripeness. Washed, dried, and rested until the sugars settle into something worth roasting.
          </p>

          <div className={styles.stats}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={el => statRefs.current[i] = el}
                className={styles.stat}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
