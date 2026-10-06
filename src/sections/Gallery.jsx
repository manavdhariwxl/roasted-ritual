import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import heroImg from '../assets/images/hero.jpg'
import ritualImg from '../assets/images/ritual.jpg'
import roastImg from '../assets/images/roast.jpg'
import beansImg from '../assets/images/beans.jpg'
import coldbrewImg from '../assets/images/coldbrew.jpg'

import styles from './Gallery.module.scss'

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: roastImg,
    alt: 'Roasting beans being sorted by hand',
    size: 'tall',
    offset: 0,
  },
  {
    src: ritualImg,
    alt: 'Latte art in three cups with plants',
    size: 'small',
    offset: 60,
  },
  {
    src: heroImg,
    alt: 'Milk pouring into dark coffee',
    size: 'medium',
    offset: -30,
  },
  {
    src: beansImg,
    alt: 'Coffee beans and grounds flat-lay',
    size: 'small',
    offset: 80,
  },
  {
    src: coldbrewImg,
    alt: 'Iced cold brew with swirling milk',
    size: 'medium',
    offset: 20,
  },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const wrapRefs = useRef([])
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Lightweight image reveals
      wrapRefs.current.forEach((wrap, i) => {
        if (!wrap) return

        const delay = i * 0.08

        gsap.fromTo(
          wrap,
          {
            clipPath: 'inset(100% 0 0 0)',
            y: 30,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            duration: 1.3,
            delay,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.gallery}>
      <div className={styles.header}>
        <h2 ref={headingRef} className={styles.heading}>
          Atmosphere
        </h2>
      </div>

      <div
        className={styles.mosaic}
        aria-label="Gallery of café images"
      >
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              wrapRefs.current[i] = el
            }}
            className={`${styles.item} ${styles[img.size]}`}
            style={{ '--offset': `${img.offset}px` }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className={styles.img}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
