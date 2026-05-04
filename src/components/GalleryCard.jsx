import { motion } from 'framer-motion'

export default function GalleryCard({ item, onClick }) {
  return (
    <motion.div
      onClick={() => onClick(item)}
      style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid #EBEBEB',
        cursor: 'none',
        gridRow: item.tall ? 'span 2' : 'span 1',
      }}
      whileHover="hover"
    >
      <motion.img
        src={item.src}
        alt={item.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)', display: 'block', minHeight: item.tall ? 500 : 300 }}
        variants={{ hover: { scale: 1.06, filter: 'grayscale(0%)' } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Overlay */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
        <motion.div
          variants={{ hover: { y: 0, opacity: 1 } }}
          initial={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem',
            fontStyle: 'italic', fontWeight: 300, color: '#fff',
            textAlign: 'center', padding: '0 1rem',
          }}>{item.name}</motion.div>
        <div style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.8rem' }}>→</div>
      </motion.div>

      {/* Category tag */}
      <motion.div
        variants={{ hover: { y: 0, opacity: 1 } }}
        initial={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', bottom: '1rem', left: '1rem',
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem',
          fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#C9A96E',
        }}>{item.category}</motion.div>
    </motion.div>
  )
}
