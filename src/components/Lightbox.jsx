import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────
   Standard single-image lightbox (with nav arrows)
────────────────────────────────────────────── */
export default function Lightbox({ items, index, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  onNav(1)
      if (e.key === 'ArrowLeft')   onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNav])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [index])

  const item = items[index]

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.98)',
            zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            className="lightbox-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 0,
              maxWidth: '95vw',
              width: '100%',
              maxHeight: '92vh',
              background: '#fff',
              border: '1px solid #EBEBEB',
              overflow: 'hidden',
            }}
          >
            {/* Image side */}
            <div className="lightbox-image" style={{
              flex: '0 0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#F7F7F7',
              padding: '1.5rem',
              minHeight: '45vh',
              maxHeight: '50vh',
            }}>
              <img src={item.src} alt={item.name}
                loading="lazy"
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain', 
                  display: 'block',
                  willChange: 'transform',
                }} />
            </div>

            {/* Content panel */}
            {item.description && (
              <div className="lightbox-text" style={{
                flex: '1 1 auto',
                display: 'flex', flexDirection: 'column',
                padding: '1.5rem',
                borderTop: '1px solid #EBEBEB',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}>
                {/* Category tag */}
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.5rem',
                  fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#C9A96E', marginBottom: '0.8rem',
                }}>COLLECTION</div>

                {/* Title */}
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
                  fontStyle: 'italic', fontWeight: 300, color: '#0A0A0A',
                  lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem',
                }}>{item.name}</div>

                {/* Divider */}
                <div style={{ width: 35, height: 1, background: '#C9A96E', marginBottom: '1rem' }} />

                {/* Description paragraphs */}
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem',
                  fontWeight: 300, color: '#555', lineHeight: 1.7,
                }}>
                  {item.description.split('\n\n').map((para, i) => (
                    <p key={i} style={{ margin: i > 0 ? '0.8rem 0 0' : 0 }}>{para}</p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <button onClick={onClose} className="lightbox-close" style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: '#fff', border: '1px solid #EBEBEB', 
            color: '#0A0A0A', fontSize: '1.1rem',
            width: 38, height: 38,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 5001,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>✕</button>

          <style>{`
            @media (min-width: 769px) {
              .lightbox-content {
                flex-direction: row !important;
                max-width: 1020px !important;
              }
              .lightbox-image {
                flex: 0 0 58% !important;
                min-height: 0 !important;
                max-height: 88vh !important;
                padding: 2rem !important;
              }
              .lightbox-text {
                flex: 0 0 42% !important;
                border-top: none !important;
                border-left: 1px solid #EBEBEB !important;
                padding: 3rem 2.5rem !important;
              }
              .lightbox-close {
                top: 1.5rem !important;
                right: 1.5rem !important;
                width: 40px !important;
                height: 40px !important;
                font-size: 1.2rem !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────
   Combo lightbox — shows BOTH images together, no arrows
   duo = { title, src1, label1, src2, label2 }
────────────────────────────────────────────── */
export function ComboLightbox({ duo, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (duo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [duo])

  return (
    <AnimatePresence>
      {duo && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.98)',
            zIndex: 5000, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start',
            padding: '1rem',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Title */}
          <motion.div
            initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{ marginBottom: '1.2rem', textAlign: 'center', paddingTop: '2.5rem' }}
          >
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              fontStyle: 'italic', fontWeight: 300, color: '#0A0A0A',
            }}>{duo.title}</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.52rem',
              fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#C9A96E', marginTop: '0.4rem',
            }}>HANDCRAFTED COLLECTION</div>
          </motion.div>

          {/* Two images side by side */}
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            onClick={e => e.stopPropagation()}
            className="combo-lb-row"
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '1000px',
            }}
          >
            {[
              { src: duo.src1, label: duo.label1 },
              { src: duo.src2, label: duo.label2 },
            ].map((img, i) => (
              <div key={i} style={{
                flex: '1 1 0',
                minWidth: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
              }}>
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  style={{
                    width: '100%',
                    maxHeight: '45vh',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    background: '#F7F7F7',
                    border: '1px solid #EBEBEB',
                    willChange: 'transform',
                  }}
                />
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.52rem',
                  fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#C9A96E', textAlign: 'center',
                }}>{img.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Description panel — shown only when duo.description exists */}
          {duo.description && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '700px',
                marginTop: '0.8rem',
                borderTop: '1px solid #EBEBEB',
                paddingTop: '1rem',
                textAlign: 'center',
              }}
            >
              <div style={{ width: 35, height: 1, background: '#C9A96E', margin: '0 auto 1rem' }} />
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem',
                fontWeight: 300, color: '#555', lineHeight: 1.7,
              }}>
                {duo.description.split('\n\n').map((para, i) => (
                  <p key={i} style={{ margin: i > 0 ? '0.8rem 0 0' : 0 }}>{para}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Close — no arrows */}
          <button onClick={onClose} style={{
            position: 'fixed', top: '1rem', right: '1rem',
            background: '#fff', border: '1px solid #EBEBEB',
            color: '#0A0A0A', fontSize: '1.1rem',
            width: 38, height: 38,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 6000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>✕</button>

          <style>{`
            @media (min-width: 769px) {
              .combo-lb-row { 
                gap: 1.5rem !important;
              }
              .combo-lb-row img {
                max-height: 60vh !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
