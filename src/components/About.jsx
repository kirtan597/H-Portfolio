import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const { ref, controls } = useScrollReveal()
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    `/Assest/about-1.jpeg?v=${Date.now()}`, 
    `/Assest/about-2.jpeg?v=${Date.now()}`
  ]

  // Auto-change images every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" style={{
      background: '#F0EDE8', padding: '6rem 1.6rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Section marker */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
        fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: '#C9A96E', marginBottom: '4rem',
      }}>02 / ABOUT</div>

      {/* Ghost number */}
      <div className="ghost-num" style={{
        fontWeight: 200, color: '#EBEBEB', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>02</div>

      <motion.div ref={ref} initial="hidden" animate={controls}
        className="about-grid"
        style={{
          display: 'grid', gridTemplateColumns: '38% 1fr',
          gap: '6rem', alignItems: 'start', position: 'relative', zIndex: 1,
        }}>

        {/* Image */}
        <motion.div variants={fadeUp} style={{ position: 'relative' }}>
          <div className="grain" style={{ position: 'relative', border: '1px solid #0A0A0A', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt={`Hency Buchiya ${currentImage + 1}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  width: '100%', 
                  aspectRatio: '1/1.4', 
                  objectFit: 'cover', 
                  objectPosition: 'top center', 
                  filter: 'grayscale(10%)',
                  display: 'block'
                }}
              />
            </AnimatePresence>
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              background: '#0A0A0A', padding: '0.5rem 0.8rem',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem',
              fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#C9A96E', zIndex: 2,
            }}>EST. 2018</div>
          </div>
        </motion.div>

        {/* Text */}
        <div>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
            fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A',
            lineHeight: 0.88, letterSpacing: '-0.02em', marginBottom: '2rem',
          }}>The Designer</motion.h2>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem',
            fontWeight: 300, color: '#444', lineHeight: 1.9,
            marginBottom: '3rem',
          }}>
            Hello Audience, I am Hency Buchiya, a passionate fashion designer
            with strong creative vision and deep knowledge of fashion, styling,
            fabrics, and garment craftsmanship. I specialize in creating elegant
            and timeless designs that blend modern trends with classic beauty.
            With a keen eye for detail, embroidery, and perfect fitting, I believe
            every outfit should reflect confidence, grace, and individuality. My
            goal is to design premium garments that make every client feel unique,
            stylish, and beautiful.
          </motion.p>

          {/* Pull quote */}
          <motion.blockquote variants={fadeUp} style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 2vw, 2rem)',
            fontWeight: 300, fontStyle: 'italic', color: '#888',
            lineHeight: 1.5, marginBottom: '3rem',
            borderLeft: 'none', paddingLeft: 0,
          }}>
            "I don't just design clothes.<br />I design confidence."
            <footer style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
              fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#888', marginTop: '0.8rem',
            }}>— Hency Buchiya</footer>
          </motion.blockquote>

          {/* Pills */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {['CUSTOM DESIGNS', 'PREMIUM FINISHING', 'MODERN TRENDS', 'PERSONAL STYLING'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
                fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
                background: '#0A0A0A', color: '#fff',
                padding: '0.5rem 1rem', borderRadius: 0,
              }}>{tag}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        #about { padding: 6rem 4rem; }
        @media (max-width: 768px) {
          #about { padding: 5rem 1.6rem !important; }
          #about .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          #about .ghost-num { display: none; }
        }
        @media (max-width: 480px) {
          #about { padding: 4rem 1.2rem !important; }
          #about .about-grid { gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
