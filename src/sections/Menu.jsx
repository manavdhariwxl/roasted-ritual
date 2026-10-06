import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import coldbrewImg from '../assets/images/coldbrew.jpg'
import craftImg from '../assets/images/craft.jpg'
import styles from './Menu.module.scss'

gsap.registerPlugin(ScrollTrigger)

const drinks = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A concentrated shot of our house blend. Thick crema. Bright finish. The foundation of everything.',
    price: '£3.50',
    note: 'single or double',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Velvety micro-foam over a double shot. Served at the precise temperature to preserve sweetness.',
    price: '£4.80',
    note: 'oat milk on request',
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Dark chocolate paste from our kitchen, folded into espresso and steamed milk. Indulgent without apology.',
    price: '£5.20',
    note: 'with house chocolate',
  },
  {
    id: 'coldbrew',
    name: 'Cold Brew',
    description: '20-hour cold extraction. Low acidity, high complexity. Served over a single large cube.',
    price: '£5.50',
    note: '20-hour steep',
  },
]

export default function Menu() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const itemRefs = useRef([])
  const [activeItem, setActiveItem] = useState(0)
  const imgWrap1Ref = useRef(null)
  const imgWrap2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      )

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
            },
          }
        )
      })

      ;[imgWrap1Ref, imgWrap2Ref].forEach((ref, i) => {
        gsap.fromTo(ref.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
            delay: i * 0.2,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="menu" ref={sectionRef} className={styles.menu}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Signature Menu</span>
          <h2 ref={headingRef} className={styles.heading}>
            Drinks worth<br />
            <em>lingering over.</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Menu list */}
          <div className={styles.drinkList}>
            {drinks.map((drink, i) => (
              <div
                key={drink.id}
                ref={el => itemRefs.current[i] = el}
                className={`${styles.drinkItem} ${activeItem === i ? styles.active : ''}`}
                onMouseEnter={() => setActiveItem(i)}
                onClick={() => setActiveItem(i)}
                tabIndex={0}
                role="button"
                aria-pressed={activeItem === i}
                onKeyDown={(e) => e.key === 'Enter' && setActiveItem(i)}
              >
                <div className={styles.drinkTop}>
                  <h3 className={styles.drinkName}>{drink.name}</h3>
                  <span className={styles.drinkPrice}>{drink.price}</span>
                </div>
                <p className={styles.drinkDesc}>{drink.description}</p>
                <span className={styles.drinkNote}>{drink.note}</span>
              </div>
            ))}
          </div>

          {/* Image stack */}
          <div className={styles.imageStack}>
            <div ref={imgWrap1Ref} className={styles.imageWrap1}>
              <img
                src={craftImg}
                alt="Espresso machine extracting coffee"
                className={styles.stackImg}
                loading="lazy"
              />
            </div>
            <div ref={imgWrap2Ref} className={styles.imageWrap2}>
              <img
                src={coldbrewImg}
                alt="Iced cold brew coffee with milk swirling"
                className={styles.stackImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
