import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GalleryCard from './GalleryCard'
import Lightbox from './Lightbox'
import useScrollReveal from '../hooks/useScrollReveal'

const categories = ['ALL', 'BRIDAL', 'SAREE', 'PARTY WEAR', 'DESIGNER', 'CASUAL', 'SIGNATURE']

const items = [
  { id: 1, src: 'https://picsum.photos/seed/bridal1/600/800', name: 'Ivory Bridal Lehenga', category: 'BRIDAL', tall: true },
  { id: 2, src: 'https://picsum.photos/seed/saree2/600/450', name: 'Silk Banarasi Saree', category: 'SAREE', tall: false },
  { id: 3, src: 'https://picsum.photos/seed/party3/600/800', name: 'Midnight Gown', category: 'PARTY WEAR', tall: true },
  { id: 4, src: 'https://picsum.photos/seed/designer4/600/450', name: 'Structured Blazer Set', category: 'DESIGNER', tall: false },
  { id: 5, src: 'https://picsum.photos/seed/bridal5/600/800', name: 'Crimson Bridal Ensemble', category: 'BRIDAL', tall: false },
  { id: 6, src: 'https://picsum.photos/seed/casual6/600/450', name: 'Linen Co-ord Set', category: 'CASUAL', tall: false },
  { id: 7, src: 'https://picsum.photos/seed/signature7/600/800', name: 'The Monochrome Edit', category: 'SIGNATURE', tall: true },
  { id: 8, src: 'https://picsum.photos/seed/saree8/600/450', name: 'Chanderi Drape', category: 'SAREE', tall: false },
  { id: 9, src: 'https://picsum.photos/seed/party9/600/800', name: 'Velvet Evening Gown', category: 'PARTY WEAR', tall: false },
  { id: 10, src: 'https://picsum.photos/seed/designer10/600/450', name: 'Asymmetric Kurta', category: 'DESIGNER', tall: false },
  { id: 11, src: 'https://picsum.photos/seed/bridal11/600/800', name: 'Pearl Embroidered Lehenga', category: 'BRIDAL', tall: true },
  { id: 12, src: 'https://picsum.photos/seed/signature12/600/450', name: 'Editorial Black Drape', category: 'SIGNATURE', tall: false },
]

export default function Gallery() {
  const [active, setActive] = useState('ALL')
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const { ref, controls } = useScrollReveal()

  const filtered = active === 'ALL' ? items : items.filter(i => i.category === active)

  const openLightbox = (item) => {
    const idx = filtered.findIndex(i => i.id === item.id)
    setLightboxIdx(idx)
  }

  const navigate = (dir) => {
    setLightboxIdx(prev => (prev + dir + filtered.length) % filtered.length)
  }

  return (
    <section id="gallery" style={{ background: '#fff', padding: '6rem 1.6rem' }}>
      {/* Header */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
        fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: '#C9A96E', marginBottom: '2rem',
      }}>03 / COLLECTION</div>

      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(4rem, 8vw, 8rem)',
            fontWeight: 300, color: '#0A0A0A', lineHeight: 0.88,
            letterSpacing: '-0.03em',
          }}>The</span>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(4rem, 8vw, 8rem)',
            fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', lineHeight: 0.88,
            letterSpacing: '-0.03em',
            marginLeft: 'clamp(2rem, 6vw, 6rem)',
          }}>Work</span>
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
          fontWeight: 300, color: '#888', marginTop: '1.5rem',
          letterSpacing: '0.02em',
        }}>A curated showcase of couture, craftsmanship, and character.</p>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem', borderBottom: '1px solid #EBEBEB', paddingBottom: '1.5rem' }} className="gallery-filter">
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

      {/* Masonry Grid */}
      <motion.div ref={ref} initial="hidden" animate={controls}
        layout
        className="gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '250px',
          gap: '1.5rem',
        }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div key={item.id}
              layout
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ gridRow: item.tall ? 'span 2' : 'span 1' }}
            >
              <GalleryCard item={item} onClick={openLightbox} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        items={filtered}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onNav={navigate}
      />

      <style>{`
        #gallery { padding: 8rem 4rem; }
        @media (max-width: 1024px) {
          #gallery { padding: 6rem 2rem !important; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 220px !important; }
        }
        @media (max-width: 600px) {
          #gallery { padding: 5rem 1.6rem !important; }
          .gallery-grid { grid-template-columns: 1fr !important; grid-auto-rows: 280px !important; }
          .gallery-grid > div { grid-row: span 1 !important; }
          .gallery-filter { gap: 1rem !important; }
        }
      `}</style>
    </section>
  )
}
