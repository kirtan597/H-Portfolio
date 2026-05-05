import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryCard, ComboCard } from './GalleryCard'
import Lightbox, { ComboLightbox } from './Lightbox'
import useScrollReveal from '../hooks/useScrollReveal'

const categories = ['ALL', 'SIGNATURE MASTERPIECES', 'PAINTINGS', 'WALL DECOR', 'HANDCRAFTED']

// Regular single items
const singleItems = [
  { id: 15, src: '/Assest/Signature Masterpieces/1000280627.jpg.jpeg', name: 'Signature Masterpiece I', category: 'SIGNATURE MASTERPIECES',
    displayName: 'Reflections of Kutchh',
    description: `A vibrant celebration of Gujarati craftsmanship, this ensemble features hand-crafted embroidery inspired by traditional Rabari and Ahir folk art. The design showcases an intricate arrangement of 'Abhala' (mirror-work) and colorful thread-work, highlighting a rhythmic flow of peacock and floral motifs.\n\nDesigned with a focus on heritage storytelling, the piece balances bold ethnic patterns with a modern silhouette.` },
  { id: 16, src: '/Assest/Signature Masterpieces/1000280629.jpg.jpeg', name: 'Signature Masterpiece II', category: 'SIGNATURE MASTERPIECES',
    displayName: 'Floral Kashida Shawl',
    description: `A refined execution of traditional Kashida embroidery, this shawl features hand-crafted floral motifs intertwined with delicate vine scrolls. Utilizing vibrant silk threads in fuchsia and moss green, the design highlights the fluid beauty of Aari-work against a classic cream base.\n\nThis piece serves as a tribute to heritage craftsmanship, balancing intricate needlework with the timeless elegance of Kashmiri textile art.` },
  { id: 1, src: '/Assest/Paintings/1000285385.jpg.jpeg', name: 'Fashion Painting I', category: 'PAINTINGS',
    displayName: 'Duality of Women',
    description: `This portrait is a visual exploration of the multifaceted nature of the female spirit. By blending intricate mosaic textures with traditional African-inspired motifs, the piece captures the delicate balance between contrasting elements — tradition and modernity, stillness and strength.\n\nThe bisected composition, highlighted by a bold shift from cool azure to warm gold, serves as a powerful metaphor for the internal harmony found within diversity.` },
  { id: 2, src: '/Assest/Paintings/1000285386.jpg.jpeg',       name: 'Fashion Painting II',  category: 'PAINTINGS',
    displayName: 'Inner Mosaic',
    description: `This dot art portrait reflects the complexity of identity and emotion through vibrant colors and intricate patterns. The calm blue face contrasts with the dynamic mosaic, symbolizing the balance between outer stillness and inner creativity.\n\nEach dot is carefully placed, representing patience and the evolving nature of self-expression.` },
  { id: 3, src: '/Assest/Wall Decor/1000285384.jpg.jpeg', name: 'Wall Decor I', category: 'WALL DECOR',
    displayName: 'Floral Atelier Machine',
    description: `A refined embroidery piece that transforms the classic sewing machine into a statement of artistry and craftsmanship. Set on a bold black base, delicate floral motifs are hand-embroidered with precision, creating a rich contrast and elegant texture.\n\nThis design reflects a seamless blend of tradition and modern creativity, highlighting fine detailing and a passion for handcrafted textile art.` },
  { id: 4, src: '/Assest/Wall Decor/1000285392.jpg.jpeg', name: 'Wall Decor II', category: 'WALL DECOR',
    displayName: 'Heritage Harmony Frame',
    description: `A richly detailed embroidery composition inspired by traditional motifs and symmetrical storytelling. Set on a soft neutral base, the design features intricately stitched birds and geometric patterns framed within ornamental borders, creating a balanced and rhythmic visual flow.\n\nThe vibrant color palette enhances the depth and liveliness of each element, while fine threadwork reflects precision and cultural craftsmanship.` },
  { id: 5, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 1',
    displayName: 'Floral Medallion Grace',
    description: `A refined embroidery composition centered around a bold floral medallion, delicately placed on a soft neutral base. The design features symmetrical blossoms and curling vine motifs enclosed within a circular frame, creating a sense of completeness and elegance.`,
    src: '/Assest/Stichcraft Collection/1.1.jpeg', srcDress: '/Assest/Stichcraft Collection/1.2.png' },
  { id: 6, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 2',
    displayName: 'Handcrafted Mirror Work Potli Bag',
    description: `This handcrafted mirror work potli bag features vibrant multicolour embroidery on a royal blue cotton base, inspired by traditional Gujarati and Rajasthani shisha work. The symmetrical floral design with mirror embellishments adds a festive appeal, while the drawstring with braided cords and tassels enhances its ethnic look.`,
    src: '/Assest/Stichcraft Collection/2.1.jpeg', srcDress: '/Assest/Stichcraft Collection/2.2.png' },
  { id: 7, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 3',
    displayName: 'Chromatic Bloom Mandala',
    description: `An expressive embroidery design inspired by mandala symmetry and vibrant color transitions. Set against a minimal base, the circular arrangement of intricate motifs radiates outward in a spectrum of hues, symbolizing balance and unity.`,
    src: '/Assest/Stichcraft Collection/3.1.png', srcDress: '/Assest/Stichcraft Collection/3.2.png' },
  { id: 8, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 4',
    displayName: 'Peacock Crest Elegance',
    description: `A striking embroidery composition inspired by the regal beauty of peacock forms. Positioned centrally, the design showcases layered feather motifs in deep blue tones, creating a bold yet graceful visual statement.`,
    src: '/Assest/Stichcraft Collection/4.1.jpeg', srcDress: '/Assest/Stichcraft Collection/4.2.png' },
  { id: 9, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 5',
    displayName: 'Midnight Floral Accent',
    description: `A sophisticated embroidery design featuring clustered floral motifs arranged asymmetrically for a modern appeal. The deep-toned flowers, highlighted with subtle contrasts, create a striking focal point against the muted base.`,
    src: '/Assest/Stichcraft Collection/5.1.jpeg', srcDress: '/Assest/Stichcraft Collection/5.2.png' },
  { id: 10, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 6',
    displayName: 'Urban Ethnic Mosaic',
    description: `An artistic embroidery concept inspired by mosaic patterns and urban cultural influences. The design features a radial arrangement of geometric shapes and vibrant accents, forming a cohesive and eye-catching composition.`,
    src: '/Assest/Stichcraft Collection/6.1.jpeg', srcDress: '/Assest/Stichcraft Collection/6.2.png' },
  { id: 11, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 7',
    displayName: 'Petal Geometry Charm',
    description: `A playful yet refined embroidery design featuring geometric floral elements arranged in a structured formation. The central motif is complemented by smaller accents, creating a balanced visual flow.`,
    src: '/Assest/Stichcraft Collection/7.1.jpeg', srcDress: '/Assest/Stichcraft Collection/7.2.png' },
  { id: 12, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 8',
    displayName: 'Regal Bloom Brooch',
    description: `A sophisticated embroidery-inspired brooch design that elevates formal wear with a touch of refined artistry. Crafted with intricate beadwork and metallic thread detailing, the floral motif showcases a harmonious blend of bold red accents and muted silver tones.`,
    src: '/Assest/Stichcraft Collection/8.1.jpeg', srcDress: '/Assest/Stichcraft Collection/8.2.png' },
  { id: 13, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 9',
    displayName: 'Monochrome Leaf Embellishment',
    description: `A delicately crafted embroidery piece highlighting leaf motifs in a monochrome palette. The intricate beadwork and fine stitching create texture and depth, while the organic arrangement adds a sense of natural flow. The neutral background allows the detailed craftsmanship to take center stage.`,
    src: '/Assest/Stichcraft Collection/9.1.jpeg', srcDress: '/Assest/Stichcraft Collection/9.2.png' },
  { id: 14, isCombo: true, category: 'HANDCRAFTED', name: 'Stichcraft No. 10',
    displayName: 'Geometric Heritage Star',
    description: `A balanced embroidery composition built around a central geometric star motif. Surrounded by smaller symmetrical shapes, the design creates a rhythmic pattern that reflects traditional craftsmanship.`,
    src: '/Assest/Stichcraft Collection/10.1.jpeg', srcDress: '/Assest/Stichcraft Collection/10.2.png' },
]

