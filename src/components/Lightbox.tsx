import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { EventPhoto } from '../data/eventsData'

interface LightboxProps {
  photos: EventPhoto[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ photos, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const photo = photos[currentIndex]

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % photos.length)
  }, [currentIndex, photos.length, onNavigate])

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + photos.length) % photos.length)
  }, [currentIndex, photos.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center lightbox-backdrop bg-coal/90"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 text-white/50 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
            <p className="font-mono text-xs tracking-[0.2em] text-white/40">
              {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 text-white/30 hover:text-white transition-colors p-3 rounded-full hover:bg-white/5"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image */}
          <motion.img
            key={photo.src}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            src={photo.src}
            alt={photo.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded shadow-2xl"
          />

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 text-white/30 hover:text-white transition-colors p-3 rounded-full hover:bg-white/5"
          >
            <ChevronRight size={28} />
          </button>

          {/* Bottom hint */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">
              ESC to close &middot; Arrow keys to navigate
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
