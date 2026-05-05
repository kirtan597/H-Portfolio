import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`
      }

      // Check if hovering over a gallery card (dark overlay background)
      const el = document.elementFromPoint(mouseX, mouseY)
      const onCard = el?.closest('[data-gallery-card]')
      const color = onCard ? '#fff' : '#0A0A0A'
      const borderColor = onCard ? 'rgba(255,255,255,0.8)' : '#0A0A0A'

      if (dot.current) {
        dot.current.style.background = color
        dot.current.style.mixBlendMode = 'normal'
      }
      if (ring.current) {
        ring.current.style.borderColor = borderColor
        ring.current.style.mixBlendMode = 'normal'
      }
    }

    let raf
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring.current) {
        ring.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0, width: 4, height: 4,
        background: '#0A0A0A', borderRadius: '50%', zIndex: 99999,
        pointerEvents: 'none', willChange: 'transform',
        transition: 'background 0.2s, border-color 0.2s',
      }} />
      <div ref={ring} style={{
        position: 'fixed', top: 0, left: 0, width: 32, height: 32,
        border: '1px solid #0A0A0A', borderRadius: '50%', zIndex: 99998,
        pointerEvents: 'none', willChange: 'transform',
        transition: 'border-color 0.2s',
      }} />
    </>
  )
}
