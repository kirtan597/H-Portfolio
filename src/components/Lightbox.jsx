import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ items, index, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
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
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
            zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{ textAlign: 'center', maxWidth: '90vw' }}>
            <img src={item.src} alt={item.name}
              style={{ maxHeight: '85vh', maxWidth: '100%', objectFit: 'contain' }} />
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem',
              fontStyle: 'italic', fontWeight: 300, color: '#fff', marginTop: '1.2rem',
            }}>{item.name}</div>
          </motion.div>

          {/* Arrows */}
          {[[-1, '←', { left: '2rem' }], [1, '→', { right: '2rem' }]].map(([dir, arrow, pos]) => (
            <button key={dir}
              onClick={e => { e.stopPropagation(); onNav(dir) }}
              style={{
                position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                ...pos, background: 'none', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', fontSize: '1.2rem', padding: '0.8rem 1.2rem',
                transition: 'border-color 0.3s',
              }}>{arrow}</button>
          ))}

          <button onClick={onClose} style={{
            position: 'absolute', top: '2rem', right: '2rem',
            background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem',
          }}>✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
