import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function initLenis() {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 0.9,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })

  lenisInstance.on('scroll', ScrollTrigger.update)

  const raf = (time) => {
    lenisInstance?.raf(time * 1000)
  }

  gsap.ticker.add(raf)

  // Don't disable GSAP's frame-drop recovery.
  gsap.ticker.lagSmoothing(500, 33)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}