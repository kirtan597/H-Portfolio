import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import HeroHighlight from './HeroHighlight'

const phrases = [
  'Designing Elegance in Every Stitch',
  'Couture Crafted for the Extraordinary',
  'Where Fabric Becomes Fine Art',
  'Tailored Precisely. Worn Confidently.',
  'Form. Fit. Feeling.',
  'Hand-Embroidered. Heart-Crafted.',
  'Zardozi, Resham & Raw Silk.',
  'Chikankari Woven into Every Dream.',
  'Banarasi Threads. Timeless Silhouettes.',
  'From Organza to Occasion.',
  'Sequins, Silk & Singular Vision.',
  'Kantha. Kutch. Couture.',
  'Every Drape Tells a Story.',
  'Handloom Heritage. Modern Grace.',
]

const tickerText = '✦ SKETCHING  ·  FASHION ILLUSTRATION  ·  TREND FORECASTING  ·  PATTERN MAKING  ·  TEXTILE KNOWLEDGE  ·  FABRIC DYEING & PRINTING  ·  EMBROIDERY DESIGNS  ·  AARI WORK  ·  ADOBE ILLUSTRATOR  ·  ADOBE PHOTOSHOP  ·  COREL DRAW  ·  FASHION STYLING  ·  TEAM COLLABORATION  ·  CREATIVE THINKING  ·  DRAPING  ·  '

function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    if (typing) {
      if (displayed.length < phrase.length) {
        const t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 55)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28)
        return () => clearTimeout(t)
      } else {
        setPhraseIdx((phraseIdx + 1) % phrases.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, phraseIdx])

  return (
    <div style={{
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
      fontWeight: 400, color: '#0A0A0A',
      minHeight: '2rem', letterSpacing: '0.01em', fontStyle: 'italic',
    }}>
      {displayed}<span style={{ color: '#C9A96E' }}>_</span>
    </div>
  )
}

