import { useMotionValue, motion, useMotionTemplate } from 'framer-motion'
import { useState } from 'react'

const dotPattern = (color) => ({
  backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
  backgroundSize: '16px 16px',
})

export default function HeroHighlight({ mouseX, mouseY, hovered }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* Base static dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.4,
        ...dotPattern('rgb(200 200 200)'),
      }} />

      {/* Mouse-follow reveal */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          ...dotPattern('rgb(130 130 130)'),
          WebkitMaskImage: useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      />
    </div>
  )
}
