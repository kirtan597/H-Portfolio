import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const reviews = [
  {
    text: 'The costume designed for my fashion show was truly outstanding. The creativity, fitting, color theme, and stage presence were perfect. It matched my personality and helped me stand confidently on stage. The detailing and finishing were beyond expectations. Highly impressed with the work and dedication.',
    name: 'Sahaj Panchal',
    location: 'Client',
  },
  {
    text: 'Hency Buchiya is a talented and dedicated student with a strong creative mindset. Her passion for fashion design, discipline, and commitment to quality work are truly admirable. She has shown great potential through her innovative ideas and professional approach. We are proud to see her growing with such confidence and skill.',
    name: 'Gajendra Singh Dodiya',
    location: 'Head of Student Section, Rai University',
  },
  {
    text: 'Hency Buchiya is a hardworking student with excellent fashion sense and creativity. She understands design concepts well and always shows attention to detail in her work. Her dedication toward learning and creating unique garments makes her a promising designer for the future.',
    name: 'Ishita Sen',
    location: 'Assistant Professor, Fashion Dept, RSD',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dir, setDir] = useState(1)
  const { ref, controls } = useScrollReveal()

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => { setDir(1); setCurrent(c => (c + 1) % reviews.length) }, 5500)
    return () => clearInterval(t)
  }, [paused])

  const prev = () => { setPaused(true); setDir(-1); setCurrent(c => (c - 1 + reviews.length) % reviews.length) }
  const next = () => { setPaused(true); setDir(1); setCurrent(c => (c + 1) % reviews.length) }

  const r = reviews[current]

  return (
    <section id="testimonials" style={{
      background: '#F7F5F2', padding: '8rem 4rem', overflow: 'hidden',
    }}>
      {/* Section marker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
          fontWeight: 400, letterSpacing: '0.18em',
          background: '#0A0A0A', color: '#fff', padding: '0.35rem 0.7rem',
        }}>04</span>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
          fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', letterSpacing: '0.08em',
        }}>Testimonials</span>
        <span style={{ flex: 1, height: '1px', background: '#DDDDDD' }} />
      </div>

      {/* Heading */}
      <div style={{ marginBottom: '4rem', borderBottom: '1px solid #E0DDD9', paddingBottom: '2.5rem' }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '100%' }} whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 6.5rem)',
              fontWeight: 300, color: '#0A0A0A', lineHeight: 0.88, letterSpacing: '-0.02em',
            }}>What They</span>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 6.5rem)',
              fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', lineHeight: 0.88, letterSpacing: '-0.02em',
            }}>Say</span>
          </motion.div>
        </div>
      </div>

      {/* Slider — arrow left | card | arrow right */}
      <motion.div ref={ref} initial="hidden" animate={controls}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ display: 'flex', alignItems: 'stretch', gap: 'clamp(0.4rem, 2vw, 1.5rem)' }}>

        {/* Left arrow */}
        <button onClick={prev} style={{
          flexShrink: 0, width: 'clamp(36px, 5vw, 52px)', height: 'auto',
          border: '1px solid #DDDDDD', background: 'none',
          color: '#0A0A0A', fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s', alignSelf: 'stretch',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#0A0A0A' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#DDDDDD' }}
        >←</button>

        {/* Card */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ x: dir * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir * -60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#fff', border: '1px solid #E8E5E0',
                padding: 'clamp(1.8rem, 4vw, 3.5rem) clamp(1.4rem, 4vw, 4rem)',
              }}>

              {/* Large decorative quote */}
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '6rem',
                fontWeight: 200, color: '#EBEBEB', lineHeight: 0.7,
                marginBottom: '1.5rem', userSelect: 'none',
              }}>"</div>

              {/* Review text */}
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
                fontStyle: 'italic', fontWeight: 300, color: '#222',
                lineHeight: 1.95, marginBottom: '2.5rem',
              }}>{r.text}</p>

              {/* Divider + author */}
              <div className="author-row" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.8rem, 2vw, 2rem)', flexWrap: 'wrap' }}>
                <div style={{ width: '3rem', height: '1px', background: '#0A0A0A', flexShrink: 0 }} />
                <div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem',
                    fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: '#0A0A0A', marginBottom: '0.3rem',
                  }}>{r.name}</div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
                    fontWeight: 300, color: '#888', letterSpacing: '0.04em',
                  }}>{r.location}</div>
                </div>
                <div className="stars" style={{ marginLeft: 'auto', color: '#0A0A0A', fontSize: '0.85rem', letterSpacing: '0.15em' }}>★★★★★</div>
              </div>

              {/* Counter */}
              <div style={{
                marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #F0F0F0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {reviews.map((_, i) => (
                    <button key={i} onClick={() => { setPaused(true); setDir(i > current ? 1 : -1); setCurrent(i) }} style={{
                      width: i === current ? '2.5rem' : '0.5rem', height: '2px',
                      background: i === current ? '#0A0A0A' : '#CCCCCC',
                      border: 'none', transition: 'all 0.4s ease', padding: 0,
                    }} />
                  ))}
                </div>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
                  fontWeight: 300, color: '#AAAAAA', letterSpacing: '0.1em',
                }}>{String(current + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button onClick={next} style={{
          flexShrink: 0, width: 'clamp(36px, 5vw, 52px)',
          border: '1px solid #DDDDDD', background: 'none',
          color: '#0A0A0A', fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s', alignSelf: 'stretch',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#0A0A0A' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#DDDDDD' }}
        >→</button>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          #testimonials { padding: 5rem 1.6rem !important; }
        }
        @media (max-width: 600px) {
          #testimonials { padding: 4rem 1.2rem !important; }
          #testimonials p { font-size: 1.05rem !important; line-height: 1.85 !important; }
          #testimonials .author-row { flex-direction: column !important; align-items: flex-start !important; gap: 0.5rem !important; }
          #testimonials .stars { margin-left: 0 !important; }
        }
      `}</style>
    </section>
  )
}
