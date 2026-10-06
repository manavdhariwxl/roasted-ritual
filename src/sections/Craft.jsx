import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import craftImg from '../assets/images/craft.jpg'
import styles from './Craft.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Craft() {
  const sectionRef = useRef(null)
  const imgWrapRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const listRef = useRef(null)

  const pillars = [
    'Precision extraction',
    'Water mineralogy',
    'Seasonal sourcing',
    'Barista mentorship',
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image from bottom reveal
      gsap.fromTo(imgWrapRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      )

      // Parallax inside image
      gsap.to(imgRef.current, {
        y: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5,
        },
      })

      // Text block
      gsap.fromTo(textRef.current.querySelectorAll('h2, p'),
        { y: 45, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 78%',
          },
        }
      )

      // List items
      gsap.fromTo(listRef.current.querySelectorAll('li'),
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.craft}>
      <div className={styles.inner}>
        <div ref={textRef} className={styles.textCol}>
          <span className={styles.eyebrow}>Craft</span>
          <h2 className={styles.heading}>
            Behind every<br />
            cup, a<br />
            <em>craftsperson.</em>
          </h2>
          <p className={styles.body}>
            Our baristas train for months before they touch the machine. Not because coffee is complicated — but because the details matter. The tamp pressure. The pour rate. The conversation while you wait.
          </p>

          <ul ref={listRef} className={styles.list} aria-label="Our craft pillars">
            {pillars.map((item) => (
              <li key={item} className={styles.listItem}>
                <span className={styles.listDot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.imageCol}>
          <div ref={imgWrapRef} className={styles.imageWrap}>
            <img
              ref={imgRef}
              src={craftImg}
              alt="Espresso machine extracting a concentrated shot of coffee"
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
