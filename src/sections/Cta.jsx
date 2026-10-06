import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Cta.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Cta() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const tagRef = useRef(null)
  const lineRuleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRuleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo([line1Ref.current, line2Ref.current],
        { y: 80, opacity: 0, skewY: 2 },
        {
          y: 0, opacity: 1, skewY: 0,
          duration: 1.3,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(tagRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: tagRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.cta}>
      <div className={styles.inner}>
        <span ref={lineRuleRef} className={styles.rule} aria-hidden="true" />

        <div className={styles.brandBlock}>
          <div className={styles.lineWrap}>
            <p ref={line1Ref} className={styles.brand1}>Roasted</p>
          </div>
          <div className={styles.lineWrap}>
            <p ref={line2Ref} className={styles.brand2}>&amp; Ritual</p>
          </div>
        </div>

        <p ref={tagRef} className={styles.tagline}>
          A slower way to drink coffee.<br />
          <em>London, since 2019.</em>
        </p>
      </div>
    </section>
  )
}
