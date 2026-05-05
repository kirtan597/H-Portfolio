import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const pairs = [
  {
    id: 1,
    embroidery: { src: '/Assest/Stichcraft Collection/1.1.jpeg', label: 'Embroidery Work' },
    dress:      { src: '/Assest/Stichcraft Collection/1.2.png',  label: 'On Dress' },
    name: 'Stichcraft No. 1',
  },
  {
    id: 2,
    embroidery: { src: '/Assest/Stichcraft Collection/2.1.jpeg', label: 'Embroidery Work' },
    dress:      { src: '/Assest/Stichcraft Collection/2.2.png',  label: 'On Dress' },
    name: 'Stichcraft No. 2',
  },
  {
    id: 3,
    embroidery: { src: '/Assest/Stichcraft Collection/3.1.png', label: 'Embroidery Work' },
    dress:      { src: '/Assest/Stichcraft Collection/3.2.png', label: 'On Dress' },
    name: 'Stichcraft No. 3',
  },
  {
    id: 4,
    embroidery: { src: '/Assest/Stichcraft Collection/4.1.jpeg', label: 'Embroidery Work' },
    dress:      { src: '/Assest/Stichcraft Collection/4.2.png',  label: 'On Dress' },
    name: 'Stichcraft No. 4',
  },
  {
    id: 5,
    embroidery: { src: '/Assest/Stichcraft Collection/5.1.jpeg', label: 'Embroidery Work' },
    dress:      { src: '/Assest/Stichcraft Collection/5.2.png',  label: 'On Dress' },
    name: 'Stichcraft No. 5',
  },
]

/* ── Single combo card with auto inner-slider ── */
function ComboSliderCard({ pair, index }) {
  const [slide, setSlide] = useState(0) // 0 = embroidery, 1 = dress
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  // Auto-rotate every 2.8s unless the user hovers to pause
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setSlide(s => (s === 0 ? 1 : 0))
    }, 2800)
    return () => clearInterval(timerRef.current)
  }, [paused])

  const current  = slide === 0 ? pair.embroidery : pair.dress
  const next     = slide === 0 ? pair.dress       : pair.embroidery

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 5',
        overflow: 'hidden',
        border: '1px solid #EBEBEB',
        background: '#F7F7F7',
        cursor: 'none',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* ── Active image ── */}
      <motion.img
        key={current.src}
        src={current.src}
        alt={current.label}
        loading="lazy"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          background: '#F7F7F7',
        }}
      />

      {/* ── Bottom bar: name + slide indicator dots ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '2.2rem 1rem 0.85rem',
        background: 'linear-gradient(to top, rgba(10,10,10,0.72) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        zIndex: 2,
      }}>
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem',
            fontStyle: 'italic', fontWeight: 300, color: '#fff',
            letterSpacing: '0.02em',
          }}>{pair.name}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.52rem',
            fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C9A96E', marginTop: '0.25rem',
          }}>{current.label}</div>
        </div>

        {/* Dot indicators (no arrows) */}
        <div style={{ display: 'flex', gap: '5px', paddingBottom: '2px' }}>
          {[0, 1].map(i => (
            <div
              key={i}
              onClick={e => { e.stopPropagation(); setSlide(i) }}
              style={{
                width: i === slide ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === slide ? '#C9A96E' : 'rgba(255,255,255,0.4)',
                transition: 'width 0.35s ease, background 0.35s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      {/* Hover-pause pill */}
      {paused && (
        <div style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.48rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          background: 'rgba(10,10,10,0.42)',
          padding: '0.2rem 0.5rem', borderRadius: 2,
          zIndex: 3,
        }}>Paused</div>
      )}
    </motion.div>
  )
}

/* ── Section ── */
export default function HandcraftedCollection() {
  const { ref, controls } = useScrollReveal()

  return (
    <section
      id="handcrafted"
      style={{ background: '#FAFAFA', padding: '8rem 4rem' }}
    >
      {/* Section marker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
          fontWeight: 400, letterSpacing: '0.18em',
          background: '#0A0A0A', color: '#fff', padding: '0.35rem 0.7rem',
        }}>04</span>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
          fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', letterSpacing: '0.08em',
        }}>Handcrafted</span>
        <span style={{ flex: 1, height: '1px', background: '#DDDDDD' }} />
      </div>

      {/* Heading */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            fontWeight: 300, color: '#0A0A0A', lineHeight: 0.88, letterSpacing: '-0.03em',
          }}>Handcrafted</span>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', lineHeight: 0.88,
            letterSpacing: '-0.03em', marginLeft: 'clamp(1.5rem, 4vw, 4rem)',
          }}>Collection</span>
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
          fontWeight: 300, color: '#888', marginTop: '1.5rem', letterSpacing: '0.02em',
        }}>
          Each piece begins as embroidery — then finds its home on couture.
          <span style={{ color: '#C9A96E', marginLeft: '0.5rem', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Hover to pause · Click dot to switch
          </span>
        </p>
      </div>

      {/* Grid — 3 cols desktop, 2 tablet, 1 mobile */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        className="hc-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
      >
        {pairs.map((pair, i) => (
          <ComboSliderCard key={pair.id} pair={pair} index={i} />
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          #handcrafted { padding: 6rem 2rem !important; }
          .hc-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.2rem !important; }
        }
        @media (max-width: 600px) {
          #handcrafted { padding: 5rem 1.6rem !important; }
          .hc-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
        @media (max-width: 480px) {
          #handcrafted { padding: 4rem 1.2rem !important; }
          .hc-grid { gap: 1.2rem !important; }
        }
      `}</style>
    </section>
  )
}
