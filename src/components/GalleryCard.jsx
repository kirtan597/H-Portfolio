import { useState } from 'react'
import { motion } from 'framer-motion'

// Single image card — fixed frame, hover reveals overlay
export function GalleryCard({ item, onClick }) {
  const isPainting = item.category === 'PAINTINGS'
  return (
    <motion.div
      onClick={() => onClick(item)}
      whileHover="hover"
      data-gallery-card="true"
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid #EBEBEB', cursor: 'none',
        width: '100%',
        aspectRatio: isPainting ? '1 / 1' : '3 / 4',
        background: '#F7F7F7',
      }}
    >
      <motion.img
        src={item.src}
        alt={item.name}
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          width: '100%', height: '100%',
          objectFit: isPainting ? 'contain' : 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
        variants={{ hover: { scale: 1.04 } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Overlay */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,10,10,0.58)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem',
          fontStyle: 'italic', fontWeight: 300, color: '#fff',
          textAlign: 'center', padding: '0 1.2rem',
        }}>{item.name}</div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem',
          fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#C9A96E',
        }}>{item.category}</div>
      </motion.div>
    </motion.div>
  )
}

// Dual image card — hover slides second image up from bottom
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
        width: '100%', aspectRatio: '3 / 4', background: '#F7F7F7',
      }}
    >
      {/* Bottom image — dress/costume (slides up on hover) */}
      <img
        src={item.srcDress}
        alt={item.nameDress}
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          display: 'block',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 2,
        }}
      />

      {/* Top image — embroidery work (always visible) */}
      <img
        src={item.src}
        alt={item.name}
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          display: 'block',
          zIndex: 1,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Label at bottom — shows which view */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 3,
        padding: '2rem 1rem 0.9rem',
        background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        transition: 'opacity 0.3s',
      }}>
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
            fontStyle: 'italic', fontWeight: 300, color: '#fff',
          }}>{hovered ? item.nameDress : item.name}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem',
            fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#C9A96E', marginTop: '0.2rem',
          }}>{item.category}</div>
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.52rem',
          fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}>
          {hovered ? 'Dress ↑' : 'Hover ↑'}
        </div>
      </div>
    </div>
  )
}

export default GalleryCard
