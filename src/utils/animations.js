// Horizontal parallax
export function parallaxX(element, amount = -50) {
  return gsap.to(element, {
    x: amount,
    ease: 'none',
    force3D: true,
    scrollTrigger: {
      trigger: element,
      scrub: 2,
      invalidateOnRefresh: true,
    },
  })
}

// Vertical parallax on image
export function parallaxY(element, amount = -80) {
  return gsap.to(element, {
    y: amount,
    ease: 'none',
    force3D: true,
    scrollTrigger: {
      trigger: element,
      scrub: 2,
      invalidateOnRefresh: true,
    },
  })
}