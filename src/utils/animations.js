import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Reveal text lines from bottom
export function revealLines(elements, config = {}) {
  const defaults = {
    y: 80,
    opacity: 0,
    duration: 1.1,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0,
  }
  const opts = { ...defaults, ...config }

  return gsap.from(elements, {
    y: opts.y,
    opacity: opts.opacity,
    duration: opts.duration,
    stagger: opts.stagger,
    ease: opts.ease,
    delay: opts.delay,
  })
}

// Fade in with upward drift
export function fadeUp(elements, config = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power2.out',
  }
  const opts = { ...defaults, ...config }

  return gsap.from(elements, {
    y: opts.y,
    opacity: opts.opacity,
    duration: opts.duration,
    stagger: opts.stagger,
    ease: opts.ease,
  })
}

// Image reveal with clip-path
export function clipReveal(element, config = {}) {
  const defaults = {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.4,
    ease: 'power4.inOut',
  }
  const opts = { ...defaults, ...config }

  return gsap.from(element, {
    clipPath: opts.clipPath,
    duration: opts.duration,
    ease: opts.ease,
  })
}

// ScrollTrigger-based image reveal
export function scrollRevealImage(element, trigger, config = {}) {
  return gsap.from(element, {
    clipPath: 'inset(100% 0 0 0)',
    duration: 1.6,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top 75%',
      toggleActions: 'play none none none',
      ...config.scrollTrigger,
    },
    ...config,
  })
}

// ScrollTrigger fade up
export function scrollFadeUp(elements, trigger, config = {}) {
  return gsap.from(elements, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: trigger || elements,
      start: 'top 78%',
      toggleActions: 'play none none none',
      ...config.scrollTrigger,
    },
    ...config,
  })
}

// Horizontal parallax
export function parallaxX(element, amount = -50) {
  return gsap.to(element, {
    x: amount,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      scrub: 1.5,
    },
  })
}

// Vertical parallax on image
export function parallaxY(element, amount = -80) {
  return gsap.to(element, {
    y: amount,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      scrub: 1.5,
    },
  })
}

// Scale from small
export function scaleIn(element, trigger) {
  return gsap.from(element, {
    scale: 1.1,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
}
