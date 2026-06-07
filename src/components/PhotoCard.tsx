import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { EventPhoto } from '../data/eventsData'

interface PhotoCardProps {
  photo: EventPhoto
  index: number
  onClick?: () => void
  showOverlay?: boolean
  overlayText?: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      delay: i * 0.05,
    },
  }),
}

export default function PhotoCard({ photo, index, onClick, showOverlay, overlayText }: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback(() => setLoaded(true), [])

  return (
    <motion.div
      className="photo-card chalk-border aura-glow rounded-sm overflow-hidden h-full group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index % 6}
      onClick={onClick}
      style={onClick ? { cursor: 'none' } : undefined}
    >
      <div className="grain-overlay h-full relative">
        {/* Shimmer loading placeholder */}
        {!loaded && (
          <div className="absolute inset-0 img-loading" />
        )}

        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          onLoad={handleLoad}
          className={`photo-filter w-full h-full object-cover block transition-all duration-700 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover overlay */}
        {onClick && (
          <div className="absolute inset-0 bg-coal/0 group-hover:bg-coal/30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-coal/60 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
              </svg>
            </div>
          </div>
        )}

        {/* Optional event label overlay */}
        {showOverlay && overlayText && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-coal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase">
              {overlayText}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