export default function Hero() {
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)
  const [hovered, setHovered] = useState(false)

  return (
    <section
      id="home"
      onMouseMove={e => { mouseX.set(e.clientX); mouseY.set(e.clientY) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', minHeight: '100vh', background: '#fff',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}
    >
      <HeroHighlight mouseX={mouseX} mouseY={mouseY} hovered={hovered} />

      {/* ── Desktop layout: grid ── */}
      <div className="hero-grid" style={{
        flex: 1, position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: 'auto 1fr auto',
        padding: '7rem 4rem 0',
        minHeight: 'calc(100vh - 3rem)',
      }}>

        {/* TOP-LEFT: label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem',
            fontWeight: 400, letterSpacing: '0.15em',
            color: '#0A0A0A', paddingBottom: '2.5rem', alignSelf: 'end',
          }}>
          Fashion Designer · Ahmedabad
        </motion.div>

        <div />

        {/* MIDDLE-LEFT: name + typewriter + CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '3rem' }}>

          <div style={{ overflow: 'hidden', marginBottom: '-0.5rem' }}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hero-name"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(4rem, 13vw, 13vw)',
                fontWeight: 200, lineHeight: 0.88, letterSpacing: '-0.04em',
                color: '#0A0A0A', userSelect: 'none',
              }}>
              HENCY
            </motion.div>
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hero-name hero-name-buchiya"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(4rem, 13vw, 13vw)',
                fontWeight: 200, fontStyle: 'italic', lineHeight: 0.88,
                letterSpacing: '-0.04em', color: '#0A0A0A',
                marginLeft: 'clamp(1.5rem, 6vw, 7rem)', userSelect: 'none',
              }}>
              BUCHIYA
            </motion.div>
          </div>

          {/* Typewriter below both names */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              padding: '0.8rem 0 0.8rem 0.8rem',
              borderLeft: '2px solid #EBEBEB',
              marginBottom: '2rem',
            }}>
            <Typewriter />
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '1px', background: '#DDDDDD',
              transformOrigin: 'left', marginBottom: '2rem',
              width: 'min(480px, 80%)',
            }} />
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hero-ctas"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['EXPLORE GALLERY', 'MY RESUME'].map((label, i) => (
              <button key={label}
                onClick={() => {
                  if (i === 0) document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
                  if (i === 1) window.open('/Assest/DOC-20260430-WA0000..pdf', '_blank')
                }}
                style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
                  fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
                  padding: '1rem 2.6rem',
                  background: i === 0 ? 'transparent' : '#0A0A0A',
                  color: i === 0 ? '#0A0A0A' : '#fff',
                  border: '1px solid #0A0A0A',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = i === 0 ? 'transparent' : '#0A0A0A'; e.currentTarget.style.color = i === 0 ? '#0A0A0A' : '#fff' }}
              >{label}</button>
            ))}
          </motion.div>
        </div>

        {/* MIDDLE-RIGHT: photo */}
        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            alignSelf: 'center',
            width: 'clamp(280px, 30vw, 450px)',
            marginLeft: '4rem',
            position: 'relative',
          }}>
          <div style={{ position: 'relative', border: '1px solid #0A0A0A' }}>
            <img
              src="/Assest/ChatGPT Image May 3, 2026, 10_23_31 AM.png"
              alt="Hency Buchiya"
              fetchPriority="high"
              decoding="async"
              style={{
                width: '100%', 
                aspectRatio: '1/1.4', 
                objectFit: 'cover', 
                objectPosition: 'top center',
                filter: 'grayscale(10%)', 
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', inset: '8px',
              border: '1px solid rgba(255,255,255,0.4)',
              pointerEvents: 'none',
            }} />
          </div>
        </motion.div>

        {/* BOTTOM-LEFT: stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            display: 'flex', gap: '3.5rem', alignItems: 'flex-end',
            paddingBottom: '1.5rem', paddingTop: '2rem',
            borderTop: '1px solid #EBEBEB',
          }}>
          {[['200+', 'Designs Created'], ['85+', 'Happy Clients'], ['3+', 'Years of Excellence']].map(([num, label]) => (
            <div key={label}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem',
                fontWeight: 300, lineHeight: 1, color: '#0A0A0A',
              }}>{num}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem',
                fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#888', marginTop: '0.25rem',
              }}>{label}</div>
            </div>
          ))}
        </motion.div>

        <div />
      </div>

      {/* ── Ticker ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        style={{
          borderTop: '1px solid #DDDDDD', overflow: 'hidden',
          padding: '0.85rem 0', background: 'transparent',
          flexShrink: 0, position: 'relative', zIndex: 1,
        }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'ticker 32s linear infinite',
        }}>
          {[tickerText, tickerText, tickerText].map((t, i) => (
            <span key={i} style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
              fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#0A0A0A',
            }}>{t}</span>
          ))}
        </div>
      </motion.div>

      <style>{`
        /* ── Mobile Hero ── */
        @media (max-width: 768px) {
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
            padding: 5.5rem 1.6rem 0 !important;
            min-height: unset !important;
          }
          .hero-photo { display: none !important; }
          .hero-name {
            font-size: clamp(3rem, 16vw, 16vw) !important;
            letter-spacing: -0.03em !important;
            line-height: 0.9 !important;
          }
          .hero-name-buchiya {
            margin-left: clamp(0.8rem, 4vw, 4vw) !important;
          }
          .hero-stats {
            gap: 1.8rem !important;
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
          .hero-stats > div > div:first-child {
            font-size: 2.2rem !important;
          }
          .hero-ctas {
            flex-direction: column !important;
          }
          .hero-ctas button {
            width: 100% !important;
            text-align: center !important;
            padding: 0.9rem 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-grid {
            padding: 5rem 1.2rem 0 !important;
          }
          .hero-stats {
            gap: 1.2rem !important;
            flex-wrap: wrap !important;
          }
          .hero-stats > div > div:first-child {
            font-size: 1.8rem !important;
          }
          .hero-stats > div > div:last-child {
            font-size: 0.55rem !important;
          }
        }
      `}</style>
    </section>
  )
}
