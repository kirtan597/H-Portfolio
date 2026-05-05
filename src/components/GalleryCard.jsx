import { useState } from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   Single image card — hover overlay, click opens lightbox
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
      }}
    >
      <motion.img
        src={item.src}
        alt={item.name}
        onError={e => { e.currentTarget.style.opacity = '0' }}
        style={{
          width: '100%', height: '100%',
          objectFit: isSquareFrame ? 'contain' : 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
        variants={{ hover: { scale: 1.04 } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Hover overlay */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
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
   Combo card — manual ← → arrows on hover, click opens lightbox
   No auto-slide. 1:1 square, object-fit:contain (nothing cut)
───────────────────────────────────────────── */
export function ComboCard({ item, onClick }) {
  const [slide,   setSlide]   = useState(0)   // 0 = embroidery, 1 = dress
  const [hovered, setHovered] = useState(false)

  const imgs = [
    { src: item.src,      label: 'Embroidery Work' },
    { src: item.srcDress, label: 'On Dress'        },
  ]

  const toggle = (e) => {
    e.stopPropagation()
    setSlide(s => s === 0 ? 1 : 0)
  }

  return (
    <div
      data-gallery-card="true"
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid #EBEBEB', cursor: 'none',
        width: '100%', aspectRatio: '1 / 1',
        background: '#F7F7F7',
        boxSizing: 'border-box',
      }}
    >
      {/* Crossfade images */}
      {imgs.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.label}
          onError={e => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center',
            background: '#F7F7F7', display: 'block',
            opacity: i === slide ? 1 : 0,
            transform: i === slide ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            zIndex: i === slide ? 1 : 0,
          }}
        />
      ))}

      {/* ── Hover overlay with arrows ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: hovered ? 'auto' : 'none',
      }}>
        {/* Dark tint */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,10,10,0.52)',
        }} />

        {/* Left arrow */}
        <button
          onClick={toggle}
          style={{
            position: 'absolute', left: '0.75rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#fff', width: 36, height: 36, borderRadius: '50%',
            fontSize: '1rem', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'none',
            transition: 'background 0.2s',
            zIndex: 5,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        >←</button>

        {/* Right arrow */}
        <button
          onClick={toggle}
          style={{
            position: 'absolute', right: '0.75rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#fff', width: 36, height: 36, borderRadius: '50%',
            fontSize: '1rem', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'none',
            transition: 'background 0.2s',
            zIndex: 5,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        >→</button>

        {/* Center label */}
        <div style={{
          position: 'absolute', bottom: '1rem', left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.3rem',
          zIndex: 5,
        }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem',
            fontStyle: 'italic', fontWeight: 300, color: '#fff',
            textAlign: 'center', padding: '0 3rem',
          }}>{item.displayName || item.name}</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.52rem',
            fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C9A96E',
          }}>{imgs[slide].label}</div>

          {/* Slide dots */}
          <div style={{ display: 'flex', gap: '5px', marginTop: '0.25rem' }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                width: i === slide ? 18 : 6, height: 5, borderRadius: 3,
                background: i === slide ? '#C9A96E' : 'rgba(255,255,255,0.4)',
                transition: 'width 0.3s ease',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — visible when NOT hovered */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        padding: '2.2rem 0.9rem 0.75rem',
        background: 'linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        opacity: hovered ? 0 : 1,
        transition: 'opacity 0.3s ease',
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
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: i === slide ? 16 : 5, height: 5, borderRadius: 3,
              background: i === slide ? '#C9A96E' : 'rgba(255,255,255,0.35)',
              transition: 'width 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryCard
