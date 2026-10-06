import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Brew.module.scss'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Bean',
    description: 'Single-origin. Traceable to the farm, the altitude, the season. We choose beans with story.',
  },
  {
    number: '02',
    title: 'Grind',
    description: 'Calibrated fresh per order. Coarser for pour-over. Finer for espresso. The grind is the gate.',
  },
  {
    number: '03',
    title: 'Brew',
    description: 'Water at 93°C. Bloom for 45 seconds. The pour is slow and deliberate — never rushed.',
  },
  {
    number: '04',
    title: 'Cup',
    description: 'Served at the right temperature, in the right vessel. Everything up to this point was for this moment.',
  },
]

export default function Brew() {
  const sectionRef = useRef(null)
  const stepRefs = useRef([])
  const lineRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      )

      // Animate the vertical connector line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )

      // Steps reveal
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const number = el.querySelector('.' + styles.stepNumber)
        const title = el.querySelector('.' + styles.stepTitle)
        const desc = el.querySelector('.' + styles.stepDesc)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 76%',
            toggleActions: 'play none none none',
          },
        })

        tl.fromTo(number,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
        )
        tl.fromTo(title,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        tl.fromTo(desc,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.brew}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>The Brew</span>
          <h2 ref={headingRef} className={styles.heading}>
            Four steps.<br />
            <em>One philosophy.</em>
          </h2>
        </div>

        <div className={styles.stepsContainer}>
          <div ref={lineRef} className={styles.connectorLine} aria-hidden="true" />

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={el => stepRefs.current[i] = el}
                className={styles.step}
              >
                <div className={styles.stepDot} aria-hidden="true" />
                <div className={styles.stepContent}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
