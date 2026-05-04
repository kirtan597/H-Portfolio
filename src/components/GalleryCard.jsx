import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Single image card — fills parent aspect-ratio container fully
export function GalleryCard({ item, onClick, isPainting }) {
  return (
    <motion.div
      onClick={() => onClick(item)}
      whileHover="hover"
      data-gallery-card="true"
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid #EBEBEB', cursor: 'none',
        width: '100%', height: '100%', background: '#F7F7F7',
      }}
    >
      <motion.img
        src={item.src}
        alt={item.name}
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          width: '100%', height: '100%', display: 'block',
          objectFit: isPainting ? 'contain' : 'cover',
          objectPosition: 'center',
          background: isPainting ? '#F7F7F7' : 'transparent',
        }}
        variants={{ hover: { scale: isPainting ? 1.02 : 1.05 } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Overlay */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,10,10,0.55)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
        }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
          fontStyle: 'italic', fontWeight: 300, color: '#fff',
          textAlign: 'center', padding: '0 1.2rem',
        }}>{item.name}</div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.56rem',
          fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#C9A96E',
        }}>{item.category}</div>
      </motion.div>
    </motion.div>
  )
}

// Dual image card — second image slides up from bottom on hover
export function ComboCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item)}
      data-gallery-card="true"
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid #EBEBEB', cursor: 'none',
        width: '100%', height: '100%', background: '#F7F7F7',
      }}
    >
      {/* Dress image — slides up on hover */}
      <img
        src={item.srcDress}
        alt={item.nameDress}
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block', zIndex: 2,
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Embroidery image — always visible base */}
      <img
        src={item.src}
        alt={item.name}
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block', zIndex: 1,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Bottom gradient label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
        padding: '2.5rem 1rem 0.9rem',
        background: 'linear-gradient(to top, rgba(10,10,10,0.72) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
            fontStyle: 'italic', fontWeight: 300, color: '#fff',
            transition: 'opacity 0.3s',
          }}>{hovered ? item.nameDress : item.name}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem',
            fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#C9A96E', marginTop: '0.2rem',
          }}>{item.category}</div>
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.5rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}>{hovered ? 'Dress ↑' : 'Hover ↑'}</div>
      </div>
    </div>
  )
}

export default GalleryCard
