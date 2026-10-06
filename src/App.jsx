import { useEffect } from 'react'
import { initLenis, destroyLenis } from './utils/lenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Ritual from './sections/Ritual'
import Roast from './sections/Roast'
import Bean from './sections/Bean'
import Brew from './sections/Brew'
import Menu from './sections/Menu'
import Space from './sections/Space'
import Craft from './sections/Craft'
import Gallery from './sections/Gallery'
import Visit from './sections/Visit'
import Cta from './sections/Cta'

export default function App() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      initLenis()
    }

    return () => {
      destroyLenis()
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="visually-hidden">Skip to main content</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <Ritual />
        <Roast />
        <Bean />
        <Brew />
        <Menu />
        <Space />
        <Craft />
        <Gallery />
        <Visit />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
