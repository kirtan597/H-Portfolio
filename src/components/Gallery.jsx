import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryCard, ComboCard } from './GalleryCard'
import Lightbox from './Lightbox'
import useScrollReveal from '../hooks/useScrollReveal'

const categories = ['ALL', 'PAINTINGS', 'BRIDAL', 'SAREE', 'PARTY WEAR', 'DESIGNER', 'CASUAL', 'SIGNATURE']

// Regular single items
const singleItems = [
  { id: 1, src: '/Assest/Paintings/1000285385.jpg.jpeg', name: 'Fashion Painting I',  category: 'PAINTINGS' },
  { id: 2, src: '/Assest/Paintings/1000285386.jpg.jpeg', name: 'Fashion Painting II', category: 'PAINTINGS' },
]

// Combo dual-slide items: embroidery work + the design on dress
const comboItems = []

const allItems = [...singleItems, ...comboItems]

export default function Gallery() {
  const [active, setActive] = useState('ALL')
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [lightboxItems, setLightboxItems] = useState([])
  const { ref, controls } = useScrollReveal()

  const filtered = active === 'ALL'
    ? allItems
    : allItems.filter(i => i.category === active)

  const openLightbox = (item) => {
    const flatItems = filtered.map(i => ({ src: i.src, name: i.name }))
    const idx = filtered.findIndex(i => i.id === item.id)
    setLightboxItems(flatItems)
    setLightboxIdx(idx)
  }

  const navigate = (dir) => {
    setLightboxIdx(prev => (prev + dir + lightboxItems.length) % lightboxItems.length)
  }

  return (
    <section id="gallery" style={{ background: '#fff', padding: '8rem 4rem' }}>

      {/* Section marker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
          fontWeight: 400, letterSpacing: '0.18em',
          background: '#0A0A0A', color: '#fff', padding: '0.35rem 0.7rem',
        }}>03</span>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
          fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', letterSpacing: '0.08em',
        }}>Collection</span>
        <span style={{ flex: 1, height: '1px', background: '#DDDDDD' }} />
      </div>

      {/* Heading */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(4rem, 8vw, 8rem)',
            fontWeight: 300, color: '#0A0A0A', lineHeight: 0.88, letterSpacing: '-0.03em',
          }}>The</span>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(4rem, 8vw, 8rem)',
            fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', lineHeight: 0.88,
            letterSpacing: '-0.03em', marginLeft: 'clamp(2rem, 6vw, 6rem)',
          }}>Work</span>
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
          fontWeight: 300, color: '#888', marginTop: '1.5rem', letterSpacing: '0.02em',
        }}>A curated showcase of couture, craftsmanship, and character.</p>
      </div>

      {/* Filter */}
      <div className="gallery-filter" style={{
        display: 'flex', gap: '2rem', flexWrap: 'wrap',
        marginBottom: '3rem', borderBottom: '1px solid #EBEBEB', paddingBottom: '1.5rem',
      }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)} style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
            fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase',
            background: 'none', border: 'none',
            color: active === cat ? '#0A0A0A' : '#888',
            borderBottom: active === cat ? '1px solid #C9A96E' : '1px solid transparent',
            paddingBottom: '2px', transition: 'all 0.3s',
          }}>{cat}</button>
        ))}
      </div>

      {/* Combo legend */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        marginBottom: '2rem',
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
        fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888',
      }}>
        <span style={{ background: '#0A0A0A', color: '#fff', padding: '0.2rem 0.5rem' }}>Embroidery</span>
        <span>/</span>
        <span style={{ background: '#F0F0F0', color: '#0A0A0A', padding: '0.2rem 0.5rem', border: '1px solid #DDDDDD' }}>Dress</span>
        <span>— toggle inside combo cards</span>
      </div>

      {/* Fixed uniform grid */}
      <motion.div ref={ref} initial="hidden" animate={controls}
        className="gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div key={item.id}
              layout
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {item.isCombo
                ? <ComboCard item={item} onClick={openLightbox} />
                : <GalleryCard item={item} onClick={openLightbox} />
              }
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onNav={navigate}
      />

      <style>{`
        @media (max-width: 1024px) {
          #gallery { padding: 6rem 2rem !important; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #gallery { padding: 5rem 1.6rem !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-filter { gap: 1rem !important; }
        }
      `}</style>
    </section>
  )
}
