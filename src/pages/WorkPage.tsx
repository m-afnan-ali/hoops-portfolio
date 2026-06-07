import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { eventsData } from '../data/eventsData'

export default function WorkPage() {
  return (
    <section className="min-h-screen py-12 sm:py-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-neon/40" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-neon/80 uppercase">
              Portfolio
            </span>
          </div>

          <h1 className="font-marker text-5xl sm:text-6xl md:text-7xl text-white mb-4">
            MY WORK
          </h1>

          <p className="font-mono text-sm sm:text-base text-white/40 max-w-lg">
            Every event tells a story. Here's the complete archive.
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {eventsData.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link
                to={`/work/${event.id}`}
                className="group block relative overflow-hidden rounded-sm chalk-border aura-glow"
              >
                <div className="aspect-[4/3] overflow-hidden grain-overlay">
                  <img
                    src={event.photos[event.coverIndex]?.src ?? event.photos[0].src}
                    alt={event.title}
                    loading="lazy"
                    className="photo-filter w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h2 className="font-marker text-2xl sm:text-3xl text-white mb-1.5 group-hover:text-neon transition-colors duration-300">
                    {event.title}
                  </h2>

                  <p className="font-mono text-[11px] text-white/30 italic mb-3 line-clamp-1">
                    {event.subtitle}
                  </p>

                  <div className="flex items-center gap-4 font-mono text-[10px] text-white/25">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50">
                  <div className="bg-neon/90 rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_20px_rgba(255,87,51,0.4)]">
                    <ArrowRight size={18} className="text-coal" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
