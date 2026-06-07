import { useState, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { eventsData } from '../data/eventsData'
import PhotoCard from '../components/PhotoCard'
import Lightbox from '../components/Lightbox'

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const event = eventsData.find((e) => e.id === eventId)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  if (!event) return <Navigate to="/work" replace />

  const currentIndex = eventsData.findIndex((e) => e.id === eventId)
  const nextEvent = eventsData[(currentIndex + 1) % eventsData.length]
  const prevEvent = eventsData[(currentIndex - 1 + eventsData.length) % eventsData.length]

  return (
    <section className="min-h-screen">
      {/* Hero banner with cover image */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          src={event.photos[event.coverIndex]?.src ?? event.photos[0].src}
          alt={event.title}
          className="w-full h-full object-cover photo-filter"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/40 via-coal/60 to-coal" />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute top-4 left-4 sm:top-8 sm:left-8"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-white/60 hover:text-neon transition-colors uppercase group bg-coal/40 backdrop-blur-sm px-4 py-2.5 rounded-full"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            All Events
          </Link>
        </motion.div>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-16 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="font-marker text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-3">
                {event.title}
              </h1>

              <p className="font-mono text-sm sm:text-base text-white/40 italic mb-5 max-w-lg">
                {event.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-5 sm:gap-8 font-mono text-xs text-white/35">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-neon/50" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-neon/50" />
                  {event.location}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 auto-rows-[180px] sm:auto-rows-[260px] lg:auto-rows-[300px]">
            {event.photos.map((photo, i) => {
              let spanClass = ''
              const pattern = i % 8
              if (pattern === 0) spanClass = 'col-span-2 row-span-2'
              else if (pattern === 3) spanClass = 'row-span-2'
              else if (pattern === 5) spanClass = 'col-span-2'
              else if (pattern === 7) spanClass = 'row-span-2'

              return (
                <div key={photo.src} className={spanClass}>
                  <PhotoCard
                    photo={photo}
                    index={i}
                    onClick={() => openLightbox(i)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Previous / Next navigation */}
      <div className="px-4 sm:px-8 lg:px-16 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="section-line mb-10" />

          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4">
            <Link
              to={`/work/${prevEvent.id}`}
              className="group flex-1 flex items-center gap-4 p-5 sm:p-6 rounded-sm glass-card hover:border-neon/20 transition-all duration-300"
            >
              <ArrowLeft size={18} className="text-white/30 group-hover:text-neon transition-colors shrink-0 group-hover:-translate-x-1 transform duration-300" />
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] text-white/25 uppercase mb-1">Previous</p>
                <p className="font-marker text-lg sm:text-xl text-white/60 group-hover:text-white transition-colors">{prevEvent.title}</p>
              </div>
            </Link>

            <Link
              to={`/work/${nextEvent.id}`}
              className="group flex-1 flex items-center justify-end gap-4 p-5 sm:p-6 rounded-sm glass-card hover:border-neon/20 transition-all duration-300 text-right"
            >
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] text-white/25 uppercase mb-1">Next</p>
                <p className="font-marker text-lg sm:text-xl text-white/60 group-hover:text-white transition-colors">{nextEvent.title}</p>
              </div>
              <ArrowRight size={18} className="text-white/30 group-hover:text-neon transition-colors shrink-0 group-hover:translate-x-1 transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        photos={event.photos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}