// Combo dual-slide items: embroidery work + the design on dress
const comboItems = []

const allItems = [...singleItems, ...comboItems]

export default function Gallery() {
  const [active, setActive] = useState('ALL')
  const [lightboxIdx, setLightboxIdx]   = useState(null)
  const [lightboxItems, setLightboxItems] = useState([])
  const [comboDuo, setComboDuo]         = useState(null)
  const { ref, controls } = useScrollReveal()

  const filtered = active === 'ALL'
    ? allItems
    : allItems.filter(i => i.category === active)

  const openLightbox = (item) => {
    if (item.isCombo) {
      // Open BOTH images together in ComboLightbox
      setComboDuo({
        title:       item.displayName || item.name,
        description: item.description || null,
        src1:   item.src,      label1: 'Embroidery Work',
        src2:   item.srcDress, label2: 'On Dress',
      })
    } else {
      // Normal single-image lightbox (only single items navigate between each other)
      const singles = filtered.filter(i => !i.isCombo)
      const flatItems = singles.map(i => ({ src: i.src, name: i.displayName || i.name, description: i.description || null }))
      const idx = singles.findIndex(i => i.id === item.id)
      setLightboxItems(flatItems)
      setLightboxIdx(idx)
    }
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
            letterSpacing: '-0.03em', marginLeft: 'clamp(1rem, 3vw, 3rem)',
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
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.96 }}
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

      <ComboLightbox
        duo={comboDuo}
        onClose={() => setComboDuo(null)}
      />

      <style>{`
        @media (max-width: 1024px) {
          #gallery { padding: 6rem 2rem !important; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.2rem !important; }
        }
        @media (max-width: 600px) {
          #gallery { padding: 5rem 1.6rem !important; }
          .gallery-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .gallery-filter { gap: 1rem !important; }
        }
        @media (max-width: 480px) {
          #gallery { padding: 4rem 1.2rem !important; }
          .gallery-grid { gap: 1.2rem !important; }
          .gallery-filter { 
            gap: 0.8rem !important; 
            padding-bottom: 1rem !important;
          }
          .gallery-filter button {
            font-size: 0.65rem !important;
            letter-spacing: 0.18em !important;
          }
        }
      `}</style>
    </section>
  )
}
