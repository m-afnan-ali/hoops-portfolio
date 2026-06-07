import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { label: 'Work', to: '/work' },
    { label: 'Services', to: '/#services' },
  ]

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-coal/85 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="group py-3 pr-4 flex items-center gap-3"
        >
          <span className="block w-2 h-2 rounded-full bg-neon group-hover:shadow-[0_0_12px_#FF5733] transition-shadow" />
          <div className="flex flex-col">
            <span className="font-marker text-base sm:text-lg text-white group-hover:text-neon transition-colors leading-tight tracking-wide">
              UZAIR MEHMOOD
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.35em] text-white/30 uppercase">
              Photography
            </span>
          </div>
        </Link>

        {/* Desktop nav + Book Now */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            link.to === '/#services' ? (
              <Link
                key={link.to}
                to="/"
                onClick={() => setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className={`neon-underline font-mono text-xs tracking-[0.2em] uppercase transition-colors px-4 py-3 text-white/50 hover:text-white`}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`neon-underline font-mono text-xs tracking-[0.2em] uppercase transition-colors px-4 py-3 ${
                  isActive(link.to)
                    ? 'text-neon active'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}

          <Link
            to="/contact"
            className="ml-4 font-mono text-[11px] tracking-[0.2em] uppercase text-white border border-white/20 hover:border-neon hover:text-neon px-5 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,87,51,0.15)]"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-3">
          <Link
            to="/contact"
            className="font-mono text-[10px] tracking-[0.15em] uppercase text-coal bg-neon px-4 py-2 rounded-sm"
          >
            Book
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/60 hover:text-neon transition-colors p-2"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="sm:hidden bg-coal/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {[{ label: 'Home', to: '/' }, ...links].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  {link.to === '/#services' ? (
                    <Link
                      to="/"
                      onClick={() => {
                        setMenuOpen(false)
                        setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100)
                      }}
                      className="block font-mono text-sm tracking-[0.2em] uppercase transition-colors py-3 px-3 rounded text-white/60 hover:text-neon hover:bg-white/3"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      to={link.to}
                      className={`block font-mono text-sm tracking-[0.2em] uppercase transition-colors py-3 px-3 rounded ${
                        isActive(link.to)
                          ? 'text-neon bg-neon/5'
                          : 'text-white/60 hover:text-neon hover:bg-white/3'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
