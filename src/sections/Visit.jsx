import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, Phone, Mail, X } from 'lucide-react'
import styles from './Visit.module.scss'

gsap.registerPlugin(ScrollTrigger)

const hours = [
  { day: 'Monday – Friday', time: '7:30 – 18:00' },
  { day: 'Saturday', time: '8:00 – 19:00' },
  { day: 'Sunday', time: '9:00 – 17:00' },
]

export default function Visit() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const infoRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', date: '', time: '', guests: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef(null)
  const modalContentRef = useRef(null)

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

      gsap.fromTo(infoRef.current.querySelectorAll('[data-reveal]'),
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 78%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (modalOpen) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(modalContentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      )
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setModalOpen(false)
      setSubmitted(false)
      setFormState({ name: '', email: '', date: '', time: '', guests: '', notes: '' })
    }, 2500)
  }

  const closeModal = () => {
    gsap.to(modalContentRef.current, {
      y: 30, opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => setModalOpen(false),
    })
  }

  return (
    <>
      <section id="visit" ref={sectionRef} className={styles.visit}>
        <div className={styles.inner}>
          <div className={styles.headerCol}>
            <span className={styles.eyebrow}>Find Us</span>
            <h2 ref={headingRef} className={styles.heading}>
              Visit<br />
              Roasted<br />
              <em>&amp; Ritual</em>
            </h2>
            <button
              className={styles.reserveBtn}
              onClick={() => setModalOpen(true)}
              aria-label="Make a reservation"
            >
              <span className={styles.reserveBtnText}>Reserve a table</span>
              <span className={styles.reserveBtnLine} aria-hidden="true" />
            </button>
          </div>

          <div ref={infoRef} className={styles.infoCol}>
            <div data-reveal className={styles.infoBlock}>
              <div className={styles.infoIcon}>
                <MapPin size={14} strokeWidth={1.5} />
              </div>
              <div>
                <p className={styles.infoLabel}>Location</p>
                <p className={styles.infoText}>12 Narrow Street<br />Limehouse, London E14 8DP</p>
              </div>
            </div>

            <div data-reveal className={styles.infoBlock}>
              <div className={styles.infoIcon}>
                <Clock size={14} strokeWidth={1.5} />
              </div>
              <div>
                <p className={styles.infoLabel}>Opening Hours</p>
                <ul className={styles.hoursList}>
                  {hours.map(h => (
                    <li key={h.day} className={styles.hoursItem}>
                      <span className={styles.hoursDay}>{h.day}</span>
                      <span className={styles.hoursTime}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div data-reveal className={styles.infoBlock}>
              <div className={styles.infoIcon}>
                <Phone size={14} strokeWidth={1.5} />
              </div>
              <div>
                <p className={styles.infoLabel}>Phone</p>
                <a href="tel:+442071234567" className={styles.infoLink}>+44 207 123 4567</a>
              </div>
            </div>

            <div data-reveal className={styles.infoBlock}>
              <div className={styles.infoIcon}>
                <Mail size={14} strokeWidth={1.5} />
              </div>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <a href="mailto:hello@roastedritual.com" className={styles.infoLink}>hello@roastedritual.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      {modalOpen && (
        <div
          ref={modalRef}
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Reservation form"
          onClick={(e) => e.target === modalRef.current && closeModal()}
        >
          <div ref={modalContentRef} className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Reserve a Table</h3>
              <button
                className={styles.modalClose}
                onClick={closeModal}
                aria-label="Close reservation form"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {submitted ? (
              <div className={styles.successMsg}>
                <p className={styles.successTitle}>Your table is reserved.</p>
                <p className={styles.successBody}>We'll confirm by email shortly. See you soon.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="res-name" className={styles.formLabel}>Full Name</label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      className={styles.formInput}
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      placeholder="Your name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="res-email" className={styles.formLabel}>Email</label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      className={styles.formInput}
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="res-date" className={styles.formLabel}>Date</label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      className={styles.formInput}
                      value={formState.date}
                      onChange={e => setFormState(s => ({ ...s, date: e.target.value }))}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="res-time" className={styles.formLabel}>Preferred Time</label>
                    <select
                      id="res-time"
                      required
                      className={styles.formInput}
                      value={formState.time}
                      onChange={e => setFormState(s => ({ ...s, time: e.target.value }))}
                    >
                      <option value="">Select time</option>
                      <option>8:00</option>
                      <option>9:00</option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                      <option>14:00</option>
                      <option>15:00</option>
                      <option>16:00</option>
                      <option>17:00</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="res-guests" className={styles.formLabel}>Guests</label>
                    <select
                      id="res-guests"
                      required
                      className={styles.formInput}
                      value={formState.guests}
                      onChange={e => setFormState(s => ({ ...s, guests: e.target.value }))}
                    >
                      <option value="">How many?</option>
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="res-notes" className={styles.formLabel}>Notes (optional)</label>
                  <textarea
                    id="res-notes"
                    className={`${styles.formInput} ${styles.formTextarea}`}
                    rows={3}
                    value={formState.notes}
                    onChange={e => setFormState(s => ({ ...s, notes: e.target.value }))}
                    placeholder="Dietary requirements, occasion, anything else..."
                  />
                </div>

                <button type="submit" className={styles.formSubmit}>
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
