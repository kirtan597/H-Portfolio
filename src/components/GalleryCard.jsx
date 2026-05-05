import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Detect touch device once
const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

/* ─────────────────────────────────────────────
   Single image card
───────────────────────────────────────────── */
export function GalleryCard({ item, onClick }) {
  const isSquareFrame = item.category === 'PAINTINGS' || item.category === 'WALL DECOR' || item.category === 'SIGNATURE MASTERPIECES'
  return (
    <motion.div
      onClick={() => onClick(item)}
      whileHover="hover"
      data-gallery-card="true"
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid #EBEBEB', cursor: 'none',
        width: '100%',
        aspectRatio: isSquareFrame ? '1 / 1' : '3 / 4',
        background: '#F7F7F7',
        boxSizing: 'border-box',
        contain: 'layout paint',
      }}
    >
      <motion.img
        src={item.src}
        alt={item.name}
        loading="lazy"
        decoding="async"
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          width: '100%', height: '100%',
          objectFit: isSquareFrame ? 'contain' : 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
        variants={{ hover: { scale: 1.03 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Hover overlay — desktop only */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,10,10,0.58)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        }}
      >
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem',
          fontStyle: 'italic', fontWeight: 300, color: '#fff',
          textAlign: 'center', padding: '0 1.2rem',
        }}>{item.displayName || item.name}</div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem',
          fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#C9A96E',
        }}>{item.category}</div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Combo card
   Desktop: arrows appear on hover
   Mobile:  arrows always visible, tap to switch
───────────────────────────────────────────── */
export function ComboCard({ item, onClick }) {
  const [slide,   setSlide]   = useState(0)
  const [hovered, setHovered] = useState(false)

  const imgs = [
    { src: item.src,      label: 'Embroidery Work' },
    { src: item.srcDress, label: 'On Dress'        },
  ]

  const goLeft  = (e) => { e.stopPropagation(); setSlide(0) }
  const goRight = (e) => { e.stopPropagation(); setSlide(1) }

  // On mobile arrows are always shown; on desktop only on hover
  const showArrows = isTouch || hovered

  return (
    <div
      data-gallery-card="true"
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid #EBEBEB',
        cursor: isTouch ? 'pointer' : 'none',
        width: '100%', aspectRatio: '1 / 1',
        background: '#F7F7F7',
        boxSizing: 'border-box',
        contain: 'layout paint',
      }}
    >
      {/* Images */}
      {imgs.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.label}
          loading="lazy"
          decoding="async"
          onError={e => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center',
            background: '#F7F7F7', display: 'block',
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: i === slide ? 1 : 0,
          }}
        />
      ))}

      {/* ── Desktop: dark overlay on hover ── */}
      {!isTouch && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: 'rgba(10,10,10,0.45)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }} />
      )}

      {/* ── Arrows — always on mobile, hover on desktop ── */}
      <>
        {/* Left arrow */}
        <button
          onClick={goLeft}
          style={{
            position: 'absolute', left: '0.6rem', top: '50%',
            transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: slide === 0
              ? 'rgba(10,10,10,0.18)'
              : isTouch ? 'rgba(10,10,10,0.65)' : 'rgba(255,255,255,0.15)',
            border: isTouch
              ? '1px solid rgba(255,255,255,0.5)'
              : '1px solid rgba(255,255,255,0.35)',
            color: '#fff',
            fontSize: '0.95rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 6,
            opacity: showArrows ? 1 : 0,
            transition: 'opacity 0.2s ease, background 0.2s ease',
            pointerEvents: showArrows ? 'auto' : 'none',
          }}
        >←</button>

        {/* Right arrow */}
        <button
          onClick={goRight}
          style={{
            position: 'absolute', right: '0.6rem', top: '50%',
            transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: slide === 1
              ? 'rgba(10,10,10,0.18)'
              : isTouch ? 'rgba(10,10,10,0.65)' : 'rgba(255,255,255,0.15)',
            border: isTouch
              ? '1px solid rgba(255,255,255,0.5)'
              : '1px solid rgba(255,255,255,0.35)',
            color: '#fff',
            fontSize: '0.95rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 6,
            opacity: showArrows ? 1 : 0,
            transition: 'opacity 0.2s ease, background 0.2s ease',
            pointerEvents: showArrows ? 'auto' : 'none',
          }}
        >→</button>
      </>

      {/* Bottom bar — label + dots */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        padding: '2rem 0.9rem 0.75rem',
        background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        pointerEvents: 'none',
      }}>
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem',
            fontStyle: 'italic', fontWeight: 300, color: '#fff',
          }}>{item.displayName || item.name}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.48rem',
            fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C9A96E', marginTop: '0.2rem',
          }}>{imgs[slide].label}</div>
        </div>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', paddingBottom: '2px' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: i === slide ? 16 : 5, height: 5, borderRadius: 3,
              background: i === slide ? '#C9A96E' : 'rgba(255,255,255,0.4)',
              transition: 'width 0.25s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryCard
