import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['HOME', 'ABOUT', 'GALLERY', 'TESTIMONIALS', 'CONTACT']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('HOME')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'about', 'gallery', 'testimonials', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id.toUpperCase())
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.8rem 3rem',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #DDDDDD' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <button onClick={() => scrollTo('home')} style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem',
          fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A',
          background: 'none', border: 'none',
          letterSpacing: '0.04em', lineHeight: 1,
        }}>HB</button>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
          className="nav-links">
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
              fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase',
              background: 'none', border: 'none', color: '#0A0A0A',
              paddingBottom: '2px',
              borderBottom: active === link ? '1px solid #C9A96E' : '1px solid transparent',
              transition: 'border-color 0.3s',
            }}>{link}</button>
          ))}
        </div>

        <button onClick={() => scrollTo('contact')} style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
          fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
          background: 'none', border: '1px solid #0A0A0A', color: '#0A0A0A',
          padding: '0.75rem 1.5rem',
          transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.target.style.background = '#0A0A0A'; e.target.style.color = '#fff' }}
          onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = '#0A0A0A' }}
          className="book-btn"
        >BOOK CONSULTATION</button>

        <button onClick={() => setMenuOpen(true)} className="hamburger" style={{
          display: 'none', background: 'none', border: 'none',
          flexDirection: 'column', gap: '5px',
        }}>
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 24, height: 1, background: '#0A0A0A' }} />)}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(320px, 85vw)',
              background: '#fff', zIndex: 2000,
              display: 'flex', flexDirection: 'column',
              padding: '2rem 2rem',
              boxShadow: '-4px 0 40px rgba(0,0,0,0.08)',
            }}>
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem',
                fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A',
              }}>HB</span>
              <button onClick={() => setMenuOpen(false)} style={{
                background: 'none', border: '1px solid #DDDDDD',
                width: 36, height: 36, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', color: '#0A0A0A',
              }}>✕</button>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onClick={() => scrollTo(link)}
                  style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem',
                    fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase',
                    background: 'none', border: 'none',
                    borderBottom: '1px solid #F0F0F0',
                    color: active === link ? '#0A0A0A' : '#888',
                    padding: '1.1rem 0',
                    textAlign: 'left',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                  {link}
                  <span style={{ fontSize: '0.7rem', color: '#CCCCCC' }}>→</span>
                </motion.button>
              ))}
            </div>

            {/* Bottom CTA */}
            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #F0F0F0' }}>
              <button
                onClick={() => scrollTo('contact')}
                style={{
                  width: '100%', padding: '0.9rem',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem',
                  fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase',
                  background: '#0A0A0A', color: '#fff', border: 'none',
                }}>BOOK CONSULTATION</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
              zIndex: 1999,
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 1.2rem 1.6rem !important; }
          .nav-links, .book-btn { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
