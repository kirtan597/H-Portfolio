import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

export default function useScrollReveal() {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, margin: '-40px', amount: 0.1 })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return { ref, controls }
}
