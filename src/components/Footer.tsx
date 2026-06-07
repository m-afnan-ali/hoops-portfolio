import { Link } from 'react-router-dom'
import { Camera, Mail, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative">
      <div className="section-line" />

      <div className="py-14 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-14">
            <div>
              <Link to="/" className="group inline-flex items-center gap-3 mb-3">
                <span className="block w-2 h-2 rounded-full bg-neon group-hover:shadow-[0_0_12px_#FF5733] transition-shadow" />
                <span className="font-marker text-2xl text-white group-hover:text-neon transition-colors">
                  UZAIR MEHMOOD
                </span>
              </Link>
              <p className="font-mono text-xs text-white/30 max-w-sm leading-relaxed">
                Basketball event photography.
                Capturing the raw energy of the game, one frame at a time.
              </p>
            </div>

            <div className="flex gap-10 sm:gap-14">
              <div>
                <h4 className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase mb-4">Navigate</h4>
                <div className="flex flex-col gap-2.5">
                  <Link to="/" className="font-mono text-xs text-white/40 hover:text-neon transition-colors">Home</Link>
                  <Link to="/work" className="font-mono text-xs text-white/40 hover:text-neon transition-colors">Work</Link>
                  <Link to="/contact" className="font-mono text-xs text-white/40 hover:text-neon transition-colors">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase mb-4">Connect</h4>
                <div className="flex flex-col gap-2.5">
                  <a href="#" className="font-mono text-xs text-white/40 hover:text-neon transition-colors flex items-center gap-2">
                    <Camera size={12} />
                    Instagram
                  </a>
                  <Link to="/contact" className="font-mono text-xs text-white/40 hover:text-neon transition-colors flex items-center gap-2">
                    <Mail size={12} />
                    Email
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="font-mono text-[10px] tracking-[0.15em] text-white/20">
              &copy; {new Date().getFullYear()} Uzair Mehmood
            </p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/20 hover:text-neon transition-colors uppercase"
            >
              Back to top
              <ArrowUp size={12} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
