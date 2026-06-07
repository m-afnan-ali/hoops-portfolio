import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Camera, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDetails: '',
    date: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="min-h-[calc(100vh-10rem)] flex items-center py-20 sm:py-32 px-4 sm:px-8 lg:px-16" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto w-full"
      >
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <Camera size={14} className="text-neon/60" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-neon/80 uppercase">
              Book a session
            </span>
            <Camera size={14} className="text-neon/60" />
          </div>
          <h2 className="font-marker text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            LET'S WORK
          </h2>
          <p className="font-mono text-sm text-white/40 max-w-md mx-auto">
            Got an event coming up? Let's capture it raw.
          </p>
          <p className="font-mono text-[11px] text-white/20 mt-2">
            Uzair Mehmood &middot; Basketball Event Photography
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="clipboard-bg rounded-lg p-6 sm:p-10 chalk-border chalk-border-heavy"
            >
              <div className="relative z-10">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-6 bg-zinc-700 rounded-b-md border border-zinc-600 shadow-lg" />

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 pt-4">
                  <div className="group">
                    <label className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase block mb-2 group-focus-within:text-neon/60 transition-colors">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white/10 focus:border-neon/60 outline-none font-mono text-sm text-white py-3 transition-all placeholder:text-white/15"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="group">
                    <label className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase block mb-2 group-focus-within:text-neon/60 transition-colors">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white/10 focus:border-neon/60 outline-none font-mono text-sm text-white py-3 transition-all placeholder:text-white/15"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div className="group">
                    <label className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase block mb-2 group-focus-within:text-neon/60 transition-colors">
                      Event Details
                    </label>
                    <textarea
                      name="eventDetails"
                      value={formData.eventDetails}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-transparent border-b-2 border-white/10 focus:border-neon/60 outline-none font-mono text-sm text-white py-3 transition-all resize-none placeholder:text-white/15"
                      placeholder="Tell me about your event..."
                    />
                  </div>

                  <div className="group">
                    <label className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase block mb-2 group-focus-within:text-neon/60 transition-colors">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-white/10 focus:border-neon/60 outline-none font-mono text-sm text-white py-3 transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 sm:mt-10 bg-neon text-coal font-mono text-sm font-bold tracking-[0.2em] uppercase py-4 rounded flex items-center justify-center gap-3 hover:bg-white hover:shadow-[0_0_30px_rgba(255,87,51,0.3)] transition-all duration-300"
                  >
                    <Send size={16} />
                    Send Booking Request
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card rounded-lg p-10 sm:p-14 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle size={48} className="text-neon mx-auto mb-6" />
              </motion.div>
              <h3 className="font-marker text-3xl sm:text-4xl text-white mb-3">
                REQUEST SENT
              </h3>
              <p className="font-mono text-sm text-white/40 mb-8 max-w-sm mx-auto">
                Thanks {formData.name}! I'll review your event details and get back to you soon.
              </p>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-neon hover:text-white transition-colors uppercase group"
              >
                Browse my work
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
