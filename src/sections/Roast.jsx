import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import roastImg from '../assets/images/roast.jpg'
import styles from './Roast.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Roast() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const overlayRef = useRef(null)
  const wordRefs = useRef([])
  const bodyRef = useRef(null)

  const words = ['The', 'Roast']

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Overlay reveal
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Words stagger reveal
      wordRefs.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 100, opacity: 0, skewY: 4 },
          {
            y: 0, opacity: 1, skewY: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      gsap.fromTo(bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.roast}>
      <div className={styles.imageWrapper}>
        <img
          ref={imgRef}
          src={roastImg}
          alt="Hands sorting freshly roasted coffee beans in a large roasting drum"
          className={styles.image}
          loading="lazy"
        />
        <div ref={overlayRef} className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.headingBlock}>
          {words.map((word, i) => (
            <div key={word} className={styles.wordWrap}>
              <h2
                ref={el => wordRefs.current[i] = el}
                className={styles.word}
              >
                {word}
              </h2>
            </div>
          ))}
        </div>

        <div className={styles.textBlock}>
          <p ref={bodyRef} className={styles.body}>
            Dark, rich, and unapologetically direct. Our master roasters coax complexity from single-origin beans sourced from cooperatives in Ethiopia, Colombia, and Sumatra. Each batch roasted small. Each flavour profile mapped by hand.
          </p>
        </div>
      </div>
    </section>
  )
}
