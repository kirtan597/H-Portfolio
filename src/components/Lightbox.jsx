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

  const item = items[index]

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.98)',
            zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            className="lightbox-content"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: 0,
              maxWidth: item.description ? '1020px' : '90vw',
              width: '100%',
              maxHeight: '88vh',
              background: '#fff',
              border: '1px solid #EBEBEB',
              overflow: 'hidden',
            }}
          >
            {/* Image side */}
            <div className="lightbox-image" style={{
              flex: item.description ? '0 0 58%' : '1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#F7F7F7',
              padding: '2rem',
              minHeight: 0,
            }}>
              <img src={item.src} alt={item.name}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
            </div>

            {/* Content panel — only when description exists */}
            {item.description && (
              <div className="lightbox-text" style={{
                flex: '0 0 42%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '3rem 2.5rem',
                borderLeft: '1px solid #EBEBEB',
                overflowY: 'auto',
              }}>
                {/* Category tag */}
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem',
                  fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#C9A96E', marginBottom: '1rem',
                }}>COLLECTION</div>

                {/* Title */}
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 3vw, 2.6rem)',
                  fontStyle: 'italic', fontWeight: 300, color: '#0A0A0A',
                  lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem',
                }}>{item.name}</div>

                {/* Divider */}
                <div style={{ width: 40, height: 1, background: '#C9A96E', marginBottom: '1.5rem' }} />

                {/* Description paragraphs */}
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem',
                  fontWeight: 300, color: '#555', lineHeight: 1.8,
                }}>
                  {item.description.split('\n\n').map((para, i) => (
                    <p key={i} style={{ margin: i > 0 ? '1rem 0 0' : 0 }}>{para}</p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <button onClick={onClose} className="lightbox-close" style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: '#fff', border: '1px solid #EBEBEB', 
            color: '#0A0A0A', fontSize: '1.2rem',
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 5001,
          }}>✕</button>

          <style>{`
            @media (max-width: 768px) {
              .lightbox-content {
                flex-direction: column !important;
                max-height: 95vh !important;
                overflow-y: auto !important;
              }
              .lightbox-image {
                flex: 0 0 auto !important;
                min-height: 40vh !important;
                max-height: 50vh !important;
                padding: 1.5rem !important;
              }
              .lightbox-text {
                flex: 1 !important;
                border-left: none !important;
                border-top: 1px solid #EBEBEB !important;
                padding: 2rem 1.5rem !important;
              }
              .lightbox-close {
                top: 1rem !important;
                right: 1rem !important;
                width: 36px !important;
                height: 36px !important;
                font-size: 1rem !important;
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

  return (
    <AnimatePresence>
      {duo && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.98)',
            zIndex: 5000, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start',
            padding: '2rem 1rem',
            overflowY: 'auto',
          }}
        >
          {/* Title */}
          <motion.div
            initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{ marginBottom: '1.8rem', textAlign: 'center', paddingTop: '2rem' }}
          >
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
              fontStyle: 'italic', fontWeight: 300, color: '#0A0A0A',
            }}>{duo.title}</div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem',
              fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#C9A96E', marginTop: '0.4rem',
            }}>HANDCRAFTED COLLECTION</div>
          </motion.div>

          {/* Two images side by side */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            onClick={e => e.stopPropagation()}
            className="combo-lb-row"
            style={{
              display: 'flex',
              gap: '1.5rem',
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
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
              }}>
                <img
                  src={img.src}
                  alt={img.label}
                  style={{
                    width: '100%',
                    maxHeight: '60vh',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    background: '#F7F7F7',
                    border: '1px solid #EBEBEB',
                  }}
                />
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem',
                  fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#C9A96E', textAlign: 'center',
                }}>{img.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Description panel — shown only when duo.description exists */}
          {duo.description && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '700px',
                marginTop: '0.8rem',
                borderTop: '1px solid #EBEBEB',
                paddingTop: '1.2rem',
                textAlign: 'center',
              }}
            >
              <div style={{ width: 40, height: 1, background: '#C9A96E', margin: '0 auto 1.2rem' }} />
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem',
                fontWeight: 300, color: '#555', lineHeight: 1.85,
              }}>
                {duo.description.split('\n\n').map((para, i) => (
                  <p key={i} style={{ margin: i > 0 ? '0.9rem 0 0' : 0 }}>{para}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Close — no arrows */}
          <button onClick={onClose} style={{
            position: 'fixed', top: '1.5rem', right: '1.5rem',
            background: '#fff', border: '1px solid #EBEBEB',
            color: '#0A0A0A', fontSize: '1.2rem',
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 6000,
          }}>✕</button>

          <style>{`
            @media (max-width: 768px) {
              .combo-lb-row { 
                flex-direction: column !important; 
                gap: 1.2rem !important;
              }
              .combo-lb-row img {
                max-height: 50vh !important;
              }
            }
            @media (max-width: 480px) {
              .combo-lb-row { 
                gap: 1rem !important;
              }
              .combo-lb-row img {
                max-height: 40vh !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
