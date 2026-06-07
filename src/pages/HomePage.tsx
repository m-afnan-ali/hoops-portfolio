import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react'
import { eventsData, getHighlightPhotos } from '../data/eventsData'
import PhotoCard from '../components/PhotoCard'

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-8">
      {/* Decorative side lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-neon/20 to-transparent origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-neon/20 to-transparent origin-top"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-5xl"
      >
        <h1 className="font-marker text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.95] uppercase text-white mb-8 sm:mb-10">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            RAW ENERGY.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block text-neon drop-shadow-[0_0_30px_rgba(255,87,51,0.3)]"
          >
            PERFECTLY
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            CAPTURED.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-mono text-sm sm:text-base tracking-[0.2em] text-white/40 uppercase"
        >
          Basketball Event Photography
        </motion.p>

        {/* Booking button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.15em] text-coal uppercase bg-neon hover:bg-white px-8 py-4 rounded transition-colors duration-300 group"
          >
            Book a Session
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-white/40 hover:text-neon uppercase transition-colors px-4 py-3"
          >
            View Work
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 scroll-indicator"
      >
        <a href="#highlights" className="flex flex-col items-center gap-2 text-white/30 hover:text-neon transition-colors">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <ChevronDown size={18} />
        </a>
      </motion.div>
    </section>
  )
}

function Highlights() {
  const highlights = getHighlightPhotos()

  return (
    <section id="highlights" className="py-20 sm:py-32 px-4 sm:px-8 lg:px-16">
      <div className="section-line max-w-md mx-auto mb-16 sm:mb-24" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-neon/40" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-neon/80 uppercase">
            Selected Work
          </span>
        </div>
        <h2 className="font-marker text-4xl sm:text-5xl md:text-6xl text-white mb-4">
          THE HIGHLIGHTS
        </h2>
        <p className="font-mono text-sm text-white/40 max-w-lg">
          Hand-picked frames from across all events. The moments that define the game.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 auto-rows-[200px] sm:auto-rows-[280px] lg:auto-rows-[320px]">
        {highlights.map((photo, i) => {
          let spanClass = ''
          const pattern = i % 7
          if (pattern === 0) spanClass = 'col-span-2 row-span-2'
          else if (pattern === 3) spanClass = 'row-span-2'
          else if (pattern === 5) spanClass = 'col-span-2'

          return (
            <div key={photo.src} className={spanClass}>
              <PhotoCard
                photo={photo}
                index={i}
                showOverlay
                overlayText={photo.eventTitle}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

function EventsPreview() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-8 lg:px-16">
      <div className="section-line max-w-md mx-auto mb-16 sm:mb-24" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-neon/40" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-neon/80 uppercase">
            Events Covered
          </span>
        </div>
        <h2 className="font-marker text-4xl sm:text-5xl md:text-6xl text-white mb-4">
          THE EVENTS
        </h2>
        <p className="font-mono text-sm text-white/40 max-w-lg">
          Every tournament has its own story. Here are a few of them.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {eventsData.slice(0, 6).map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="font-marker text-xl sm:text-2xl text-white mb-1 group-hover:text-neon transition-colors duration-300">
                  {event.title}
                </h3>
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-white/40">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {event.location}
                  </span>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50">
                <div className="bg-neon/90 rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_20px_rgba(255,87,51,0.4)]">
                  <ArrowRight size={18} className="text-coal" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 sm:mt-16 text-center"
      >
        <Link
          to="/work"
          className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.15em] text-coal uppercase group bg-neon hover:bg-white px-8 py-4 rounded transition-colors duration-300"
        >
          View All Events
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <EventsPreview />
    </>
  )
}
